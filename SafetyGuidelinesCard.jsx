import { useState } from 'react';
import { Brain, Sparkles, TrendingDown, Sliders } from 'lucide-react';

const AiForecastCard = () => {
  const dailyLimit = 0.59;
  const [simulatedCookTime, setSimulatedCookTime] = useState(45); // in minutes per day
  
  // 1 minute of PNG burner uses approx 0.012 SCM
  const simulatedConsumption = (simulatedCookTime * 0.012).toFixed(2);
  const status = simulatedConsumption <= dailyLimit ? 'Optimal (Slab I)' : 'Warning (Slab II)';
  
  return (
    <div className="card border-[rgba(168,85,247,0.2)] bg-gradient-to-br from-[rgba(168,85,247,0.03)] to-transparent relative overflow-hidden">
      {/* Decorative AI background element */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500 opacity-[0.03] rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Brain size={20} className="text-purple-500 animate-pulse" />
          <span>Usage AI Predictor</span>
        </h3>
        <span className="badge bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 flex items-center gap-1">
          <Sparkles size={12} /> Forecast
        </span>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div className="bg-[var(--color-bg)] p-4 rounded-lg border border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-text-muted)] mb-1">PROJECTED 60-DAY CONSUMPTION</p>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">35.4 SCM</span>
            <span className="text-xs text-green-500 font-semibold flex items-center gap-1">
              <TrendingDown size={14} /> -8% vs last month
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: '60%' }} />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Sliders size={16} className="text-[var(--color-primary)]" />
            Interactive Usage Simulator
          </h4>
          <p className="text-xs text-[var(--color-text-muted)] mb-3">
            Adjust cooking runtime to see impact on Slab pricing:
          </p>

          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Cooking Time: <strong>{simulatedCookTime} mins/day</strong></span>
                <span>Est. Use: <strong>{simulatedConsumption} SCM/day</strong></span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="120" 
                className="w-full accent-purple-500" 
                value={simulatedCookTime}
                onChange={(e) => setSimulatedCookTime(parseInt(e.target.value))}
              />
            </div>

            <div className="flex justify-between items-center text-xs p-2 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)]">
              <span>Slab I Target: <strong>{dailyLimit} SCM/day</strong></span>
              <span className={`font-semibold px-2 py-0.5 rounded ${
                status.includes('Warning') 
                  ? 'bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400' 
                  : 'bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400'
              }`}>
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 text-xs text-purple-950 dark:bg-purple-950/20 dark:border-purple-900/30 dark:text-purple-300">
        <p className="font-semibold flex items-center gap-1 mb-1">
          💡 AI Recommendation:
        </p>
        <p>
          Keeping burner runtime under <strong>49 mins/day</strong> guarantees Slab I pricing (₹21.96/SCM), saving you approximately ₹185 per cycle compared to Slab II.
        </p>
      </div>
    </div>
  );
};

export default AiForecastCard;
