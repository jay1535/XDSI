"use client"

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Eye,
  Download,
  Settings,
  Bell,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  filename: string;
  status: 'pending' | 'printing' | 'ready' | 'completed';
  pages: number;
  copies: number;
  color: boolean;
  binding: string;
  cost: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState({
    bwPrice: 2,
    colorPrice: 5,
    bindingPrice: 25
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/auth/login');
      return;
    }
    
    // Mock orders data
    if (user && user.role === 'admin') {
      setOrders([
        {
          id: '1',
          userId: 'u1',
          userName: 'John Doe',
          userEmail: 'john@example.com',
          filename: 'Project_Report.pdf',
          status: 'pending',
          pages: 25,
          copies: 2,
          color: true,
          binding: 'Spiral',
          cost: 275,
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          userId: 'u2',
          userName: 'Jane Smith',
          userEmail: 'jane@example.com',
          filename: 'Resume.docx',
          status: 'printing',
          pages: 2,
          copies: 5,
          color: false,
          binding: 'None',
          cost: 20,
          createdAt: '2024-01-15T14:15:00Z',
          updatedAt: '2024-01-15T15:00:00Z'
        },
        {
          id: '3',
          userId: 'u3',
          userName: 'Mike Johnson',
          userEmail: 'mike@example.com',
          filename: 'Presentation.pdf',
          status: 'ready',
          pages: 15,
          copies: 1,
          color: true,
          binding: 'Soft Bind',
          cost: 100,
          createdAt: '2024-01-14T09:00:00Z',
          updatedAt: '2024-01-15T16:30:00Z'
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

  if (!user || user.role !== 'admin') return null;

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as any, updatedAt: new Date().toISOString() }
        : order
    ));
    toast.success(`Order status updated to ${newStatus}`);
  };

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

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    activeOrders: orders.filter(o => ['pending', 'printing'].includes(o.status)).length,
    totalRevenue: orders.reduce((sum, order) => sum + order.cost, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage orders, settings, and monitor business performance</p>
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
                  <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</p>
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
                  <p className="text-sm font-medium text-gray-600">Active Orders</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.activeOrders}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">₹{stats.totalRevenue}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Orders Management</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>
                  View and manage all customer orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{order.filename}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1 capitalize">{order.status}</span>
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                            <div>
                              <span className="font-medium">Customer:</span>
                              <p>{order.userName}</p>
                              <p className="text-xs">{order.userEmail}</p>
                            </div>
                            <div>
                              <span className="font-medium">Details:</span>
                              <p>{order.pages} pages • {order.copies} copies</p>
                              <p>{order.color ? 'Color' : 'B&W'} • {order.binding}</p>
                            </div>
                            <div>
                              <span className="font-medium">Cost:</span>
                              <p className="text-lg font-semibold text-gray-900">₹{order.cost}</p>
                            </div>
                            <div>
                              <span className="font-medium">Ordered:</span>
                              <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                              <p className="text-xs">{new Date(order.createdAt).toLocaleTimeString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Document
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                        
                        <div className="flex gap-2">
                          {order.status === 'pending' && (
                            <Button 
                              size="sm" 
                              onClick={() => updateOrderStatus(order.id, 'printing')}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Start Printing
                            </Button>
                          )}
                          {order.status === 'printing' && (
                            <Button 
                              size="sm" 
                              onClick={() => updateOrderStatus(order.id, 'ready')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Mark Ready
                            </Button>
                          )}
                          {order.status === 'ready' && (
                            <Button 
                              size="sm" 
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="bg-gray-600 hover:bg-gray-700"
                            >
                              Mark Completed
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Pricing Settings
                  </CardTitle>
                  <CardDescription>
                    Configure pricing for different print options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bwPrice">Black & White (per page)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          id="bwPrice"
                          type="number"
                          value={settings.bwPrice}
                          onChange={(e) => setSettings(prev => ({ ...prev, bwPrice: Number(e.target.value) }))}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="colorPrice">Color (per page)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          id="colorPrice"
                          type="number"
                          value={settings.colorPrice}
                          onChange={(e) => setSettings(prev => ({ ...prev, colorPrice: Number(e.target.value) }))}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bindingPrice">Binding (per document)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          id="bindingPrice"
                          type="number"
                          value={settings.bindingPrice}
                          onChange={(e) => setSettings(prev => ({ ...prev, bindingPrice: Number(e.target.value) }))}
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => toast.success('Settings saved successfully!')}>
                    Save Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Configure how customers receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => toast.success('Notification settings updated!')}>
                    Update Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Analytics</CardTitle>
                  <CardDescription>
                    Overview of your printing business performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">156</div>
                      <div className="text-sm text-gray-600">Total Customers</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">₹12,450</div>
                      <div className="text-sm text-gray-600">This Month Revenue</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">2,340</div>
                      <div className="text-sm text-gray-600">Pages Printed</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">4.8</div>
                      <div className="text-sm text-gray-600">Average Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}