import { Check } from "lucide-react";

export interface Step {
  id: number;
  label: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  maxVisited?: number;
  onStepClick?: (stepId: number) => void;
}

export function Stepper({ steps, currentStep, maxVisited, onStepClick }: StepperProps) {
  return (
    <nav className="flex items-center w-full">
      {steps.map((step, index) => {
        const highestCompleted = maxVisited ?? currentStep;
        const isCompleted = highestCompleted > step.id && currentStep !== step.id;
        const isCurrent = currentStep === step.id;
        const isLast = index === steps.length - 1;
        const isClickable = step.id <= highestCompleted && !isCurrent && onStepClick;

        return (
          <div key={step.id} className={`flex items-center ${isLast ? "shrink-0" : "flex-1"}`}>
            {/* Step indicator */}
            <button
              type="button"
              onClick={() => isClickable && onStepClick(step.id)}
              disabled={!isClickable}
              className={`flex items-center gap-[12px] shrink-0 ${
                isClickable ? "cursor-pointer group" : "cursor-default"
              }`}
            >
              <div
                className={`size-[36px] rounded-full flex items-center justify-center text-[14px] font-semibold transition-all ${
                  isCompleted
                    ? "bg-[#7F56D9] text-white group-hover:bg-[#6941C6]"
                    : isCurrent
                    ? "bg-[#F9F5FF] text-[#7F56D9] ring-2 ring-[#7F56D9]"
                    : "bg-[#F5F5F5] text-[#A4A7AE]"
                }`}
              >
                {isCompleted ? <Check size={16} strokeWidth={2.5} /> : step.id}
              </div>
              <div className="hidden sm:block text-left">
                <p
                  className={`text-[14px] font-medium leading-[20px] ${
                    isCurrent || isCompleted ? "text-[#181D27]" : "text-[#A4A7AE]"
                  } ${isClickable ? "group-hover:text-[#7F56D9]" : ""}`}
                >
                  {step.label}
                </p>
                <p className="text-[12px] text-[#717680] leading-[18px]">{step.description}</p>
              </div>
            </button>
            {/* Connector line */}
            {!isLast && (
              <div className="flex-1 mx-[16px]">
                <div
                  className={`h-[2px] rounded-full transition-colors ${
                    step.id < highestCompleted ? "bg-[#7F56D9]" : "bg-[#E4E4E4]"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}