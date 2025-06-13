import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Black & White',
    price: '₹2',
    unit: 'per page',
    description: 'Perfect for documents and text-heavy content',
    features: [
      'High-quality B&W printing',
      'Standard paper (80 GSM)',
      'Fast processing',
      'Digital receipt',
      'Email notifications'
    ]
  },
  {
    name: 'Color Printing',
    price: '₹5',
    unit: 'per page',
    description: 'Ideal for presentations and colorful documents',
    features: [
      'Vibrant color printing',
      'Premium paper (100 GSM)',
      'Color correction',
      'Digital receipt',
      'Priority processing',
      'Email notifications'
    ],
    popular: true
  },
  {
    name: 'Premium Binding',
    price: '₹25',
    unit: 'per document',
    description: 'Professional binding for important documents',
    features: [
      'Spiral or soft binding',
      'Transparent front cover',
      'Colored back cover',
      'Professional finish',
      'Bulk discount available'
    ]
  }
];

export function Pricing() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple &
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            No hidden fees, no surprises. Pay only for what you print.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 relative ${
                plan.popular
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white scale-105'
                  : 'bg-white border border-gray-200 hover:border-blue-300'
              } transition-all duration-300 hover:shadow-xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className={`text-xl font-semibold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ml-1 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                    {plan.unit}
                  </span>
                </div>
                <p className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className={`h-4 w-4 mr-3 flex-shrink-0 ${
                      plan.popular ? 'text-blue-200' : 'text-green-500'
                    }`} />
                    <span className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need bulk printing? Contact us for custom pricing.
          </p>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </div>
    </section>
  );
}