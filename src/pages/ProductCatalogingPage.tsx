import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  CheckCircle2, 
  Database, 
  Package, 
  BarChart3, 
  FileSpreadsheet,
  Boxes,
  Layers,
  Sparkles,
  RefreshCw,
  SlidersHorizontal,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { getCaseStudiesByService, FormattedCaseStudy } from '@/data/bulkCaseStudiesAdapter';
import CaseStudyPopup from '@/components/CaseStudyPopup';

const ProductCatalogingPage = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = React.useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const caseStudies = React.useMemo(() => getCaseStudiesByService('Catalog Management'), []);

  const handleCaseStudyClick = (study: FormattedCaseStudy) => {
    setSelectedCaseStudy({
      id: study.id,
      title: study.title,
      description: study.description,
      industry: study.industry,
      client_name: study.client_name,
      image_url: study.imageUrl,
      results: {
        [study.results.metric1.label]: study.results.metric1.value,
        [study.results.metric2.label]: study.results.metric2.value,
        [study.results.metric3.label]: study.results.metric3.value,
      },
    });
    setIsPopupOpen(true);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.amzadscout.com/services/product-cataloging#service",
    "name": "E-commerce Product Cataloging",
    "serviceType": "Product cataloging",
    "url": "https://www.amzadscout.com/services/product-cataloging",
    "provider": {
      "@type": "Organization",
      "@id": "https://www.amzadscout.com/#organization",
      "name": "AMZ AD SCOUT",
      "url": "https://www.amzadscout.com/"
    },
    "areaServed": "Worldwide",
    "description": "E-commerce Product Cataloging Services, Multi-channel Product Catalog Management, Product Data Management Agency, Product Information Management (PIM) Service"
  };

  const stats = [
    { value: '99.9%', label: 'Attribute Accuracy', sub: 'Zero listing suppression or categorization errors' },
    { value: '75%', label: 'Faster Time-to-Market', sub: 'Rapid turnaround for high-SKU catalog uploads' },
    { value: '150,000+', label: 'SKUs Managed', sub: 'Across Amazon, Walmart, Shopify, & TikTok Shop' },
    { value: '24/7', label: 'Feed & Stock Monitoring', sub: 'Instant resolution of stranded & suppressed items' }
  ];

  const features = [
    {
      icon: FileSpreadsheet,
      title: 'Bulk Flat-File & Feeds Management',
      subtitle: 'Category-Specific Feeds',
      description: 'Expertise in category template sheets, complex parent-child variation trees, UPC/GTIN exemptions, and bulk inventory feeds that pass Amazon ingestion without errors.',
      tags: ['Flat-Files', 'Parent-Child Variations', 'Barcode Exemption']
    },
    {
      icon: Boxes,
      title: 'Variation Matrix Engineering',
      subtitle: 'Color, Size & Bundle Mapping',
      description: 'Constructing logical, seamless variation families that pool reviews, prevent ASIN splits, and enhance browsing clarity for buyers across complex product lines.',
      tags: ['Variation Families', 'Review Pooling', 'ASIN Merge / Split']
    },
    {
      icon: Database,
      title: 'PIM & Attribute Data Cleansing',
      subtitle: 'Taxonomy & Field Mapping',
      description: 'Standardizing raw supplier feeds, resolving missing attribute tags, backend search nodes, and compliance data to ensure peak discoverability across marketplace search filters.',
      tags: ['Data Normalization', 'Facet Attributes', 'Browse Node Mapping']
    },
    {
      icon: RefreshCw,
      title: 'Multi-Channel Catalog Sync',
      subtitle: 'Omnichannel Alignment',
      description: 'Synchronizing product titles, barcode IDs, inventories, and pricing across Amazon Seller Central, Walmart Marketplace, Shopify, and TikTok Shop without catalog drift.',
      tags: ['Amazon to Walmart', 'Shopify Sync', 'Inventory Normalization']
    },
    {
      icon: ShieldCheck,
      title: 'Suppressed & Stranded ASIN Rescue',
      subtitle: 'Resolution & Reinstatement',
      description: 'Fast identification and resolution of Fix Your Products issues, stranded inventory reasons, brand authorization blocks, and dangerous goods / Hazmat approvals.',
      tags: ['Hazmat Exemption', 'Stranded Inventory', 'Suppression Fix']
    },
    {
      icon: SlidersHorizontal,
      title: 'Category & Browse Node Optimization',
      subtitle: 'Precise Classification',
      description: 'Positioning your SKUs in the exact subcategories with the highest conversion velocity, lowest return rates, and the most favorable BSR (Best Seller Rank) competition.',
      tags: ['BSR Placement', 'Category Correction', 'Filter Facet Ingestion']
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Catalog Data Ingestion',
      desc: 'We extract and audit your current SKU catalog, supplier data sheets, and marketplace backend listings for missing attributes or errors.'
    },
    {
      step: '02',
      title: 'Taxonomy & Attribute Scrub',
      desc: 'Attributes are normalized, compliance requirements verified, barcodes matched, and variation hierarchies methodically constructed.'
    },
    {
      step: '03',
      title: 'Bulk Feed Upload & Verification',
      desc: 'We execute batch uploads via API or template feeds, resolving ingestion errors in real-time until 100% of SKUs are live and buyable.'
    },
    {
      step: '04',
      title: 'Continuous Catalog Health Guard',
      desc: 'We monitor listing health alerts, suppressed status, brand hijacking attempts, and feed discrepancies on an ongoing basis.'
    }
  ];

  const benefits = [
    'Clean, error-free product catalogs that boost organic visibility',
    'Elimination of lost revenue due to suppressed or stranded SKUs',
    'Structured parent-child variations that maximize review consolidation',
    'Fast onboarding of large product lines (100 to 100,000+ SKUs)',
    'Full compliance with marketplace catalog guidelines & GTIN rules',
    'Dedicated catalog specialist with deep expertise in Seller Central & Walmart Seller Center'
  ];

  return (
    <>
      <SEOHead 
        title="E-commerce Product Cataloging Services | AMZ AD SCOUT"
        description="Keep product data accurate across Amazon, Walmart and Shopify with catalog setup and clean-up, SKU cataloging and ongoing upkeep. Get a free catalog audit."
        keywords="E-commerce Product Cataloging Services, Multi-channel Product Catalog Management, Product Data Management Agency, Product Catalog Setup and Clean-up, Product Information Management (PIM) Service, SKU and Inventory Cataloging Solutions, product cataloging, ecommerce cataloging, product data management, catalog management, product information management, pim system, product data entry, bulk product upload, product categorization, product taxonomy, attribute management, product specification management, sku management, inventory cataloging, stock level management, multi channel catalog, omnichannel product data, marketplace product sync, centralized catalog management, product content management, digital asset management, product image management, product media management, product video cataloging, product document management, technical specifications, product dimensions cataloging, weight specifications, material composition, care instructions cataloging, warranty information management, compliance documentation, safety certifications, product labeling requirements, barcode management, upc codes, ean codes, isbn management, asin cataloging amazon, gtin management, mpn manufacturer part number, product identifier management, variant management, product options cataloging, size variations, color variations, material options, style variations, package quantity options, bundle cataloging, kit product management, configurable products, grouped products cataloging, virtual products, downloadable products, subscription products cataloging, rental products management, refurbished product cataloging, used product listings, collectible items cataloging, custom products management, personalized products, made to order cataloging, print on demand products, drop ship catalog management, supplier catalog integration, vendor product import, api product sync, feed management, xml product feeds, csv product import, excel product upload, google shopping feed, facebook catalog feed, instagram product feed, pinterest catalog feed, amazon product feed, ebay product data, walmart item setup, shopify product import, magento catalog sync, woocommerce product import, bigcommerce catalog, prestashop products, opencart catalog management, product data quality, data cleansing catalog, duplicate detection, data standardization product, data enrichment catalog, missing data completion, product description enhancement, attribute validation, data governance products, master data management, product hierarchy, category structure management, navigation taxonomy, filter attribute management, search attribute setup, faceted navigation products, product relationships, cross sell mapping, upsell relationships, related products mapping, compatible products, alternative products catalog, replacement products, spare parts cataloging, accessory products, complementary products mapping"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        schema={schema}
      />
      <Header />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-purple-50/25 to-white text-slate-900 selection:bg-purple-500/20 selection:text-purple-900">
        
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden border-b border-slate-200/60 bg-gradient-to-br from-purple-500/[0.05] via-indigo-500/[0.04] to-pink-500/[0.02]">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-purple-400/20 via-indigo-300/15 to-pink-300/10 blur-[130px] pointer-events-none" />
          <div className="absolute -top-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-purple-50 border border-purple-200/80 backdrop-blur-md mb-6 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
                Data Infrastructure • SKU & Inventory Cataloging
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.12]">
              Product Cataloging & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                Data Management Agency
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              Master the backend of your catalog. From complex multi-variation setups and flat-file uploads to stranded ASIN recovery and cross-marketplace taxonomy mapping, we ensure 100% of your products are live, indexed, and generating sales.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                asChild
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-8 py-6 text-base rounded-xl shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.02]"
              >
                <Link to="/contact" aria-label="Request Catalog Audit">
                  Request Free Catalog Audit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-slate-300 bg-white/90 hover:bg-slate-50 text-slate-800 px-8 py-6 text-base rounded-xl backdrop-blur-md shadow-xs transition-all hover:border-slate-400"
              >
                <Link to="/case-studies">
                  View Success Stories
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>Bulk Flat-File Certification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>Zero-Suppression Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>Multi-Marketplace Alignment</span>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS / STATS SECTION */}
        <section className="py-14 border-b border-slate-200/60 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-gradient-to-b from-purple-50/40 to-white border border-purple-200/70 shadow-xs text-center hover:border-purple-400/60 hover:shadow-md transition-all"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                    {item.value}
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-1">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-500 leading-snug">
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT'S INCLUDED / CAPABILITIES */}
        <section className="py-20 md:py-28 bg-slate-50/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-3">
                Catalog Operations
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                Enterprise Catalog Architecture
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
                We eliminate the friction of product uploads, category taxonomy misalignments, and attribute errors across high-volume inventories.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div 
                    key={idx} 
                    className="group relative p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-400/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-200 flex items-center justify-center text-purple-700 mb-5 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block mb-1">
                      {feat.subtitle}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      {feat.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                      {feat.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4-STEP METHODOLOGY */}
        <section className="py-20 bg-white border-y border-slate-200/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-3">
                Execution Workflow
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                How We Manage Your Catalog
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto text-base">
                A structured, repeatable protocol for zero-defect product launches and migrations.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, idx) => (
                <div key={idx} className="relative p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 shadow-xs hover:border-purple-300 transition-all">
                  <div className="text-3xl font-black text-purple-600/40 mb-3">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US / ADVANTAGES */}
        <section className="py-20 md:py-28 bg-slate-50/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-lg">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                  Why Outsource Catalog Management?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  Stop wasting valuable team hours debugging obscure Seller Central flat-file error codes.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-purple-50/40 border border-purple-200/60">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CASE STUDIES SECTION */}
        {caseStudies.length > 0 && (
          <section className="py-20 md:py-28 bg-white border-b border-slate-200/70">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="inline-block px-3.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-3">
                  Documented Impact
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                  Catalog Management Case Studies ({caseStudies.length})
                </h2>
                <p className="text-slate-600 max-w-xl mx-auto text-base">
                  Real SKU expansions, variation reorganizations, and error resolutions for enterprise catalogs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {caseStudies.slice(0, 6).map((study) => (
                  <div 
                    key={study.id} 
                    onClick={() => handleCaseStudyClick(study)}
                    className="group rounded-3xl bg-slate-50/50 border border-slate-200/90 shadow-sm overflow-hidden hover:border-purple-400/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                  >
                      <div className="p-7">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                              {study.industry}
                            </span>
                            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                              {study.client_name}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-slate-700 border border-slate-200">
                            {study.channel}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2">
                          {study.challenge}
                        </p>
                        <p className="text-xs text-slate-500 mb-6 leading-relaxed line-clamp-2 bg-white p-3 rounded-xl border border-slate-200/60">
                          <span className="font-semibold text-slate-700">Solution: </span>{study.solution}
                        </p>
                      </div>

                    <div className="px-7 pb-7">
                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/60 mb-4">
                        <div className="text-center p-2.5 rounded-xl bg-white border border-slate-200/80">
                          <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            {study.results.metric1.value}
                          </div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5 truncate">
                            {study.results.metric1.label}
                          </div>
                        </div>
                        <div className="text-center p-2.5 rounded-xl bg-white border border-slate-200/80">
                          <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            {study.results.metric2.value}
                          </div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5 truncate">
                            {study.results.metric2.label}
                          </div>
                        </div>
                        <div className="text-center p-2.5 rounded-xl bg-white border border-slate-200/80">
                          <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {study.results.metric3.value}
                          </div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5 truncate">
                            {study.results.metric3.label}
                          </div>
                        </div>
                      </div>

                      <Button 
                        variant="outline"
                        className="w-full border-slate-200 group-hover:border-purple-400 group-hover:bg-purple-50/50 text-slate-700 group-hover:text-purple-800 font-semibold text-xs py-2 rounded-xl"
                      >
                        Read Full Case Study
                        <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {caseStudies.length > 6 && (
                <div className="text-center mt-12">
                  <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-8">
                    <Link to="/case-studies">
                      Explore All {caseStudies.length} Catalog Case Studies
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* HIGH-CONVERSION CTA */}
        <section className="py-20 pb-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 p-8 sm:p-14 text-center shadow-xl shadow-purple-500/15">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/10 pointer-events-none" />
              
              <div className="relative z-10">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white font-semibold text-xs tracking-wider uppercase mb-4 backdrop-blur-sm">
                  Catalog Health Evaluation
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                  Need Help Fixing Suppressed SKUs or Setting Up Variations?
                </h2>
                <p className="text-purple-50 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                  Our team of catalog specialists can ingest, clean, and activate your entire inventory without disrupting current sales.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    asChild
                    size="lg"
                    className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800 font-bold px-8 py-6 text-base rounded-xl shadow-xl transition-all hover:scale-105"
                  >
                    <Link to="/contact">
                      Request Catalog Proposal
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white/50 bg-white/10 hover:bg-white/20 text-white hover:text-white font-semibold px-8 py-6 text-base rounded-xl backdrop-blur-md"
                  >
                    <Link to="/contact">
                      Schedule a Specialist Call
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      
      <CaseStudyPopup 
        caseStudy={selectedCaseStudy}
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setSelectedCaseStudy(null);
        }}
      />

      <Footer />
    </>
  );
};

export default ProductCatalogingPage;
