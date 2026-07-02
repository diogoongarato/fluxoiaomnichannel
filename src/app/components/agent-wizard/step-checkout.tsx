import { useState, useRef, useEffect } from "react";
import {
  CheckCircle2,
  MessageCircle,
  Clock,
  Users,
  Smile,
  Briefcase,
  Zap,
  Heart,
  Send,
  Bot,
  Car,
  Sparkles,
  ListChecks,
  Globe,
  ArrowRightLeft,
  Megaphone,
  UserCheck,
  Building2,
  Pencil,
  AlertTriangle,
} from "lucide-react";
import type { Dealership, Channel } from "./step-connection";
import type { RulesConfig } from "./step-rules";

interface Message {
  id: string;
  from: "user" | "ai" | "system";
  text: string;
  timestamp: string;
}

const personalityMap: Record<string, { name: string; icon: React.ElementType }> = {
  friendly: { name: "Vendedor Amigável", icon: Smile },
  formal: { name: "Consultor Formal", icon: Briefcase },
  fast: { name: "Objetivo e Direto", icon: Zap },
  empathetic: { name: "Acolhedor e Empático", icon: Heart },
};

const handoffKeywords = ["financ", "parcela", "entrada", "troca", "avaliar", "avaliação", "test drive", "test-drive", "agendar visita"];

interface StepCheckoutProps {
  personality: string;
  aiName: string;
  companyHistory: string;
  dealerships: Dealership[];
  channels: Channel[];
  rulesConfig: RulesConfig;
  onGoToStep: (step: number) => void;
  onEditFromCheckout: (step: number, sectionId: string) => void;
}

export function StepCheckout({ personality, aiName, companyHistory, dealerships, channels, rulesConfig, onGoToStep, onEditFromCheckout }: StepCheckoutProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [handedOff, setHandedOff] = useState(false);
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activePersonality = personalityMap[personality] || personalityMap.friendly;
  const displayName = aiName.trim() || "IA atendente";

  // Compute real data
  const allVehicles = dealerships.flatMap((d) => d.vehicles);
  const totalVehicles = allVehicles.length;
  const availableVehicles = allVehicles.filter((v) => v.status === "available");
  const connectedChannels = channels.filter((c) => c.connected);
  const channelNames = connectedChannels.map((c) => c.name).join(", ");
  const activeTeam = rulesConfig.team.filter((m) => m.active);

  const scheduleLabel = rulesConfig.scheduleMode === "24/7"
    ? "24 horas, 7 dias por semana"
    : `${rulesConfig.businessHours.start} — ${rulesConfig.businessHours.end}, Seg a Dom`;

  const transferLabels: string[] = [];
  if (rulesConfig.transferTriggers.financing) transferLabels.push("Financiamento");
  if (rulesConfig.transferTriggers.tradeIn) transferLabels.push("Troca");
  if (rulesConfig.transferTriggers.testDrive) transferLabels.push("Test-drive");
  if (rulesConfig.transferTriggers.priceNeg) transferLabels.push("Negociação de preço");

  const teamLabel = rulesConfig.followQueue
    ? "Fila padrão da equipe"
    : `${activeTeam.length} vendedores ativos (rodízio)`;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isTyping]);

  // Build greeting that includes AI name
  const getGreeting = () => {
    const greetings: Record<string, string> = {
      friendly: `Oi! 😊 Eu sou a ${displayName}! Que bom falar com você! Temos ${availableVehicles.length} veículos disponíveis aqui. O que você está procurando? SUV, sedan, hatch, picape? Me conta!`,
      formal: `Boa tarde. Sou ${displayName}, assistente virtual desta concessionária. Temos ${availableVehicles.length} veículos disponíveis em nosso estoque. Posso auxiliá-lo na busca por algum veículo específico?`,
      fast: `Olá! Sou ${displayName}. ${availableVehicles.length} veículos disponíveis. O que procura?`,
      empathetic: `Olá! Eu sou a ${displayName}! 🙂 Que bom receber você por aqui! Temos ${availableVehicles.length} veículos esperando um novo dono. Me conta: o que você está buscando? Quero entender direitinho pra te ajudar!`,
    };
    return greetings[personality] || greetings.friendly;
  };

  const findResponse = (text: string): { response: string; isHandoff: boolean } => {
    const lower = text.toLowerCase();
    const shouldHandoff = handoffKeywords.some((k) => lower.includes(k));

    // Search for specific vehicle by name
    const matchedVehicles = allVehicles.filter((v) => {
      const modelLower = v.model.toLowerCase();
      const words = lower.split(/\s+/);
      return words.some((w) => w.length > 2 && modelLower.includes(w));
    });

    if (matchedVehicles.length > 0) {
      const available = matchedVehicles.filter((v) => v.status === "available");
      const reserved = matchedVehicles.filter((v) => v.status !== "available");

      if (personality === "friendly") {
        let resp = available.length > 0
          ? `Boa notícia! 🎉 Encontrei ${available.length > 1 ? "esses" : "esse"} no nosso estoque:\n\n${available.map((v) => `• ${v.model} — ${v.year}, ${v.km}, ${v.price}`).join("\n")}\n\n`
          : "";
        if (reserved.length > 0 && available.length > 0) resp += `Também temos, mas ${reserved.length === 1 ? "esse está" : "esses estão"} reservados/showroom:\n${reserved.map((v) => `• ${v.model} — ${v.price} (${v.status === "reserved" ? "reservado" : "showroom"})`).join("\n")}\n\n`;
        if (available.length === 0) resp = `Infelizmente os modelos que encontrei estão ${reserved.map((v) => `${v.model} (${v.status === "reserved" ? "reservado" : "showroom"})`).join(", ")}. Mas temos outros modelos incríveis! Quer que eu mostre? 😊`;
        else resp += "Quer mais detalhes de algum deles? 😊";
        return { response: resp, isHandoff: shouldHandoff };
      } else if (personality === "formal") {
        let resp = available.length > 0
          ? `Localizei os seguintes veículos em nosso estoque:\n\n${available.map((v) => `• ${v.model} — ${v.year}, ${v.km}, ${v.price}`).join("\n")}\n\n`
          : "";
        if (available.length === 0) resp = `Os modelos encontrados estão indisponíveis no momento (${reserved.map((v) => v.status === "reserved" ? "reservado" : "showroom").join(", ")}). Posso sugerir alternativas equivalentes.`;
        else resp += "Posso fornecer a ficha técnica completa de qualquer um deles.";
        return { response: resp, isHandoff: shouldHandoff };
      } else if (personality === "fast") {
        const lines = matchedVehicles.map((v) => `→ ${v.model} — ${v.price}, ${v.km} ${v.status !== "available" ? `(${v.status === "reserved" ? "reservado" : "showroom"})` : ""}`).join("\n");
        return { response: `${lines}\n${available.length > 0 ? "Agendar visita?" : "Indisponíveis. Sugerir similares?"}`, isHandoff: shouldHandoff };
      } else {
        let resp = available.length > 0
          ? `Que bom que você perguntou! 🙂 Encontrei:\n\n${available.map((v) => `• ${v.model} — ${v.year}, ${v.km}, ${v.price}`).join("\n")}\n\nQuer saber mais sobre algum? Posso te contar tudo!`
          : `Puxa, os modelos que encontrei estão indisponíveis no momento. Mas não se preocupa — tenho certeza que vamos encontrar algo perfeito pra você! Me conta o que é importante pra você num carro? 🙂`;
        return { response: resp, isHandoff: shouldHandoff };
      }
    }

    // Category-based search
    const suvKeywords = ["suv", "suvs"];
    const sedanKeywords = ["sedan", "sedans", "civic", "corolla"];
    const pickupKeywords = ["picape", "pickup", "hilux", "ranger", "s10", "frontier", "amarok", "toro", "montana", "strada"];
    const cheapKeywords = ["barato", "econôm", "popular", "até 100", "até 80", "até 70"];

    const filterByCategory = (keywords: string[]) => {
      if (!keywords.some((k) => lower.includes(k))) return null;
      // For SUVs, match common SUV models
      if (keywords === suvKeywords) {
        const suvModels = ["Cross", "Compass", "Creta", "HR-V", "Tracker", "Kicks", "Tucson", "T-Cross", "Renegade", "Nivus", "Pulse", "Fastback", "Outlander", "Tiggo", "2008", "X1", "GLA", "Q3", "XC40", "SW4", "RAV4", "Commander", "Equinox", "Territory", "Taos", "Duster", "WR-V"];
        return availableVehicles.filter((v) => suvModels.some((m) => v.model.includes(m)));
      }
      if (keywords === sedanKeywords) {
        const sedanModels = ["Civic", "Corolla", "Yaris", "City", "Virtus", "Onix Plus", "HB20S"];
        return availableVehicles.filter((v) => sedanModels.some((m) => v.model.includes(m)));
      }
      if (keywords === pickupKeywords) {
        const pickupModels = ["Hilux", "Ranger", "S10", "Frontier", "Amarok", "Toro", "Montana", "Strada"];
        return availableVehicles.filter((v) => pickupModels.some((m) => v.model.includes(m)));
      }
      if (keywords === cheapKeywords) {
        return availableVehicles.filter((v) => {
          const price = parseInt(v.price.replace(/\D/g, ""));
          return price <= 10000000; // up to 100k (price in cents-like format)
        }).slice(0, 6);
      }
      return null;
    };

    for (const kw of [suvKeywords, sedanKeywords, pickupKeywords, cheapKeywords]) {
      const results = filterByCategory(kw);
      if (results && results.length > 0) {
        const shown = results.slice(0, 5);
        const formatMap: Record<string, (vs: typeof shown) => string> = {
          friendly: (vs) => `Oi! 😊 Temos ótimas opções! Olha só:\n\n${vs.map((v) => `• ${v.model} — ${v.year}, ${v.km}, ${v.price}`).join("\n")}${results.length > 5 ? `\n\nE mais ${results.length - 5} opções!` : ""}\n\nQuer mais detalhes de algum? 😊`,
          formal: (vs) => `Atualmente dispomos dos seguintes:\n\n${vs.map((v) => `• ${v.model} — ${v.year}, ${v.km}, ${v.price}`).join("\n")}${results.length > 5 ? `\n\nTemos mais ${results.length - 5} opções adicionais.` : ""}\n\nPosso fornecer informações detalhadas de qualquer modelo.`,
          fast: (vs) => `${vs.map((v) => `→ ${v.model} — ${v.price}, ${v.km}`).join("\n")}${results.length > 5 ? `\n+${results.length - 5} opções` : ""}\nQual te interessa?`,
          empathetic: (vs) => `Que ótima escolha! 🙂 Encontrei essas opções pra você:\n\n${vs.map((v) => `• ${v.model} — ${v.price}`).join("\n")}${results.length > 5 ? `\n\nE mais ${results.length - 5} opções!` : ""}\n\nMe conta qual te chamou mais atenção que eu explico tudo! 💜`,
        };
        return { response: formatMap[personality]?.(shown) || formatMap.friendly(shown), isHandoff: shouldHandoff };
      }
    }

    // Financing
    if (["financ", "parcela", "entrada"].some((k) => lower.includes(k))) {
      const resp: Record<string, string> = {
        friendly: `Trabalhamos com financiamento sim! 🎉 Taxas a partir de 0,99% ao mês. Vou te passar pro nosso especialista financeiro!`,
        formal: `Certamente. Trabalhamos com financiamento bancário e CDC com taxas competitivas. Vou encaminhá-lo ao departamento financeiro.`,
        fast: `Financiamento a partir de 0,99%/mês. Passando para o financeiro.`,
        empathetic: `Claro, vamos fazer isso com calma! 💜 As condições são bem flexíveis. Vou te passar pro nosso especialista — ele vai montar a melhor proposta!`,
      };
      return { response: resp[personality] || resp.friendly, isHandoff: true };
    }

    // Trade-in
    if (["troca", "avaliar", "avaliação", "meu carro"].some((k) => lower.includes(k))) {
      const resp: Record<string, string> = {
        friendly: `Claro, aceitamos troca! 🔄 Avaliação gratuita na hora. Vou te transferir pro vendedor!`,
        formal: `Realizamos avaliação sem compromisso. Vou direcioná-lo ao consultor responsável.`,
        fast: `Aceitamos troca. Avaliação gratuita. Transferindo.`,
        empathetic: `Entendi! A troca é ótima! 🔄 Avaliação sem compromisso. Vou te conectar com nosso vendedor!`,
      };
      return { response: resp[personality] || resp.friendly, isHandoff: true };
    }

    // Test drive
    if (["test drive", "test-drive", "agendar", "visita", "conhecer"].some((k) => lower.includes(k))) {
      const resp: Record<string, string> = {
        friendly: `Show! 🗓️ Vou te passar pro time pra agendar o melhor horário! Um minutinho!`,
        formal: `Vou encaminhá-lo ao consultor para agendar conforme sua disponibilidade.`,
        fast: `Certo. Transferindo para agendamento.`,
        empathetic: `Adorei! Nada como sentir o carro! 😊 Vou te passar pro time pra agendar!`,
      };
      return { response: resp[personality] || resp.friendly, isHandoff: true };
    }

    // Greeting
    if (["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite", "hey", "eae"].some((k) => lower.includes(k))) {
      return { response: getGreeting(), isHandoff: false };
    }

    // Default
    const defaults: Record<string, string> = {
      friendly: `Hmm, deixa eu ver... 🔍 Temos ${availableVehicles.length} veículos disponíveis! Me conta melhor o que procura (SUV, sedan, hatch, picape, ou nome do modelo) que eu te mostro as melhores opções!`,
      formal: `Atualmente contamos com ${availableVehicles.length} veículos disponíveis. Poderia especificar a categoria ou modelo de interesse?`,
      fast: `${availableVehicles.length} veículos disponíveis. Especifique: SUV, sedan, hatch, picape ou modelo?`,
      empathetic: `Entendi! 🙂 Pra te ajudar melhor, me conta: que tipo de carro você busca? Pode ser a categoria (SUV, sedan) ou o nome do modelo! Quero achar o ideal pra você!`,
    };
    return { response: defaults[personality] || defaults.friendly, isHandoff: shouldHandoff };
  };

  const sendMessage = () => {
    if (!input.trim() || handedOff) return;
    const now = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = { id: `user-${Date.now()}`, from: "user", text: input.trim(), timestamp: now };
    const userText = input.trim();
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const isFirst = !firstMessageSent;
    if (isFirst) setFirstMessageSent(true);

    const delay = 1000 + Math.random() * 1500;
    setTimeout(() => {
      const aiTime = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

      if (isFirst) {
        // First user message: AI greets with its name then responds
        const greeting = getGreeting();
        setMessages((prev) => [...prev, { id: `ai-greet-${Date.now()}`, from: "ai", text: greeting, timestamp: aiTime }]);
        setIsTyping(false);

        // Then respond to the actual question after a short delay
        const { response, isHandoff } = findResponse(userText);
        // Check if greeting already covers the question (e.g. user said "oi")
        const isJustGreeting = ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite", "hey", "eae"].some((k) => userText.toLowerCase().includes(k)) && userText.trim().split(/\s+/).length <= 3;

        if (!isJustGreeting) {
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setMessages((prev) => [...prev, { id: `ai-resp-${Date.now()}`, from: "ai", text: response, timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) }]);
              setIsTyping(false);
              if (isHandoff) triggerHandoff();
            }, 1200);
          }, 800);
        } else if (isHandoff) {
          triggerHandoff();
        }
      } else {
        const { response, isHandoff } = findResponse(userText);
        setMessages((prev) => [...prev, { id: `ai-${Date.now()}`, from: "ai", text: response, timestamp: aiTime }]);
        setIsTyping(false);
        if (isHandoff) triggerHandoff();
      }
    }, delay);
  };

  const triggerHandoff = () => {
    const handoffMessages: Record<string, string> = {
      friendly: `Entendi! Vou te passar agora pro nosso vendedor. Foi ótimo conversar! 😊 Aguarde um instantinho...`,
      formal: `Compreendido. Vou transferi-lo ao consultor responsável. Agradeço o contato.`,
      fast: `Certo. Transferindo para o vendedor. Aguarde.`,
      empathetic: `Pronto! Já vou te conectar com nosso vendedor. Pode ficar tranquilo, você está em boas mãos! 💜`,
    };
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: `handoff-${Date.now()}`, from: "system", text: handoffMessages[personality] || handoffMessages.friendly, timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) },
          { id: `system-${Date.now()}`, from: "system", text: "🔔 Transbordo ativado — Lead encaminhado para a equipe de vendas.", timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) },
        ]);
        setIsTyping(false);
        setHandedOff(true);
      }, 1500);
    }, 800);
  };

  const configSummary = [
    // Step 1 - Conexão (configured first)
    { icon: Car, label: "Estoque", value: `${totalVehicles} veículos em ${dealerships.length} revendas`, step: 1 },
    { icon: MessageCircle, label: "Canais", value: channelNames || "Nenhum selecionado", step: 1 },
    // Step 2 - Personalidade (configured second)
    { icon: Bot, label: "Nome da IA", value: displayName, step: 2 },
    { icon: Building2, label: "Sobre a Empresa", value: companyHistory ? (companyHistory.length > 60 ? companyHistory.slice(0, 60) + "..." : companyHistory) : "Não informado", step: 2 },
    { icon: activePersonality.icon, label: "Personalidade", value: activePersonality.name, step: 2 },
    // Step 3 - Regras (configured third)
    { icon: Clock, label: "Horário", value: scheduleLabel, step: 3 },
    { icon: ArrowRightLeft, label: "Transbordo", value: transferLabels.join(", ") || "Nenhum configurado", step: 3 },
    { icon: Users, label: "Equipe", value: teamLabel, step: 3 },
  ];

  const channelIcons: Record<string, React.ElementType> = {
    meta: MessageCircle,
    website: Globe,
    portals: Megaphone,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-[32px]">
      {/* Left: Config review */}
      <div className="flex flex-col gap-[24px]">
        <div className="flex items-center gap-[12px]">
          <div className="size-[40px] rounded-[10px] bg-[#F9F5FF] flex items-center justify-center">
            <ListChecks size={20} className="text-[#7F56D9]" />
          </div>
          <div>
            <h3 className="text-[18px] text-[#181D27] font-semibold leading-[28px]">Revisão da Configuração</h3>
            <p className="text-[14px] text-[#535862] leading-[20px]">Confira tudo antes de publicar. Teste a IA no simulador ao lado.</p>
          </div>
        </div>

        <div className="rounded-[12px] border border-[#E4E4E4] divide-y divide-[#F0F0F0]" style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}>
          {configSummary.map((item) => (
            <div key={item.label}>
              <div className="flex items-center gap-[16px] px-[20px] py-[16px]">
                <div className="size-[36px] rounded-[8px] bg-[#F9F5FF] flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-[#7F56D9]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-[#717680] leading-[18px]">{item.label}</p>
                  <p className="text-[14px] text-[#181D27] font-medium leading-[20px] truncate">{item.value}</p>
                </div>
                <div className="flex items-center gap-[8px] shrink-0">
                  <button
                    onClick={() => onEditFromCheckout(item.step, item.label)}
                    className="size-[28px] rounded-[6px] flex items-center justify-center text-[#A4A7AE] hover:text-[#7F56D9] hover:bg-[#F9F5FF] transition-colors"
                    title={`Editar ${item.label}`}
                  >
                    <Pencil size={14} />
                  </button>
                  {item.label === "Sobre a Empresa" && !companyHistory ? (
                    <AlertTriangle size={16} className="text-[#DC6803]" />
                  ) : (
                    <CheckCircle2 size={16} className="text-[#12B76A]" />
                  )}
                </div>
              </div>
              {item.label === "Sobre a Empresa" && !companyHistory && (
                <div className="flex items-center gap-[8px] mx-[20px] mb-[12px] px-[12px] py-[8px] rounded-[8px] bg-[#FFFAEB] border border-[#FEDF89]">
                  <AlertTriangle size={14} className="text-[#DC6803] shrink-0" />
                  <p className="text-[12px] text-[#93370D] leading-[16px]">
                    Você pode não estar aproveitando o poder total da IA se não preencher esse campo.{" "}
                    <button onClick={() => onEditFromCheckout(2, "Sobre a Empresa")} className="text-[#7F56D9] font-medium hover:underline">Preencher agora</button>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-[12px]">
          {connectedChannels.map((ch) => {
            const Icon = channelIcons[ch.id] || MessageCircle;
            return (
              <div key={ch.id} className="flex items-center gap-[8px] px-[14px] py-[8px] rounded-[8px] bg-[#ECFDF3] border border-[#D1FADF]">
                <Icon size={16} className="text-[#039855]" />
                <span className="text-[13px] text-[#027A48] font-medium">{ch.name}</span>
              </div>
            );
          })}
        </div>

        <div className="flex items-start gap-[10px] p-[16px] rounded-[12px] bg-[#F9F5FF] border border-[#E9D7FE]">
          <Sparkles size={18} className="text-[#7F56D9] shrink-0 mt-[2px]" />
          <div>
            <p className="text-[14px] text-[#181D27] font-medium leading-[20px]">Dica: teste o transbordo</p>
            <p className="text-[13px] text-[#535862] leading-[18px] mt-[2px]">
              No simulador, pergunte sobre financiamento, troca ou test-drive para ver a IA transferir o atendimento. Você também pode perguntar por modelos específicos como "Civic", "Compass" ou "Hilux".
            </p>
          </div>
        </div>
      </div>

      {/* Right: Chat Simulator */}
      <div
        className="rounded-[12px] border border-[#E4E4E4] flex flex-col h-[580px] bg-white overflow-hidden sticky top-[120px]"
        style={{ boxShadow: "0px 4px 8px -2px rgba(16,24,40,0.1), 0px 2px 4px -2px rgba(16,24,40,0.06)" }}
      >
        <div className="flex items-center gap-[12px] px-[20px] py-[14px] border-b border-[#E4E4E4] bg-[#FAFAFA]">
          <div className="relative">
            <div className="size-[36px] rounded-full bg-[#F4EBFF] flex items-center justify-center">
              <Bot size={18} className="text-[#7F56D9]" />
            </div>
            <div className="absolute -bottom-[1px] -right-[1px] size-[10px] rounded-full bg-[#12B76A] border-2 border-white" />
          </div>
          <div className="flex-1">
            <p className="text-[14px] text-[#181D27] font-semibold leading-[20px]">{displayName}</p>
            <p className="text-[12px] text-[#12B76A] leading-[16px]">Online — Simulador</p>
          </div>
          <span className="px-[8px] py-[2px] rounded-full bg-[#FFFAEB] text-[#DC6803] text-[11px] font-medium">Teste</span>
        </div>

        <div ref={chatRef} className="flex-1 overflow-y-auto px-[16px] py-[16px] flex flex-col gap-[12px] bg-[#FAFAFA]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : msg.from === "system" ? "justify-center" : "justify-start"}`}>
              {msg.from === "system" ? (
                <div className="max-w-[90%] px-[12px] py-[8px] rounded-[8px] bg-[#FFFAEB] border border-[#FEDF89] text-center">
                  <p className="text-[13px] text-[#93370D] leading-[18px]">{msg.text}</p>
                  <span className="text-[11px] text-[#B54708] mt-[2px] block">{msg.timestamp}</span>
                </div>
              ) : (
                <div className={`max-w-[85%] flex flex-col gap-[4px] ${msg.from === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-[14px] py-[10px] text-[14px] leading-[20px] whitespace-pre-line ${
                      msg.from === "user"
                        ? "bg-[#7F56D9] text-white rounded-[12px] rounded-br-[4px]"
                        : "bg-white text-[#181D27] rounded-[12px] rounded-bl-[4px] border border-[#E4E4E4]"
                    }`}
                    style={msg.from === "ai" ? { boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" } : undefined}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[11px] text-[#A4A7AE]">{msg.timestamp}</span>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="px-[14px] py-[10px] rounded-[12px] rounded-bl-[4px] bg-white border border-[#E4E4E4] flex items-center gap-[6px]" style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}>
                <div className="flex gap-[4px]">
                  <span className="size-[6px] rounded-full bg-[#A4A7AE] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="size-[6px] rounded-full bg-[#A4A7AE] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="size-[6px] rounded-full bg-[#A4A7AE] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-[12px] text-[#717680] ml-[4px]">digitando...</span>
              </div>
            </div>
          )}

          {messages.length === 0 && !isTyping && (
            <div className="flex-1 flex flex-col items-center justify-center gap-[8px] text-center px-[24px]">
              <Bot size={32} className="text-[#D6BBFB]" />
              <p className="text-[14px] text-[#717680] font-medium">Simulador pronto</p>
              <p className="text-[13px] text-[#A4A7AE]">Envie uma mensagem como se fosse um cliente para testar a {displayName}.</p>
            </div>
          )}
        </div>

        <div className="px-[16px] py-[12px] border-t border-[#E4E4E4] bg-white">
          {handedOff ? (
            <div className="flex items-center justify-center gap-[8px] py-[10px]">
              <UserCheck size={16} className="text-[#039855]" />
              <p className="text-[13px] text-[#039855] font-medium">Atendimento transferido para a equipe</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-[8px]">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Digite como se fosse um cliente..."
                  className="flex-1 px-[12px] py-[10px] rounded-[8px] border border-[#D5D7DA] text-[14px] text-[#181D27] placeholder:text-[#A4A7AE] outline-none focus:border-[#7F56D9] focus:ring-1 focus:ring-[#7F56D9] transition-colors"
                  style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className={`size-[40px] rounded-[8px] flex items-center justify-center transition-colors ${
                    input.trim() ? "bg-[#7F56D9] text-white hover:bg-[#6941C6]" : "bg-[#F5F5F5] text-[#A4A7AE] cursor-not-allowed"
                  }`}
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[11px] text-[#A4A7AE] mt-[8px] text-center">
                Simulação em tempo real · Tom "{activePersonality.name}"
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}