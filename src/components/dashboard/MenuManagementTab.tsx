
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Menu, Save, Plus, X, Move } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface MenuItem {
  id: string;
  title: string;
  href: string;
  enabled: boolean;
  role?: 'admin' | 'user' | 'public';
  order: number;
}

interface MenuSettings {
  items: MenuItem[];
  servicesDropdownEnabled: boolean;
  mobileMenuEnabled: boolean;
}

const defaultMenuItems: MenuItem[] = [
  { id: '1', title: "Home", href: "/", enabled: true, role: 'public', order: 0 },
  { id: '2', title: "Pricing", href: "/pricing", enabled: true, role: 'public', order: 1 },
  { id: '3', title: "About", href: "/about", enabled: true, role: 'public', order: 2 },
  { id: '4', title: "Case Studies", href: "/case-studies", enabled: true, role: 'public', order: 3 },
  { id: '5', title: "Contact", href: "/contact", enabled: true, role: 'public', order: 4 },
  { id: '6', title: "Dashboard", href: "/dashboard", enabled: true, role: 'admin', order: 5 },
];

const MenuManagementTab = () => {
  const [menuSettings, setMenuSettings] = useState<MenuSettings>({
    items: defaultMenuItems,
    servicesDropdownEnabled: true,
    mobileMenuEnabled: true,
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState<Partial<MenuItem>>({
    title: '',
    href: '',
    enabled: true,
    role: 'public',
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('menuSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setMenuSettings(parsed);
      } catch (error) {
        console.error('Failed to parse menu settings:', error);
      }
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('menuSettings', JSON.stringify(menuSettings));
    
    // Dispatch event to update header
    const event = new CustomEvent('menuSettingsUpdated', { detail: menuSettings });
    window.dispatchEvent(event);
    
    setHasChanges(false);
    console.log('Menu settings saved:', menuSettings);
  };

  const updateSettings = (updates: Partial<MenuSettings>) => {
    setMenuSettings(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(menuSettings.items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order values
    const reorderedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    updateSettings({ items: reorderedItems });
  };

  const addMenuItem = () => {
    if (!newMenuItem.title || !newMenuItem.href) return;

    const newItem: MenuItem = {
      id: Date.now().toString(),
      title: newMenuItem.title,
      href: newMenuItem.href,
      enabled: newMenuItem.enabled || true,
      role: newMenuItem.role || 'public',
      order: menuSettings.items.length,
    };

    updateSettings({
      items: [...menuSettings.items, newItem]
    });

    setNewMenuItem({ title: '', href: '', enabled: true, role: 'public' });
    setIsAddDialogOpen(false);
  };

  const removeMenuItem = (id: string) => {
    const updatedItems = menuSettings.items
      .filter(item => item.id !== id)
      .map((item, index) => ({ ...item, order: index }));
    
    updateSettings({ items: updatedItems });
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    const updatedItems = menuSettings.items.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
    updateSettings({ items: updatedItems });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                <Menu className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Menu Management</CardTitle>
                <CardDescription>Customize navigation menu items, order, and permissions</CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {hasChanges && (
                <span className="text-sm text-orange-600 font-medium">Unsaved changes</span>
              )}
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Menu Item</DialogTitle>
                    <DialogDescription>Create a new navigation menu item</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={newMenuItem.title || ''}
                        onChange={(e) => setNewMenuItem(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Menu item title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL</Label>
                      <Input
                        value={newMenuItem.href || ''}
                        onChange={(e) => setNewMenuItem(prev => ({ ...prev, href: e.target.value }))}
                        placeholder="/page-url"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Access Level</Label>
                      <Select
                        value={newMenuItem.role || 'public'}
                        onValueChange={(value: 'admin' | 'user' | 'public') => 
                          setNewMenuItem(prev => ({ ...prev, role: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="user">Authenticated Users</SelectItem>
                          <SelectItem value="admin">Admin Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={newMenuItem.enabled || true}
                        onCheckedChange={(checked) => setNewMenuItem(prev => ({ ...prev, enabled: checked }))}
                      />
                      <Label>Enabled</Label>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={addMenuItem}>Add Item</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={saveSettings} className="bg-gradient-to-r from-blue-500 to-purple-600">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Menu Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">General Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label>Services Dropdown</Label>
                <Switch
                  checked={menuSettings.servicesDropdownEnabled}
                  onCheckedChange={(checked) => updateSettings({ servicesDropdownEnabled: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Mobile Menu</Label>
                <Switch
                  checked={menuSettings.mobileMenuEnabled}
                  onCheckedChange={(checked) => updateSettings({ mobileMenuEnabled: checked })}
                />
              </div>
            </div>
          </div>

          {/* Draggable Menu Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Menu Items</h3>
              <p className="text-sm text-gray-500">Drag to reorder • Toggle to enable/disable</p>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="menu-items">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {menuSettings.items
                      .sort((a, b) => a.order - b.order)
                      .map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`bg-white/60 border border-gray-200/60 ${
                                snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''
                              }`}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center space-x-4">
                                  <div
                                    {...provided.dragHandleProps}
                                    className="cursor-grab active:cursor-grabbing"
                                  >
                                    <Move className="w-5 h-5 text-gray-400" />
                                  </div>
                                  
                                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                                    <div className="space-y-1">
                                      <Label className="text-xs text-gray-600">Title</Label>
                                      <Input
                                        value={item.title}
                                        onChange={(e) => updateMenuItem(item.id, { title: e.target.value })}
                                        className="h-8"
                                      />
                                    </div>
                                    
                                    <div className="space-y-1">
                                      <Label className="text-xs text-gray-600">URL</Label>
                                      <Input
                                        value={item.href}
                                        onChange={(e) => updateMenuItem(item.id, { href: e.target.value })}
                                        className="h-8"
                                      />
                                    </div>
                                    
                                    <div className="space-y-1">
                                      <Label className="text-xs text-gray-600">Access</Label>
                                      <Select
                                        value={item.role}
                                        onValueChange={(value: 'admin' | 'user' | 'public') => 
                                          updateMenuItem(item.id, { role: value })
                                        }
                                      >
                                        <SelectTrigger className="h-8">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="public">Public</SelectItem>
                                          <SelectItem value="user">Users</SelectItem>
                                          <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-2">
                                        <Switch
                                          checked={item.enabled}
                                          onCheckedChange={(checked) => updateMenuItem(item.id, { enabled: checked })}
                                        />
                                        <Label className="text-xs">Enabled</Label>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeMenuItem(item.id)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          {/* Role-based Access Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Access Level Guidelines:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>Public:</strong> Visible to all visitors</li>
              <li><strong>Users:</strong> Only visible to authenticated users</li>
              <li><strong>Admin:</strong> Only visible to admin users</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuManagementTab;
