import React, { useState } from 'react';
import {
  X, LayoutDashboard, Bot, RefreshCw, Landmark, Users, Building2, Globe, Cloud, Lock,
  ShieldCheck, Copy, Check, FileText,
} from 'lucide-react';
import {
  LEGAL_IDENTITY,
  INVENTAIRE_REEL_APPORT,
  OBJ_TOTAL_EFFORT_HEURES,
  OBJ_VALEUR_APPORT_NATURE_FORMATTED,
} from '../data/servicesData';
import {
  MD_AGENTS, MD_SYNC_NODES, MD_SYNC_COMPONENTS, MD_BANKS, MD_BUDGET, MD_ROLES, MD_BUREAUX,
  MD_PNUD_SECTIONS, MD_AZURE, MD_SECURITY_LAYERS, MD_PROTECTED_DATA, MD_PROGRESS, MD_ORIGIN,
  BUREAU_DES_METHODES_LABEL, STATUS_LABEL, rapportHeader,
} from '../data/morchidiDigitalData';
import { copyToClipboard } from '../utils/deepLink';

type Tab = 'dashboard' | 'agents' | 'sync' | 'tribank' | 'roles' | 'bureaux' | 'pnud' | 'azure' | 'securite';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
  { id: 'agents', label: 'Agents', icon: <Bot className="w-3.5 h-3.5" /> },
  { id: 'sync', label: 'AGENT_SYNC', icon: <RefreshCw className="w-3.5 h-3.5" /> },
  { id: 'tribank', label: 'Tri-Bank', icon: <Landmark className="w-3.5 h-3.5" /> },
  { id: 'roles', label: 'Tri-Rôles', icon: <Users className="w-3.5 h-3.5" /> },
  { id: 'bureaux', label: 'Bureaux', icon: <Building2 className="w-3.5 h-3.5" /> },
  { id: 'pnud', label: 'PNUD', icon: <Globe className="w-3.5 h-3.5" /> },
  { id: 'azure', label: 'Azure', icon: <Cloud className="w-3.5 h-3.5" /> },
  { id: 'securite', label: 'Sécurité', icon: <Lock className="w-3.5 h-3.5" /> },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: Tab;
}

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-xl border border-slate-700/70 bg-slate-900/70 p-4 ${className}`}>{children}</div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-base font-bold text-amber-300 flex items-center gap-2 mb-3 pb-2 border-b border-amber-500/20">{children}</h3>
);

const Badge: React.FC<{ children: React.ReactNode; tone?: 'green' | 'amber' | 'slate' }> = ({ children, tone = 'green' }) => {
  const cls = tone === 'green' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
    : tone === 'amber' ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
    : 'bg-slate-700/40 text-slate-300 border-slate-600';
  return <span className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${cls}`}>{children}</span>;
};

export const MorchidiDigitalModal: React.FC<Props> = ({ isOpen, onClose, initialTab = 'dashboard' }) => {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const copy = async (text: string, id: string) => {
    if (await copyToClipboard(text)) { setCopied(id); setTimeout(() => setCopied(null), 1800); }
  };

  const fmt = (n: number) => n.toLocaleString('fr-FR');

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto p-2 sm:p-6" role="dialog" aria-modal="true" aria-label="Morchidi Digital — Tableau de bord unifié">
      <div className="w-full max-w-6xl bg-slate-950 border border-emerald-700/50 rounded-2xl shadow-2xl my-4">
        {/* Header — identité depuis LEGAL_IDENTITY (source unique) */}
        <div className="flex items-start justify-between gap-4 px-5 py-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-b border-emerald-700/40 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-amber-300 font-serif text-xl">م</div>
            <div>
              <div className="text-lg font-black tracking-wide text-amber-300">MORCHIDI DIGITAL</div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Tableau de bord unifié — AGENT_SYNC</div>
              <div className="text-[11px] text-slate-300 mt-1">
                {LEGAL_IDENTITY.founderName} · {LEGAL_IDENTITY.matricule} · ICE {LEGAL_IDENTITY.iceNumber} · IF {LEGAL_IDENTITY.ifNumber} · {LEGAL_IDENTITY.isocNumber}
                {LEGAL_IDENTITY.officialEmail && <> · <a className="text-emerald-300 underline" href={`mailto:${LEGAL_IDENTITY.officialEmail}`}>{LEGAL_IDENTITY.officialEmail}</a></>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge>● AGENT_SYNC ACTIF</Badge>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-300" aria-label="Fermer"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 px-4 py-2 bg-slate-900/80 border-b border-slate-800">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${tab === t.id ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50' : 'text-slate-300 hover:bg-slate-800'}`}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6 space-y-5 text-slate-200">
          {/* Bandeau doctrinal commun */}
          <div className="text-[11px] font-mono text-amber-200/90 bg-amber-950/40 border border-amber-500/30 rounded-lg px-3 py-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" /> {BUREAU_DES_METHODES_LABEL}
          </div>

          {tab === 'dashboard' && (
            <>
              <SectionTitle>📊 Vue d’ensemble — Morchidi Digital</SectionTitle>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { v: `${fmt(MD_BUDGET.budgetOptimalUSD)} USD`, l: 'Budget optimal', s: 'Déclaré' },
                  { v: `${MD_BUDGET.roiPct.toLocaleString('fr-FR')} %`, l: 'ROI', s: 'Déclaré — non audité' },
                  { v: `${MD_AGENTS.length}`, l: 'Agents actifs', s: 'Synchronisés' },
                  { v: `${MD_BUREAUX.length}`, l: 'Bureaux des méthodes', s: 'Opérationnels' },
                ].map(k => (
                  <Card key={k.l} className="text-center">
                    <div className="text-2xl font-black text-amber-300">{k.v}</div>
                    <div className="text-[11px] uppercase text-slate-400 mt-1">{k.l}</div>
                    <div className="text-[11px] text-emerald-300 mt-0.5">↑ {k.s}</div>
                  </Card>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <div className="text-xs font-bold text-amber-300 mb-3">⚡ LIAISON AVEC LE HUB (source unique)</div>
                  <ul className="text-xs space-y-1.5">
                    <li>Inventaire d’apport : <strong>{INVENTAIRE_REEL_APPORT.length} actifs</strong> · {fmt(OBJ_TOTAL_EFFORT_HEURES)} h déclarées</li>
                    <li>Valeur analysée : <strong className="text-amber-300">{OBJ_VALEUR_APPORT_NATURE_FORMATTED}</strong> — soumise à l’appréciation du commissaire aux apports</li>
                    <li>Domaine : <span className="font-mono">{LEGAL_IDENTITY.officialDomain}</span></li>
                    <li>Coordonnées bancaires : <span className="font-mono">{LEGAL_IDENTITY.rib}</span> (masquées)</li>
                  </ul>
                </Card>
                <Card>
                  <div className="text-xs font-bold text-amber-300 mb-3">📈 PROGRESSION GLOBALE</div>
                  {MD_PROGRESS.map(p => (
                    <div key={p.label} className="mb-2">
                      <div className="flex justify-between text-[11px]"><span>{p.label}</span><span className="text-amber-300 font-mono">{p.pct} %</span></div>
                      <div className="h-1.5 rounded bg-slate-800 mt-1"><div className="h-1.5 rounded bg-gradient-to-r from-emerald-500 to-amber-400" style={{ width: `${p.pct}%` }} /></div>
                    </div>
                  ))}
                </Card>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">Origine : {MD_ORIGIN.fichier} ({MD_ORIGIN.dateCreation}, {MD_ORIGIN.lignes} lignes) — recyclé le {MD_ORIGIN.recycleLe}. {MD_ORIGIN.note}</div>
            </>
          )}

          {tab === 'agents' && (
            <>
              <SectionTitle>🤖 Agent Orchestra — {MD_AGENTS.length} agents déclarés</SectionTitle>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {MD_AGENTS.map(a => (
                  <Card key={a.code}>
                    <div className="flex justify-between items-start"><span className="font-mono text-xs font-bold text-amber-300">{a.code}</span><span className="text-sm text-slate-300" dir="rtl">{a.arabic}</span></div>
                    <div className="font-bold mt-2">{a.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{a.desc}</div>
                    <div className="mt-2"><Badge>● ACTIF — {STATUS_LABEL[a.status]}</Badge></div>
                  </Card>
                ))}
              </div>
            </>
          )}

          {tab === 'sync' && (
            <>
              <SectionTitle>🔄 AGENT_SYNC — فَرِيقُ الْمُزَامَنَةِ</SectionTitle>
              <Card>
                <div className="text-xs font-bold text-amber-300 mb-3">FLUX DE SYNCHRONISATION COMPLET</div>
                <div className="space-y-2">
                  {MD_SYNC_NODES.map((n, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 rounded-lg border border-slate-700/60 bg-slate-950/60 px-3 py-2">
                      <div className="flex items-center gap-3"><span className="text-lg">{n.icon}</span><div><div className="text-xs font-bold">{n.title}</div><div className="text-[11px] text-slate-400">{n.detail}</div></div></div>
                      <Badge>● {n.badge}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <div className="text-xs font-bold text-amber-300 mb-3">COMPOSANTS SYNCHRONISÉS (ordinateur ↔ smartphone)</div>
                <table className="w-full text-[11px]">
                  <thead><tr className="text-slate-400 text-left"><th className="py-1">Composant</th><th>Ordinateur</th><th>Smartphone</th><th>Statut</th></tr></thead>
                  <tbody>{MD_SYNC_COMPONENTS.map(c => <tr key={c.nom} className="border-t border-slate-800"><td className="py-1.5 font-semibold">{c.nom}</td><td>{c.ordi}</td><td>{c.phone}</td><td className="text-emerald-300">✅ Synchronisé</td></tr>)}</tbody>
                </table>
              </Card>
            </>
          )}

          {tab === 'tribank' && (
            <>
              <SectionTitle>🏦 Tri-Bank — {MD_BANKS.length} comptes</SectionTitle>
              <Card className="text-center">
                <div className="text-4xl font-black text-amber-300">{MD_BUDGET.roiPct.toLocaleString('fr-FR')} %</div>
                <div className="text-xs text-slate-400 mt-1">ROI — Budget optimal : {fmt(MD_BUDGET.budgetOptimalUSD)} USD — Encaissement : ●●●●●● USD</div>
                <div className="mt-2"><Badge tone="amber">{MD_BUDGET.statut}</Badge></div>
              </Card>
              <div className="grid sm:grid-cols-2 gap-3">
                {MD_BANKS.map(b => (
                  <div key={b.id} className={`rounded-xl p-4 bg-gradient-to-br ${b.gradient} border border-white/10`}>
                    <div className="flex justify-between"><div className="font-bold">{b.name}</div><Lock className="w-4 h-4 opacity-70" /></div>
                    <div className="text-[10px] uppercase tracking-wide opacity-80">{b.kind} — {b.currency}</div>
                    <div className="text-xl font-black mt-3">●●●●●● {b.currency === 'Variable' ? '' : b.currency.split(' ')[0]}</div>
                    <div className="text-[11px] opacity-80 mt-1">{b.note}</div>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-slate-400">Aucun numéro de compte, aucun solde n’est présent dans le code de cette page. Coordonnées CIH sur demande formelle : {LEGAL_IDENTITY.rib}.</div>
            </>
          )}

          {tab === 'roles' && (
            <>
              <SectionTitle>👥 Smart Tri-Rôles — Autorisation &amp; Gouvernance</SectionTitle>
              <div className="grid md:grid-cols-3 gap-3">
                {MD_ROLES.map(r => (
                  <Card key={r.name} className="text-center">
                    <div className="text-3xl">{r.icon}</div>
                    <div className="font-bold mt-1">{r.name}</div>
                    <div className="text-3xl font-black text-amber-300">{r.pct} %</div>
                    <div className="text-xs text-emerald-300 mb-2">{r.holder}</div>
                    <ul className="text-[11px] text-slate-300 space-y-0.5">{r.items.map(i => <li key={i}>{i}</li>)}</ul>
                  </Card>
                ))}
              </div>
              <div className="text-[11px] text-slate-400">Séquence du fondateur : Fondateur visionnaire · Conseiller Référent · Secrétaire Général — {LEGAL_IDENTITY.founderName}, agissant suite à un constat (inflation, perte de valeur) et à un préjudice subi, à titre de facilitation.</div>
            </>
          )}

          {tab === 'bureaux' && (
            <>
              <SectionTitle>🏛️ Les {MD_BUREAUX.length} Bureaux des méthodes — au service de…</SectionTitle>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {MD_BUREAUX.map(b => {
                  const header = rapportHeader(b.appreciation);
                  return (
                    <Card key={b.code}>
                      <div className="flex justify-between items-start">
                        <div className="font-mono font-black text-amber-300">{b.emoji} {b.code}</div>
                        <button onClick={() => copy(header, b.code)} title="Copier l’en-tête de rapport" className="p-1 rounded hover:bg-slate-800 text-slate-400">
                          {copied === b.code ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <div className="text-sm font-semibold mt-1">Bureau des méthodes — au service {b.metier}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">ancien libellé : {b.ancien}</div>
                      <div className="text-[11px] text-slate-300 mt-2 flex gap-1.5"><FileText className="w-3.5 h-3.5 shrink-0 mt-0.5" /><span>{header}</span></div>
                    </Card>
                  );
                })}
              </div>
            </>
          )}

          {tab === 'pnud' && (
            <>
              <SectionTitle>🌍 PNUD — Template &amp; Formulaire</SectionTitle>
              <div className="grid md:grid-cols-2 gap-3">
                {MD_PNUD_SECTIONS.map(s => (
                  <Card key={s.title}>
                    <div className="text-xs font-bold text-amber-300 mb-2">{s.title}</div>
                    <ul className="text-[12px] space-y-1">{s.items.map(i => <li key={i} className="border-b border-slate-800/80 pb-1">→ {i}</li>)}</ul>
                  </Card>
                ))}
              </div>
              <div className="text-[11px] text-slate-400">Formulaire préparatoire. Aucun financement PNUD n’est acquis ni « certifié » : la demande est en cours d’instruction. Contact : {LEGAL_IDENTITY.officialEmail}.</div>
            </>
          )}

          {tab === 'azure' && (
            <>
              <SectionTitle>☁️ Azure — Infrastructure cloud (réserve)</SectionTitle>
              <div className="rounded-xl p-4 bg-gradient-to-r from-sky-800 to-sky-600 border border-white/10">
                <div className="font-bold">Microsoft Azure — {MD_AZURE.account}</div>
                <div className="text-3xl font-black mt-1">{fmt(MD_AZURE.creditsUSD)},00 $US</div>
                <div className="text-[11px] opacity-80">Crédits — expiration {MD_AZURE.expiry}</div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-3">
                  {MD_AZURE.services.map(s => <div key={s.name} className="rounded-lg bg-white/10 p-2 text-center"><div className="text-xs font-bold">{s.name}</div><div className="text-[10px] opacity-80">{s.sub}</div></div>)}
                </div>
              </div>
              <Card>
                <div className="text-xs font-bold text-amber-300 mb-3">🚀 PLAN DE DÉPLOIEMENT — MODE OPÉRATOIRE</div>
                <div className="space-y-2">{MD_AZURE.plan.map((p, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 rounded-lg border border-slate-700/60 px-3 py-2">
                    <div className="flex items-center gap-3"><span className="w-6 h-6 rounded bg-sky-600 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span><div><div className="text-xs font-bold">{p.step}</div><div className="text-[11px] text-slate-400">{p.detail}</div></div></div>
                    <Badge tone="slate">{p.tag}</Badge>
                  </div>))}</div>
              </Card>
            </>
          )}

          {tab === 'securite' && (
            <>
              <SectionTitle>🔒 Sécurité — AGENT_SEC &amp; IAP</SectionTitle>
              <div className="grid md:grid-cols-2 gap-3">
                <Card>
                  <div className="text-xs font-bold text-amber-300 mb-2">COUCHES DE PROTECTION</div>
                  {MD_SECURITY_LAYERS.map((l, i) => (
                    <div key={l.name} className="flex items-center justify-between rounded-lg border border-emerald-700/40 px-3 py-2 mb-2">
                      <div><div className="text-xs font-bold text-emerald-300">{l.name}</div><div className="text-[11px] text-slate-400">{l.detail}</div></div>
                      <Badge tone="slate">Layer {i + 1}</Badge>
                    </div>
                  ))}
                </Card>
                <div className="space-y-3">
                  <Card className="border-rose-700/40">
                    <div className="text-xs font-bold text-rose-300 mb-2">CACHÉ — NON EXPOSÉ (absent du code)</div>
                    <ul className="text-[12px] space-y-1">{MD_PROTECTED_DATA.map(d => <li key={d}>→ {d} : ●●●●●●</li>)}</ul>
                  </Card>
                  <Card className="border-emerald-700/40">
                    <div className="text-xs font-bold text-emerald-300 mb-2">VISIBLE — IDENTIFIANTS PROFESSIONNELS</div>
                    <ul className="text-[12px] space-y-1">
                      <li>Nom : {LEGAL_IDENTITY.founderName}</li>
                      <li>RC : {LEGAL_IDENTITY.rcNumber}</li>
                      <li>ICE : {LEGAL_IDENTITY.iceNumber} · IF : {LEGAL_IDENTITY.ifNumber}</li>
                      <li>{LEGAL_IDENTITY.isocNumber}</li>
                      <li>E-mail : {LEGAL_IDENTITY.officialEmail}</li>
                      <li>Pays : Maroc · Juridiction : Tribunal de Commerce de Settat</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="px-5 py-3 border-t border-slate-800 text-[11px] text-slate-500 flex flex-wrap justify-between gap-2 rounded-b-2xl">
          <span>© {new Date().getFullYear()} {LEGAL_IDENTITY.founderName} — {LEGAL_IDENTITY.matricule} — {LEGAL_IDENTITY.officialDomain}</span>
          <span className="font-mono">#morchidi-digital</span>
        </div>
      </div>
    </div>
  );
};
