import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";

interface SummaryStepProps {
  formData: {
    situation: string;
    typeCreation: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    activity: string;
    delay: string;
  };
  selectedPlan: string;
  selectedPrice: string;
  selectedSubscription?: string;
  selectedSubscriptionName?: string;
  selectedSubscriptionPrice?: string;
  onNext: () => void;
  onBack: () => void;
}

const getPrice = (typeCreation: string) => {
  switch (typeCreation) {
    case "micro":
      return "59€";
    case "societe":
      return "99€";
    case "depot_capital":
      return "99€";
    default:
      return "Sur devis";
  }
};

const getFormula = (typeCreation: string) => {
  switch (typeCreation) {
    case "micro":
      return "Micro-entreprise";
    case "societe":
      return "Société";
    case "depot_capital":
      return "Dépôt de capital";
    default:
      return "Formule personnalisée";
  }
};

const getLabel = (key: string, value: string) => {
  const labels: Record<string, Record<string, string>> = {
    situation: {
      deja_siret: "Vous avez déjà un numéro de SIRET",
      depot_capital: "Vous voulez déposer votre capital",
      lancer_activite: "Vous souhaitez lancer votre activité",
    },
    typeCreation: {
      societe: "Société",
      micro: "Micro-entreprise",
      depot_capital: "Dépôt de capital",
      indecis: "Je ne sais pas",
    },
    activity: {
      services: "Services",
      commerce: "Commerce",
      artisanat: "Artisanat",
      liberal: "Profession libérale",
      autres: "Autres",
    },
    delay: {
      urgent: "Sous 48h",
      week: "Cette semaine",
      month: "Ce mois-ci",
      flexible: "Pas pressé",
    },
  };
  return labels[key]?.[value] || value;
};

const SummaryStep = ({ formData, selectedPlan, selectedPrice, selectedSubscription, selectedSubscriptionName, selectedSubscriptionPrice, onNext, onBack }: SummaryStepProps) => {
  const isMicro = formData.typeCreation === "micro";
  const isIndecis = formData.typeCreation === "indecis";
  const isCustomPricing = selectedPrice === "Sur devis";
  const basePrice = parseInt(selectedPrice.replace(/[^0-9]/g, '')) || 0;
  
  // Extract subscription annual price if available
  const subscriptionAmount = selectedSubscriptionPrice 
    ? parseFloat(selectedSubscriptionPrice.replace(/[^0-9]/g, '')) 
    : 0;
  
  // Legal fees and capital deposit
  const legalFees = (isMicro || isIndecis || isCustomPricing) ? 0 : 285;
  const capitalDeposit = (isMicro || isIndecis || isCustomPricing) ? 0 : 69;
  
  const totalAmount = basePrice + subscriptionAmount + legalFees + capitalDeposit;
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-16 h-16 text-secondary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Récapitulatif de votre demande
        </h2>
        <p className="text-muted-foreground">
          Vérifiez vos informations avant de valider
        </p>
      </div>

      <Card className="p-8 max-w-2xl mx-auto">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Votre projet</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Situation actuelle</span>
                <span className="font-medium">{getLabel("situation", formData.situation)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type de création</span>
                <span className="font-medium">{getLabel("typeCreation", formData.typeCreation)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Domaine d'activité</span>
                <span className="font-medium">{getLabel("activity", formData.activity)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Délais souhaités</span>
                <span className="font-medium">{getLabel("delay", formData.delay)}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Vos coordonnées</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nom complet</span>
                <span className="font-medium">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Téléphone</span>
                <span className="font-medium">{formData.phone}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Paiement</h3>
            <div className="space-y-3">
              {!isIndecis && !isCustomPricing ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Formule</span>
                    <span className="font-medium">{selectedPlan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prix de la formule</span>
                    <span className="font-medium">{selectedPrice}</span>
                  </div>
                  {selectedSubscriptionName && selectedSubscriptionPrice && (
                    <>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Abonnement Qileo {selectedSubscriptionName}</span>
                        <span className="font-medium">{selectedSubscriptionPrice} par an</span>
                      </div>
                    </>
                  )}
                  {!isMicro && !isIndecis && !isCustomPricing && (
                    <>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Frais de greffe et annonce légale</span>
                        <span className="font-medium">{legalFees.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dépôt de capital</span>
                        <span className="font-medium">{capitalDeposit}€</span>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 mt-2">
                        <p className="text-xs text-muted-foreground">
                          Ces frais sont des coûts administratifs inhérents à toute création d'entreprise.
                        </p>
                      </div>
                    </>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary">
                      {totalAmount.toFixed(2)}€
                    </span>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-center font-medium text-foreground mb-2">
                      🎁 Rendez-vous offert de 15 minutes
                    </p>
                    <p className="text-center text-sm text-muted-foreground">
                      Un expert-comptable vous accompagne pour définir la meilleure structure pour votre projet
                    </p>
                  </div>
                  <div className="text-center">
                    <a 
                      href="https://calendly.com/yanis-h-qileo/30min" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      📅 Prendre rendez-vous maintenant
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-center text-muted-foreground">
              En validant, vous acceptez d'être contacté par nos équipes pour finaliser votre dossier de création d'entreprise.
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline" size="lg">
          Modifier
        </Button>
        {!isIndecis && !isCustomPricing ? (
          <Button onClick={onNext} size="lg" className="min-w-[200px]">
            Payer {totalAmount.toFixed(2)}€
          </Button>
        ) : (
          <Button onClick={onNext} size="lg" className="min-w-[200px]">
            Valider
          </Button>
        )}
      </div>
    </div>
  );
};

export default SummaryStep;
