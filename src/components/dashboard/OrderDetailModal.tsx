import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  User, 
  MapPin, 
  CreditCard, 
  Truck,
  Calendar,
  ExternalLink,
  Copy,
  Mail,
  Phone
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface OrderItem {
  id: string;
  sku: string;
  product_title: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: string;
  order_number: string;
  platform: string;
  external_order_id: string;
  customer_name?: string;
  customer_email?: string;
  total_amount: number;
  tax_amount?: number;
  shipping_amount?: number;
  discount_amount?: number;
  currency: string;
  status: string;
  fulfillment_status: string;
  payment_status: string;
  order_date: string;
  shipped_date?: string;
  tracking_number?: string;
  shipping_address?: any;
  billing_address?: any;
  notes?: string;
}

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
}

export const OrderDetailModal = ({ isOpen, onClose, orderId }: OrderDetailModalProps) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (orderId && isOpen) {
      fetchOrderDetails();
    }
  }, [orderId, isOpen]);

  const fetchOrderDetails = async () => {
    if (!orderId) return;
    
    try {
      setLoading(true);
      
      // Fetch order details
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (orderError) throw orderError;

      // Fetch order items
      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);

      if (itemsError) throw itemsError;

      setOrder(orderData);
      setOrderItems(itemsData || []);
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast({
        title: "Error",
        description: "Failed to fetch order details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Copied to clipboard",
    });
  };

  const getStatusBadge = (status: string, type: 'order' | 'fulfillment' | 'payment') => {
    const variants: Record<string, any> = {
      order: {
        pending: { variant: "secondary", className: "bg-yellow-100 text-yellow-800" },
        confirmed: { variant: "default", className: "bg-blue-100 text-blue-800" },
        processing: { variant: "default", className: "bg-blue-100 text-blue-800" },
        shipped: { variant: "default", className: "bg-green-100 text-green-800" },
        delivered: { variant: "default", className: "bg-green-100 text-green-800" },
        cancelled: { variant: "destructive" },
        refunded: { variant: "destructive" },
      },
      fulfillment: {
        unfulfilled: { variant: "outline" },
        partial: { variant: "secondary", className: "bg-yellow-100 text-yellow-800" },
        fulfilled: { variant: "default", className: "bg-green-100 text-green-800" },
      },
      payment: {
        pending: { variant: "secondary", className: "bg-yellow-100 text-yellow-800" },
        paid: { variant: "default", className: "bg-green-100 text-green-800" },
        failed: { variant: "destructive" },
        refunded: { variant: "destructive" },
      }
    };

    const config = variants[type][status] || { variant: "outline" };
    return (
      <Badge variant={config.variant} className={config.className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading || !order) {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Order Details - {order.order_number}
          </DialogTitle>
          <DialogDescription>
            Order placed on {format(new Date(order.order_date), 'MMMM dd, yyyy')} via {order.platform}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Order Status</p>
                  {getStatusBadge(order.status, 'order')}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Fulfillment</p>
                  {getStatusBadge(order.fulfillment_status, 'fulfillment')}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Payment</p>
                  {getStatusBadge(order.payment_status, 'payment')}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{order.customer_name || 'N/A'}</p>
                  {order.customer_email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      <span>{order.customer_email}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(order.customer_email!)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Order Number</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{order.order_number}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(order.order_number)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Platform Order ID</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{order.external_order_id}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(order.external_order_id)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Platform</span>
                  <Badge variant="outline" className="capitalize">
                    {order.platform}
                  </Badge>
                </div>
                {order.tracking_number && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tracking</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{order.tracking_number}</span>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Addresses */}
          {(order.shipping_address || order.billing_address) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {order.shipping_address && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-1">
                      <p>{order.shipping_address.line1}</p>
                      {order.shipping_address.line2 && <p>{order.shipping_address.line2}</p>}
                      <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}</p>
                      <p>{order.shipping_address.country}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {order.billing_address && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Billing Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-1">
                      <p>{order.billing_address.line1}</p>
                      {order.billing_address.line2 && <p>{order.billing_address.line2}</p>}
                      <p>{order.billing_address.city}, {order.billing_address.state} {order.billing_address.postal_code}</p>
                      <p>{order.billing_address.country}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>{orderItems.length} item(s)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{item.product_title}</p>
                        <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {item.quantity} × ${Number(item.unit_price).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total: ${Number(item.total_price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${(Number(order.total_amount) - (Number(order.tax_amount) || 0) - (Number(order.shipping_amount) || 0) + (Number(order.discount_amount) || 0)).toFixed(2)}</span>
                </div>
                {order.shipping_amount && (
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${Number(order.shipping_amount).toFixed(2)}</span>
                  </div>
                )}
                {order.tax_amount && (
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${Number(order.tax_amount).toFixed(2)}</span>
                  </div>
                )}
                {order.discount_amount && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${Number(order.discount_amount).toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${Number(order.total_amount).toFixed(2)} {order.currency}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {order.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{order.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};