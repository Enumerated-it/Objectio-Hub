import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Building, 
  FileText, 
  DollarSign, 
  Send, 
  ShieldCheck, 
  Globe, 
  Smartphone, 
  Laptop, 
  Clock, 
  Award, 
  CheckCircle2, 
  ExternalLink,
  HelpCircle,
  TrendingUp,
  Sparkles,
  Printer,
  FileCheck2,
  Calculator,
  Scale,
  UserCheck,
  BarChart3,
  Target,
  Compass,
  Mail,
  Inbox,
  AtSign
} from 'lucide-react';
import { 
  LEGAL_IDENTITY, 
  BNC_ACCOUNT_DATA, 
  MULTI_DEVICE_BUILD_EFFORT, 
  INTERNATIONAL_INVOICE_DEFAULT 
} from '../data/servicesData';
import { 
  TRANSMISSION_RECIPIENTS, 
  RecipientKey,
  SENDER_OFFICIAL_EMAIL,
  PRIVATE_EMAIL_LOGIN_URL
} from '../data/transmissionLetters';
import { copyToClipboard } from '../utils/deepLink';
import { BusinessPlanWorkbench } from './interactive/ServiceWorkbenches';

interface InternationalBillingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InternationalBillingModal: React.FC<InternationalBillingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'letter' | 'invoice' | 'strategy' | 'business_plan' | 'build_audit'>('letter');
  const [recipientChoice, setRecipientChoice] = useState<RecipientKey>('pnud');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [customEmail, setCustomEmail] = useState<string>('');

  if (!isOpen) return null;

  const currentRecipient = TRANSMISSION_RECIPIENTS[recipientChoice] || TRANSMISSION_RECIPIENTS.pnud;
  const effectiveRecipientEmail = customEmail.trim() || currentRecipient.suggestedEmail;

  const handleCopyText = async (text: string, sectionId: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedSection(sectionId);
      setTimeout(() => setCopiedSection(null), 3500);
    }
  };

  const getOfficialTransmissionLetter = () => {
    return currentRecipient.generateLetter();
  };

  const handleOpenMailClient = async () => {
    const fullLetter = getOfficialTransmissionLetter();
    await copyToClipboard(fullLetter);
    setCopiedSection('mail-copied');

    const subject = currentRecipient.subject;
    const mailtoBody = `De la part de : Mohamed MORCHID <${SENDER_OFFICIAL_EMAIL}>
Cabinet de Consulting BMM* — Settat (Royaume du Maroc)
Réf Dossier : ${currentRecipient.reference}

DESTINATAIRE OFFICIEL :
${currentRecipient.name}
${currentRecipient.division}
${currentRecipient.salutation}

OBJET :
${subject}

[NOTE DE TRANSMISSION : L'intégralité du texte juridique officiel de la lettre, l'état civil certifié (964 R/1970) et les coordonnées bancaires BNC (Compte 11-496-06) ont été automatiquement copiés dans votre presse-papiers. Vous pouvez faire Ctrl+V pour les coller directement ci-dessous.]

--- DÉBUT DE LA LETTRE OFFICIELLE CERTIFIÉE BMM* ---
${fullLetter.slice(0, 900)}...
[Suite complète dans le presse-papiers ou en pièce jointe]
--- FIN DE L'EXTRAIT ---`;

    const mailtoUrl = `mailto:${encodeURIComponent(effectiveRecipientEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;
    window.location.href = mailtoUrl;
    setTimeout(() => setCopiedSection(null), 4000);
  };

  const handleOpenGmail = async () => {
    const fullLetter = getOfficialTransmissionLetter();
    await copyToClipboard(fullLetter);
    setCopiedSection('gmail-copied');

    const subject = currentRecipient.subject;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(effectiveRecipientEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullLetter.slice(0, 1400))}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setTimeout(() => setCopiedSection(null), 4000);
  };

  const handleOpenPrivateEmail = async () => {
    const fullLetter = getOfficialTransmissionLetter();
    await copyToClipboard(fullLetter);
    setCopiedSection('privateemail-copied');

    window.open(PRIVATE_EMAIL_LOGIN_URL, '_blank', 'noopener,noreferrer');
    setTimeout(() => setCopiedSection(null), 5000);
  };

  const getInvoiceFormattedText = () => {
    return `================================================================================
NOTE D'HONORAIRES & FACTURE INTERNATIONALE CERTIFIÉE BMM*
================================================================================
Facture N° : ${INTERNATIONAL_INVOICE_DEFAULT.invoiceNumber}
Date d'Émission : ${INTERNATIONAL_INVOICE_DEFAULT.dateEmission}
Devise : Dollar Américain (USD) / Équivalent MAD

ÉMETTEUR :
Cabinet de Consulting Mohamed MORCHID (Sigle d'Expertise BMM*)
Titulaire : Mohamed MORCHID (État Civil 964 R/1970 • CIN BK71155)
RC 16894 Settat • ICE 003707910000033 • IF 14412126
Internet Society ISOC N° 2374734
Settat (Royaume du Maroc)

COORDONNÉES BANCAIRES POUR RÈGLEMENT INTERNATIONAL (DEVISES) :
Banque : BANQUE NATIONALE DU CANADA (BNC / National Bank of Canada)
Numéro de Compte : ${BNC_ACCOUNT_DATA.accountNumber}
Titulaire : Mohamed MORCHID

DESTINATAIRE :
${currentRecipient.name}
${currentRecipient.division}

DÉTAIL DES PRESTATIONS INTELLECTUELLES ET D'INFRASTRUCTURE :
--------------------------------------------------------------------------------
1. ${INTERNATIONAL_INVOICE_DEFAULT.lines[0].description}
   Heures : ${INTERNATIONAL_INVOICE_DEFAULT.lines[0].effortHeures}h | Taux : $${INTERNATIONAL_INVOICE_DEFAULT.lines[0].tauxHoraireUSD}/h
   Montant : $${INTERNATIONAL_INVOICE_DEFAULT.lines[0].montantUSD} USD (Équiv. ${INTERNATIONAL_INVOICE_DEFAULT.lines[0].equivalentMAD.toLocaleString()} MAD)

2. ${INTERNATIONAL_INVOICE_DEFAULT.lines[1].description}
   Heures : ${INTERNATIONAL_INVOICE_DEFAULT.lines[1].effortHeures}h | Taux : $${INTERNATIONAL_INVOICE_DEFAULT.lines[1].tauxHoraireUSD}/h
   Montant : $${INTERNATIONAL_INVOICE_DEFAULT.lines[1].montantUSD} USD (Équiv. ${INTERNATIONAL_INVOICE_DEFAULT.lines[1].equivalentMAD.toLocaleString()} MAD)

3. ${INTERNATIONAL_INVOICE_DEFAULT.lines[2].description}
   Heures : ${INTERNATIONAL_INVOICE_DEFAULT.lines[2].effortHeures}h | Taux : $${INTERNATIONAL_INVOICE_DEFAULT.lines[2].tauxHoraireUSD}/h
   Montant : $${INTERNATIONAL_INVOICE_DEFAULT.lines[2].montantUSD} USD (Équiv. ${INTERNATIONAL_INVOICE_DEFAULT.lines[2].equivalentMAD.toLocaleString()} MAD)

4. ${INTERNATIONAL_INVOICE_DEFAULT.lines[3].description}
   Forfait : $${INTERNATIONAL_INVOICE_DEFAULT.lines[3].montantUSD} USD (Équiv. ${INTERNATIONAL_INVOICE_DEFAULT.lines[3].equivalentMAD.toLocaleString()} MAD)
--------------------------------------------------------------------------------
TOTAL FACTURÉ : $${INTERNATIONAL_INVOICE_DEFAULT.totalUSD.toLocaleString()} USD
Équivalent MAD (Taux indicatif 10,00) : ${INTERNATIONAL_INVOICE_DEFAULT.totalMAD.toLocaleString()} MAD

MENTION LÉGALE :
Prestation exonérée de TVA locale au titre de l'exportation de services intellectuels et de consulting international.
Règlement attendu sur le compte BNC N° ${BNC_ACCOUNT_DATA.accountNumber}.`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl shadow-amber-950/40 overflow-hidden text-slate-100 my-4 max-h-[94vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-amber-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-['Cinzel',serif] truncate">
                  Accès Réservé : Fondateur & Secrétaire Général
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shrink-0">
                  Dossier BMM* • BNC 11-496-06
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Titulaire : Mohamed MORCHID (RC 16894 Settat, ICE 003707910000033) • Facilité Internationale & Prise en Charge PNUD
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Fermer le panneau de facturation internationale"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="px-5 py-2.5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              onClick={() => setActiveTab('letter')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'letter'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Lettre de Transmission (PNUD / Bailleurs)</span>
            </button>

            <button
              onClick={() => setActiveTab('invoice')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'invoice'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Facture Certifiée BMM* ($6 600 USD)</span>
            </button>

            <button
              onClick={() => setActiveTab('strategy')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'strategy'
                  ? 'bg-sky-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Mécanisme « 0,00 MAD Décaissé »</span>
            </button>

            <button
              onClick={() => setActiveTab('business_plan')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'business_plan'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Business Plan & Suivi Triennal</span>
            </button>

            <button
              onClick={() => setActiveTab('build_audit')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'build_audit'
                  ? 'bg-purple-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Cohérence Build Multi-Appareils (33h MOC)</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-sm">
          
          {/* TAB 1: LETTRE DE TRANSMISSION OFFICIELLE PERSONNALISÉE PAR OBJECTIF */}
          {activeTab === 'letter' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Recipient Switcher Header */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5 uppercase">
                      <Compass className="w-3.5 h-3.5 text-amber-400" />
                      <span>Destinataires Mentionnés dans le Mécanisme « 0,00 MAD Décaissé » :</span>
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Chaque partie dispose d'une lettre officielle rigoureusement rédigée selon son objectif institutionnel et ses critères d'attribution.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 shrink-0">
                    7 Lettres Spécifiques Déployées
                  </span>
                </div>

                {/* 7 Recipient Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 pt-1">
                  {(Object.keys(TRANSMISSION_RECIPIENTS) as RecipientKey[]).map((key) => {
                    const item = TRANSMISSION_RECIPIENTS[key];
                    const isSelected = recipientChoice === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setRecipientChoice(key)}
                        className={`p-2 rounded-lg text-left transition-all cursor-pointer border flex flex-col justify-between min-h-[56px] ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-400/80 text-amber-300 shadow-sm shadow-amber-950/40 font-bold'
                            : 'bg-slate-900/90 text-slate-400 border-slate-800/80 hover:bg-slate-850 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-xs font-semibold truncate block leading-tight">
                          {item.shortLabel}
                        </span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full mt-1 inline-block border truncate ${item.badgeStyle}`}>
                          {item.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Institutional Target Card */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-xs font-bold text-white font-mono">
                        Objectif Spécifique Assigné à cette Partie :
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      Réf : {currentRecipient.reference}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                    <strong className="text-amber-300">Mission & Finalité : </strong>
                    {currentRecipient.targetObjective}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400">
                    <div className="p-2 rounded bg-slate-950/70 border border-slate-850">
                      <span className="font-mono text-slate-400 text-[10px] block">ORGANISME & DIVISION CIBLÉE :</span>
                      <strong className="text-white text-xs">{currentRecipient.name}</strong>
                      <p className="text-slate-400 text-[10px] mt-0.5">{currentRecipient.division}</p>
                    </div>

                    <div className="p-2 rounded bg-slate-950/70 border border-slate-850">
                      <span className="font-mono text-slate-400 text-[10px] block">PROGRAMME & COUVERTURE :</span>
                      <strong className="text-white text-xs">{currentRecipient.programmeCible}</strong>
                      <p className="text-emerald-400 font-mono text-[10px] mt-0.5">
                        Règlement attendu sur BNC Compte N° {BNC_ACCOUNT_DATA.accountNumber} ({currentRecipient.montantNote})
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PANNEAU TRANSMISSION DIRECTE PAR MESSAGERIE (contact@morchidi.digital) */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950/40 border border-sky-500/30 space-y-3.5 shadow-md">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 border-b border-slate-800/80 pb-3">
                  <div className="flex items-start sm:items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 mt-0.5 sm:mt-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                          Action Directe de Transmission par Messagerie
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Expéditeur : {SENDER_OFFICIAL_EMAIL}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Ouvre instantanément votre messagerie avec l’objet officiel et le corps de lettre pré-chargés pour <strong>{currentRecipient.shortLabel}</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Input destinataire ajustable */}
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800">
                      <AtSign className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono text-slate-400 uppercase leading-none">E-mail Destinataire :</span>
                        <input
                          type="email"
                          value={customEmail}
                          onChange={(e) => setCustomEmail(e.target.value)}
                          placeholder={currentRecipient.suggestedEmail}
                          className="bg-transparent text-xs font-mono text-sky-300 placeholder:text-slate-400 focus:outline-none w-52 sm:w-64"
                          title="Vous pouvez ajuster l'adresse de destination si vous disposez d'un contact direct"
                        />
                      </div>
                    </div>
                    {/* Quick Suggestions for Canada & Registries */}
                    <div className="flex items-center gap-1 text-[9px] font-mono flex-wrap">
                      <span className="text-slate-400">Registres Recommandés :</span>
                      <button
                        type="button"
                        onClick={() => setCustomEmail('cooperation-internationale@international.gc.ca')}
                        className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-850 text-sky-400 hover:text-sky-300 border border-slate-800 cursor-pointer"
                        title="Affaires Mondiales Canada - Coopération Internationale"
                      >
                        Canada (GAC)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomEmail('canada.un@international.gc.ca')}
                        className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-850 text-sky-400 hover:text-sky-300 border border-slate-800 cursor-pointer"
                        title="Mission Permanente du Canada auprès des Nations Unies"
                      >
                        Mission Canada ONU
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomEmail('registry.ma@undp.org')}
                        className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
                        title="Registre PNUD Bureau Maroc"
                      >
                        PNUD Maroc
                      </button>
                    </div>
                  </div>
                </div>

                {/* Objet Officiel Pré-rempli */}
                <div className="px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-slate-400 truncate">
                    <span className="text-amber-400 font-bold uppercase text-[10px]">Objet Pré-rempli :</span>
                    <span className="text-slate-200 truncate">{currentRecipient.subject}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Note $6 600 USD • BNC 11-496-06
                  </span>
                </div>

                {/* 3 Boutons d'Action Directe */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5">
                  {/* Option 1: Client Messagerie par Défaut (Mailto) */}
                  <button
                    onClick={handleOpenMailClient}
                    className="p-3 rounded-lg bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-sky-400/80 text-left transition-all cursor-pointer group flex flex-col justify-between min-h-[72px] shadow-sm"
                    title="Ouvre votre application de messagerie installée (Outlook, Thunderbird, Mail Windows)"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white group-hover:text-sky-300 flex items-center gap-1.5">
                        <Send className="w-3.5 h-3.5 text-sky-400" />
                        <span>Client par Défaut</span>
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                        Mailto
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                      Lance Outlook ou Mail Windows avec objet et lettre pré-chargés.
                    </p>
                  </button>

                  {/* Option 2: Gmail Web */}
                  <button
                    onClick={handleOpenGmail}
                    className="p-3 rounded-lg bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-red-400/80 text-left transition-all cursor-pointer group flex flex-col justify-between min-h-[72px] shadow-sm"
                    title="Ouvre un nouvel onglet Gmail avec l'e-mail pré-rédigé"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white group-hover:text-red-300 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-red-400" />
                        <span>Ouvrir dans Gmail</span>
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-500/10 text-red-300 border border-red-500/20">
                        Webmail
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                      Ouvre l'interface de rédaction Gmail avec le dossier complet prêt.
                    </p>
                  </button>

                  {/* Option 3: PrivateEmail (contact@morchidi.digital) */}
                  <button
                    onClick={handleOpenPrivateEmail}
                    className="p-3 rounded-lg bg-gradient-to-r from-sky-950/60 to-slate-900 hover:from-sky-900/70 hover:to-slate-850 border border-sky-500/40 hover:border-sky-400 text-left transition-all cursor-pointer group flex flex-col justify-between min-h-[72px] shadow-sm ring-1 ring-sky-500/20"
                    title="Ouvre votre boîte PrivateEmail (contact@morchidi.digital) avec le texte intégral copié"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300 group-hover:text-amber-200 flex items-center gap-1.5">
                        <Inbox className="w-3.5 h-3.5 text-amber-400" />
                        <span>PrivateEmail</span>
                      </span>
                      <ExternalLink className="w-3 h-3 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-[10px] text-slate-300 mt-1 leading-snug">
                      Copie la lettre et ouvre votre session <strong>contact@morchidi.digital</strong>.
                    </p>
                  </button>
                </div>

                {/* Feedback Notification Toast */}
                {copiedSection && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div className="font-sans">
                        {copiedSection === 'mail-copied' && (
                          <span>Client de messagerie déclenché ! La lettre officielle intégrale est copiée dans votre presse-papiers pour contrôle.</span>
                        )}
                        {copiedSection === 'gmail-copied' && (
                          <span>Nouvel onglet Gmail ouvert ! L’objet et le texte sont pré-remplis, et la lettre intégrale est dans votre presse-papiers.</span>
                        )}
                        {copiedSection === 'privateemail-copied' && (
                          <span>Onglet PrivateEmail ouvert ! Cliquez sur <strong>Compose</strong> et faites <strong>Ctrl + V</strong> pour coller la lettre complète depuis <strong>{SENDER_OFFICIAL_EMAIL}</strong>.</span>
                        )}
                        {copiedSection === 'letter' && (
                          <span>Texte intégral de la lettre copié avec succès dans le presse-papiers !</span>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 shrink-0 uppercase">Prêt à l’envoi</span>
                  </div>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-xs font-bold text-white uppercase">
                    Texte de la Lettre Personnalisée pour : {currentRecipient.shortLabel}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyText(getOfficialTransmissionLetter(), 'letter')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-sm"
                  >
                    {copiedSection === 'letter' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'letter' ? 'Lettre Copiée !' : `Copier la Lettre (${currentRecipient.shortLabel})`}</span>
                  </button>
                </div>
              </div>

              {/* Letter Preview Container */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs whitespace-pre-line leading-relaxed max-h-[400px] overflow-y-auto select-all shadow-inner">
                {getOfficialTransmissionLetter()}
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Conforme État Civil (964 R/1970), CIN (BK71155), RC 16894 Settat et Compte BNC 11-496-06.</span>
                </span>
                <span className="text-amber-400 font-mono font-bold">100% Opposable Tribunal de Commerce</span>
              </div>
            </div>
          )}

          {/* TAB 2: FACTURE INTERNATIONALE CERTIFIÉE BMM* */}
          {activeTab === 'invoice' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* Financial Highlight Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider block">
                    Note d’Honoraires de Consulting & Couverture d’Infrastructure
                  </span>
                  <div className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2 mt-0.5">
                    <span>${INTERNATIONAL_INVOICE_DEFAULT.totalUSD.toLocaleString()} USD</span>
                    <span className="text-xs font-normal text-slate-400 font-sans">
                      (Équivalent : <strong className="text-amber-300">{INTERNATIONAL_INVOICE_DEFAULT.totalMAD.toLocaleString()} MAD</strong> au taux indicatif de 10.0)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Destiné à encaissement sur le <strong>Compte BNC 11-496-06 (Banque Nationale du Canada)</strong>.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopyText(getInvoiceFormattedText(), 'invoice')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all cursor-pointer"
                  >
                    {copiedSection === 'invoice' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'invoice' ? 'Facture Copiée !' : 'Copier Note d’Honoraires'}</span>
                  </button>
                </div>
              </div>

              {/* Invoice Lines Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>DÉTAIL DES LIGNES DE CONSULTING CERTIFIÉES BMM* :</span>
                  <span>Compte BNC 11-496-06</span>
                </div>

                <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
                  {INTERNATIONAL_INVOICE_DEFAULT.lines.map((line) => (
                    <div key={line.id} className="p-3.5 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                            {line.effortHeures}h
                          </span>
                          <span className="text-white font-bold text-xs">{line.description}</span>
                        </div>
                        <p className="text-[11px] text-amber-400/90 font-sans">
                          Rattachement : <strong>{line.poleReference}</strong>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-emerald-400">
                          ${line.montantUSD.toLocaleString()} USD
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {line.equivalentMAD.toLocaleString()} MAD
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BNC Direct Routing Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase">
                  <Building className="w-4 h-4 text-amber-400" />
                  <span>Coordonnées Bancaires de Règlement International :</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs text-slate-300 pt-1">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Établissement Bancaire</span>
                    <strong className="text-white">Banque Nationale du Canada (BNC)</strong>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Numéro de Compte Dédié</span>
                    <strong className="text-emerald-400 text-sm">{BNC_ACCOUNT_DATA.accountNumber}</strong>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Bénéficiaire Officiel</span>
                    <strong className="text-white">Mohamed MORCHID (BMM*)</strong>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: MÉCANISME "NE PAYEZ QUE LORSQUE VOUS GAGNEZ" & PRINCIPE DE PROFUSION */}
          {activeTab === 'strategy' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* Header Card with Legal & Doctrinal Cartouche */}
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-3 shadow-lg">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                    <h3 className="font-bold text-white text-sm">
                      Mécanisme « 0,00 MAD Décaissé » & Principe de Profusion
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    Réf : PNUD-SUBV-NUM-2026/BMM-BMM-INT-2026-001 • 2026-09-09
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
                  <div className="text-white font-bold flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>CABINET DE CONSULTING & CONSEIL SOCIAL MOHAMED MORCHID (Sigle d'Expertise BMM*)</span>
                  </div>
                  <div className="text-slate-400 text-[11px] grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1 border-t border-slate-800">
                    <div>Titulaire Fondateur : <strong className="text-amber-300">Mohamed MORCHID</strong> (CIN <strong>BK71155</strong> • État Civil <strong>964 R/1970</strong>)</div>
                    <div>Registre de Commerce : <strong className="text-slate-200">RC 16894 Settat</strong> (depuis le 04/03/2013)</div>
                    <div>Identifiants Légaux : <strong className="text-slate-200">ICE 003707910000033</strong> • IF 14412126</div>
                    <div>Compte Domiciliation Int. : <strong className="text-emerald-400">BNC 11-496-06 (Banque Nationale du Canada)</strong></div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Cette passerelle stratégique garantit que l’infrastructure Cloud et les modèles d’IA de Google (Google AI Studio) ne coûtent strictement rien au fondateur sur ses deniers propres et créent un bien public souverain, gratuit pour les citoyens et équitablement pris en charge par la coopération internationale.
                </p>
              </div>

              {/* Step by step diagram */}
              <div className="space-y-3.5">
                {/* STEP A */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold font-mono text-xs shrink-0 mt-0.5">
                    A
                  </span>
                  <div className="space-y-1.5 text-xs flex-1">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <span>Étape A : Rester sur le quota gratuit de développement (Free Tier)</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-mono border border-amber-500/30 font-semibold">
                        0,00 MAD Décaissé
                      </span>
                    </h4>
                    <p className="text-slate-400 leading-relaxed">
                      En fermant simplement la modale de mise à niveau de Google AI Studio, l'environnement reste sur le forfait gratuit (Free Tier). Le coût actuel sur le terrain à Settat est exactement de <strong className="text-emerald-400">0,00 MAD</strong>. Aucune avance de trésorerie personnelle n'est engagée.
                    </p>
                  </div>
                </div>

                {/* STEP B */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold font-mono text-xs shrink-0 mt-0.5">
                    B
                  </span>
                  <div className="space-y-2 text-xs flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <h4 className="font-bold text-white">
                        Étape B : Envoi de la note d’honoraires certifiée BMM* aux Bailleurs
                      </h4>
                      <span className="text-[10px] font-mono text-sky-400 font-bold bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                        ${INTERNATIONAL_INVOICE_DEFAULT.totalUSD.toLocaleString()} USD • BNC 11-496-06
                      </span>
                    </div>

                    <p className="text-slate-300 leading-relaxed">
                      La note d’honoraires de consulting (<strong>${INTERNATIONAL_INVOICE_DEFAULT.totalUSD.toLocaleString()} USD</strong>, soit équivalent <strong>{INTERNATIONAL_INVOICE_DEFAULT.totalMAD.toLocaleString()} MAD</strong>) est transmise formellement <strong>au PNUD et aux bailleurs internationaux partenaires</strong> avec le libellé du compte <strong>Banque Nationale du Canada (Compte 11-496-06)</strong> :
                    </p>

                    {/* Liste nominative et interactive des bailleurs et partenaires adressés */}
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] space-y-2 text-slate-300">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <span className="font-bold text-sky-300 block font-mono uppercase">
                          Parties Mentionnées dans le Mécanisme & Lettres Dédiées :
                        </span>
                        <span className="text-[10px] text-amber-400 font-mono">
                          Cliquez pour charger la lettre correspondante à son objectif &rarr;
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {(Object.keys(TRANSMISSION_RECIPIENTS) as RecipientKey[]).map((key) => {
                          const item = TRANSMISSION_RECIPIENTS[key];
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => {
                                setRecipientChoice(key);
                                setActiveTab('letter');
                              }}
                              className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-400/60 text-left transition-all cursor-pointer flex items-center justify-between gap-2 group shadow-sm"
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-white group-hover:text-amber-300 text-xs truncate">
                                    {item.shortLabel}
                                  </span>
                                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border truncate ${item.badgeStyle}`}>
                                    {item.badge}
                                  </span>
                                </div>
                                <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                                  {item.targetObjective}
                                </span>
                              </div>
                              <span className="text-[11px] text-amber-400 font-mono font-bold shrink-0 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                                &rarr;
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Précision Fondateur & Consultations */}
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] space-y-1 text-slate-300">
                      <span className="font-bold text-amber-300 block font-mono">Détails de l'Expertise & Mandat de Consulting :</span>
                      <p className="text-slate-400 leading-relaxed">
                        • <strong>Titulaire :</strong> Honoraires de consulting de <strong>Monsieur Mohamed MORCHID</strong> (CIN <strong>BK71155</strong>, État Civil Marocain <strong>964 R/1970</strong>, immatriculé au <strong>RC 16894 Settat</strong> depuis le 04/03/2013, ICE 003707910000033).<br />
                        • <strong>Sollicitations & Commanditaires :</strong> Consulté par les délégations de programmes de modernisation administrative, d'inclusion citoyenne, les partenaires socio-économiques et institutionnels pour la facilitation du Guichet Unique Citoyen (Art. 37 Constitution).<br />
                        • <strong>Période & Volume d'Intervention :</strong> Période continue <strong>2024-2026</strong> totalisant <strong>55 heures d'ingénierie certifiée</strong> (dont 33 heures d'intervention multi-terminaux MOC, 18.5h d'architecture système, 14.5h de chrono-analyse industrielle SMED BMM*, 12h de cyber-défense bancaire Loi 31-08, et 10h d'intégration et supervision IA).<br />
                        • <strong>Valeur des Services d'IA Prévus & Sollicités :</strong> Utilisation des modèles Google Gemini 1.5/2.0 Pro & Flash (Google AI Studio) pour le raisonnement de droit positif, l'analyse vectorielle des 15 services, la chrono-analyse industrielle et la protection Mīzān Al-Qisṭ, hébergés sur cluster Cloud Run conteneurisé.
                      </p>
                    </div>
                  </div>
                </div>

                {/* STEP C */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold font-mono text-xs shrink-0 mt-0.5">
                    C
                  </span>
                  <div className="space-y-1.5 text-xs flex-1">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <span>Étape C : Réception des devises et liaison du moyen de paiement BNC</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] font-mono border border-emerald-500/30 font-semibold">
                        Devises USD/CAD
                      </span>
                    </h4>
                    <p className="text-slate-400 leading-relaxed">
                      Dès réception du premier versement ou subvention sur le compte canadien <strong>Banque Nationale du Canada (Compte N° 11-496-06)</strong>, ce moyen de paiement en devises est directement associé à la facturation Google Cloud. <strong>Aucune carte bancaire marocaine personnelle n'est sollicitée ni débitée.</strong>
                    </p>
                  </div>
                </div>

                {/* STEP D */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/40 flex items-start gap-3 shadow-md">
                  <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold font-mono text-xs shrink-0 mt-0.5">
                    D
                  </span>
                  <div className="space-y-3 text-xs flex-1">
                    <div>
                      <h4 className="font-bold text-white flex items-center gap-2">
                        <span>Étape D : Application rigoureuse du Principe de Profusion & Équité Mathématique</span>
                        <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 text-[10px] font-mono border border-purple-500/30 font-semibold">
                          Bouclier Anti-Inflation
                        </span>
                      </h4>
                      <p className="text-slate-300 leading-relaxed mt-1">
                        La somme de <strong>$6 600 USD</strong> (66 000 MAD) constitue la valeur intégrale des honoraires d'ingénierie et de la demande de couverture officielle :
                      </p>
                      <div className="p-2.5 rounded bg-slate-950 border border-purple-500/30 text-amber-300 font-mono text-[11px] mt-1 font-semibold">
                        Transmission de Note d’Honoraires de Consulting & Demande de Prise en Charge d'Infrastructure Cloud IA (Google AI Studio) — Programme de Facilitation de Guichet Unique Citoyen et Droit Positif (Écosystème OBJECTIO)
                      </div>
                    </div>

                    {/* Formule Mathématique et Analytique de la Prise en Charge */}
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-white">
                        <Calculator className="w-4 h-4 text-purple-400" />
                        <span>Formule d'Intelligence et d'Équité Mathématique de la Prise en Charge :</span>
                      </div>

                      <div className="p-2.5 rounded bg-slate-900 font-mono text-[11px] text-emerald-300 border border-emerald-500/30 leading-relaxed">
                        <div className="text-slate-400 text-[10px] mb-1">FORMULE DE VALORISATION PAR CONSULTATION CITOYENNE :</div>
                        <strong>Coût Unitaire Pris en Charge = (H_expert + C_infraIA) / N_usagers</strong>
                        <div className="text-slate-400 text-[10px] mt-1.5">DÉCOMPOSITION PARAMÉTRIQUE EXACTE DE LA NOTE D'HONORAIRES ($6 600 USD) :</div>
                        <div className="text-slate-300 text-[11px] mt-1 space-y-0.5">
                          <div>• Volet 1 (Guichet Unique Art. 37) : 18.5h × 120 USD/h = <strong>$2 220 USD</strong> (22 200 MAD)</div>
                          <div>• Volet 2 (Chrono-Analyse BMM* SMED) : 14.5h × 120 USD/h = <strong>$1 740 USD</strong> (17 400 MAD)</div>
                          <div>• Volet 3 (Cyber Sentinelle Loi 31-08) : 12.0h × 120 USD/h = <strong>$1 440 USD</strong> (14 400 MAD)</div>
                          <div>• Volet 4 (Adossement Cloud IA Google AI Studio) : 10.0h × 120 USD/h = <strong>$1 200 USD</strong> (12 000 MAD)</div>
                          <div className="pt-1 border-t border-slate-800 text-amber-300 font-bold">
                            Total Note d'Honoraires BMM* = 55h × 120 USD/h = $6 600 USD (66 000 MAD)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quoi Couvrir et Au Service de Qui */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                        <span className="font-bold text-sky-400 font-mono flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5" />
                          <span>Quoi Couvrir dans la Prise en Charge ?</span>
                        </span>
                        <ul className="list-disc list-inside space-y-1 text-slate-400">
                          <li>Rémunération de l'expertise de <strong>Monsieur Mohamed MORCHID</strong> (55 heures d'ingénierie certifiée BMM*).</li>
                          <li>Facturation Google Cloud (AI Studio, API Gemini, conteneurs Cloud Run en Pay-Per-Request).</li>
                          <li>Routage de sécurité CDN mondial et certificat SSL via Cloudflare.</li>
                          <li>Garantie de gratuité inconditionnelle au guichet pour tous les usagers citoyens.</li>
                        </ul>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                        <span className="font-bold text-amber-400 font-mono flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Au Service de Qui ?</span>
                        </span>
                        <ul className="list-disc list-inside space-y-1 text-slate-400">
                          <li><strong>Du Fondateur :</strong> Rémunération légitime de son travail d'inventeur-conseil sans débours personnel.</li>
                          <li><strong>Des Citoyens & Usagers :</strong> Émancipation sociale et accès universel au droit positif (0,00 MAD).</li>
                          <li><strong>Des Bailleurs (PNUD, BM, UE, BAD, AFD) :</strong> Impact social direct, traçable et conforme aux ODD 9, 10 et 16.</li>
                          <li><strong>Bouclier Anti-Inflation :</strong> Neutralise la hausse des coûts de conseil par la profusion numérique.</li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: BUSINESS PLAN & SUIVI OPÉRATIONNEL TRIENNAL */}
          {activeTab === 'business_plan' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <h4 className="font-bold text-white">
                    Gouvernance Stratégique : Business Plan Triennal & Suivi d'Exécution
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    Ce module consolide les prévisions financières triennales (2025-2027), le modèle de revenus tripartite (Bailleurs, B2B BMM*, Gratuité Citoyenne), l'inventaire d'apport en nature certifié ({LEGAL_IDENTITY.certifiedContribution}), et le jalonnement de déploiement opérationnel.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                <BusinessPlanWorkbench />
              </div>
            </div>
          )}

          {/* TAB 5: AUDIT DE COHÉRENCE DU BUILD MULTI-APPAREILS & RÉSERVE */}
          {activeTab === 'build_audit' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* Build Summary Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>Temps Machine Build</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono mt-1">
                    {MULTI_DEVICE_BUILD_EFFORT.lastBuildDurationSeconds}s
                  </div>
                  <span className="text-[10px] text-slate-500 font-sans">Compilation & Linting</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <Smartphone className="w-4 h-4 text-amber-400" />
                    <span>Effort Smartphone</span>
                  </div>
                  <div className="text-lg font-bold text-amber-300 font-mono mt-1">
                    {MULTI_DEVICE_BUILD_EFFORT.smartphoneEffortHeures}h
                  </div>
                  <span className="text-[10px] text-slate-500 font-sans">Cadrage mobile & terrain</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <Laptop className="w-4 h-4 text-sky-400" />
                    <span>Effort Ordinateur</span>
                  </div>
                  <div className="text-lg font-bold text-sky-300 font-mono mt-1">
                    {MULTI_DEVICE_BUILD_EFFORT.computerEffortHeures}h
                  </div>
                  <span className="text-[10px] text-slate-500 font-sans">Architecture & DNS</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>Total Session MOC</span>
                  </div>
                  <div className="text-lg font-bold text-emerald-300 font-mono mt-1">
                    {MULTI_DEVICE_BUILD_EFFORT.totalEffortMOC} MOC
                  </div>
                  <span className="text-[10px] text-slate-400 font-sans">
                    33h = {MULTI_DEVICE_BUILD_EFFORT.valeurSessionMAD.toLocaleString()} MAD
                  </span>
                </div>
              </div>

              {/* Solemn Reserve Clause for the Commissariat aux Apports */}
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/50 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs font-mono uppercase">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Clause Solennelle de Réserve pour le Commissariat aux Apports :</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {MULTI_DEVICE_BUILD_EFFORT.mentionReserveCommissariat}
                </p>
                <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-amber-400 font-mono">
                  <span>Articles 24 de la Loi 17-95 & 53 de la Loi 5-96</span>
                  <span className="font-bold">Opposabilité Tribunal de Commerce</span>
                </div>
              </div>

              {/* Technical breakdown */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono font-bold text-white uppercase">
                  Analyse de Cohérence Technique : Smartphone vs Ordinateur
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-start gap-2">
                    <Smartphone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Rôle du Smartphone ({MULTI_DEVICE_BUILD_EFFORT.smartphoneEffortHeures}h) :</strong>
                      <p className="text-slate-400 mt-0.5">
                        Supervision en temps réel, tests d'ergonomie tactile, validation du menu déroulant mobile des 8 pôles (sélection sans chevauchement), formulation des textes d'orientation d'entraide et transmission des éléments d'état civil.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-start gap-2">
                    <Laptop className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Rôle de l’Ordinateur ({MULTI_DEVICE_BUILD_EFFORT.computerEffortHeures}h) :</strong>
                      <p className="text-slate-400 mt-0.5">
                        Structuration du code TypeScript, implémentation des 15 services et de l'ancre #academie, rédaction des matrices de DNS (Cloudflare + Namecheap), formalisation du modal de bilan et compilation rigoureuse sous Vite.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Banque Nationale du Canada (Compte 11-496-06) • BMM* • RC 16894 Settat</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopyText(getOfficialTransmissionLetter(), 'letter_footer')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
            >
              Copier Lettre
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
