const typescale = [
  { name: "Display 2xl", size: "72px / 4.5rem", lineHeight: "90px / 5.625rem", tracking: "-2%", fontSize: 72, lh: 90, tr: -1.44 },
  { name: "Display xl", size: "60px / 3.75rem", lineHeight: "72px / 4.5rem", tracking: "-2%", fontSize: 60, lh: 72, tr: -1.2 },
  { name: "Display lg", size: "48px / 3rem", lineHeight: "60px / 3.75rem", tracking: "-2%", fontSize: 48, lh: 60, tr: -0.96 },
  { name: "Display md", size: "36px / 2.25rem", lineHeight: "44px / 2.75rem", tracking: "-2%", fontSize: 36, lh: 44, tr: -0.72 },
  { name: "Display sm", size: "30px / 1.875rem", lineHeight: "38px / 2.375rem", tracking: undefined, fontSize: 30, lh: 38, tr: 0 },
  { name: "Display xs", size: "24px / 1.5rem", lineHeight: "32px / 2rem", tracking: undefined, fontSize: 24, lh: 32, tr: 0 },
  { name: "Text xl", size: "20px / 1.25rem", lineHeight: "30px / 1.875rem", tracking: undefined, fontSize: 20, lh: 30, tr: 0 },
  { name: "Text lg", size: "18px / 1.125rem", lineHeight: "28px / 1.75rem", tracking: undefined, fontSize: 18, lh: 28, tr: 0 },
  { name: "Text md", size: "16px / 1rem", lineHeight: "24px / 1.5rem", tracking: undefined, fontSize: 16, lh: 24, tr: 0 },
  { name: "Text sm", size: "14px / 0.875rem", lineHeight: "20px / 1.25rem", tracking: undefined, fontSize: 14, lh: 20, tr: 0 },
  { name: "Text xs", size: "12px / 0.75rem", lineHeight: "18px / 1.125rem", tracking: undefined, fontSize: 12, lh: 18, tr: 0 },
];

const weights = [
  { label: "Regular", cls: "font-normal" },
  { label: "Medium", cls: "font-medium" },
  { label: "Semibold", cls: "font-semibold" },
  { label: "Bold", cls: "font-bold" },
];

function Divider() {
  return <div className="w-full h-px bg-[#D5D7DA]" />;
}

export function TypographySection() {
  return (
    <section className="flex flex-col gap-[64px] font-['Inter',sans-serif]">
      {/* Typeface showcase */}
      <div className="flex flex-col gap-[64px] text-[#181d27]">
        <div className="flex flex-col gap-[16px]">
          <p className="text-[48px]">Inter</p>
          <p className="text-[112px] leading-[1]">Ag</p>
        </div>
        <p className="text-[48px] leading-[60px] tracking-[-0.96px]">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
          abcdefghijklmnopqrstuvwxyz<br />
          {`0123456789 !@#$%^&*()`}
        </p>
      </div>

      {/* Type scale */}
      {typescale.map((t) => (
        <div key={t.name} className="flex flex-col gap-[32px]">
          {/* Header */}
          <div className="flex flex-col gap-[16px]">
            <div className="flex justify-between text-[16px] text-[#535862] leading-[24px]">
              <span>{t.name}</span>
              <span>
                Font size: {t.size} | Line height: {t.lineHeight}
                {t.tracking ? ` | Tracking: ${t.tracking}` : ""}
              </span>
            </div>
            <Divider />
          </div>
          {/* Samples */}
          <div
            className="grid grid-cols-4 gap-[32px] text-[#181d27]"
            style={{
              fontSize: `${t.fontSize}px`,
              lineHeight: `${t.lh}px`,
              letterSpacing: t.tr ? `${t.tr}px` : undefined,
            }}
          >
            {weights.map((w) => (
              <div key={w.label} className={`${w.cls} min-w-0`}>
                <p style={{ marginBottom: `${t.fontSize}px` }}>{t.name}</p>
                <p>{w.label}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
