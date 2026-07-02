import {
  CheckCircle2,
  Rocket,
  MessageCircle,
  Globe,
  ArrowRight,
  Sparkles,
  Megaphone,
} from "lucide-react";
import type { Dealership, Channel } from "./step-connection";
import type { RulesConfig } from "./step-rules";

interface SuccessScreenProps {
  dealerships: Dealership[];
  channels: Channel[];
  rulesConfig: RulesConfig;
  aiName: string;
}

const channelIconMap: Record<string, any> = {
  meta: MessageCircle,
  website: Globe,
  portals: Megaphone,
};

export function SuccessScreen({ dealerships, channels, rulesConfig, aiName }: SuccessScreenProps) {
  const totalVehicles = (dealerships ?? []).reduce((sum, d) => sum + d.vehicles.length, 0);
  const activeChannels = (channels ?? []).filter((c) => c.connected);
  const activeTeam = (rulesConfig?.team ?? []).filter((t) => t.active);

  return (
    <div className="flex flex-col items-center justify-center py-[64px] text-center">
      {/* Animated success icon */}
      <div className="relative mb-[32px]">
        <div className="size-[80px] rounded-full bg-[#ECFDF3] flex items-center justify-center">
          <CheckCircle2 size={40} className="text-[#039855]" />
        </div>
        <div className="absolute -top-[4px] -right-[4px] size-[28px] rounded-full bg-[#F9F5FF] flex items-center justify-center border-2 border-white">
          <Sparkles size={14} className="text-[#7F56D9]" />
        </div>
      </div>

      <h2 className="text-[30px] text-[#181D27] font-bold leading-[38px] tracking-[-0.6px]">
        {aiName?.trim() || "IA Atendente"} Ativada com Sucesso!
      </h2>
      <p className="text-[16px] text-[#535862] leading-[24px] mt-[8px] max-w-[480px]">
        Seu agente de IA está online e pronto para atender seus clientes nos canais configurados.
      </p>

      {/* Active channels */}
      <div className="flex flex-wrap justify-center gap-[12px] mt-[32px]">
        {activeChannels.map((ch) => {
          const Icon = channelIconMap[ch.id] || Globe;
          return (
            <div
              key={ch.id}
              className="flex items-center gap-[10px] px-[16px] py-[12px] rounded-[12px] border border-[#D1FADF] bg-[#F6FEF9]"
              style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}
            >
              <Icon size={18} className="text-[#039855]" />
              <div className="text-left">
                <p className="text-[14px] text-[#181D27] font-medium leading-[20px]">{ch.name}</p>
                <p className="text-[12px] text-[#039855] leading-[16px]">Ativo</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary stats */}
      <div
        className="mt-[32px] rounded-[12px] border border-[#E4E4E4] p-[24px] w-full max-w-[480px] grid grid-cols-3 gap-[16px]"
        style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}
      >
        <div className="flex flex-col items-center gap-[4px]">
          <p className="text-[24px] text-[#7F56D9] font-bold">{totalVehicles}</p>
          <p className="text-[12px] text-[#535862]">Veículos</p>
        </div>
        <div className="flex flex-col items-center gap-[4px]">
          <p className="text-[24px] text-[#7F56D9] font-bold">{activeChannels.length}</p>
          <p className="text-[12px] text-[#535862]">Canais</p>
        </div>
        <div className="flex flex-col items-center gap-[4px]">
          <p className="text-[24px] text-[#7F56D9] font-bold">{activeTeam.length}</p>
          <p className="text-[12px] text-[#535862]">Vendedores</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-[16px] mt-[32px]">
        <button className="px-[20px] py-[12px] rounded-[8px] border border-[#D5D7DA] bg-white text-[14px] text-[#181D27] font-semibold hover:bg-[#F5F5F5] transition-colors">
          Ver Painel de Métricas
        </button>
        <button className="px-[20px] py-[12px] rounded-[8px] bg-[#7F56D9] text-[14px] text-white font-semibold hover:bg-[#6941C6] transition-colors flex items-center gap-[8px]">
          <Rocket size={16} />
          Ir para o Dashboard
        </button>
      </div>
    </div>
  );
}