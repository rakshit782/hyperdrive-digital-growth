
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { User as SupabaseUser } from '@supabase/supabase-js';

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
        let existingCount = 0;
        
        for (const userData of demoUsers) {
          // Check if user already exists by trying to sign in
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: userData.email,
            password: userData.password,
          });

          if (signInData.user) {
            // User exists and can sign in
            console.log(`Demo user ${userData.email} already exists and is confirmed`);
            existingCount++;
            
            // Sign out immediately after checking
            await supabase.auth.signOut();
            continue;
          }

          // If sign in failed due to email not confirmed, the user exists but needs confirmation
          if (signInError && signInError.message.includes('Email not confirmed')) {
            console.log(`Demo user ${userData.email} exists but email not confirmed`);
            existingCount++;
            continue;
          }

          // User doesn't exist, create new one
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
            if (error.message.includes('User already registered')) {
              console.log(`Demo user ${userData.email} already exists`);
              existingCount++;
            } else {
              console.log(`Failed to create demo user ${userData.email}:`, error.message);
            }
          }
        }

        localStorage.setItem('demo_users_seeded', 'true');
        setHasSeeded(true);
        
        if (successCount > 0 || existingCount > 0) {
          toast({
            title: "Demo Users Ready",
            description: `Demo accounts are available. Note: Email confirmation may be required for new accounts. Check your Supabase settings to disable email confirmation for faster testing.`,
          });
        }
      } catch (error) {
        console.log('Demo user seeding completed with some issues:', error);
        localStorage.setItem('demo_users_seeded', 'true');
        setHasSeeded(true);
      }
    };

    seedUsers();
  }, [toast, hasSeeded]);

  return null;
};

export default AutoDemoSeeder;
