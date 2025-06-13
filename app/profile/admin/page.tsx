"use client"

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Settings, 
  Bell,
  DollarSign,
  FileText,
  Users,
  TrendingUp,
  Calendar,
  Shield,
  Clock,
  Printer,
  BarChart3,
  Download,
  Eye
} from 'lucide-react';

interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  avgOrderValue: number;
  monthlyGrowth: number;
  pendingOrders: number;
}

interface BusinessSettings {
  shopName: string;
  bwPrice: number;
  colorPrice: number;
  bindingPrice: number;
  operatingHours: string;
  maxFileSize: number;
  autoNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

export default function AdminProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    shopName: '',
    businessLicense: ''
  });

  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>({
    shopName: 'XeroxPro Print Shop',
    bwPrice: 2,
    colorPrice: 5,
    bindingPrice: 25,
    operatingHours: '9:00 AM - 8:00 PM',
    maxFileSize: 10,
    autoNotifications: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const [adminStats, setAdminStats] = useState<AdminStats>({
    totalOrders: 1247,
    totalRevenue: 45680,
    totalCustomers: 156,
    avgOrderValue: 87,
    monthlyGrowth: 12.5,
    pendingOrders: 8
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: '1',
      type: 'order',
      description: 'New order from John Doe - Project_Report.pdf',
      timestamp: '2024-01-15T10:30:00Z',
      amount: 275
    },
    {
      id: '2',
      type: 'payment',
      description: 'Payment received for Order #ORD-001',
      timestamp: '2024-01-15T09:15:00Z',
      amount: 150
    },
    {
      id: '3',
      type: 'customer',
      description: 'New customer registration - Jane Smith',
      timestamp: '2024-01-15T08:45:00Z',
      amount: 0
    }
  ]);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/auth/login');
      return;
    }
    
    if (user && user.role === 'admin') {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: '+91 98765 43210',
        address: '123 Business Street, City, State 12345',
        shopName: 'XeroxPro Print Shop',
        businessLicense: 'BL-2024-001'
      });
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

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Admin profile updated successfully!');
  };

  const handleBusinessSettingsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Business settings updated successfully!');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'payment': return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'customer': return <Users className="h-4 w-4 text-purple-600" />;
      default: return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Profile</h1>
          <p className="text-gray-600">Manage your business profile, settings, and monitor performance</p>
        </div>

        {/* Admin Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{adminStats.totalOrders}</p>
                  <p className="text-xs text-green-600">+{adminStats.monthlyGrowth}% this month</p>
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
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{adminStats.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+15.2% this month</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{adminStats.totalCustomers}</p>
                  <p className="text-xs text-blue-600">+8 new this week</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-900">₹{adminStats.avgOrderValue}</p>
                  <p className="text-xs text-orange-600">{adminStats.pendingOrders} pending</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="business">Business Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Admin Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal and business contact information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shopName">Shop Name</Label>
                      <div className="relative">
                        <Printer className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="shopName"
                          value={profileData.shopName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, shopName: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Business Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessLicense">Business License</Label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="businessLicense"
                          value={profileData.businessLicense}
                          onChange={(e) => setProfileData(prev => ({ ...prev, businessLicense: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full md:w-auto">
                    Update Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Business Settings
                </CardTitle>
                <CardDescription>
                  Configure pricing, operating hours, and business preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBusinessSettingsUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bwPrice">Black & White (per page)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          id="bwPrice"
                          type="number"
                          value={businessSettings.bwPrice}
                          onChange={(e) => setBusinessSettings(prev => ({ ...prev, bwPrice: Number(e.target.value) }))}
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
                          value={businessSettings.colorPrice}
                          onChange={(e) => setBusinessSettings(prev => ({ ...prev, colorPrice: Number(e.target.value) }))}
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
                          value={businessSettings.bindingPrice}
                          onChange={(e) => setBusinessSettings(prev => ({ ...prev, bindingPrice: Number(e.target.value) }))}
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="operatingHours">Operating Hours</Label>
                      <Input
                        id="operatingHours"
                        value={businessSettings.operatingHours}
                        onChange={(e) => setBusinessSettings(prev => ({ ...prev, operatingHours: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                      <Input
                        id="maxFileSize"
                        type="number"
                        value={businessSettings.maxFileSize}
                        onChange={(e) => setBusinessSettings(prev => ({ ...prev, maxFileSize: Number(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <Button type="submit">Save Business Settings</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how you receive notifications about orders and business updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto Notifications</Label>
                    <p className="text-sm text-gray-600">Automatically notify customers about order status changes</p>
                  </div>
                  <Switch
                    checked={businessSettings.autoNotifications}
                    onCheckedChange={(checked) => setBusinessSettings(prev => ({ ...prev, autoNotifications: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive email alerts for new orders and payments</p>
                  </div>
                  <Switch
                    checked={businessSettings.emailNotifications}
                    onCheckedChange={(checked) => setBusinessSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">SMS Notifications</Label>
                    <p className="text-sm text-gray-600">Get SMS alerts for urgent order updates</p>
                  </div>
                  <Switch
                    checked={businessSettings.smsNotifications}
                    onCheckedChange={(checked) => setBusinessSettings(prev => ({ ...prev, smsNotifications: checked }))}
                  />
                </div>

                <Button onClick={() => toast.success('Notification preferences updated!')}>
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Business Analytics
                  </CardTitle>
                  <CardDescription>
                    Detailed insights into your business performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">2,340</div>
                      <div className="text-sm text-gray-600">Pages Printed This Month</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">₹12,450</div>
                      <div className="text-sm text-gray-600">Monthly Revenue</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">4.8</div>
                      <div className="text-sm text-gray-600">Average Rating</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">95%</div>
                      <div className="text-sm text-gray-600">Customer Satisfaction</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Services</CardTitle>
                  <CardDescription>Most requested printing services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Black & White Printing</span>
                      <Badge variant="secondary">68% of orders</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Color Printing</span>
                      <Badge variant="secondary">25% of orders</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Spiral Binding</span>
                      <Badge variant="secondary">45% of orders</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Bulk Orders (50+ pages)</span>
                      <Badge variant="secondary">12% of orders</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest business activities and transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-100 p-2 rounded-lg">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.description}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.amount > 0 && (
                          <p className="font-semibold text-green-600">+₹{activity.amount}</p>
                        )}
                        <div className="flex space-x-2 mt-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}