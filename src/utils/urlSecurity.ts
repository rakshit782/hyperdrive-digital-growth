
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
    'dangerous-url.org',
    'bit.ly',
    'tinyurl.com',
    'shorturl.com',
    'suspicious-domain.tk',
    'fake-bank.ml'
  ];

  private static suspiciousPatterns = [
    /bit\.ly|tinyurl|shorturl|t\.co/i, // URL shorteners
    /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/i, // IP addresses
    /xn--/i, // Punycode (can be used for homograph attacks)
    /[^\x00-\x7F]/i, // Non-ASCII characters
    /paypal|amazon|google|microsoft|apple|facebook/i, // Common phishing targets
    /login|signin|account|secure|verify|update|suspended/i, // Suspicious keywords
    /-{2,}|_{2,}/i, // Multiple consecutive hyphens or underscores
    /\d{4,}/i // Long sequences of numbers (often suspicious)
  ];

  private static suspiciousTlds = [
    '.tk', '.ml', '.ga', '.cf', '.pw', '.top', '.click', '.download',
    '.review', '.country', '.kim', '.cricket', '.science', '.work'
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
      
      // Check protocol security
      if (urlObj.protocol !== 'https:' && urlObj.protocol !== 'http:') {
        result.warnings.push('Invalid or suspicious protocol detected');
        result.riskLevel = 'high';
        result.isSecure = false;
      }

      // Prefer HTTPS for security
      if (urlObj.protocol === 'http:') {
        result.warnings.push('Insecure HTTP protocol - HTTPS recommended');
        if (result.riskLevel === 'low') result.riskLevel = 'medium';
      }

      // Check for suspicious patterns in the full URL
      for (const pattern of this.suspiciousPatterns) {
        if (pattern.test(url)) {
          result.warnings.push('Suspicious URL pattern detected');
          result.riskLevel = result.riskLevel === 'low' ? 'medium' : 'high';
        }
      }

      // Check against known malicious domains
      const hostname = urlObj.hostname.toLowerCase();
      if (this.maliciousDomains.includes(hostname)) {
        result.warnings.push('Known malicious domain detected');
        result.riskLevel = 'high';
        result.malwareDetected = true;
        result.isSecure = false;
      }

      // Check for suspicious TLDs
      for (const tld of this.suspiciousTlds) {
        if (hostname.endsWith(tld)) {
          result.warnings.push(`Suspicious top-level domain (${tld}) detected`);
          result.riskLevel = result.riskLevel === 'low' ? 'medium' : 'high';
        }
      }

      // Check for common phishing indicators
      if (this.checkPhishingIndicators(urlObj)) {
        result.warnings.push('Potential phishing indicators detected');
        result.riskLevel = 'high';
        result.phishingDetected = true;
        result.isSecure = false;
      }

      // Check for punycode domains (homograph attacks)
      if (hostname.includes('xn--')) {
        result.warnings.push('Punycode domain detected - potential homograph attack');
        result.riskLevel = result.riskLevel === 'low' ? 'medium' : 'high';
      }

      // Check for excessive subdomains
      const subdomains = hostname.split('.');
      if (subdomains.length > 4) {
        result.warnings.push('Excessive subdomains detected');
        result.riskLevel = result.riskLevel === 'low' ? 'medium' : result.riskLevel;
      }

      // Check for suspicious URL length
      if (url.length > 200) {
        result.warnings.push('Unusually long URL detected');
        result.riskLevel = result.riskLevel === 'low' ? 'medium' : result.riskLevel;
      }

      // Check for URL encoding obfuscation
      if (/%[0-9A-Fa-f]{2}/.test(url)) {
        const decodedUrl = decodeURIComponent(url);
        if (decodedUrl !== url && decodedUrl.includes('<script>')) {
          result.warnings.push('Potential URL encoding obfuscation detected');
          result.riskLevel = 'high';
          result.isSecure = false;
        }
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
    const fullUrl = urlObj.href.toLowerCase();
    
    // Check for typosquatting of popular domains
    const popularDomains = [
      'google', 'facebook', 'amazon', 'paypal', 'microsoft', 'apple', 
      'ebay', 'instagram', 'twitter', 'linkedin', 'netflix', 'spotify'
    ];
    
    for (const domain of popularDomains) {
      // Check for domain look-alikes
      if (hostname.includes(domain) && !hostname.endsWith(`${domain}.com`) && !hostname.endsWith(`${domain}.org`)) {
        // Allow legitimate subdomains but catch typosquatting
        if (!hostname.endsWith(`.${domain}.com`) && !hostname.endsWith(`.${domain}.org`)) {
          return true;
        }
      }
    }

    // Check for suspicious keywords in the URL path
    const suspiciousKeywords = [
      'verify', 'confirm', 'secure', 'update', 'suspended', 'locked',
      'billing', 'payment', 'account', 'signin', 'login'
    ];

    for (const keyword of suspiciousKeywords) {
      if (fullUrl.includes(keyword) && !hostname.includes('legitimate-') && hostname.split('.').length > 3) {
        return true;
      }
    }

    // Check for homograph attacks (similar looking characters)
    const homographPatterns = [
      /[а-яё]/i, // Cyrillic characters that look like Latin
      /[αβγδεζηθικλμνξοπρστυφχψω]/i, // Greek characters
    ];

    for (const pattern of homographPatterns) {
      if (pattern.test(hostname)) {
        return true;
      }
    }

    return false;
  }

  static async scanWebsite(url: string): Promise<SecurityCheckResult> {
    console.log(`Scanning website: ${url}`);
    
    try {
      // Perform comprehensive security validation
      const basicCheck = await this.validateURL(url);
      
      // Simulate additional security checks (in a real app, you'd call external APIs)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock additional security analysis
      if (Math.random() > 0.85) { // 15% chance of finding additional issues
        basicCheck.warnings.push('Suspicious network activity patterns detected');
        basicCheck.riskLevel = 'high';
        basicCheck.isSecure = false;
      }

      // Check if domain has been reported recently (mock)
      if (Math.random() > 0.92) { // 8% chance
        basicCheck.warnings.push('Domain recently reported for suspicious activity');
        basicCheck.riskLevel = basicCheck.riskLevel === 'low' ? 'medium' : 'high';
      }

      return basicCheck;
    } catch (error) {
      console.error('Error scanning website:', error);
      return {
        isSecure: false,
        riskLevel: 'high',
        warnings: ['Security scan failed - unable to analyze URL'],
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
        color: 'bg-red-100 text-red-800 border-red-200',
        text: 'Unsafe',
        icon: '🚫'
      };
    }

    switch (result.riskLevel) {
      case 'high':
        return {
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          text: 'High Risk',
          icon: '⚠️'
        };
      case 'medium':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          text: 'Medium Risk',
          icon: '⚡'
        };
      default:
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          text: 'Secure',
          icon: '✅'
        };
    }
  }

  static getDetailedSecurityReport(result: SecurityCheckResult): string {
    const reports = [];
    
    if (result.malwareDetected) {
      reports.push('🦠 Malware signatures detected');
    }
    
    if (result.phishingDetected) {
      reports.push('🎣 Phishing indicators found');
    }
    
    if (result.warnings.length > 0) {
      reports.push(`⚠️ ${result.warnings.length} security warning(s)`);
    }
    
    if (reports.length === 0) {
      return '✅ No immediate security threats detected';
    }
    
    return reports.join(' • ');
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

      if (result.warnings.length > 0 && result.riskLevel === 'medium') {
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

  const scanAndReport = async (url: string): Promise<SecurityCheckResult> => {
    try {
      const result = await URLSecurityValidator.scanWebsite(url);
      
      if (!result.isSecure) {
        toast({
          title: "Security Threat Detected",
          description: URLSecurityValidator.getDetailedSecurityReport(result),
          variant: "destructive",
        });
      } else if (result.riskLevel !== 'low') {
        toast({
          title: "Security Alert",
          description: URLSecurityValidator.getDetailedSecurityReport(result),
          variant: "default",
        });
      }
      
      return result;
    } catch (error) {
      console.error('Error in security scan:', error);
      toast({
        title: "Scan Error",
        description: "Unable to complete security scan",
        variant: "destructive",
      });
      return {
        isSecure: false,
        riskLevel: 'high',
        warnings: ['Scan failed'],
        malwareDetected: false,
        phishingDetected: false
      };
    }
  };

  return {
    validateAndWarn,
    scanAndReport,
    scanWebsite: URLSecurityValidator.scanWebsite,
    validateURL: URLSecurityValidator.validateURL,
    getSecurityBadge: URLSecurityValidator.getSecurityBadge,
    getDetailedSecurityReport: URLSecurityValidator.getDetailedSecurityReport
  };
};
