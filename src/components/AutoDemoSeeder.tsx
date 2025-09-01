
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AutoDemoSeeder = () => {
  const [hasSeeded, setHasSeeded] = useState(false);
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

  useEffect(() => {
    const seedUsers = async () => {
      // Check if we've already seeded users
      const seeded = localStorage.getItem('demo_users_seeded');
      if (seeded || hasSeeded) return;

      console.log('Auto-seeding demo users...');
      
      try {
        let successCount = 0;
        
        for (const userData of demoUsers) {
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

          if (!error && data.user) {
            // Create user role if not default user role
            if (userData.role !== 'user') {
              await supabase
                .from('user_roles')
                .insert([{
                  user_id: data.user.id,
                  role: userData.role,
                }]);
            }
            successCount++;
          }
        }

        if (successCount > 0) {
          localStorage.setItem('demo_users_seeded', 'true');
          setHasSeeded(true);
          
          toast({
            title: "Demo Users Created",
            description: `${successCount} demo users created successfully. You can now login with admin@demo.com / Demo123456!`,
          });
        }
      } catch (error) {
        console.log('Demo users may already exist or there was an error:', error);
      }
    };

    seedUsers();
  }, [toast, hasSeeded]);

  return null;
};

export default AutoDemoSeeder;
