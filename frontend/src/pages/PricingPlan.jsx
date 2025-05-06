import React from 'react';
import { useNavigate } from 'react-router-dom';

const PricingPlan = () => {
  const navigate = useNavigate();

  const handlePlanSelect = (plan) => {
    navigate('/create-organization', {
      state: {
        price: plan.price,
        duration: plan.duration,
      },
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-4 font-sans">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Choose a Pricing Plan</h1>
      <p className="text-xl text-gray-600 max-w-xl text-center mb-12">
        Select a plan to unlock all features for your organization. Choose from a 6-month or 12-month plan below.
      </p>

      <div className="flex gap-8 flex-wrap justify-center">
        {[
          { label: '6-Month Plan', desc: 'Full access for half a year.', price: 12000, duration: 6, key: '6month' },
          { label: '12-Month Plan', desc: 'Best value with priority support.', price: 20000, duration: 12, key: '12month' },
        ].map((plan) => (
          <div key={plan.key} className="bg-white p-6 rounded-xl shadow-lg w-full sm:w-72 text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{plan.label}</h2>
            <p className="text-gray-600 mb-6">{plan.desc}</p>
            <div className="text-3xl font-bold text-gray-900 mb-6">₹{plan.price.toLocaleString()}</div>
            <button
              onClick={() => handlePlanSelect(plan)}
              className="py-2 px-6 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlan;