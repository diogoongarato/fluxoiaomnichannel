import { useState } from "react";
import { ArrowLeft, ArrowRight, Rocket, Settings, ChevronDown, CheckCircle2, AlertTriangle } from "lucide-react";
import { Stepper, type Step } from "./stepper";
import { StepConnection, defaultDealerships, defaultChannels, type Dealership, type Channel } from "./step-connection";
import { StepPersonality } from "./step-personality";
import { StepRules, type RulesConfig } from "./step-rules";
import { StepCheckout } from "./step-checkout";
import { SuccessScreen } from "./success-screen";

const steps: Step[] = [
  { id: 1, label: "Conexão", description: "Estoque e canais" },
  { id: 2, label: "Personalidade", description: "Tom de voz da IA" },
  { id: 3, label: "Regras", description: "Horários e transbordo" },
  { id: 4, label: "Publicar", description: "Testar e ativar" },
];

export default function AgentWizardPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxVisited, setMaxVisited] = useState(1);
  const [personality, setPersonality] = useState("friendly");
  const [published, setPublished] = useState(false);
  const [companyHistory, setCompanyHistory] = useState("");
  const [aiName, setAiName] = useState("");
  const [editingFromCheckout, setEditingFromCheckout] = useState(false);
  const [editSection, setEditSection] = useState<string | null>(null);

  // Step 1 state (lifted)
  const [dealerships, setDealerships] = useState<Dealership[]>(defaultDealerships);
  const [channels, setChannels] = useState<Channel[]>(defaultChannels);

  // Step 3 state (lifted)
  const [rulesConfig, setRulesConfig] = useState<RulesConfig>({
    scheduleMode: "24/7",
    businessHours: { start: "08:00", end: "18:00" },
    workDays: ["mon", "tue", "wed", "thu", "fri"],
    transferTriggers: { financing: true, tradeIn: true, testDrive: true, priceNeg: false },
    team: [
      { id: "1", name: "Ricardo Silva", role: "Vendedor", active: true },
      { id: "2", name: "Ana Santos", role: "Vendedora", active: true },
      { id: "3", name: "Carlos Lima", role: "Vendedor", active: false },
      { id: "4", name: "Juliana Costa", role: "Vendedora", active: true },
    ],
    followQueue: true,
  });

  const goNext = () => {
    if (currentStep < 4) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setMaxVisited((m) => Math.max(m, next));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const handlePublish = () => {
    setPublished(true);
  };

  // Step validation
  const hasChannel = channels.some((c) => c.connected);
  const hasDealerSync = dealerships.some((d) => d.syncState === "done");
  const step1Valid = hasChannel && hasDealerSync;

  const hasTransferTrigger = Object.values(rulesConfig.transferTriggers).some((v) => v);
  const hasActiveTeamOrQueue = rulesConfig.followQueue || rulesConfig.team.some((m) => m.active);
  const step3Valid = hasTransferTrigger && hasActiveTeamOrQueue;

  const canAdvance =
    currentStep === 1 ? step1Valid :
    currentStep === 3 ? step3Valid :
    true;

  // Dynamic alert messages
  const alertMessages: string[] = [];
  if (currentStep === 1) {
    if (!hasChannel) alertMessages.push("Selecione pelo menos um canal de atendimento");
    if (!hasDealerSync) alertMessages.push("Sincronize o estoque de pelo menos uma revenda");
  }
  if (currentStep === 3) {
    if (!hasTransferTrigger) alertMessages.push("Selecione pelo menos uma regra de transbordo");
    if (!hasActiveTeamOrQueue) alertMessages.push("Ative a fila de equipe ou selecione pelo menos um vendedor");
  }

  const handleStepClick = (stepId: number) => {
    if (stepId <= maxVisited) {
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleEditFromCheckout = (step: number, sectionId: string) => {
    setEditingFromCheckout(true);
    setEditSection(sectionId);
    setCurrentStep(step);
  };

  const handleSaveAndReturn = () => {
    setEditingFromCheckout(false);
    setEditSection(null);
    setCurrentStep(4);
    setMaxVisited((m) => Math.max(m, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-['Inter',sans-serif] flex flex-col">
      {/* Top bar */}
      <header
        className="bg-white border-b border-[#E4E4E4] sticky top-0 z-50"
        style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}
      >
        <div className="max-w-[1120px] mx-auto px-[24px] py-[12px] flex items-center gap-[24px]">
          {/* Left: Logo */}
          <div className="flex items-center gap-[10px] shrink-0">
            <div className="size-[36px] rounded-[10px] bg-[#7F56D9] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.9"/>
                <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[16px] text-[#181D27] font-semibold leading-[24px]">AutoDrive</span>
          </div>

          {/* Center: Navigation */}
          <nav className="flex-1 flex items-center justify-center gap-[8px]">
            {[
              { label: "Estoque", active: false },
              { label: "Financeiro", active: false },
              { label: "Negociação", active: false },
              { label: "CRM", active: true },
            ].map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-[6px] px-[14px] py-[6px] rounded-[8px] text-[14px] transition-colors ${
                  item.active
                    ? "bg-[#F9F5FF] text-[#7F56D9] font-medium"
                    : "text-[#535862] hover:bg-[#F5F5F5] hover:text-[#181D27]"
                }`}
              >
                {item.label}
                <ChevronDown size={14} className={item.active ? "text-[#7F56D9]" : "text-[#A4A7AE]"} />
              </button>
            ))}
          </nav>

          {/* Right: Settings + Profile */}
          <div className="flex items-center gap-[12px] shrink-0">
            <button className="size-[36px] rounded-[8px] flex items-center justify-center text-[#717680] hover:bg-[#F5F5F5] hover:text-[#181D27] transition-colors">
              <Settings size={20} />
            </button>
            <div className="size-[36px] rounded-full overflow-hidden border-2 border-[#E9D7FE] cursor-pointer hover:border-[#7F56D9] transition-colors">
              <img
                src="https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzczNzQ2NjU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Perfil"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-[1120px] mx-auto px-[24px] py-[48px]">
          {published ? (
            <SuccessScreen
              dealerships={dealerships}
              channels={channels}
              rulesConfig={rulesConfig}
              aiName={aiName}
            />
          ) : (
            <>
              <div className="mb-[32px]">
                <div className="mb-[24px]">
                  <Stepper steps={steps} currentStep={currentStep} maxVisited={maxVisited} onStepClick={handleStepClick} />
                </div>
              </div>

              <div>
                {currentStep === 1 && (
                  <StepConnection
                    dealerships={dealerships}
                    onDealershipsChange={setDealerships as any}
                    channels={channels}
                    onChannelsChange={setChannels}
                    editSection={editSection}
                  />
                )}
                {currentStep === 2 && (
                  <StepPersonality
                    selected={personality}
                    onSelect={setPersonality}
                    companyHistory={companyHistory}
                    onCompanyHistoryChange={setCompanyHistory}
                    aiName={aiName}
                    onAiNameChange={setAiName}
                    editSection={editSection}
                  />
                )}
                {currentStep === 3 && (
                  <StepRules config={rulesConfig} onChange={setRulesConfig} editSection={editSection} />
                )}
                {currentStep === 4 && (
                  <StepCheckout
                    personality={personality}
                    aiName={aiName}
                    companyHistory={companyHistory}
                    dealerships={dealerships}
                    channels={channels}
                    rulesConfig={rulesConfig}
                    onGoToStep={setCurrentStep}
                    onEditFromCheckout={handleEditFromCheckout}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Bottom action bar */}
      {!published && (
        <footer
          className="bg-white border-t border-[#E4E4E4] sticky bottom-0 z-50"
          style={{ boxShadow: "0px -1px 2px rgba(16,24,40,0.05)" }}
        >
          {/* Alert messages */}
          {alertMessages.length > 0 && !editingFromCheckout && (
            <div className="max-w-[1120px] mx-auto px-[24px] pt-[12px]">
              <div className="flex flex-col gap-[8px]">
                {alertMessages.map((msg) => (
                  <div
                    key={msg}
                    className="flex items-center gap-[10px] px-[16px] py-[10px] rounded-[8px] bg-[#FFFAEB] border border-[#FEDF89] text-[13px] text-[#B54708] leading-[20px]"
                  >
                    <AlertTriangle size={16} className="shrink-0 text-[#DC6803]" />
                    {msg}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="max-w-[1120px] mx-auto px-[24px] py-[16px] flex items-center justify-between">
            {editingFromCheckout ? (
              <button
                onClick={handleSaveAndReturn}
                className="flex items-center gap-[8px] px-[20px] py-[10px] rounded-[8px] border border-[#D5D7DA] text-[14px] font-semibold text-[#535862] bg-white hover:bg-[#F5F5F5] transition-colors"
              >
                <ArrowLeft size={16} />
                Cancelar
              </button>
            ) : (
            <button
              onClick={goBack}
              disabled={currentStep === 1}
              className={`flex items-center gap-[8px] px-[20px] py-[10px] rounded-[8px] border border-[#D5D7DA] text-[14px] font-semibold transition-colors ${
                currentStep === 1
                  ? "opacity-40 cursor-not-allowed text-[#A4A7AE] bg-white"
                  : "text-[#181D27] bg-white hover:bg-[#F5F5F5]"
              }`}
            >
              <ArrowLeft size={16} />
              Voltar
            </button>
            )}

            <div className="flex items-center gap-[8px]">
              <div className="flex items-center gap-[6px] sm:hidden mr-[16px]">
                {steps.map((s) => (
                  <div
                    key={s.id}
                    className={`size-[8px] rounded-full transition-colors ${
                      s.id === currentStep ? "bg-[#7F56D9]" : s.id < currentStep ? "bg-[#D6BBFB]" : "bg-[#E4E4E4]"
                    }`}
                  />
                ))}
              </div>

              {editingFromCheckout ? (
                <button
                  onClick={handleSaveAndReturn}
                  className="flex items-center gap-[8px] px-[24px] py-[12px] rounded-[8px] bg-[#7F56D9] text-[14px] text-white font-semibold hover:bg-[#6941C6] transition-colors"
                  style={{ boxShadow: "0px 1px 3px rgba(16,24,40,0.1), 0px 1px 2px rgba(16,24,40,0.06)" }}
                >
                  <CheckCircle2 size={16} />
                  Salvar e Voltar
                </button>
              ) : currentStep < 4 ? (
                <button
                  onClick={goNext}
                  disabled={!canAdvance}
                  className={`flex items-center gap-[8px] px-[20px] py-[10px] rounded-[8px] text-[14px] font-semibold transition-colors ${
                    canAdvance
                      ? "bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                      : "bg-[#E4E4E4] text-[#A4A7AE] cursor-not-allowed"
                  }`}
                >
                  Avançar
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handlePublish}
                  className="flex items-center gap-[8px] px-[24px] py-[12px] rounded-[8px] bg-[#039855] text-[14px] text-white font-semibold hover:bg-[#027A48] transition-colors"
                  style={{ boxShadow: "0px 1px 3px rgba(16,24,40,0.1), 0px 1px 2px rgba(16,24,40,0.06)" }}
                >
                  <Rocket size={16} />
                  Publicar Agente
                </button>
              )}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}