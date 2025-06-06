
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();

  useEffect(() => {
    const injectScripts = () => {
      const currentPath = location.pathname;
      
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
              let footer = document.querySelector('footer') as HTMLElement;
              if (!footer) {
                footer = document.createElement('footer') as HTMLElement;
                footer.style.display = 'none'; // Hidden footer for scripts only
                document.body.appendChild(footer);
              }
              footer.appendChild(scriptElement);
              break;
          }

          console.log(`Injected tracking script: ${scriptConfig.name} into ${scriptConfig.location} for ${currentPath}`);
        });
      } catch (error) {
        console.error('Failed to load and inject tracking scripts:', error);
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(injectScripts, 50);

    // Listen for script updates
    const handleScriptsUpdate = () => {
      setTimeout(injectScripts, 50);
    };

    window.addEventListener('trackingScriptsUpdated', handleScriptsUpdate);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('trackingScriptsUpdated', handleScriptsUpdate);
    };
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default TrackingScriptInjector;
