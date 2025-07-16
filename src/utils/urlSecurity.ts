
import { useToast } from "@/hooks/use-toast";

interface SecurityCheckResult {
  isSecure: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  warnings: string[];
  malwareDetected: boolean;
  phishingDetected: boolean;
}

// Utility to validate and check URL security
export class URLSecurityValidator {
  private static maliciousDomains = [
    'malware-example.com',
    'phishing-site.net',
    'dangerous-url.org'
  ];

  private static suspiciousPatterns = [
    /bit\.ly|tinyurl|shorturl/i, // URL shorteners
    /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/i, // IP addresses
    /xn--/i, // Punycode (can be used for homograph attacks)
    /[^\x00-\x7F]/i, // Non-ASCII characters
    /paypal|amazon|google|microsoft/i // Common phishing targets
  ];

  static async validateURL(url: string): Promise<SecurityCheckResult> {
    const result: SecurityCheckResult = {
      isSecure: true,
      riskLevel: 'low',
      warnings: [],
      malwareDetected: false,
      phishingDetected: false
    };

    try {
      // Basic URL validation
      const urlObj = new URL(url);
      
      // Check protocol
      if (urlObj.protocol !== 'https:' && urlObj.protocol !== 'http:') {
        result.warnings.push('Invalid protocol detected');
        result.riskLevel = 'medium';
        result.isSecure = false;
      }

      // Check for suspicious patterns
      for (const pattern of this.suspiciousPatterns) {
        if (pattern.test(url)) {
          result.warnings.push('Suspicious URL pattern detected');
          result.riskLevel = 'medium';
        }
      }

      // Check against known malicious domains
      if (this.maliciousDomains.includes(urlObj.hostname.toLowerCase())) {
        result.warnings.push('Known malicious domain detected');
        result.riskLevel = 'high';
        result.malwareDetected = true;
        result.isSecure = false;
      }

      // Check for common phishing indicators
      if (this.checkPhishingIndicators(urlObj)) {
        result.warnings.push('Potential phishing indicators detected');
        result.riskLevel = 'high';
        result.phishingDetected = true;
        result.isSecure = false;
      }

      // Additional security checks
      if (urlObj.hostname.includes('xn--')) {
        result.warnings.push('Punycode domain detected - potential homograph attack');
        result.riskLevel = 'medium';
      }

      // Check for excessive subdomains
      const subdomains = urlObj.hostname.split('.');
      if (subdomains.length > 4) {
        result.warnings.push('Excessive subdomains detected');
        result.riskLevel = 'medium';
      }

    } catch (error) {
      result.warnings.push('Invalid URL format');
      result.riskLevel = 'high';
      result.isSecure = false;
    }

    return result;
  }

  private static checkPhishingIndicators(urlObj: URL): boolean {
    const hostname = urlObj.hostname.toLowerCase();
    
    // Check for typosquatting of popular domains
    const popularDomains = ['google', 'facebook', 'amazon', 'paypal', 'microsoft', 'apple'];
    
    for (const domain of popularDomains) {
      if (hostname.includes(domain) && !hostname.endsWith(`${domain}.com`)) {
        return true;
      }
    }

    // Check for suspicious TLDs commonly used in phishing
    const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf'];
    if (suspiciousTlds.some(tld => hostname.endsWith(tld))) {
      return true;
    }

    return false;
  }

  static async scanWebsite(url: string): Promise<SecurityCheckResult> {
    console.log(`Scanning website: ${url}`);
    
    try {
      // Perform basic security validation
      const basicCheck = await this.validateURL(url);
      
      // In a real implementation, you would call external security APIs here
      // For now, we'll simulate some additional checks
      
      // Simulate API call to security service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock additional security data
      if (Math.random() > 0.9) { // 10% chance of finding issues
        basicCheck.warnings.push('Suspicious activity detected by security scanner');
        basicCheck.riskLevel = 'high';
        basicCheck.isSecure = false;
      }

      return basicCheck;
    } catch (error) {
      console.error('Error scanning website:', error);
      return {
        isSecure: false,
        riskLevel: 'high',
        warnings: ['Security scan failed'],
        malwareDetected: false,
        phishingDetected: false
      };
    }
  }

  static getSecurityBadge(result: SecurityCheckResult): {
    color: string;
    text: string;
    icon: string;
  } {
    if (!result.isSecure) {
      return {
        color: 'bg-red-100 text-red-800',
        text: 'Unsafe',
        icon: '🚫'
      };
    }

    switch (result.riskLevel) {
      case 'high':
        return {
          color: 'bg-red-100 text-red-800',
          text: 'High Risk',
          icon: '⚠️'
        };
      case 'medium':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          text: 'Medium Risk',
          icon: '⚡'
        };
      default:
        return {
          color: 'bg-green-100 text-green-800',
          text: 'Secure',
          icon: '✅'
        };
    }
  }
}

// Hook for URL security validation
export const useURLSecurity = () => {
  const { toast } = useToast();

  const validateAndWarn = async (url: string): Promise<boolean> => {
    try {
      const result = await URLSecurityValidator.validateURL(url);
      
      if (!result.isSecure || result.riskLevel === 'high') {
        toast({
          title: "Security Warning",
          description: `This URL may be unsafe: ${result.warnings.join(', ')}`,
          variant: "destructive",
        });
        return false;
      }

      if (result.warnings.length > 0) {
        toast({
          title: "Security Notice",
          description: `URL flagged for: ${result.warnings.join(', ')}`,
          variant: "default",
        });
      }

      return true;
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Failed to validate URL security",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    validateAndWarn,
    scanWebsite: URLSecurityValidator.scanWebsite,
    validateURL: URLSecurityValidator.validateURL,
    getSecurityBadge: URLSecurityValidator.getSecurityBadge
  };
};
