import React from 'react';
import { Tv, ShieldCheck } from 'lucide-react';
export const VideoLogueWorldCupStudio: React.FC = () => (
  <div className="rounded-2xl border border-rose-500/20 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-xl">
    <div className="flex items-start gap-3"><span className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-2 text-rose-300"><Tv className="h-5 w-5"/></span><div><h2 className="font-bold text-white">Studio de programmation vidéo — prototype</h2><p className="mt-1.5 text-sm leading-relaxed text-slate-300">Cadre original de préparation éditoriale et d’animation simulée. Aucune affiliation à une chaîne, plateforme ou compétition n’est revendiquée.</p><p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-300"><ShieldCheck className="h-3.5 w-3.5"/>Publication et monétisation soumises aux règles et à l’éligibilité de chaque plateforme et pays.</p></div></div>
  </div>
);
