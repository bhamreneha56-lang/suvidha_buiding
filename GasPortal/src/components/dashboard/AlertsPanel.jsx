import React from 'react';
import { Bell, Phone, AlertOctagon, Calendar, ShieldAlert, Award } from 'lucide-react';

const AlertsPanel = () => {
  const alertsList = [
    {
      id: 'meter',
      type: 'yellow',
      iconClass: 'bg-yellow',
      icon: <Calendar size={18} />,
      title: 'Meter Reading Due',
      desc: 'Submit your monthly meter reading before the billing window closes to avoid estimated charges.',
      countdown: '3 Days Left',
      action: 'Submit Now'
    },
    {
      id: 'kyc',
      type: 'red',
      iconClass: 'bg-red',
      icon: <ShieldAlert size={18} />,
      title: 'KYC Document Expiring',
      desc: 'Update your Aadhaar and address proof verification immediately to prevent connection lock.',
      countdown: '12 Days Left',
      action: 'Update KYC'
    },
    {
      id: 'lpg',
      type: 'orange',
      iconClass: 'bg-orange',
      icon: <Award size={18} />,
      title: 'LPG Surrender Proof Needed',
      desc: 'Surrender your old cylinder connection and upload the voucher to receive pipeline subsidies.',
      countdown: '15 Days Left',
      action: 'Upload Voucher'
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* 24/7 Emergency Helpline Box */}
      <div className="smart-alert-emergency">
        <div className="flex items-start gap-3">
          <AlertOctagon size={24} className="text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-sm text-red-950 dark:text-red-200">Gas Leakage or Emergency?</h4>
            <p className="text-xs text-red-800 dark:text-red-300 mt-1">
              If you detect gas odor, close the main valve immediately and contact our round-the-clock hotline.
            </p>
          </div>
        </div>
        <a href="tel:1906" className="smart-alert-emergency-phone hover:opacity-95 transition-opacity">
          <Phone size={16} />
          <span>CALL EMERGENCY: 1906</span>
        </a>
      </div>

      {/* Main Alerts Panel */}
      <div className="dash-card">
        {/* Header */}
        <div className="dash-card-header justify-between">
          <div className="flex items-center gap-3">
            <div className="dash-card-header-icon red">
              <Bell size={20} />
            </div>
            <span className="dash-card-header-title">Smart Alerts</span>
          </div>
          <span className="slab-active-badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
            {alertsList.length} Active
          </span>
        </div>

        {/* Alerts List */}
        <div className="flex flex-col gap-3 mt-4">
          {alertsList.map((alert) => (
            <div key={alert.id} className={`smart-alert-item border-${alert.type}`}>
              <div className={`smart-alert-icon ${alert.iconClass}`}>
                {alert.icon}
              </div>
              
              <div className="smart-alert-content">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h4 className="smart-alert-title pr-16">{alert.title}</h4>
                  <span className="smart-alert-countdown">{alert.countdown}</span>
                </div>
                <p className="smart-alert-desc">{alert.desc}</p>
                <button 
                  onClick={() => window.alert(`Redirecting to ${alertItem.action} portal...`)}
                  className="smart-alert-action"
                >
                  {alert.action} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;
