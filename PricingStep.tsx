import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingStepProps {
  typeCreation: string;
  onNext: () => void;
  onBack: () => void;
  onSelectPlan: (plan: string, price: string) => void;
}

const getPricing = (type: string) => {
  switch (type) {
    case "micro":
      return {
        title: "Micro-entreprise",
        prices: [
          { 
            label: "Offre standard*", 
            price: "0€*", 
            features: [
              "Déclaration d'activité",
              "Dossier juridique complet",
              "Immatriculation au Guichet Unique",
              "Garantie anti-rejet",
              "Obtention du Kbis et du Siret",
              "Traitement express 12h",
              "Obtention de l'ACRE (ex ACCRE)",
              "Assistance illimitée (chat)"
            ],
            popular: true
          },
          { 
            label: "Offre premium*", 
            price: "59€*", 
            features: [
              "Déclaration d'activité",
              "Dossier juridique complet",
              "Immatriculation au Guichet Unique",
              "Garantie anti-rejet",
              "À vos côtés jusqu'au KBIS et SIRET",
              "Traitement express 12h",
              "Obtention de l'ACRE (ex ACCRE)",
              "Assistance illimitée (chat)"
            ]
          },
        ],
      };
    case "societe":
      return {
        title: "Société (SARL, SAS, SASU...)",
        prices: [
          { 
            label: "Offre standard*", 
            price: "0€*", 
            features: [
              "Génération des statuts",
              "Dossier complet",
              "Publication de l'annonce légale",
              "Immatriculation sur le Guichet Unique",
              "Garantie anti-rejet du greffe",
              "Assistance illimitée (chat)"
            ],
            footnote: "Sous réserve d'abonnement annuel - Hors frais de greffe et d'annonce légale"
          },
          { 
            label: "Offre premium*", 
            price: "99€*", 
            features: [
              "Génération des statuts",
              "Dossier complet",
              "Publication de l'annonce légale",
              "Immatriculation sur le Guichet Unique",
              "Garantie anti-rejet du greffe",
              "RDV avec un expert",
              "À vos côtés jusqu'au KBIS & SIRET",
              "Traitement express 12h",
              "Assistance (téléphone, mail, chat)"
            ],
            popular: true,
            footnote: "Hors frais de greffe et d'annonce légale"
          },
        ],
      };
    case "sci":
      return {
        title: "SCI (Société Civile Immobilière)",
        prices: [
          { 
            label: "Offre SCI*", 
            price: "199€*", 
            features: [
              "Création de votre SCI",
              "Génération des statuts + dossier complet",
              "Publication de l'annonce légale",
              "Immatriculation sur le Guichet Unique",
              "Garantie anti-rejet du greffe",
              "Accompagnement expert jusqu'au Kbis"
            ],
            popular: true,
            footnote: "Hors frais de greffe et d'annonce légale"
          },
        ],
      };
    case "depot_capital":
      return {
        title: "Dépôt de capital uniquement",
        prices: [
          { label: "Dépôt simple", price: "99€", features: ["Attestation de dépôt", "Traitement rapide", "Support inclus"], popular: true },
        ],
      };
    case "indecis":
      return {
        title: "Consultation personnalisée",
        prices: [
          { 
            label: "Rendez-vous offert", 
            price: "0€", 
            features: [
              "Consultation de 15 minutes avec un expert-comptable",
              "Analyse de votre projet",
              "Recommandations personnalisées",
              "Choix du statut le plus adapté"
            ], 
            popular: true 
          },
        ],
      };
    default:
      return {
        title: "Nos offres",
        prices: [
          { label: "Nous contacter", price: "Sur devis", features: ["Accompagnement personnalisé", "Conseil sur mesure", "Réponse sous 24h"], popular: true },
        ],
      };
  }
};

const PricingStep = ({ typeCreation, onNext, onBack, onSelectPlan }: PricingStepProps) => {
  const pricing = getPricing(typeCreation);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Tarification - {pricing.title}
        </h2>
        <p className="text-muted-foreground">
          Choisissez la formule qui vous convient
        </p>
        {(typeCreation === "micro" || typeCreation === "societe") && (
          <p className="text-xs text-muted-foreground mt-4">
            *sous réserve d'un abonnement annuel chez Qileo – offre de lancement : 3 mois offerts
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {pricing.prices.map((option, index) => (
          <Card
            key={index}
            className={`p-8 transition-all hover:shadow-strong relative ${
              option.popular ? "border-primary ring-2 ring-primary/20" : ""
            }`}
          >
            {option.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-destructive text-destructive-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {option.badge}
                </span>
              </div>
            )}
            {option.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Recommandé
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-3">{option.label}</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-primary">{option.price}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {option.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              className="w-full" 
              size="lg"
              variant={option.popular ? "default" : "outline"}
              onClick={() => onSelectPlan(option.label, option.price)}
            >
              Choisir cette offre
            </Button>
            
            {option.footnote && (
              <p className="text-xs text-muted-foreground text-center mt-3">
                {option.footnote}
              </p>
            )}
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

export default PricingStep;
