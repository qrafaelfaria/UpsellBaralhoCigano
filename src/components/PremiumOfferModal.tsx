import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Gift, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onDecline: () => void;
  premiumUrl: string;
}

const PremiumOfferModal: React.FC<PremiumOfferModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onDecline,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95%] sm:max-w-[420px] rounded-[32px] p-0 border-none bg-background overflow-hidden gap-0">
        {/* Urgency Header */}
        <div className="bg-secondary/40 py-2.5 px-4 flex items-center justify-center gap-2">
          <span className="text-primary font-black text-[11px] sm:text-[13px] uppercase tracking-wider flex items-center gap-1.5">
            ⚠️ ESPERA! NÃO VÁ EMBORA AINDA
          </span>
        </div>

        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          <h2 className="text-[28px] sm:text-[32px] font-black text-foreground leading-tight mb-1">
            PACOTE PREMIUM
          </h2>
          <p className="text-accent font-bold text-lg sm:text-xl mb-6">
            com um desconto especial!
          </p>

          {/* Bonus Box */}
          <div className="w-full bg-secondary border-2 border-border rounded-2xl p-4 sm:p-5 mb-8">
            <div className="flex items-center gap-2 justify-center mb-4">
              <span className="text-xl">🎁</span>
              <span className="text-primary font-black text-sm sm:text-base uppercase tracking-tight">
                + 3 BÔNUS EXCLUSIVOS
              </span>
            </div>
            
            <ul className="space-y-2.5 text-left">
              {[
                "Bônus 1 - Guia de Combinações",
                "Bônus 2 - Modelos de Tiragens",
                "Bônus 3 - Guia das Polaridades das Cartas",
              ].map((bonus, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <div className="flex-shrink-0 w-5 h-5 rounded-md bg-success flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-success-foreground stroke-[4]" />
                  </div>
                  <span className="text-foreground font-bold text-[13px] sm:text-[15px]">
                    {bonus}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-accent text-sm sm:text-base font-bold">de</span>
              <span className="text-accent text-sm sm:text-base font-bold line-through">R$ 27,00</span>
              <span className="text-accent text-sm sm:text-base font-bold">por apenas</span>
            </div>
            
            <div className="text-[52px] sm:text-[64px] font-black text-success leading-none mb-2">
              R$ 19,90
            </div>

            <div className="text-muted-foreground font-bold text-[11px] sm:text-[13px] uppercase tracking-widest">
              OU 3x de R$ 7,23 NO CARTÃO*
            </div>
          </div>

          <div className="w-full space-y-4">
            <Button
              onClick={onConfirm}
              className="w-full h-16 bg-success hover:bg-success/90 text-success-foreground rounded-2xl text-lg sm:text-xl font-black uppercase tracking-wide shadow-[0_4px_0_hsl(var(--success-foreground)/0.2)] active:translate-y-1 active:shadow-none transition-all"
            >
              QUERO MEU DESCONTO!
            </Button>
            
            <button
              onClick={onDecline}
              className="text-muted-foreground font-bold text-sm sm:text-base underline underline-offset-4 decoration-muted-foreground/30 hover:text-foreground transition-colors uppercase tracking-tight"
            >
              NÃO, QUERO SOMENTE O BÁSICO.
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumOfferModal;
