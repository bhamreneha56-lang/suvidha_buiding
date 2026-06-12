import React from 'react';
import { ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

const KycStatusCard = ({ status = 'Expiring soon', lastUpdated = '12 Jan 2025' }) => {
  let badgeClass = 'badge-success';
  let Icon = ShieldCheck;
  let textClass = 'text-green-500';

  if (status === 'Expiring soon') {
    badgeClass = 'badge-warning';
    Icon = ShieldAlert;
    textClass = 'text-yellow-500';
  } else if (status === 'Expired') {
    badgeClass = 'badge-danger';
    Icon = Shield;
    textClass = 'text-red-500';
  }

  return (
    <div className="card flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg mb-4">KYC Status</h3>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-full bg-opacity-10 ${badgeClass.replace('badge-', 'bg-')}`}>
            <Icon size={24} className={textClass} />
          </div>
          <div>
            <div className={`badge ${badgeClass} mb-1`}>{status}</div>
            <p className="text-sm text-[var(--color-text-muted)]">Last updated: {lastUpdated}</p>
          </div>
        </div>
        
        {status !== 'Completed' && (
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            Please update your Aadhaar and address proof to avoid service interruption.
          </p>
        )}
      </div>

      <button className="btn btn-outline w-full mt-4">
        Update KYC
      </button>
    </div>
  );
};

export default KycStatusCard;
