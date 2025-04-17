"use client";

import React from 'react';
import { BenchmarkSystem } from '../../data/benchmark-data';
import { BenchmarkType } from './benchmark-selector';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface BenchmarkCardProps {
  benchmarkType: BenchmarkType;
  systems: BenchmarkSystem[];
}

interface ScoreItem {
  name: string;
  value: number;
}

const BenchmarkCard: React.FC<BenchmarkCardProps> = ({ benchmarkType, systems }) => {
  // Map benchmark types to their respective data keys
  const benchmarkConfig = {
    TimeSpy: {
      title: 'Time Spy',
      mainScore: 'TimeSpy',
      subScores: [
        { key: 'TimeSpyGraphicsScore', label: 'Graphics' },
        { key: 'TimeSpyCPUScore', label: 'CPU' }
      ],
      color: '#3b82f6' // blue
    },
    PortRoyal: {
      title: 'Port Royal',
      mainScore: 'PortRoyal',
      subScores: [
        { key: 'PortRoyalGraphics', label: 'Graphics' }
      ],
      color: '#10b981' // green
    },
    TimeSpyExtreme: {
      title: 'Time Spy Extreme',
      mainScore: 'TimeSpyExtreme',
      subScores: [
        { key: 'TimeSpyExtremeGraphicsScore', label: 'Graphics' },
        { key: 'TimeSpyExtremeCPUScore', label: 'CPU' }
      ],
      color: '#6366f1' // indigo
    },
    Firestrike: {
      title: 'Firestrike',
      mainScore: 'Firestrike',
      subScores: [
        { key: 'FirestrikeGraphic', label: 'Graphics' },
        { key: 'FirestrikePhysics', label: 'Physics' },
        { key: 'FirestrikeCombined', label: 'Combined' }
      ],
      color: '#f59e0b' // amber
    },
    FirestrikeUltra: {
      title: 'Firestrike Ultra',
      mainScore: 'FirestrikeUltra',
      subScores: [
        { key: 'FirestrikeUltraGraphic', label: 'Graphics' },
        { key: 'FirestrikeUltraPhysics', label: 'Physics' },
        { key: 'FirestrikeUltraCombined', label: 'Combined' }
      ],
      color: '#ec4899' // pink
    }
  };
  
  const config = benchmarkConfig[benchmarkType];
  
  // Prepare data for the main score chart
  const mainScoreData = systems
    .filter(system => system.benchmarkScores[config.mainScore as keyof typeof system.benchmarkScores] !== undefined)
    .map(system => ({
      name: system.systemName,
      value: system.benchmarkScores[config.mainScore as keyof typeof system.benchmarkScores] as number
    }))
    .sort((a, b) => b.value - a.value);
  
  // Prepare data for the sub-scores chart
  const subScoresData = systems.map(system => {
    const data: any = { name: system.systemName };
    
    config.subScores.forEach(subScore => {
      const key = subScore.key as keyof typeof system.benchmarkScores;
      data[subScore.label] = system.benchmarkScores[key] as number;
    });
    
    return data;
  });
  
  // Calculate average score
  const avgScore = mainScoreData.length > 0
    ? Math.round(mainScoreData.reduce((sum, item) => sum + item.value, 0) / mainScoreData.length)
    : 0;
  
  // Find best score
  const bestScore = mainScoreData.length > 0 ? mainScoreData[0].value : 0;
  const bestSystem = mainScoreData.length > 0 ? mainScoreData[0].name : 'N/A';
  
  // Calculate the percentage difference from the previous period (just for UI demonstration)
  // In a real app, this would compare with historical data
  const percentChange = mainScoreData.length > 1 
    ? Math.round(((bestScore - mainScoreData[1].value) / mainScoreData[1].value) * 100) 
    : 0;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold">{config.title} Benchmark</h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Average Score */}
          {/* <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="text-xs text-gray-500 dark:text-gray-400">Average Score</div>
            <div className="text-2xl font-semibold mt-1">{avgScore.toLocaleString()}</div>
          </div> */}
          
          {/* Best Score */}
          {/* <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 col-span-2">
            <div className="text-xs text-gray-500 dark:text-gray-400">Best Score</div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-semibold mt-1">{bestScore.toLocaleString()}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{bestSystem}</div>
              </div>
              {percentChange !== 0 && (
                <div className={`flex items-center text-sm ${
                  percentChange > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {percentChange > 0 ? (
                    <ArrowUpRight size={16} className="mr-1" />
                  ) : (
                    <ArrowDownRight size={16} className="mr-1" />
                  )}
                  <span>{Math.abs(percentChange)}%</span>
                </div>
              )}
            </div>
          </div> */}
        </div>
        
        {/* Main score comparison chart */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Score Comparison</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={mainScoreData} 
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    backdropFilter: 'blur(8px)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="value" fill={config.color} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Sub-scores comparison chart */}
        {subScoresData.length > 0 && config.subScores.length > 1 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Detailed Scores</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subScoresData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      backdropFilter: 'blur(8px)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  {config.subScores.map((subScore, index) => {
                    const colors = ['#3b82f6', '#10b981', '#f59e0b']; // blue, green, amber
                    return (
                      <Bar 
                        key={subScore.key} 
                        dataKey={subScore.label} 
                        fill={colors[index % colors.length]} 
                        radius={[4, 4, 0, 0]}
                      />
                    );
                  })}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BenchmarkCard;