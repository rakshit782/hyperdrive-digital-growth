
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

export const useTrackingScripts = () => {
  const location = useLocation();

  useEffect(() => {
    const injectScripts = () => {
      const currentPath = location.pathname;
      
      const savedScripts = localStorage.getItem('trackingScripts');
      if (!savedScripts) return;

      try {
        const scripts: TrackingScript[] = JSON.parse(savedScripts);
        
        // Remove existing tracking scripts
        const existingScripts = document.querySelectorAll('[data-tracking-script]');
        existingScripts.forEach(script => script.remove());

        scripts.forEach(scriptConfig => {
          if (!scriptConfig.isActive) return;

          const shouldRun = scriptConfig.pages === 'all' || 
            (scriptConfig.pages === 'selected' && scriptConfig.selectedPages.includes(currentPath));

          if (!shouldRun) return;

          const scriptElement = document.createElement('script');
          scriptElement.setAttribute('data-tracking-script', scriptConfig.id);
          scriptElement.innerHTML = scriptConfig.script;

          switch (scriptConfig.location) {
            case 'head':
              document.head.appendChild(scriptElement);
              break;
            case 'body':
              document.body.appendChild(scriptElement);
              break;
            case 'footer':
              let footer = document.querySelector('footer:last-of-type');
              if (!footer) {
                footer = document.createElement('footer');
                footer.style.display = 'none';
                document.body.appendChild(footer);
              }
              footer.appendChild(scriptElement);
              break;
          }

          console.log(`Tracking script "${scriptConfig.name}" injected into ${scriptConfig.location} for ${currentPath}`);
        });
      } catch (error) {
        console.error('Failed to inject tracking scripts:', error);
      }
    };

    // Inject scripts when route changes
    injectScripts();

    // Listen for script updates
    const handleScriptsUpdate = () => {
      injectScripts();
    };

    window.addEventListener('trackingScriptsUpdated', handleScriptsUpdate);

    return () => {
      window.removeEventListener('trackingScriptsUpdated', handleScriptsUpdate);
    };
  }, [location.pathname]);
};
