"use client"

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  FileText, 
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Calendar,
  DollarSign
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
  updatedAt: string;
}

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
      return;
    }
    
    if (user) {
      // Mock orders data
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
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T16:30:00Z'
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
          createdAt: '2024-01-15T14:15:00Z',
          updatedAt: '2024-01-15T15:00:00Z'
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
          createdAt: '2024-01-14T09:00:00Z',
          updatedAt: '2024-01-14T18:00:00Z'
        },
        {
          id: '4',
          filename: 'Assignment.docx',
          status: 'pending',
          pages: 8,
          copies: 1,
          color: false,
          binding: 'None',
          cost: 16,
          createdAt: '2024-01-16T11:20:00Z',
          updatedAt: '2024-01-16T11:20:00Z'
        },
        {
          id: '5',
          filename: 'Thesis_Draft.pdf',
          status: 'completed',
          pages: 120,
          copies: 3,
          color: false,
          binding: 'Spiral',
          cost: 795,
          createdAt: '2024-01-10T08:00:00Z',
          updatedAt: '2024-01-12T17:30:00Z'
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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.filename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    active: orders.filter(o => ['pending', 'printing', 'ready'].includes(o.status)).length,
    completed: orders.filter(o => o.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage all your print orders</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <AlertCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search orders by filename..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="printing">Printing</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>
              {filteredOrders.length} of {orders.length} orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOrders.map((order) => (
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
                          <span className="font-medium">Pages:</span> {order.pages}
                        </div>
                        <div>
                          <span className="font-medium">Copies:</span> {order.copies}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> {order.color ? 'Color' : 'B&W'}
                        </div>
                        <div>
                          <span className="font-medium">Binding:</span> {order.binding}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-gray-900">₹{order.cost}</p>
                      <p className="text-sm text-gray-600">
                        {order.status === 'ready' && (
                          <span className="text-green-600 font-medium">Ready for Pickup!</span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Progress</span>
                      <span>{getProgressValue(order.status)}%</span>
                    </div>
                    <Progress value={getProgressValue(order.status)} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Ordered: {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      {order.updatedAt !== order.createdAt && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Updated: {new Date(order.updatedAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      {order.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                  <p className="text-gray-600">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filter criteria'
                      : 'You haven\'t placed any orders yet'
                    }
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}