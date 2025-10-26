
import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode, useEffect, useState } from 'react';
import { auth0ConfigManager } from '@/utils/auth0Config';

interface Auth0ProviderWrapperProps {
  children: ReactNode;
}

const Auth0ProviderWrapper = ({ children }: Auth0ProviderWrapperProps) => {
  const [auth0Config, setAuth0Config] = useState<ReturnType<typeof auth0ConfigManager.getConfig>>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initConfig = async () => {
      await auth0ConfigManager.initialize();
      const config = auth0ConfigManager.getConfig();
      setAuth0Config(config);
      setLoading(false);
    };
    initConfig();
  }, []);

  // Show loading while initializing
  if (loading) {
    return <>{children}</>;
  }

  // If Auth0 is not configured or not active, render children without Auth0
  if (!auth0Config || !auth0Config.isActive || !auth0Config.domain || !auth0Config.clientId) {
    return <>{children}</>;
  }

  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={{
        redirect_uri: auth0Config.redirectUri,
        audience: auth0Config.audience,
        scope: auth0Config.scope
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWrapper;
