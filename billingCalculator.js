import React, { useState } from 'react';
import { CheckCircle, MapPin, User, FileText, CreditCard, Activity } from 'lucide-react';

const NewConnection = () => {
  const [step, setStep] = useState(1);
  const [district, setDistrict] = useState('');
  const [eligibilityMessage, setEligibilityMessage] = useState('');

  const validDistricts = ['Tinsukia', 'Dibrugarh', 'Sivasagar', 'Charaideo', 'Jorhat', 'Golaghat', 'Majuli'];

  const handleDistrictChange = (e) => {
    const val = e.target.value;
    setDistrict(val);
    if (val && !validDistricts.includes(val)) {
      setEligibilityMessage('Service not available yet in your district.');
    } else if (val) {
      setEligibilityMessage('');
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const steps = [
    { id: 1, title: 'Eligibility', icon: <MapPin size={20} /> },
    { id: 2, title: 'Details', icon: <User size={20} /> },
    { id: 3, title: 'Documents', icon: <FileText size={20} /> },
    { id: 4, title: 'Payment', icon: <CreditCard size={20} /> },
    { id: 5, title: 'Tracker', icon: <Activity size={20} /> }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Apply for New Connection</h1>
        <p className="text-[var(--color-text-muted)]">Get a new Piped Natural Gas connection in 5 simple steps.</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-[var(--color-border)] -z-10 -translate-y-1/2 rounded"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-[var(--color-primary)] -z-10 -translate-y-1/2 rounded transition-all duration-300" 
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {steps.map((s) => (
          <div key={s.id} className="flex flex-col items-center gap-2 bg-[var(--color-bg)] px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              step >= s.id ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-border)] text-[var(--color-text-muted)]'
            }`}>
              {step > s.id ? <CheckCircle size={20} /> : s.icon}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${step >= s.id ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)]'}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <div className="card">
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-xl border-b border-[var(--color-border)] pb-2">Check Eligibility</h3>
            <div className="input-group">
              <label className="input-label">Select District</label>
              <select className="input-field" value={district} onChange={handleDistrictChange}>
                <option value="">Select your district...</option>
                <option value="Tinsukia">Tinsukia</option>
                <option value="Dibrugarh">Dibrugarh</option>
                <option value="Sivasagar">Sivasagar</option>
                <option value="Charaideo">Charaideo</option>
                <option value="Jorhat">Jorhat</option>
                <option value="Golaghat">Golaghat</option>
                <option value="Majuli">Majuli</option>
                <option value="Guwahati">Guwahati (Other)</option>
                <option value="Silchar">Silchar (Other)</option>
              </select>
              {eligibilityMessage && <p className="text-sm text-red-500 mt-1">{eligibilityMessage}</p>}
            </div>
            <div className="flex justify-end mt-4">
              <button 
                className="btn btn-primary" 
                onClick={nextStep} 
                disabled={!district || eligibilityMessage}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-xl border-b border-[var(--color-border)] pb-2">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input type="text" className="input-field" placeholder="John Doe" />
              </div>
              <div className="input-group">
                <label className="input-label">Mobile Number</label>
                <input type="tel" className="input-field" placeholder="9876543210" />
              </div>
              <div className="input-group">
                <label className="input-label">Email (Optional)</label>
                <input type="email" className="input-field" placeholder="john@example.com" />
              </div>
              <div className="input-group">
                <label className="input-label">Aadhaar Number</label>
                <input type="text" className="input-field" placeholder="XXXX-XXXX-1234" />
              </div>
            </div>
            
            <h4 className="font-semibold text-lg mt-2">Address details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="input-group md:col-span-2">
                <label className="input-label">Full Address</label>
                <textarea className="input-field" rows="2" placeholder="House no, Street, Locality"></textarea>
              </div>
              <div className="input-group">
                <label className="input-label">House Type</label>
                <select className="input-field">
                  <option>Owned</option>
                  <option>Rented</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Dwelling Type</label>
                <select className="input-field">
                  <option>Single Dwelling</option>
                  <option>Apartment</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <button className="btn btn-outline" onClick={prevStep}>Back</button>
              <button className="btn btn-primary" onClick={nextStep}>Save & Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-xl border-b border-[var(--color-border)] pb-2">Upload Documents</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-[var(--color-border)] rounded p-4 text-center">
                <p className="font-semibold mb-2">Aadhaar Card</p>
                <button className="btn btn-outline w-full mb-2">Choose File</button>
                <p className="text-xs text-[var(--color-text-muted)]">Max 5MB. PDF, JPG, PNG.</p>
              </div>
              <div className="border border-[var(--color-border)] rounded p-4 text-center">
                <p className="font-semibold mb-2">Address Proof</p>
                <button className="btn btn-outline w-full mb-2">Choose File</button>
                <p className="text-xs text-[var(--color-text-muted)]">Max 5MB. PDF, JPG, PNG.</p>
              </div>
            </div>

            <h4 className="font-semibold text-lg mt-2">LPG Connection Details (If any)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="input-group">
                <label className="input-label">Oil Company</label>
                <select className="input-field">
                  <option value="">None / Not Applicable</option>
                  <option>IOCL (Indane)</option>
                  <option>BPCL (Bharat Gas)</option>
                  <option>HPCL (HP Gas)</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">LPG Consumer Number</label>
                <input type="text" className="input-field" placeholder="Optional" />
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button className="btn btn-outline" onClick={prevStep}>Back</button>
              <button className="btn btn-primary" onClick={nextStep}>Verify & Continue</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-xl border-b border-[var(--color-border)] pb-2">Payment Details</h3>
            
            <div className="bg-[var(--color-bg)] rounded p-4 border border-[var(--color-border)]">
              <h4 className="font-semibold mb-4">Fee Breakdown</h4>
              <div className="flex justify-between py-2 border-b border-[var(--color-border)] border-dashed">
                <span>Refundable Deposit</span>
                <span>₹1,500.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--color-border)] border-dashed">
                <span>Installation Charges</span>
                <span>₹5,000.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
                <span>Application Fee</span>
                <span>₹20.00</span>
              </div>
              <div className="flex justify-between py-3 font-bold text-lg text-[var(--color-primary)]">
                <span>Total Amount Payable</span>
                <span>₹6,520.00</span>
              </div>
            </div>

            <p className="text-sm text-[var(--color-text-muted)] text-center my-4">
              Mock payment gateway. Click complete payment to continue.
            </p>

            <div className="flex justify-between mt-4">
              <button className="btn btn-outline" onClick={prevStep}>Back</button>
              <button className="btn btn-primary bg-green-600 hover:bg-green-700 text-white border-none" onClick={nextStep}>
                Complete Payment
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center gap-6 py-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle size={40} />
            </div>
            
            <div>
              <h3 className="font-bold text-2xl mb-2">Application Submitted!</h3>
              <p className="text-[var(--color-text-muted)] max-w-md mx-auto">
                Your application for a new PNG connection has been successfully received.
              </p>
            </div>

            <div className="w-full max-w-sm text-left bg-[var(--color-bg)] rounded-lg p-4 border border-[var(--color-border)] mt-4">
              <p className="text-sm text-[var(--color-text-muted)] mb-1">Application ID</p>
              <p className="font-mono font-bold text-lg">APP-PNG-88219</p>
            </div>

            <div className="w-full text-left mt-6">
              <h4 className="font-semibold mb-4">Application Status Tracker</h4>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="font-medium">Submitted</span>
                  <span className="text-xs text-[var(--color-text-muted)] ml-auto">Just now</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  <span>Verified</span>
                  <span className="text-xs text-[var(--color-text-muted)] ml-auto">Pending</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  <span>Survey</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  <span>Pipeline Work</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  <span>Active</span>
                </div>
              </div>
            </div>

            <button className="btn btn-primary mt-6 w-full max-w-sm" onClick={() => window.location.href='/'}>
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewConnection;
