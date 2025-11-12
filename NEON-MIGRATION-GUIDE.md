# Neon DB Migration Guide

## ✅ What Has Been Completed

### 1. Authentication System
- ✅ Custom JWT-based authentication (no more Supabase Auth dependency)
- ✅ Bcrypt password hashing for security
- ✅ 4 edge functions created:
  - `neon-auth-signup`: User registration
  - `neon-auth-login`: User login with JWT tokens
  - `neon-auth-verify`: Token verification
  - `neon-auth-refresh`: Refresh expired tokens

### 2. Frontend Auth Infrastructure
- ✅ `AuthContext` and `useAuth` hook for state management
- ✅ `authService` for authentication operations
- ✅ Updated `DashboardAuth` page to use new auth
- ✅ Updated `Dashboard` page with role-based access control
- ✅ App wrapped with `AuthProvider`

### 3. Pricing Plans Management
- ✅ Created `neon-pricing-plans` edge function with full CRUD operations
- ✅ Updated `usePricingPlans` hook to use Neon DB
- ✅ Admin-only access control for managing plans

### 4. Database Schema
- ✅ Created `neon-db-schema.sql` with complete table definitions

## 🚀 Next Steps - What You Need To Do

### Step 1: Run the Database Schema
1. Open your **Neon DB Dashboard**
2. Go to the SQL Editor
3. Copy the contents of `neon-db-schema.sql`
4. Execute the SQL to create all tables

### Step 2: Create Your Admin User
Since you want to use `rakshit@amzadscout.com` with password `Rakshit@@1234`, you have two options:

**Option A: Use the Signup Endpoint (Recommended)**
```bash
# Make a POST request to create the admin user
curl -X POST https://hznbshxhmhtenxcuffhx.supabase.co/functions/v1/neon-auth-signup \
  -H "Content-Type: application/json" \
  -H "apikey: YOUR_SUPABASE_ANON_KEY" \
  -d '{
    "email": "rakshit@amzadscout.com",
    "password": "Rakshit@@1234",
    "full_name": "Rakshit"
  }'
```

Then run this SQL in Neon to grant admin role:
```sql
UPDATE user_roles 
SET role = 'admin' 
WHERE user_id = (SELECT id FROM users WHERE email = 'rakshit@amzadscout.com');
```

**Option B: Direct SQL Insert**
```sql
-- First, generate a bcrypt hash for your password
-- You can use online tools like: https://bcrypt-generator.com/
-- Password: Rakshit@@1234

INSERT INTO users (email, password_hash, full_name)
VALUES ('rakshit@amzadscout.com', '$2a$10$YOUR_BCRYPT_HASH_HERE', 'Rakshit');

-- Then create admin role
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'
FROM users 
WHERE email = 'rakshit@amzadscout.com';
```

### Step 3: Test the Authentication
1. Go to `/dashboard/login`
2. Enter your credentials:
   - Email: `rakshit@amzadscout.com`
   - Password: `Rakshit@@1234`
3. You should be logged in and able to manage pricing plans!

### Step 4: Migrate Existing Data (If Any)
If you have existing data in Supabase tables that you want to keep:

1. **Export from Supabase:**
   - Go to each table in Supabase
   - Export data as CSV or JSON

2. **Import to Neon:**
   - Use the Neon SQL editor to insert the data
   - Or use a tool like `psql` to bulk import

## 📋 What Changed

### Removed Dependencies
- ❌ `@supabase/supabase-js` auth methods
- ❌ Supabase RLS policies (now handled in edge functions)
- ❌ `supabase.auth.*` calls

### New Dependencies
- ✅ JWT tokens (djwt library in edge functions)
- ✅ Bcrypt password hashing
- ✅ Custom AuthContext for session management
- ✅ Local storage for token persistence

### Files Modified
1. `src/App.tsx` - Added AuthProvider
2. `src/pages/DashboardAuth.tsx` - Uses custom auth
3. `src/pages/Dashboard.tsx` - Uses custom auth
4. `src/hooks/usePricingPlans.ts` - Uses Neon DB edge function

### Files Created
1. `supabase/functions/neon-auth-signup/index.ts`
2. `supabase/functions/neon-auth-login/index.ts`
3. `supabase/functions/neon-auth-verify/index.ts`
4. `supabase/functions/neon-auth-refresh/index.ts`
5. `supabase/functions/neon-pricing-plans/index.ts`
6. `src/services/authService.ts`
7. `src/contexts/AuthContext.tsx`
8. `neon-db-schema.sql`

## 🔒 Security Features

✅ **Bcrypt Password Hashing** - Industry-standard password security
✅ **JWT Tokens** - Secure, stateless authentication
✅ **Access Token Expiry** - 1 hour (auto-refresh via refresh tokens)
✅ **Refresh Tokens** - 30 days expiry
✅ **Role-Based Access Control** - Admin verification in edge functions
✅ **Token Verification** - All protected routes verify JWT tokens

## 🎯 Benefits

1. **No Supabase Inactivity Issues** - Your app won't pause due to lack of API calls
2. **Full Control** - Complete control over authentication logic
3. **Cost Effective** - Only pay for Neon DB usage
4. **Scalable** - JWT-based auth scales easily
5. **Secure** - Industry-standard security practices

## 📝 Important Notes

- **Edge Functions Auto-Deploy** - All edge functions will deploy automatically
- **JWT Secret** - Already configured in your secrets
- **CORS Enabled** - All edge functions have proper CORS headers
- **Public Endpoints** - Auth endpoints don't require JWT (verify_jwt = false)

## ⚠️ Troubleshooting

**Problem: Can't log in**
- Check that you ran the SQL schema in Neon DB
- Verify the admin user was created with correct password hash
- Check browser console for error messages

**Problem: "Unauthorized" errors**
- Make sure you're logged in
- Token might be expired - try logging in again
- Check that user has 'admin' role in user_roles table

**Problem: Pricing plans not saving**
- Verify JWT_SECRET is set in edge function secrets
- Check that you're logged in as admin
- Look at edge function logs for errors

## 🎉 You're Done!

Once you complete the steps above, your application will be fully migrated to Neon DB with custom authentication. You can now:
- Log in at `/dashboard/login`
- Manage pricing plans
- Add more users as needed
- No more Supabase inactivity concerns!
