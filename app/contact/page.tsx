"use client"

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  HelpCircle,
  FileText,
  CreditCard
} from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    details: 'support@xeroxpro.com',
    description: 'Send us an email anytime'
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: '+91 98765 43210',
    description: 'Mon-Sat 9AM-8PM'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: '123 Business Street, City, State 12345',
    description: 'Our physical location'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: 'Mon-Sat: 9AM-8PM',
    description: 'Sunday: 10AM-6PM'
  }
];

const faqItems = [
  {
    question: 'What file formats do you accept?',
    answer: 'We accept PDF, DOC, and DOCX files up to 10MB in size.'
  },
  {
    question: 'How long does printing take?',
    answer: 'Most orders are ready within 2-4 hours. Express service is available for urgent orders.'
  },
  {
    question: 'Do you offer binding services?',
    answer: 'Yes, we offer spiral binding, soft binding, and hard cover binding options.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets.'
  },
  {
    question: 'Can I track my order status?',
    answer: 'Yes, you can track your order status in real-time through your dashboard.'
  },
  {
    question: 'Do you offer bulk discounts?',
    answer: 'Yes, we offer special pricing for bulk orders. Contact us for custom quotes.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get in
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our services? Need help with an order? 
            We're here to help you with all your printing needs.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-full w-fit mx-auto mb-4">
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-gray-900 font-medium mb-1">{info.details}</p>
                  <p className="text-sm text-gray-600">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="order">Order Support</SelectItem>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>
                    Quick answers to common questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqItems.map((item, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                        <p className="text-sm text-gray-600">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid gap-4">
                <Card className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Need Help with an Order?</h4>
                      <p className="text-sm text-gray-600">Check your order status or get support</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Orders
                    </Button>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Billing Questions?</h4>
                      <p className="text-sm text-gray-600">View receipts and payment history</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Receipts
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}