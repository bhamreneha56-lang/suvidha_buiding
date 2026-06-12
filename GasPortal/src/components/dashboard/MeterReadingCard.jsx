import React, { useState } from 'react';
import { Camera, CheckCircle, Upload } from 'lucide-react';

const MeterReadingCard = () => {
  const [inputValue, setInputValue] = useState('01452.00');
  const [status, setStatus] = useState('Pending'); // Pending, Verifying, Accepted
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleInputChange = (e) => {
    let val = e.target.value;
    // Allow only numbers and one decimal point
    val = val.replace(/[^0-9.]/g, '');
    const parts = val.split('.');
    if (parts.length > 2) return; // ignore multiple dots
    
    // Limit integer part to 5 digits, decimal part to 2 digits
    let integerPart = parts[0] ? parts[0].slice(0, 5) : '';
    let decimalPart = parts[1] ? parts[1].slice(0, 2) : '';

    let newVal = integerPart;
    if (val.includes('.')) {
      newVal += '.' + decimalPart;
    }
    setInputValue(newVal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Verifying');
    // Simulate API verification
    setTimeout(() => {
      setStatus('Accepted');
    }, 1500);
  };

  // Process digits for the digital meter display
  const getDigits = () => {
    const parts = inputValue.split('.');
    const integerStr = (parts[0] || '').padStart(5, '0');
    const decimalStr = (parts[1] || '').padEnd(2, '0');

    return {
      integers: integerStr.split(''),
      decimals: decimalStr.split('')
    };
  };

  const { integers, decimals } = getDigits();

  return (
    <div className="dash-card">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="dash-card-header-icon green">
            <Camera size={20} />
          </div>
          <span className="dash-card-header-title">Meter Submission</span>
        </div>
        
        {status === 'Accepted' && (
          <span className="badge badge-success flex items-center gap-1">
            <CheckCircle size={12}/> Verified
          </span>
        )}
        {status === 'Verifying' && (
          <span className="badge badge-warning animate-pulse">Verifying</span>
        )}
        {status === 'Pending' && (
          <span className="slab-active-badge" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>Due in 5 Days</span>
        )}
      </div>

      {/* Info */}
      <div className="mb-6">
        <p className="text-xs text-[var(--color-text-muted)] font-semibold uppercase tracking-wider mb-1">Latest Confirmed Reading</p>
        <p className="font-extrabold text-lg">01452.00 SCM <span className="text-xs font-normal text-[var(--color-text-muted)]">on 12 Apr 2026</span></p>
      </div>

      {/* Digital Meter Display Box */}
      <div className="meter-display-container mb-6">
        <p className="meter-display-label">Current Meter Reading</p>
        <div className="meter-display-digits">
          {integers.map((d, i) => (
            <div key={`int-${i}`} className="meter-box">{d}</div>
          ))}
          <div className="meter-dot">.</div>
          {decimals.map((d, i) => (
            <div key={`dec-${i}`} className="meter-box decimal">{d}</div>
          ))}
        </div>
        <p className="meter-display-unit">Standard Cubic Meter (SCM)</p>
      </div>

      {/* Input & Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="input-label mb-2 block text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">Enter Current Meter Reading</label>
          <input 
            type="text" 
            className="input-field w-full text-center font-bold text-lg py-2"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="01452.00"
            disabled={status !== 'Pending'}
          />
        </div>

        {/* Upload Dropzone */}
        <div>
          <label className="input-label mb-2 block text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">Upload Meter Photo Proof</label>
          <div 
            onClick={() => status === 'Pending' && setFileUploaded(true)}
            className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              fileUploaded 
                ? 'border-green-500 bg-green-50/10' 
                : 'border-[var(--color-border)] hover:bg-[var(--color-bg)] text-[var(--color-text-muted)]'
            }`}
          >
            {fileUploaded ? (
              <>
                <CheckCircle size={24} className="text-green-500 mb-2" />
                <span className="text-xs font-bold text-green-600 dark:text-green-400">meter_photo_proof.jpg uploaded</span>
              </>
            ) : (
              <>
                <Upload size={24} className="mb-2" />
                <span className="text-xs font-semibold">Click to upload meter photo</span>
              </>
            )}
          </div>
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          className="btn btn-primary w-full py-3 mt-2 font-bold"
          disabled={status !== 'Pending' || !inputValue}
        >
          {status === 'Pending' ? 'SUBMIT READING' : status === 'Verifying' ? 'VERIFYING...' : 'VERIFIED'}
        </button>
      </form>
    </div>
  );
};

export default MeterReadingCard;
