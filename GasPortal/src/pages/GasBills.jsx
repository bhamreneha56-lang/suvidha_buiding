import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calculator, FileText } from 'lucide-react';

const GasBills = () => {
  const [prevReading, setPrevReading] = useState(1205);
  const [currReading, setCurrReading] = useState(1248);
  const [billingDays, setBillingDays] = useState(60);
  const [billResult, setBillResult] = useState(null);

  const calculateBill = () => {
    const SCM_total = Math.max(0, currReading - prevReading);
    const SCM_per_day = billingDays > 0 ? SCM_total / billingDays : 0;
    
    const slab1_limit = 0.59 * billingDays;
    const slab2_limit = 1.49 * billingDays;

    let slab1_scm = 0, slab2_scm = 0, slab3_scm = 0;

    if (SCM_total <= slab1_limit) {
      slab1_scm = SCM_total;
    } else if (SCM_total <= slab2_limit) {
      slab1_scm = slab1_limit;
      slab2_scm = SCM_total - slab1_limit;
    } else {
      slab1_scm = slab1_limit;
      slab2_scm = slab2_limit - slab1_limit;
      slab3_scm = SCM_total - slab2_limit;
    }

    const slab1_amount = slab1_scm * 21.96;
    const slab2_amount = slab2_scm * 26.01;
    const slab3_amount = slab3_scm * 33.36;

    const fixed_charges = 85.00;
    const gas_value = slab1_amount + slab2_amount + slab3_amount;
    const gst = (gas_value + fixed_charges) * 0.05;
    const total_bill = gas_value + fixed_charges + gst;

    let currentSlab = 'Slab I';
    if (SCM_per_day > 0.59 && SCM_per_day <= 1.49) currentSlab = 'Slab II';
    if (SCM_per_day > 1.49) currentSlab = 'Slab III';

    setBillResult({
      SCM_total,
      SCM_per_day,
      slab1_scm, slab2_scm, slab3_scm,
      slab1_amount, slab2_amount, slab3_amount,
      fixed_charges,
      gas_value,
      gst,
      total_bill,
      currentSlab,
      avg_rate: SCM_total > 0 ? gas_value / SCM_total : 0
    });
  };

  const mockHistory = [
    { period: 'Apr–May 2026', scm: 42.6, amount: 1108, status: 'DUE' },
    { period: 'Feb–Mar 2026', scm: 38.2, amount: 991, status: 'PAID ✓' },
    { period: 'Dec–Jan 2026', scm: 31.0, amount: 805, status: 'PAID ✓' },
    { period: 'Oct–Nov 2025', scm: 35.5, amount: 922, status: 'PAID ✓' },
    { period: 'Aug–Sep 2025', scm: 28.8, amount: 748, status: 'PAID ✓' },
    { period: 'Jun–Jul 2025', scm: 30.1, amount: 781, status: 'PAID ✓' },
  ];

  return (
    <div className="flex flex-col gap-8 py-6 max-w-6xl mx-auto w-full px-4">
      {/* Header */}
      <div>
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline mb-4 font-medium">
          <ArrowLeft size={16} /> Back to PNG Portal
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
          <Calculator className="text-green-500" /> Gas Bills
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PART 1: INTERACTIVE BILL CALCULATOR */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">PNG Bill Calculator</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Enter your meter readings to calculate your bill with slab-wise breakdown.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Prev Reading</label>
              <input 
                type="number" 
                value={prevReading} 
                onChange={(e) => setPrevReading(Number(e.target.value))}
                className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Curr Reading</label>
              <input 
                type="number" 
                value={currReading} 
                onChange={(e) => setCurrReading(Number(e.target.value))}
                className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Billing Days</label>
              <input 
                type="number" 
                value={billingDays} 
                onChange={(e) => setBillingDays(Number(e.target.value))}
                className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <button onClick={calculateBill} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors w-full md:w-auto self-start">
            Calculate Bill
          </button>

          {billResult && (
            <div className="mt-4 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Summary Card */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-600 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">SCM Total</p>
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white">{billResult.SCM_total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">SCM/Day</p>
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white">{billResult.SCM_per_day.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Avg Rate</p>
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white">₹{billResult.avg_rate.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Total Payable</p>
                  <p className="text-lg font-extrabold text-green-600 dark:text-green-400">₹{billResult.total_bill.toFixed(2)}</p>
                </div>
              </div>

              {/* Current Slab Badge */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">You are currently in:</span>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                  billResult.currentSlab === 'Slab I' ? 'bg-green-100 text-green-700' :
                  billResult.currentSlab === 'Slab II' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {billResult.currentSlab}
                </span>
              </div>

              {/* Slab Breakdown Table */}
              <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                  <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-4 py-3">Slab</th>
                      <th className="px-4 py-3">SCM Range (SCM/day)</th>
                      <th className="px-4 py-3 text-right">SCM Used</th>
                      <th className="px-4 py-3 text-right">Rate (₹/SCM)</th>
                      <th className="px-4 py-3 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    <tr>
                      <td className="px-4 py-3 font-medium">Slab I</td>
                      <td className="px-4 py-3">0 – 0.59</td>
                      <td className="px-4 py-3 text-right">{billResult.slab1_scm.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right">₹21.96</td>
                      <td className="px-4 py-3 text-right">₹{billResult.slab1_amount.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Slab II</td>
                      <td className="px-4 py-3">0.60 – 1.49</td>
                      <td className="px-4 py-3 text-right">{billResult.slab2_scm.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right">₹26.01</td>
                      <td className="px-4 py-3 text-right">₹{billResult.slab2_amount.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Slab III</td>
                      <td className="px-4 py-3">&gt;1.50</td>
                      <td className="px-4 py-3 text-right">{billResult.slab3_scm.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right">₹33.36</td>
                      <td className="px-4 py-3 text-right">₹{billResult.slab3_amount.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                      <td colSpan="4" className="px-4 py-2 font-medium text-right">Fixed Charges</td>
                      <td className="px-4 py-2 text-right">₹{billResult.fixed_charges.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                      <td colSpan="4" className="px-4 py-2 font-medium text-right">GST (5%)</td>
                      <td className="px-4 py-2 text-right">₹{billResult.gst.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-gray-100 dark:bg-gray-700/50 font-bold text-gray-900 dark:text-white">
                      <td colSpan="4" className="px-4 py-3 text-right">Total Payable</td>
                      <td className="px-4 py-3 text-right text-green-600 dark:text-green-400">₹{billResult.total_bill.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 text-center italic mt-2">Tariff rates as per PNGRB regulations. Subject to revision.</p>
            </div>
          )}
        </section>

        {/* PART 2: BILL HISTORY */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Bill History</h2>
          </div>

          <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
            <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
              <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">Bill Period</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">SCM Used</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {mockHistory.map((bill, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{bill.period}</td>
                    <td className="px-4 py-4 text-right">{bill.scm.toFixed(1)}</td>
                    <td className="px-4 py-4 text-right font-bold text-gray-900 dark:text-white">₹{bill.amount}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        bill.status === 'DUE' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {bill.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {bill.status === 'DUE' ? (
                        <button 
                          onClick={() => alert("Redirecting to payment gateway... (UPI / Net Banking / Card)")}
                          className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-1.5 px-3 rounded whitespace-nowrap transition-colors"
                        >
                          Pay Now
                        </button>
                      ) : (
                        <button 
                          onClick={() => alert(`View Slab Breakdown for ${bill.period}`)}
                          className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs font-bold py-1.5 px-3 rounded whitespace-nowrap transition-colors"
                        >
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GasBills;
