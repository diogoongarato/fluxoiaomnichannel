import { useState } from "react";
import { ColorSection } from "./color-section";
import { TypographySection } from "./typography-section";
import { IconSection } from "./icon-section";

const tabs = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "icons", label: "Icons" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function StyleGuidePage() {
  const [activeTab, setActiveTab] = useState<TabId>("colors");

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      <header className="border-b border-[#D5D7DA] sticky top-0 bg-white z-10">
        <div className="max-w-[1440px] mx-auto px-[40px] py-[24px]">
          <h1 className="text-[30px] text-[#181d27] font-semibold leading-[38px]">
            Style Guide
          </h1>
          <p className="text-[16px] text-[#535862] mt-[4px]">
            Design system foundations — colors, typography, and iconography.
          </p>
          <nav className="flex gap-[24px] mt-[24px]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-[12px] text-[14px] font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#7F56D9] text-[#7F56D9]"
                    : "border-transparent text-[#535862] hover:text-[#181d27]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-[1440px] mx-auto px-[40px] py-[48px]">
        {activeTab === "colors" && <ColorSection />}
        {activeTab === "typography" && <TypographySection />}
        {activeTab === "icons" && <IconSection />}
      </main>
    </div>
  );
}
