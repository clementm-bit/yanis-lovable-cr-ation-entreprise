import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendlyModal = ({ isOpen, onClose }: CalendlyModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Prenez rendez-vous avec un expert</DialogTitle>
        </DialogHeader>
        <div className="w-full h-[600px]">
          <iframe
            src="https://calendly.com/yanis-h-qileo/30min"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Calendly"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendlyModal;
