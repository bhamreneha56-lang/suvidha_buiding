import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, Upload, AlertCircle, FileText, Check } from 'lucide-react';

const NewPipe = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    pincode: '',
    propertyType: '',
    floors: 'Ground',
    hasLpg: '',
    fullName: '',
    mobile: '',
    email: '',
    aadhaar: '',
    burners: '2',
    addressProof: null,
    ownershipProof: null,
    nocProof: null,
    paymentMethod: ''
  });

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handlePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(5);
    }, 2000);
  };

  const StepIndicator = () => {
    const steps = [
      "Eligibility Check", "Personal Details", "Property Documents", "Payment", "Confirmation"
    ];
    
    return (
      <div className="flex items-center justify-between w-full mb-8 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 h-1 bg-orange-500 -z-10 -translate-y-1/2 transition-all duration-300" style={{ width: `${((currentStep - 1) / 4) * 100}%` }}></div>
        
        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isActive = currentStep === stepNum;
          const isCompleted = currentStep > stepNum;
          
          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                isCompleted ? 'bg-green-500 text-white' : 
                isActive ? 'bg-orange-500 text-white ring-4 ring-orange-100 dark:ring-orange-900/30' : 
                'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
              }`}>
                {isCompleted ? <Check size={16} /> : stepNum}
              </div>
              <span className={`text-xs font-semibold hidden md:block ${isActive ? 'text-orange-600 dark:text-orange-400' : 'text-gray-500 dark:text-gray-400'}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 py-6 max-w-4xl mx-auto w-full px-4">
      {/* Header */}
      <div>
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline mb-4 font-medium">
          <ArrowLeft size={16} /> Back to PNG Portal
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          New Connection Wizard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Apply for a new Piped Natural Gas connection in 5 easy steps.</p>
      </div>

      <StepIndicator />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 min-h-[400px]">
        
        {/* STEP 1 */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">1. Eligibility Check</h2>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Pincode</label>
              <input 
                type="text" 
                placeholder="Enter 6-digit Pincode"
                value={formData.pincode}
                onChange={e => setFormData({...formData, pincode: e.target.value})}
                className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 max-w-xs focus:ring-2 focus:ring-orange-500 outline-none"
              />
              {formData.pincode.length >= 6 && (
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded-md max-w-md mt-1">
                  <CheckCircle2 size={16} /> 
                  ✅ PNG available in your area. Service provider: Methane Gas Nashik.
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Property Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="propType" checked={formData.propertyType === 'Owned'} onChange={() => setFormData({...formData, propertyType: 'Owned'})} className="text-orange-500 focus:ring-orange-500" />
                  <span>Owned</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="propType" checked={formData.propertyType === 'Rented'} onChange={() => setFormData({...formData, propertyType: 'Rented'})} className="text-orange-500 focus:ring-orange-500" />
                  <span>Rented</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Floors in Building</label>
              <select 
                value={formData.floors}
                onChange={e => setFormData({...formData, floors: e.target.value})}
                className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 max-w-xs focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option>Ground</option>
                <option>1st Floor</option>
                <option>2nd Floor</option>
                <option>3rd Floor</option>
                <option>4th Floor +</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Existing LPG Connection?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="hasLpg" checked={formData.hasLpg === 'Yes'} onChange={() => setFormData({...formData, hasLpg: 'Yes'})} className="text-orange-500 focus:ring-orange-500" />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="hasLpg" checked={formData.hasLpg === 'No'} onChange={() => setFormData({...formData, hasLpg: 'No'})} className="text-orange-500 focus:ring-orange-500" />
                  <span>No</span>
                </label>
              </div>
              {formData.hasLpg === 'Yes' && (
                <div className="flex items-start gap-2 text-sm text-orange-700 bg-orange-50 p-3 rounded-md max-w-md mt-1 border border-orange-100">
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" /> 
                  <span>LPG connection must be surrendered within 60 days of PNG activation as per regulations.</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-4">
              <button onClick={handleNext} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2">
                Check Eligibility & Continue <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">2. Personal Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Mobile Number</label>
                <input type="tel" maxLength={10} value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value.replace(/\D/g, '')})} className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Aadhaar Number</label>
                <input 
                  type="text" 
                  maxLength={12} 
                  value={formData.aadhaar} 
                  onChange={e => setFormData({...formData, aadhaar: e.target.value.replace(/\D/g, '')})} 
                  placeholder={formData.aadhaar.length === 12 ? `XXXX-XXXX-${formData.aadhaar.slice(-4)}` : "12-digit number"}
                  className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 outline-none" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Number of Burners</label>
                <select value={formData.burners} onChange={e => setFormData({...formData, burners: e.target.value})} className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 outline-none">
                  <option>1 Burner</option>
                  <option>2 Burners</option>
                  <option>3 Burners</option>
                  <option>4 Burners +</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex gap-4">
              <button onClick={handlePrev} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-lg transition-colors">
                ← Back
              </button>
              <button onClick={handleNext} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2">
                Save & Continue <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">3. Property Documents</h2>
            
            <div className="flex flex-col gap-4">
              
              {/* Doc 1 */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Address Proof</h3>
                  <p className="text-xs text-gray-500">Aadhaar / Voter ID / Utility Bill (PDF/JPG)</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {formData.addressProof ? (
                    <span className="text-sm text-green-600 font-bold flex items-center gap-1"><CheckCircle2 size={16}/> ✅ Uploaded</span>
                  ) : (
                    <span className="text-sm text-orange-500 font-bold flex items-center gap-1"><AlertCircle size={16}/> ⚠️ Required</span>
                  )}
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1.5 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors">
                    <Upload size={14} /> Browse
                    <input type="file" className="hidden" onChange={(e) => setFormData({...formData, addressProof: e.target.files[0]})} />
                  </label>
                </div>
              </div>

              {/* Doc 2 */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Property Ownership / Rent Agreement</h3>
                  <p className="text-xs text-gray-500">Valid registered agreement (PDF/JPG)</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {formData.ownershipProof ? (
                    <span className="text-sm text-green-600 font-bold flex items-center gap-1"><CheckCircle2 size={16}/> ✅ Uploaded</span>
                  ) : (
                    <span className="text-sm text-orange-500 font-bold flex items-center gap-1"><AlertCircle size={16}/> ⚠️ Required</span>
                  )}
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1.5 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors">
                    <Upload size={14} /> Browse
                    <input type="file" className="hidden" onChange={(e) => setFormData({...formData, ownershipProof: e.target.files[0]})} />
                  </label>
                </div>
              </div>

              {/* Doc 3 (Conditional) */}
              {formData.propertyType === 'Rented' && (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">NOC from Landlord</h3>
                    <p className="text-xs text-gray-500">Required because property is rented</p>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {formData.nocProof ? (
                      <span className="text-sm text-green-600 font-bold flex items-center gap-1"><CheckCircle2 size={16}/> ✅ Uploaded</span>
                    ) : (
                      <span className="text-sm text-orange-500 font-bold flex items-center gap-1"><AlertCircle size={16}/> ⚠️ Required</span>
                    )}
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1.5 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors">
                      <Upload size={14} /> Browse
                      <input type="file" className="hidden" onChange={(e) => setFormData({...formData, nocProof: e.target.files[0]})} />
                    </label>
                  </div>
                </div>
              )}

            </div>

            <div className="mt-4 flex gap-4">
              <button onClick={handlePrev} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-lg transition-colors">
                ← Back
              </button>
              <button onClick={handleNext} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2">
                Upload & Continue <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {currentStep === 4 && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">4. Payment Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Breakdown */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Fee Breakdown</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Connection Security Deposit</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹7,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Application Processing Fee</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹500</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">GST (18%)</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹1,350</span>
                  </div>
                  <div className="flex justify-between pt-2 text-lg font-bold">
                    <span className="text-gray-900 dark:text-white">Total Payable</span>
                    <span className="text-orange-500">₹8,850</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Select Payment Method</h3>
                
                <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <input type="radio" name="payMethod" className="text-orange-500 focus:ring-orange-500" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">UPI (Google Pay / PhonePe / Paytm)</span>
                </label>
                
                <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <input type="radio" name="payMethod" className="text-orange-500 focus:ring-orange-500" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">Net Banking</span>
                </label>
                
                <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <input type="radio" name="payMethod" className="text-orange-500 focus:ring-orange-500" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">Debit / Credit Card</span>
                </label>
              </div>
            </div>

            <div className="mt-4 flex gap-4">
              <button onClick={handlePrev} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-lg transition-colors">
                ← Back
              </button>
              <button onClick={handlePayment} disabled={isLoading} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-8 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {isLoading ? (
                  <>Processing...</>
                ) : (
                  <>Pay ₹8,850</>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {currentStep === 5 && (
          <div className="flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-500 py-8">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 size={48} />
            </div>
            
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Application Submitted Successfully!</h2>
              <p className="text-gray-500 dark:text-gray-400">Your application has been received and payment is confirmed.</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 w-full max-w-md my-2">
              <p className="text-sm text-gray-500 mb-1">Application ID</p>
              <p className="font-mono text-lg font-bold text-gray-900 dark:text-white tracking-wider">PNG-APP-2026-78432</p>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md">
              <span className="font-bold text-gray-900 dark:text-white">Expected Timeline:</span> Site inspection in 3–5 business days. Full installation in 7–15 days if pipeline exists.
            </p>

            {/* Tracker Preview */}
            <div className="w-full max-w-lg mt-4 flex items-center justify-between text-xs font-semibold text-center relative px-2">
              <div className="absolute top-3 left-6 right-6 h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
              
              <div className="flex flex-col items-center gap-1 text-green-600 w-16">
                <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center"><Check size={12}/></div>
                <span>Applied ✓</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-gray-400 w-16">
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <span>Site Check</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-gray-400 w-16">
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <span>Pipeline Work</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-gray-400 w-16">
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <span>Meter Install</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-gray-400 w-16">
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <span>Active</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button 
                onClick={() => alert('PDF download coming soon')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FileText size={18} /> Download Acknowledgment
              </button>
              <button 
                onClick={() => navigate('/dashboard/my-dashboard')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Track Your Application <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default NewPipe;
