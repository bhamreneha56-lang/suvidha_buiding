import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Phone, Flame, FileText, Upload, MapPin, MessageSquare } from 'lucide-react';

const Grievances = () => {
  const [formData, setFormData] = useState({
    category: '',
    priority: 'Normal',
    description: '',
    attachment: null,
    contactPref: 'Call me back'
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const mockTickets = [
    { id: 'GRV-2026-00451', category: 'Billing Dispute', date: '07 Jun 2026', status: '🟡 In Progress', eta: '24hrs', agent: 'Agent: Suresh M.', notes: '' },
    { id: 'GRV-2026-00389', category: 'Low Pressure', date: '02 May 2026', status: '🟢 Resolved', eta: '—', agent: 'Agent: Prakash K.', notes: 'Pressure valve adjusted. Issue resolved on 04 May 2026.' },
    { id: 'GRV-2026-00201', category: 'Meter Issue', date: '15 Mar 2026', status: '🟢 Resolved', eta: '—', agent: 'Agent: Suresh M.', notes: 'Meter display replaced under warranty.' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description.length < 20) {
      alert("Description must be at least 20 characters.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-8 py-6 max-w-6xl mx-auto w-full px-4 relative">
      {/* Header */}
      <div>
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline mb-4 font-medium">
          <ArrowLeft size={16} /> Back to PNG Portal
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
          Support & Helpdesk
        </h1>
      </div>

      {/* SECTION A: EMERGENCY HOTLINES */}
      <section className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
            <AlertTriangle size={20} /> Emergency Contacts
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-red-900 dark:text-red-200">
            <span className="flex items-center gap-1.5"><Flame size={16} /> <strong>Gas Emergency:</strong> 1906 immediately</span>
            <span className="flex items-center gap-1.5"><Phone size={16} /> <strong>Fire Emergency:</strong> 101</span>
            <span className="flex items-center gap-1.5"><Phone size={16} /> <strong>Methane Gas 24/7:</strong> 1800-123-4567</span>
          </div>
        </div>
        <button 
          onClick={() => confirm("This will call 1906. Proceed?")}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md flex items-center gap-2 whitespace-nowrap"
        >
          <Phone size={18} /> Call Emergency: 1906
        </button>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SECTION B: RAISE A GRIEVANCE */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Submit a Complaint or Request</h2>
          
          {submitted ? (
            <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <FileText size={24} />
              </div>
              <h3 className="font-bold text-green-800 dark:text-green-400 text-lg">✅ Complaint Registered</h3>
              <p className="text-sm text-green-700 dark:text-green-500">Ticket ID: <strong className="font-mono">GRV-2026-00451</strong></p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Expected response: 24–48 hours.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-4 text-cyan-600 hover:underline text-sm font-semibold"
              >
                Submit another ticket
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category</label>
                <select 
                  required
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-cyan-500 outline-none w-full"
                >
                  <option value="">Select an issue category</option>
                  <option>Gas Leak Suspected</option>
                  <option>Low Pressure Issue</option>
                  <option>Billing Dispute</option>
                  <option>Meter Issue</option>
                  <option>New Connection Query</option>
                  <option>Safety Concern</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Priority</label>
                <div className="flex gap-6 items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="priority" checked={formData.priority === 'Normal'} onChange={() => setFormData({...formData, priority: 'Normal'})} className="text-cyan-500 focus:ring-cyan-500" />
                    <span>Normal</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="priority" checked={formData.priority === 'Urgent'} onChange={() => setFormData({...formData, priority: 'Urgent'})} className="text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-red-500 font-medium">Urgent</span>
                  </label>
                </div>
                {formData.priority === 'Urgent' && <span className="text-xs text-red-500">Use Urgent only for safety issues or complete gas outages.</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description (min 20 chars)</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Please describe your issue in detail..."
                  className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-cyan-500 outline-none w-full resize-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Attach Photo/Video (Optional)</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors border border-gray-200 dark:border-gray-600">
                    <Upload size={16} /> Choose File
                    <input type="file" className="hidden" onChange={e => setFormData({...formData, attachment: e.target.files[0]})} />
                  </label>
                  <span className="text-sm text-gray-500 truncate max-w-[200px]">
                    {formData.attachment ? formData.attachment.name : 'No file chosen'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Contact Preference</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="contact" checked={formData.contactPref === 'Call me back'} onChange={() => setFormData({...formData, contactPref: 'Call me back'})} className="text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-sm">Call me back</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="contact" checked={formData.contactPref === 'Email'} onChange={() => setFormData({...formData, contactPref: 'Email'})} className="text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-sm">Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="contact" checked={formData.contactPref === 'SMS'} onChange={() => setFormData({...formData, contactPref: 'SMS'})} className="text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-sm">SMS</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="mt-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Submit Complaint
              </button>
            </form>
          )}
        </section>

        <div className="flex flex-col gap-8">
          {/* SECTION C: MY TICKETS */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Complaint History</h2>
            
            <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
              <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap">Ticket ID</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {mockTickets.map((ticket, idx) => (
                    <tr 
                      key={idx} 
                      onClick={() => setSelectedTicket(ticket)}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-4 font-mono text-cyan-600 dark:text-cyan-400 font-semibold">{ticket.id}</td>
                      <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">{ticket.category}</td>
                      <td className="px-4 py-4">{ticket.date}</td>
                      <td className="px-4 py-4 font-semibold">{ticket.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">Click on a ticket to view details.</p>
          </section>

          {/* SECTION D: USEFUL CONTACTS */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-1"><Phone size={20} /></div>
              <h3 className="font-bold text-sm">Customer Care</h3>
              <p className="text-xs text-gray-500">1800-123-4567<br/>Mon–Sat, 8am–8pm</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-1"><MessageSquare size={20} /></div>
              <h3 className="font-bold text-sm">WhatsApp</h3>
              <p className="text-xs text-gray-500">+91-98765-43210<br/>24/7 Support</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-1"><MapPin size={20} /></div>
              <h3 className="font-bold text-sm">Service Centre</h3>
              <p className="text-xs text-[var(--color-primary)] font-medium">Find nearest &rarr;</p>
            </div>
          </section>
        </div>
      </div>

      {/* Ticket Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/80">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Ticket Details</h3>
              <button onClick={() => setSelectedTicket(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                ✕
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Ticket ID</p>
                  <p className="font-mono font-semibold">{selectedTicket.id}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date Submitted</p>
                  <p className="font-semibold">{selectedTicket.date}</p>
                </div>
                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-semibold">{selectedTicket.category}</p>
                </div>
                <div>
                  <p className="text-gray-500">Current Status</p>
                  <p className="font-semibold">{selectedTicket.status}</p>
                </div>
              </div>

              <div className="mt-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 mb-2">Status Timeline</p>
                <div className="flex items-center text-xs font-semibold text-gray-400 gap-1 w-full relative">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>
                  
                  <div className="flex-1 text-center"><div className="w-3 h-3 rounded-full bg-cyan-500 mx-auto mb-1"></div>Submitted</div>
                  <div className="flex-1 text-center"><div className="w-3 h-3 rounded-full bg-cyan-500 mx-auto mb-1"></div>Assigned</div>
                  <div className="flex-1 text-center"><div className={`w-3 h-3 rounded-full mx-auto mb-1 ${selectedTicket.status.includes('Resolved') || selectedTicket.status.includes('Progress') ? 'bg-cyan-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>In Progress</div>
                  <div className="flex-1 text-center"><div className={`w-3 h-3 rounded-full mx-auto mb-1 ${selectedTicket.status.includes('Resolved') ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>Resolved</div>
                </div>
              </div>

              <div className="mt-2 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg text-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-1">{selectedTicket.agent}</p>
                <p className="text-gray-600 dark:text-gray-300">{selectedTicket.notes || "Ticket is currently being reviewed by our support team."}</p>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grievances;
