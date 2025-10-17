import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Calendar, Clock, Coffee } from "lucide-react";

interface DelayStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const delays = [
  {
    id: "urgent",
    label: "Sous 48h",
    icon: Zap,
    description: "Traitement prioritaire",
  },
  {
    id: "week",
    label: "Cette semaine",
    icon: Calendar,
    description: "Traitement rapide",
  },
  {
    id: "month",
    label: "Ce mois-ci",
    icon: Clock,
    description: "Délai standard",
  },
  {
    id: "flexible",
    label: "Pas pressé",
    icon: Coffee,
    description: "Quand vous êtes prêt",
  },
];

const DelayStep = ({ value, onChange, onNext, onBack }: DelayStepProps) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Quand voulez-vous commencer la création de votre entreprise ?
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Que vous alliez vite ou non, vous repartez avec : des coûts réduits, un compte pro éthique et une preuve d'impact à montrer à vos clients.
        </p>
      </div>


      <div className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
        {delays.map((delay) => {
          const Icon = delay.icon;
          const isSelected = value === delay.id;

          return (
            <Card
              key={delay.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-medium ${
                isSelected
                  ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                  : "hover:border-primary/50"
              }`}
              onClick={() => onChange(delay.id)}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-full ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-lg">{delay.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {delay.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline" size="lg">
          Retour
        </Button>
        <Button onClick={onNext} disabled={!value} size="lg">
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default DelayStep;
