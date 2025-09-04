import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Eye,
  Mail,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  FileDown
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CustomerDetailModal } from "./CustomerDetailModal";

interface Customer {
  id: string;
  platform: 'amazon' | 'walmart' | 'ebay' | 'etsy';
  external_customer_id?: string;
  name: string;
  email?: string;
  phone?: string;
  total_orders: number;
  total_spent: number;
  average_order_value: number;
  last_order_date?: string;
  customer_since?: string;
  status: 'active' | 'inactive' | 'blocked';
  created_at: string;
}

const CustomersTab = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data as Customer[] || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch customers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setIsCustomerModalOpen(true);
  };

  const exportCustomers = () => {
    const csvContent = [
      ['Name', 'Email', 'Platform', 'Total Orders', 'Total Spent', 'Avg Order Value', 'Status'],
      ...customers.map(c => [
        c.name,
        c.email || 'N/A',
        c.platform,
        c.total_orders,
        c.total_spent,
        c.average_order_value,
        c.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Success", 
      description: "Customers exported successfully"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'blocked':
        return <Badge variant="destructive">Blocked</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlatformBadge = (platform: string) => {
    const platformColors = {
      amazon: "bg-orange-100 text-orange-800",
      walmart: "bg-blue-100 text-blue-800",
      ebay: "bg-yellow-100 text-yellow-800",
      etsy: "bg-orange-100 text-orange-800",
    };

    return (
      <Badge 
        variant="outline" 
        className={`capitalize ${platformColors[platform as keyof typeof platformColors] || ''}`}
      >
        {platform}
      </Badge>
    );
  };

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 1000) {
      return { label: "VIP", variant: "default" as const, color: "bg-purple-100 text-purple-800" };
    } else if (totalSpent >= 500) {
      return { label: "Premium", variant: "default" as const, color: "bg-yellow-100 text-yellow-800" };
    } else if (totalSpent >= 100) {
      return { label: "Regular", variant: "secondary" as const, color: "bg-blue-100 text-blue-800" };
    } else {
      return { label: "New", variant: "outline" as const, color: "bg-gray-100 text-gray-800" };
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalRevenue = customers.reduce((sum, customer) => sum + Number(customer.total_spent), 0);
  const averageOrderValue = customers.length > 0 
    ? customers.reduce((sum, customer) => sum + Number(customer.average_order_value), 0) / customers.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{totalCustomers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Customers</p>
                <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Customer Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${averageOrderValue.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>
                View and manage customers across all platforms
              </CardDescription>
            </div>
            <Button onClick={exportCustomers} variant="outline">
              <FileDown className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Avg Order</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-muted rounded-full animate-pulse"></div>
                          <div>
                            <div className="h-4 bg-muted rounded w-32 mb-2 animate-pulse"></div>
                            <div className="h-3 bg-muted rounded w-24 animate-pulse"></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell><div className="h-4 bg-muted rounded w-16 animate-pulse"></div></TableCell>
                      <TableCell><div className="h-4 bg-muted rounded w-24 animate-pulse"></div></TableCell>
                      <TableCell><div className="h-4 bg-muted rounded w-12 animate-pulse"></div></TableCell>
                      <TableCell><div className="h-4 bg-muted rounded w-20 animate-pulse"></div></TableCell>
                      <TableCell><div className="h-4 bg-muted rounded w-16 animate-pulse"></div></TableCell>
                      <TableCell><div className="h-4 bg-muted rounded w-16 animate-pulse"></div></TableCell>
                      <TableCell><div className="h-4 bg-muted rounded w-16 animate-pulse"></div></TableCell>
                      <TableCell><div className="h-4 bg-muted rounded w-20 animate-pulse"></div></TableCell>
                      <TableCell><div className="h-4 bg-muted rounded w-20 animate-pulse"></div></TableCell>
                    </TableRow>
                  ))
                ) : filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8">
                      <div className="flex flex-col items-center">
                        <Users className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium text-muted-foreground">No customers found</p>
                        <p className="text-sm text-muted-foreground">Customers will appear here once orders are synced</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => {
                    const customerTier = getCustomerTier(customer.total_spent);
                    return (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {customer.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{customer.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Customer since {customer.customer_since ? format(new Date(customer.customer_since), 'MMM yyyy') : 'N/A'}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getPlatformBadge(customer.platform)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col space-y-1">
                            {customer.email && (
                              <div className="flex items-center space-x-2 text-sm">
                                <Mail className="w-3 h-3 text-muted-foreground" />
                                <span className="text-muted-foreground">{customer.email}</span>
                              </div>
                            )}
                            {customer.phone && (
                              <div className="flex items-center space-x-2 text-sm">
                                <Phone className="w-3 h-3 text-muted-foreground" />
                                <span className="text-muted-foreground">{customer.phone}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{customer.total_orders}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-green-600">
                            ${Number(customer.total_spent).toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            ${Number(customer.average_order_value).toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={customerTier.variant} className={customerTier.color}>
                            <Star className="w-3 h-3 mr-1" />
                            {customerTier.label}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(customer.status)}</TableCell>
                        <TableCell>
                          {customer.last_order_date ? (
                            <div className="flex flex-col">
                              <span className="text-sm">{format(new Date(customer.last_order_date), 'MMM dd, yyyy')}</span>
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(customer.last_order_date), 'HH:mm')}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">No orders</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewCustomer(customer.id)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {customer.email && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => window.open(`mailto:${customer.email}`)}
                              >
                                <Mail className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CustomerDetailModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        customerId={selectedCustomerId}
      />
    </div>
  );
};

export default CustomersTab;