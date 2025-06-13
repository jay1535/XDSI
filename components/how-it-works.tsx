import { Upload, Settings, CreditCard, Package } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Documents',
    description: 'Upload your PDF or DOCX files directly from your device or cloud storage.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Settings,
    title: 'Configure Settings',
    description: 'Choose print options like color, pages, copies, and binding preferences.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: CreditCard,
    title: 'Make Payment',
    description: 'Pay securely online and receive instant confirmation with receipt.',
    color: 'from-purple-500 to-violet-500'
  },
  {
    icon: Package,
    title: 'Pickup Order',
    description: 'Get notified when ready and pickup your professionally printed documents.',
    color: 'from-orange-500 to-red-500'
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your documents printed in just four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative z-10">
                <div className={`bg-gradient-to-r ${step.color} p-4 rounded-xl w-fit mb-6 mx-auto`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                <div className={`absolute -top-4 -right-4 bg-gradient-to-r ${step.color} text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm`}>
                  {index + 1}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-gray-300 to-gray-400 z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}