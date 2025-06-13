"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Printer, ArrowLeft, Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate password reset email
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      toast.success('Password reset email sent!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
              <Printer className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              XeroxPro
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
          <p className="text-gray-600 mt-2">
            {sent 
              ? 'Check your email for reset instructions'
              : 'Enter your email to reset your password'
            }
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              {sent ? 'Email Sent' : 'Reset Password'}
            </CardTitle>
            <CardDescription>
              {sent 
                ? 'We\'ve sent password reset instructions to your email address.'
                : 'Enter your email address and we\'ll send you a link to reset your password.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-green-100 p-4 rounded-lg">
                  <Mail className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-green-800 font-medium">Email sent successfully!</p>
                  <p className="text-green-700 text-sm mt-1">
                    Check your inbox and follow the instructions to reset your password.
                  </p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/auth/login">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Login
                  </Link>
                </Button>
              </div>
            )}

            {!sent && (
              <div className="mt-6 text-center">
                <Link 
                  href="/auth/login" 
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Login
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}