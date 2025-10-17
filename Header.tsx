import captaincomptaLogo from "@/assets/captaincompta-logo.png";
import qileoLogo from "@/assets/qileo-logo.png";

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-6">
          <img src={qileoLogo} alt="Qileo" className="h-12" />
          <span className="text-2xl text-muted-foreground">×</span>
          <img src={captaincomptaLogo} alt="CaptainCompta" className="h-12" />
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          En toute simplicité, créer une entreprise qui agit.
        </p>
      </div>
    </header>
  );
};

export default Header;
