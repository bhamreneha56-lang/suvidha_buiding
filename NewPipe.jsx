import { History, CheckCircle2, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DeliveryHistoryCard = () => {
  const mockDeliveries = [
    { status: 'Delivered Successfully', date: '12 May 2026, 02:30 PM', verification: 'OTP Verified', sn: 'CYL-99812A', agent: 'Agent: Ramesh K.' },
    { status: 'Delivered Successfully', date: '30 Mar 2026, 11:15 AM', verification: 'OTP Verified', sn: 'CYL-88234B', agent: 'Agent: Suresh M.' },
    { status: 'Delivered Successfully', date: '14 Feb 2026, 04:45 PM', verification: 'OTP Verified', sn: 'CYL-77561C', agent: 'Agent: Prakash T.' },
    { status: 'Delivered Successfully', date: '02 Jan 2026, 10:00 AM', verification: 'OTP Verified', sn: 'CYL-66490D', agent: 'Agent: Anil V.' },
    { status: 'Failed', date: '02 Jan 2026, 09:30 AM', verification: 'Failed — OTP Mismatch', sn: 'CYL-66490D', agent: 'Agent: Anil V.' },
    { status: 'Delivered Successfully', date: '21 Nov 2025, 03:20 PM', verification: 'OTP Verified', sn: 'CYL-55301E', agent: 'Agent: Mahesh G.' },
  ];

  const chartData = [
    { name: '1', days: 40 },
    { name: '2', days: 45 },
    { name: '3', days: 42 },
    { name: '4', days: 48 },
    { name: '5', days: 44 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <History className="text-gray-500" /> Delivery History
      </h2>

      {/* Delivery List */}
      <div className="flex flex-col gap-4">
        {mockDeliveries.map((del, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {del.status === 'Delivered Successfully' ? (
                  <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 size={12}/> {del.status}</span>
                ) : (
                  <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full flex items-center gap-1"><XCircle size={12}/> {del.status}</span>
                )}
                <span className="text-sm font-semibold text-gray-900">{del.date}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                <span className={`font-semibold ${del.verification.includes('Failed') ? 'text-red-500' : 'text-green-600'}`}>{del.verification}</span>
                <span>•</span>
                <span className="font-mono">{del.sn}</span>
                <span>•</span>
                <span>{del.agent}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="border-gray-100" />

      {/* Analytics Section */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4">Your Consumption Analytics</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <p className="text-xs text-blue-800 font-semibold mb-1">Avg Days/Cylinder</p>
            <p className="font-bold text-blue-900 text-lg">44 days</p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg p-3">
            <p className="text-xs text-green-800 font-semibold mb-1">Fastest Consumption</p>
            <p className="font-bold text-green-900 text-lg">40 days</p>
            <p className="text-[10px] text-green-700 mt-0.5">Oct–Nov 2025</p>
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
            <p className="text-xs text-purple-800 font-semibold mb-1">Slowest Consumption</p>
            <p className="font-bold text-purple-900 text-lg">48 days</p>
            <p className="text-[10px] text-purple-700 mt-0.5">Jan–Feb 2026</p>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 flex flex-col justify-center">
            <p className="text-xs text-orange-800 font-semibold mb-1">Consistency</p>
            <p className="font-bold text-orange-900 text-sm">⭐ High</p>
            <p className="text-[10px] text-orange-700 mt-0.5">Very consistent usage</p>
          </div>
        </div>

        {/* Cylinder Interval Chart */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-3">Days per Cylinder (last 5)</h4>
          <div className="h-40 w-full bg-gray-50 border border-gray-100 rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: -10 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="days" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DeliveryHistoryCard;
