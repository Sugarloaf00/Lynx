import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChartDataPoint } from '../types';

interface AnalyticsChartProps {
  data: ChartDataPoint[];
  isDarkMode?: boolean;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, isDarkMode = false }) => {
  const axisColor = isDarkMode ? '#52525b' : '#a1a1aa'; // zinc-600 vs zinc-400
  const tooltipBg = isDarkMode ? '#18181b' : '#fff';
  const tooltipBorder = isDarkMode ? '#27272a' : '#e4e4e7';
  const tooltipText = isDarkMode ? '#f4f4f5' : '#18181b';

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVotes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: axisColor, fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: axisColor, fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: tooltipBg, 
              border: `1px solid ${tooltipBorder}`, 
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              fontSize: '12px'
            }}
            itemStyle={{ color: tooltipText }}
            labelStyle={{ color: tooltipText }}
          />
          <Area 
            type="monotone" 
            dataKey="votes" 
            stroke="#7c3aed" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorVotes)" 
            activeDot={{ r: 6, fill: '#7c3aed', stroke: isDarkMode ? '#000' : '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};