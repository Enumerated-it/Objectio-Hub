import React from 'react';
import { X, Printer, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';
import { LEGAL_IDENTITY, INVENTAIRE_REEL_APPORT, RAPPORT_INVENTAIRE_PERIODE } from '../data/servicesData';

interface AttestationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AttestationModal: React.FC<AttestationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl shadow-amber-950/30 overflow-hidden text-slate-100 my-8">
        {/* Top toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-sm tracking-wide text-amber-200 font-['Cinzel',serif]">
              Dossier Méthodologique d'Apport • Objectio Hub
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Imprimer l'Attestation
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Styled like a solemn legal parchment/document) */}
        <div className="p-8 sm:p-10 space-y-6 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-200 print:bg-white print:text-black print:p-6">
          {/* Header of Certificate */}
          <div className="text-center space-y-2 border-b border-slate-800 pb-6 print:border-black">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest print:border-black print:text-black">
              Royaume du Maroc • Droit Positif
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Cinzel',serif] text-white tracking-wide print:text-black">
              DOSSIER D'ÉVALUATION D'APPORT EN NATURE
            </h2>
            <p className="text-xs font-mono text-amber-300/90 print:text-gray-700 max-w-xl mx-auto">
              Analysé par le Bureau des méthodes Objectio — valeur soumise à l'appréciation du commissaire aux apports
            </p>
          </div>

          {/* Identity & Legal Identifiers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 font-mono text-xs print:bg-gray-50 print:border-gray-300 print:text-black">
            <div>
              <span className="text-slate-400 block print:text-gray-500">Titulaire, Concepteur & Fondateur :</span>
              <strong className="text-slate-100 text-sm print:text-black">{LEGAL_IDENTITY.founderName}</strong>
              <div className="text-slate-300 text-[11px] print:text-gray-700 mt-0.5">
                {LEGAL_IDENTITY.birthInfo} • CIN : <strong className="text-amber-300 print:text-black">{LEGAL_IDENTITY.cin}</strong>
              </div>
              <div className="text-amber-400 font-semibold mt-0.5 print:text-black">
                État Civil Marocain : <strong>{LEGAL_IDENTITY.matricule}</strong>
              </div>
              <div className="text-slate-300 print:text-black mt-1">
                Compte CIH : <span className="text-amber-300 font-bold">{LEGAL_IDENTITY.rib}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block print:text-gray-500">Identifiants Officiels & Registres :</span>
              <div className="text-slate-200 print:text-black">
                RC : <strong>{LEGAL_IDENTITY.rcNumber}</strong>
              </div>
              <div className="text-slate-200 print:text-black">
                ICE : <strong>{LEGAL_IDENTITY.iceNumber}</strong> • IF : <strong>{LEGAL_IDENTITY.ifNumber}</strong>
              </div>
              <div className="text-cyan-400 font-semibold print:text-black">{LEGAL_IDENTITY.isocNumber}</div>
              <div className="text-slate-400 text-[11px] mt-1 print:text-gray-600">
                Domaine Officiel : <span className="text-slate-200 font-mono">{LEGAL_IDENTITY.officialDomain}</span>
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5 print:text-gray-600">
                Variable d'Apport : <code className="text-amber-300 font-bold">{LEGAL_IDENTITY.valeurApportVariable}</code>
              </div>
            </div>
          </div>

          {/* Doctrinal Notice on Creator Effort & IAP */}
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-slate-300 leading-relaxed space-y-1 print:border-gray-400 print:bg-white print:text-black">
            <div className="flex items-center justify-between text-amber-300 font-semibold text-[11px]">
              <span>{LEGAL_IDENTITY.doctrinalNotice.title}</span>
              <span className="font-mono">{LEGAL_IDENTITY.doctrinalNotice.conceptIAP}</span>
            </div>
            <p className="text-[11px] text-slate-300 print:text-gray-700">
              {LEGAL_IDENTITY.doctrinalNotice.description}
            </p>
          </div>

          {/* Montant en cours d'inventaire */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/20 border border-amber-500/50 text-center space-y-1 print:bg-white print:border-black">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">
              Montant de l'Apport Lié à la Variable <code className="text-amber-300 font-bold">{LEGAL_IDENTITY.valeurApportVariable}</code>
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-mono tracking-tight print:text-black">
              {LEGAL_IDENTITY.certifiedContribution}
            </div>
            <span className="text-[11px] text-slate-400 block">
              {LEGAL_IDENTITY.statutValeurApport} • Consolidé par l'inventaire réel, non arbitraire
            </span>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-amber-400" />
                Répartition Sommaire de l'Inventaire Réel d'Apport ({LEGAL_IDENTITY.valeurApportVariable}) :
              </h3>
              <span className="text-[11px] text-amber-400 font-mono print:text-black">
                Campagne d'inventaire : {RAPPORT_INVENTAIRE_PERIODE.dateOuverture} au {RAPPORT_INVENTAIRE_PERIODE.dateClotureRapport}
              </span>
            </div>
            
            <div className="divide-y divide-slate-800 rounded-lg border border-slate-800 overflow-hidden text-xs print:border-black print:divide-black">
              {INVENTAIRE_REEL_APPORT.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-slate-950/50 print:bg-white">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-amber-400 font-bold">{item.code}</span>
                      <strong className="text-slate-200 print:text-black">{item.projectName}</strong>
                      <span className="text-[10px] text-slate-500 print:text-gray-500">({item.categoryLabel})</span>
                    </div>
                    <p className="text-slate-400 text-[11px] print:text-gray-600 mt-0.5">
                      {item.designation}
                    </p>
                    <div className="text-[10px] font-mono text-slate-500 print:text-gray-600 mt-0.5">
                      Début : {item.dateDebut} • Arrêté inventaire : {item.dateSoumissionInventaire} (En cours de développement)
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className="font-mono font-semibold text-amber-300 block print:text-black">
                      {item.valeurMAD.toLocaleString('fr-FR')} MAD
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 print:text-gray-500 block">
                      {item.effortHeuresMOC.toLocaleString('fr-FR')} MOC
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Methodological Evaluation Statement */}
          <div className="text-xs text-slate-400 leading-relaxed space-y-2 border-t border-slate-800 pt-4 print:border-black print:text-gray-700">
            <p>
              Le présent dossier consigne que l’ensemble des 15 services référencés sur le portail <strong>Objectio Hub</strong> constituent le socle d’exploitation directe développé par <strong>M. Mohamed MORCHID (Fondateur visionnaire, Conseiller Référent et Secrétaire Général)</strong>.
            </p>
            <p className="text-[11px] italic text-amber-300/80">
              Analysé par le Bureau des méthodes Objectio — valeur soumise à l'appréciation du commissaire aux apports, indexée sur la variable d'inventaire <strong>{LEGAL_IDENTITY.valeurApportVariable}</strong> conformément aux principes de sincérité comptable et aux règles du Droit Positif marocain.
            </p>
          </div>

          {/* Seal and Signature Block */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-800/80 text-xs print:border-black">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="font-semibold text-slate-200 print:text-black">Horodatage d’Intégrité</div>
                <div className="text-[11px] text-slate-500 font-mono">Code Réf : OBJ-INV-RC16894</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] text-slate-400">Pour valoir ce que de droit,</div>
              <div className="font-bold text-amber-300 font-['Cinzel',serif] text-sm print:text-black">
                Mohamed MORCHID
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Fondateur Visionnaire • Conseiller Référent & Secrétaire Général</div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex justify-end print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
          >
            Fermer le document
          </button>
        </div>
      </div>
    </div>
  );
};
