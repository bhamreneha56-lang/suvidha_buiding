import React, { useState, useEffect } from 'react';
import { calculateBill } from '../../utils/billingCalculator';

const BillCalculatorWidget = () => {
  const [startReading, setStartReading] = useState(1350);
  const [endReading, setEndReading] = useState(1452);
  const [days, setDays] = useState(60);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (startReading !== '' && endReading !== '' && days !== '') {
      const start = parseFloat(startReading) || 0;
      const end = parseFloat(endReading) || 0;
      const d = parseInt(days) || 60;
      
      if (end >= start && d > 0) {
        setResult(calculateBill(start, end, d));
      } else {
        setResult(null);
      }
    }
  }, [startReading, endReading, days]);

  return (
    <div className="card">
      <h3 className="font-bold text-xl mb-4">PNG Bill Calculator</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="input-group">
            <label className="input-label">Start Reading (SCM)</label>
            <input 
              type="number" 
              className="input-field" 
              value={startReading} 
              onChange={(e) => setStartReading(e.target.value)} 
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">End Reading (SCM)</label>
            <input 
              type="number" 
              className="input-field" 
              value={endReading} 
              onChange={(e) => setEndReading(e.target.value)} 
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Billing Period (Days)</label>
            <input 
              type="number" 
              className="input-field" 
              value={days} 
              onChange={(e) => setDays(e.target.value)} 
            />
          </div>
        </div>

        <div className="bg-[var(--color-bg)] rounded-md p-6 border border-[var(--color-border)]">
          <h4 className="font-semibold text-lg mb-4 border-b border-[var(--color-border)] pb-2">Estimated Bill</h4>
          
          {result ? (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Total Consumption</span>
                <span className="font-semibold">{result.totalVolume} SCM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Daily Average</span>
                <span className="font-semibold">{result.dailyAverage} SCM/day</span>
              </div>
              
              <div className="my-2 border-t border-dashed border-[var(--color-border)]"></div>
              
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Slab I ({result.slab1.units} SCM)</span>
                <span>₹{result.slab1.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Slab II ({result.slab2.units} SCM)</span>
                <span>₹{result.slab2.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Slab III ({result.slab3.units} SCM)</span>
                <span>₹{result.slab3.amount.toFixed(2)}</span>
              </div>
              
              <div className="my-2 border-t border-dashed border-[var(--color-border)]"></div>
              
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Fixed Charges</span>
                <span>₹{result.fixedCharges.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">GST (18%)</span>
                <span>₹{result.gstAmount.toFixed(2)}</span>
              </div>
              
              <div className="my-2 border-t border-[var(--color-border)]"></div>
              
              <div className="flex justify-between">
                <span className="font-bold">Net Payable</span>
                <span className="font-bold text-xl text-[var(--color-primary)]">₹{result.netPayable.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-[var(--color-text-muted)]">
              Enter valid readings to see estimation
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillCalculatorWidget;
