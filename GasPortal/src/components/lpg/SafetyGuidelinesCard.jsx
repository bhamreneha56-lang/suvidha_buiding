import { useState } from 'react';
import { ShieldAlert, ChevronDown, ChevronUp, Phone, Info } from 'lucide-react';

const SafetyGuidelinesCard = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#fef2f2] rounded-xl p-6 border border-red-200 flex flex-col gap-5 shadow-sm">
      <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
        <ShieldAlert className="text-red-600" /> Safety Guidelines
      </h2>

      <ul className="space-y-3 text-sm text-red-900 leading-relaxed list-disc list-outside ml-4">
        <li className="marker:text-red-500">Turn off the regulator when not in use, especially at night.</li>
        <li className="marker:text-red-500">Ensure good kitchen ventilation. Do not close all windows.</li>
        <li className="marker:text-red-500">Check the Suraksha hose regularly for cracks or expiry.</li>
        <li className="marker:text-red-500">Always light the match before turning on the burner.</li>
        <li className="marker:text-red-500">Never use LPG near an open flame or electrical switch.</li>
        <li className="marker:text-red-500">Store cylinder upright in a ventilated area. Never lay it sideways.</li>
      </ul>

      {/* Suraksha Hose Reminder */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-2 items-start mt-2">
        <Info className="text-yellow-600 flex-shrink-0 mt-0.5" size={16} />
        <p className="text-xs text-yellow-800 leading-relaxed font-medium">
          🔔 Suraksha hose expires every 5 years. Check the label for your expiry date. <br/>
          <span className="font-bold text-yellow-900">Current hose: Expires Nov 2027 (mock).</span>
        </p>
      </div>

      <hr className="border-red-200" />

      {/* Expandable Gas Smell Section */}
      <div className="flex flex-col border border-red-300 rounded-lg overflow-hidden bg-white/50">
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="flex justify-between items-center p-4 bg-red-100 hover:bg-red-200 transition-colors w-full text-left"
        >
          <span className="font-bold text-red-800 flex items-center gap-2">
            ⚠️ If you smell gas...
          </span>
          {expanded ? <ChevronUp size={20} className="text-red-800" /> : <ChevronDown size={20} className="text-red-800" />}
        </button>
        
        {expanded && (
          <div className="p-4 bg-white/80 animate-in slide-in-from-top-2 duration-200">
            <ol className="space-y-2 text-sm text-red-900 font-medium">
              <li><strong className="text-red-700">Step 1:</strong> Turn off regulator and all burner knobs immediately.</li>
              <li><strong className="text-red-700">Step 2:</strong> Do NOT operate any electrical switches or create sparks.</li>
              <li><strong className="text-red-700">Step 3:</strong> Open all doors and windows.</li>
              <li><strong className="text-red-700">Step 4:</strong> Move cylinder to a ventilated outdoor area if safe.</li>
              <li><strong className="text-red-700">Step 5:</strong> Call emergency: 1906 or your distributor.</li>
            </ol>
          </div>
        )}
      </div>

      <button 
        onClick={() => {
          if(window.confirm("This will call 1906 — LPG Emergency Helpline. Proceed?")) {
            // mock call
          }
        }}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm mt-2"
      >
        <Phone size={18} /> Call Emergency: 1906
      </button>

    </div>
  );
};

export default SafetyGuidelinesCard;
