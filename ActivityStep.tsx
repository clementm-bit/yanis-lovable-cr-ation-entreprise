import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Wrench, Stethoscope, Sparkles, Users } from "lucide-react";

interface ActivityStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const activities = [
  {
    id: "services",
    label: "Services",
    icon: Users,
    description: "Conseil, formation, services aux entreprises...",
  },
  {
    id: "commerce",
    label: "Commerce",
    icon: ShoppingBag,
    description: "Achat-revente, e-commerce...",
  },
  {
    id: "artisanat",
    label: "Artisanat",
    icon: Wrench,
    description: "Bâtiment, réparation, fabrication...",
  },
  {
    id: "liberal",
    label: "Profession libérale",
    icon: Stethoscope,
    description: "Santé, juridique, expertise...",
  },
  {
    id: "autres",
    label: "Autres",
    icon: Sparkles,
    description: "Activité mixte ou spécifique",
  },
];

const ActivityStep = ({ value, onChange, onNext, onBack }: ActivityStepProps) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Quel est votre domaine d'activité ?
        </h2>
        <p className="text-muted-foreground">
          Cela nous aide à mieux vous accompagner
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
        {activities.map((activity) => {
          const Icon = activity.icon;
          const isSelected = value === activity.id;

          return (
            <Card
              key={activity.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-medium ${
                isSelected
                  ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                  : "hover:border-primary/50"
              }`}
              onClick={() => onChange(activity.id)}
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
                  <h3 className="font-semibold">{activity.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
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

export default ActivityStep;
