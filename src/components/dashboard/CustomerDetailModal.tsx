import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  DollarSign,
  Star,
  TrendingUp,
  Calendar,
  Package
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Customer {
  id: string;
  platform: string;
  external_customer_id?: string;
  name: string;
  email?: string;
  phone?: string;
  total_orders: number;
  total_spent: number;
  average_order_value: number;
  last_order_date?: string;
  customer_since?: string;
  status: string;
  default_shipping_address?: any;
  default_billing_address?: any;
  tags?: string[];
  notes?: string;
}

interface Order {
  id: string;
  order_number: string;
  order_date: string;
  total_amount: number;
  status: string;
  currency: string;
}

interface CustomerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: string | null;
}

export const CustomerDetailModal = ({ isOpen, onClose, customerId }: CustomerDetailModalProps) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (customerId && isOpen) {
      fetchCustomerDetails();
    }
  }, [customerId, isOpen]);

  const fetchCustomerDetails = async () => {
    if (!customerId) return;
    
    try {
      setLoading(true);
      
      // Fetch customer details
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('id', customerId)
        .single();

      if (customerError) throw customerError;

      // Fetch customer orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('id, order_number, order_date, total_amount, status, currency')
        .eq('customer_id', customerId)
        .order('order_date', { ascending: false })
        .limit(10);

      if (ordersError) throw ordersError;

      setCustomer(customerData);
      setOrders(ordersData || []);
    } catch (error) {
      console.error('Error fetching customer details:', error);
      toast({
        title: "Error",
        description: "Failed to fetch customer details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
      return { label: "VIP", color: "bg-purple-100 text-purple-800" };
    } else if (totalSpent >= 500) {
      return { label: "Premium", color: "bg-yellow-100 text-yellow-800" };
    } else if (totalSpent >= 100) {
      return { label: "Regular", color: "bg-blue-100 text-blue-800" };
    } else {
      return { label: "New", color: "bg-gray-100 text-gray-800" };
    }
  };

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Confirmed</Badge>;
      case 'processing':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'shipped':
        return <Badge variant="default" className="bg-green-100 text-green-800">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="default" className="bg-green-100 text-green-800">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'refunded':
        return <Badge variant="destructive">Refunded</Badge>;
      default:
        return <Badge variant="outline">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
    }
  };

  if (loading || !customer) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-48"></div>
            <div className="h-4 bg-muted rounded w-32"></div>
            <div className="space-y-3 mt-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const customerTier = getCustomerTier(customer.total_spent);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Customer Profile - {customer.name}
          </DialogTitle>
          <DialogDescription>
            Customer since {customer.customer_since ? format(new Date(customer.customer_since), 'MMMM dd, yyyy') : 'N/A'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-semibold text-xl">
                    {customer.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="font-medium">{customer.name}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  {getStatusBadge(customer.status)}
                  {getPlatformBadge(customer.platform)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold">{customer.total_orders}</p>
                  </div>
                  <ShoppingBag className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${Number(customer.total_spent).toFixed(2)}
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
                      ${Number(customer.average_order_value).toFixed(2)}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={customerTier.color}>
                    <Star className="w-3 h-3 mr-1" />
                    {customerTier.label} Customer
                  </Badge>
                </div>
                
                {customer.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{customer.email}</span>
                  </div>
                )}
                
                {customer.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{customer.phone}</span>
                  </div>
                )}

                {customer.external_customer_id && (
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-mono">ID: {customer.external_customer_id}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Customer Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Customer Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Customer Since</span>
                  <span className="text-sm font-medium">
                    {customer.customer_since ? format(new Date(customer.customer_since), 'MMM dd, yyyy') : 'N/A'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Order</span>
                  <span className="text-sm font-medium">
                    {customer.last_order_date ? format(new Date(customer.last_order_date), 'MMM dd, yyyy') : 'No orders'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Platform</span>
                  <span className="text-sm font-medium capitalize">{customer.platform}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Addresses */}
          {(customer.default_shipping_address || customer.default_billing_address) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customer.default_shipping_address && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Default Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-1">
                      <p>{customer.default_shipping_address.line1}</p>
                      {customer.default_shipping_address.line2 && <p>{customer.default_shipping_address.line2}</p>}
                      <p>{customer.default_shipping_address.city}, {customer.default_shipping_address.state} {customer.default_shipping_address.postal_code}</p>
                      <p>{customer.default_shipping_address.country}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {customer.default_billing_address && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Default Billing Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-1">
                      <p>{customer.default_billing_address.line1}</p>
                      {customer.default_billing_address.line2 && <p>{customer.default_billing_address.line2}</p>}
                      <p>{customer.default_billing_address.city}, {customer.default_billing_address.state} {customer.default_billing_address.postal_code}</p>
                      <p>{customer.default_billing_address.country}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Last {orders.length} orders from this customer</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order Number</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-sm">{order.order_number}</TableCell>
                        <TableCell>{format(new Date(order.order_date), 'MMM dd, yyyy')}</TableCell>
                        <TableCell className="font-medium">
                          ${Number(order.total_amount).toFixed(2)} {order.currency}
                        </TableCell>
                        <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">No orders found</p>
                  <p className="text-sm text-muted-foreground">This customer hasn't placed any orders yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags & Notes */}
          {(customer.tags?.length || customer.notes) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customer.tags && customer.tags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {customer.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {customer.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{customer.notes}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};