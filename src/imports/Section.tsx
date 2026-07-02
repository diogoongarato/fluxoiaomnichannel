function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start leading-[normal] relative shrink-0 w-full whitespace-nowrap" data-name="Text">
      <p className="relative shrink-0 text-[48px]">Inter</p>
      <p className="relative shrink-0 text-[112px]">Ag</p>
    </div>
  );
}

function Typeface() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[64px] items-start not-italic relative shrink-0 text-[#181d27] w-full" data-name="Typeface">
      <Text />
      <p className="leading-[60px] relative shrink-0 text-[48px] tracking-[-0.96px] w-full">
        ABCDEFGHIJKLMNOPQRSTUVWXYZ
        <br aria-hidden="true" />
        abcdefghijklmnopqrstuvwxyz
        <br aria-hidden="true" />
        {`0123456789 !@#$%^&*()`}
      </p>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] w-full whitespace-nowrap" data-name="Text">
      <p className="relative shrink-0">Display 2xl</p>
      <p className="relative shrink-0">Font size: 72px / 4.5rem | Line height: 90px / 5.625rem | Tracking: -2%</p>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Header">
      <Text1 />
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2240 1">
            <line id="Divider" stroke="var(--stroke-0, #D5D7DA)" x2="2240" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[32px] items-start leading-[90px] not-italic relative shrink-0 text-[#181d27] text-[72px] tracking-[-1.44px] w-full" data-name="Row">
      <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal min-h-px min-w-px relative">
        <p className="mb-[72px]">Display 2xl</p>
        <p>Regular</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium min-h-px min-w-px relative">
        <p className="mb-[72px]">Display 2xl</p>
        <p>Medium</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold min-h-px min-w-px relative">
        <p className="mb-[72px]">Display 2xl</p>
        <p>Semibold</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold min-h-px min-w-px relative">
        <p className="mb-[72px]">Display 2xl</p>
        <p>Bold</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] w-full whitespace-nowrap" data-name="Text">
      <p className="relative shrink-0">Display xl</p>
      <p className="relative shrink-0">Font size: 60px / 3.75rem | Line height: 72px / 4.5rem | Tracking: -2%</p>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Header">
      <Text2 />
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2240 1">
            <line id="Divider" stroke="var(--stroke-0, #D5D7DA)" x2="2240" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-[32px] items-start leading-[72px] not-italic relative shrink-0 text-[#181d27] text-[60px] tracking-[-1.2px] w-full" data-name="Row">
      <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal min-h-px min-w-px relative">
        <p className="mb-[60px]">Display xl</p>
        <p>Regular</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium min-h-px min-w-px relative">
        <p className="mb-[60px]">Display xl</p>
        <p>Medium</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold min-h-px min-w-px relative">
        <p className="mb-[60px]">Display xl</p>
        <p>Semibold</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold min-h-px min-w-px relative">
        <p className="mb-[60px]">Display xl</p>
        <p>Bold</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] w-full whitespace-nowrap" data-name="Text">
      <p className="relative shrink-0">Display lg</p>
      <p className="relative shrink-0">Font size: 48px / 3rem | Line height: 60px / 3.75rem | Tracking: -2%</p>
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Header">
      <Text3 />
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2240 1">
            <line id="Divider" stroke="var(--stroke-0, #D5D7DA)" x2="2240" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex gap-[32px] items-start leading-[60px] not-italic relative shrink-0 text-[#181d27] text-[48px] tracking-[-0.96px] w-full" data-name="Row">
      <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal min-h-px min-w-px relative">
        <p className="mb-[48px]">Display lg</p>
        <p>Regular</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium min-h-px min-w-px relative">
        <p className="mb-[48px]">Display lg</p>
        <p>Medium</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold min-h-px min-w-px relative">
        <p className="mb-[48px]">Display lg</p>
        <p>Semibold</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold min-h-px min-w-px relative">
        <p className="mb-[48px]">Display lg</p>
        <p>Bold</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] w-full whitespace-nowrap" data-name="Text">
      <p className="relative shrink-0">Display md</p>
      <p className="relative shrink-0">Font size: 36px / 2.25rem | Line height: 44px / 2.75rem | Tracking: -2%</p>
    </div>
  );
}

function Header3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Header">
      <Text4 />
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2240 1">
            <line id="Divider" stroke="var(--stroke-0, #D5D7DA)" x2="2240" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex gap-[32px] items-start leading-[44px] not-italic relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full" data-name="Row">
      <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal min-h-px min-w-px relative">
        <p className="mb-[36px]">Display md</p>
        <p>Regular</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium min-h-px min-w-px relative">
        <p className="mb-[36px]">Display md</p>
        <p>Medium</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold min-h-px min-w-px relative">
        <p className="mb-[36px]">Display md</p>
        <p>Semibold</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold min-h-px min-w-px relative">
        <p className="mb-[36px]">Display md</p>
        <p>Bold</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] w-full whitespace-nowrap" data-name="Text">
      <p className="relative shrink-0">Display sm</p>
      <p className="relative shrink-0">Font size: 30px / 1.875rem | Line height: 38px / 2.375rem</p>
    </div>
  );
}

function Header4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Header">
      <Text5 />
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2240 1">
            <line id="Divider" stroke="var(--stroke-0, #D5D7DA)" x2="2240" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex gap-[32px] items-start leading-[38px] not-italic relative shrink-0 text-[#181d27] text-[30px] w-full" data-name="Row">
      <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal min-h-px min-w-px relative">
        <p className="mb-[30px]">Display sm</p>
        <p>Regular</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium min-h-px min-w-px relative">
        <p className="mb-[30px]">Display sm</p>
        <p>Medium</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold min-h-px min-w-px relative">
        <p className="mb-[30px]">Display sm</p>
        <p>Semibold</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold min-h-px min-w-px relative">
        <p className="mb-[30px]">Display sm</p>
        <p>Bold</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] w-full whitespace-nowrap" data-name="Text">
      <p className="relative shrink-0">Display xs</p>
      <p className="relative shrink-0">Font size: 24px / 1.5rem | Line height: 32px / 2rem</p>
    </div>
  );
}

function Header5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Header">
      <Text6 />
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2240 1">
            <line id="Divider" stroke="var(--stroke-0, #D5D7DA)" x2="2240" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row5() {
  return (
    <div className="content-stretch flex gap-[32px] items-start leading-[32px] not-italic relative shrink-0 text-[#181d27] text-[24px] w-full" data-name="Row">
      <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal min-h-px min-w-px relative">
        <p className="mb-[24px]">Display xs</p>
        <p>Regular</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium min-h-px min-w-px relative">
        <p className="mb-[24px]">Display xs</p>
        <p>Medium</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold min-h-px min-w-px relative">
        <p className="mb-[24px]">Display xs</p>
        <p>Semibold</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold min-h-px min-w-px relative">
        <p className="mb-[24px]">Display xs</p>
        <p>Bold</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] w-full whitespace-nowrap" data-name="Text">
      <p className="relative shrink-0">Text xl</p>
      <p className="relative shrink-0">Font size: 20px / 1.25rem | Line height: 30px / 1.875rem</p>
    </div>
  );
}

function Header6() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Header">
      <Text7 />
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2240 1">
            <line id="Divider" stroke="var(--stroke-0, #D5D7DA)" x2="2240" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row6() {
  return (
    <div className="content-stretch flex gap-[32px] items-start leading-[30px] not-italic relative shrink-0 text-[#181d27] text-[20px] w-full" data-name="Row">
      <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal min-h-px min-w-px relative">
        <p className="mb-[20px]">Text xl</p>
        <p>Regular</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium min-h-px min-w-px relative">
        <p className="mb-[20px]">Text xl</p>
        <p>Medium</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold min-h-px min-w-px relative">
        <p className="mb-[20px]">Text xl</p>
        <p>Semibold</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold min-h-px min-w-px relative">
        <p className="mb-[20px]">Text xl</p>
        <p>Bold</p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] w-full whitespace-nowrap" data-name="Text">
      <p className="relative shrink-0">Text lg</p>
      <p className="relative shrink-0">Font size: 18px / 1.125rem | Line height: 28px / 1.75rem</p>
    </div>
  );
}

function Header7() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Header">
      <Text8 />
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2240 1">
            <line id="Divider" stroke="var(--stroke-0, #D5D7DA)" x2="2240" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row7() {
  return (
    <div className="content-stretch flex gap-[32px] items-start leading-[28px] not-italic relative shrink-0 text-[#181d27] text-[18px] w-full" data-name="Row">
      <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal min-h-px min-w-px relative">
        <p className="mb-[18px]">Text lg</p>
        <p>Regular</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium min-h-px min-w-px relative">
        <p className="mb-[18px]">Text lg</p>
        <p>Medium</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold min-h-px min-w-px relative">
        <p className="mb-[18px]">Text lg</p>
        <p>Semibold</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold min-h-px min-w-px relative">
        <p className="mb-[18px]">Text lg</p>
        <p>Bold</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] w-full whitespace-nowrap" data-name="Text">
      <p className="relative shrink-0">Text md</p>
      <p className="relative shrink-0">Font size: 16px / 1rem | Line height: 24px / 1.5rem</p>
    </div>
  );
}

function Header8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Header">
      <Text9 />
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2240 1">
            <line id="Divider" stroke="var(--stroke-0, #D5D7DA)" x2="2240" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row8() {
  return (
    <div className="content-stretch flex gap-[32px] items-start leading-[24px] not-italic relative shrink-0 text-[#181d27] text-[16px] w-full" data-name="Row">
      <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal min-h-px min-w-px relative">
        <p className="mb-[16px]">Text md</p>
        <p>Regular</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium min-h-px min-w-px relative">
        <p className="mb-[16px]">Text md</p>
        <p>Medium</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold min-h-px min-w-px relative">
        <p className="mb-[16px]">Text md</p>
        <p>Semibold</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold min-h-px min-w-px relative">
        <p className="mb-[16px]">Text md</p>
        <p>Bold</p>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] w-full whitespace-nowrap" data-name="Text">
      <p className="relative shrink-0">Text small</p>
      <p className="relative shrink-0">Font size: 14px / 0.875rem | Line height: 20px / 1.25rem</p>
    </div>
  );
}

function Header9() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Header">
      <Text10 />
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2240 1">
            <line id="Divider" stroke="var(--stroke-0, #D5D7DA)" x2="2240" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row9() {
  return (
    <div className="content-stretch flex gap-[32px] items-start leading-[20px] not-italic relative shrink-0 text-[#181d27] text-[14px] w-full" data-name="Row">
      <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal min-h-px min-w-px relative">
        <p className="mb-[14px]">Text sm</p>
        <p>Regular</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium min-h-px min-w-px relative">
        <p className="mb-[14px]">Text sm</p>
        <p>Medium</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold min-h-px min-w-px relative">
        <p className="mb-[14px]">Text sm</p>
        <p>Semibold</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold min-h-px min-w-px relative">
        <p className="mb-[14px]">Text sm</p>
        <p>Bold</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] w-full whitespace-nowrap" data-name="Text">
      <p className="relative shrink-0">Text xs</p>
      <p className="relative shrink-0">Font size: 12px / 0.75rem | Line height: 18px / 1.125rem</p>
    </div>
  );
}

function Header10() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Header">
      <Text11 />
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2240 1">
            <line id="Divider" stroke="var(--stroke-0, #D5D7DA)" x2="2240" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row10() {
  return (
    <div className="content-stretch flex gap-[32px] items-start leading-[18px] not-italic relative shrink-0 text-[#181d27] text-[12px] w-full" data-name="Row">
      <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal min-h-px min-w-px relative">
        <p className="mb-[12px]">Text xs</p>
        <p>Regular</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium min-h-px min-w-px relative">
        <p className="mb-[12px]">Text xs</p>
        <p>Medium</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold min-h-px min-w-px relative">
        <p className="mb-[12px]">Text xs</p>
        <p>Semibold</p>
      </div>
      <div className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold min-h-px min-w-px relative">
        <p className="mb-[12px]">Text xs</p>
        <p>Bold</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] h-[3212px] items-start relative shrink-0 w-full" data-name="Content">
      <Typeface />
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="_Type scale base">
        <Header />
        <Row />
      </div>
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="_Type scale base">
        <Header1 />
        <Row1 />
      </div>
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="_Type scale base">
        <Header2 />
        <Row2 />
      </div>
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="_Type scale base">
        <Header3 />
        <Row3 />
      </div>
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="_Type scale base">
        <Header4 />
        <Row4 />
      </div>
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="_Type scale base">
        <Header5 />
        <Row5 />
      </div>
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="_Type scale base">
        <Header6 />
        <Row6 />
      </div>
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="_Type scale base">
        <Header7 />
        <Row7 />
      </div>
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="_Type scale base">
        <Header8 />
        <Row8 />
      </div>
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="_Type scale base">
        <Header9 />
        <Row9 />
      </div>
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="_Type scale base">
        <Header10 />
        <Row10 />
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <div className="content-stretch flex flex-col items-start p-[80px] relative size-full" data-name="Section">
      <Content />
    </div>
  );
}