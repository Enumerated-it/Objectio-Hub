import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Award,
  Hash
} from 'lucide-react';
import { ServiceItem } from '../types';
import { copyToClipboard, getFullDeepLink } from '../utils/deepLink';

interface ServiceCardProps {
  service: ServiceItem;
  isActiveAnchor: boolean;
  onOpenService: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isActiveAnchor,
  onOpenService,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const fullLink = getFullDeepLink(service.anchor);
    const success = await copyToClipboard(fullLink);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'juridique':
        return {
          badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          borderHover: 'hover:border-amber-500/60',
          accent: 'text-amber-400',
          glow: 'group-hover:shadow-amber-950/20',
        };
      case 'finance':
        return {
          badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          borderHover: 'hover:border-emerald-500/60',
          accent: 'text-emerald-400',
          glow: 'group-hover:shadow-emerald-950/20',
        };
      case 'securite':
        return {
          badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
          borderHover: 'hover:border-rose-500/60',
          accent: 'text-rose-400',
          glow: 'group-hover:shadow-rose-950/20',
        };
      case 'tech':
      default:
        return {
          badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
          borderHover: 'hover:border-cyan-500/60',
          accent: 'text-cyan-400',
          glow: 'group-hover:shadow-cyan-950/20',
        };
    }
  };

  const theme = getCategoryTheme(service.category);

  return (
    <div
      id={service.anchor}
      className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-slate-900/90 border transition-all duration-300 shadow-md ${
        isActiveAnchor
          ? 'border-amber-400/90 ring-2 ring-amber-400/30 bg-slate-900 shadow-amber-950/40 shadow-xl'
          : `border-slate-800/80 ${theme.borderHover} hover:bg-slate-900 hover:shadow-xl ${theme.glow}`
      }`}
    >
      {/* Top Bar: Code, Category, Deep Link Badge */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-950 border border-slate-700 text-amber-300 shadow-inner">
              {service.code}
            </span>
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${theme.badge}`}>
              {service.categoryLabel}
            </span>
          </div>

          {/* Deep link anchor badge */}
          <a
            href={`#${service.anchor}`}
            onClick={(e) => {
              e.preventDefault();
              onOpenService(service);
            }}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-amber-300 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800/80 transition-colors"
            title={`Accéder à l'ancre /#${service.anchor}`}
          >
            <Hash className="w-3 h-3 text-slate-500" />
            <span>{service.anchor}</span>
          </a>
        </div>

        {/* Title and Tagline */}
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
            <span>{service.title}</span>
          </h3>
          <p className="text-xs font-medium text-slate-400 line-clamp-1 mt-0.5">
            {service.tagline}
          </p>
        </div>

        {/* Short description */}
        <p className="text-xs text-slate-300/90 leading-relaxed line-clamp-3">
          {service.shortDesc}
        </p>
      </div>

      {/* Bottom Section: Metric Badge & Actions */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-3">
        {/* Metric / Status */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">{service.primaryMetric.label} :</span>
          <span className="font-mono font-semibold text-slate-200 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[11px]">
            {service.primaryMetric.value}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenService(service)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-semibold transition-all cursor-pointer group-hover:border-amber-500/50"
          >
            <span>Ouvrir le Service</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>

          <button
            onClick={handleCopyLink}
            className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors cursor-pointer"
            title={`Copier le lien direct /#${service.anchor}`}
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
