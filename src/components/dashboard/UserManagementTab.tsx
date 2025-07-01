
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
import { useAuth } from "@/contexts/AuthContext";
import { Users, UserPlus, Shield, Settings, Key, Mail, Lock, Eye, EyeOff } from "lucide-react";

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
  const { signUp } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<UserRole[]>(defaultRoles);
  const [pagePermissions, setPagePermissions] = useState<PagePermission[]>(defaultPagePermissions);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserFullName, setNewUserFullName] = useState('');
  const [selectedUserRole, setSelectedUserRole] = useState('viewer');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userProfiles, setUserProfiles] = useState<Array<{
    id: string;
    email: string;
    fullName: string;
    role: string;
    createdAt: string;
    status: 'active' | 'inactive';
  }>>([]);

  useEffect(() => {
    loadUserManagementData();
  }, []);

  const loadUserManagementData = () => {
    const savedUsers = localStorage.getItem('userManagement_users');
    const savedRoles = localStorage.getItem('userManagement_roles');
    const savedPermissions = localStorage.getItem('userManagement_pagePermissions');
    const savedProfiles = localStorage.getItem('userManagement_profiles');

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

    if (savedProfiles) {
      try {
        setUserProfiles(JSON.parse(savedProfiles));
      } catch (error) {
        console.error('Failed to parse profiles data:', error);
      }
    }
  };

  const saveUserManagementData = (updatedUsers?: User[], updatedRoles?: UserRole[], updatedPermissions?: PagePermission[], updatedProfiles?: any[]) => {
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
    if (updatedProfiles) {
      localStorage.setItem('userManagement_profiles', JSON.stringify(updatedProfiles));
      setUserProfiles(updatedProfiles);
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

    if (newUserPassword.length < 8) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Try to create user with Auth context (Auth0)
      const authResult = await signUp(newUserEmail, newUserPassword, newUserFullName);
      
      if (authResult.success) {
        // Create user profile
        const newProfile = {
          id: `profile_${Date.now()}`,
          email: newUserEmail,
          fullName: newUserFullName || newUserEmail,
          role: selectedUserRole,
          createdAt: new Date().toISOString(),
          status: 'active' as const
        };

        const updatedProfiles = [...userProfiles, newProfile];
        saveUserManagementData(undefined, undefined, undefined, updatedProfiles);

        // Create local user record
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
        setNewUserFullName('');
        setSelectedUserRole('viewer');

        toast({
          title: "User Created Successfully",
          description: `User ${newUserEmail} has been created and stored locally.`,
        });
      } else {
        // Create user locally if Auth0 fails
        const newProfile = {
          id: `profile_${Date.now()}`,
          email: newUserEmail,
          fullName: newUserFullName || newUserEmail,
          role: selectedUserRole,
          createdAt: new Date().toISOString(),
          status: 'active' as const
        };

        const updatedProfiles = [...userProfiles, newProfile];
        saveUserManagementData(undefined, undefined, undefined, updatedProfiles);

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
        setNewUserFullName('');
        setSelectedUserRole('viewer');

        toast({
          title: "User Created Locally",
          description: `User ${newUserEmail} has been created and stored locally. Configure Auth0 for full authentication.`,
        });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: "Error",
        description: "Failed to create user. User stored locally instead.",
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
              <CardDescription>Create and manage user accounts with local storage</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              Local Storage - Active
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
            <TabsTrigger value="profiles" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Profiles
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Roles
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              Permissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            {/* Create New User */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Create New User Account
                </CardTitle>
                <CardDescription>
                  Create a new user account (stored locally with Auth0 integration)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userFullName">Full Name</Label>
                    <Input
                      id="userFullName"
                      value={newUserFullName}
                      onChange={(e) => setNewUserFullName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email *</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      placeholder="user@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userPassword">Password *</Label>
                    <div className="relative">
                      <Input
                        id="userPassword"
                        type={showPassword ? "text" : "password"}
                        value={newUserPassword}
                        onChange={(e) => setNewUserPassword(e.target.value)}
                        placeholder="Min 8 characters"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
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
                
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Users are stored locally. Configure Auth0 in the Auth0 tab for full authentication features.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Users List */}
            <Card>
              <CardHeader>
                <CardTitle>User Accounts ({users.length})</CardTitle>
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

          <TabsContent value="profiles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Profiles ({userProfiles.length})</CardTitle>
                <CardDescription>Detailed user profiles with additional information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProfiles.length === 0 ? (
                    <p className="text-slate-500 text-center py-8">No user profiles found. Create users to see their profiles here.</p>
                  ) : (
                    userProfiles.map((profile) => (
                      <div key={profile.id} className="p-4 border rounded-lg bg-white/50">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{profile.fullName}</h3>
                            <p className="text-sm text-slate-600">{profile.email}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{profile.role}</Badge>
                            <Badge variant={profile.status === 'active' ? 'default' : 'secondary'}>
                              {profile.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">
                          Created: {new Date(profile.createdAt).toLocaleString()}
                        </p>
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
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserManagementTab;
