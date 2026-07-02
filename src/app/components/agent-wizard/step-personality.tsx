import { useState, useEffect, useRef } from "react";
import {
  Smile,
  Briefcase,
  Zap,
  Heart,
  CheckCircle2,
  MessageSquare,
  Building2,
  Bot,
  FileText,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import { AnimatePresence, motion } from "motion/react";

interface Personality {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  sampleMessage: string;
  conversations: { question: string; answer: string }[];
}

const personalities: Personality[] = [
  {
    id: "friendly",
    name: "Vendedor Amigável",
    subtitle: "Próximo e descontraído",
    description:
      "Tom acessível, usa linguagem do dia-a-dia. Ideal para lojas com público jovem e que valorizam proximidade.",
    icon: Smile,
    badge: "Mais popular",
    sampleMessage:
      "Oi! 😊 SUVs são ótimos, hein! Temos várias opções incríveis! Olha só: o Jeep Compass T270 por R$ 169.900, o Hyundai Creta Platinum por R$ 158.900 e a Honda HR-V Turbo por R$ 179.900. Todos super completos e com pouca quilometragem! Quer que eu te passe mais detalhes de algum deles?",
    conversations: [
      {
        question: "Estou buscando SUVs, quais vocês possuem?",
        answer: "Oi! 😊 SUVs são ótimos, hein! Temos várias opções incríveis! Olha só: o Jeep Compass T270 por R$ 169.900, o Hyundai Creta Platinum por R$ 158.900 e a Honda HR-V Turbo por R$ 179.900. Todos super completos e com pouca quilometragem! Quer que eu te passe mais detalhes de algum deles?",
      },
      {
        question: "Vocês aceitam troca?",
        answer: "Claaaro que sim! 🚗 A gente aceita seu carro na troca e faz uma avaliação super justa! Só me passa o modelo e ano do seu carro que já te dou uma estimativa. Fica tranquilo que a gente facilita tudo pra você! 😉",
      },
      {
        question: "Tem alguma promoção essa semana?",
        answer: "Tem sim! 🎉 Essa semana tá com condição especial em vários modelos! O Corolla XEi tá com desconto de R$ 5 mil e o T-Cross com taxa zero no financiamento. Quer que eu separe as melhores ofertas pra você?",
      },
    ],
  },
  {
    id: "formal",
    name: "Consultor Formal",
    subtitle: "Técnico e profissional",
    description:
      "Tom elegante e técnico. Apresenta dados do veículo com precisão. Ideal para revendas premium e multimarcas.",
    icon: Briefcase,
    badge: "Premium",
    sampleMessage:
      "Boa tarde. Atualmente contamos com os seguintes SUVs em nosso estoque:\n\n• Jeep Compass Limited T270 — 2022/2023, 22.000 km, R$ 169.900\n• Honda HR-V EXL 1.5 Turbo — 2023/2024, 11.000 km, R$ 179.900\n• Hyundai Creta Platinum 2.0 — 2023/2024, 10.000 km, R$ 158.900\n\nPosso fornecer a ficha técnica completa de qualquer um deles.",
    conversations: [
      {
        question: "Estou buscando SUVs, quais vocês possuem?",
        answer: "Boa tarde. Atualmente contamos com os seguintes SUVs em nosso estoque:\n\n• Jeep Compass Limited T270 — 2022/2023, 22.000 km, R$ 169.900\n• Honda HR-V EXL 1.5 Turbo — 2023/2024, 11.000 km, R$ 179.900\n• Hyundai Creta Platinum 2.0 — 2023/2024, 10.000 km, R$ 158.900\n\nPosso fornecer a ficha técnica completa de qualquer um deles.",
      },
      {
        question: "Qual a garantia dos veículos?",
        answer: "Todos os nossos veículos seminovos possuem garantia de 3 meses conforme previsto no Código de Defesa do Consumidor, podendo ser estendida por até 12 meses mediante contratação adicional. Realizamos inspeção veicular completa com laudo técnico detalhado antes da entrega.",
      },
      {
        question: "Quais as condições de financiamento?",
        answer: "Trabalhamos com as principais instituições financeiras do mercado, oferecendo:\n\n• Entrada a partir de 20% do valor do veículo\n• Parcelamento em até 60 meses\n• Taxas a partir de 1,49% a.m.\n\nPosso realizar uma simulação personalizada conforme seu perfil.",
      },
    ],
  },
  {
    id: "fast",
    name: "Objetivo e Direto",
    subtitle: "Respostas rápidas e sem rodeios",
    description:
      "Vai direto ao ponto com informações essenciais. Perfeito para clientes que já sabem o que querem.",
    icon: Zap,
    badge: "Ágil",
    sampleMessage:
      "SUVs disponíveis:\n→ Compass T270 — R$ 169.900, 22 mil km\n→ HR-V Turbo — R$ 179.900, 11 mil km\n→ Creta Platinum — R$ 158.900, 10 mil km\n→ Tucson Turbo — R$ 198.500, 16 mil km\nQuer agendar visita?",
    conversations: [
      {
        question: "Estou buscando SUVs, quais vocês possuem?",
        answer: "SUVs disponíveis:\n→ Compass T270 — R$ 169.900, 22 mil km\n→ HR-V Turbo — R$ 179.900, 11 mil km\n→ Creta Platinum — R$ 158.900, 10 mil km\n→ Tucson Turbo — R$ 198.500, 16 mil km\nQuer agendar visita?",
      },
      {
        question: "Tem Civic disponível?",
        answer: "Sim. Honda Civic EXL 2.0, 2023/2024, 8 mil km, R$ 142.500. Completo, único dono. Quer agendar test drive?",
      },
      {
        question: "Aberto aos sábados?",
        answer: "Sim. Seg-Sex 8h-18h, Sáb 8h-13h. Endereço: Av. Principal, 1500. Agendar horário?",
      },
    ],
  },
  {
    id: "empathetic",
    name: "Acolhedor e Empático",
    subtitle: "Escuta ativa e suporte",
    description:
      "Foca em entender a necessidade do cliente antes de sugerir. Ótimo para quem troca o primeiro carro ou famílias.",
    icon: Heart,
    badge: "Atencioso",
    sampleMessage:
      "Que legal que você está buscando um SUV! 🙂 Pra te ajudar melhor, me conta: você precisa de mais espaço pra família, ou está buscando algo mais esportivo? Temos desde o Creta, que é super confortável no dia-a-dia (R$ 158.900), até o Compass T270, que é mais aventureiro (R$ 169.900). Vamos achar o ideal pra você!",
    conversations: [
      {
        question: "Estou buscando SUVs, quais vocês possuem?",
        answer: "Que legal que você está buscando um SUV! 🙂 Pra te ajudar melhor, me conta: você precisa de mais espaço pra família, ou está buscando algo mais esportivo? Temos desde o Creta, que é super confortável no dia-a-dia (R$ 158.900), até o Compass T270, que é mais aventureiro (R$ 169.900). Vamos achar o ideal pra você!",
      },
      {
        question: "Estou com medo de comprar seminovo...",
        answer: "Eu entendo totalmente essa preocupação! 🤗 É normal ter receio, mas pode ficar tranquilo. Aqui todos os carros passam por uma inspeção rigorosa de mais de 100 itens antes de irem pra venda. Além disso, oferecemos garantia e você pode trazer seu mecânico de confiança pra avaliar. Seu conforto é o mais importante pra gente!",
      },
      {
        question: "Preciso de um carro pra família, o que sugere?",
        answer: "Que bacana! 🙂 Família é tudo, né? Me conta quantas pessoas costumam andar no carro e se vocês fazem muita viagem. Assim consigo te indicar algo com espaço ideal e bom porta-malas. Temos opções ótimas como o Creta e o HR-V, ambos super confortáveis pro dia-a-dia!",
      },
    ],
  },
];

export function StepPersonality({
  selected,
  onSelect,
  companyHistory,
  onCompanyHistoryChange,
  aiName,
  onAiNameChange,
  editSection,
}: {
  selected: string;
  onSelect: (id: string) => void;
  companyHistory: string;
  onCompanyHistoryChange: (value: string) => void;
  aiName: string;
  onAiNameChange: (value: string) => void;
  editSection?: string | null;
}) {
  const activePersonality = personalities.find((p) => p.id === selected) || personalities[0];
  const [conversationIndex, setConversationIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [isPreviewHovered, setIsPreviewHovered] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const companyTemplates = [
    {
      name: "Revenda Multimarcas",
      text: "Somos a [Nome da Empresa], uma revenda multimarcas com [X] anos de atuação em [Cidade/Região]. Trabalhamos com veículos seminovos de qualidade, com garantia de procedência e laudo cautelar. Oferecemos financiamento facilitado com as melhores taxas do mercado, aceitamos troca e realizamos avaliação gratuita. Nossa missão é proporcionar a melhor experiência na compra do seu veículo.",
    },
    {
      name: "Concessionária Autorizada",
      text: "Somos a [Nome da Empresa], concessionária autorizada [Marca] em [Cidade/Região]. Com [X] anos de mercado, oferecemos veículos novos e seminovos certificados com garantia de fábrica. Contamos com oficina especializada, peças originais, financiamento direto e programas de manutenção. Nosso compromisso é entregar excelência em vendas e pós-venda.",
    },
    {
      name: "Loja de Veículos Premium",
      text: "Somos a [Nome da Empresa], especializada em veículos premium e de luxo em [Cidade/Região]. Com [X] anos de experiência, nosso estoque é cuidadosamente selecionado para oferecer os melhores modelos do mercado. Oferecemos consultoria personalizada, financiamento exclusivo e serviço de entrega em domicílio. Cada cliente recebe atendimento VIP do início ao fim.",
    },
    {
      name: "Loja Familiar / Primeiro Carro",
      text: "Somos a [Nome da Empresa], uma loja de veículos em [Cidade/Região] com foco em ajudar famílias e pessoas que estão comprando seu primeiro carro. Com [X] anos de mercado, oferecemos veículos acessíveis e de qualidade, com entrada facilitada e parcelas que cabem no bolso. Nossa equipe está pronta para tirar todas as suas dúvidas com paciência e atenção.",
    },
  ];

  // Reset index when personality changes
  useEffect(() => {
    setConversationIndex(0);
    setTimerKey((k) => k + 1);
  }, [selected]);

  // Cycle through conversations every 10 seconds, reset when timerKey changes
  useEffect(() => {
    if (isPreviewHovered) return;
    const timer = setInterval(() => {
      setConversationIndex((prev) =>
        (prev + 1) % activePersonality.conversations.length
      );
    }, 10000);
    return () => clearInterval(timer);
  }, [activePersonality, timerKey, isPreviewHovered]);

  useEffect(() => {
    if (editSection) {
      const sectionMap: Record<string, string> = {
        "Nome da IA": "section-nome-ia",
        "Sobre a Empresa": "section-sobre-empresa",
        "Personalidade": "section-personalidade",
      };
      const id = sectionMap[editSection];
      if (id) {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [editSection]);

  const currentConversation = activePersonality.conversations[conversationIndex];

  const handleSelect = (id: string) => {
    onSelect(id);
  };

  const handleDotClick = (i: number) => {
    setConversationIndex(i);
    setTimerKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col gap-[32px]">
      {/* AI Name - FIRST section */}
      <div id="section-nome-ia" className="flex flex-col gap-[12px]">
        <div className="flex items-center gap-[12px]">
          <div className="size-[40px] rounded-[10px] bg-[#F9F5FF] flex items-center justify-center">
            <Bot size={20} className="text-[#7F56D9]" />
          </div>
          <div>
            <h3 className="text-[18px] text-[#181D27] font-semibold leading-[28px]">
              Nome da IA
            </h3>
            <p className="text-[14px] text-[#535862] leading-[20px]">
              Dê um nome à sua assistente virtual. Os clientes verão esse nome no chat.
            </p>
          </div>
        </div>
        <div
          className="rounded-[12px] border border-[#E4E4E4] p-[20px]"
          style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}
        >
          <input
            type="text"
            value={aiName}
            onChange={(e) => onAiNameChange(e.target.value)}
            placeholder="Ex: Sofia, Luna, AutoBot, Assistente Virtual..."
            className="w-full px-[12px] py-[10px] rounded-[8px] border border-[#D5D7DA] text-[14px] text-[#181D27] placeholder:text-[#A4A7AE] outline-none focus:border-[#7F56D9] focus:ring-1 focus:ring-[#7F56D9] transition-colors"
            style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}
          />
          <p className="text-[12px] text-[#717680] mt-[8px]">
            Escolha um nome amigável que represente sua marca. Se deixado em branco, será usado "IA atendente".
          </p>
        </div>
      </div>

      {/* Company history section */}
      <div id="section-sobre-empresa" className="flex flex-col gap-[12px]">
        <div className="flex items-center gap-[12px]">
          <div className="size-[40px] rounded-[10px] bg-[#F9F5FF] flex items-center justify-center">
            <Building2 size={20} className="text-[#7F56D9]" />
          </div>
          <div>
            <h3 className="text-[18px] text-[#181D27] font-semibold leading-[28px]">
              Sobre a Empresa
            </h3>
            <p className="text-[14px] text-[#535862] leading-[20px]">
              Conte um pouco da história da sua loja para a IA personalizar as respostas.
            </p>
          </div>
        </div>
        <div
          className="rounded-[12px] border border-[#E4E4E4] p-[20px]"
          style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}
        >
          {/* Template selector integrated */}
          <div className="mb-[16px]">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="flex items-center gap-[8px] w-full"
            >
              <Sparkles size={14} className="text-[#7F56D9] shrink-0" />
              <span className="text-[13px] text-[#7F56D9] font-medium">Usar um modelo pronto</span>
              <ChevronDown
                size={14}
                className={`text-[#7F56D9] ml-auto transition-transform duration-200 ${showTemplates ? "rotate-180" : ""}`}
              />
            </button>

            {showTemplates && (
              <div className="flex flex-wrap gap-[8px] mt-[12px]">
                {companyTemplates.map((template) => (
                  <button
                    key={template.name}
                    onClick={() => {
                      onCompanyHistoryChange(template.text);
                      setShowTemplates(false);
                    }}
                    onMouseEnter={() => setHoveredTemplate(template.text)}
                    onMouseLeave={() => setHoveredTemplate(null)}
                    className="flex items-center gap-[6px] px-[12px] py-[6px] rounded-[8px] border border-[#E4E4E4] bg-white text-[13px] text-[#535862] hover:border-[#D6BBFB] hover:bg-[#FCFAFF] hover:text-[#7F56D9] transition-all"
                  >
                    <FileText size={13} className="shrink-0" />
                    {template.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <textarea
            value={companyHistory}
            onChange={(e) => {
              if (e.target.value.length <= 800) {
                onCompanyHistoryChange(e.target.value);
              }
            }}
            maxLength={800}
            rows={4}
            placeholder={hoveredTemplate ?? "Ex: Somos a AutoTop, uma revenda multimarcas com 15 anos no mercado de Belo Horizonte. Trabalhamos com veículos seminovos de qualidade com garantia de procedência, financiamento facilitado e aceitamos troca..."}
            className="w-full px-[12px] py-[10px] rounded-[8px] border border-[#D5D7DA] text-[14px] text-[#181D27] placeholder:text-[#A4A7AE] outline-none focus:border-[#7F56D9] focus:ring-1 focus:ring-[#7F56D9] transition-colors resize-none"
            style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}
          />
          <div className="flex items-center justify-between mt-[8px]">
            <p className="text-[12px] text-[#717680]">
              {companyHistory.includes("[")
                ? "Substitua os campos entre [colchetes] com suas informações reais."
                : "Essas informações ajudam a IA a contextualizar melhor suas respostas e transmitir credibilidade."}
            </p>
            <p className={`text-[12px] shrink-0 ml-[12px] ${companyHistory.length >= 800 ? "text-[#D92D20]" : "text-[#717680]"}`}>
              {companyHistory.length}/800
            </p>
          </div>
        </div>
      </div>

      {/* Section header */}
      <div id="section-personalidade" className="flex items-center gap-[12px]">
        <div className="size-[40px] rounded-[10px] bg-[#F9F5FF] flex items-center justify-center">
          <MessageSquare size={20} className="text-[#7F56D9]" />
        </div>
        <div>
          <h3 className="text-[18px] text-[#181D27] font-semibold leading-[28px]">
            Personalidade da IA
          </h3>
          <p className="text-[14px] text-[#535862] leading-[20px]">
            Como sua IA vai conversar com os clientes? Escolha o tom de voz.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-[32px]">
        {/* Left column */}
        <div className="flex flex-col gap-[24px]">
          {/* Personality cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
            {personalities.map((p) => {
              const isSelected = selected === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p.id)}
                  className={`flex flex-col gap-[12px] p-[20px] rounded-[12px] border text-left transition-all relative ${
                    isSelected
                      ? "border-[#7F56D9] bg-[#FCFAFF]"
                      : "border-[#E4E4E4] bg-white hover:border-[#D6BBFB]"
                  }`}
                  style={{
                    boxShadow: isSelected
                      ? "0px 4px 8px -2px rgba(127,86,217,0.1), 0px 2px 4px -2px rgba(127,86,217,0.06)"
                      : "0px 1px 2px rgba(16,24,40,0.05)",
                  }}
                >
                  <div className="flex items-start justify-between w-full">
                    <div
                      className={`size-[44px] rounded-[10px] flex items-center justify-center ${
                        isSelected ? "bg-[#F4EBFF]" : "bg-[#F5F5F5]"
                      }`}
                    >
                      <p.icon
                        size={22}
                        className={isSelected ? "text-[#7F56D9]" : "text-[#535862]"}
                      />
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <span
                        className={`px-[8px] py-[2px] rounded-full text-[11px] font-medium ${
                          isSelected
                            ? "bg-[#F4EBFF] text-[#7F56D9]"
                            : "bg-[#F5F5F5] text-[#717680]"
                        }`}
                      >
                        {p.badge}
                      </span>
                      {isSelected && <CheckCircle2 size={20} className="text-[#7F56D9]" />}
                    </div>
                  </div>
                  <div>
                    <p className="text-[16px] text-[#181D27] font-semibold leading-[24px]">
                      {p.name}
                    </p>
                    <p className="text-[13px] text-[#717680] leading-[18px] mt-[2px]">
                      {p.subtitle}
                    </p>
                  </div>
                  <p className="text-[14px] text-[#535862] leading-[20px]">{p.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live preview panel */}
        <div
          className="rounded-[12px] border border-[#E4E4E4] bg-[#FAFAFA] p-[24px] flex flex-col gap-[16px] h-fit sticky top-[120px]"
          style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}
          onMouseEnter={() => setIsPreviewHovered(true)}
          onMouseLeave={() => { setIsPreviewHovered(false); setTimerKey((k) => k + 1); }}
        >
          <div className="flex items-center gap-[8px]">
            <div className="size-[8px] rounded-full bg-[#12B76A]" />
            <p className="text-[14px] text-[#181D27] font-medium">
              Prévia da conversa
            </p>
          </div>
          <div className="bg-white rounded-[12px] p-[16px] flex flex-col gap-[12px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selected}-${conversationIndex}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col gap-[12px]"
              >
                {/* User message */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] px-[14px] py-[10px] rounded-[12px] rounded-br-[4px] bg-[#7F56D9] text-white text-[14px] leading-[20px]">
                    {currentConversation.question}
                  </div>
                </div>
                {/* AI reply */}
                <div className="flex justify-start">
                  <div className="max-w-[85%] px-[14px] py-[10px] rounded-[12px] rounded-bl-[4px] bg-[#F5F5F5] text-[#181D27] text-[14px] leading-[20px] whitespace-pre-line">
                    {currentConversation.answer}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Conversation indicators */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <activePersonality.icon size={16} className="text-[#7F56D9]" />
              <p className="text-[12px] text-[#717680]">
                Tom: <span className="text-[#181D27] font-medium">{activePersonality.name}</span>
              </p>
            </div>
            <div className="flex items-center gap-[6px]">
              {activePersonality.conversations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === conversationIndex
                      ? "w-[24px] h-[8px] bg-[#7F56D9]"
                      : "w-[8px] h-[8px] bg-[#D5D7DA] hover:bg-[#A4A7AE]"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-[11px] text-[#A4A7AE] text-center">
            {isPreviewHovered ? "Pausado" : `Exemplo ${conversationIndex + 1} de ${activePersonality.conversations.length}`} · Clique nos indicadores ou aguarde a troca automática
          </p>
        </div>
      </div>
    </div>
  );
}