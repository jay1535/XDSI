import { 
  Upload, 
  Palette, 
  CreditCard, 
  Bell, 
  Shield, 
  Clock,
  FileText,
  Settings
} from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Easy Document Upload',
    description: 'Drag and drop PDF, DOCX files or browse from your device. Automatic page detection and preview.'
  },
  {
    icon: Settings,
    title: 'Custom Print Settings',
    description: 'Choose color/BW, page ranges, number of copies, and binding options to fit your needs.'
  },
  {
    icon: CreditCard,
    title: 'Secure Online Payment',
    description: 'Pay safely through multiple payment gateways with instant receipt generation.'
  },
  {
    icon: Bell,
    title: 'Real-time Notifications',
    description: 'Get notified when your order is being printed and ready for pickup.'
  },
  {
    icon: FileText,
    title: 'Order History',
    description: 'Access all your past orders, receipts, and transaction history in one place.'
  },
  {
    icon: Clock,
    title: 'Fast Processing',
    description: 'Quick turnaround times with real-time status updates throughout the process.'
  },
  {
    icon: Shield,
    title: 'Document Security',
    description: 'Your documents are encrypted and automatically deleted after printing.'
  },
  {
    icon: Palette,
    title: 'Quality Printing',
    description: 'High-quality color and black & white printing with professional finishing options.'
  }
];

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Professional Printing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From upload to pickup, our platform handles every aspect of your printing needs
            with precision and care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}