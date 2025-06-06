
import { useEffect } from 'react';

interface TrackingScript {
  id: string;
  name: string;
  script: string;
  location: 'head' | 'body' | 'footer';
  pages: 'all' | 'selected';
  selectedPages: string[];
  isActive: boolean;
}

const TrackingScriptInjector = () => {
  useEffect(() => {
    const loadAndInjectScripts = () => {
      // Get current page path
      const currentPath = window.location.pathname;
      
      // Load scripts from localStorage
      const savedScripts = localStorage.getItem('trackingScripts');
      if (!savedScripts) return;

      try {
        const scripts: TrackingScript[] = JSON.parse(savedScripts);
        
        // Remove any existing tracking scripts to avoid duplicates
        const existingScripts = document.querySelectorAll('[data-tracking-script]');
        existingScripts.forEach(script => script.remove());

        scripts.forEach(scriptConfig => {
          // Only inject active scripts
          if (!scriptConfig.isActive) return;

          // Check if script should run on current page
          const shouldRun = scriptConfig.pages === 'all' || 
            (scriptConfig.pages === 'selected' && scriptConfig.selectedPages.includes(currentPath));

          if (!shouldRun) return;

          // Create script element
          const scriptElement = document.createElement('script');
          scriptElement.setAttribute('data-tracking-script', scriptConfig.id);
          scriptElement.innerHTML = scriptConfig.script;

          // Inject into appropriate location
          switch (scriptConfig.location) {
            case 'head':
              document.head.appendChild(scriptElement);
              break;
            case 'body':
              document.body.appendChild(scriptElement);
              break;
            case 'footer':
              // Create footer if it doesn't exist
              let footer = document.querySelector('footer');
              if (!footer) {
                footer = document.createElement('footer');
                footer.style.display = 'none'; // Hidden footer for scripts only
                document.body.appendChild(footer);
              }
              footer.appendChild(scriptElement);
              break;
          }

          console.log(`Injected tracking script: ${scriptConfig.name} into ${scriptConfig.location}`);
        });
      } catch (error) {
        console.error('Failed to load and inject tracking scripts:', error);
      }
    };

    // Initial load
    loadAndInjectScripts();

    // Listen for script updates
    const handleScriptsUpdate = () => {
      loadAndInjectScripts();
    };

    window.addEventListener('trackingScriptsUpdated', handleScriptsUpdate);

    // Listen for route changes (for SPA navigation)
    const handleRouteChange = () => {
      // Small delay to ensure route has changed
      setTimeout(loadAndInjectScripts, 100);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('trackingScriptsUpdated', handleScriptsUpdate);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default TrackingScriptInjector;
