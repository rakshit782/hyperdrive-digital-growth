
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
      
      console.log('TrackingScriptInjector: Starting injection for path:', currentPath);
      
      // Load scripts from localStorage
      const savedScripts = localStorage.getItem('trackingScripts');
      console.log('TrackingScriptInjector: Raw localStorage data:', savedScripts);
      
      if (!savedScripts) {
        console.log('TrackingScriptInjector: No scripts found in localStorage');
        return;
      }

      try {
        const scripts: TrackingScript[] = JSON.parse(savedScripts);
        console.log('TrackingScriptInjector: Parsed scripts:', scripts);
        
        // Remove any existing tracking scripts to avoid duplicates
        const existingScripts = document.querySelectorAll('[data-tracking-script]');
        console.log('TrackingScriptInjector: Removing existing scripts:', existingScripts.length);
        existingScripts.forEach(script => script.remove());

        scripts.forEach(scriptConfig => {
          console.log('TrackingScriptInjector: Processing script:', scriptConfig.name, 'Active:', scriptConfig.isActive);
          
          // Only inject active scripts
          if (!scriptConfig.isActive) {
            console.log('TrackingScriptInjector: Skipping inactive script:', scriptConfig.name);
            return;
          }

          // Check if script should run on current page
          const shouldRun = scriptConfig.pages === 'all' || 
            (scriptConfig.pages === 'selected' && scriptConfig.selectedPages.includes(currentPath));

          console.log('TrackingScriptInjector: Should run script?', shouldRun, 'Pages setting:', scriptConfig.pages, 'Selected pages:', scriptConfig.selectedPages);

          if (!shouldRun) {
            console.log('TrackingScriptInjector: Skipping script for this page:', scriptConfig.name);
            return;
          }

          // Determine if it's an external script URL or inline script
          const isExternalScript = scriptConfig.script.trim().match(/^https?:\/\//);
          
          console.log('TrackingScriptInjector: Script type:', isExternalScript ? 'external' : 'inline');

          // Create script element using innerHTML method for better source visibility
          const scriptElement = document.createElement('script');
          scriptElement.setAttribute('data-tracking-script', scriptConfig.id);
          scriptElement.setAttribute('data-script-name', scriptConfig.name);
          scriptElement.type = 'text/javascript';
          
          if (isExternalScript) {
            // External script - set src attribute
            scriptElement.src = scriptConfig.script.trim();
            scriptElement.async = false; // Make synchronous for better source visibility
            scriptElement.defer = false;
            console.log('TrackingScriptInjector: Created external script element:', scriptConfig.name, 'URL:', scriptConfig.script.trim());
          } else {
            // Inline script - use text content
            scriptElement.text = scriptConfig.script;
            console.log('TrackingScriptInjector: Created inline script element:', scriptConfig.name);
          }

          // Get target element for injection
          let targetElement: HTMLElement;
          
          switch (scriptConfig.location) {
            case 'head':
              targetElement = document.head;
              break;
            case 'body':
              // Insert at the beginning of body for better source visibility
              targetElement = document.body;
              break;
            case 'footer':
              // Append to the end of body
              targetElement = document.body;
              break;
            default:
              targetElement = document.head;
          }

          // Inject the script using insertAdjacentHTML for better DOM integration
          try {
            if (scriptConfig.location === 'head') {
              // For head scripts, append directly
              targetElement.appendChild(scriptElement);
            } else if (scriptConfig.location === 'footer') {
              // For footer scripts, append to end of body
              targetElement.appendChild(scriptElement);
            } else {
              // For body scripts, insert at beginning
              if (targetElement.firstChild) {
                targetElement.insertBefore(scriptElement, targetElement.firstChild);
              } else {
                targetElement.appendChild(scriptElement);
              }
            }

            console.log(`TrackingScriptInjector: Successfully injected script: ${scriptConfig.name} into ${scriptConfig.location}`);

            // Add event listeners for external scripts
            if (isExternalScript) {
              scriptElement.onload = () => {
                console.log('TrackingScriptInjector: External script loaded successfully:', scriptConfig.name);
              };
              scriptElement.onerror = (error) => {
                console.error('TrackingScriptInjector: External script failed to load:', scriptConfig.name, error);
              };
            } else {
              // For inline scripts, they execute immediately when added to DOM
              console.log('TrackingScriptInjector: Inline script executed:', scriptConfig.name);
            }

          } catch (injectionError) {
            console.error('TrackingScriptInjector: Failed to inject script:', scriptConfig.name, injectionError);
          }
        });
        
        console.log('TrackingScriptInjector: Injection complete for', scripts.length, 'scripts');

        // Force a small DOM refresh to ensure scripts are visible in source
        setTimeout(() => {
          console.log('TrackingScriptInjector: Current scripts in DOM:', document.querySelectorAll('[data-tracking-script]').length);
        }, 100);

      } catch (error) {
        console.error('TrackingScriptInjector: Failed to load and inject tracking scripts:', error);
      }
    };

    // Wait for DOM to be fully ready
    const executeInjection = () => {
      if (document.readyState === 'complete') {
        injectScripts();
      } else {
        window.addEventListener('load', injectScripts, { once: true });
      }
    };

    // Execute immediately if DOM is ready, otherwise wait
    executeInjection();

    // Listen for script updates from dashboard
    const handleScriptsUpdate = (event: any) => {
      console.log('TrackingScriptInjector: Received scripts update event', event.detail);
      setTimeout(injectScripts, 100);
    };

    window.addEventListener('trackingScriptsUpdated', handleScriptsUpdate);

    return () => {
      window.removeEventListener('trackingScriptsUpdated', handleScriptsUpdate);
      window.removeEventListener('load', injectScripts);
    };
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default TrackingScriptInjector;
