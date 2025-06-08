
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

          // Create script element
          const scriptElement = document.createElement('script');
          scriptElement.setAttribute('data-tracking-script', scriptConfig.id);
          scriptElement.setAttribute('data-script-name', scriptConfig.name);
          
          // Handle both inline scripts and external scripts
          if (scriptConfig.script.trim().startsWith('http')) {
            scriptElement.src = scriptConfig.script.trim();
            scriptElement.async = true;
          } else {
            // For inline scripts, we need to handle them properly
            try {
              scriptElement.text = scriptConfig.script;
            } catch (e) {
              // Fallback for older browsers
              scriptElement.innerHTML = scriptConfig.script;
            }
          }

          // Inject into appropriate location
          try {
            switch (scriptConfig.location) {
              case 'head':
                document.head.appendChild(scriptElement);
                console.log('TrackingScriptInjector: Injected into HEAD:', scriptConfig.name);
                break;
              case 'body':
                document.body.appendChild(scriptElement);
                console.log('TrackingScriptInjector: Injected into BODY:', scriptConfig.name);
                break;
              case 'footer':
                // Create footer if it doesn't exist
                let footer = document.querySelector('footer[data-tracking-footer="true"]') as HTMLElement;
                if (!footer) {
                  footer = document.createElement('footer') as HTMLElement;
                  footer.style.display = 'none'; // Hidden footer for scripts only
                  footer.setAttribute('data-tracking-footer', 'true');
                  document.body.appendChild(footer);
                  console.log('TrackingScriptInjector: Created hidden footer for scripts');
                }
                footer.appendChild(scriptElement);
                console.log('TrackingScriptInjector: Injected into FOOTER:', scriptConfig.name);
                break;
            }

            // Execute script if it's inline and not already executed
            if (!scriptConfig.script.trim().startsWith('http') && scriptElement.text) {
              try {
                // Create a new script element to force execution
                const execScript = document.createElement('script');
                execScript.text = scriptElement.text;
                execScript.setAttribute('data-tracking-script-exec', scriptConfig.id);
                document.head.appendChild(execScript);
                console.log('TrackingScriptInjector: Executed inline script:', scriptConfig.name);
              } catch (execError) {
                console.error('TrackingScriptInjector: Failed to execute script:', scriptConfig.name, execError);
              }
            }

            console.log(`TrackingScriptInjector: Successfully processed script: ${scriptConfig.name} into ${scriptConfig.location} for ${currentPath}`);
          } catch (injectionError) {
            console.error('TrackingScriptInjector: Failed to inject script:', scriptConfig.name, injectionError);
          }
        });
        
        console.log('TrackingScriptInjector: Injection complete');
      } catch (error) {
        console.error('TrackingScriptInjector: Failed to load and inject tracking scripts:', error);
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      console.log('TrackingScriptInjector: DOM ready, starting injection');
      injectScripts();
    }, 100);

    // Listen for script updates
    const handleScriptsUpdate = (event: any) => {
      console.log('TrackingScriptInjector: Received scripts update event', event.detail);
      setTimeout(injectScripts, 100);
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
