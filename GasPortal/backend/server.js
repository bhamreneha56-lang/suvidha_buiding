import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Helper function for bill calculation (same as frontend logic)
function calculateBillLogic(prevReading, currReading, billingDays) {
  const SCM_total = Math.max(0, currReading - prevReading);
  const SCM_per_day = billingDays > 0 ? SCM_total / billingDays : 0;
  const slab1_limit = 0.59 * billingDays;
  const slab2_limit = 1.49 * billingDays;

  let slab1_scm = 0, slab2_scm = 0, slab3_scm = 0;
  if (SCM_total <= slab1_limit) {
    slab1_scm = SCM_total;
  } else if (SCM_total <= slab2_limit) {
    slab1_scm = slab1_limit;
    slab2_scm = SCM_total - slab1_limit;
  } else {
    slab1_scm = slab1_limit;
    slab2_scm = slab2_limit - slab1_limit;
    slab3_scm = SCM_total - slab2_limit;
  }

  const slab1_amount = slab1_scm * 21.96;
  const slab2_amount = slab2_scm * 26.01;
  const slab3_amount = slab3_scm * 33.36;
  const fixed_charges = 85.0;
  const gas_value = slab1_amount + slab2_amount + slab3_amount;
  const gst = (gas_value + fixed_charges) * 0.05;
  const total_bill = gas_value + fixed_charges + gst;

  let currentSlab = 'Slab I';
  if (SCM_per_day > 0.59 && SCM_per_day <= 1.49) currentSlab = 'Slab II';
  if (SCM_per_day > 1.49) currentSlab = 'Slab III';

  return {
    SCM_total,
    SCM_per_day,
    slab1_scm,
    slab2_scm,
    slab3_scm,
    slab1_amount,
    slab2_amount,
    slab3_amount,
    fixed_charges,
    gas_value,
    gst,
    total_bill,
    currentSlab,
    avg_rate: SCM_total > 0 ? gas_value / SCM_total : 0,
  };
}

app.post('/api/calculate-bill', (req, res) => {
  const { prevReading, currReading, billingDays } = req.body;
  const result = calculateBillLogic(prevReading, currReading, billingDays);
  res.json(result);
});

// Mock bill history data
const mockHistory = [
  { period: 'Apr–May 2026', scm: 42.6, amount: 1108, status: 'DUE' },
  { period: 'Feb–Mar 2026', scm: 38.2, amount: 991, status: 'PAID' },
  { period: 'Dec–Jan 2026', scm: 31.0, amount: 805, status: 'PAID' },
];

app.get('/api/bill-history', (req, res) => {
  res.json(mockHistory);
});

// Mock user profile data
app.get('/api/profile', (req, res) => {
  res.json({ name: 'Vaishnavi Dhage', email: 'vaishnavi@example.com', role: 'Customer' });
});

app.listen(PORT, () => {
  console.log(`🛠️  Server listening on http://localhost:${PORT}`);
});
