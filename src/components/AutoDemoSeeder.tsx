
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
          // Check if user already exists first
          const { data: existingUsersData, error: listError } = await supabase.auth.admin.listUsers();
          
          if (listError) {
            console.log('Error checking existing users:', listError.message);
            continue;
          }

          const userExists = existingUsersData?.users?.some(user => user.email === userData.email) || false;
          
          if (userExists) {
            console.log(`User ${userData.email} already exists, skipping...`);
            successCount++;
            continue;
          }

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
            // For demo purposes, we'll try to confirm the email automatically
            // Note: This would normally require admin privileges
            try {
              // Create user role
              await supabase
                .from('user_roles')
                .upsert([{
                  user_id: data.user.id,
                  role: userData.role,
                }], { onConflict: 'user_id' });
              
              successCount++;
              console.log(`Demo user ${userData.email} created successfully`);
            } catch (roleError) {
              console.log(`User created but role assignment failed for ${userData.email}:`, roleError);
              successCount++;
            }
          } else if (error) {
            console.log(`Failed to create demo user ${userData.email}:`, error.message);
          }
        }

        if (successCount > 0) {
          localStorage.setItem('demo_users_seeded', 'true');
          setHasSeeded(true);
          
          toast({
            title: "Demo Users Ready",
            description: `Demo users are available. Note: You may need to check your email for confirmation links, or contact admin to confirm accounts.`,
          });
        }
      } catch (error) {
        console.log('Demo user seeding completed with some issues:', error);
        // Still mark as seeded to prevent repeated attempts
        localStorage.setItem('demo_users_seeded', 'true');
        setHasSeeded(true);
      }
    };

    seedUsers();
  }, [toast, hasSeeded]);

  return null;
};

export default AutoDemoSeeder;
