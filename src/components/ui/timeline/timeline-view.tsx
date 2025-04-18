"use client";

import React from 'react';
import { Calendar, Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { BenchmarkSystem } from '../../../data/benchmark-data';

interface TimelineViewProps {
  systems: BenchmarkSystem[];
}

const TimelineView: React.FC<TimelineViewProps> = ({ systems }) => {
  // Format date for display
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Not set';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Calculate timeline status
  const getTimelineStatus = (system: BenchmarkSystem) => {
    const { systemInfo } = system;
    
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
  
  // Get status icon and color
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed-on-time':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'completed-late':
        return <CheckCircle className="h-5 w-5 text-yellow-500" />;
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <XCircle className="h-5 w-5 text-gray-400" />;
    }
  };
  
  // Calculate duration in days
  const calculateDuration = (startDate: string, endDate: string | null) => {
    if (!startDate || !endDate) return 'N/A';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return `${diffDays} days`;
  };
  
  // Calculate percentage of timeline completion
  const calculateTimelinePercentage = (system: BenchmarkSystem) => {
    const { systemInfo } = system;
    
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
    
    // Cap at 100% if overdue
    return Math.min(Math.max(percentage, 0), 100);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="font-semibold">Project Timeline</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">System</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">PM Submit Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Target Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completion Date</th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/4">Progress</th> */}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {systems.map((system) => {
              const status = getTimelineStatus(system);
              const percentage = calculateTimelinePercentage(system);
              const { systemInfo } = system;
              
              // Determine color for progress bar
              let progressColor = 'bg-blue-500';
              if (status === 'completed-on-time') progressColor = 'bg-green-500';
              if (status === 'completed-late') progressColor = 'bg-yellow-500';
              if (status === 'overdue') progressColor = 'bg-red-500';
              
              return (
                <tr key={system.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{system.systemName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {systemInfo.PMSubmitDate ? (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {formatDate(systemInfo.PMSubmitDate)}
                      </div>
                    ) : (
                      <span className="text-gray-400">Not set</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {systemInfo.TargetCompletionDate ? (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {formatDate(systemInfo.TargetCompletionDate)}
                      </div>
                    ) : (
                      <span className="text-gray-400">Not set</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {systemInfo.ActualCompletionDate ? (
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        {formatDate(systemInfo.ActualCompletionDate)}
                      </div>
                    ) : (
                      <span className="text-gray-400">Pending</span>
                    )}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {systemInfo.PMSubmitDate && systemInfo.TargetCompletionDate ? (
                      calculateDuration(systemInfo.PMSubmitDate, systemInfo.ActualCompletionDate || systemInfo.TargetCompletionDate)
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      {getStatusIcon(status)}
                      <span className="ml-2 capitalize">
                        {status.replace(/-/g, ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={`h-2.5 rounded-full ${progressColor}`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimelineView;