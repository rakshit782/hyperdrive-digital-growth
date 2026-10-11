import React, { useState } from 'react';
import { SitemapNode } from '@/utils/sitemapParser';
import { 
  Globe, 
  Layers, 
  FolderTree, 
  FileCode, 
  ExternalLink, 
  ChevronRight, 
  ChevronDown,
  Calendar,
  Briefcase,
  TrendingUp,
  FileCheck2,
  Scale,
  BookOpen
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SitemapFlowChartProps {
  rootNode: SitemapNode;
  totalUrls: number;
}

export const SitemapFlowChart: React.FC<SitemapFlowChartProps> = ({ rootNode, totalUrls }) => {
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (name: string) => {
    setCollapsedCategories((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const getCategoryIcon = (category: SitemapNode['category']) => {
    switch (category) {
      case 'services':
        return <Briefcase className="h-4 w-4 text-blue-500" />;
      case 'case-studies':
        return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case 'comparisons':
        return <Layers className="h-4 w-4 text-violet-500" />;
      case 'blog':
        return <BookOpen className="h-4 w-4 text-amber-500" />;
      case 'legal':
        return <Scale className="h-4 w-4 text-slate-500" />;
      default:
        return <FileCheck2 className="h-4 w-4 text-blue-500" />;
    }
  };

  const getCategoryBadgeColor = (category: SitemapNode['category']) => {
    switch (category) {
      case 'services':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'case-studies':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'comparisons':
        return 'bg-violet-50 text-violet-700 border-violet-200';
      case 'blog':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'legal':
        return 'bg-slate-50 text-slate-700 border-slate-200';
      default:
        return 'bg-sky-50 text-sky-700 border-sky-200';
    }
  };

  return (
    <div className="w-full bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 overflow-x-auto shadow-inner">
      {/* Root Node: Homepage */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative group">
          <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3.5 rounded-2xl shadow-lg border border-blue-400/40">
            <Globe className="h-6 w-6 animate-pulse" />
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-blue-100">Root Node</div>
              <div className="text-base font-bold flex items-center gap-2">
                {rootNode.name}
                <a
                  href={rootNode.url}
                  target="_blank"
                  rel="noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <Badge className="ml-2 bg-white/20 hover:bg-white/30 text-white text-xs border-0">
              {totalUrls} Canonical URLs
            </Badge>
          </div>
          {/* Vertical Trunk Line */}
          <div className="w-0.5 h-8 bg-blue-300 mx-auto" />
        </div>
      </div>

      {/* Categories Layer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {rootNode.children?.map((catNode) => {
          const isCollapsed = !!collapsedCategories[catNode.name];
          const childCount = catNode.children?.length || 0;

          return (
            <div
              key={catNode.name}
              className="flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Category Header Node */}
              <div
                onClick={() => toggleCategory(catNode.name)}
                className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between cursor-pointer select-none hover:bg-slate-100/80 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white shadow-xs border border-slate-200">
                    {getCategoryIcon(catNode.category)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{catNode.name}</h4>
                    <span className="text-[11px] text-slate-500 font-mono">{catNode.path}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs ${getCategoryBadgeColor(catNode.category)}`}>
                    {childCount} {childCount === 1 ? 'URL' : 'URLs'}
                  </Badge>
                  {isCollapsed ? (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Child URLs List (Branches) */}
              {!isCollapsed && (
                <div className="p-3 divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {catNode.children && catNode.children.length > 0 ? (
                    catNode.children.map((child) => (
                      <div
                        key={child.url}
                        className="py-2.5 px-2 flex items-center justify-between hover:bg-slate-50/80 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <FileCode className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
                          <div className="truncate">
                            <a
                              href={child.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-medium text-slate-700 hover:text-blue-600 truncate flex items-center gap-1"
                            >
                              <span className="truncate">{child.name}</span>
                              <ExternalLink className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                            </a>
                            <div className="text-[10px] text-slate-400 font-mono truncate">{child.path}</div>
                          </div>
                        </div>

                        {child.lastmod && (
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 shrink-0 ml-2">
                            <Calendar className="h-3 w-3" />
                            <span>{child.lastmod}</span>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-xs text-slate-400">No sub-paths found</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <FolderTree className="h-4 w-4 text-blue-600" />
          <span>Interactive Hierarchy: Click any category pillar above to expand or collapse branches.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-500" /> Services
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Case Studies
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-violet-500" /> Alternatives
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Blog
          </span>
        </div>
      </div>
    </div>
  );
};
