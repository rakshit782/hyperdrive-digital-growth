import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Store
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardUser } from "@/pages/Dashboard";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  lowStockProducts: number;
  pendingOrders: number;
  newCustomers: number;
}

interface DashboardOverviewProps {
  user: DashboardUser | null;
}

export function DashboardOverview({ user }: DashboardOverviewProps) {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
    pendingOrders: 0,
    newCustomers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch products
      const { data: products } = await supabase
        .from('products')
        .select('stock_quantity, min_stock_level, price');
      
      // Fetch orders
      const { data: orders } = await supabase
        .from('orders')
        .select('total_amount, status, created_at');
      
      // Fetch customers
      const { data: customers } = await supabase
        .from('customers')
        .select('created_at');

      const totalProducts = products?.length || 0;
      const totalOrders = orders?.length || 0;
      const totalCustomers = customers?.length || 0;
      const totalRevenue = orders?.reduce((sum, order) => sum + (parseFloat(order.total_amount?.toString() || '0')), 0) || 0;
      
      // Low stock products
      const lowStockProducts = products?.filter(product => 
        (product.stock_quantity || 0) <= (product.min_stock_level || 0)
      ).length || 0;
      
      // Pending orders
      const pendingOrders = orders?.filter(order => order.status === 'pending').length || 0;
      
      // New customers (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const newCustomers = customers?.filter(customer => 
        new Date(customer.created_at) > thirtyDaysAgo
      ).length || 0;

      setStats({
        totalProducts,
        totalOrders,
        totalCustomers,
        totalRevenue,
        lowStockProducts,
        pendingOrders,
        newCustomers,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Set demo data for development
      setStats({
        totalProducts: 148,
        totalOrders: 892,
        totalCustomers: 1253,
        totalRevenue: 45672.30,
        lowStockProducts: 12,
        pendingOrders: 23,
        newCustomers: 48,
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      isPositive: true
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      change: "+8.2%",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      isPositive: true
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers.toLocaleString(),
      change: "+15.1%",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      isPositive: true
    },
    {
      title: "Total Products",
      value: stats.totalProducts.toLocaleString(),
      change: "+3.4%",
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      isPositive: true
    }
  ];

  const alertCards = [
    {
      title: "Low Stock Alert",
      value: stats.lowStockProducts,
      description: "Products running low on stock",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      urgent: stats.lowStockProducts > 10
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      description: "Orders awaiting processing",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      urgent: stats.pendingOrders > 20
    },
    {
      title: "New Customers",
      value: stats.newCustomers,
      description: "New customers this month",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
      urgent: false
    }
  ];

  const platformStatus = [
    { name: "Amazon", status: "connected", orders: 234, revenue: 15420 },
    { name: "eBay", status: "connected", orders: 156, revenue: 8930 },
    { name: "Etsy", status: "connected", orders: 89, revenue: 4250 },
    { name: "Walmart", status: "disconnected", orders: 0, revenue: 0 },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-4 w-4 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-24 mb-2"></div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Welcome back, {user?.email?.split('@')[0] || 'Admin'}</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your e-commerce business today.
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`w-8 h-8 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.isPositive ? (
                  <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                )}
                <span className={stat.isPositive ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {alertCards.map((alert, index) => (
          <Card key={index} className={`hover:shadow-md transition-shadow ${alert.urgent ? 'border-red-200 bg-red-50/30' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {alert.title}
              </CardTitle>
              <div className={`w-8 h-8 rounded-full ${alert.bgColor} flex items-center justify-center`}>
                <alert.icon className={`w-4 h-4 ${alert.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alert.value}</div>
              <p className="text-xs text-muted-foreground">
                {alert.description}
              </p>
              {alert.urgent && (
                <Badge variant="destructive" className="mt-2">
                  Needs Attention
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Platform Status */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Integrations</CardTitle>
          <CardDescription>
            Status of your connected e-commerce platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platformStatus.map((platform, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Store className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{platform.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant={platform.status === 'connected' ? 'default' : 'secondary'}
                        className={platform.status === 'connected' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {platform.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${platform.revenue.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{platform.orders} orders</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}