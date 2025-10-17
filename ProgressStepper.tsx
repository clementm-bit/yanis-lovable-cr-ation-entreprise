import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressStepper = ({ currentStep, totalSteps }: ProgressStepperProps) => {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto px-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center relative flex-1">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 z-10",
                  step < currentStep
                    ? "bg-secondary text-secondary-foreground"
                    : step === currentStep
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step}</span>
                )}
              </div>
              <span className="text-xs mt-2 text-center text-muted-foreground absolute top-12 w-20">
                Étape {step}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div className="flex-1 h-0.5 mx-2 -mt-8">
                <div
                  className={cn(
                    "h-full transition-all duration-300",
                    step < currentStep ? "bg-secondary" : "bg-border"
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressStepper;
