import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import NewConnection from './pages/NewConnection';
import LpgDashboard from './pages/LpgDashboard';
import BillCalculatorPage from './pages/BillCalculatorPage';
import MyDashboard from './pages/MyDashboard';
import GasBills from './pages/GasBills';
import NewPipe from './pages/NewPipe';
import UsageAi from './pages/UsageAi';
import Grievances from './pages/Grievances';
import Layout from './components/Layout';
import LpgCylinderSafety from './pages/LpgCylinderSafety';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/my-dashboard" element={<MyDashboard />} />
          <Route path="/dashboard/gas-bills" element={<GasBills />} />
          <Route path="/dashboard/new-pipe" element={<NewPipe />} />
          <Route path="/dashboard/usage-ai" element={<UsageAi />} />
          <Route path="/dashboard/grievances" element={<Grievances />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-connection" element={<NewConnection />} />
          <Route path="/lpg-profile" element={<LpgDashboard />} />
          <Route path="/calculator" element={<BillCalculatorPage />} />
          <Route path="/lpg/cylinder-safety" element={<LpgCylinderSafety />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
