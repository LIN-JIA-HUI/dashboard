"use client";

import React, { useState } from 'react';
import { 
  Cpu, Monitor, HardDrive, Calendar, Clock, 
  ChevronDown, ChevronUp, BarChart, Activity, 
  Laptop, Server, Tag, Layers
} from 'lucide-react';
import { BenchmarkSystem } from '../../data/benchmark-data';

interface SystemInfoViewProps {
  system: BenchmarkSystem;
}

const SystemInfoView: React.FC<SystemInfoViewProps> = ({ system }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('basic');
  const { systemInfo, benchmarkScores } = system;
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Not set';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Timeline status calculation
  const getTimelineStatus = () => {
    if (!systemInfo.PMSubmitDate) return 'not-started';
    if (!systemInfo.TargetCompletionDate) return 'in-progress';
    
    const today = new Date();
    const targetDate = new Date(systemInfo.TargetCompletionDate);
    
    if (systemInfo.ActualCompletionDate) {
      const actualDate = new Date(systemInfo.ActualCompletionDate);
      const isOnTime = actualDate <= targetDate;
      return isOnTime ? 'completed-on-time' : 'completed-late';
    }
    
    if (today > targetDate) {
      return 'overdue';
    }
    
    return 'in-progress';
  };
  
  const getStatusColor = () => {
    const status = getTimelineStatus();
    switch (status) {
      case 'completed-on-time':
        return 'bg-green-500';
      case 'completed-late':
        return 'bg-yellow-500';
      case 'overdue':
        return 'bg-red-500';
      case 'in-progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300 dark:bg-gray-600';
    }
  };
  
  const calculateCompletionPercentage = () => {
    if (!systemInfo.PMSubmitDate || !systemInfo.TargetCompletionDate) return 0;
    
    const submitDate = new Date(systemInfo.PMSubmitDate);
    const targetDate = new Date(systemInfo.TargetCompletionDate);
    const today = systemInfo.ActualCompletionDate 
      ? new Date(systemInfo.ActualCompletionDate) 
      : new Date();
    
    const totalDuration = targetDate.getTime() - submitDate.getTime();
    const elapsedDuration = today.getTime() - submitDate.getTime();
    
    const percentage = (elapsedDuration / totalDuration) * 100;
    
    // Cap at 100% if completed
    if (systemInfo.ActualCompletionDate) return 100;
    
    return Math.min(Math.max(percentage, 0), 100);
  };
  
  // Section for benchmark scores summary
  const renderScoresSummary = () => {
    const scores = [
      { name: 'Time Spy', value: benchmarkScores.TimeSpy, icon: <BarChart size={16} /> },
      { name: 'Graphics', value: benchmarkScores.TimeSpyGraphicsScore, icon: <Activity size={16} /> },
      { name: 'CPU Score', value: benchmarkScores.TimeSpyCPUScore, icon: <Cpu size={16} /> },
      { name: 'Firestrike', value: benchmarkScores.Firestrike, icon: <Activity size={16} /> }
    ];
    
    return (
      <div className="grid grid-cols-2 gap-3">
        {scores.map((score, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
              {score.icon}
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{score.name}</div>
              <div className="font-medium">{score.value?.toLocaleString() || 'N/A'}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <div className="p-2 mr-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          <Laptop size={18} />
        </div>
        <div>
          <h2 className="font-semibold">{system.systemName}</h2>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {systemInfo.Series} | {systemInfo.Model} | {systemInfo.Segment}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {/* Benchmark Scores Summary */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Benchmark Scores</h3>
          {renderScoresSummary()}
        </div>
        
        {/* Basic Information */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 overflow-hidden">
          <button
            className="flex justify-between items-center w-full p-3 text-left bg-gray-50 dark:bg-gray-800 font-medium"
            onClick={() => toggleSection('basic')}
          >
            <div className="flex items-center">
              <Tag size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
              <span>Basic Information</span>
            </div>
            {expandedSection === 'basic' ? (
              <ChevronUp size={16} className="text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
            )}
          </button>
          
          {expandedSection === 'basic' && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">State</div>
                  <div className="font-medium">{systemInfo.State || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Series</div>
                  <div className="font-medium">{systemInfo.Series || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Segment</div>
                  <div className="font-medium">{systemInfo.Segment || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Market</div>
                  <div className="font-medium">{systemInfo.MKT || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Model</div>
                  <div className="font-medium">{systemInfo.Model || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">P/N</div>
                  <div className="font-medium">{systemInfo.PN || 'N/A'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Hardware Configuration */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 overflow-hidden">
          <button
            className="flex justify-between items-center w-full p-3 text-left bg-gray-50 dark:bg-gray-800 font-medium"
            onClick={() => toggleSection('hardware')}
          >
            <div className="flex items-center">
              <Server size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
              <span>Hardware Configuration</span>
            </div>
            {expandedSection === 'hardware' ? (
              <ChevronUp size={16} className="text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
            )}
          </button>
          
          {expandedSection === 'hardware' && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-1.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">CPU</div>
                    <div className="font-medium">{systemInfo.CPU || 'N/A'}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-1.5 rounded bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-3">
                    <HardDrive size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">GPU</div>
                    <div className="font-medium">{systemInfo.GPU || 'N/A'}</div>
                  </div>
                </div>
                
                {/* <div className="flex items-start">
                  <div className="p-1.5 rounded bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3">
                    <Memory size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">DRAM</div>
                    <div className="font-medium">{systemInfo.DRAM || 'N/A'}</div>
                  </div>
                </div> */}
                
                <div className="flex items-start">
                  <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mr-3">
                    <Monitor size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Display</div>
                    <div className="font-medium">{systemInfo.Panel || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* System Version */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 overflow-hidden">
          <button
            className="flex justify-between items-center w-full p-3 text-left bg-gray-50 dark:bg-gray-800 font-medium"
            onClick={() => toggleSection('version')}
          >
            <div className="flex items-center">
              <Layers size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
              <span>System Version</span>
            </div>
            {expandedSection === 'version' ? (
              <ChevronUp size={16} className="text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
            )}
          </button>
          
          {expandedSection === 'version' && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">BIOS</div>
                  <div className="font-medium">{systemInfo.BIOS || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">EC</div>
                  <div className="font-medium">{systemInfo.EC || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">VBIOS</div>
                  <div className="font-medium">{systemInfo.VBIOS || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">VGA Driver</div>
                  <div className="font-medium">{systemInfo.VGA_Driver || 'N/A'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Timeline Information */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            className="flex justify-between items-center w-full p-3 text-left bg-gray-50 dark:bg-gray-800 font-medium"
            onClick={() => toggleSection('timeline')}
          >
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
              <span>Timeline Information</span>
            </div>
            {expandedSection === 'timeline' ? (
              <ChevronUp size={16} className="text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
            )}
          </button>
          
          {expandedSection === 'timeline' && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Project Timeline</div>
                <div className="relative pt-3">
                  <div className="flex items-center mb-2">
                    <div className="relative flex-1">
                      <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className={`absolute left-0 top-0 h-1 ${getStatusColor()} rounded-full`} style={{ 
                        width: `${calculateCompletionPercentage()}%`
                      }}></div>
                      
                      {/* Progress points */}
                      <div className="absolute left-0 top-0 transform -translate-y-1/2">
                        <div className={`h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${
                          systemInfo.PMSubmitDate ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}></div>
                        <div className="absolute top-4 transform -translate-x-1/2 text-xs whitespace-nowrap">
                          Submit
                        </div>
                      </div>
                      
                      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2">
                        <div className={`h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${
                          getTimelineStatus() !== 'not-started' ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}></div>
                        <div className="absolute top-4 transform -translate-x-1/2 text-xs whitespace-nowrap">
                          In Progress
                        </div>
                      </div>
                      
                      <div className="absolute right-0 top-0 transform -translate-y-1/2">
                        <div className={`h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${
                          systemInfo.ActualCompletionDate 
                            ? getTimelineStatus() === 'completed-on-time' ? 'bg-green-500' : 'bg-yellow-500'
                            : getTimelineStatus() === 'overdue' ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}></div>
                        <div className="absolute top-4 transform -translate-x-1/2 text-xs whitespace-nowrap">
                          Completion
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-8">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">PM Submit Date</div>
                  <div className="font-medium">{formatDate(systemInfo.PMSubmitDate)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Target Completion</div>
                  <div className="font-medium">{formatDate(systemInfo.TargetCompletionDate)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Actual Completion</div>
                  <div className={`font-medium ${
                    getTimelineStatus() === 'overdue' ? 'text-red-500' : 
                    getTimelineStatus() === 'completed-late' ? 'text-yellow-500' : ''
                  }`}>
                    {systemInfo.ActualCompletionDate ? formatDate(systemInfo.ActualCompletionDate) : 'Pending'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemInfoView;