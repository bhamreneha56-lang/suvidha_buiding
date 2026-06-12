import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity } from 'lucide-react';

const data = [
  { month: 'Nov', scm: 35.0 },
  { month: 'Dec', scm: 42.0 },
  { month: 'Jan', scm: 58.0 },
  { month: 'Feb', scm: 49.0 },
  { month: 'Mar', scm: 38.0 },
  { month: 'Apr', scm: 78.5 }, // Active Month
];

const ConsumptionChart = () => {
  const latest = 78.5;
  const dailyAvg = 1.31;

  return (
    <div className="dash-card">
      {/* Header */}
      <div className="dash-card-header mb-6">
        <div className="dash-card-header-icon blue">
          <Activity size={20} />
        </div>
        <span className="dash-card-header-title">Consumption (6 Months)</span>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 gap-4 border-b border-[var(--color-border)] pb-5 mb-5">
        <div>
          <p className="text-xs text-[var(--color-text-muted)] font-semibold uppercase tracking-wider">This Month</p>
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">{latest.toFixed(1)} SCM</p>
        </div>
        <div>
          <p className="text-xs text-[var(--color-text-muted)] font-semibold uppercase tracking-wider">Daily Avg</p>
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">{dailyAvg.toFixed(2)} SCM/d</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="barGradientActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#ea580c" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontWeight: 600 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontWeight: 600 }}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              contentStyle={{ 
                backgroundColor: 'var(--color-surface)', 
                borderColor: 'var(--color-border)', 
                borderRadius: '12px',
                color: 'var(--color-text)',
                fontWeight: 600
              }} 
            />
            <Bar dataKey="scm" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.month === 'Apr' ? 'url(#barGradientActive)' : 'url(#barGradient)'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="chart-legend border-t border-[var(--color-border)] pt-4">
        <div className="chart-legend-item">
          <span className="chart-legend-dot" style={{ backgroundColor: '#3b82f6' }} />
          <span>Standard Usage</span>
        </div>
        <div className="chart-legend-item">
          <span className="chart-legend-dot" style={{ backgroundColor: '#f97316' }} />
          <span>Active Billing Slabs</span>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionChart;
