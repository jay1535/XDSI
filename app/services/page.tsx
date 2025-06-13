"use client"

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  FileText, 
  Palette, 
  BookOpen, 
  Zap, 
  Users, 
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';

const services = [
  {
    icon: FileText,
    title: 'Document Printing',
    description: 'High-quality printing for all your document needs',
    features: ['PDF & DOCX support', 'Auto page detection', 'Custom page ranges', 'Multiple copies'],
    price: 'From ₹2/page',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Palette,
    title: 'Color Printing',
    description: 'Vibrant color printing for presentations and graphics',
    features: ['Premium color quality', 'Color correction', 'High-resolution output', 'Various paper sizes'],
    price: 'From ₹5/page',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: BookOpen,
    title: 'Binding Services',
    description: 'Professional binding for reports and documents',
    features: ['Spiral binding', 'Soft binding', 'Hard cover options', 'Custom covers'],
    price: 'From ₹25/document',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Zap,
    title: 'Express Service',
    description: 'Fast-track printing for urgent requirements',
    features: ['Priority processing', '1-hour delivery', 'Real-time updates', 'Dedicated support'],
    price: '+50% of base price',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Users,
    title: 'Bulk Printing',
    description: 'Cost-effective solutions for large volume orders',
    features: ['Volume discounts', 'Dedicated account manager', 'Custom pricing', 'Flexible delivery'],
    price: 'Custom pricing',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Shield,
    title: 'Secure Printing',
    description: 'Confidential document handling with security',
    features: ['Document encryption', 'Secure deletion', 'Privacy guarantee', 'Audit trail'],
    price: '+₹1/page',
    color: 'from-gray-600 to-gray-800'
  }
];

const features = [
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Most orders ready within 2-4 hours'
  },
  {
    icon: CheckCircle,
    title: 'Quality Guarantee',
    description: '100% satisfaction or money back'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your documents are safe and confidential'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Student',
    content: 'Amazing service! My thesis was printed perfectly and the binding looks professional.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Business Owner',
    content: 'Fast, reliable, and great quality. Perfect for all our business document needs.',
    rating: 5
  },
  {
    name: 'Emily Davis',
    role: 'Freelancer',
    content: 'The online ordering system is so convenient. I can upload and pay from anywhere.',
    rating: 5
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Printing Services
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From simple documents to complex presentations, we provide comprehensive printing solutions 
            with the highest quality standards and fastest turnaround times.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/upload">
                Start Printing Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive printing solutions tailored to meet all your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className={`bg-gradient-to-r ${service.color} p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-lg font-semibold">
                      {service.price}
                    </Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/upload">Order Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best printing experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-full w-fit mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Upload your documents now and experience professional printing services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/upload">
                Upload Document
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}