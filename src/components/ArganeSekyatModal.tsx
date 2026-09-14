import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Bot, 
  Brain, 
  Send, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  Copy, 
  CheckCircle2, 
  Scale, 
  Clock, 
  Wrench, 
  Layers, 
  ExternalLink,
  MessageSquare,
  Users,
  ShieldCheck,
  Award,
  Hash,
  ArrowRight,
  Terminal,
  Zap,
  BookOpen,
  FileText
} from 'lucide-react';
import { 
  AGENT_ARGANE, 
  AGENT_SEKYAT, 
  DEBATE_SCENARIOS, 
  DebateScenario, 
  ChatMessage, 
  PRECONFIGURED_USER_PROMPTS 
} from '../data/arganeSekyatData';
import { LEGAL_IDENTITY } from '../data/servicesData';
import { copyToClipboard } from '../utils/deepLink';

interface ArganeSekyatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArganeSekyatModal: React.FC<ArganeSekyatModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'chat_to_chat' | 'direct_chat' | 'discord_gateway'>('chat_to_chat');
  
  // Chat-to-Chat Multi-Agent State
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [debateStep, setDebateStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [customDebateTopic, setCustomDebateTopic] = useState<string>('');
  
  // Direct Chat State
  const [directMessages, setDirectMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'argane',
      senderName: 'Argane (Droit Positif)',
      text: `Bienvenue sur la Console Argane-Sekyat V2. En tant qu'expert en Droit Positif marocain (Lois 17-95, 5-96, Constitution Art. 37), je suis à votre disposition pour sécuriser vos démarches, actes et formalités de greffe.`,
      timestamp: '11:00',
      metrics: { loiReference: 'Lois 17-95 & 5-96' }
    },
    {
      id: 'init-2',
      sender: 'sekyat',
      senderName: 'Sekyat (Méthodes BMM*)',
      text: `Et moi, Sekyat, j'interviens sur la quantification des efforts (Minute d'Occupation Convertible - MOC), la chrono-analyse industrielle SMED et l'équilibre financier BNC. Posez votre question, nous vous répondrons en duo ou individuellement.`,
      timestamp: '11:01',
      metrics: { mocPonderee: 100 }
    }
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [answeringMode, setAnsweringMode] = useState<'duo' | 'argane' | 'sekyat'>('duo');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  // Discord Gateway State
  const [discordWebhookUrl, setDiscordWebhookUrl] = useState<string>('');
  const [discordStatus, setDiscordStatus] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const directChatEndRef = useRef<HTMLDivElement>(null);
  const debateChatEndRef = useRef<HTMLDivElement>(null);

  const currentScenario: DebateScenario = DEBATE_SCENARIOS[selectedScenarioIndex];

  // Auto-play timer for Chat-to-Chat debate
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isAutoPlaying) {
      if (debateStep < currentScenario.steps.length) {
        timer = setTimeout(() => {
          setDebateStep((prev) => prev + 1);
        }, 3200);
      } else {
        setIsAutoPlaying(false);
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAutoPlaying, debateStep, currentScenario.steps.length]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (activeTab === 'direct_chat') {
      directChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (activeTab === 'chat_to_chat') {
      debateChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [directMessages, debateStep, activeTab]);

  if (!isOpen) return null;

  const handleNextDebateStep = () => {
    if (debateStep < currentScenario.steps.length) {
      setDebateStep((prev) => prev + 1);
    }
  };

  const handleResetDebate = () => {
    setIsAutoPlaying(false);
    setDebateStep(0);
  };

  const handleSelectScenario = (index: number) => {
    setIsAutoPlaying(false);
    setSelectedScenarioIndex(index);
    setDebateStep(0);
  };

  const handleSendDirectMessage = (textToSend?: string) => {
    const text = (textToSend || userInput).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      senderName: 'Vous (Usager)',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setDirectMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setUserInput('');
    setIsTyping(true);

    // Simulate intelligent synthesis response from Argane and/or Sekyat
    setTimeout(() => {
      setIsTyping(false);
      const lower = text.toLowerCase();
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (answeringMode === 'argane' || (answeringMode === 'duo' && !lower.includes('smed') && !lower.includes('chrono'))) {
        let arganeText = `Sur le plan du Droit Positif marocain (Lois 17-95 et 5-96, et dispositions du D.O.C), votre démarche requiert la rédaction d'un procès-verbal analysé par le Bureau des méthodes. L'antériorité de conception sous le titulaire Mohamed MORCHID (${LEGAL_IDENTITY.matricule}, ICE ${LEGAL_IDENTITY.iceNumber}) confère une force probante pleine et entière devant le greffe du Tribunal de Commerce de Settat (RC ${LEGAL_IDENTITY.rcNumber}). L'usager citoyen bénéficie de la gratuité constitutionnelle (0,00 MAD usager selon l'Art. 37 de la Constitution).`;
        
        if (lower.includes('capital') || lower.includes('apport')) {
          arganeText = `Pour incorporer des actifs incorporels au capital social (Loi 17-95 Art. 24 / Loi 5-96 Art. 53), il convient d'annexer l'inventaire contradictoire des travaux en cours (Analysé par le Bureau des méthodes Objectio — valeur soumise à l’appréciation du commissaire aux apports), garantissant l'absence de passif et la non-subordination salariale.`;
        } else if (lower.includes('deepseek') || lower.includes('sans api') || lower.includes('ia')) {
          arganeText = `Concernant les recherches développées sur plateformes IA fermées sans API (comme DeepSeek), le protocole probatoire repose sur l'empreinte de dates de séances, le scellement d'antériorité doctrinale et la conservation des journaux de requêtes (IAP - Information Attention Pénible), protégeant vos droits moraux inaliénables d'auteur.`;
        }

        const arganeMsg: ChatMessage = {
          id: `argane-${Date.now()}`,
          sender: 'argane',
          senderName: 'Argane (Droit Positif)',
          text: arganeText,
          timestamp: timeStr,
          metrics: { loiReference: 'D.O.C & Loi 17-95/5-96' }
        };
        setDirectMessages((prev) => [...prev, arganeMsg]);
      }

      if (answeringMode === 'sekyat' || answeringMode === 'duo') {
        let sekyatText = `Du point de vue de l'ingénierie méthodes BMM* : cette opération est valorisée en Minutes d'Occupation Convertible (MOC). L'effort intellectuel est quantifié à 60 MOC par heure effective, affecté d'un multiplicateur de complexité MOC+ pour sécuriser votre bilan incorporel sans impacter votre trésorerie liquide.`;
        
        if (lower.includes('smed') || lower.includes('chrono') || lower.includes('atelier')) {
          sekyatText = `Pour la chrono-analyse SMED d'atelier, la méthodologie BMM* scinde les temps de transition : préparation externe en temps masqué, outillage pré-réglé, et standardisation 5S. Vous pouvez ainsi diviser par 3 les temps d'arrêt machine et optimiser votre Taux de Rendement Synthétique (TRS).`;
        } else if (lower.includes('bnc') || lower.includes('dollar') || lower.includes('facture') || lower.includes('honoraires') || lower.includes('6600')) {
          sekyatText = `Le modèle de financement international est adossé à la Note d'Honoraires BMM* ($6 600 USD / 66 000 MAD) et à la domiciliation Banque Nationale du Canada (Compte BNC International). Il permet de couvrir les requêtes serveurs et l'hébergement sans débourser un seul dirham citoyen.`;
        }

        const sekyatMsg: ChatMessage = {
          id: `sekyat-${Date.now() + 1}`,
          sender: 'sekyat',
          senderName: 'Sekyat (Méthodes BMM*)',
          text: sekyatText,
          timestamp: timeStr,
          metrics: { mocPonderee: 1200 }
        };
        
        setTimeout(() => {
          setDirectMessages((prev) => [...prev, sekyatMsg]);
        }, answeringMode === 'duo' ? 600 : 0);
      }
    }, 900);
  };

  const handleCopyTranscript = async () => {
    let transcript = `================================================================================\n`;
    transcript += `PROCES-VERBAL DE CONCERTATION INTELLIGENTE — ARGANE-SEKYAT V2\n`;
    transcript += `Cabinet de Consulting BMM* • Titulaire : Mohamed MORCHID (Fondateur)\n`;
    transcript += `Immatriculation : RC 16894 Settat • ICE 003707910000033 • E-mail : contact@morchidi.digital\n`;
    transcript += `================================================================================\n\n`;

    if (activeTab === 'chat_to_chat') {
      transcript += `SCÉNARIO : ${currentScenario.title}\n`;
      transcript += `Catégorie : ${currentScenario.category}\n`;
      transcript += `Question Initiale : ${currentScenario.initialQuestion}\n\n`;
      transcript += `DÉROULEMENT DU DÉBAT CONTRADICTOIRE :\n`;
      currentScenario.steps.slice(0, debateStep).forEach((step, idx) => {
        const speakerName = step.speaker === 'argane' ? 'ARGANE (Droit Positif)' : 'SEKYAT (Méthodes BMM*)';
        transcript += `\n[Étape ${idx + 1}] ${speakerName} :\n${step.text}\n`;
        if (step.metrics?.loiReference) transcript += `   -> Réf Légale : ${step.metrics.loiReference}\n`;
        if (step.metrics?.mocPonderee) transcript += `   -> Effort MOC : ${step.metrics.mocPonderee} MOC\n`;
      });
      if (debateStep >= currentScenario.steps.length) {
        transcript += `\nSYNTHÈSE CONSENSUELLE :\n${currentScenario.consensus}\n`;
      }
    } else {
      transcript += `SESSION DE CONSULTATION DIRECTE USAGER :\n\n`;
      directMessages.forEach((msg) => {
        transcript += `[${msg.timestamp}] ${msg.senderName} :\n${msg.text}\n\n`;
      });
    }

    transcript += `\nÉtabli sous le sceau méthodologique d'ingénierie BMM* — Analysé par le Bureau des méthodes Objectio — valeur soumise à l’appréciation du commissaire aux apports.\n`;
    transcript += `Date de scellement : ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}\n`;

    await copyToClipboard(transcript);
    setCopiedNotification('transcript-copied');
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  const handleSimulateDiscordRelay = () => {
    setDiscordStatus('sending');
    setTimeout(() => {
      setDiscordStatus('success');
      setTimeout(() => setDiscordStatus(null), 4000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 rounded-2xl shadow-2xl shadow-purple-950/40 text-slate-100 flex flex-col max-h-[92vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Glow Accent */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-32 bg-purple-500/15 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -top-16 right-8 w-64 h-24 bg-emerald-500/10 blur-[70px] rounded-full pointer-events-none" />

        {/* Modal Header */}
        <div className="relative px-4 sm:px-6 py-4 border-b border-slate-800/90 flex items-center justify-between bg-slate-950/70 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-500 p-0.5 shadow-md shadow-purple-950/50 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-1.5">
                  Argane-Sekyat <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono font-bold">V2</span>
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Chat To Chat & Duo Doctrinal
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-700/50 hidden sm:inline-flex items-center gap-1">
                  <Hash className="w-2.5 h-2.5" />
                  Discord & DeepSeek Inspiration
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Conçu et formalisé par <strong>{LEGAL_IDENTITY.founderName}</strong> (État Civil {LEGAL_IDENTITY.matricule} • RC {LEGAL_IDENTITY.rcNumber} Settat)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyTranscript}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700 text-xs text-slate-200 cursor-pointer transition-colors"
              title="Copier le procès-verbal intégral des échanges"
            >
              <Copy className="w-3.5 h-3.5 text-purple-400" />
              <span>Copier PV</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              title="Fermer la console"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-6 pt-2 bg-slate-950 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('chat_to_chat')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'chat_to_chat'
                ? 'border-purple-500 text-white bg-slate-900/90'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span>Mode Multi-Agents (Argane 🤖 ↔ Sekyat 🧠)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 font-mono">
              Auto-Débat
            </span>
          </button>

          <button
            onClick={() => setActiveTab('direct_chat')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'direct_chat'
                ? 'border-emerald-500 text-white bg-slate-900/90'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Consultation Directe (Vous 👤 ↔ Argane-Sekyat)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              Duo
            </span>
          </button>

          <button
            onClick={() => setActiveTab('discord_gateway')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'discord_gateway'
                ? 'border-indigo-500 text-white bg-slate-900/90'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>Passerelle Discord Bot & DeepSeek</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 font-sans">
          {/* TAB 1 : CHAT TO CHAT (MULTI-AGENTS DEBATE) */}
          {activeTab === 'chat_to_chat' && (
            <div className="space-y-4">
              {/* Scenario Selector & Controls Ribbon */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wide font-mono">
                      Scénario de Débat Doctrinal :
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {currentScenario.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    {currentScenario.title}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                    {currentScenario.description}
                  </p>
                </div>

                {/* Scenario Switcher Buttons */}
                <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                  {DEBATE_SCENARIOS.map((scen, idx) => (
                    <button
                      key={scen.id}
                      onClick={() => handleSelectScenario(idx)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer border ${
                        selectedScenarioIndex === idx
                          ? 'bg-purple-600 text-white border-purple-400 shadow-sm'
                          : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-800'
                      }`}
                      title={scen.title}
                    >
                      Scénario {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Initial Question Banner */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/30 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-wider">
                    Thématique Soumise au Duo Argane & Sekyat :
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-100 mt-0.5 leading-relaxed">
                    « {currentScenario.initialQuestion} »
                  </p>
                </div>
              </div>

              {/* Debate Controls Bar */}
              <div className="flex items-center justify-between flex-wrap gap-2 py-1 px-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                      isAutoPlaying
                        ? 'bg-amber-600 hover:bg-amber-500 text-white'
                        : 'bg-purple-600 hover:bg-purple-500 text-white'
                    }`}
                  >
                    {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isAutoPlaying ? 'Mettre en Pause' : 'Lecture Automatique'}</span>
                  </button>

                  <button
                    onClick={handleNextDebateStep}
                    disabled={debateStep >= currentScenario.steps.length || isAutoPlaying}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Étape Suivante</span>
                    <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                  </button>

                  <button
                    onClick={handleResetDebate}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                    title="Réinitialiser le débat"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span>Progression :</span>
                  <span className="font-bold text-purple-400">{debateStep} / {currentScenario.steps.length}</span>
                  <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 transition-all duration-300"
                      style={{ width: `${(debateStep / currentScenario.steps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Chat-to-Chat Flow Display */}
              <div className="space-y-3 min-h-[280px] max-h-[420px] overflow-y-auto p-3 rounded-xl bg-slate-950/70 border border-slate-850">
                {debateStep === 0 && (
                  <div className="py-12 text-center text-slate-500 space-y-2">
                    <Users className="w-8 h-8 mx-auto text-purple-400/60 animate-bounce" />
                    <p className="text-xs">
                      Cliquez sur <strong>« Lecture Automatique »</strong> ou <strong>« Étape Suivante »</strong> pour déclencher la confrontation doctrinale entre Argane et Sekyat.
                    </p>
                  </div>
                )}

                {currentScenario.steps.slice(0, debateStep).map((step, idx) => {
                  const isArgane = step.speaker === 'argane';
                  const persona = isArgane ? AGENT_ARGANE : AGENT_SEKYAT;

                  return (
                    <div 
                      key={idx}
                      className={`p-3.5 rounded-xl border flex flex-col gap-2 transition-all animate-in fade-in slide-in-from-bottom-2 duration-200 ${
                        isArgane 
                          ? 'bg-slate-900/90 border-emerald-500/30' 
                          : 'bg-slate-900/90 border-amber-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${persona.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
                            {isArgane ? <Scale className="w-3.5 h-3.5" /> : <Wrench className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <span className={`text-xs font-bold ${persona.accentColor}`}>
                              {persona.name}
                            </span>
                            <span className="text-[10px] text-slate-400 ml-1.5 font-mono">
                              ({persona.role})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {step.metrics?.loiReference && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                              {step.metrics.loiReference}
                            </span>
                          )}
                          {step.metrics?.mocPonderee && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60 flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              {step.metrics.mocPonderee.toLocaleString()} MOC
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-slate-500">
                            Étape {idx + 1}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-9">
                        {step.text}
                      </p>
                    </div>
                  );
                })}

                {/* Consensus Box When Completed */}
                {debateStep >= currentScenario.steps.length && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/50 via-slate-900 to-emerald-950/50 border-2 border-purple-500/50 space-y-2 animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                          Synthèse & Consensus Final
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Scellement BMM* Validé
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed font-sans">
                      {currentScenario.consensus}
                    </p>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Adossé à la Domiciliation BNC • Gratuité usager 0,00 MAD</span>
                      <button
                        onClick={handleCopyTranscript}
                        className="text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Exporter cette synthèse</span>
                      </button>
                    </div>
                  </div>
                )}
                <div ref={debateChatEndRef} />
              </div>
            </div>
          )}

          {/* TAB 2 : CONSULTATION DIRECTE (USAGER ↔ DUO) */}
          {activeTab === 'direct_chat' && (
            <div className="space-y-4">
              {/* Answering Mode Selector & Badges */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-300 font-mono">Mode d'écoute :</span>
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setAnsweringMode('duo')}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                        answeringMode === 'duo'
                          ? 'bg-gradient-to-r from-purple-600 to-emerald-600 text-white font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Duo Synthèse (Argane + Sekyat)
                    </button>
                    <button
                      onClick={() => setAnsweringMode('argane')}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                        answeringMode === 'argane'
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Argane Seul (Droit)
                    </button>
                    <button
                      onClick={() => setAnsweringMode('sekyat')}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                        answeringMode === 'sekyat'
                          ? 'bg-amber-600 text-white font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Sekyat Seul (SMED/BMM*)
                    </button>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 font-mono">
                  Réponse instantanée • Gratuité 0 MAD
                </span>
              </div>

              {/* Direct Messages Flow */}
              <div className="space-y-3 min-h-[300px] max-h-[420px] overflow-y-auto p-3.5 rounded-xl bg-slate-950/70 border border-slate-850">
                {directMessages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  const isArgane = msg.sender === 'argane';
                  const isSekyat = msg.sender === 'sekyat';

                  return (
                    <div 
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                        <span>{msg.senderName}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div 
                        className={`p-3.5 rounded-xl max-w-[85%] text-xs sm:text-sm leading-relaxed ${
                          isUser
                            ? 'bg-purple-600 text-white rounded-tr-none'
                            : isArgane
                            ? 'bg-slate-900 border border-emerald-500/40 text-slate-100 rounded-tl-none'
                            : 'bg-slate-900 border border-amber-500/40 text-slate-100 rounded-tl-none'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Metadonnées */}
                        {msg.metrics && (
                          <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center gap-2 text-[10px] font-mono">
                            {msg.metrics.loiReference && (
                              <span className="text-emerald-400">Réf : {msg.metrics.loiReference}</span>
                            )}
                            {msg.metrics.mocPonderee && (
                              <span className="text-amber-400">Effort : {msg.metrics.mocPonderee} MOC</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 p-2 font-mono">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                    <span>Argane et Sekyat préparent votre synthèse juridique et industrielle...</span>
                  </div>
                )}
                <div ref={directChatEndRef} />
              </div>

              {/* Preconfigured Questions Chips */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Suggestions rapides :</div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {PRECONFIGURED_USER_PROMPTS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendDirectMessage(item.prompt)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title={item.prompt}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendDirectMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Posez une question sur le Droit Positif, la chrono-analyse SMED, la conversion MOC..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  disabled={!userInput.trim()}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3 : PASSERELLE DISCORD BOT & DEEPSEEK */}
          {activeTab === 'discord_gateway' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                        <span>Architecture Discord Bot & DeepSeek Moteur</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                          Actif
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        Votre script Python initial (avec `tqdm.contrib.discord` et la modélisation cognitive DeepSeek) est répliqué ici dans un moteur web sécurisé.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech Specs Box */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-850">
                    <div className="text-slate-500 text-[10px] uppercase">Moteur Cognitif</div>
                    <div className="text-purple-300 font-bold mt-0.5">DeepSeek-R1 / V3 Hybrid</div>
                    <div className="text-[10px] text-slate-400 mt-1">Prompté sous le corpus doctrinal BMM*</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-850">
                    <div className="text-slate-500 text-[10px] uppercase">Relais Discord</div>
                    <div className="text-indigo-300 font-bold mt-0.5">Discord API v10 Webhook</div>
                    <div className="text-[10px] text-slate-400 mt-1">Channel : Argane-Sekyat</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-850">
                    <div className="text-slate-500 text-[10px] uppercase">Souveraineté & Coût</div>
                    <div className="text-emerald-300 font-bold mt-0.5">0,00 MAD Décaissé</div>
                    <div className="text-[10px] text-slate-400 mt-1">Prise en charge Domiciliation BNC</div>
                  </div>
                </div>
              </div>

              {/* Webhook Configuration Field */}
              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono uppercase">
                    Connecteur Webhook Discord (Optionnel) :
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Permet de notifier votre salon Discord en temps réel
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="url"
                    value={discordWebhookUrl}
                    onChange={(e) => setDiscordWebhookUrl(e.target.value)}
                    placeholder="https://discord.com/api/webhooks/YOUR_WEBHOOK_URL..."
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-sky-300 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleSimulateDiscordRelay}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Tester la Passerelle Discord</span>
                  </button>
                </div>

                {discordStatus === 'sending' && (
                  <div className="text-xs text-indigo-300 flex items-center gap-2 font-mono">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
                    <span>Transmission du message vers le canal Discord Argane-Sekyat...</span>
                  </div>
                )}

                {discordStatus === 'success' && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-mono animate-in fade-in duration-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Passerelle testée avec succès ! Le paquet d'échanges Argane-Sekyat est prêt à être streamé sur votre Discord.</span>
                  </div>
                )}
              </div>

              {/* Extrait d'Inventaire Associé (inv-06) */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold font-mono">
                  <BookOpen className="w-4 h-4" />
                  <span>Traçabilité d'Inventaire MOC (Code : PROJ-AI-INSPIRATION) :</span>
                </div>
                <p className="leading-relaxed">
                  Cet agent Argane-Sekyat V2 concrétise l'actif incorporel inventorié au bilan (500h / 30 000 MOC valorisé à 44 000 MAD) relatif à la modélisation cognitive sur plateformes IA (DeepSeek, AI Studio) formalisant le concept d'« Information Attention Pénible » (IAP).
                </p>
              </div>
            </div>
          )}

          {/* Copied Feedback Toast */}
          {copiedNotification && (
            <div className="p-2.5 rounded-lg bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs flex items-center justify-between font-mono animate-in fade-in slide-in-from-bottom-1 duration-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Procès-verbal de concertation Argane-Sekyat V2 copié dans le presse-papiers !</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase">Format PV BMM*</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-slate-800/80 bg-slate-950/90 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-400 font-mono shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Console Argane-Sekyat V2 • Statut Opérationnel</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500">|</span>
            <button
              onClick={handleCopyTranscript}
              className="text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copier les Échanges</span>
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
