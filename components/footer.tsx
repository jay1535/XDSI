import Link from 'next/link';
import { Printer, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <Printer className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">XeroxPro</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Professional printing services made simple. Upload, customize, and get your documents printed with just a few clicks.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/printing" className="hover:text-white transition-colors">Document Printing</Link></li>
              <li><Link href="/services/binding" className="hover:text-white transition-colors">Binding Services</Link></li>
              <li><Link href="/services/bulk" className="hover:text-white transition-colors">Bulk Printing</Link></li>
              <li><Link href="/services/express" className="hover:text-white transition-colors">Express Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span>support@xeroxpro.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" />
                <span>123 Business Street, City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; 2024 XeroxPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}