import React, { useState } from 'react';
import { X, FolderCheck, Clock, Layers, ListChecks, ShieldCheck, Mail, Copy, Check, Scale } from 'lucide-react';
import { LEGAL_IDENTITY } from '../data/servicesData';
import {
  APPORT_LABEL, APPORT_BASE_LEGALE, CHRONOLOGIE_APPORT, JALON_TYPE_LABEL, COMPTEURS_APPORT,
  STRATES_PREUVE, TAUX_DECLARES, ETAPES_DOSSIER, ETAT_LABEL, APPORT_MAIL_SUBJECT,
} from '../data/dossierApportData';
import { copyToClipboard, getFullDeepLink } from '../utils/deepLink';

type Tab = 'avancement' | 'chronologie' | 'methode' | 'demande';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'avancement', label: 'Avancement', icon: <ListChecks className="w-3.5 h-3.5" /> },
  { id: 'chronologie', label: 'Chronologie', icon: <Clock className="w-3.5 h-3.5" /> },
  { id: 'methode', label: 'Méthode', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'demande', label: 'Demander le dossier', icon: <Mail className="w-3.5 h-3.5" /> },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-xl border border-slate-700/70 bg-slate-900/70 p-4 ${className}`}>{children}</div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-base font-bold text-amber-300 flex items-center gap-2 mb-3 pb-2 border-b border-amber-500/20">{children}</h3>
);

const etatTone: Record<string, string> = {
  fait: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  en_cours: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
  pret: 'bg-sky-500/15 text-sky-300 border-sky-500/40',
  a_faire: 'bg-slate-700/40 text-slate-300 border-slate-600',
};

const preuveTone: Record<string, string> = {
  S1: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  S2: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
  S3: 'bg-slate-700/40 text-slate-300 border-slate-600',
};

const fmtDate = (d: string) => {
  const [y, m, day] = d.split('-');
  if (!m) return y;
  const mois = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'][parseInt(m, 10) - 1];
  return day ? `${parseInt(day, 10)} ${mois} ${y}` : `${mois} ${y}`;
};

export const DossierApportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<Tab>('avancement');
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const copy = async (text: string, id: string) => {
    if (await copyToClipboard(text)) { setCopied(id); setTimeout(() => setCopied(null), 1800); }
  };

  const mailBody = `Bonjour,\n\nJe souhaite recevoir le dossier d'apport en nature en cours de préparation (inventaire des travaux, pièces datées, note de méthode MOC/MOC+), en vue de son examen.\n\nQualité du demandeur : (commissaire aux apports / expert-comptable / notaire / partenaire / autre)\nOrganisme :\nRéférence du dossier : ${LEGAL_IDENTITY.matricule} — ICE ${LEGAL_IDENTITY.iceNumber}\n\nCordialement,`;
  const mailto = `mailto:${LEGAL_IDENTITY.officialEmail}?subject=${encodeURIComponent(APPORT_MAIL_SUBJECT)}&body=${encodeURIComponent(mailBody)}`;

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto p-2 sm:p-6" role="dialog" aria-modal="true" aria-label="Dossier d’apport — état d’avancement">
      <div className="w-full max-w-5xl bg-slate-950 border border-amber-700/50 rounded-2xl shadow-2xl my-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 py-4 bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 border-b border-amber-700/40 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-amber-300">
              <FolderCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-black tracking-wide text-amber-300">DOSSIER D’APPORT EN NATURE</div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">État d’avancement — inventaire en cours d’évaluation</div>
              <div className="text-[11px] text-slate-300 mt-1">
                {LEGAL_IDENTITY.founderName} · {LEGAL_IDENTITY.matricule} · ICE {LEGAL_IDENTITY.iceNumber} · IF {LEGAL_IDENTITY.ifNumber} · {LEGAL_IDENTITY.isocNumber}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-300" aria-label="Fermer"><X className="w-5 h-5" /></button>
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
          {/* Bandeau doctrinal */}
          <div className="text-[11px] font-mono text-amber-200/90 bg-amber-950/40 border border-amber-500/30 rounded-lg px-3 py-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" /> {APPORT_LABEL}
          </div>

          {tab === 'avancement' && (
            <>
              <SectionTitle>📊 Où en est le dossier</SectionTitle>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {COMPTEURS_APPORT.map(k => (
                  <Card key={k.libelle} className="text-center">
                    <div className="text-2xl font-black text-amber-300">{k.valeur}</div>
                    <div className="text-[11px] uppercase text-slate-400 mt-1">{k.libelle}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">{k.precision}</div>
                  </Card>
                ))}
              </div>

              <Card>
                <div className="text-xs font-bold text-slate-300 mb-3">Les cinq étapes du dossier remis au commissaire aux apports</div>
                <ol className="space-y-2">
                  {ETAPES_DOSSIER.map(e => (
                    <li key={e.n} className="flex items-start gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-600 text-[11px] font-mono flex items-center justify-center shrink-0">{e.n}</span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-slate-100">{e.titre}</span>
                          <span className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${etatTone[e.etat]}`}>{ETAT_LABEL[e.etat]}</span>
                        </div>
                        <div className="text-[12px] text-slate-400">{e.detail}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </Card>

              <div className="text-[11px] text-slate-400 flex items-start gap-2">
                <Scale className="w-4 h-4 shrink-0 text-amber-400" />
                <span>{APPORT_BASE_LEGALE}</span>
              </div>
            </>
          )}

          {tab === 'chronologie' && (
            <>
              <SectionTitle>🕰️ Chronologie établie par les pièces</SectionTitle>
              <p className="text-[12px] text-slate-400 -mt-2 mb-3">Chaque jalon correspond à un document daté conservé hors ligne et présenté au commissaire. Aucun nom de fichier ni contenu n’est publié ici.</p>
              <ol className="relative border-l border-slate-700 ml-3 space-y-4">
                {CHRONOLOGIE_APPORT.map((j, i) => (
                  <li key={i} className="ml-5">
                    <span className="absolute -left-[7px] mt-1.5 w-3 h-3 rounded-full bg-amber-400 border-2 border-slate-950" />
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] text-amber-300">{fmtDate(j.date)}</span>
                      <span className="text-[10px] uppercase text-slate-500">{JALON_TYPE_LABEL[j.type]}</span>
                      <span className={`inline-block text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${preuveTone[j.preuve]}`}>{j.preuve}</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-100">{j.titre}</div>
                    <div className="text-[12px] text-slate-400">{j.detail}</div>
                  </li>
                ))}
              </ol>
            </>
          )}

          {tab === 'methode' && (
            <>
              <SectionTitle>🧭 Trois strates de preuve</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {STRATES_PREUVE.map(s => (
                  <Card key={s.code}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-block text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${preuveTone[s.code]}`}>{s.code}</span>
                      <span className="font-semibold text-slate-100 text-sm">{s.nom}</span>
                    </div>
                    <div className="text-[12px] text-slate-300">{s.definition}</div>
                    <div className="text-[11px] text-slate-500 mt-2">Ex. : {s.exemple}</div>
                  </Card>
                ))}
              </div>
              <Card>
                <div className="text-xs font-bold text-slate-300 mb-2">Unité et taux déclarés</div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="text-xl font-black text-amber-300">{TAUX_DECLARES.mocMADh} MAD/h</div>
                    <div className="text-[11px] uppercase text-slate-400">MOC — exécution</div>
                  </div>
                  <div>
                    <div className="text-xl font-black text-amber-300">{TAUX_DECLARES.mocPlusMADh} MAD/h</div>
                    <div className="text-[11px] uppercase text-slate-400">MOC+ — conception</div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-3">{TAUX_DECLARES.note}</p>
              </Card>
              <Card className="border-rose-700/40">
                <div className="text-xs font-bold text-rose-300 mb-1">Ce que ce portail ne publie pas</div>
                <ul className="text-[12px] text-slate-300 space-y-1">
                  <li>→ Aucun montant d’apport « certifié » : la valeur est réservée au rapport du commissaire.</li>
                  <li>→ Aucune donnée d’état civil, aucune coordonnée bancaire, aucune clé d’accès.</li>
                  <li>→ Aucun nom de fichier : les pièces sont remises sur demande motivée.</li>
                </ul>
              </Card>
            </>
          )}

          {tab === 'demande' && (
            <>
              <SectionTitle>✉️ Demander le dossier ou l’attestation</SectionTitle>
              <p className="text-[12px] text-slate-300">Le dossier (inventaire, pièces datées, note de méthode) est remis aux commissaires aux apports, experts-comptables, notaires et partenaires qui en font la demande motivée. L’attestation sur l’honneur du fondateur est établie à l’issue de l’étape 3.</p>
              <div className="flex flex-wrap gap-2">
                <a href={mailto} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs">
                  <Mail className="w-4 h-4" /> Écrire à {LEGAL_IDENTITY.officialEmail}
                </a>
                <button onClick={() => copy(mailBody, 'body')} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs">
                  {copied === 'body' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} Copier le modèle de demande
                </button>
                <button onClick={() => copy(getFullDeepLink('apport'), 'link')} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs">
                  {copied === 'link' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} Copier le lien #apport
                </button>
              </div>
              <pre className="text-[11px] text-slate-400 bg-slate-900 border border-slate-800 rounded-lg p-3 whitespace-pre-wrap">{mailBody}</pre>
            </>
          )}
        </div>

        <div className="px-5 py-3 border-t border-slate-800 text-[11px] text-slate-500 flex flex-wrap justify-between gap-2 rounded-b-2xl">
          <span>© {new Date().getFullYear()} {LEGAL_IDENTITY.founderName} — {LEGAL_IDENTITY.matricule} — {LEGAL_IDENTITY.officialDomain}</span>
          <span className="font-mono">#apport</span>
        </div>
      </div>
    </div>
  );
};
