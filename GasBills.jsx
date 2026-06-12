import React from 'react';
import { Shield } from 'lucide-react';

const ConnectionInfoCard = () => {
  const connectionDetails = [
    { label: 'Customer Number', value: 'PNG-2409-8812' },
    { label: 'Connection Category', value: 'Domestic (Single Dwelling)' },
    { label: 'Meter Serial Number', value: 'MTR-9921-A' },
    { label: 'Supply Area / Town', value: 'Jorhat' },
    { label: 'Pipeline Sector', value: 'Sector 4, Main Line' }
  ];

  return (
    <div className="dash-card">
      {/* Header */}
      <div className="dash-card-header mb-6">
        <div className="dash-card-header-icon purple">
          <Shield size={20} />
        </div>
        <span className="dash-card-header-title">Connection Details</span>
      </div>

      {/* Details List */}
      <div className="flex flex-col">
        {connectionDetails.map((item, index) => (
          <div key={index} className="conn-info-row">
            <span className="conn-info-label">{item.label}</span>
            <span className="conn-info-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionInfoCard;
