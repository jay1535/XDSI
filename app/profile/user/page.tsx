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
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  FileText,
  Download,
  Eye,
  Calendar,
  DollarSign,
  Bell,
  Settings,
  Award,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  Star
} from 'lucide-react';

interface Transaction {
  id: string;
  orderId: string;
  filename: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  paymentMethod: string;
}

interface UserStats {
  totalOrders: number;
  totalSpent: number;
  documentsUploaded: number;
  pagesProcessed: number;
  loyaltyPoints: number;
  memberSince: string;
}

interface NotificationSettings {
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
  smsNotifications: boolean;
}

export default function UserProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    occupation: ''
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    smsNotifications: false
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalOrders: 0,
    totalSpent: 0,
    documentsUploaded: 0,
    pagesProcessed: 0,
    loyaltyPoints: 0,
    memberSince: ''
  });

  const [recentOrders, setRecentOrders] = useState([
    {
      id: '1',
      filename: 'Project_Report.pdf',
      status: 'completed',
      amount: 275,
      date: '2024-01-15T10:30:00Z',
      pages: 25
    },
    {
      id: '2',
      filename: 'Resume.docx',
      status: 'completed',
      amount: 20,
      date: '2024-01-15T14:15:00Z',
      pages: 2
    },
    {
      id: '3',
      filename: 'Assignment.pdf',
      status: 'pending',
      amount: 45,
      date: '2024-01-16T09:00:00Z',
      pages: 8
    }
  ]);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'user')) {
      router.push('/auth/login');
      return;
    }
    
    if (user && user.role === 'user') {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: '+91 98765 43210',
        address: '123 Main Street, City, State 12345',
        dateOfBirth: '1995-06-15',
        occupation: 'Student'
      });

      // Mock transaction data
      setTransactions([
        {
          id: 'txn_001',
          orderId: 'ord_001',
          filename: 'Project_Report.pdf',
          amount: 275,
          status: 'completed',
          date: '2024-01-15T10:30:00Z',
          paymentMethod: 'Credit Card'
        },
        {
          id: 'txn_002',
          orderId: 'ord_002',
          filename: 'Resume.docx',
          amount: 20,
          status: 'completed',
          date: '2024-01-15T14:15:00Z',
          paymentMethod: 'UPI'
        },
        {
          id: 'txn_003',
          orderId: 'ord_003',
          filename: 'Assignment.pdf',
          amount: 45,
          status: 'pending',
          date: '2024-01-16T09:00:00Z',
          paymentMethod: 'Debit Card'
        }
      ]);

      setUserStats({
        totalOrders: 15,
        totalSpent: 1250,
        documentsUploaded: 18,
        pagesProcessed: 342,
        loyaltyPoints: 125,
        memberSince: '2023-08-15'
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

  if (!user || user.role !== 'user') return null;

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  const handleNotificationUpdate = () => {
    toast.success('Notification preferences updated!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const loyaltyProgress = (userStats.loyaltyPoints % 100);
  const nextRewardAt = Math.ceil(userStats.loyaltyPoints / 100) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and view your printing history</p>
        </div>

        {/* User Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalOrders}</p>
                  <p className="text-xs text-blue-600">Since {new Date(userStats.memberSince).getFullYear()}</p>
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
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">₹{userStats.totalSpent}</p>
                  <p className="text-xs text-green-600">Saved ₹{Math.floor(userStats.totalSpent * 0.1)} with offers</p>
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
                  <p className="text-sm font-medium text-gray-600">Pages Processed</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.pagesProcessed}</p>
                  <p className="text-xs text-purple-600">{userStats.documentsUploaded} documents</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Loyalty Points</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.loyaltyPoints}</p>
                  <p className="text-xs text-orange-600">{nextRewardAt - userStats.loyaltyPoints} to next reward</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and contact information
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
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        value={profileData.occupation}
                        onChange={(e) => setProfileData(prev => ({ ...prev, occupation: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
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
                  </div>
                  <Button type="submit" className="w-full md:w-auto">
                    Update Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Recent Orders
                </CardTitle>
                <CardDescription>
                  Your latest printing orders and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{order.filename}</h3>
                          <p className="text-sm text-gray-600">
                            {order.pages} pages • {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <p className="text-lg font-semibold text-gray-900 mt-1">₹{order.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Transaction History
                </CardTitle>
                <CardDescription>
                  View all your payment transactions and receipts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="bg-green-100 p-2 rounded-lg">
                            <CreditCard className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{transaction.filename}</h3>
                            <p className="text-sm text-gray-600">Order ID: {transaction.orderId}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                          <p className="text-lg font-semibold text-gray-900 mt-1">₹{transaction.amount}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(transaction.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-1" />
                            {transaction.paymentMethod}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loyalty">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Loyalty Program
                  </CardTitle>
                  <CardDescription>
                    Earn points with every order and unlock exclusive rewards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progress to next reward</span>
                        <span className="text-sm text-gray-600">{userStats.loyaltyPoints}/{nextRewardAt} points</span>
                      </div>
                      <Progress value={loyaltyProgress} className="h-3" />
                      <p className="text-xs text-gray-600 mt-1">
                        {nextRewardAt - userStats.loyaltyPoints} more points to unlock your next reward!
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                        <Star className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-lg font-bold text-blue-600">Bronze</div>
                        <div className="text-sm text-gray-600">Current Level</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg opacity-60">
                        <Star className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <div className="text-lg font-bold text-gray-600">Silver</div>
                        <div className="text-sm text-gray-600">500 points</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg opacity-60">
                        <Star className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <div className="text-lg font-bold text-gray-600">Gold</div>
                        <div className="text-sm text-gray-600">1000 points</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Rewards</CardTitle>
                  <CardDescription>Redeem your points for exclusive benefits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">10% Discount on Next Order</h4>
                        <p className="text-sm text-gray-600">Valid for 30 days</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">100 points</Badge>
                        <Button size="sm" className="ml-2" disabled={userStats.loyaltyPoints < 100}>
                          Redeem
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Free Binding Service</h4>
                        <p className="text-sm text-gray-600">One-time use</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">150 points</Badge>
                        <Button size="sm" className="ml-2" disabled={userStats.loyaltyPoints < 150}>
                          Redeem
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Priority Processing</h4>
                        <p className="text-sm text-gray-600">Skip the queue for 5 orders</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">200 points</Badge>
                        <Button size="sm" className="ml-2" disabled={userStats.loyaltyPoints < 200}>
                          Redeem
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Choose how you want to receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Order Updates</Label>
                      <p className="text-sm text-gray-600">Get notified about order status changes</p>
                    </div>
                    <Switch
                      checked={notificationSettings.orderUpdates}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, orderUpdates: checked }))}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Promotions & Offers</Label>
                      <p className="text-sm text-gray-600">Receive special offers and discounts</p>
                    </div>
                    <Switch
                      checked={notificationSettings.promotions}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, promotions: checked }))}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Newsletter</Label>
                      <p className="text-sm text-gray-600">Monthly updates and printing tips</p>
                    </div>
                    <Switch
                      checked={notificationSettings.newsletter}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, newsletter: checked }))}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">SMS Notifications</Label>
                      <p className="text-sm text-gray-600">Receive SMS for urgent updates</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, smsNotifications: checked }))}
                    />
                  </div>

                  <Button onClick={handleNotificationUpdate}>
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Account Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Download My Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}