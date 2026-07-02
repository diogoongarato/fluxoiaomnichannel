import { Info, ArrowRight, Mail, Search, Bell, Settings, Check, X, AlertTriangle, Star, Heart, Eye, Lock, User, ExternalLink } from "lucide-react";
import { useState } from "react";

/* ─── Spacing Tokens ─── */
const spacingTokens = [
  { name: "4px", value: "4px", desc: "Micro — icon gaps, inline spacing" },
  { name: "8px", value: "8px", desc: "XS — tight element gaps, pill padding" },
  { name: "12px", value: "12px", desc: "SM — button padding, input padding" },
  { name: "16px", value: "16px", desc: "MD — card padding, element gaps" },
  { name: "24px", value: "24px", desc: "LG — section inner gaps, nav gaps" },
  { name: "32px", value: "32px", desc: "XL — section padding, header padding" },
  { name: "48px", value: "48px", desc: "2XL — between major sections" },
  { name: "64px", value: "64px", desc: "3XL — page section padding" },
  { name: "96px", value: "96px", desc: "4XL — hero vertical padding" },
  { name: "160px", value: "160px", desc: "5XL — hero max padding, footer bottom" },
];

const borderRadiusTokens = [
  { name: "none", value: "0px", css: "rounded-none" },
  { name: "sm", value: "4px", css: "rounded-[4px]" },
  { name: "md", value: "8px", css: "rounded-[8px]" },
  { name: "lg", value: "12px", css: "rounded-[12px]" },
  { name: "xl", value: "16px", css: "rounded-[16px]" },
  { name: "2xl", value: "24px", css: "rounded-[24px]" },
  { name: "full", value: "9999px", css: "rounded-full" },
];

const shadowTokens = [
  { name: "xs", value: "0px 1px 2px rgba(16,24,40,0.05)", desc: "Inputs, small cards" },
  { name: "sm", value: "0px 1px 3px rgba(16,24,40,0.1), 0px 1px 2px rgba(16,24,40,0.06)", desc: "Buttons, dropdowns" },
  { name: "md", value: "0px 4px 8px -2px rgba(16,24,40,0.1), 0px 2px 4px -2px rgba(16,24,40,0.06)", desc: "Cards, popovers" },
  { name: "lg", value: "0px 12px 16px -4px rgba(16,24,40,0.08), 0px 4px 6px -2px rgba(16,24,40,0.03)", desc: "Modals, dialogs" },
  { name: "xl", value: "0px 20px 24px -4px rgba(16,24,40,0.08), 0px 8px 8px -4px rgba(16,24,40,0.03)", desc: "Floating panels" },
  { name: "2xl", value: "0px 24px 48px -12px rgba(16,24,40,0.18)", desc: "Elevated overlays" },
];

/* ─── Reusable section wrapper ─── */
function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-[32px]">
      <div className="flex flex-col gap-[8px] border-b border-[#D5D7DA] pb-[16px]">
        <h2 className="text-[24px] text-[#181d27] font-semibold tracking-[-0.48px] leading-[1.2] font-['Inter',sans-serif]">{title}</h2>
        {description && <p className="text-[16px] text-[#535862] leading-[1.4] font-['Inter',sans-serif]">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function TokenRow({ label, value, children }: { label: string; value: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[24px] font-['Inter',sans-serif]">
      <span className="w-[80px] text-[14px] text-[#181d27] font-semibold shrink-0">{label}</span>
      <span className="w-[160px] text-[14px] text-[#535862] shrink-0">{value}</span>
      {children}
    </div>
  );
}

export default function ShowcasePage() {
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      {/* ══════════ HEADER ══════════ */}
      <header className="border-b border-[#D5D7DA] sticky top-0 bg-white z-50">
        <div className="max-w-[1200px] mx-auto flex items-center gap-[24px] p-[32px]">
          {/* Logo */}
          <div className="shrink-0">
            <svg width="40" height="35" viewBox="0 0 40 38.5" fill="none">
              <path d="M20 1.75H14.1667C12.6196 1.75 11.1358 2.36458 10.0419 3.45854C8.94792 4.55251 8.33333 6.03624 8.33333 7.58333C8.33333 9.13043 8.94792 10.6142 10.0419 11.7081C11.1358 12.8021 12.6196 13.4167 14.1667 13.4167M20 1.75V13.4167M20 1.75H25.8333C27.3804 1.75 28.8642 2.36458 29.9581 3.45854C31.0521 4.55251 31.6667 6.03624 31.6667 7.58333C31.6667 9.13043 31.0521 10.6142 29.9581 11.7081C28.8642 12.8021 27.3804 13.4167 25.8333 13.4167M20 13.4167H14.1667M20 13.4167H25.8333M20 13.4167V25.0833M14.1667 13.4167C12.6196 13.4167 11.1358 14.0312 10.0419 15.1252C8.94792 16.2192 8.33333 17.7029 8.33333 19.25C8.33333 20.7971 8.94792 22.2808 10.0419 23.3748C11.1358 24.4688 12.6196 25.0833 14.1667 25.0833M25.8333 13.4167C24.2862 13.4167 22.8025 14.0312 21.7085 15.1252C20.6146 16.2192 20 17.7029 20 19.25C20 20.7971 20.6146 22.2808 21.7085 23.3748C22.8025 24.4688 24.2862 25.0833 25.8333 25.0833C27.3804 25.0833 28.8642 24.4688 29.9581 23.3748C31.0521 22.2808 31.6667 20.7971 31.6667 19.25C31.6667 17.7029 31.0521 16.2192 29.9581 15.1252C28.8642 14.0312 27.3804 13.4167 25.8333 13.4167ZM14.1667 25.0833C12.6196 25.0833 11.1358 25.6979 10.0419 26.7919C8.94792 27.8858 8.33333 29.3696 8.33333 30.9167C8.33333 32.4638 8.94792 33.9475 10.0419 35.0415C11.1358 36.1354 12.6196 36.75 14.1667 36.75C15.7138 36.75 17.1975 36.1354 18.2915 35.0415C19.3854 33.9475 20 32.4638 20 30.9167V25.0833M14.1667 25.0833H20" stroke="#181D27" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
            </svg>
          </div>
          {/* Nav */}
          <nav className="flex flex-1 flex-wrap gap-[8px] justify-end items-center">
            {["Products", "Solutions", "Community", "Resources", "Pricing", "Contact"].map((item) => (
              <a key={item} href="#" className="px-[8px] py-[8px] rounded-[8px] text-[16px] text-[#181d27] hover:bg-[#F9F5FF] hover:text-[#7F56D9] transition-colors">
                {item}
              </a>
            ))}
          </nav>
          {/* Auth buttons */}
          <div className="flex gap-[12px] shrink-0">
            <button className="px-[16px] py-[8px] rounded-[8px] border border-[#D5D7DA] bg-white text-[16px] text-[#181d27] hover:bg-[#F5F5F5] transition-colors">
              Sign in
            </button>
            <button className="px-[16px] py-[8px] rounded-[8px] bg-[#7F56D9] text-[16px] text-white hover:bg-[#6941C6] transition-colors">
              Register
            </button>
          </div>
        </div>
      </header>

      {/* ══════════ HERO ══════════ */}
      <div className="bg-[#F9F5FF] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #7F56D9 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="flex flex-col items-center justify-center px-[24px] py-[160px] relative z-10">
          <div className="flex flex-col gap-[8px] items-center text-center">
            <h1 className="text-[72px] text-[#181d27] font-bold leading-[1.2] tracking-[-2.16px]">Showcase</h1>
            <p className="text-[32px] text-[#535862] leading-[1.2]">Component library & design tokens</p>
          </div>
          <div className="flex gap-[16px] items-center mt-[32px]">
            <button className="px-[20px] py-[12px] rounded-[8px] border border-[#D5D7DA] bg-white text-[16px] text-[#181d27] hover:bg-[#F5F5F5] transition-colors">
              View Style Guide
            </button>
            <button className="px-[20px] py-[12px] rounded-[8px] bg-[#7F56D9] text-[16px] text-white hover:bg-[#6941C6] transition-colors flex items-center gap-[8px]">
              Get Started <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-[32px] py-[64px] flex flex-col gap-[96px]">

        {/* ══════════ BUTTONS ══════════ */}
        <Section title="Buttons" description="Interactive elements for triggering actions. Use Brand 600 (#7F56D9) as primary, white with border for secondary, and text-only for tertiary.">
          {/* Primary */}
          <div className="flex flex-col gap-[16px]">
            <p className="text-[14px] text-[#535862] font-medium">Primary</p>
            <div className="flex flex-wrap gap-[16px] items-center">
              <button className="px-[20px] py-[12px] rounded-[8px] bg-[#7F56D9] text-[16px] text-white hover:bg-[#6941C6] transition-colors">Button</button>
              <button className="px-[16px] py-[10px] rounded-[8px] bg-[#7F56D9] text-[14px] text-white hover:bg-[#6941C6] transition-colors">Small</button>
              <button className="px-[24px] py-[14px] rounded-[8px] bg-[#7F56D9] text-[18px] text-white hover:bg-[#6941C6] transition-colors">Large</button>
              <button className="px-[20px] py-[12px] rounded-[8px] bg-[#7F56D9] text-[16px] text-white hover:bg-[#6941C6] transition-colors flex items-center gap-[8px]">
                <Mail size={16} /> With Icon
              </button>
              <button className="px-[20px] py-[12px] rounded-[8px] bg-[#7F56D9] text-[16px] text-white opacity-50 cursor-not-allowed">Disabled</button>
            </div>
          </div>
          {/* Secondary */}
          <div className="flex flex-col gap-[16px]">
            <p className="text-[14px] text-[#535862] font-medium">Secondary (Outline)</p>
            <div className="flex flex-wrap gap-[16px] items-center">
              <button className="px-[20px] py-[12px] rounded-[8px] border border-[#D5D7DA] bg-white text-[16px] text-[#181d27] hover:bg-[#F5F5F5] transition-colors">Button</button>
              <button className="px-[20px] py-[12px] rounded-[8px] border border-[#7F56D9] bg-white text-[16px] text-[#7F56D9] hover:bg-[#F9F5FF] transition-colors">Brand Outline</button>
              <button className="px-[20px] py-[12px] rounded-[8px] border border-[#D5D7DA] bg-white text-[16px] text-[#181d27] hover:bg-[#F5F5F5] transition-colors flex items-center gap-[8px]">
                <Settings size={16} /> Settings
              </button>
            </div>
          </div>
          {/* Tertiary */}
          <div className="flex flex-col gap-[16px]">
            <p className="text-[14px] text-[#535862] font-medium">Tertiary (Ghost/Text)</p>
            <div className="flex flex-wrap gap-[16px] items-center">
              <button className="px-[20px] py-[12px] rounded-[8px] text-[16px] text-[#7F56D9] hover:bg-[#F9F5FF] transition-colors">Text Button</button>
              <button className="px-[20px] py-[12px] rounded-[8px] text-[16px] text-[#535862] hover:bg-[#F5F5F5] transition-colors">Ghost</button>
              <button className="px-[12px] py-[12px] rounded-[8px] text-[#535862] hover:bg-[#F5F5F5] transition-colors"><Search size={20} /></button>
              <button className="px-[12px] py-[12px] rounded-[8px] text-[#535862] hover:bg-[#F5F5F5] transition-colors"><Bell size={20} /></button>
            </div>
          </div>
          {/* Destructive */}
          <div className="flex flex-col gap-[16px]">
            <p className="text-[14px] text-[#535862] font-medium">Destructive</p>
            <div className="flex flex-wrap gap-[16px] items-center">
              <button className="px-[20px] py-[12px] rounded-[8px] bg-[#D92D20] text-[16px] text-white hover:bg-[#B42318] transition-colors">Delete</button>
              <button className="px-[20px] py-[12px] rounded-[8px] border border-[#FDA29B] bg-white text-[16px] text-[#D92D20] hover:bg-[#FEF3F2] transition-colors">Cancel</button>
            </div>
          </div>
        </Section>

        {/* ══════════ INPUTS ══════════ */}
        <Section title="Inputs & Forms" description="Form elements with consistent padding (12px), border-radius (8px), and border color (Gray 300).">
          <div className="grid grid-cols-2 gap-[32px]">
            {/* Text input */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] text-[#181d27] font-medium">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#717680]" />
                <input type="email" placeholder="you@company.com" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full pl-[36px] pr-[12px] py-[10px] rounded-[8px] border border-[#D5D7DA] text-[16px] text-[#181d27] placeholder:text-[#A4A7AE] outline-none focus:border-[#7F56D9] focus:ring-1 focus:ring-[#7F56D9] transition-colors" style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }} />
              </div>
              <p className="text-[14px] text-[#535862]">This is a hint text to help user.</p>
            </div>
            {/* Search */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] text-[#181d27] font-medium">Search</label>
              <div className="relative">
                <Search size={16} className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#717680]" />
                <input type="text" placeholder="Search..." className="w-full pl-[36px] pr-[12px] py-[10px] rounded-[8px] border border-[#D5D7DA] text-[16px] text-[#181d27] placeholder:text-[#A4A7AE] outline-none focus:border-[#7F56D9] focus:ring-1 focus:ring-[#7F56D9] transition-colors" style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }} />
              </div>
            </div>
            {/* Password */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] text-[#181d27] font-medium">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#717680]" />
                <input type="password" placeholder="••••••••" className="w-full pl-[36px] pr-[40px] py-[10px] rounded-[8px] border border-[#D5D7DA] text-[16px] text-[#181d27] placeholder:text-[#A4A7AE] outline-none focus:border-[#7F56D9] focus:ring-1 focus:ring-[#7F56D9] transition-colors" style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }} />
                <Eye size={16} className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#717680] cursor-pointer" />
              </div>
            </div>
            {/* Error state */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] text-[#181d27] font-medium">Error state</label>
              <input type="text" value="Invalid value" readOnly className="w-full px-[12px] py-[10px] rounded-[8px] border border-[#F04438] text-[16px] text-[#181d27] outline-none focus:ring-1 focus:ring-[#F04438]" style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }} />
              <p className="text-[14px] text-[#D92D20]">This field is required.</p>
            </div>
            {/* Textarea */}
            <div className="flex flex-col gap-[8px] col-span-2">
              <label className="text-[14px] text-[#181d27] font-medium">Description</label>
              <textarea placeholder="Enter a description..." rows={4} className="w-full px-[12px] py-[10px] rounded-[8px] border border-[#D5D7DA] text-[16px] text-[#181d27] placeholder:text-[#A4A7AE] outline-none focus:border-[#7F56D9] focus:ring-1 focus:ring-[#7F56D9] transition-colors resize-none" style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }} />
            </div>
            {/* Checkbox & Toggle */}
            <div className="flex flex-col gap-[16px]">
              <p className="text-[14px] text-[#535862] font-medium">Checkbox</p>
              <label className="flex items-center gap-[12px] cursor-pointer" onClick={() => setChecked(!checked)}>
                <div className={`size-[20px] rounded-[4px] border-2 flex items-center justify-center transition-colors ${checked ? "bg-[#7F56D9] border-[#7F56D9]" : "bg-white border-[#D5D7DA]"}`}>
                  {checked && <Check size={14} className="text-white" />}
                </div>
                <span className="text-[16px] text-[#181d27]">Remember me</span>
              </label>
            </div>
            <div className="flex flex-col gap-[16px]">
              <p className="text-[14px] text-[#535862] font-medium">Toggle</p>
              <button className="flex items-center gap-[12px]" onClick={() => setToggled(!toggled)}>
                <div className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors ${toggled ? "bg-[#7F56D9]" : "bg-[#E4E4E4]"}`}>
                  <div className={`size-[20px] rounded-full bg-white shadow-sm transition-transform ${toggled ? "translate-x-[20px]" : "translate-x-0"}`} />
                </div>
                <span className="text-[16px] text-[#181d27]">Notifications</span>
              </button>
            </div>
          </div>
        </Section>

        {/* ══════════ BADGES / PILLS ══════════ */}
        <Section title="Badges & Pills" description="Status indicators and labels. Use semantic colors from the palette.">
          <div className="flex flex-wrap gap-[12px] items-center">
            <span className="px-[10px] py-[4px] rounded-full bg-[#F9F5FF] text-[#7F56D9] text-[14px] font-medium">Brand</span>
            <span className="px-[10px] py-[4px] rounded-full bg-[#ECFDF3] text-[#039855] text-[14px] font-medium flex items-center gap-[4px]"><Check size={12} /> Success</span>
            <span className="px-[10px] py-[4px] rounded-full bg-[#FEF3F2] text-[#D92D20] text-[14px] font-medium flex items-center gap-[4px]"><X size={12} /> Error</span>
            <span className="px-[10px] py-[4px] rounded-full bg-[#FFFAEB] text-[#DC6803] text-[14px] font-medium flex items-center gap-[4px]"><AlertTriangle size={12} /> Warning</span>
            <span className="px-[10px] py-[4px] rounded-full bg-[#EFF8FF] text-[#1570EF] text-[14px] font-medium flex items-center gap-[4px]"><Info size={12} /> Info</span>
            <span className="px-[10px] py-[4px] rounded-full bg-[#F5F5F5] text-[#535862] text-[14px] font-medium">Neutral</span>
          </div>
          {/* Outline variants */}
          <div className="flex flex-wrap gap-[12px] items-center">
            <span className="px-[10px] py-[4px] rounded-full border border-[#D6BBFB] text-[#7F56D9] text-[14px] font-medium">Brand</span>
            <span className="px-[10px] py-[4px] rounded-full border border-[#6CE9A6] text-[#039855] text-[14px] font-medium">Success</span>
            <span className="px-[10px] py-[4px] rounded-full border border-[#FDA29B] text-[#D92D20] text-[14px] font-medium">Error</span>
            <span className="px-[10px] py-[4px] rounded-full border border-[#FEC84B] text-[#DC6803] text-[14px] font-medium">Warning</span>
            <span className="px-[10px] py-[4px] rounded-full border border-[#D5D7DA] text-[#535862] text-[14px] font-medium">Neutral</span>
          </div>
        </Section>

        {/* ══════════ CARDS ══════════ */}
        <Section title="Cards" description="Container components for grouping related content. Padding 24px, border-radius 12px.">
          <div className="grid grid-cols-3 gap-[24px]">
            {[
              { icon: Star, title: "Design", desc: "Create beautiful interfaces with our comprehensive design system and tokens." },
              { icon: Heart, title: "Develop", desc: "Build consistent, scalable UIs using pre-defined components and patterns." },
              { icon: Settings, title: "Deploy", desc: "Ship with confidence knowing your design foundations are solid." },
            ].map((card) => (
              <div key={card.title} className="flex flex-col gap-[16px] p-[24px] rounded-[12px] border border-[#E4E4E4] hover:border-[#D6BBFB] hover:shadow-md transition-all cursor-pointer group">
                <div className="size-[48px] rounded-[10px] bg-[#F9F5FF] flex items-center justify-center group-hover:bg-[#F4EBFF] transition-colors">
                  <card.icon size={24} className="text-[#7F56D9]" />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <h3 className="text-[20px] text-[#181d27] font-semibold leading-[1.2]">{card.title}</h3>
                  <p className="text-[16px] text-[#535862] leading-[1.5]">{card.desc}</p>
                </div>
                <span className="text-[14px] text-[#7F56D9] font-medium flex items-center gap-[8px] mt-auto">
                  Learn more <ArrowRight size={14} />
                </span>
              </div>
            ))}
          </div>
          {/* Feature card row (from Figma) */}
          <div className="grid grid-cols-3 gap-[64px] mt-[32px]">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-[24px] items-start">
                <div className="shrink-0 size-[32px] flex items-center justify-center">
                  <Info size={24} className="text-[#181d27]" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[24px] text-[#181d27] font-semibold leading-[1.2] tracking-[-0.48px]">Title</p>
                  <p className="text-[16px] text-[#535862] leading-[1.4]">Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ══════════ AVATARS ══════════ */}
        <Section title="Avatars" description="User representations with consistent sizing (24px, 32px, 40px, 48px, 64px) and full border-radius.">
          <div className="flex items-center gap-[16px]">
            {[24, 32, 40, 48, 64].map((size) => (
              <div key={size} className="flex flex-col items-center gap-[8px]">
                <div className="rounded-full bg-[#F4EBFF] flex items-center justify-center" style={{ width: size, height: size }}>
                  <User size={size * 0.5} className="text-[#7F56D9]" />
                </div>
                <span className="text-[12px] text-[#717680]">{size}px</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ══════════ NAVIGATION PILLS ══════════ */}
        <Section title="Navigation Pills" description="Navigation items with 8px padding, 8px border-radius. Active state uses Gray 100 background.">
          <div className="flex flex-wrap gap-[8px]">
            <a href="#" className="px-[8px] py-[8px] rounded-[8px] bg-[#F0F0F0] text-[16px] text-[#181d27]">Active</a>
            <a href="#" className="px-[8px] py-[8px] rounded-[8px] text-[16px] text-[#181d27] hover:bg-[#F5F5F5] transition-colors">Link</a>
            <a href="#" className="px-[8px] py-[8px] rounded-[8px] text-[16px] text-[#181d27] hover:bg-[#F5F5F5] transition-colors">Link</a>
            <a href="#" className="px-[8px] py-[8px] rounded-[8px] text-[16px] text-[#181d27] hover:bg-[#F5F5F5] transition-colors">Link</a>
          </div>
        </Section>

        {/* ══════════ ALERTS ══════════ */}
        <Section title="Alerts" description="Notification banners using semantic colors. Padding 16px, border-radius 12px, left accent border 4px.">
          <div className="flex flex-col gap-[16px]">
            {[
              { bg: "#ECFDF3", border: "#039855", icon: Check, color: "#039855", title: "Success", text: "Your changes have been saved." },
              { bg: "#FEF3F2", border: "#D92D20", icon: X, color: "#D92D20", title: "Error", text: "Something went wrong. Please try again." },
              { bg: "#FFFAEB", border: "#DC6803", icon: AlertTriangle, color: "#DC6803", title: "Warning", text: "Your trial is about to expire." },
              { bg: "#EFF8FF", border: "#1570EF", icon: Info, color: "#1570EF", title: "Info", text: "A new software update is available." },
            ].map((a) => (
              <div key={a.title} className="flex items-start gap-[12px] p-[16px] rounded-[12px]" style={{ backgroundColor: a.bg, borderLeft: `4px solid ${a.border}` }}>
                <a.icon size={20} style={{ color: a.color }} className="shrink-0 mt-[2px]" />
                <div>
                  <p className="text-[14px] font-semibold" style={{ color: a.color }}>{a.title}</p>
                  <p className="text-[14px] text-[#414651]">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ══════════ SPACING TOKENS ══════════ */}
        <Section title="Spacing" description="Consistent spacing scale extracted from the design system. Use these values for padding, margins, and gaps.">
          <div className="flex flex-col gap-[12px]">
            {spacingTokens.map((t) => (
              <TokenRow key={t.name} label={t.name} value={t.desc}>
                <div className="flex-1 flex items-center">
                  <div className="h-[16px] rounded-[4px] bg-[#E9D7FE]" style={{ width: t.value }} />
                </div>
              </TokenRow>
            ))}
          </div>
        </Section>

        {/* ══════════ BORDER RADIUS ══════════ */}
        <Section title="Border Radius" description="Rounded corner tokens. Default component radius is 8px (md). Cards use 12px (lg). Pills use full.">
          <div className="flex flex-wrap gap-[24px] items-end">
            {borderRadiusTokens.map((t) => (
              <div key={t.name} className="flex flex-col items-center gap-[8px]">
                <div className="size-[64px] bg-[#F4EBFF] border-2 border-[#7F56D9]" style={{ borderRadius: t.value }} />
                <span className="text-[14px] text-[#181d27] font-semibold">{t.name}</span>
                <span className="text-[12px] text-[#717680]">{t.value}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ══════════ SHADOWS ══════════ */}
        <Section title="Effects / Shadows" description="Box shadow tokens for elevation hierarchy. Lighter shadows for inputs, heavier for modals.">
          <div className="grid grid-cols-3 gap-[32px]">
            {shadowTokens.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-[12px]">
                <div className="size-[120px] rounded-[12px] bg-white border border-[#E4E4E4]" style={{ boxShadow: s.value }} />
                <span className="text-[14px] text-[#181d27] font-semibold">shadow-{s.name}</span>
                <span className="text-[12px] text-[#717680] text-center">{s.desc}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ══════════ DIVIDERS ══════════ */}
        <Section title="Dividers" description="Use Gray 300 (#D5D7DA) for horizontal rules and section separators. Border-bottom style for headers.">
          <div className="flex flex-col gap-[24px]">
            <div>
              <p className="text-[14px] text-[#535862] mb-[8px]">Standard divider (1px, Gray 300)</p>
              <hr className="border-[#D5D7DA]" />
            </div>
            <div>
              <p className="text-[14px] text-[#535862] mb-[8px]">Section divider (1px, Gray 200)</p>
              <hr className="border-[#E4E4E4]" />
            </div>
          </div>
        </Section>

      </main>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="border-t border-[#D5D7DA]">
        <div className="max-w-[1200px] mx-auto flex flex-wrap gap-[16px] px-[32px] pt-[32px] pb-[160px]">
          {/* Logo column */}
          <div className="flex flex-col gap-[24px] w-[262px] shrink-0">
            <svg width="24" height="35" viewBox="0 0 26.8333 38.5" fill="none">
              <path d="M13.4167 1.75H7.58333C6.03624 1.75 4.55251 2.36458 3.45854 3.45854C2.36458 4.55251 1.75 6.03624 1.75 7.58333C1.75 9.13043 2.36458 10.6142 3.45854 11.7081C4.55251 12.8021 6.03624 13.4167 7.58333 13.4167M13.4167 1.75V13.4167M13.4167 1.75H19.25C20.7971 1.75 22.2808 2.36458 23.3748 3.45854C24.4688 4.55251 25.0833 6.03624 25.0833 7.58333C25.0833 9.13043 24.4688 10.6142 23.3748 11.7081C22.2808 12.8021 20.7971 13.4167 19.25 13.4167M13.4167 13.4167H7.58333M13.4167 13.4167H19.25M13.4167 13.4167V25.0833M7.58333 13.4167C6.03624 13.4167 4.55251 14.0312 3.45854 15.1252C2.36458 16.2192 1.75 17.7029 1.75 19.25C1.75 20.7971 2.36458 22.2808 3.45854 23.3748C4.55251 24.4688 6.03624 25.0833 7.58333 25.0833M19.25 13.4167C17.7029 13.4167 16.2192 14.0312 15.1252 15.1252C14.0312 16.2192 13.4167 17.7029 13.4167 19.25C13.4167 20.7971 14.0312 22.2808 15.1252 23.3748C16.2192 24.4688 17.7029 25.0833 19.25 25.0833C20.7971 25.0833 22.2808 24.4688 23.3748 23.3748C24.4688 22.2808 25.0833 20.7971 25.0833 19.25C25.0833 17.7029 24.4688 16.2192 23.3748 15.1252C22.2808 14.0312 20.7971 13.4167 19.25 13.4167ZM7.58333 25.0833C6.03624 25.0833 4.55251 25.6979 3.45854 26.7919C2.36458 27.8858 1.75 29.3696 1.75 30.9167C1.75 32.4638 2.36458 33.9475 3.45854 35.0415C4.55251 36.1354 6.03624 36.75 7.58333 36.75C9.13043 36.75 10.6142 36.1354 11.7081 35.0415C12.8021 33.9475 13.4167 32.4638 13.4167 30.9167V25.0833M7.58333 25.0833H13.4167" stroke="#181D27" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
            </svg>
            <div className="flex gap-[16px] items-center">
              {["X", "Instagram", "YouTube", "LinkedIn"].map((social) => (
                <a key={social} href="#" className="text-[#181d27] hover:text-[#7F56D9] transition-colors">
                  <ExternalLink size={20} />
                </a>
              ))}
            </div>
          </div>
          {/* Link columns */}
          {[
            { title: "Use cases", links: ["UI design", "UX design", "Wireframing", "Diagramming", "Brainstorming", "Online whiteboard", "Team collaboration"] },
            { title: "Explore", links: ["Design", "Prototyping", "Development features", "Design systems", "Collaboration features", "Design process", "FigJam"] },
            { title: "Resources", links: ["Blog", "Best practices", "Colors", "Color wheel", "Support", "Developers", "Resource library"] },
          ].map((col) => (
            <div key={col.title} className="flex flex-col gap-[12px] w-[262px]">
              <p className="text-[16px] text-[#181d27] font-semibold pb-[16px]">{col.title}</p>
              {col.links.map((link) => (
                <a key={link} href="#" className="text-[16px] text-[#535862] leading-[1.4] hover:text-[#7F56D9] transition-colors">{link}</a>
              ))}
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}