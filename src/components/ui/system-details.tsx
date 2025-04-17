"use client";

import React from 'react';
import { BenchmarkSystem } from '../../data/benchmark-data';
import { Cpu, Monitor, Memory, HardDrive, Calendar, Clock } from 'lucide-react';

interface SystemDetailsProps {
  system: BenchmarkSystem;
}

const SystemDetails: React.FC<SystemDetailsProps> = ({ system }) => {
  const { systemInfo } = system;
  
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Not set';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Calculate progress/status for the timeline
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
  
  const timelineStatus = getTimelineStatus();
  
  const getStatusColor = () => {
    switch (timelineStatus) {
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
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold">{system.systemName} Details</h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-6">
          {/* System Identification */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">System Identification</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-1 text-gray-500 dark:text-gray-400">State</td>
                  <td className="py-1 font-medium">{systemInfo.State || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-500 dark:text-gray-400">Series</td>
                  <td className="py-1 font-medium">{systemInfo.Series || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-500 dark:text-gray-400">Segment</td>
                  <td className="py-1 font-medium">{systemInfo.Segment || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-500 dark:text-gray-400">Market</td>
                  <td className="py-1 font-medium">{systemInfo.MKT || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-500 dark:text-gray-400">Model</td>
                  <td className="py-1 font-medium">{systemInfo.Model || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Hardware Configuration */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Hardware Configuration</h3>
            <div className="space-y-3">
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
              
              <div className="flex items-start">
                <div className="p-1.5 rounded bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3">
                  <Memory size={16} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">DRAM</div>
                  <div className="font-medium">{systemInfo.DRAM || 'N/A'}</div>
                </div>
              </div>
              
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
        </div>
        
        {/* System Version */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">System Version</h3>
          <div className="grid grid-cols-5 gap-4 text-sm">
            <div>
              <div className="text-gray-500 dark:text-gray-400">BIOS</div>
              <div className="font-medium">{systemInfo.BIOS || 'N/A'}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">EC</div>
              <div className="font-medium">{systemInfo.EC || 'N/A'}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">VBIOS</div>
              <div className="font-medium">{systemInfo.VBIOS || 'N/A'}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">VGA Driver</div>
              <div className="font-medium">{systemInfo.VGA_Driver || 'N/A'}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">P/N</div>
              <div className="font-medium">{systemInfo.PN || 'N/A'}</div>
            </div>
          </div>
        </div>
        
        {/* Timeline Information */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Timeline</h3>
          
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className={`absolute left-0 top-0 h-1 ${getStatusColor()} rounded-full`} style={{ 
                width: timelineStatus === 'not-started' ? '0%' : 
                      timelineStatus === 'in-progress' ? '50%' : '100%' 
              }}></div>
              
              {/* Progress points */}
              <div className="absolute left-0 top-0 transform -translate-y-1/2">
                <div className={`h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${
                  timelineStatus !== 'not-started' ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}></div>
              </div>
              
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${
                  ['in-progress', 'completed-on-time', 'completed-late', 'overdue'].includes(timelineStatus) 
                    ? 'bg-blue-500' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}></div>
              </div>
              
              <div className="absolute right-0 top-0 transform -translate-y-1/2">
                <div className={`h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${
                  ['completed-on-time', 'completed-late'].includes(timelineStatus) 
                    ? timelineStatus === 'completed-on-time' ? 'bg-green-500' : 'bg-yellow-500'
                    : timelineStatus === 'overdue' ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-left">
              <div className="flex items-center">
                <Calendar size={12} className="mr-1 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">Submit Date</span>
              </div>
              <div className="font-medium">{formatDate(systemInfo.PMSubmitDate)}</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Clock size={12} className="mr-1 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">Target Date</span>
              </div>
              <div className="font-medium">{formatDate(systemInfo.TargetCompletionDate)}</div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center justify-end">
                <Calendar size={12} className="mr-1 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">Completion Date</span>
              </div>
              <div className={`font-medium ${
                timelineStatus === 'overdue' ? 'text-red-500' : 
                timelineStatus === 'completed-late' ? 'text-yellow-500' : ''
              }`}>
                {systemInfo.ActualCompletionDate ? formatDate(systemInfo.ActualCompletionDate) : 'Pending'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemDetails;