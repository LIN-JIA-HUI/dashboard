"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Filter, RefreshCw, Settings, BarChart2, PieChart, Monitor, Battery, Zap, Download, ChevronDown, ChevronUp, Clock, Calendar, Laptop, Cpu } from 'lucide-react';
import { benchmarkSystems, BenchmarkSystem } from '../data/benchmark-data';
import FilterPanel from './ui/filter-panel';
import BenchmarkSelector, { BenchmarkType } from './ui/benchmark-selector';
import SystemInfoView from './ui/system-info-view';
import BenchmarkCard from './ui/benchmark-card';
import TimelineView from './ui/timeline/timeline-view';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overall');
  const [selectedSystem, setSelectedSystem] = useState<BenchmarkSystem | null>(null);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [selectedBenchmarks, setSelectedBenchmarks] = useState<BenchmarkType[]>(['TimeSpy']);
  const [filteredSystems, setFilteredSystems] = useState<BenchmarkSystem[]>(benchmarkSystems);
  
  // Apply filters to the systems
  useEffect(() => {
    let result = [...benchmarkSystems];
    
    // Apply filters for each key
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        result = result.filter(system => {
          const systemValue = system.systemInfo[key as keyof typeof system.systemInfo];
          return systemValue && values.includes(systemValue.toString());
        });
      }
    });
    
    setFilteredSystems(result);
    
    // If the currently selected system is filtered out, deselect it
    if (selectedSystem && !result.some(system => system.id === selectedSystem.id)) {
      setSelectedSystem(null);
    }
  }, [filters, selectedSystem]);
  
  const handleSystemSelect = (system: BenchmarkSystem) => {
    setSelectedSystem(system.id === selectedSystem?.id ? null : system);
  };
  
  // Calculate summary metrics
  const avgTimeSpyScore = filteredSystems.length > 0
    ? Math.round(filteredSystems.reduce((sum, system) => sum + (system.benchmarkScores.TimeSpy || 0), 0) / 
      filteredSystems.filter(system => system.benchmarkScores.TimeSpy).length)
    : 0;
    
  const avgGraphicsScore = filteredSystems.length > 0
    ? Math.round(filteredSystems.reduce((sum, system) => sum + (system.benchmarkScores.TimeSpyGraphicsScore || 0), 0) / 
      filteredSystems.filter(system => system.benchmarkScores.TimeSpyGraphicsScore).length)
    : 0;
    
  const avgCPUScore = filteredSystems.length > 0
    ? Math.round(filteredSystems.reduce((sum, system) => sum + (system.benchmarkScores.TimeSpyCPUScore || 0), 0) / 
      filteredSystems.filter(system => system.benchmarkScores.TimeSpyCPUScore).length)
    : 0;
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-semibold">效能資料庫</h1>
        </div>
        <div className="flex items-center space-x-4">
          <FilterPanel onFilterChange={setFilters} filters={filters} />
          
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
          <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </header>
      
      {/* Tab navigation */}
      <div className="bg-white dark:bg-gray-800 px-6 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1">
          <TabButton active={activeTab === 'overall'} onClick={() => setActiveTab('overall')} icon={<BarChart2 className="h-4 w-4" />} label="Overall Benchmark" />
          <TabButton active={activeTab === 'gaming'} onClick={() => setActiveTab('gaming')} icon={<PieChart className="h-4 w-4" />} label="Gaming Benchmark" />
          <TabButton active={activeTab === 'creator'} onClick={() => setActiveTab('creator')} icon={<Monitor className="h-4 w-4" />} label="Creator Benchmark" />
          <TabButton active={activeTab === 'battery'} onClick={() => setActiveTab('battery')} icon={<Battery className="h-4 w-4" />} label="Battery Benchmark" />
          {/* <TabButton active={activeTab === 'power'} onClick={() => setActiveTab('power')} icon={<Zap className="h-4 w-4" />} label="CPU/GPU Power" /> */}
          <TabButton active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} icon={<Calendar className="h-4 w-4" />} label="Timeline" />
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-grow p-6 space-y-6">
        {/* KPI summary cards */}
        {/* <div className="grid grid-cols-4 gap-4">
          <KpiCard title="Avg. Time Spy" value={avgTimeSpyScore.toLocaleString()} change="+12.3%" icon={<Activity className="h-5 w-5" />} />
          <KpiCard title="Avg. Graphics Score" value={avgGraphicsScore.toLocaleString()} change="+8.7%" icon={<BarChart2 className="h-5 w-5" />} />
          <KpiCard title="Avg. CPU Score" value={avgCPUScore.toLocaleString()} change="+5.2%" icon={<Activity className="h-5 w-5" />} />
          <KpiCard title="Systems Tested" value={filteredSystems.length.toString()} change="+2" icon={<Laptop className="h-5 w-5" />} />
        </div> */}
        
        {/* Timeline View (shown only on timeline tab) */}
        {activeTab === 'timeline' && (
          <TimelineView systems={filteredSystems} />
        )}
        
        {/* Content layout: Sidebar + Main area */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3 space-y-6">
            {/* Benchmark selector - not shown on timeline tab */}
            {activeTab !== 'timeline' && (
              <BenchmarkSelector 
                selectedBenchmarks={selectedBenchmarks} 
                onChange={setSelectedBenchmarks} 
              />
            )}
            
            {/* Selected system details */}
            {selectedSystem && (
              <SystemInfoView system={selectedSystem} />
            )}
          </div>
          
          {/* Main content area */}
          <div className="col-span-9 space-y-6">
            {/* Benchmark cards - shown on all tabs except timeline */}
            {activeTab !== 'timeline' && (
              <div className="grid grid-cols-1 gap-6">
                {selectedBenchmarks.map(benchmarkType => (
                  <BenchmarkCard 
                    key={benchmarkType}
                    benchmarkType={benchmarkType}
                    systems={filteredSystems}
                  />
                ))}
              </div>
            )}
            
            {/* Systems table - shown on all tabs except timeline */}
            {activeTab !== 'timeline' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="font-semibold">System Comparison</h2>
                  <div className="flex space-x-2">
                    {/* <button className="p-1.5 rounded bg-gray-100 dark:bg-gray-700">
                      <Download className="h-4 w-4" />
                    </button> */}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">P/N</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CPU</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">GPU</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">BIOS</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">EC</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">VBIOS</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">VGA DRIVER</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredSystems.map((system) => (
                        <tr 
                          key={system.id} 
                          className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                            selectedSystem?.id === system.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                          onClick={() => handleSystemSelect(system)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{system.systemName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{system.systemInfo.CPU || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{system.systemInfo.GPU || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{system.systemInfo.BIOS || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{system.systemInfo.EC || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{system.systemInfo.VBIOS || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{system.systemInfo.VGA_Driver || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Tab button component
const TabButton = ({ active, onClick, icon, label }) => (
  <button
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      active 
        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </button>
);

// KPI card component
const KpiCard = ({ title, value, change, icon }) => {
  const isPositive = change && change.startsWith('+');
  const isNegative = change && change.startsWith('-');
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex flex-col">
      <div className="flex justify-between items-start">
        <span className="text-gray-500 dark:text-gray-400 text-sm">{title}</span>
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          {icon}
        </div>
      </div>
      <div className="mt-2">
        <span className="text-2xl font-semibold">{value}</span>
        {change && (
          <div className={`mt-1 flex items-center text-xs ${
            isPositive ? 'text-green-600 dark:text-green-400' : 
            isNegative ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
          }`}>
            {isPositive ? (
              <ChevronUp className="h-3 w-3" />
            ) : isNegative ? (
              <ChevronDown className="h-3 w-3" />
            ) : null}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;