import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface ContactStepProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const ContactStep = ({ data, onChange, onNext, onBack }: ContactStepProps) => {
  const isValid = data.firstName && data.lastName && data.email && data.phone;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Vos coordonnées
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="p-6">
          <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                value={data.firstName}
                onChange={(e) => onChange("firstName", e.target.value)}
                placeholder="Jean"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                value={data.lastName}
                onChange={(e) => onChange("lastName", e.target.value)}
                placeholder="Dupont"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="jean.dupont@exemple.fr"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone *</Label>
            <Input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="06 12 34 56 78"
              required
            />
          </div>

            <p className="text-xs text-muted-foreground">
              * Champs obligatoires
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="font-semibold text-lg mb-4">Pourquoi c'est mieux pour vous</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Moins de dépenses dès le 1er mois (reco d'achats sobres).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Plus de contrats : badge + attestation d'impact à joindre à vos devis/AO.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Zéro prise de tête : facturation prête 2026–2027, mentions légales auto, exports compta.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Crédibilité immédiate : dépôts sans fossiles, gage de sérieux RSE.</span>
            </li>
          </ul>
        </Card>
      </div>

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline" size="lg">
          Retour
        </Button>
        <Button onClick={onNext} disabled={!isValid} size="lg">
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default ContactStep;
