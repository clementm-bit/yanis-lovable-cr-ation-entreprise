import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, User, Home, HelpCircle } from "lucide-react";

interface TypeCreationStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const types = [
  {
    id: "societe",
    label: "Société",
    icon: Building,
    description: "Exports compta propres : zéro galère de conformité.",
    popular: true,
  },
  {
    id: "micro",
    label: "Micro-entreprise",
    icon: User,
    description: "Tableau de bord simple : voyez où vous dépensez trop et corrigez en 1 clic.",
    popular: true,
  },
  {
    id: "sci",
    label: "SCI",
    icon: Home,
    description: "Optimisation énergie/fournisseurs et preuves d'impact pour vos bailleurs/partenaires.",
  },
  {
    id: "indecis",
    label: "Je ne sais pas",
    icon: HelpCircle,
    description: "On vous oriente pour payer moins et rassurer vos clients plus vite.",
  },
];

const TypeCreationStep = ({ value, onChange, onNext, onBack }: TypeCreationStepProps) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
        <p className="text-center text-sm font-medium text-foreground">
          SARL, SAS, micro… Peu importe le statut : vous gagnez des coûts en moins et des contrats en plus.
        </p>
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Quel type de création souhaitez-vous ?
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {types.map((type) => {
          const Icon = type.icon;
          const isSelected = value === type.id;

          return (
            <Card
              key={type.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-medium relative ${
                isSelected
                  ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                  : "hover:border-primary/50"
              }`}
              onClick={() => onChange(type.id)}
            >
              {type.popular && (
                <div className="absolute -top-2 -right-2">
                  <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                    Populaire
                  </span>
                </div>
              )}
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-full ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-lg">{type.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
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

export default TypeCreationStep;
