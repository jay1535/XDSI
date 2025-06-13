import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, Printer, CreditCard } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Professional
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {' '}Print Services{' '}
                </span>
                Made Simple
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Upload your documents, customize print settings, and pay online. 
                Get professional printing done without leaving your home.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="group">
                <Link href="/upload">
                  Start Printing
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-1 rounded-full">
                  <Upload className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-600">Easy Upload</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-1 rounded-full">
                  <Printer className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">Fast Printing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 p-1 rounded-full">
                  <CreditCard className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-sm text-gray-600">Secure Payment</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <div className="space-y-6">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-white/30 p-2 rounded-lg">
                      <Upload className="h-5 w-5" />
                    </div>
                    <span className="font-medium">Upload Document</span>
                  </div>
                  <div className="bg-white/10 rounded h-2 overflow-hidden">
                    <div className="bg-white h-full w-3/4 rounded animate-pulse"></div>
                  </div>
                </div>

                <div className="bg-white/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-white/30 p-2 rounded-lg">
                      <Printer className="h-5 w-5" />
                    </div>
                    <span className="font-medium">Configure Settings</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-white/10 p-2 rounded">Color: Yes</div>
                    <div className="bg-white/10 p-2 rounded">Pages: 1-10</div>
                    <div className="bg-white/10 p-2 rounded">Copies: 2</div>
                    <div className="bg-white/10 p-2 rounded">Binding: Spiral</div>
                  </div>
                </div>

                <div className="bg-white/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total Cost</span>
                    <span className="text-2xl font-bold">₹45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}