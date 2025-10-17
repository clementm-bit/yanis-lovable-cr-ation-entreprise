import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Briefcase, Users } from "lucide-react";

interface SituationStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const situations = [
  {
    id: "deja_siret",
    label: "Vous avez déjà un numéro de SIRET",
    icon: Building2,
    description: "Activez le suivi carbone par dépense et des reco d'économies sans changer vos habitudes.",
  },
  {
    id: "depot_capital",
    label: "Vous voulez déposer votre capital",
    icon: Briefcase,
    description: "Votre capital déposé n'alimente pas les fossiles : meilleure image auprès de vos clients/partenaires.",
  },
  {
    id: "lancer_activite",
    label: "Vous souhaitez lancer votre activité ?",
    icon: Users,
    description: "Créez votre entreprise simplement avec Qileo",
  },
];

const SituationStep = ({ value, onChange, onNext }: SituationStepProps) => {
  const handleSelect = (situationId: string) => {
    // Redirect to Qileo inscription for specific situations
    if (situationId === "deja_siret" || situationId === "depot_capital") {
      window.location.href = "https://www.qileo.com/inscription";
      return;
    }
    onChange(situationId);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-foreground">
          Quelle est votre situation actuelle ?
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Quel que soit votre point de départ, lancez une entreprise qui coûte moins, gagne en crédibilité et mesure son impact dès le jour 1.
        </p>
        <p className="text-sm text-muted-foreground">
          Sélectionnez l'option qui correspond le mieux à votre profil.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {situations.map((situation) => {
          const Icon = situation.icon;
          const isSelected = value === situation.id;

          return (
            <Card
              key={situation.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-medium ${
                isSelected
                  ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                  : "hover:border-primary/50"
              }`}
              onClick={() => handleSelect(situation.id)}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div
                  className={`p-3 rounded-full ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">{situation.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {situation.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={onNext} disabled={!value} size="lg">
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default SituationStep;
