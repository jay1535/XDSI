"use client"

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { 
  Upload, 
  FileText, 
  CreditCard, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

interface Order {
  id: string;
  filename: string;
  status: 'pending' | 'printing' | 'ready' | 'completed';
  pages: number;
  copies: number;
  color: boolean;
  binding: string;
  cost: number;
  createdAt: string;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
      return;
    }
    
    // Mock orders data
    if (user) {
      setOrders([
        {
          id: '1',
          filename: 'Project_Report.pdf',
          status: 'ready',
          pages: 25,
          copies: 2,
          color: true,
          binding: 'Spiral',
          cost: 275,
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          filename: 'Resume.docx',
          status: 'printing',
          pages: 2,
          copies: 5,
          color: false,
          binding: 'None',
          cost: 20,
          createdAt: '2024-01-15T14:15:00Z'
        },
        {
          id: '3',
          filename: 'Presentation.pdf',
          status: 'completed',
          pages: 15,
          copies: 1,
          color: true,
          binding: 'Soft Bind',
          cost: 100,
          createdAt: '2024-01-14T09:00:00Z'
        }
      ]);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'printing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'printing': return <FileText className="h-4 w-4" />;
      case 'ready': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'pending': return 25;
      case 'printing': return 50;
      case 'ready': return 75;
      case 'completed': return 100;
      default: return 0;
    }
  };

  const stats = {
    totalOrders: orders.length,
    activeOrders: orders.filter(o => ['pending', 'printing', 'ready'].includes(o.status)).length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    totalSpent: orders.reduce((sum, order) => sum + order.cost, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">Manage your print orders and track their progress</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Orders</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.activeOrders}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-purple-600">₹{stats.totalSpent}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="flex-1">
              <Link href="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Upload New Document
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/profile">View Profile</Link>
            </Button>
          </div>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Track the status of your print orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-4">Upload your first document to get started</p>
                <Button asChild>
                  <Link href="/upload">
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Order
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{order.filename}</h3>
                        <p className="text-sm text-gray-600">
                          {order.pages} pages • {order.copies} copies • {order.color ? 'Color' : 'B&W'}
                          {order.binding !== 'None' && ` • ${order.binding}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                        <p className="text-sm font-medium text-gray-900 mt-1">₹{order.cost}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progress</span>
                        <span>{getProgressValue(order.status)}%</span>
                      </div>
                      <Progress value={getProgressValue(order.status)} className="h-2" />
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-xs text-gray-500">
                        Ordered {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      {order.status === 'ready' && (
                        <Badge className="bg-green-100 text-green-800">
                          Ready for Pickup!
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}