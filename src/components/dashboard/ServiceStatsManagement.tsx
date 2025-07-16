
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ServiceStat {
  id: string;
  service_type: string;
  stat_label: string;
  stat_value: string;
  stat_description: string | null;
  icon_name: string | null;
  is_active: boolean;
  sort_order: number;
}

const ServiceStatsManagement = () => {
  const [stats, setStats] = useState<ServiceStat[]>([]);
  const [editingStat, setEditingStat] = useState<ServiceStat | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const emptyStat: Omit<ServiceStat, 'id'> = {
    service_type: '',
    stat_label: '',
    stat_value: '',
    stat_description: '',
    icon_name: '',
    is_active: true,
    sort_order: 0
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('service_stats')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setStats(data || []);
    } catch (error) {
      console.error('Error fetching service stats:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch service stats',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (statData: Omit<ServiceStat, 'id'> | ServiceStat) => {
    try {
      if ('id' in statData) {
        // Update existing stat
        const { error } = await supabase
          .from('service_stats')
          .update({
            service_type: statData.service_type,
            stat_label: statData.stat_label,
            stat_value: statData.stat_value,
            stat_description: statData.stat_description,
            icon_name: statData.icon_name,
            is_active: statData.is_active,
            sort_order: statData.sort_order
          })
          .eq('id', statData.id);

        if (error) throw error;
        
        setStats(stats.map(s => s.id === statData.id ? statData : s));
        setEditingStat(null);
        
        toast({
          title: 'Success',
          description: 'Stat updated successfully'
        });
      } else {
        // Create new stat
        const { data, error } = await supabase
          .from('service_stats')
          .insert([{
            ...statData,
            sort_order: stats.length
          }])
          .select()
          .single();

        if (error) throw error;
        
        setStats([...stats, data]);
        setIsCreating(false);
        
        toast({
          title: 'Success',
          description: 'Stat created successfully'
        });
      }
    } catch (error) {
      console.error('Error saving service stat:', error);
      toast({
        title: 'Error',
        description: 'Failed to save service stat',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('service_stats')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setStats(stats.filter(s => s.id !== id));
      
      toast({
        title: 'Success',
        description: 'Stat deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting service stat:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete service stat',
        variant: 'destructive'
      });
    }
  };

  const StatEditor = ({ stat, onSave, onCancel }: {
    stat: Omit<ServiceStat, 'id'> | ServiceStat;
    onSave: (stat: Omit<ServiceStat, 'id'> | ServiceStat) => void;
    onCancel: () => void;
  }) => {
    const [editedStat, setEditedStat] = useState(stat);

    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{'id' in stat ? 'Edit Stat' : 'Create New Stat'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="service_type">Service Type</Label>
              <select
                id="service_type"
                value={editedStat.service_type}
                onChange={(e) => setEditedStat({ ...editedStat, service_type: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select service...</option>
                <option value="amazon-advertising">Amazon Advertising</option>
                <option value="walmart-advertising">Walmart Advertising</option>
                <option value="meta-advertising">Meta Advertising</option>
                <option value="google-advertising">Google Advertising</option>
                <option value="shopify-development">Shopify Development</option>
                <option value="website-development">Website Development</option>
              </select>
            </div>
            <div>
              <Label htmlFor="stat_label">Stat Label</Label>
              <Input
                id="stat_label"
                value={editedStat.stat_label}
                onChange={(e) => setEditedStat({ ...editedStat, stat_label: e.target.value })}
                placeholder="e.g., Revenue Increase"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stat_value">Stat Value</Label>
              <Input
                id="stat_value"
                value={editedStat.stat_value}
                onChange={(e) => setEditedStat({ ...editedStat, stat_value: e.target.value })}
                placeholder="e.g., 250%"
              />
            </div>
            <div>
              <Label htmlFor="icon_name">Icon Name</Label>
              <Input
                id="icon_name"
                value={editedStat.icon_name || ''}
                onChange={(e) => setEditedStat({ ...editedStat, icon_name: e.target.value })}
                placeholder="e.g., TrendingUp"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="stat_description">Description</Label>
            <Textarea
              id="stat_description"
              value={editedStat.stat_description || ''}
              onChange={(e) => setEditedStat({ ...editedStat, stat_description: e.target.value })}
              placeholder="Stat description..."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sort">Sort Order</Label>
              <Input
                id="sort"
                type="number"
                value={editedStat.sort_order}
                onChange={(e) => setEditedStat({ ...editedStat, sort_order: Number(e.target.value) })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={editedStat.is_active}
                onCheckedChange={(checked) => setEditedStat({ ...editedStat, is_active: checked })}
              />
              <Label>Active</Label>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button onClick={() => onSave(editedStat)}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return <div>Loading service stats...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">Service Stats Management</h3>
          <p className="text-gray-600">Manage service statistics</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Stat
        </Button>
      </div>

      {isCreating && (
        <StatEditor
          stat={emptyStat}
          onSave={handleSave}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {editingStat && (
        <StatEditor
          stat={editingStat}
          onSave={handleSave}
          onCancel={() => setEditingStat(null)}
        />
      )}

      <div className="grid gap-4">
        {stats.map((stat) => (
          <Card key={stat.id} className={!stat.is_active ? 'opacity-50' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {stat.stat_label}: {stat.stat_value}
                    {!stat.is_active && <Badge variant="secondary">Inactive</Badge>}
                    <Badge variant="outline">{stat.service_type}</Badge>
                  </CardTitle>
                  <CardDescription>{stat.stat_description}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingStat(stat)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(stat.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold">Icon: </span>
                  {stat.icon_name || 'N/A'}
                </div>
                <div>
                  <span className="font-semibold">Sort Order: </span>
                  {stat.sort_order}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceStatsManagement;
