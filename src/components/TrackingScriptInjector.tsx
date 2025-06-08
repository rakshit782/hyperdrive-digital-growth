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

          // Create script element
          const scriptElement = document.createElement('script');
          scriptElement.setAttribute('data-tracking-script', scriptConfig.id);
          scriptElement.setAttribute('data-script-name', scriptConfig.name);
          
          if (isExternalScript) {
            // External script
            scriptElement.src = scriptConfig.script.trim();
            scriptElement.async = true;
            scriptElement.defer = true;
            console.log('TrackingScriptInjector: Created external script element:', scriptConfig.name, 'URL:', scriptConfig.script.trim());
          } else {
            // Inline script
            scriptElement.type = 'text/javascript';
            scriptElement.innerHTML = scriptConfig.script;
            console.log('TrackingScriptInjector: Created inline script element:', scriptConfig.name);
          }

          // Get target element for injection
          let targetElement: HTMLElement;
          
          switch (scriptConfig.location) {
            case 'head':
              targetElement = document.head;
              break;
            case 'body':
              targetElement = document.body;
              break;
            case 'footer':
              // Create or find footer
              let footer = document.querySelector('footer[data-tracking-footer="true"]') as HTMLElement;
              if (!footer) {
                footer = document.createElement('footer');
                footer.style.display = 'none'; // Hidden footer for scripts only
                footer.setAttribute('data-tracking-footer', 'true');
                document.body.appendChild(footer);
                console.log('TrackingScriptInjector: Created hidden footer for scripts');
              }
              targetElement = footer;
              break;
            default:
              targetElement = document.head;
          }

          // Inject the script
          try {
            targetElement.appendChild(scriptElement);
            console.log(`TrackingScriptInjector: Successfully injected script: ${scriptConfig.name} into ${scriptConfig.location}`);

            // For inline scripts, trigger execution by creating a new script element
            if (!isExternalScript) {
              // Create executable script
              const execScript = document.createElement('script');
              execScript.type = 'text/javascript';
              execScript.text = scriptConfig.script; // Use .text instead of .innerHTML for better execution
              execScript.setAttribute('data-tracking-script-exec', scriptConfig.id);
              
              // Append to trigger execution
              targetElement.appendChild(execScript);
              console.log('TrackingScriptInjector: Executed inline script:', scriptConfig.name);
              
              // Remove the execution script after a brief delay to keep DOM clean
              setTimeout(() => {
                if (execScript.parentNode) {
                  execScript.parentNode.removeChild(execScript);
                }
              }, 100);
            }

            // Add success event listener for external scripts
            if (isExternalScript) {
              scriptElement.onload = () => {
                console.log('TrackingScriptInjector: External script loaded successfully:', scriptConfig.name);
              };
              scriptElement.onerror = (error) => {
                console.error('TrackingScriptInjector: External script failed to load:', scriptConfig.name, error);
              };
            }

          } catch (injectionError) {
            console.error('TrackingScriptInjector: Failed to inject script:', scriptConfig.name, injectionError);
          }
        });
        
        console.log('TrackingScriptInjector: Injection complete for', scripts.length, 'scripts');
      } catch (error) {
        console.error('TrackingScriptInjector: Failed to load and inject tracking scripts:', error);
      }
    };

    // Ensure DOM is ready before injecting scripts
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', injectScripts);
    } else {
      // DOM is already ready, inject immediately
      setTimeout(injectScripts, 50);
    }

    // Listen for script updates from dashboard
    const handleScriptsUpdate = (event: any) => {
      console.log('TrackingScriptInjector: Received scripts update event', event.detail);
      setTimeout(injectScripts, 100);
    };

    window.addEventListener('trackingScriptsUpdated', handleScriptsUpdate);

    return () => {
      window.removeEventListener('trackingScriptsUpdated', handleScriptsUpdate);
      document.removeEventListener('DOMContentLoaded', injectScripts);
    };
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default TrackingScriptInjector;
