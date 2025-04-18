"use client";

import Link from 'next/link';
import { useState } from 'react';
import { 
  Activity, 
  BarChart2, 
  PieChart, 
  Monitor, 
  Battery,
  Calendar, 
  ChevronRight, 
  Search, 
  Filter, 
  RefreshCw, 
  Settings
} from 'lucide-react';
import { benchmarkSystems } from '../data/benchmark-data';

// 示例筛选器数据
const marketOptions = ["Global", "US", "EU", "APAC", "China", "Japan", "Taiwan"];
const modelOptions = ["PowerBook Pro", "TravelBook", "GamingBook X", "CreatorBook Pro", "UltraBook Air", "BusinessBook"];
const pnOptions = ["PBX9012", "TBZ7890", "GBX4567", "CBX5467", "UBX2345", "BBX1234"];

export default function HomePage() {
  // 篩選狀態
  const [mktFilter, setMktFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [pnFilter, setPNFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // 篩選結果
  const [filteredSystems, setFilteredSystems] = useState([]);
  const [hasFiltered, setHasFiltered] = useState(false);
  
  // 計算綜合數據 (僅在背景計算，用於時間軸區域)
  const completedSystems = benchmarkSystems.filter(system => system.systemInfo.ActualCompletionDate);
  const inProgressSystems = benchmarkSystems.filter(system => 
    system.systemInfo.PMSubmitDate && !system.systemInfo.ActualCompletionDate
  );
  const overdueSystems = benchmarkSystems.filter(system => {
    if (!system.systemInfo.TargetCompletionDate || system.systemInfo.ActualCompletionDate) return false;
    const targetDate = new Date(system.systemInfo.TargetCompletionDate);
    const today = new Date();
    return today > targetDate;
  });
  
  // 執行篩選
  const handleFilter = () => {
    let results = [...benchmarkSystems];
    
    // 套用 MKT 篩選
    if (mktFilter) {
      results = results.filter(system => 
        system.systemInfo.MKT && system.systemInfo.MKT === mktFilter
      );
    }
    
    // 套用 Model 篩選
    if (modelFilter) {
      results = results.filter(system => 
        system.systemInfo.Model && system.systemInfo.Model.includes(modelFilter)
      );
    }
    
    // 套用 P/N 篩選
    if (pnFilter) {
      results = results.filter(system => 
        system.systemInfo.PN && system.systemInfo.PN === pnFilter
      );
    }
    
    // 套用搜尋查詢
    if (searchQuery) {
      results = results.filter(system => 
        system.systemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (system.systemInfo.CPU && system.systemInfo.CPU.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (system.systemInfo.GPU && system.systemInfo.GPU.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredSystems(results);
    setHasFiltered(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-semibold">效能資料庫</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
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

      {/* 搜索区域 */}
      {/* <div className="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search systems, CPU, GPU..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div> */}

      {/* 主要内容 */}
      <main className="flex-grow p-6">
        {/* 分類卡片 - 一排四個而非五個 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <CategoryCard 
            title="Overall Benchmark" 
            icon={<BarChart2 className="h-8 w-8 text-blue-500" />}
            description="System performance metrics with Time Spy, Port Royal, Firestrike" 
            path="/benchmark"
            color="blue" 
          />
          <CategoryCard 
            title="Gaming Benchmark" 
            icon={<PieChart className="h-8 w-8 text-purple-500" />}
            description="FPS tests with popular games at different resolutions" 
            path="/benchmark?tab=gaming"
            color="purple" 
          />
          <CategoryCard 
            title="Creator Benchmark" 
            icon={<Monitor className="h-8 w-8 text-green-500" />}
            description="Rendering, video editing, and creative app benchmarks" 
            path="/benchmark?tab=creator"
            color="green" 
          />
          <CategoryCard 
            title="Battery Benchmark" 
            icon={<Battery className="h-8 w-8 text-yellow-500" />}
            description="Battery life, charging time and power consumption tests" 
            path="/benchmark?tab=battery"
            color="yellow" 
          />
        </div>
        
        {/* 篩選功能區 (取代 Quick System Comparison) */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filter Systems</h2>
            <Link href="/benchmark?compare=true" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
              Advanced Compare <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">MKT</label>
              <select 
                className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                value={mktFilter}
                onChange={(e) => setMktFilter(e.target.value)}
              >
                <option value="">All Markets</option>
                {marketOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Model</label>
              <select 
                className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                value={modelFilter}
                onChange={(e) => setModelFilter(e.target.value)}
              >
                <option value="">All Models</option>
                {modelOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">P/N</label>
              <select 
                className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                value={pnFilter}
                onChange={(e) => setPNFilter(e.target.value)}
              >
                <option value="">All P/Ns</option>
                {pnOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button 
                onClick={handleFilter}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center inline-block transition-colors"
              >
                Show Results
              </button>
            </div>
          </div>
          
          {/* 篩選結果顯示 */}
          {hasFiltered && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Filter Results: {filteredSystems.length} systems found</h3>
              
              {filteredSystems.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-750">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">System</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CPU / GPU</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">MKT</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Model</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">P/N</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time Spy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredSystems.map(system => (
                        <tr key={system.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            <Link href={`/benchmark?system=${system.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                              {system.systemName}
                            </Link>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <div className="text-xs">
                              <span className="font-medium">{system.systemInfo.CPU || 'N/A'}</span>
                              <span className="mx-1">|</span>
                              <span>{system.systemInfo.GPU || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{system.systemInfo.MKT || 'N/A'}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{system.systemInfo.Model || 'N/A'}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{system.systemInfo.PN || 'N/A'}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">
                            {system.benchmarkScores.TimeSpy?.toLocaleString() || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No systems found matching your filters. Try adjusting your criteria.
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* 時間軸區域 */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-indigo-500 mr-2" />
              <h2 className="text-xl font-semibold">Project Timeline</h2>
            </div>
            <Link href="/benchmark?tab=timeline" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
              View Timeline <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Track project progress, completion status, and benchmark schedules. The timeline view provides 
            a visual representation of all test projects with their submission dates, target dates, and completion status.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <StatCard title="Total Systems" value={benchmarkSystems.length.toString()} color="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" />
            <StatCard title="In Progress" value={inProgressSystems.length.toString()} color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" />
            <StatCard title="Completed" value={completedSystems.length.toString()} color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" />
            <StatCard title="Overdue" value={overdueSystems.length.toString()} color="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" />
          </div>
          
          {/* <div className="mt-4">
            <Link href="/benchmark?tab=timeline" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg inline-block transition-colors">
              Access Timeline
            </Link>
          </div> */}
        </div>
      </main>
    </div>
  );
}

// 分類卡片組件
const CategoryCard = ({ title, icon, description, path, color }) => {
  const getBgColor = () => {
    switch (color) {
      case 'purple': return 'hover:bg-purple-50 dark:hover:bg-purple-900/10';
      case 'green': return 'hover:bg-green-50 dark:hover:bg-green-900/10';
      case 'yellow': return 'hover:bg-yellow-50 dark:hover:bg-yellow-900/10';
      case 'red': return 'hover:bg-red-50 dark:hover:bg-red-900/10';
      default: return 'hover:bg-blue-50 dark:hover:bg-blue-900/10';
    }
  };
  
  const getBorderColor = () => {
    switch (color) {
      case 'purple': return 'hover:border-purple-200 dark:hover:border-purple-800';
      case 'green': return 'hover:border-green-200 dark:hover:border-green-800';
      case 'yellow': return 'hover:border-yellow-200 dark:hover:border-yellow-800';
      case 'red': return 'hover:border-red-200 dark:hover:border-red-800';
      default: return 'hover:border-blue-200 dark:hover:border-blue-800';
    }
  };
  
  return (
    <Link
      href={path}
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-transparent ${getBgColor()} ${getBorderColor()} transition-all hover:shadow-md flex flex-col h-full`}
    >
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">{description}</p>
      <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
        View Benchmarks <ChevronRight className="h-4 w-4 ml-1" />
      </div>
    </Link>
  );
};

// 統計數字卡片
const StatCard = ({ title, value, color }) => {
  return (
    <div className="px-4 py-3 rounded-lg flex flex-col items-center">
      <span className="text-sm text-gray-600 dark:text-gray-400">{title}</span>
      <div className={`text-xl font-bold mt-1 ${color}`}>{value}</div>
    </div>
  );
};