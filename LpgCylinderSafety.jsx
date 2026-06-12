import { useState } from 'react';
import { User, CheckCircle2, AlertCircle, Upload, Check } from 'lucide-react';

const LpgProfileCard = () => {
  const [showKycModal, setShowKycModal] = useState(false);
  const [kycForm, setKycForm] = useState({ name: '', address: '', idType: 'Aadhaar' });

  // Mock surrender dates
  const pngActivationDate = new Date('2026-01-15');
  const surrenderDeadline = new Date(pngActivationDate);
  surrenderDeadline.setDate(surrenderDeadline.getDate() + 60); // 16 Mar 2026

  const isDeadlinePassed = new Date() > surrenderDeadline; // true for Jun 2026

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <User className="text-blue-500" /> LPG Profile
        </h2>
        <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">Linked to PNG</span>
      </div>

      <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
        <div>
          <p className="text-gray-500 text-xs font-semibold uppercase">Consumer No</p>
          <p className="font-bold text-gray-900">100029384756</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs font-semibold uppercase">OMC</p>
          <p className="font-bold text-gray-900">Indian Oil (Indane)</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500 text-xs font-semibold uppercase">Distributor</p>
          <p className="font-bold text-gray-900">Assam Gas Agency (IOCL)</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs font-semibold uppercase">Mobile</p>
          <p className="font-bold text-gray-900">+91-XXXXXX7890</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs font-semibold uppercase">Burner Type</p>
          <p className="font-bold text-gray-900">2-Burner stove</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs font-semibold uppercase">Household</p>
          <p className="font-bold text-gray-900">4 members</p>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* LPG Surrender Status */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3">LPG Surrender Status</h3>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-sm flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Activation Date:</span>
            <span className="font-semibold text-gray-900">15 Jan 2026</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Surrender Deadline:</span>
            <span className="font-semibold text-gray-900">16 Mar 2026</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-gray-600">Current Status:</span>
            {isDeadlinePassed ? (
              <span className="font-bold text-red-600 flex items-center gap-1"><AlertCircle size={14}/> ⚠️ Deadline Passed</span>
            ) : (
              <span className="font-bold text-orange-600">Pending Surrender</span>
            )}
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-start gap-2 text-green-700">
              <CheckCircle2 size={16} className="mt-0.5" /> <span className="text-xs font-medium">Step 1: PNG Activated — 15 Jan 2026</span>
            </div>
            <div className="flex items-start gap-2 text-green-700">
              <CheckCircle2 size={16} className="mt-0.5" /> <span className="text-xs font-medium">Step 2: Surrender Notice Sent</span>
            </div>
            <div className="flex items-start gap-2 text-orange-600">
              <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 flex-shrink-0"><span className="w-2 h-2 rounded-full bg-orange-500"></span></div>
              <div className="flex flex-col gap-2 w-full">
                <span className="text-xs font-medium">Step 3: Surrender Acknowledgment — Pending Upload</span>
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-1.5 px-3 rounded w-max flex items-center gap-1 transition-colors">
                  <Upload size={12} /> Upload Acknowledgment
                </button>
              </div>
            </div>
            <div className="flex items-start gap-2 text-gray-400">
              <div className="w-4 h-4 border-2 border-gray-300 rounded-full mt-0.5 flex-shrink-0"></div>
              <span className="text-xs font-medium">Step 4: Verification by OMC — Pending</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* eKYC Section */}
      <div className="flex justify-between items-center bg-green-50 p-4 border border-green-100 rounded-lg">
        <div>
          <p className="text-xs text-green-800 font-semibold uppercase mb-0.5">eKYC Status</p>
          <p className="font-bold text-green-700 flex items-center gap-1"><CheckCircle2 size={16}/> Verified</p>
        </div>
        <button onClick={() => setShowKycModal(true)} className="bg-white border border-green-200 text-green-700 hover:bg-green-100 text-xs font-bold py-1.5 px-3 rounded transition-colors">
          Update KYC
        </button>
      </div>

      {showKycModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Update eKYC</h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">Full Name</label>
                <input type="text" value={kycForm.name} onChange={e => setKycForm({...kycForm, name: e.target.value})} className="px-3 py-2 border border-gray-200 rounded bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">Address</label>
                <textarea rows={2} value={kycForm.address} onChange={e => setKycForm({...kycForm, address: e.target.value})} className="px-3 py-2 border border-gray-200 rounded bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">ID Proof Type</label>
                <select value={kycForm.idType} onChange={e => setKycForm({...kycForm, idType: e.target.value})} className="px-3 py-2 border border-gray-200 rounded bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Aadhaar</option>
                  <option>PAN Card</option>
                  <option>Voter ID</option>
                  <option>Passport</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">Upload ID Document</label>
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded text-sm font-semibold flex items-center justify-center gap-2 border border-gray-200 transition-colors">
                  <Upload size={14} /> Upload PDF/JPG
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowKycModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 rounded transition-colors text-sm">
                Cancel
              </button>
              <button onClick={() => setShowKycModal(false)} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition-colors text-sm">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LpgProfileCard;
