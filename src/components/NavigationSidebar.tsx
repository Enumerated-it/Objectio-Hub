import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  FileCheck2,
  Gavel,
  Home,
  Info,
  LayoutGrid,
  Lightbulb,
  Menu,
  ShieldCheck,
  X,
} from 'lucide-react';

interface NavigationSidebarProps {
  onHome: () => void;
  onServices: () => void;
  onOpenDossier: () => void;
  onOpenSources: () => void;
  onOpenPrivateSpace: () => void;
  onOpenMentions: () => void;
}

type NavItem = {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  accent: string;
};

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  onHome,
  onServices,
  onOpenDossier,
  onOpenSources,
  onOpenPrivateSpace,
  onOpenMentions,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const items: NavItem[] = [
    { label: 'Accueil', description: 'Vue générale du Hub', icon: Home, action: onHome, accent: 'text-amber-300' },
    { label: 'Services', description: 'Catalogue des 15 services', icon: LayoutGrid, action: onServices, accent: 'text-cyan-300' },
    { label: 'Dossier d’apport', description: 'État public et méthode', icon: FileCheck2, action: onOpenDossier, accent: 'text-emerald-300' },
    { label: 'Sources', description: 'Orientation et références', icon: Lightbulb, action: onOpenSources, accent: 'text-violet-300' },
    { label: 'Espace privé', description: 'Hors bundle public', icon: ShieldCheck, action: onOpenPrivateSpace, accent: 'text-rose-300' },
    { label: 'Mentions légales', description: 'Cadre et données personnelles', icon: Gavel, action: onOpenMentions, accent: 'text-sky-300' },
  ];

  const activate = (action: () => void) => {
    action();
    setMobileOpen(false);
  };

  const panel = (isMobile: boolean) => (
    <div className="flex h-full flex-col bg-slate-950/95 text-slate-100 shadow-2xl backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between border-b border-slate-800 px-4">
        <button onClick={() => activate(onHome)} className="flex min-w-0 items-center gap-3 text-left" aria-label="Accueil Objectio Hub">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300"><Compass className="h-5 w-5" /></span>
          {(expanded || isMobile) && <span className="min-w-0"><strong className="block truncate font-['Cinzel',serif] text-sm text-white">OBJECTIO</strong><small className="block truncate text-[10px] uppercase tracking-[0.18em] text-slate-500">Bureau des méthodes</small></span>}
        </button>
        {isMobile && <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Fermer la navigation"><X className="h-5 w-5" /></button>}
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto p-3" aria-label="Navigation principale">
        {items.map(({ label, description, icon: Icon, action, accent }) => (
          <button key={label} onClick={() => activate(action)} title={!expanded && !isMobile ? label : undefined} className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-left text-slate-300 transition hover:border-slate-700 hover:bg-slate-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
            <Icon className={`h-5 w-5 shrink-0 ${accent}`} />
            {(expanded || isMobile) && <span className="min-w-0"><strong className="block truncate text-xs font-semibold">{label}</strong><small className="mt-0.5 block truncate text-[10px] text-slate-500 group-hover:text-slate-400">{description}</small></span>}
          </button>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-3">
        <div className={`rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 ${(expanded || isMobile) ? '' : 'flex justify-center'}`}>
          <span className="flex items-center gap-2 text-[10px] font-semibold text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-400" />{(expanded || isMobile) ? 'Portail public actif' : ''}</span>
          {(expanded || isMobile) && <p className="mt-1 text-[9px] leading-relaxed text-slate-500">Public, Pro et Privé séparés par conception.</p>}
        </div>
        {!isMobile && <button onClick={() => setExpanded((value) => !value)} className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg p-2 text-xs text-slate-500 hover:bg-slate-900 hover:text-slate-200" aria-label={expanded ? 'Réduire la barre latérale' : 'Développer la barre latérale'}>{expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}{expanded && 'Réduire'}</button>}
      </div>
    </div>
  );

  return (
    <>
      <button onClick={() => setMobileOpen(true)} className="fixed bottom-5 left-5 z-[80] grid h-12 w-12 place-items-center rounded-2xl border border-amber-400/40 bg-slate-950 text-amber-300 shadow-2xl lg:hidden" aria-label="Ouvrir la navigation"><Menu className="h-5 w-5" /></button>
      {mobileOpen && <div className="fixed inset-0 z-[90] bg-slate-950/70 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)}><aside className="h-full w-[min(86vw,320px)]" onClick={(event) => event.stopPropagation()}>{panel(true)}</aside></div>}
      <aside className={`fixed inset-y-0 left-0 z-[70] hidden border-r border-slate-800 transition-[width] duration-300 lg:block ${expanded ? 'w-64' : 'w-[76px]'}`}>
        {panel(false)}
      </aside>
      <div className={`hidden transition-[width] duration-300 lg:block ${expanded ? 'w-64' : 'w-[76px]'}`} aria-hidden="true" />
    </>
  );
};
