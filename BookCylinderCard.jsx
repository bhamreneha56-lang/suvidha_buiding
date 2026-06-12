import React from 'react';
import { CreditCard, AlertTriangle, Calendar } from 'lucide-react';

const BillCard = ({ billData }) => {
  // Determine active slab
  let activeSlab = 'SLAB 1 ACTIVE';
  let slabBadgeColor = 'slab-active-badge';
  
  if (billData.slab3 && billData.slab3.units > 0) {
    activeSlab = 'SLAB 3 ACTIVE';
  } else if (billData.slab2 && billData.slab2.units > 0) {
    activeSlab = 'SLAB 2 ACTIVE';
  }

  // Calculate percentages for bars
  const slab1Max = 35.4;
  const slab2Max = 54.0;
  const slab3Max = 50.0;

  const slab1Percent = Math.min(100, ((billData.slab1?.units || 0) / slab1Max) * 100);
  const slab2Percent = Math.min(100, ((billData.slab2?.units || 0) / slab2Max) * 100);
  const slab3Percent = Math.min(100, ((billData.slab3?.units || 0) / slab3Max) * 100);

  return (
    <div className="dash-card">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="dash-card-header-icon navy">
            <CreditCard size={20} />
          </div>
          <span className="dash-card-header-title">My Bill</span>
        </div>
        <span className="slab-active-badge">{activeSlab}</span>
      </div>

      {/* Net Payable & Billing Period */}
      <div className="mb-6">
        <p className="text-3xl font-extrabold text-[var(--color-primary)] dark:text-white">
          ₹{billData.netPayable.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-[var(--color-text-muted)] mt-1 flex items-center gap-1">
          <Calendar size={12} /> Period: 01 Apr – 31 May 2026
        </p>
      </div>

      {/* Slab Breakdown Progress Bars */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-[var(--color-text-muted)]">SLAB I (₹{billData.slab1?.rate}/SCM)</span>
            <span>{billData.slab1?.units} / {slab1Max} SCM</span>
          </div>
          <div className="slab-bar-track">
            <div className="slab-bar-fill green" style={{ width: `${slab1Percent}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-[var(--color-text-muted)]">SLAB II (₹{billData.slab2?.rate}/SCM)</span>
            <span>{billData.slab2?.units} / {slab2Max} SCM</span>
          </div>
          <div className="slab-bar-track">
            <div className="slab-bar-fill orange" style={{ width: `${slab2Percent}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-[var(--color-text-muted)]">SLAB III (₹{billData.slab3?.rate}/SCM)</span>
            <span>{billData.slab3?.units} SCM</span>
          </div>
          <div className="slab-bar-track">
            <div className="slab-bar-fill red" style={{ width: `${slab3Percent}%` }} />
          </div>
        </div>
      </div>

      {/* Due Date Alert Banner */}
      <div className="due-date-banner">
        <div className="due-date-banner-text">
          <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400" />
          <span>Due in 3 Days ({billData.dueDate})</span>
        </div>
        <span className="text-xs font-bold text-amber-800 dark:text-amber-300">₹{billData.netPayable.toFixed(2)}</span>
      </div>

      {/* Pay Button */}
      <button className="btn-pay-now w-full mt-5 py-3" disabled={billData.status === 'Paid'}>
        {billData.status === 'Paid' ? 'PAID' : 'PAY NOW'}
      </button>
    </div>
  );
};

export default BillCard;
