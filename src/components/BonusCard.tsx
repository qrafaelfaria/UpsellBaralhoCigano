import React from 'react';

interface BonusCardProps {
  imageSrc: string;
  bonusNumber?: string;
  title: string;
  description: string;
  oldPrice: string;
  showBonusLabel?: boolean;
  showFreeBadge?: boolean;
}

const BonusCard: React.FC<BonusCardProps> = ({ 
  imageSrc, 
  bonusNumber, 
  title, 
  description, 
  oldPrice,
  showBonusLabel = true,
  showFreeBadge = true
}) => {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-card-dark overflow-hidden">
      <div className="relative w-full h-auto">
        <img src={imageSrc} alt={title} className="w-full h-auto block" />
      </div>
      <div className="p-5 text-center">
        {showBonusLabel && bonusNumber && (
          <div className="text-base font-bold text-foreground bg-gold px-2 py-0.5 rounded-full">Bônus #{bonusNumber}</div>
        )}
        <div className="mt-1 text-xl font-black text-black leading-snug">{title}</div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        {showFreeBadge && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-base line-through text-muted-foreground">{oldPrice}</span>
            <span className="text-xs font-bold text-success-foreground bg-success px-2 py-0.5 rounded-full">GRÁTIS</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BonusCard;
