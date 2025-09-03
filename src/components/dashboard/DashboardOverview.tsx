import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  lowStockProducts: number;
  pendingOrders: number;
  newCustomers: number;
}

const DashboardOverview = () => {
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
      // Fetch products stats
      const { data: products } = await supabase
        .from('products')
        .select('id, stock_quantity, min_stock_level');

      // Fetch orders stats
      const { data: orders } = await supabase
        .from('orders')
        .select('id, status, total_amount, created_at');

      // Fetch customers stats
      const { data: customers } = await supabase
        .from('customers')
        .select('id, created_at');

      const totalProducts = products?.length || 0;
      const totalOrders = orders?.length || 0;
      const totalCustomers = customers?.length || 0;
      
      const totalRevenue = orders?.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) || 0;
      
      const lowStockProducts = products?.filter(p => 
        p.stock_quantity <= p.min_stock_level
      ).length || 0;
      
      const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0;
      
      // New customers in last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const newCustomers = customers?.filter(c => 
        new Date(c.created_at) >= thirtyDaysAgo
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
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+23%",
      changeType: "positive"
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+8%",
      changeType: "positive"
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      change: "+15%",
      changeType: "positive"
    },
  ];

  const alertCards = [
    {
      title: "Low Stock Alert",
      value: stats.lowStockProducts,
      description: "Products below minimum stock level",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      urgent: stats.lowStockProducts > 0
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      description: "Orders awaiting processing",
      icon: ShoppingCart,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      urgent: stats.pendingOrders > 10
    },
    {
      title: "New Customers",
      value: stats.newCustomers,
      description: "New customers this month",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      urgent: false
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                      <span className="text-sm text-muted-foreground ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alerts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {alertCards.map((alert, index) => {
          const IconComponent = alert.icon;
          return (
            <Card key={index} className={`hover:shadow-lg transition-shadow duration-200 ${
              alert.urgent ? 'border-red-200 bg-red-50/30' : ''
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg ${alert.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`w-5 h-5 ${alert.color}`} />
                  </div>
                  {alert.urgent && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{alert.title}</h3>
                <p className="text-2xl font-bold text-foreground mb-2">{alert.value}</p>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Platform Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Platform Integration Status
          </CardTitle>
          <CardDescription>
            Monitor the connection status of your e-commerce platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Amazon', 'Walmart', 'eBay', 'Etsy'].map((platform) => (
              <div key={platform} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-sm font-semibold">{platform[0]}</span>
                  </div>
                  <span className="font-medium text-foreground">{platform}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <Badge variant="secondary" className="text-xs">
                    Inactive
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;