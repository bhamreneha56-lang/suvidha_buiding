import React from 'react';
import BillCalculatorWidget from '../components/calculator/BillCalculatorWidget';

const BillCalculatorPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Estimate Your Bill</h1>
        <p className="text-[var(--color-text-muted)]">
          Enter your meter readings below to get an instant estimate of your upcoming bill based on the current tariff slabs.
        </p>
      </div>
      
      <BillCalculatorWidget />
      
      <div className="mt-8 card bg-blue-50 border-blue-200" style={{ backgroundColor: 'rgba(26, 60, 110, 0.05)', borderColor: 'rgba(26, 60, 110, 0.2)' }}>
        <h3 className="font-bold text-lg mb-4">How we calculate your bill</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li><strong>Slab I (up to 0.59 SCM/day):</strong> ₹21.96 per SCM</li>
          <li><strong>Slab II (0.60 to 1.49 SCM/day):</strong> ₹26.01 per SCM</li>
          <li><strong>Slab III (above 1.50 SCM/day):</strong> ₹33.36 per SCM</li>
          <li><strong>Fixed Charges:</strong> ₹50.00 per billing cycle</li>
          <li><strong>GST:</strong> 18% applied on total consumption amount and fixed charges</li>
        </ul>
      </div>
    </div>
  );
};

export default BillCalculatorPage;
