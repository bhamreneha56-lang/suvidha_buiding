import React from 'react';
import { Flame, Clock } from 'lucide-react';

const LpgSurrenderCard = () => {
  return (
    <div className="card border-orange-200" style={{ borderColor: 'rgba(244, 121, 32, 0.3)' }}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Flame size={20} className="text-[var(--color-accent)]" />
          LPG Surrender
        </h3>
        <span className="badge badge-warning">Action Required</span>
      </div>

      <p className="text-sm mb-4">
        As per regulations, you must surrender your LPG connection within 60 days of PNG activation.
      </p>

      <div className="bg-orange-50 rounded-md p-4 mb-4 flex items-center justify-between" style={{ backgroundColor: 'rgba(244, 121, 32, 0.05)' }}>
        <div className="flex items-center gap-3">
          <Clock size={24} className="text-[var(--color-accent)]" />
          <div>
            <p className="text-xs text-[var(--color-text-muted)]">Time Remaining</p>
            <p className="font-bold text-xl text-[var(--color-accent)]">15 Days</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-muted)]">Status</span>
          <span className="font-semibold">Not Started</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-muted)]">Deadline</span>
          <span className="font-semibold">27 Jun 2026</span>
        </div>
      </div>

      <button className="btn btn-accent w-full mt-4">
        Upload Surrender Proof
      </button>
    </div>
  );
};

export default LpgSurrenderCard;
