"use client";

import React from 'react';
import { BarChart2, BarChart, Activity, Layers } from 'lucide-react';

export type BenchmarkType = 
  | 'TimeSpy' 
  | 'PortRoyal' 
  | 'TimeSpyExtreme'
  | 'Firestrike'
  | 'FirestrikeUltra';

interface BenchmarkOption {
  id: BenchmarkType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export const benchmarkOptions: BenchmarkOption[] = [
  {
    id: 'TimeSpy',
    label: 'Time Spy',
    icon: <BarChart2 />,
    description: 'DirectX 12 benchmark for gaming PCs'
  },
  {
    id: 'PortRoyal',
    label: 'Port Royal',
    icon: <Activity />,
    description: 'Ray tracing benchmark'
  },
  {
    id: 'TimeSpyExtreme',
    label: 'Time Spy Extreme',
    icon: <BarChart2 />,
    description: '4K DirectX 12 gaming benchmark'
  },
  {
    id: 'Firestrike',
    label: 'Firestrike',
    icon: <BarChart />,
    description: 'DirectX 11 gaming PC benchmark'
  },
  {
    id: 'FirestrikeUltra',
    label: 'Firestrike Ultra',
    icon: <Layers />,
    description: '4K UHD resolution benchmark'
  }
];

interface BenchmarkSelectorProps {
  selectedBenchmarks: BenchmarkType[];
  onChange: (selection: BenchmarkType[]) => void;
}

const BenchmarkSelector: React.FC<BenchmarkSelectorProps> = ({
  selectedBenchmarks,
  onChange
}) => {
  const toggleBenchmark = (benchmarkId: BenchmarkType) => {
    if (selectedBenchmarks.includes(benchmarkId)) {
      onChange(selectedBenchmarks.filter(id => id !== benchmarkId));
    } else {
      onChange([...selectedBenchmarks, benchmarkId]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
      <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Benchmark Tests</h3>
      <div className="space-y-2">
        {benchmarkOptions.map(option => (
          <button
            key={option.id}
            onClick={() => toggleBenchmark(option.id)}
            className={`flex items-center w-full p-2 rounded-lg transition-colors ${
              selectedBenchmarks.includes(option.id)
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <div className={`p-2 rounded-lg mr-3 ${
              selectedBenchmarks.includes(option.id)
                ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}>
              {React.cloneElement(option.icon as React.ReactElement, { 
                size: 16, 
                className: selectedBenchmarks.includes(option.id) 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 dark:text-gray-400' 
              })}
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-sm">{option.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{option.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BenchmarkSelector;