"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { SystemInfo, getUniqueValues } from '../../data/benchmark-data';

interface FilterPanelProps {
  onFilterChange: (filters: Record<string, string[]>) => void;
  filters: Record<string, string[]>;
}

// Filter groups
const systemIdentificationFilters = [
  { key: 'State', label: 'State' },
  { key: 'Series', label: 'Series' },
  { key: 'Segment', label: 'Segment' },
  { key: 'MKT', label: 'Market' },
  { key: 'Model', label: 'Model' }
];

const hardwareConfigFilters = [
  { key: 'CPU', label: 'CPU' },
  { key: 'GPU', label: 'GPU' },
  { key: 'DRAM', label: 'DRAM' },
  { key: 'Panel', label: 'Panel' }
];

const systemVersionFilters = [
  { key: 'BIOS', label: 'BIOS' },
  { key: 'EC', label: 'EC' },
  { key: 'VBIOS', label: 'VBIOS' },
  { key: 'VGA_Driver', label: 'VGA Driver' },
  { key: 'PN', label: 'P/N' }
];

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange, filters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    systemIdentification: true,
    hardwareConfig: false,
    systemVersion: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters };
    
    if (!newFilters[key]) {
      newFilters[key] = [value];
    } else if (newFilters[key].includes(value)) {
      newFilters[key] = newFilters[key].filter(v => v !== value);
      if (newFilters[key].length === 0) {
        delete newFilters[key];
      }
    } else {
      newFilters[key] = [...newFilters[key], value];
    }
    
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).flat().length;
  };

  const renderFilterGroup = (title: string, filterItems: { key: string, label: string }[], isExpanded: boolean) => {
    return (
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <button 
          className="flex justify-between items-center w-full py-2 text-left font-medium"
          onClick={() => toggleSection(title.replace(/\s+/g, ''))}
        >
          <span>{title}</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {isExpanded && (
          <div className="mt-2 space-y-2">
            {filterItems.map(filter => {
              const options = getUniqueValues(filter.key as keyof SystemInfo);
              if (options.length === 0) return null;
              
              return (
                <div key={filter.key} className="pl-2">
                  <div className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-1">{filter.label}</div>
                  <div className="space-y-1 pl-2">
                    {options.map(option => (
                      <div key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`${filter.key}-${option}`}
                          checked={filters[filter.key]?.includes(option) || false}
                          onChange={() => handleFilterChange(filter.key, option)}
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label 
                          htmlFor={`${filter.key}-${option}`}
                          className="text-sm text-gray-700 dark:text-gray-300"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm ${
          getActiveFiltersCount() > 0 ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
        }`}
      >
        <Filter className="h-4 w-4" />
        <span>Filter</span>
        {getActiveFiltersCount() > 0 && (
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full px-2 py-0.5">
            {getActiveFiltersCount()}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filters</h3>
            {getActiveFiltersCount() > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X size={12} />
                Clear all
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            {renderFilterGroup("System Identification", systemIdentificationFilters, expandedSections.systemIdentification)}
            {renderFilterGroup("Hardware Configuration", hardwareConfigFilters, expandedSections.hardwareConfig)}
            {renderFilterGroup("System Version", systemVersionFilters, expandedSections.systemVersion)}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;