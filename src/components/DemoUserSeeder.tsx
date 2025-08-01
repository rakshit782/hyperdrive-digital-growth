
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const DemoUserSeeder = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const demoUsers = [
    {
      email: 'admin@demo.com',
      password: 'Demo123456!',
      role: 'admin',
      fullName: 'Demo Admin'
    },
    {
      email: 'editor@demo.com',
      password: 'Demo123456!',
      role: 'editor',
      fullName: 'Demo Editor'
    },
    {
      email: 'user@demo.com',
      password: 'Demo123456!',
      role: 'user',
      fullName: 'Demo User'
    }
  ];

  const createDemoUser = async (userData: typeof demoUsers[0]) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: userData.fullName,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data.user && userData.role !== 'user') {
        // Update user role if not default user role
        await supabase
          .from('user_roles')
          .update({ role: userData.role })
          .eq('user_id', data.user.id);
      }

      return { success: true, user: data.user };
    } catch (error: any) {
      console.error('Error creating demo user:', error);
      return { success: false, error: error.message };
    }
  };

  const createAllDemoUsers = async () => {
    setIsCreating(true);
    let successCount = 0;
    let errorCount = 0;

    for (const userData of demoUsers) {
      const result = await createDemoUser(userData);
      if (result.success) {
        successCount++;
      } else {
        errorCount++;
        console.error(`Failed to create ${userData.email}:`, result.error);
      }
    }

    setIsCreating(false);

    if (successCount > 0) {
      toast({
        title: "Demo Users Created",
        description: `Successfully created ${successCount} demo users. Check your email to verify accounts.`,
      });
    }

    if (errorCount > 0) {
      toast({
        title: "Some Users Failed",
        description: `${errorCount} users failed to create. They might already exist.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Demo User Seeder</CardTitle>
        <CardDescription>
          Create demo users for testing. This will create users with different roles.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold">Demo Users that will be created:</h3>
          <div className="space-y-1 text-sm">
            {demoUsers.map((user) => (
              <div key={user.email} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <span className="font-medium">{user.email}</span>
                  <span className="text-gray-500 ml-2">({user.role})</span>
                </div>
                <span className="text-xs text-gray-400">{user.password}</span>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={createAllDemoUsers} 
          disabled={isCreating}
          className="w-full"
        >
          {isCreating ? 'Creating Demo Users...' : 'Create Demo Users'}
        </Button>
        
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Users will need to verify their email addresses before they can log in</p>
          <p>• If users already exist, creation will be skipped</p>
          <p>• Admin user can access the dashboard with full permissions</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoUserSeeder;
