import { useState, useEffect } from 'react';
import BillCard from '../components/dashboard/BillCard';
import ConsumptionChart from '../components/dashboard/ConsumptionChart';
import MeterReadingCard from '../components/dashboard/MeterReadingCard';
import ConnectionInfoCard from '../components/dashboard/ConnectionInfoCard';
import AlertsPanel from '../components/dashboard/AlertsPanel';
import AiForecastCard from '../components/dashboard/AiForecastCard';
import { calculateBill } from '../utils/billingCalculator';

const MyDashboard = () => {
  const [billData, setBillData] = useState(null);

  useEffect(() => {
    // Mock calculate bill
    const startReading = 1350;
    const endReading = 1452; // 102 SCM difference
    const calculated = calculateBill(startReading, endReading, 60, 50, 0.18);
    
    setBillData({
      ...calculated,
      status: 'Unpaid',
      dueDate: '20 Jun 2026',
    });
  }, []);

  if (!billData) return <div className="text-center py-10">Loading Dashboard...</div>;

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Page Title & Greeting */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold mb-1 tracking-tight text-gray-900 dark:text-white">Hello, John Doe</h1>
          <p className="text-[var(--color-text-muted)] text-sm">Manage your Piped Natural Gas (PNG) connection and billing.</p>
        </div>
      </div>

      {/* Top Row: My Bill & Consumption History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BillCard billData={billData} />
        <ConsumptionChart />
      </div>

      {/* Bottom Grid: Operations & Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Operation Column: Meter Submission & AI Usage Simulator */}
        <div className="flex flex-col gap-6">
          <MeterReadingCard />
          <AiForecastCard />
        </div>

        {/* Right Details Column: Connection Specs & Alerts Panel */}
        <div className="flex flex-col gap-6">
          <ConnectionInfoCard />
          <AlertsPanel />
        </div>
        
      </div>
    </div>
  );
};

export default MyDashboard;
