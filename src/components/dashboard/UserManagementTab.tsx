
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { cognitoManager } from "@/utils/cognitoManager";
import { Users, UserPlus, Shield, Settings, Key, Mail, Lock } from "lucide-react";

interface UserRole {
  id: string;
  name: string;
  permissions: string[];
  description: string;
}

interface User {
  id: string;
  email: string;
  roles: string[];
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: string;
  createdAt: string;
}

interface PagePermission {
  page: string;
  enabled: boolean;
  roles: string[];
}

const defaultRoles: UserRole[] = [
  {
    id: 'admin',
    name: 'Administrator',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_settings'],
    description: 'Full access to all features'
  },
  {
    id: 'editor',
    name: 'Editor',
    permissions: ['read', 'write'],
    description: 'Can view and edit content'
  },
  {
    id: 'viewer',
    name: 'Viewer',
    permissions: ['read'],
    description: 'Read-only access'
  }
];

const defaultPagePermissions: PagePermission[] = [
  { page: 'Dashboard', enabled: true, roles: ['admin', 'editor'] },
  { page: 'Services', enabled: true, roles: ['admin'] },
  { page: 'Reviews', enabled: true, roles: ['admin', 'editor'] },
  { page: 'Website Settings', enabled: true, roles: ['admin'] },
  { page: 'Analytics', enabled: true, roles: ['admin', 'editor'] },
  { page: 'User Management', enabled: true, roles: ['admin'] }
];

const UserManagementTab = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<UserRole[]>(defaultRoles);
  const [pagePermissions, setPagePermissions] = useState<PagePermission[]>(defaultPagePermissions);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [selectedUserRole, setSelectedUserRole] = useState('viewer');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUserManagementData();
  }, []);

  const loadUserManagementData = () => {
    const savedUsers = localStorage.getItem('userManagement_users');
    const savedRoles = localStorage.getItem('userManagement_roles');
    const savedPermissions = localStorage.getItem('userManagement_pagePermissions');

    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (error) {
        console.error('Failed to parse users data:', error);
      }
    }

    if (savedRoles) {
      try {
        setRoles(JSON.parse(savedRoles));
      } catch (error) {
        console.error('Failed to parse roles data:', error);
      }
    }

    if (savedPermissions) {
      try {
        setPagePermissions(JSON.parse(savedPermissions));
      } catch (error) {
        console.error('Failed to parse permissions data:', error);
      }
    }
  };

  const saveUserManagementData = (updatedUsers?: User[], updatedRoles?: UserRole[], updatedPermissions?: PagePermission[]) => {
    if (updatedUsers) {
      localStorage.setItem('userManagement_users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    }
    if (updatedRoles) {
      localStorage.setItem('userManagement_roles', JSON.stringify(updatedRoles));
      setRoles(updatedRoles);
    }
    if (updatedPermissions) {
      localStorage.setItem('userManagement_pagePermissions', JSON.stringify(updatedPermissions));
      setPagePermissions(updatedPermissions);
    }
  };

  const createUser = async () => {
    if (!newUserEmail || !newUserPassword) {
      toast({
        title: "Validation Error",
        description: "Email and password are required.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Try to create user with Cognito if configured
      if (cognitoManager.isActive()) {
        await cognitoManager.signUp(newUserEmail, newUserPassword, {
          email: newUserEmail
        });
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        email: newUserEmail,
        roles: [selectedUserRole],
        status: 'active',
        createdAt: new Date().toISOString()
      };

      const updatedUsers = [...users, newUser];
      saveUserManagementData(updatedUsers);

      setNewUserEmail('');
      setNewUserPassword('');
      setSelectedUserRole('viewer');

      toast({
        title: "User Created",
        description: `User ${newUserEmail} has been created successfully.`,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: "Error",
        description: "Failed to create user. Check your AWS Cognito configuration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = (userId: string, newRole: string) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, roles: [newRole] } : user
    );
    saveUserManagementData(updatedUsers);
    toast({
      title: "Role Updated",
      description: "User role has been updated successfully.",
    });
  };

  const toggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(user =>
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' }
        : user
    );
    saveUserManagementData(updatedUsers);
    toast({
      title: "Status Updated",
      description: "User status has been updated successfully.",
    });
  };

  const updatePagePermission = (pageIndex: number, field: 'enabled' | 'roles', value: any) => {
    const updatedPermissions = [...pagePermissions];
    if (field === 'enabled') {
      updatedPermissions[pageIndex].enabled = value;
    } else if (field === 'roles') {
      updatedPermissions[pageIndex].roles = value;
    }
    saveUserManagementData(undefined, undefined, updatedPermissions);
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mr-3">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-900">User Management</CardTitle>
              <CardDescription>Manage users, roles, and permissions with AWS Cognito integration</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={cognitoManager.isActive() ? "default" : "secondary"}>
              {cognitoManager.isActive() ? "AWS Cognito Connected" : "Local Mode"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Roles
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              Permissions
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            {/* Create New User */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Create New User
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      placeholder="user@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userPassword">Password</Label>
                    <Input
                      id="userPassword"
                      type="password"
                      value={newUserPassword}
                      onChange={(e) => setNewUserPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userRole">Role</Label>
                    <Select value={selectedUserRole} onValueChange={setSelectedUserRole}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={createUser} disabled={isLoading} className="w-full">
                      {isLoading ? "Creating..." : "Create User"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users List */}
            <Card>
              <CardHeader>
                <CardTitle>Existing Users ({users.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.length === 0 ? (
                    <p className="text-slate-500 text-center py-8">No users found. Create your first user above.</p>
                  ) : (
                    users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg bg-white/50">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <Mail className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{user.email}</p>
                            <p className="text-sm text-slate-500">
                              Created: {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                          <Select
                            value={user.roles[0]}
                            onValueChange={(value) => updateUserRole(user.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {roles.map((role) => (
                                <SelectItem key={role.id} value={role.id}>
                                  {role.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Switch
                            checked={user.status === 'active'}
                            onCheckedChange={() => toggleUserStatus(user.id)}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Roles</CardTitle>
                <CardDescription>Manage user roles and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roles.map((role) => (
                    <div key={role.id} className="p-4 border rounded-lg bg-white/50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{role.name}</h3>
                        <Badge variant="outline">{role.permissions.length} permissions</Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{role.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Permissions</CardTitle>
                <CardDescription>Control which roles can access different pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pagePermissions.map((permission, index) => (
                    <div key={permission.page} className="p-4 border rounded-lg bg-white/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Switch
                            checked={permission.enabled}
                            onCheckedChange={(checked) => updatePagePermission(index, 'enabled', checked)}
                          />
                          <span className="font-medium">{permission.page}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {roles.map((role) => (
                          <Badge
                            key={role.id}
                            variant={permission.roles.includes(role.id) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              const newRoles = permission.roles.includes(role.id)
                                ? permission.roles.filter(r => r !== role.id)
                                : [...permission.roles, role.id];
                              updatePagePermission(index, 'roles', newRoles);
                            }}
                          >
                            {role.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  AWS Cognito Integration
                </CardTitle>
                <CardDescription>Configure AWS Cognito for user authentication</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Status: {cognitoManager.isActive() ? "Connected to AWS Cognito" : "Not connected - using local user management"}
                    </p>
                    {!cognitoManager.isActive() && (
                      <p className="text-xs text-blue-600 mt-2">
                        Configure AWS Cognito in the "Amazon Cognito" tab to enable full authentication features.
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Features Status:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm">User Creation</span>
                        <Badge variant={cognitoManager.isActive() ? "default" : "secondary"}>
                          {cognitoManager.isActive() ? "Active" : "Local Only"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm">Password Management</span>
                        <Badge variant={cognitoManager.isActive() ? "default" : "secondary"}>
                          {cognitoManager.isActive() ? "Active" : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm">Role-based Access</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm">Session Management</span>
                        <Badge variant={cognitoManager.isActive() ? "default" : "secondary"}>
                          {cognitoManager.isActive() ? "Active" : "Local Storage"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserManagementTab;
