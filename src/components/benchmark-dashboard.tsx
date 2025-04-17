"use client";

import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Scatter, ScatterChart, ZAxis } from 'recharts';
import { ChevronDown, ChevronUp, Settings, BarChart2, PieChart, Activity, Cpu, HardDrive, Monitor, Battery, Zap, Download, Filter, RefreshCw } from 'lucide-react';

// Sample data from the image
const benchmarkData = [
  { 
    id: 1,
    system: "System A",
    TimeSpy: 245, 
    GraphicsScore: 261, 
    CPUScore: 185, 
    Firestrike: 1945,
    Graphic: 3721,
    Physics: 19762,
    Combined: 328
  },
  { 
    id: 2,
    system: "System B",
    TimeSpy: 1992, 
    GraphicsScore: 1763, 
    CPUScore: 7636
  },
  { 
    id: 3,
    system: "System C",
    TimeSpy: 17794, 
    GraphicsScore: 18224, 
    CPUScore: 11698
  },
  { 
    id: 4,
    system: "System D",
    TimeSpy: 17396, 
    GraphicsScore: 18472, 
    CPUScore: 9080
  },
  { 
    id: 5,
    system: "System E",
    TimeSpy: 17494, 
    GraphicsScore: 18706, 
    CPUScore: 10758
  },
  { 
    id: 6,
    system: "System F",
    TimeSpy: 245, 
    GraphicsScore: 261, 
    CPUScore: 185, 
    Firestrike: 1945,
    Graphic: 3721,
    Physics: 19762,
    Combined: 328
  }
];

// Radar chart data preparation
const radarData = benchmarkData.map(item => ({
  system: item.system,
  "Time Spy": item.TimeSpy ? (item.TimeSpy / 20000) * 100 : 0,
  "Graphics Score": item.GraphicsScore ? (item.GraphicsScore / 20000) * 100 : 0,
  "CPU Score": item.CPUScore ? (item.CPUScore / 20000) * 100 : 0,
  "Firestrike": item.Firestrike ? (item.Firestrike / 20000) * 100 : 0,
  "Physics": item.Physics ? (item.Physics / 20000) * 100 : 0,
}));

// Prepare comparison data
const timeSpyData = benchmarkData.map(item => ({
  name: item.system,
  value: item.TimeSpy
})).sort((a, b) => b.value - a.value);

const graphicsScoreData = benchmarkData.map(item => ({
  name: item.system,
  value: item.GraphicsScore
})).sort((a, b) => b.value - a.value);

const cpuScoreData = benchmarkData.map(item => ({
  name: item.system,
  value: item.CPUScore
})).sort((a, b) => b.value - a.value);

// Dashboard component
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overall');
  const [selectedSystem, setSelectedSystem] = useState(null);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-semibold">Performance Benchmark Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
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
          <TabButton active={activeTab === 'power'} onClick={() => setActiveTab('power')} icon={<Zap className="h-4 w-4" />} label="CPU/GPU Power" />
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-grow p-6 space-y-6">
        {/* KPI summary cards */}
        <div className="grid grid-cols-4 gap-4">
          <KpiCard title="Avg. Time Spy" value="9194" change="+12.3%" icon={<Activity className="h-5 w-5" />} />
          <KpiCard title="Avg. Graphics Score" value="9778" change="+8.7%" icon={<BarChart2 className="h-5 w-5" />} />
          <KpiCard title="Avg. CPU Score" value="8257" change="+5.2%" icon={<Cpu className="h-5 w-5" />} />
          <KpiCard title="Systems Tested" value="6" change="+2" icon={<HardDrive className="h-5 w-5" />} />
        </div>
        
        {/* Chart grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Time Spy comparison chart */}
          <div className="col-span-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Time Spy Score Comparison</h2>
              <div className="flex space-x-2">
                <button className="p-1.5 rounded bg-gray-100 dark:bg-gray-700">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeSpyData} layout="vertical">
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
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Performance radar chart */}
          <div className="col-span-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Performance Profile</h2>
              <div className="flex space-x-2">
                <button className="p-1.5 rounded bg-gray-100 dark:bg-gray-700">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="system" tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tickCount={5} tick={{ fill: '#6b7280', fontSize: 10 }} />
                  {benchmarkData.slice(0, 3).map((entry, index) => (
                    <Radar 
                      key={entry.id}
                      name={entry.system} 
                      dataKey={Object.keys(radarData[0])[index+1]} 
                      stroke={index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : '#f59e0b'} 
                      fill={index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : '#f59e0b'} 
                      fillOpacity={0.3} 
                    />
                  ))}
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Graphics score comparison */}
          <div className="col-span-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Graphics Score Comparison</h2>
              <div className="flex space-x-2">
                <button className="p-1.5 rounded bg-gray-100 dark:bg-gray-700">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={graphicsScoreData} layout="vertical">
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
                  <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* CPU score comparison */}
          <div className="col-span-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">CPU Score Comparison</h2>
              <div className="flex space-x-2">
                <button className="p-1.5 rounded bg-gray-100 dark:bg-gray-700">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cpuScoreData} layout="vertical">
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
                  <Bar dataKey="value" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Benchmark Data Table */}
          <div className="col-span-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="font-semibold">Detailed Benchmark Data</h2>
              <div className="flex space-x-2">
                <button className="p-1.5 rounded bg-gray-100 dark:bg-gray-700">
                  <Filter className="h-4 w-4" />
                </button>
                <button className="p-1.5 rounded bg-gray-100 dark:bg-gray-700">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">System</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time Spy</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Graphics Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CPU Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Firestrike</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Graphic</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Physics</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Combined</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {benchmarkData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.system}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.TimeSpy || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.GraphicsScore || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.CPUScore || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Firestrike || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Graphic || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Physics || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.Combined || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
  const isPositive = change.startsWith('+');
  
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
        <div className={`mt-1 flex items-center text-xs ${
          isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {isPositive ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;