import { useState, useEffect } from "react";
import {
  Clock,
  UserCheck,
  ShieldCheck,
  ArrowRightLeft,
  ListOrdered,
} from "lucide-react";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  active: boolean;
}

export type WeekDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface RulesConfig {
  scheduleMode: "custom" | "24/7";
  businessHours: { start: string; end: string };
  workDays: WeekDay[];
  transferTriggers: { financing: boolean; tradeIn: boolean; testDrive: boolean; priceNeg: boolean };
  team: TeamMember[];
  followQueue: boolean;
}

interface StepRulesProps {
  config: RulesConfig;
  onChange: (config: RulesConfig) => void;
  editSection?: string | null;
}

export function StepRules({ config, onChange, editSection }: StepRulesProps) {
  const { scheduleMode, businessHours, workDays, transferTriggers, team, followQueue } = config;

  const update = (partial: Partial<RulesConfig>) => onChange({ ...config, ...partial });

  const weekDays: { key: WeekDay; label: string; full: string }[] = [
    { key: "mon", label: "Seg", full: "Segunda" },
    { key: "tue", label: "Ter", full: "Terça" },
    { key: "wed", label: "Qua", full: "Quarta" },
    { key: "thu", label: "Qui", full: "Quinta" },
    { key: "fri", label: "Sex", full: "Sexta" },
    { key: "sat", label: "Sáb", full: "Sábado" },
    { key: "sun", label: "Dom", full: "Domingo" },
  ];

  const toggleDay = (day: WeekDay) => {
    const next = workDays.includes(day)
      ? workDays.filter((d) => d !== day)
      : [...workDays, day];
    // keep chronological order
    update({ workDays: weekDays.map((w) => w.key).filter((k) => next.includes(k)) });
  };

  const daysSummary = () => {
    const selected = weekDays.filter((w) => workDays.includes(w.key));
    if (selected.length === 0) return "Nenhum dia selecionado";
    if (selected.length === 7) return "Todos os dias";
    const weekdaysOnly: WeekDay[] = ["mon", "tue", "wed", "thu", "fri"];
    if (selected.length === 5 && weekdaysOnly.every((d) => workDays.includes(d))) return "Segunda a Sexta";
    return selected.map((s) => s.full).join(", ");
  };

  const toggleMember = (id: string) => {
    update({ team: team.map((m) => (m.id === id ? { ...m, active: !m.active } : m)) });
  };

  const activeCount = team.filter((m) => m.active).length;

  useEffect(() => {
    if (editSection) {
      const sectionMap: Record<string, string> = {
        "Horário": "section-horario",
        "Transbordo": "section-transbordo",
        "Equipe": "section-equipe",
      };
      const id = sectionMap[editSection];
      if (id) {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [editSection]);

  return (
    <div className="flex flex-col gap-[32px]">
      {/* Business hours */}
      <div id="section-horario" className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-[12px]">
          <div className="size-[40px] rounded-[10px] bg-[#F9F5FF] flex items-center justify-center">
            <Clock size={20} className="text-[#7F56D9]" />
          </div>
          <div>
            <h3 className="text-[18px] text-[#181D27] font-semibold leading-[28px]">Horário de Atendimento</h3>
            <p className="text-[14px] text-[#535862] leading-[20px]">Defina quando a IA pode atender. Fora do horário, ela coleta os dados e avisa que retornará.</p>
          </div>
        </div>

        <div className="rounded-[12px] border border-[#E4E4E4] p-[24px] flex flex-col gap-[20px]" style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
            <button
              onClick={() => update({ scheduleMode: "24/7" })}
              className={`flex flex-col gap-[12px] p-[20px] rounded-[12px] border text-left transition-all ${scheduleMode === "24/7" ? "border-[#7F56D9] bg-[#FCFAFF]" : "border-[#E4E4E4] bg-white hover:border-[#D6BBFB]"}`}
              style={{ boxShadow: scheduleMode === "24/7" ? "0px 4px 8px -2px rgba(127,86,217,0.1), 0px 2px 4px -2px rgba(127,86,217,0.06)" : "0px 1px 2px rgba(16,24,40,0.05)" }}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`size-[40px] rounded-[8px] flex items-center justify-center ${scheduleMode === "24/7" ? "bg-[#F4EBFF]" : "bg-[#F5F5F5]"}`}>
                  <ShieldCheck size={20} className={scheduleMode === "24/7" ? "text-[#7F56D9]" : "text-[#717680]"} />
                </div>
                {scheduleMode === "24/7" && (
                  <div className="size-[20px] rounded-full bg-[#7F56D9] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-[8px]">
                  <p className={`text-[16px] font-semibold leading-[24px] ${scheduleMode === "24/7" ? "text-[#7F56D9]" : "text-[#181D27]"}`}>Atender 24/7</p>
                  <span className={`px-[8px] py-[2px] rounded-full text-[11px] font-medium ${scheduleMode === "24/7" ? "bg-[#F4EBFF] text-[#7F56D9]" : "bg-[#F5F5F5] text-[#717680]"}`}>Recomendado</span>
                </div>
                <p className="text-[13px] text-[#717680] leading-[18px] mt-[2px]">Atendimento ininterrupto, todos os dias, a qualquer hora</p>
              </div>
            </button>

            <button
              onClick={() => update({ scheduleMode: "custom" })}
              className={`flex flex-col gap-[12px] p-[20px] rounded-[12px] border text-left transition-all ${scheduleMode === "custom" ? "border-[#1570EF] bg-[#EFF8FF]" : "border-[#E4E4E4] bg-white hover:border-[#84CAFF]"}`}
              style={{ boxShadow: scheduleMode === "custom" ? "0px 4px 8px -2px rgba(21,112,239,0.1), 0px 2px 4px -2px rgba(21,112,239,0.06)" : "0px 1px 2px rgba(16,24,40,0.05)" }}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`size-[40px] rounded-[8px] flex items-center justify-center ${scheduleMode === "custom" ? "bg-[#D1E9FF]" : "bg-[#F5F5F5]"}`}>
                  <Clock size={20} className={scheduleMode === "custom" ? "text-[#1570EF]" : "text-[#717680]"} />
                </div>
                {scheduleMode === "custom" && (
                  <div className="size-[20px] rounded-full bg-[#1570EF] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                )}
              </div>
              <div>
                <p className={`text-[16px] font-semibold leading-[24px] ${scheduleMode === "custom" ? "text-[#1570EF]" : "text-[#181D27]"}`}>Horário personalizado</p>
                <p className="text-[13px] text-[#717680] leading-[18px] mt-[2px]">Defina os dias e horários de atendimento da IA</p>
              </div>
            </button>
          </div>

          {scheduleMode === "24/7" && (
            <div className="flex items-center gap-[12px] p-[12px] rounded-[8px] bg-[#ECFDF3]">
              <ShieldCheck size={18} className="text-[#039855] shrink-0" />
              <div>
                <p className="text-[14px] text-[#039855] font-medium">Atendimento ininterrupto</p>
                <p className="text-[12px] text-[#027A48]">A IA ficará disponível todos os dias, a qualquer hora.</p>
              </div>
            </div>
          )}

          {scheduleMode === "custom" && (
            <div className="flex flex-col gap-[20px]">
              {/* Day selector */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[14px] text-[#181D27] font-medium">Dias de atendimento</label>
                <div className="flex flex-wrap gap-[8px]">
                  {weekDays.map((day) => {
                    const isOn = workDays.includes(day.key);
                    return (
                      <button
                        key={day.key}
                        onClick={() => toggleDay(day.key)}
                        aria-pressed={isOn}
                        className={`min-w-[52px] px-[14px] py-[8px] rounded-[8px] border text-[14px] font-medium transition-all ${isOn ? "border-[#1570EF] bg-[#EFF8FF] text-[#1570EF]" : "border-[#D5D7DA] bg-white text-[#535862] hover:border-[#84CAFF]"}`}
                        style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>
                <p className={`text-[12px] ${workDays.length === 0 ? "text-[#D92D20]" : "text-[#717680]"}`}>
                  {workDays.length === 0 ? "Selecione pelo menos um dia de atendimento." : <>Atendimento: <span className="text-[#181D27] font-medium">{daysSummary()}</span></>}
                </p>
              </div>

              {/* Hours */}
              <div className="flex flex-wrap items-end gap-[16px]">
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[14px] text-[#181D27] font-medium">Início</label>
                  <input type="time" value={businessHours.start} onChange={(e) => update({ businessHours: { ...businessHours, start: e.target.value } })} className="px-[12px] py-[10px] rounded-[8px] border border-[#D5D7DA] text-[14px] text-[#181D27] outline-none focus:border-[#7F56D9] focus:ring-1 focus:ring-[#7F56D9] transition-colors" style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }} />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[14px] text-[#181D27] font-medium">Término</label>
                  <input type="time" value={businessHours.end} onChange={(e) => update({ businessHours: { ...businessHours, end: e.target.value } })} className="px-[12px] py-[10px] rounded-[8px] border border-[#D5D7DA] text-[14px] text-[#181D27] outline-none focus:border-[#7F56D9] focus:ring-1 focus:ring-[#7F56D9] transition-colors" style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }} />
                </div>
                <span className="text-[14px] text-[#535862] pb-[12px]">{daysSummary()} · {businessHours.start} às {businessHours.end}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transfer rules */}
      <div id="section-transbordo" className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-[12px]">
          <div className="size-[40px] rounded-[10px] bg-[#F9F5FF] flex items-center justify-center">
            <ArrowRightLeft size={20} className="text-[#7F56D9]" />
          </div>
          <div>
            <h3 className="text-[18px] text-[#181D27] font-semibold leading-[28px]">Regras de Transbordo</h3>
            <p className="text-[14px] text-[#535862] leading-[20px]">Quando a IA deve passar o atendimento para um humano?</p>
          </div>
        </div>

        <div className="rounded-[12px] border border-[#E4E4E4] p-[24px] flex flex-col gap-[16px]" style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}>
          <p className="text-[13px] text-[#535862] font-medium">Transferir quando o cliente:</p>
          <div className="flex flex-col gap-[12px]">
            {([
              { key: "financing" as const, label: "Pedir financiamento ou simulação de parcelas" },
              { key: "tradeIn" as const, label: "Quiser avaliar o carro na troca" },
              { key: "testDrive" as const, label: "Solicitar agendamento de test-drive" },
              { key: "priceNeg" as const, label: "Insistir em negociar preço além do limite" },
            ]).map((trigger) => {
              const isActive = transferTriggers[trigger.key];
              return (
                <label key={trigger.key} className="flex items-center gap-[12px] cursor-pointer group" onClick={() => update({ transferTriggers: { ...transferTriggers, [trigger.key]: !transferTriggers[trigger.key] } })}>
                  <div className={`size-[20px] rounded-[4px] border-2 flex items-center justify-center transition-colors ${isActive ? "bg-[#7F56D9] border-[#7F56D9]" : "bg-white border-[#D5D7DA]"}`}>
                    {isActive && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </div>
                  <span className="text-[14px] text-[#181D27] leading-[20px]">{trigger.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team */}
      <div id="section-equipe" className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-[12px]">
          <div className="size-[40px] rounded-[10px] bg-[#F9F5FF] flex items-center justify-center">
            <UserCheck size={20} className="text-[#7F56D9]" />
          </div>
          <div>
            <h3 className="text-[18px] text-[#181D27] font-semibold leading-[28px]">Equipe de Destino</h3>
            <p className="text-[14px] text-[#535862] leading-[20px]">Quem vai receber os leads? A IA distribui entre os ativos.</p>
          </div>
        </div>

        <div className="rounded-[12px] border border-[#E4E4E4] p-[20px] flex items-center justify-between" style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}>
          <div className="flex items-center gap-[12px]">
            <div className="size-[36px] rounded-[8px] bg-[#F9F5FF] flex items-center justify-center">
              <ListOrdered size={18} className="text-[#7F56D9]" />
            </div>
            <div>
              <p className="text-[14px] text-[#181D27] font-medium">Seguir fila da equipe</p>
              <p className="text-[12px] text-[#717680]">Os leads seguem a ordem da fila de atendimento existente da equipe</p>
            </div>
          </div>
          <button onClick={() => update({ followQueue: !followQueue })} className="flex items-center">
            <div className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors ${followQueue ? "bg-[#7F56D9]" : "bg-[#E4E4E4]"}`}>
              <div className={`size-[20px] rounded-full bg-white transition-transform ${followQueue ? "translate-x-[20px]" : "translate-x-0"}`} style={{ boxShadow: "0px 1px 3px rgba(16,24,40,0.1)" }} />
            </div>
          </button>
        </div>

        {!followQueue && (
          <div className="rounded-[12px] border border-[#E4E4E4] overflow-hidden" style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}>
            {team.map((member, i) => (
              <div key={member.id} className={`flex items-center justify-between px-[20px] py-[14px] ${i !== team.length - 1 ? "border-b border-[#F0F0F0]" : ""} hover:bg-[#FAFAFA] transition-colors`}>
                <div className="flex items-center gap-[12px]">
                  <div className="size-[36px] rounded-full bg-[#F4EBFF] flex items-center justify-center">
                    <span className="text-[14px] text-[#7F56D9] font-semibold">{member.name.split(" ").map((n) => n[0]).join("")}</span>
                  </div>
                  <div>
                    <p className="text-[14px] text-[#181D27] font-medium">{member.name}</p>
                    <p className="text-[12px] text-[#717680]">{member.role}</p>
                  </div>
                </div>
                <button onClick={() => toggleMember(member.id)} className="flex items-center">
                  <div className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors ${member.active ? "bg-[#7F56D9]" : "bg-[#E4E4E4]"}`}>
                    <div className={`size-[20px] rounded-full bg-white transition-transform ${member.active ? "translate-x-[20px]" : "translate-x-0"}`} style={{ boxShadow: "0px 1px 3px rgba(16,24,40,0.1)" }} />
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-[8px] p-[12px] rounded-[8px] bg-[#F9F5FF]">
          <ShieldCheck size={16} className="text-[#7F56D9] shrink-0" />
          <p className="text-[13px] text-[#535862]">
            {followQueue
              ? "Os leads serão distribuídos seguindo a fila padrão de disponibilidade da equipe."
              : <>Os leads serão distribuídos seguindo a disponibilidade dos{" "}<span className="text-[#181D27] font-medium">{activeCount} vendedores ativos</span>.</>}
          </p>
        </div>
      </div>
    </div>
  );
}