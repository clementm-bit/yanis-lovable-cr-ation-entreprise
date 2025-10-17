import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface SubscriptionStepProps {
  onSelectSubscription: (subscription: string, name: string, price: string, annualPrice: string) => void;
  onBack: () => void;
}

const subscriptions = [
  {
    id: "solo",
    name: "Solo",
    monthlyPrice: "9,90€",
    annualPrice: "89€",
    features: [
      "1 Compte pro d'éthique 100% en ligne",
      "1 Accès au compte pro",
      "1 Eco-carte Mastercard",
      "30 Virements & prélèvements",
      "Service client ultra-réactif",
      "Calculateur de CO2",
      "Ajout de justificatif de dépenses",
      "Exports des écritures comptables",
    ],
  },
  {
    id: "solo_plus",
    name: "Solo Plus",
    monthlyPrice: "19,90€",
    annualPrice: "179€",
    popular: true,
    features: [
      "1 Compte pro d'éthique 100% en ligne",
      "1 Carte en bois Mastercard",
      "60 Virements & prélèvements",
      "Service client ultra-réactif",
      "Calculateur de CO2",
      "Ajout de justificatif de dépenses",
      "Exports des écritures comptables",
    ],
  },
  {
    id: "business",
    name: "Business",
    monthlyPrice: "31,90€",
    annualPrice: "287€",
    features: [
      "3 Accès au compte pro",
      "3 Eco-carte Mastercard",
      "100 Virements & prélèvements",
      "Service client ultra-réactif",
      "Calculateur de CO2",
      "Ajout de justificatif de dépenses",
      "Exports des écritures comptables",
    ],
  },
  {
    id: "corporate",
    name: "Corporate",
    monthlyPrice: "90,90€",
    annualPrice: "818€",
    features: [
      "5 Accès au compte pro",
      "5 Eco-carte Mastercard",
      "500 Virements & prélèvements",
      "Service client ultra-réactif",
      "Calculateur de CO2",
      "Ajout de justificatif de dépenses",
      "Exports des écritures comptables",
    ],
  },
];

const SubscriptionStep = ({ onSelectSubscription, onBack }: SubscriptionStepProps) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Choisissez votre abonnement Qileo
        </h2>
        <p className="text-muted-foreground">
          Offre de lancement : 3 mois offerts
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {subscriptions.map((subscription) => (
          <Card
            key={subscription.id}
            className={`p-6 transition-all hover:shadow-strong relative ${
              subscription.popular ? "border-primary ring-2 ring-primary/20" : ""
            }`}
          >
            {subscription.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Recommandé
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">{subscription.name}</h3>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-3xl font-bold text-primary">{subscription.monthlyPrice}</span>
                <span className="text-sm text-muted-foreground">/mois HT</span>
              </div>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-lg font-semibold text-foreground">{subscription.annualPrice}</span>
                <span className="text-sm text-muted-foreground">par an</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {subscription.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full"
              size="lg"
              variant={subscription.popular ? "default" : "outline"}
              onClick={() => onSelectSubscription(subscription.id, subscription.name, subscription.monthlyPrice, subscription.annualPrice)}
            >
              +3 mois offerts →
            </Button>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline" size="lg">
          Retour
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionStep;
