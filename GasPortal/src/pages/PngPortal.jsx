import DemoCard from '../components/common/DemoCard';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Calculator, 
  Brain, 
  MessageSquare,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PngPortal = () => {
  return (
    <div className="flex flex-col gap-10 py-6">
      {/* Header with back button */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 max-w-6xl mx-auto w-full px-4">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline mb-2 font-medium">
            <ArrowLeft size={16} /> Back to Selection
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Piped Natural Gas (PNG) Portal
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Manage pipeline accounts, calculate consumption, and check real-time slabs.
          </p>
        </div>
      </section>

      {/* Grid of PNG specific cards with image backgrounds */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="demo-card-grid">
          {/* Card 1: My Dashboard */}
          <DemoCard
            to="/dashboard"
            title="MY DASHBOARD"
            subtitle="CONSUMER CONTROL CENTRE"
            icon={LayoutDashboard}
            iconGradientClass="from-blue-500 to-indigo-600"
            leftBadge="LIVE"
            rightBadge="SMART"
            leftBadgeColor="bg-green-500"
            rightBadgeColor="bg-blue-500"
            features={['BILLING', 'METERS', 'ANALYTICS']}
            bgImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
          />

          {/* Card 2: Gas Bills */}
          <DemoCard
            to="/calculator"
            title="GAS BILLS"
            subtitle="PAYMENTS & CALCULATORS"
            icon={Calculator}
            iconGradientClass="from-green-500 to-emerald-600"
            leftBadge="ACTIVE"
            rightBadge="SECURE"
            leftBadgeColor="bg-green-500"
            rightBadgeColor="bg-emerald-500"
            features={['TIER SLABS', 'ESTIMATES', 'PAY NOW']}
            bgImage="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80"
          />

          {/* Card 3: New Connection */}
          <DemoCard
            to="/new-connection"
            title="NEW PIPE"
            subtitle="LINE INSTALLATION WIZARD"
            icon={PlusCircle}
            iconGradientClass="from-orange-500 to-amber-600"
            leftBadge="ONLINE"
            rightBadge="5 STEPS"
            leftBadgeColor="bg-blue-500"
            rightBadgeColor="bg-orange-500"
            features={['ELIGIBILITY', 'TRACKER', 'UPLOAD']}
            bgImage="https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&w=600&q=80"
          />

          {/* Card 4: Usage AI */}
          <DemoCard
            to="/dashboard"
            title="USAGE AI"
            subtitle="CONSUMPTION FORECAST"
            icon={Brain}
            iconGradientClass="from-purple-500 to-violet-600"
            leftBadge="AI POWERED"
            rightBadge="BETA"
            leftBadgeColor="bg-purple-500"
            rightBadgeColor="bg-cyan-500"
            features={['PREDICTIVE', 'ANALYTICS', 'LIMITS']}
            bgImage="https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80"
          />

          {/* Card 5: Grievances */}
          <DemoCard
            to="/dashboard"
            title="GRIEVANCES"
            subtitle="REDRESSAL & HELPDESK"
            icon={MessageSquare}
            iconGradientClass="from-cyan-500 to-blue-600"
            leftBadge="24/7 SUPPORT"
            rightBadge="ONLINE"
            leftBadgeColor="bg-green-500"
            rightBadgeColor="bg-blue-500"
            features={['SUPPORT', 'TICKETS', 'HOTLINES']}
            bgImage="https://images.unsplash.com/photo-1521791136364-7286472b5399?auto=format&fit=crop&w=600&q=80"
          />
        </div>
      </section>
    </div>
  );
};

export default PngPortal;
