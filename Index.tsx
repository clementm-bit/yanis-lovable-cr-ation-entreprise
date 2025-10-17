import { useState } from "react";
import Header from "@/components/Header";
import SituationStep from "@/components/steps/SituationStep";
import TypeCreationStep from "@/components/steps/TypeCreationStep";
import ContactStep from "@/components/steps/ContactStep";
import ActivityStep from "@/components/steps/ActivityStep";
import DelayStep from "@/components/steps/DelayStep";
import PricingStep from "@/components/steps/PricingStep";
import SubscriptionStep from "@/components/steps/SubscriptionStep";
import SCIQuestionsStep from "@/components/steps/SCIQuestionsStep";
import SummaryStep from "@/components/steps/SummaryStep";
import ThankYouStep from "@/components/steps/ThankYouStep";
import CalendlyModal from "@/components/CalendlyModal";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 9;

  const [formData, setFormData] = useState({
    situation: "",
    typeCreation: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    activity: "",
    delay: "",
  });

  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [selectedSubscriptionName, setSelectedSubscriptionName] = useState("");
  const [selectedSubscriptionPrice, setSelectedSubscriptionPrice] = useState("");
  const [showCalendly, setShowCalendly] = useState(false);
  const [needsSubscription, setNeedsSubscription] = useState(false);
  const [sciEligible, setSciEligible] = useState(false);
  const [showSCIQuestions, setShowSCIQuestions] = useState(false);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  
  const handleTypeCreationNext = () => {
    // If user selects SCI, proceed to contact step first
    handleNext();
  };

  const updateContactData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSelectPlan = (plan: string, price: string) => {
    setSelectedPlan(plan);
    setSelectedPrice(price);
    
    // Check if it's a 0€ offer (except for "indecis")
    if (price.includes("0€") && formData.typeCreation !== "indecis") {
      setNeedsSubscription(true);
      setCurrentStep(7); // Go to subscription step
    } else {
      setNeedsSubscription(false);
      setCurrentStep(8); // Go to summary step (or 9 if SCI questions were shown)
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectSubscription = (subscription: string, name: string, price: string, annualPrice: string) => {
    setSelectedSubscription(subscription);
    setSelectedSubscriptionName(name);
    setSelectedSubscriptionPrice(annualPrice);
    setCurrentStep(8); // Always go to step 8 (summary)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSCIQuestions = (isEligible: boolean) => {
    setSciEligible(isEligible);
    if (!isEligible) {
      // If not eligible, set custom pricing and go to summary
      setSelectedPlan("Tarification sur-mesure");
      setSelectedPrice("Sur devis");
      setCurrentStep(8); // Go directly to summary
    } else {
      // If eligible, go to pricing step
      setCurrentStep(6); // Go to pricing step
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePayment = () => {
    // Show Calendly for premium offers, custom pricing, "Je ne sais pas", or SCI 199€ offer
    if (selectedPlan.includes("premium") || selectedPlan.includes("Sans abonnement") || 
        selectedPrice === "Sur devis" || formData.typeCreation === "indecis" ||
        (formData.typeCreation === "sci" && sciEligible && selectedPrice === "199€*")) {
      setShowCalendly(true);
    }
    handleNext();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div>
          {currentStep === 1 && (
            <SituationStep
              value={formData.situation}
              onChange={(value) => updateFormData("situation", value)}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && !showSCIQuestions && (
            <TypeCreationStep
              value={formData.typeCreation}
              onChange={(value) => updateFormData("typeCreation", value)}
              onNext={handleTypeCreationNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <ContactStep
              data={{
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
              }}
              onChange={updateContactData}
              onNext={() => {
                if (formData.typeCreation === "sci") {
                  // For SCI, go to questions after contact
                  handleNext();
                } else {
                  // For others, continue normal flow
                  handleNext();
                }
              }}
              onBack={handleBack}
            />
          )}

          {currentStep === 4 && formData.typeCreation === "sci" && (
            <SCIQuestionsStep
              onComplete={handleSCIQuestions}
              onBack={handleBack}
            />
          )}

          {currentStep === 4 && formData.typeCreation !== "sci" && (
            <ActivityStep
              value={formData.activity}
              onChange={(value) => updateFormData("activity", value)}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 5 && formData.typeCreation !== "sci" && (
            <DelayStep
              value={formData.delay}
              onChange={(value) => updateFormData("delay", value)}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 6 && (
            <PricingStep
              typeCreation={formData.typeCreation}
              onNext={handleNext}
              onBack={handleBack}
              onSelectPlan={handleSelectPlan}
            />
          )}

          {currentStep === 7 && needsSubscription && (
            <SubscriptionStep
              onSelectSubscription={handleSelectSubscription}
              onBack={handleBack}
            />
          )}

          {currentStep === 8 && (
            <SummaryStep
              formData={formData}
              selectedPlan={selectedPlan}
              selectedPrice={selectedPrice}
              selectedSubscription={selectedSubscription}
              selectedSubscriptionName={selectedSubscriptionName}
              selectedSubscriptionPrice={selectedSubscriptionPrice}
              onNext={handlePayment}
              onBack={handleBack}
            />
          )}

          {currentStep === 9 && <ThankYouStep />}
        </div>
      </main>

      <CalendlyModal 
        isOpen={showCalendly} 
        onClose={() => setShowCalendly(false)} 
      />
    </div>
  );
};

export default Index;
