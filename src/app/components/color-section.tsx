import { useState } from "react";

interface ColorSwatch {
  shade: string;
  hex: string;
  aa?: string;
}

interface ColorRow {
  name: string;
  description: string;
  swatches: ColorSwatch[];
}

const primaryColors: ColorRow[] = [
  {
    name: "Gray",
    description: "Gray is a neutral color and is the foundation of the color system. Almost everything in UI design—text, form fields, backgrounds, dividers—is usually gray.",
    swatches: [
      { shade: "25", hex: "#FAFAFA" },
      { shade: "50", hex: "#F5F5F5" },
      { shade: "100", hex: "#F0F0F0" },
      { shade: "200", hex: "#E4E4E4" },
      { shade: "300", hex: "#D5D7DA" },
      { shade: "400", hex: "#A4A7AE" },
      { shade: "500", hex: "#717680" },
      { shade: "600", hex: "#535862" },
      { shade: "700", hex: "#414651" },
      { shade: "800", hex: "#252B37" },
      { shade: "900", hex: "#181D27" },
      { shade: "950", hex: "#0A0D12" },
    ],
  },
  {
    name: "Brand",
    description: "The brand color is your 'primary' color, and is used across all interactive elements such as buttons, links, inputs, etc. This color can define the overall feel and can elicit emotion.",
    swatches: [
      { shade: "25", hex: "#FCFAFF" },
      { shade: "50", hex: "#F9F5FF" },
      { shade: "100", hex: "#F4EBFF" },
      { shade: "200", hex: "#E9D7FE" },
      { shade: "300", hex: "#D6BBFB" },
      { shade: "400", hex: "#B692F6" },
      { shade: "500", hex: "#9E77ED" },
      { shade: "600", hex: "#7F56D9" },
      { shade: "700", hex: "#6941C6" },
      { shade: "800", hex: "#53389E" },
      { shade: "900", hex: "#42307D" },
      { shade: "950", hex: "#2C1C5F" },
    ],
  },
  {
    name: "Error",
    description: "Error colors are used across error states and in 'destructive' actions. They communicate a destructive/negative action, such as removing a user from your team.",
    swatches: [
      { shade: "25", hex: "#FFFBFA" },
      { shade: "50", hex: "#FEF3F2" },
      { shade: "100", hex: "#FEE4E2" },
      { shade: "200", hex: "#FECDCA" },
      { shade: "300", hex: "#FDA29B" },
      { shade: "400", hex: "#F97066" },
      { shade: "500", hex: "#F04438" },
      { shade: "600", hex: "#D92D20" },
      { shade: "700", hex: "#B42318" },
      { shade: "800", hex: "#912018" },
      { shade: "900", hex: "#7A271A" },
      { shade: "950", hex: "#55160C" },
    ],
  },
  {
    name: "Warning",
    description: "Warning colors can communicate that an action is potentially destructive or 'on-hold'. These colors are commonly used in confirmations to grab the users' attention.",
    swatches: [
      { shade: "25", hex: "#FFFCF5" },
      { shade: "50", hex: "#FFFAEB" },
      { shade: "100", hex: "#FEF0C7" },
      { shade: "200", hex: "#FEDF89" },
      { shade: "300", hex: "#FEC84B" },
      { shade: "400", hex: "#FDB022" },
      { shade: "500", hex: "#F79009" },
      { shade: "600", hex: "#DC6803" },
      { shade: "700", hex: "#B54708" },
      { shade: "800", hex: "#93370D" },
      { shade: "900", hex: "#7A2E0E" },
      { shade: "950", hex: "#4E1D09" },
    ],
  },
  {
    name: "Success",
    description: "Success colors communicate a positive action, positive trend, or a successful confirmation. If you're using green as your primary color, it can be helpful to introduce a different hue for your success green.",
    swatches: [
      { shade: "25", hex: "#F6FEF9" },
      { shade: "50", hex: "#ECFDF3" },
      { shade: "100", hex: "#D1FADF" },
      { shade: "200", hex: "#A6F4C5" },
      { shade: "300", hex: "#6CE9A6" },
      { shade: "400", hex: "#32D583" },
      { shade: "500", hex: "#12B76A" },
      { shade: "600", hex: "#039855" },
      { shade: "700", hex: "#027A48" },
      { shade: "800", hex: "#05603A" },
      { shade: "900", hex: "#054F31" },
      { shade: "950", hex: "#053321" },
    ],
  },
];

const secondaryColors: ColorRow[] = [
  {
    name: "Blue gray",
    description: "",
    swatches: [
      { shade: "25", hex: "#FCFCFD" },
      { shade: "50", hex: "#F8F9FC" },
      { shade: "100", hex: "#EAECF5" },
      { shade: "200", hex: "#D5D9EB" },
      { shade: "300", hex: "#B3B8DB" },
      { shade: "400", hex: "#717BBC" },
      { shade: "500", hex: "#4E5BA6" },
      { shade: "600", hex: "#3E4784" },
      { shade: "700", hex: "#363F72" },
      { shade: "800", hex: "#293056" },
      { shade: "900", hex: "#101323" },
      { shade: "950", hex: "#0D0F1C" },
    ],
  },
  {
    name: "Blue light",
    description: "",
    swatches: [
      { shade: "25", hex: "#F5FBFF" },
      { shade: "50", hex: "#F0F9FF" },
      { shade: "100", hex: "#E0F2FE" },
      { shade: "200", hex: "#B9E6FE" },
      { shade: "300", hex: "#7CD4FD" },
      { shade: "400", hex: "#36BFFA" },
      { shade: "500", hex: "#0BA5EC" },
      { shade: "600", hex: "#0086C9" },
      { shade: "700", hex: "#026AA2" },
      { shade: "800", hex: "#065986" },
      { shade: "900", hex: "#0B4A6F" },
      { shade: "950", hex: "#062C41" },
    ],
  },
  {
    name: "Blue",
    description: "",
    swatches: [
      { shade: "25", hex: "#F5FAFF" },
      { shade: "50", hex: "#EFF8FF" },
      { shade: "100", hex: "#D1E9FF" },
      { shade: "200", hex: "#B2DDFF" },
      { shade: "300", hex: "#84CAFF" },
      { shade: "400", hex: "#53B1FD" },
      { shade: "500", hex: "#2E90FA" },
      { shade: "600", hex: "#1570EF" },
      { shade: "700", hex: "#175CD3" },
      { shade: "800", hex: "#1849A9" },
      { shade: "900", hex: "#194185" },
      { shade: "950", hex: "#102A56" },
    ],
  },
  {
    name: "Indigo",
    description: "",
    swatches: [
      { shade: "25", hex: "#F5F8FF" },
      { shade: "50", hex: "#EEF4FF" },
      { shade: "100", hex: "#E0EAFF" },
      { shade: "200", hex: "#C7D7FE" },
      { shade: "300", hex: "#A4BCFD" },
      { shade: "400", hex: "#8098F9" },
      { shade: "500", hex: "#6172F3" },
      { shade: "600", hex: "#444CE7" },
      { shade: "700", hex: "#3538CD" },
      { shade: "800", hex: "#2D31A6" },
      { shade: "900", hex: "#2D3282" },
      { shade: "950", hex: "#1F235B" },
    ],
  },
  {
    name: "Purple",
    description: "",
    swatches: [
      { shade: "25", hex: "#FAFAFF" },
      { shade: "50", hex: "#F4F3FF" },
      { shade: "100", hex: "#EBE9FE" },
      { shade: "200", hex: "#D9D6FE" },
      { shade: "300", hex: "#BDB4FE" },
      { shade: "400", hex: "#9B8AFB" },
      { shade: "500", hex: "#7A5AF8" },
      { shade: "600", hex: "#6938EF" },
      { shade: "700", hex: "#5925DC" },
      { shade: "800", hex: "#4A1FB8" },
      { shade: "900", hex: "#3E1C96" },
      { shade: "950", hex: "#27115F" },
    ],
  },
  {
    name: "Pink",
    description: "",
    swatches: [
      { shade: "25", hex: "#FEF6FB" },
      { shade: "50", hex: "#FDF2FA" },
      { shade: "100", hex: "#FCE7F6" },
      { shade: "200", hex: "#FCCEEE" },
      { shade: "300", hex: "#FAA7E0" },
      { shade: "400", hex: "#F670C7" },
      { shade: "500", hex: "#EE46BC" },
      { shade: "600", hex: "#DD2590" },
      { shade: "700", hex: "#C11574" },
      { shade: "800", hex: "#9E165F" },
      { shade: "900", hex: "#851651" },
      { shade: "950", hex: "#4E0D30" },
    ],
  },
  {
    name: "Rose",
    description: "",
    swatches: [
      { shade: "25", hex: "#FFF5F6" },
      { shade: "50", hex: "#FFF1F3" },
      { shade: "100", hex: "#FFE4E8" },
      { shade: "200", hex: "#FECDD6" },
      { shade: "300", hex: "#FEA3B4" },
      { shade: "400", hex: "#FD6F8E" },
      { shade: "500", hex: "#F63D68" },
      { shade: "600", hex: "#E31B54" },
      { shade: "700", hex: "#C01048" },
      { shade: "800", hex: "#A11043" },
      { shade: "900", hex: "#89123E" },
      { shade: "950", hex: "#510B24" },
    ],
  },
  {
    name: "Orange",
    description: "",
    swatches: [
      { shade: "25", hex: "#FFFAF5" },
      { shade: "50", hex: "#FFF6ED" },
      { shade: "100", hex: "#FFEAD5" },
      { shade: "200", hex: "#FDDCAB" },
      { shade: "300", hex: "#FEB273" },
      { shade: "400", hex: "#FD853A" },
      { shade: "500", hex: "#FB6514" },
      { shade: "600", hex: "#EC4A0A" },
      { shade: "700", hex: "#C4320A" },
      { shade: "800", hex: "#9C2A10" },
      { shade: "900", hex: "#7E2410" },
      { shade: "950", hex: "#511C10" },
    ],
  },
];

function ColorSwatchCard({ swatch, isDark }: { swatch: ColorSwatch; isDark: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(swatch.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col cursor-pointer group" onClick={handleCopy}>
      <div
        className="h-[40px] rounded-t-[6px] border border-[#E4E4E4] relative"
        style={{ backgroundColor: swatch.hex }}
      >
        {copied && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-t-[6px]">
            <span className="text-white text-[10px]">Copied!</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[2px] pt-[6px]">
        <span className={`text-[12px] ${isDark ? "text-[#181d27]" : "text-[#535862]"}`}>{swatch.shade}</span>
        <span className="text-[11px] text-[#717680] uppercase">{swatch.hex}</span>
      </div>
    </div>
  );
}

function ColorPaletteRow({ row }: { row: ColorRow }) {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-start gap-[24px]">
        <div className="w-[180px] shrink-0">
          <h3 className="text-[16px] text-[#181d27] font-semibold font-['Inter',sans-serif]">{row.name}</h3>
          {row.description && (
            <p className="text-[12px] text-[#535862] mt-[4px] leading-[18px] font-['Inter',sans-serif]">{row.description}</p>
          )}
        </div>
        <div className="grid grid-cols-12 gap-[8px] flex-1">
          {row.swatches.map((s, i) => (
            <ColorSwatchCard key={s.shade} swatch={s} isDark={i >= 6} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ColorSection() {
  return (
    <section className="flex flex-col gap-[48px] font-['Inter',sans-serif]">
      {/* Primary Colors */}
      <div className="flex flex-col gap-[24px]">
        <div>
          <h2 className="text-[24px] text-[#181d27] font-semibold">Primary colors</h2>
          <p className="text-[14px] text-[#535862] mt-[4px]">
            These are the main colors that make up the majority of the colors used in the design system.
          </p>
        </div>
        <div className="flex flex-col gap-[32px]">
          {primaryColors.map((row) => (
            <ColorPaletteRow key={row.name} row={row} />
          ))}
        </div>
      </div>

      {/* Secondary Colors */}
      <div className="flex flex-col gap-[24px]">
        <div>
          <h2 className="text-[24px] text-[#181d27] font-semibold">Secondary colors</h2>
          <p className="text-[14px] text-[#535862] mt-[4px]">
            Along with primary colors, it's helpful to have a selection of secondary colors to use in components such as pills,
            alerts and labels. These secondary colors should be used sparingly or as accents, while the primary color(s)
            should take precedence.
          </p>
        </div>
        <div className="flex flex-col gap-[32px]">
          {secondaryColors.map((row) => (
            <ColorPaletteRow key={row.name} row={row} />
          ))}
        </div>
      </div>
    </section>
  );
}
