import DemoCard from '../components/common/DemoCard';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Calculator, 
  Brain, 
  MessageSquare
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8 py-6 max-w-7xl mx-auto w-full px-4">
      {/* Grid of PNG specific cards with image backgrounds */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Card 1: My Dashboard */}
        <DemoCard
          to="/dashboard/my-dashboard"
          title="MY DASHBOARD"
          subtitle="CONSUMER CONTROL CENTRE"
          icon={LayoutDashboard}
          iconBgClass="bg-[#3b82f6]"
          leftBadge="LIVE"
          rightBadge="SMART"
          leftBadgeColor="bg-green-500"
          rightBadgeColor="bg-blue-500"
          features={['BILLING', 'METERS', 'ANALYTICS']}
          bgImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
        />

        {/* Card 2: Gas Bills */}
        <DemoCard
          to="/dashboard/gas-bills"
          title="GAS BILLS"
          subtitle="PAYMENTS & CALCULATORS"
          icon={Calculator}
          iconBgClass="bg-[#22c55e]"
          leftBadge="ACTIVE"
          rightBadge="SECURE"
          leftBadgeColor="bg-green-500"
          rightBadgeColor="bg-blue-500"
          features={['TIER SLABS', 'ESTIMATES', 'PAY NOW']}
          bgImage="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80"
        />

        {/* Card 3: New Pipe */}
        <DemoCard
          to="/dashboard/new-pipe"
          title="NEW PIPE"
          subtitle="LINE INSTALLATION WIZARD"
          icon={PlusCircle}
          iconBgClass="bg-[#f97316]"
          leftBadge="ONLINE"
          rightBadge="5 STEPS"
          leftBadgeColor="bg-blue-500"
          rightBadgeColor="bg-orange-500"
          features={['ELIGIBILITY', 'TRACKER', 'UPLOAD']}
          bgImage="https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&w=600&q=80"
        />

        {/* Card 4: Usage AI */}
        <DemoCard
          to="/dashboard/usage-ai"
          title="USAGE AI"
          subtitle="CONSUMPTION FORECAST"
          icon={Brain}
          iconBgClass="bg-[#8b5cf6]"
          leftBadge="AI POWERED"
          rightBadge="BETA"
          leftBadgeColor="bg-purple-500"
          rightBadgeColor="bg-gray-500"
          features={['PREDICTIVE', 'ANALYTICS', 'LIMITS']}
          bgImage="https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80"
        />
      </div>

      {/* Row 2: Card 5 Alone */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <DemoCard
            to="/dashboard/grievances"
            title="GRIEVANCES"
            subtitle="REDRESSAL & HELPDESK"
            icon={MessageSquare}
            iconBgClass="bg-[#06b6d4]"
            leftBadge="24/7 SUPPORT"
            rightBadge="ONLINE"
            leftBadgeColor="bg-green-500"
            rightBadgeColor="bg-blue-500"
            features={['SUPPORT', 'TICKETS', 'HOTLINES']}
            bgImage="https://images.unsplash.com/photo-1521791136364-7286472b5399?auto=format&fit=crop&w=600&q=80"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
