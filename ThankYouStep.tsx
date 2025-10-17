import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Phone, Calendar } from "lucide-react";

const ThankYouStep = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-secondary/10 p-6">
            <CheckCircle2 className="w-20 h-20 text-secondary" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          Merci pour votre confiance !
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Votre demande a bien été enregistrée. Nos équipes vont l'examiner et vous contacteront très prochainement.
        </p>
      </div>

      <Card className="p-8 max-w-2xl mx-auto">
        <div className="space-y-6">
          <h3 className="font-semibold text-xl text-center text-primary mb-6">
            Prochaines étapes
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="rounded-full bg-primary/10 p-3">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Confirmation par email</h4>
                <p className="text-sm text-muted-foreground">
                  Vous allez recevoir un email de confirmation avec le récapitulatif de votre demande.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="rounded-full bg-primary/10 p-3">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Appel de notre expert</h4>
                <p className="text-sm text-muted-foreground">
                  Un conseiller vous contactera dans les 24h pour discuter de votre projet.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="rounded-full bg-primary/10 p-3">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Création de votre entreprise</h4>
                <p className="text-sm text-muted-foreground">
                  Nous gérons toutes les démarches administratives pour vous.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-6">
            <p className="text-center text-sm font-medium text-primary">
              Des questions ? Contactez-nous au 01 23 45 67 89
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-center pt-4">
        <Button 
          size="lg"
          onClick={() => window.location.href = "/"}
        >
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};

export default ThankYouStep;
