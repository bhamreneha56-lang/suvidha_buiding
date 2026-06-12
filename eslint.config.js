import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, TrendingUp, AlertTriangle, Lightbulb, Send, Loader2, Sparkles, Bot, User } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';

const UsageAi = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your PNG Usage Assistant. Ask me anything about your consumption, bills, or savings tips.", isBot: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chartData = [
    { month: 'Jun 25', usage: 0.62 },
    { month: 'Jul 25', usage: 0.58 },
    { month: 'Aug 25', usage: 0.71 },
    { month: 'Sep 25', usage: 0.65 },
    { month: 'Oct 25', usage: 0.78 },
    { month: 'Nov 25', usage: 0.72 },
    { month: 'Dec 25', usage: 0.68 },
    { month: 'Jan 26', usage: 0.71 },
    { month: 'Feb 26', usage: 0.73 },
    { month: 'Mar 26', usage: 0.71 },
    { month: 'Apr 26', usage: 0.70 },
    { month: 'May 26', usage: 0.71 },
    { month: 'Jun 26 (F)', forecast: 0.72 },
    { month: 'Jul 26 (F)', forecast: 0.74 },
    { month: 'Aug 26 (F)', forecast: 0.73 },
  ];

  const handleSendMessage = async (msgText) => {
    if (!msgText.trim()) return;

    const userMsg = { id: Date.now(), text: msgText, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-api-key": "dummy-key-will-fail", // Placeholder for actual key, will fail in browser due to CORS/Key
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-3-sonnet-20240229",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are a PNG (Piped Natural Gas) usage assistant for a gas portal in India. 
              
              User's current data:
              - Consumer: Rajesh Kumar, PNG-2026-00123, Nashik
              - Current cycle usage: 42.6 SCM in 60 days (0.71 SCM/day)
              - Current slab: Slab II (₹26.01/SCM)
              - Slab limits: Slab I = 0–0.59 SCM/day (₹21.96), Slab II = 0.60–1.49 (₹26.01), Slab III = >1.50 (₹33.36)
              - Last 6 months SCM: [28, 35, 31, 42, 38, 42.6]
              - Current bill estimate: ₹1,108
              
              Answer the user's question helpfully, concisely, and in simple language. Use numbers where relevant.
              
              User question: ${msgText}`
            }
          ]
        })
      });
      
      if (!response.ok) throw new Error("API Call Failed");
      
      const data = await response.json();
      const reply = data.content[0].text;
      
      setMessages(prev => [...prev, { id: Date.now(), text: reply, isBot: true }]);
    } catch (error) {
      // Fallback response since direct browser Anthropic call without backend proxy/key will fail
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          text: `[Mock AI Response] Based on your data (0.71 SCM/day), you are currently in Slab II. To drop back to Slab I, you'd need to reduce your daily usage by about 0.12 SCM.`, 
          isBot: true 
        }]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const isForecast = payload[0].dataKey === 'forecast';
      let slab = 'Slab I';
      let rate = 21.96;
      if (value > 0.59 && value <= 1.49) { slab = 'Slab II'; rate = 26.01; }
      if (value > 1.49) { slab = 'Slab III'; rate = 33.36; }
      
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-3 text-xs">
          <p className="font-bold text-gray-900 dark:text-white mb-1">{label} {isForecast && '(Forecast)'}</p>
          <p className="text-purple-600 dark:text-purple-400 font-semibold">{value.toFixed(2)} SCM/day</p>
          <p className="text-gray-500 mt-1">{slab} (₹{rate}/SCM)</p>
          <p className="text-gray-500 font-bold mt-1">Est. Cost: ₹{(value * 30 * rate).toFixed(0)}/mo</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-6 py-6 max-w-6xl mx-auto w-full px-4">
      {/* Back Link */}
      <div>
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline mb-2 font-medium">
          <ArrowLeft size={16} /> Back to PNG Portal
        </Link>
      </div>

      {/* SECTION A: AI HEADER BANNER */}
      <section className="bg-gradient-to-br from-purple-900 via-[#4c1d95] to-[#8b5cf6] rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-400 opacity-20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} /> AI POWERED · BETA
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
            Usage AI — Consumption Intelligence
          </h1>
          <p className="text-purple-100 max-w-2xl text-sm md:text-base leading-relaxed">
            Powered by predictive analytics. Your usage patterns, forecasted costs, and smart recommendations — all in one place.
          </p>
        </div>
      </section>

      {/* SECTION B: FORECAST SUMMARY */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-purple-100 dark:border-purple-900/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 dark:bg-purple-900/10 rounded-bl-full -z-10"></div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">This Cycle Forecast</h3>
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Predicted Usage</p>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">44.2 <span className="text-sm font-normal text-gray-500">SCM</span></p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Predicted Bill</p>
              <p className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">₹1,148</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-gray-500">Based on current avg 0.71 SCM/day</p>
            <span className="text-xs font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded flex items-center gap-1">
              <TrendingUp size={12} /> 3.7% vs last
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-purple-100 dark:border-purple-900/30 shadow-sm">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Slab Prediction</h3>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 font-bold rounded-md text-sm">
              Slab II
            </span>
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">₹26.01/SCM</span>
          </div>
          <div className="flex items-start gap-2 mt-4 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/10 p-2 rounded text-xs font-bold">
            <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
            <p>⚠️ Approaching Slab III limit<br/><span className="text-gray-600 dark:text-gray-400 font-normal mt-1 block">12.4 SCM until Slab III</span></p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-purple-100 dark:border-purple-900/30 shadow-sm">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Annual Estimate</h3>
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Projected Annual Usage</p>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">530 <span className="text-sm font-normal text-gray-500">SCM</span></p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Projected Bill</p>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">₹13,776</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">Based on 6-month rolling average and seasonal trends.</p>
        </div>
      </section>

      {/* SECTION C & E: CHART AND TRACKER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CHART */}
        <section className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-purple-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">12-Month Consumption Trend + 3-Month Forecast</h2>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} domain={[0, 1.0]} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={0.59} stroke="#22c55e" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Slab I Limit (0.59)', fill: '#22c55e', fontSize: 10 }} />
                <ReferenceLine y={1.49} stroke="#f97316" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Slab II Limit (1.49)', fill: '#f97316', fontSize: 10 }} />
                
                <Line type="monotone" dataKey="usage" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} name="Historical" connectNulls />
                <Line type="monotone" dataKey="forecast" stroke="#8b5cf6" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: '#fff', strokeWidth: 2, stroke: '#8b5cf6' }} name="Forecast" connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* TRACKER */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Slab Limit Tracker — Today</h2>
            <p className="text-xs text-gray-500">Monitor your daily SCM average against pricing tiers.</p>
          </div>

          <div className="flex flex-col gap-5">
            {/* Slab I */}
            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Slab I Limit: <span className="font-normal text-gray-500">0.59 SCM/day</span></span>
                <span className="text-xs font-bold text-red-500">Exceeded</span>
              </div>
              <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden relative">
                <div className="h-full bg-red-500 w-full rounded-full"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1.5 text-right">You: 0.71 SCM/day</p>
            </div>

            {/* Slab II */}
            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Slab II Limit: <span className="font-normal text-gray-500">1.49 SCM/day</span></span>
                <span className="text-xs font-bold text-orange-500">47.6% Used</span>
              </div>
              <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden relative">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '47.6%' }}></div>
                <div className="absolute top-0 bottom-0 w-0.5 bg-gray-900 dark:bg-white" style={{ left: '47.6%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1.5 text-right flex justify-end items-center gap-1">
                <span className="w-2 h-2 bg-gray-900 dark:bg-white inline-block"></span> You are here (0.71)
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION D & F: INSIGHTS AND CHAT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* INSIGHTS */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Lightbulb className="text-amber-500" /> Anomaly & Insights
          </h2>
          
          <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
            <TrendingUp className="text-blue-500 mt-0.5 flex-shrink-0" size={18} />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold text-gray-900 dark:text-white">Seasonal Trend:</span> Higher usage in winter months (Dec–Feb). Consider adjusting usage habits during cold waves.
            </p>
          </div>

          <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-lg">
            <CheckCircle2 className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold text-gray-900 dark:text-white">Consistency:</span> You stayed in Slab II for 8 of the last 12 months. This indicates a consistent and predictable usage pattern.
            </p>
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-lg">
            <Lightbulb className="text-amber-500 mt-0.5 flex-shrink-0" size={18} />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold text-gray-900 dark:text-white">Savings Tip:</span> If you reduce daily usage by 0.12 SCM/day, you'll drop to Slab I and save ~₹240/cycle.
            </p>
          </div>
        </section>

        {/* CHAT AI */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-purple-200 dark:border-purple-900/50 flex flex-col overflow-hidden h-[450px]">
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 border-b border-purple-100 dark:border-purple-900/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-md">
              <Brain size={20} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white text-md">Ask the PNG Assistant</h2>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Powered by Claude AI</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-gray-50/50 dark:bg-gray-900/20">
            {messages.map(msg => (
              <div key={msg.id} className={`flex w-full ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`flex gap-2 max-w-[85%] ${msg.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white ${msg.isBot ? 'bg-purple-500' : 'bg-orange-500'}`}>
                    {msg.isBot ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${
                    msg.isBot 
                      ? 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm' 
                      : 'bg-orange-500 text-white rounded-tr-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start w-full">
                <div className="flex gap-2 max-w-[85%] flex-row">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white bg-purple-500">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-tl-none shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-purple-500" />
                    <span className="text-xs text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
            {["When will I cross Slab II?", "How can I reduce my bill?", "What's my average daily usage?", "Compare my usage to last year"].map((q, i) => (
              <button 
                key={i} 
                onClick={() => handleSendMessage(q)}
                disabled={isTyping}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-full transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage(inputText)}
              placeholder="Ask about your usage..."
              disabled={isTyping}
              className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:border-purple-500 disabled:opacity-50"
            />
            <button 
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isTyping}
              className="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center disabled:opacity-50 transition-colors"
            >
              <Send size={18} className="ml-0.5" />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default UsageAi;
