import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search,
  Filter,
  Users,
  UserPlus,
  Star,
  Eye,
  Mail,
  Phone
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardUser } from "@/pages/Dashboard";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  total_orders: number;
  total_spent: number;
  average_order_value: number;
  last_order_date?: string;
  customer_since: string;
  status: string;
  platform: string;
  created_at: string;
}

interface CustomersManagementProps {
  user: DashboardUser | null;
}

export function CustomersManagement({ user }: CustomersManagementProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      // Demo data for development
      setCustomers([
        {
          id: "1",
          name: "John Smith",
          email: "john@example.com",
          phone: "+1 (555) 123-4567",
          total_orders: 12,
          total_spent: 1234.56,
          average_order_value: 102.88,
          last_order_date: "2024-03-15T10:00:00Z",
          customer_since: "2023-08-15T10:00:00Z",
          status: "active",
          platform: "Amazon",
          created_at: "2023-08-15T10:00:00Z"
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah@example.com",
          phone: "+1 (555) 234-5678",
          total_orders: 8,
          total_spent: 789.99,
          average_order_value: 98.75,
          last_order_date: "2024-03-12T10:00:00Z",
          customer_since: "2023-11-20T10:00:00Z",
          status: "active",
          platform: "eBay",
          created_at: "2023-11-20T10:00:00Z"
        },
        {
          id: "3",
          name: "Mike Davis",
          email: "mike@example.com",
          total_orders: 25,
          total_spent: 2456.78,
          average_order_value: 98.27,
          last_order_date: "2024-03-10T10:00:00Z",
          customer_since: "2023-05-10T10:00:00Z",
          status: "active",
          platform: "Etsy",
          created_at: "2023-05-10T10:00:00Z"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 2000) {
      return { tier: "VIP", color: "bg-yellow-100 text-yellow-800" };
    } else if (totalSpent >= 1000) {
      return { tier: "Premium", color: "bg-purple-100 text-purple-800" };
    } else if (totalSpent >= 500) {
      return { tier: "Regular", color: "bg-blue-100 text-blue-800" };
    } else {
      return { tier: "New", color: "bg-gray-100 text-gray-800" };
    }
  };

  const customerStats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    vip: customers.filter(c => c.total_spent >= 2000).length,
    new: customers.filter(c => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return new Date(c.created_at) > thirtyDaysAgo;
    }).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customer Management</h1>
          <p className="text-muted-foreground">
            Manage and view your customers across all platforms
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{customerStats.total}</p>
              <p className="text-xs text-muted-foreground">Total Customers</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{customerStats.active}</p>
              <p className="text-xs text-muted-foreground">Active Customers</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{customerStats.vip}</p>
              <p className="text-xs text-muted-foreground">VIP Customers</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{customerStats.new}</p>
              <p className="text-xs text-muted-foreground">New This Month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Customer List</CardTitle>
              <CardDescription>
                View and manage all your customers
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading customers...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Avg. Order</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => {
                  const tier = getCustomerTier(customer.total_spent);
                  return (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Customer since {new Date(customer.customer_since).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-3 h-3" />
                            {customer.email}
                          </div>
                          {customer.phone && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              {customer.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{customer.platform}</TableCell>
                      <TableCell>{customer.total_orders}</TableCell>
                      <TableCell>${customer.total_spent.toFixed(2)}</TableCell>
                      <TableCell>${customer.average_order_value.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={tier.color}>
                          {tier.tier}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {customer.last_order_date ? 
                          new Date(customer.last_order_date).toLocaleDateString() :
                          'No orders'
                        }
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}