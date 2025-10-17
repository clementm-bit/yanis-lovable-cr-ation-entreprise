import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Info } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SCIQuestionsStepProps {
  onComplete: (isEligible: boolean) => void;
  onBack: () => void;
}

const questions = [
  {
    id: "ir",
    question: "La SCI à créer sera-t-elle soumise à l'Impôt sur le Revenu (IR) ?",
    title: "Soumission à l'Impôt sur le Revenu (IR)",
    tooltip: "La SCI doit être soumise à l'Impôt sur le Revenu (IR) pour être éligible ici. Ce régime fiscal signifie que les bénéfices sont répartis entre les associés et imposés selon leur situation personnelle."
  },
  {
    id: "physiques",
    question: "Toutes les personnes associées de la SCI sont-elles des personnes physiques et majeures ?",
    title: "Statut des associés",
    tooltip: "Tous les associés doivent être des personnes physiques et majeures. La présence d'associés moraux ou mineurs complique le dossier et nécessite un accompagnement spécifique."
  },
  {
    id: "bien_unique",
    question: "La SCI envisage-t-elle l'acquisition d'un seul bien immobilier ?",
    title: "Acquisition d'un seul bien immobilier",
    tooltip: "Cette offre concerne les SCI gérant un seul bien immobilier. Pour plusieurs biens ou projets complexes, un service sur-mesure est conseillé."
  },
];

const SCIQuestionsStep = ({ onComplete, onBack }: SCIQuestionsStepProps) => {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({
    ir: null,
    physiques: null,
    bien_unique: null,
  });

  const handleAnswer = (questionId: string, answer: boolean) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const allAnswered = Object.values(answers).every((answer) => answer !== null);
  const isEligible = Object.values(answers).every((answer) => answer === true);

  const handleContinue = () => {
    onComplete(isEligible);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Création de SCI
        </h2>
        <p className="text-muted-foreground">
          Répondez à ces questions pour déterminer votre éligibilité à l'offre à 199€
        </p>
      </div>

      <TooltipProvider>
        <div className="space-y-4 max-w-2xl mx-auto">
          {questions.map((q) => (
            <Card key={q.id} className="p-6">
              <div className="flex items-start gap-2 mb-4">
                <h3 className="font-medium flex-1">{q.question}</h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Info className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">{q.title}</p>
                      <p className="text-sm">{q.tooltip}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex gap-3">
                <Button
                  variant={answers[q.id] === true ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => handleAnswer(q.id, true)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Oui
                </Button>
                <Button
                  variant={answers[q.id] === false ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => handleAnswer(q.id, false)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Non
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </TooltipProvider>

      {allAnswered && !isEligible && (
        <Card className="p-6 max-w-2xl mx-auto bg-muted/50">
          <p className="text-center text-muted-foreground">
            Votre projet nécessite une tarification sur-mesure. 
            Un expert vous contactera pour une étude personnalisée.
          </p>
        </Card>
      )}

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline" size="lg">
          Retour
        </Button>
        <Button onClick={handleContinue} disabled={!allAnswered} size="lg">
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default SCIQuestionsStep;
