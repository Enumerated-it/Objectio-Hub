import React, { useState, useRef } from 'react';
import { 
  X, 
  Layers, 
  Clock, 
  Coins, 
  Sparkles, 
  Brain, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  PlusCircle, 
  Download, 
  Upload,
  Info,
  Scale,
  Folder,
  Globe,
  GitBranch,
  Terminal,
  Server,
  TrendingUp,
  Briefcase,
  AlertTriangle,
  HelpCircle,
  Building,
  Calendar,
  Lock,
  ArrowRight,
  ExternalLink,
  Copy,
  Smartphone,
  Laptop,
  MessageSquare,
  Share2
} from 'lucide-react';
import { 
  LEGAL_IDENTITY, 
  INVENTAIRE_REEL_APPORT, 
  RAPPORT_INVENTAIRE_PERIODE,
  CIBLES_MARCHE_ROI,
  OBJ_TOTAL_EFFORT_MOC, 
  OBJ_TOTAL_EFFORT_HEURES,
  OBJ_VALEUR_APPORT_NATURE,
  MULTI_DEVICE_BUILD_EFFORT,
  BNC_ACCOUNT_DATA
} from '../data/servicesData';
import { InventoryItem, MarketTarget } from '../types';
import { copyToClipboard } from '../utils/deepLink';

interface GlobalInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalInventoryModal: React.FC<GlobalInventoryModalProps> = ({ isOpen, onClose }) => {
  // Navigation par onglets
  const [activeTab, setActiveTab] = useState<'registre' | 'nouveau' | 'rapport' | 'marche_roi'>('registre');

  // État des items d'inventaire
  const [items, setItems] = useState<InventoryItem[]>(INVENTAIRE_REEL_APPORT);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Import JSON & Notification
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importNotification, setImportNotification] = useState<string | null>(null);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Nouveau formulaire de contribution multi-sources (adapté aux sources sans API)
  const [newProjectName, setNewProjectName] = useState('');
  const [newCategory, setNewCategory] = useState<'incorporel' | 'technologique' | 'operationnel'>('incorporel');
  const [newDesignation, setNewDesignation] = useState('');
  const [newEffortHeures, setNewEffortHeures] = useState(120);
  const [newValeurMAD, setNewValeurMAD] = useState(30000);
  const [newDateDebut, setNewDateDebut] = useState('2025-01-10');
  const [newDateSoumission, setNewDateSoumission] = useState('2026-09-08');
  const [newStatut, setNewStatut] = useState<'en_cours_developpement' | 'actif_operationnel' | 'recherche_continue'>('en_cours_developpement');
  const [newSourceType, setNewSourceType] = useState<'dossier_local' | 'aistudio_google' | 'github_repo' | 'vercel' | 'deepseek_ai' | 'plateforme_sans_api' | 'autre'>('dossier_local');
  const [newSourceReference, setNewSourceReference] = useState('projets/mon-projet');
  const [newJustification, setNewJustification] = useState('Droit des Obligations et des Contrats (D.O.C) & Protection des œuvres de l’esprit');
  const [hasNoApi, setHasNoApi] = useState(false);

  if (!isOpen) return null;

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim() || !newDesignation.trim()) return;

    const newItem: InventoryItem = {
      id: `inv-${Date.now()}`,
      code: `PROJ-${items.length + 1 < 10 ? '0' : ''}${items.length + 1}`,
      projectName: newProjectName.trim(),
      projectCategory: 'droit_positif',
      category: newCategory,
      categoryLabel: 
        newCategory === 'incorporel' 
          ? 'Actifs Immatériels & Propriété Intellectuelle' 
          : newCategory === 'technologique' 
            ? 'Architecture Numérique & Algorithmes' 
            : 'Opérations & Protocoles de Droit Positif',
      designation: newDesignation.trim(),
      effortHeuresMOC: Math.round(newEffortHeures * 60),
      dateDebut: newDateDebut || '2025-01-01',
      dateSoumissionInventaire: newDateSoumission || '2026-09-08',
      statutDeveloppement: newStatut,
      sourceType: newSourceType,
      sourceReference: newSourceReference.trim() || 'Dossier de travail déclaré',
      hasNoPublicApi: hasNoApi,
      legalJustification: newJustification.trim() || 'Droit des Obligations et des Contrats & Protection des œuvres de l’esprit',
      valeurMAD: Number(newValeurMAD) || 0,
    };

    setItems([...items, newItem]);
    setNewProjectName('');
    setNewDesignation('');
    setActiveTab('registre');
  };

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.category === selectedCategory);

  const totalValeur = items.reduce((acc, curr) => acc + curr.valeurMAD, 0);
  const totalMOC = items.reduce((acc, curr) => acc + curr.effortHeuresMOC, 0);
  const totalHeures = Math.round(totalMOC / 60);

  const getSourceBadge = (item: InventoryItem) => {
    switch (item.sourceType) {
      case 'dossier_local':
        return { icon: Folder, label: 'Dossier Local', color: 'text-amber-400 bg-amber-950/40 border-amber-800/60' };
      case 'aistudio_google':
        return { icon: Brain, label: 'Google AI Studio', color: 'text-blue-400 bg-blue-950/40 border-blue-800/60' };
      case 'github_repo':
        return { icon: GitBranch, label: 'GitHub Repo', color: 'text-purple-400 bg-purple-950/40 border-purple-800/60' };
      case 'vercel':
        return { icon: Globe, label: 'Déploiement Cloud', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60' };
      case 'deepseek_ai':
        return { icon: Terminal, label: 'DeepSeek / Plateforme IA', color: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60' };
      default:
        return { icon: Server, label: 'Sans API requise', color: 'text-slate-300 bg-slate-800 border-slate-700' };
    }
  };

  const getStatutBadge = (statut: InventoryItem['statutDeveloppement']) => {
    switch (statut) {
      case 'en_cours_developpement':
        return { label: 'Travaux en cours de développement', color: 'text-amber-300 bg-amber-500/10 border-amber-500/30' };
      case 'recherche_continue':
        return { label: 'Recherche & Conception Continue', color: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30' };
      case 'actif_operationnel':
        return { label: 'Actif Opérationnel Consolidé', color: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30' };
    }
  };

  const exportInventoryJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({
        titulaire: LEGAL_IDENTITY.founderName,
        immatriculationEtatCivil: LEGAL_IDENTITY.matricule,
        ice: LEGAL_IDENTITY.iceNumber,
        isoc: LEGAL_IDENTITY.isocNumber,
        campagneInventaire: RAPPORT_INVENTAIRE_PERIODE,
        constatDoctrinalIAP: LEGAL_IDENTITY.doctrinalNotice,
        variableApport: LEGAL_IDENTITY.valeurApportVariable,
        totalValeurMAD: totalValeur,
        totalEffortMOC: totalMOC,
        totalHeuresConverties: totalHeures,
        projetsInventorie: items,
        etudeMarcheROI: CIBLES_MARCHE_ROI,
        signatureCertification: `Déclaré conforme par ${LEGAL_IDENTITY.founderName} (${LEGAL_IDENTITY.matricule}) — ${LEGAL_IDENTITY.statutValeurApport}`,
        dateGeneration: new Date().toISOString(),
      }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `rapport_inventaire_global_${LEGAL_IDENTITY.founderName.replace(/\s+/g, '_')}_RC16894.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.projetsInventorie && Array.isArray(parsed.projetsInventorie)) {
          setItems(parsed.projetsInventorie);
          setImportNotification(`Rapport JSON chargé avec succès (${parsed.projetsInventorie.length} projets, total ${(parsed.totalValeurMAD || 0).toLocaleString('fr-FR')} MAD).`);
          setTimeout(() => setImportNotification(null), 6000);
        } else {
          alert('Format JSON non reconnu. Le document doit contenir le tableau "projetsInventorie".');
        }
      } catch {
        alert('Erreur lors de la lecture du fichier JSON');
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  const handleCopyWhatsapp = async () => {
    const text = `Bonjour,\n\nLe Cabinet de Consulting / Conseil Social Mohamed MORCHID (RC 16894 Settat, ICE 003707910000033) met à votre disposition son portail officiel :\n\n👉 Accès Général : ${LEGAL_IDENTITY.cloudRunUrl}\n\nAccès directs par pôle :\n🤝 Pôle Accompagnement & Entraide : ${LEGAL_IDENTITY.cloudRunUrl}/#entraide\n⚖️ 0. Écosystème OBJECTIO (Apport en Nature & Certification) : ${LEGAL_IDENTITY.cloudRunUrl}/#objectio\n🛡️ 1. Cyber-Défense & Loi 31-08 : ${LEGAL_IDENTITY.cloudRunUrl}/#cyber\n🚗 2. Plateforme Flotte & Location COO-DRIVE-IT : ${LEGAL_IDENTITY.cloudRunUrl}/#transport\n📖 3. Bureau Méthodes Magazine (BMM) : ${LEGAL_IDENTITY.cloudRunUrl}/#BMM\n✍️ 4. Cabinet Rédacteur Public (Actes & Requêtes) : ${LEGAL_IDENTITY.cloudRunUrl}/#Rédacteur\n🏢 5. Fiduciaires MORCHID (Compta, Fiscal & Paie) : ${LEGAL_IDENTITY.cloudRunUrl}/#Fiduciaires\n\nCabinet de Conseil Social Mohamed MORCHID | Settat (Maroc)\nRC 16894 Settat (04/03/2013) | ICE 003707910000033 | IF 14412126\nRèglement : Passerelle CIH Bank (RIB sur facture)`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedWhatsapp(true);
      setTimeout(() => setCopiedWhatsapp(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl shadow-amber-950/40 overflow-hidden text-slate-100 my-4 max-h-[94vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/95 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white font-['Cinzel',serif] tracking-wide">
                  Inventaire Réel Global & Mesure de l'Effort (MOC)
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[11px] border border-amber-500/40">
                  {items.length} Projets Actifs
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Fondateur : <strong className="text-slate-200">{LEGAL_IDENTITY.founderName}</strong> • CIN : <strong className="text-slate-200">{LEGAL_IDENTITY.cin}</strong> • État Civil : <strong className="text-amber-300 font-mono">{LEGAL_IDENTITY.matricule}</strong> • RC : <span className="text-slate-300 font-mono">{LEGAL_IDENTITY.rcNumber}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Importer un rapport d'inventaire JSON (depuis smartphone ou ordinateur)"
            >
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Importer JSON</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImportFile}
            />

            <button
              onClick={exportInventoryJSON}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Télécharger le rapport d'inventaire complet en JSON horodaté"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Rapport JSON</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Import Notification Banner */}
        {importNotification && (
          <div className="px-5 py-2.5 bg-cyan-950/80 border-b border-cyan-800/80 text-cyan-200 text-xs flex items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{importNotification}</span>
            </div>
            <button 
              onClick={() => setImportNotification(null)}
              className="text-cyan-400 hover:text-white text-xs underline cursor-pointer"
            >
              Fermer
            </button>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="px-5 py-2 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              onClick={() => setActiveTab('registre')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'registre'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Registre d'Inventaire ({items.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('nouveau')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'nouveau'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Enregistrer un Projet (Sans API)</span>
            </button>

            <button
              onClick={() => setActiveTab('rapport')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'rapport'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Rapport d'Arrêté & Délais</span>
            </button>

            <button
              onClick={() => setActiveTab('marche_roi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'marche_roi'
                  ? 'bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 shadow font-bold'
                  : 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Qui achète ce service ? (R.O.I & Anti-Inflation)</span>
            </button>
          </div>

          <span className="hidden md:inline-block text-[11px] text-slate-500 font-mono">
            {RAPPORT_INVENTAIRE_PERIODE.referenceRapport}
          </span>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1 text-xs">

          {/* TAB 1: REGISTRE DES PROJETS & EFFORTS */}
          {activeTab === 'registre' && (
            <div className="space-y-6">

              {/* Doctrinal Notice on IAP & Inspiration */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-cyan-950/30 border border-amber-500/40 space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-xs sm:text-sm text-amber-200 tracking-wide font-['Cinzel',serif]">
                      {LEGAL_IDENTITY.doctrinalNotice.title}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-[11px]">
                    {LEGAL_IDENTITY.doctrinalNotice.conceptIAP}
                  </span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {LEGAL_IDENTITY.doctrinalNotice.description}
                </p>
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                  <span>Période d'inventaire : <strong>{RAPPORT_INVENTAIRE_PERIODE.dateOuverture}</strong> au <strong>{RAPPORT_INVENTAIRE_PERIODE.dateClotureRapport}</strong></span>
                  <span className="text-amber-300">Statut des projets : Travaux en cours de développement continu (Arrêté partiel)</span>
                </div>
              </div>

              {/* Metrics Header Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[11px] block uppercase font-mono">Valeur Consolidée</span>
                  <strong className="text-lg sm:text-xl font-bold font-mono text-amber-300 block mt-0.5">
                    {totalValeur.toLocaleString('fr-FR')} MAD
                  </strong>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Indexé sur {LEGAL_IDENTITY.valeurApportVariable}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[11px] block uppercase font-mono">Volume Global MOC</span>
                  <strong className="text-lg sm:text-xl font-bold font-mono text-cyan-300 block mt-0.5">
                    {totalMOC.toLocaleString('fr-FR')} MOC
                  </strong>
                  <span className="text-[10px] text-slate-500 font-mono">
                    1h = 60 Minutes Convertibles
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[11px] block uppercase font-mono">Effort Intellectuel Équiv.</span>
                  <strong className="text-lg sm:text-xl font-bold font-mono text-slate-200 block mt-0.5">
                    {totalHeures.toLocaleString('fr-FR')} Heures
                  </strong>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Recherche, code & doctrine
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-center">
                  <button
                    onClick={() => setActiveTab('nouveau')}
                    className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-amber-950/40"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Ajouter un Projet</span>
                  </button>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center justify-between gap-2 flex-wrap border-b border-slate-800 pb-2">
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {[
                    { id: 'all', label: `Tous (${items.length})` },
                    { id: 'incorporel', label: 'Incorporel / Doctrinal' },
                    { id: 'technologique', label: 'Technologie & Code' },
                    { id: 'operationnel', label: 'Opérations & Protocoles' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCategory(c.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        selectedCategory === c.id
                          ? 'bg-amber-500 text-slate-950 font-semibold'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                <span className="text-[11px] text-slate-500 font-mono">
                  Immatriculation : <strong>{LEGAL_IDENTITY.matricule}</strong>
                </span>
              </div>

              {/* List of projects */}
              <div className="space-y-3.5">
                {filteredItems.map((item) => {
                  const source = getSourceBadge(item);
                  const SourceIcon = source.icon;
                  const statut = getStatutBadge(item.statutDeveloppement);

                  return (
                    <div 
                      key={item.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition-all space-y-3"
                    >
                      {/* Top item row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs">
                            {item.code}
                          </span>
                          <h3 className="font-bold text-slate-100 text-sm">
                            {item.projectName}
                          </h3>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${statut.color}`}>
                            {statut.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-[10px] text-slate-500 uppercase block font-mono">Effort MOC</span>
                            <strong className="text-cyan-300 font-mono text-xs">
                              {item.effortHeuresMOC.toLocaleString('fr-FR')} MOC ({Math.round(item.effortHeuresMOC / 60)}h)
                            </strong>
                          </div>
                          <div className="text-right pl-3 border-l border-slate-800">
                            <span className="text-[10px] text-slate-500 uppercase block font-mono">Valeur MAD</span>
                            <strong className="text-amber-300 font-mono text-sm font-bold">
                              {item.valeurMAD.toLocaleString('fr-FR')} MAD
                            </strong>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {item.designation}
                      </p>

                      {/* Special Detailed Dossier for PROJ-07 (Dossier d'Investissement Multi-Pôles) */}
                      {item.code === 'PROJ-07' && (
                        <div className="mt-3 p-3.5 rounded-xl bg-slate-900 border border-amber-500/40 space-y-3 font-mono text-xs">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <span className="text-amber-300 font-bold flex items-center gap-1.5 text-xs">
                              <ShieldCheck className="w-4 h-4 text-amber-400" />
                              Actifs Immatériels Scellés SHA-256 (645 000 MAD)
                            </span>
                            <span className="text-[10px] text-slate-400">
                              Lois 17-95, 5-96 & 17-97
                            </span>
                          </div>

                          {/* 4 Sealed Assets */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                              <div className="flex justify-between items-center text-amber-400 font-bold">
                                <span>OBJ-2026-001</span>
                                <span>185 000 MAD</span>
                              </div>
                              <p className="text-slate-200 mt-0.5 text-[11px]">Moteur Algorithmique Mīzān Al-Qisṭ & Sentinelle Cyber Loi 31-08</p>
                              <div className="text-[10px] text-slate-500 mt-1 truncate">SHA-256: e3b0c44298fc1c14... • 2026-08-15</div>
                            </div>

                            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                              <div className="flex justify-between items-center text-amber-400 font-bold">
                                <span>OBJ-2026-002</span>
                                <span>240 000 MAD</span>
                              </div>
                              <p className="text-slate-200 mt-0.5 text-[11px]">Plateforme Coopérative COO-DRIVE-IT Flotte & Billetterie</p>
                              <div className="text-[10px] text-slate-500 mt-1 truncate">SHA-256: 8f434346648f6b96... • 2026-08-20</div>
                            </div>

                            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                              <div className="flex justify-between items-center text-amber-400 font-bold">
                                <span>OBJ-2026-003</span>
                                <span>125 000 MAD</span>
                              </div>
                              <p className="text-slate-200 mt-0.5 text-[11px]">Méthodologie Industrielle BMM Chrono-Analyse SMED & MTM</p>
                              <div className="text-[10px] text-slate-500 mt-1 truncate">SHA-256: ca978112ca1bbdca... • 2026-08-28</div>
                            </div>

                            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                              <div className="flex justify-between items-center text-amber-400 font-bold">
                                <span>OBJ-2026-004</span>
                                <span>95 000 MAD</span>
                              </div>
                              <p className="text-slate-200 mt-0.5 text-[11px]">Système Fiduciaire MORCHID Modèles d’Actes & Protocoles D.O.C</p>
                              <div className="text-[10px] text-slate-500 mt-1 truncate">SHA-256: b94d27b9934d3e08... • 2026-09-01</div>
                            </div>
                          </div>

                          {/* Multi-Device Engineering Hours */}
                          <div className="p-2.5 rounded-lg bg-slate-950 border border-cyan-800/40 text-[11px] space-y-1.5">
                            <div className="flex justify-between items-center text-cyan-300 font-bold">
                              <span className="flex items-center gap-1.5">
                                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                                Ingénierie R&D Multi-Appareils (27.0h valorisées)
                              </span>
                              <span>17 550 MAD</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] text-slate-300 pt-1">
                              <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                                <span className="text-slate-400 block">Smartphone Settat :</span>
                                <strong>9.5 h @ 650 MAD</strong> = 6 175 MAD
                              </div>
                              <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                                <span className="text-slate-400 block">Smartphone & Edge Web :</span>
                                <strong>8.5 h @ 650 MAD</strong> = 5 525 MAD
                              </div>
                              <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                                <span className="text-slate-400 block">Terminal Multi-supports :</span>
                                <strong>9.0 h @ 650 MAD</strong> = 5 850 MAD
                              </div>
                            </div>
                            <div className="text-right text-amber-300 font-bold text-xs pt-1 border-t border-slate-800">
                              Valorisation de l'apport : {LEGAL_IDENTITY.certifiedContribution} — {LEGAL_IDENTITY.statutValeurApport}
                            </div>
                          </div>

                          {/* Deployed Poles and Direct Access Links */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between text-[11px] text-slate-300">
                              <span className="font-semibold text-slate-200">Pôles Déployés & Liens Directs :</span>
                              <button
                                onClick={handleCopyWhatsapp}
                                className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>{copiedWhatsapp ? '✓ Message Copié' : 'Copier Modèle WhatsApp'}</span>
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-1.5 text-[10px]">
                              <a
                                href={typeof window !== 'undefined' ? window.location.origin : LEGAL_IDENTITY.cloudRunUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-amber-500/30 text-amber-300 inline-flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>morchidit.morchidi.digital (Portail Global)</span>
                              </a>
                              {[
                                { name: '🤝 Entraide', hash: '#entraide' },
                                { name: '⚖️ Objectio', hash: '#objectio' },
                                { name: '🛡️ Cyber-Défense', hash: '#cyber' },
                                { name: '🚗 COO-DRIVE-IT', hash: '#transport' },
                                { name: '📖 BMM', hash: '#BMM' },
                                { name: '✍️ Rédacteur', hash: '#Rédacteur' },
                                { name: '🏢 Fiduciaires', hash: '#Fiduciaires' },
                              ].map((pole) => (
                                <a
                                  key={pole.hash}
                                  href={`${typeof window !== 'undefined' ? window.location.origin : LEGAL_IDENTITY.cloudRunUrl}/${pole.hash}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-2 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white"
                                >
                                  {pole.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Temporal & Source Granular Bar */}
                      <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Calendar className="w-3.5 h-3.5 text-amber-400" />
                            <span>Début : <strong className="text-slate-200">{item.dateDebut}</strong></span>
                          </div>

                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Soumission à l'inventaire : <strong className="text-cyan-200">{item.dateSoumissionInventaire}</strong> <span className="text-slate-500">(Arrêté travaux continus)</span></span>
                          </div>
                        </div>

                        {/* Source type badge */}
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] border ${source.color}`}>
                            <SourceIcon className="w-3 h-3" />
                            <span>{source.label}</span>
                          </span>
                          <span className="text-slate-400 truncate max-w-[200px]" title={item.sourceReference}>
                            {item.sourceReference}
                          </span>
                        </div>
                      </div>

                      {/* Legal justification */}
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <div className="flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-amber-400" />
                          <span>Fondement : <strong className="text-slate-300">{item.legalJustification}</strong></span>
                        </div>
                        <span className="text-slate-500">{item.categoryLabel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ENREGISTRER UN PROJET (SANS API / TOUTES SOURCES) */}
          {activeTab === 'nouveau' && (
            <div className="space-y-5">
              {/* Educational Notice on API Absence */}
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Doctrine d'Indépendance Technologique : Pourquoi l'absence d'API n'invalide pas votre apport</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  En Droit Positif (D.O.C marocain, Loi 17-97, Convention de Berne), <strong>l'existence d'une API n'est en aucun cas une condition de validité d'un actif incorporel ou d'un apport en nature</strong>. Que votre projet réside dans un dossier local sur votre ordinateur, sur Google AI Studio, dans une session DeepSeek sans API publique, sur GitHub ou sur Vercel, l'inventaire constate la <strong>matérialité de l'effort intellectuel (MOC)</strong>, la date de début et la date de soumission probatoire.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] font-mono">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-amber-400 block font-bold">1. Dossier Local</span>
                    <span className="text-slate-400 text-[10px]">Nom de dossier & arborescence locale</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-cyan-400 block font-bold">2. Plateforme IA sans API</span>
                    <span className="text-slate-400 text-[10px]">DeepSeek / AI Studio / Prompt maître</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-emerald-400 block font-bold">3. Dépôt / Cloud</span>
                    <span className="text-slate-400 text-[10px]">GitHub, Vercel ou URL d'hébergement</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleAddProject} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="font-bold text-amber-300 text-sm border-b border-slate-800 pb-2">
                  Formulaire Universel de Soumission à l'Inventaire d'Efforts
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Nom du Projet / Travail de Recherche <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Matrice Algorithmique, Protocole Juris, DeepSeek Framework..."
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Catégorie de l'Actif</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-amber-400 outline-none"
                    >
                      <option value="incorporel">Incorporel (Propriété Intellectuelle, Modèle)</option>
                      <option value="technologique">Technologique (Logiciel, Code, Algorithme)</option>
                      <option value="operationnel">Opérationnel (Protocole, Procédure déclarée)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Type de Source / Emplacement du Projet <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={newSourceType}
                      onChange={(e) => {
                        const val = e.target.value as any;
                        setNewSourceType(val);
                        if (val === 'dossier_local') {
                          setNewSourceReference('projets/mon-projet');
                          setHasNoApi(true);
                        } else if (val === 'deepseek_ai') {
                          setNewSourceReference('DeepSeek Workspace / Session de conception');
                          setHasNoApi(true);
                        } else if (val === 'aistudio_google') {
                          setNewSourceReference('Google AI Studio Project ID / Applet');
                          setHasNoApi(false);
                        } else if (val === 'github_repo') {
                          setNewSourceReference('github.com/mon-compte/mon-repo');
                          setHasNoApi(false);
                        } else if (val === 'vercel') {
                          setNewSourceReference('mon-app.vercel.app');
                          setHasNoApi(false);
                        } else {
                          setNewSourceReference('Plateforme fermée / Archive déclarée');
                          setHasNoApi(true);
                        }
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-amber-400 outline-none font-mono"
                    >
                      <option value="dossier_local">📁 Dossier local sur mon ordinateur (Sans API)</option>
                      <option value="deepseek_ai">🧠 DeepSeek / Plateforme IA (Sans API requise)</option>
                      <option value="aistudio_google">⚡ Google AI Studio (Workspace / Applet ID)</option>
                      <option value="github_repo">🐙 GitHub / Dépôt Git</option>
                      <option value="vercel">▲ Vercel / Déploiement Cloud</option>
                      <option value="plateforme_sans_api">🔒 Autre plateforme fermée sans API publique</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Référence / Chemin / Nom de Dossier / Session
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: projets/2026 ou Chat DeepSeek 'Architecture Doctrinale'..."
                      value={newSourceReference}
                      onChange={(e) => setNewSourceReference(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-amber-400 outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Désignation Détaillée des Travaux Réalisés et Livrables
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Description précise des concepts, modèles mathématiques, code, prompts maîtres ou architectures développées..."
                    value={newDesignation}
                    onChange={(e) => setNewDesignation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-amber-400 outline-none"
                  />
                </div>

                {/* Temporal Boundaries Requirement */}
                <div className="p-3 rounded-lg bg-slate-900/90 border border-amber-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Délais d'Effort : Date Début & Date de Soumission à l'Inventaire (Travaux en Cours)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Date Début des Travaux</label>
                      <input
                        type="date"
                        value={newDateDebut}
                        onChange={(e) => setNewDateDebut(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">
                        Date de Soumission (Arrêté d'inventaire)
                      </label>
                      <input
                        type="date"
                        value={newDateSoumission}
                        onChange={(e) => setNewDateSoumission(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono"
                      />
                      <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
                        * Ce n'est pas une fin, le développement continue
                      </span>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Statut du Projet</label>
                      <select
                        value={newStatut}
                        onChange={(e) => setNewStatut(e.target.value as any)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono"
                      >
                        <option value="en_cours_developpement">Travaux en cours de développement continu</option>
                        <option value="recherche_continue">Recherche & Conception continue</option>
                        <option value="actif_operationnel">Actif Opérationnel Consolidé</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Quantification & Valuation */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Effort Déployé (Heures)</label>
                    <input
                      type="number"
                      min="1"
                      value={newEffortHeures}
                      onChange={(e) => setNewEffortHeures(Number(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono"
                    />
                    <span className="text-[10px] text-cyan-400 font-mono mt-0.5 block">
                      = {Math.round(newEffortHeures * 60).toLocaleString('fr-FR')} MOC (Minutes Convertibles)
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Valeur Estimée d'Apport (MAD)</label>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={newValeurMAD}
                      onChange={(e) => setNewValeurMAD(Number(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('registre')}
                      className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
                    >
                      Consigner dans l'Inventaire
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: RAPPORT D'ARRÊTÉ & CONSOLIDATION */}
          {activeTab === 'rapport' && (
            <div className="space-y-5">
              <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/40 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-['Cinzel',serif] tracking-wide">
                      Procès-Verbal & Rapport d'Arrêté d'Inventaire Réel
                    </h3>
                    <p className="text-xs text-slate-400">
                      Réf : <strong className="text-amber-300 font-mono">{RAPPORT_INVENTAIRE_PERIODE.referenceRapport}</strong>
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 font-mono text-xs">
                    Statut : Travaux en cours de développement continu
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-slate-500 uppercase text-[10px] block">Délais de la Campagne d'Inventaire :</span>
                    <div>Date d'Ouverture : <strong className="text-slate-200">{RAPPORT_INVENTAIRE_PERIODE.dateOuverture}</strong></div>
                    <div>Date de Clôture / Arrêté : <strong className="text-amber-300">{RAPPORT_INVENTAIRE_PERIODE.dateClotureRapport}</strong></div>
                    <div className="text-slate-400 text-[11px] pt-1">
                      Note doctrinale : La clôture de rapport n'arrête pas la production intellectuelle ; elle consacre le quantum déclaré éligible à l'apport en nature, soumis à l'appréciation du commissaire aux apports.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-slate-500 uppercase text-[10px] block">Titulaire & Identifiants Régaliens :</span>
                    <div>Titulaire : <strong className="text-slate-100">{LEGAL_IDENTITY.founderName}</strong></div>
                    <div>État Civil Officiel : <strong className="text-amber-400">{LEGAL_IDENTITY.matricule}</strong></div>
                    <div>ICE : <strong className="text-slate-200">{LEGAL_IDENTITY.iceNumber}</strong></div>
                    <div>Compte CIH : <strong className="text-slate-200">{LEGAL_IDENTITY.rib}</strong></div>
                  </div>
                </div>

                {/* Synthèse chiffrée */}
                <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wide">
                    Consolidation Globale des Actifs d'Apport
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Nombre de Projets Soumis :</span>
                      <strong className="text-slate-100 font-mono text-base">{items.length} Projets Actifs</strong>
                    </div>
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Volume Temporel Cumulé (MOC) :</span>
                      <strong className="text-cyan-300 font-mono text-base">{totalMOC.toLocaleString('fr-FR')} MOC</strong>
                      <span className="text-[10px] text-slate-500 block font-mono">~{totalHeures.toLocaleString('fr-FR')} Heures de R&D</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Valeur Totale d'Apport en Nature :</span>
                      <strong className="text-amber-300 font-mono text-base font-bold">{totalValeur.toLocaleString('fr-FR')} MAD</strong>
                      <span className="text-[10px] text-slate-500 block font-mono">Indexé sur {LEGAL_IDENTITY.valeurApportVariable}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
                  <p>
                    Le présent rapport d'inventaire, dressé et clos au <strong>{RAPPORT_INVENTAIRE_PERIODE.dateClotureRapport}</strong>, constate la réalité et la consistance des projets développés par <strong>{LEGAL_IDENTITY.founderName} (immatriculé sous le numéro d'état civil marocain {LEGAL_IDENTITY.matricule})</strong>.
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    L'inventaire garantit l'opposabilité des droits de propriété intellectuelle, le respect des règles du D.O.C et permet la souscription au capital social ou la cession de licences régies par le standard ISOC N° 2374734.
                  </p>
                </div>

                {/* Audit Spécifique du Build Multi-Terminaux & Réserve Solennelle */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/20 border border-amber-500/40 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-amber-400" />
                      <h4 className="font-bold text-amber-300 text-xs sm:text-sm font-['Cinzel',serif] tracking-wide">
                        Audit d'Effort Multi-Terminaux & Réserve Commissariat aux Apports
                      </h4>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-[11px]">
                      Lois 17-95 & 5-96 • Tribunal de Commerce
                    </span>
                  </div>

                  {/* Devices metrics breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                        <span>Effort Smartphone</span>
                      </div>
                      <strong className="text-sky-300 text-base block font-bold">
                        {MULTI_DEVICE_BUILD_EFFORT.smartphoneEffortHeures} Heures
                      </strong>
                      <span className="text-[10px] text-slate-500 block">
                        {Math.round(MULTI_DEVICE_BUILD_EFFORT.smartphoneEffortHeures * 60)} MOC • Cadrage mobile & terrain
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Laptop className="w-3.5 h-3.5 text-amber-400" />
                        <span>Effort Ordinateur</span>
                      </div>
                      <strong className="text-amber-300 text-base block font-bold">
                        {MULTI_DEVICE_BUILD_EFFORT.computerEffortHeures} Heures
                      </strong>
                      <span className="text-[10px] text-slate-500 block">
                        {Math.round(MULTI_DEVICE_BUILD_EFFORT.computerEffortHeures * 60)} MOC • Code TypeScript & DNS
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950 border border-emerald-500/30 space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                        <Coins className="w-3.5 h-3.5" />
                        <span>Consolidation Totale</span>
                      </div>
                      <strong className="text-emerald-300 text-base block font-bold">
                        {MULTI_DEVICE_BUILD_EFFORT.totalEffortHeures} Heures = {MULTI_DEVICE_BUILD_EFFORT.totalEffortMOC.toLocaleString('fr-FR')} MOC
                      </strong>
                      <span className="text-[10px] text-slate-400 block font-sans">
                        Valeur travail convertible : <strong>{MULTI_DEVICE_BUILD_EFFORT.valeurSessionMAD.toLocaleString('fr-FR')} MAD</strong> ({MULTI_DEVICE_BUILD_EFFORT.tauxHoraireExpertiseMAD} MAD/h)
                      </span>
                    </div>
                  </div>

                  {/* Machine execution detail */}
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
                    <span>Moteur : <strong>Gemini Flash (Google AI Studio)</strong></span>
                    <span>Dernier Build Continu : <strong className="text-amber-300">{MULTI_DEVICE_BUILD_EFFORT.lastBuildDurationSeconds}s</strong> (~5,25 min machine)</span>
                    <span>Statut : <strong className="text-amber-300 font-bold">{LEGAL_IDENTITY.statutValeurApport}</strong></span>
                  </div>

                  {/* Réserve solennelle pour le Commissariat aux apports */}
                  <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-amber-300">
                      <Scale className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Réserve Solennelle pour le Commissariat aux Apports Officiel</span>
                    </div>
                    <p className="leading-relaxed text-[11px] text-amber-100/90 font-sans">
                      {MULTI_DEVICE_BUILD_EFFORT.mentionReserveCommissariat}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-amber-500/20 text-[10px] font-mono text-amber-400/90">
                      <span>Fondement : Loi 17-95 art. 24 & Loi 5-96 art. 53</span>
                      <span>Juridiction : Tribunal de Commerce de Settat</span>
                      <span>Effet : Réserve expresse d'actifs immatériels additionnels</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: QUI ACHÈTE CE SERVICE ? (R.O.I & COUVERTURE ANTI-INFLATION) */}
          {activeTab === 'marche_roi' && (
            <div className="space-y-5">
              
              {/* Strategic Intro Banner */}
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/30 border border-amber-500/40 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm sm:text-base font-['Cinzel',serif]">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  <span>Étude d'Adéquation Marché : « Qui achète ce service et pourquoi ? »</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  L'apport en nature établi par l'inventaire réel et la métrique MOC/MOC+ répond à une <strong>demande économique et juridique majeure</strong> : comment valoriser le travail intellectuel, protéger son capital contre l'inflation monétaire et réussir des levées de fonds ou des augmentations de capital sans dilution de contrôle.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-emerald-400 font-bold block font-mono">1. Équité & R.O.I</span>
                    <span className="text-slate-400 text-[10px]">Chaque heure de recherche est convertie en capital bilantiel officiel (MOC) opposable.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-amber-400 font-bold block font-mono">2. Couverture Anti-Inflation</span>
                    <span className="text-slate-400 text-[10px]">Les liquidités perdent de la valeur ; les actifs logiciels et algorithmiques prennent de la valeur.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-cyan-400 font-bold block font-mono">3. Échange Électronique</span>
                    <span className="text-slate-400 text-[10px]">Loi 53-05, traçabilité QR CIH Bank et scellement d'état civil opposable au Tribunal.</span>
                  </div>
                </div>
              </div>

              {/* 4 Market Targets Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CIBLES_MARCHE_ROI.map((target, index) => (
                  <div 
                    key={target.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-amber-500/40">
                        0{index + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-100 text-sm">
                          {target.title}
                        </h4>
                        <p className="text-slate-400 text-[11px] mt-0.5">
                          {target.profilAcheteur}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase font-mono">Besoin Fondamental :</span>
                        <p className="text-slate-200 mt-0.5">{target.besoinFondamental}</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                        <span className="text-cyan-400 font-semibold block text-[10px] uppercase font-mono">Bénéfice & R.O.I Immédiat :</span>
                        <p className="text-slate-300 mt-0.5 leading-relaxed">{target.beneficeROI}</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/50">
                        <span className="text-emerald-400 font-semibold block text-[10px] uppercase font-mono">Effet Bouclier Anti-Inflation :</span>
                        <p className="text-slate-300 mt-0.5 leading-relaxed">{target.couvertureAntiInflation}</p>
                      </div>

                      <div className="text-[11px] text-amber-400/90 pt-1 font-mono">
                        → Modalité : {target.modaliteAcquisition}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Economic Simulator Panel */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-slate-200 text-xs uppercase tracking-wide flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-400" />
                    Simulateur de Gain Économique Réel (Exemple pour {totalValeur.toLocaleString('fr-FR')} MAD d'Apport)
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">Modèle d'Équité Doctrinale</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Économie de Cash Immédiat :</span>
                    <strong className="text-lg text-emerald-400 block mt-0.5">+{totalValeur.toLocaleString('fr-FR')} MAD</strong>
                    <span className="text-slate-500 text-[10px] block mt-0.5">Fonds propres augmentés sans décaisser de trésorerie</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Préservation face à l'Inflation (5% / an) :</span>
                    <strong className="text-lg text-amber-300 block mt-0.5">+{Math.round(totalValeur * 0.05).toLocaleString('fr-FR')} MAD/an</strong>
                    <span className="text-slate-500 text-[10px] block mt-0.5">L'actif immatériel préserve la valeur face à la hausse des prix</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Capacité d'Endettement Bancaire :</span>
                    <strong className="text-lg text-cyan-400 block mt-0.5">Jusqu'à {Math.round(totalValeur * 2).toLocaleString('fr-FR')} MAD</strong>
                    <span className="text-slate-500 text-[10px] block mt-0.5">Ratio d'autonomie financière multiplié par 2 à 3</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-400 font-mono text-center sm:text-left">
            Total Actif : <strong className="text-amber-300">{totalValeur.toLocaleString('fr-FR')} MAD</strong> • <span className="text-cyan-300">{totalMOC.toLocaleString('fr-FR')} MOC (~{totalHeures}h)</span> • Titulaire : <span className="text-slate-200">{LEGAL_IDENTITY.matricule}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportInventoryJSON}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              Exporter Rapport JSON
            </button>
            <button
              onClick={onClose}
              className="px-5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow"
            >
              Fermer le Registre
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
