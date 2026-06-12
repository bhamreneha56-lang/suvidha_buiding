import { Link } from 'react-router-dom';
import { 
  Droplet, 
  Flame, 
  Package, 
  ArrowRight,
  ShieldCheck,
  Headphones,
  Activity
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-12 py-10 items-center justify-center">
      {/* Central Flame Logo Banner */}
      <section className="text-center max-w-2xl mx-auto flex flex-col items-center gap-6">
        <div className="brand-logo-center">
          <Flame size={48} className="text-white" />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
            Gas Services Dashboard
          </h1>
          <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
            Your central hub for managing billing, consumption, service requests, refills, and account information for both PNG and LPG services.
          </p>
        </div>
      </section>

      {/* Choose Your Service Title */}
      <section className="text-center flex flex-col gap-1">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Choose Your Service
        </h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Select a service to access your portal and manage your account
        </p>
      </section>

      {/* The Two Main Portal Cards */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 1: Piped Natural Gas (PNG) */}
          <div 
            className="portal-selection-card text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(11, 15, 25, 0.95) 100%), url(https://images.unsplash.com/photo-1626244661279-6257218a1036?auto=format&fit=crop&w=800&q=80)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="portal-icon-container bg-gradient-blue text-white">
                <Droplet size={28} />
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#10b981]"></div>
                <span className="text-xs font-bold text-white tracking-wider">ACTIVE</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">
              Piped Natural Gas (PNG)
            </h3>
            <p className="text-sm text-gray-300 mb-6">
              Manage your pipeline-based gas supply, bills, and consumption
            </p>
            
            <ul className="portal-bullet-list flex-1 mb-8">
              <li style={{ color: '#e5e7eb' }}>Monthly bill payment & tracking</li>
              <li style={{ color: '#e5e7eb' }}>Real-time usage monitoring</li>
              <li style={{ color: '#e5e7eb' }}>Meter reading history</li>
              <li style={{ color: '#e5e7eb' }}>Service requests & complaints</li>
              <li style={{ color: '#e5e7eb' }}>Consumption analytics</li>
              <li style={{ color: '#e5e7eb' }}>Connection status updates</li>
            </ul>
            
            <Link to="/dashboard" className="portal-action-link group" style={{ color: '#60a5fa' }}>
              <span>Access Portal</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 2: LPG Cylinder Services */}
          <div 
            className="portal-selection-card text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(11, 15, 25, 0.95) 100%), url(https://images.unsplash.com/photo-1608155686393-8fdd966d784d?auto=format&fit=crop&w=800&q=80)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="portal-icon-container bg-gradient-orange text-white">
                <Package size={28} />
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#10b981]"></div>
                <span className="text-xs font-bold text-white tracking-wider">ELIGIBLE</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">
              LPG Cylinder Services
            </h3>
            <p className="text-sm text-gray-300 mb-6">
              Book refills, track deliveries, and manage your LPG profile
            </p>
            
            <ul className="portal-bullet-list flex-1 mb-8">
              <li style={{ color: '#e5e7eb' }}>Quick refill booking</li>
              <li style={{ color: '#e5e7eb' }}>Real-time delivery tracking</li>
              <li style={{ color: '#e5e7eb' }}>Refill history & analytics</li>
              <li style={{ color: '#e5e7eb' }}>Consumer profile management</li>
              <li style={{ color: '#e5e7eb' }}>Safety guidelines & emergency</li>
              <li style={{ color: '#e5e7eb' }}>AI booking assistant</li>
            </ul>
            
            <Link to="/lpg-profile" className="portal-action-link group" style={{ color: '#60a5fa' }}>
              <span>Access Portal</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default LandingPage;
