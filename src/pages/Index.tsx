import { useEffect, useMemo, useState, useRef } from "react";
import { Play, Check, X, ChevronDown, ChevronsDown, Flame, Clock, ShieldCheck, Zap, BookOpen, Trophy, Crown, Library, Dices, Palette, Type, CheckSquare, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import tshirt1 from "@/assets/01.png";
import tshirt2 from "@/assets/02.png";
import tshirt3 from "@/assets/03.png";
import tshirt4 from "@/assets/04.png";
import tshirt5 from "@/assets/05.png";
import tshirt6 from "@/assets/06.png";

import HeroCopa from "@/assets/UpsellHero.jpg";
import BonusCard from "@/components/BonusCard";
import PremiumOfferModal from "@/components/PremiumOfferModal";
import Feedback01 from "@/assets/Feedback01.png";
import Feedback02 from "@/assets/Feedback02.png";
import Feedback03 from "@/assets/Feedback03.png";
import GarantiaImage from "@/assets/Garantia.webp";
import Bonus01 from "@/assets/GuiaBonus.png";
import Bonus02 from "@/assets/PolarBonus.png";
import Bonus03 from "@/assets/TiragensBonus.png";

const CHECKOUT_URL = "#checkout";
const PREMIUM_CHECKOUT_URL = "https://pay.wiapy.com/ulk84ywIP_";
const BASIC_CHECKOUT_URL = "https://pay.wiapy.com/de77OJCli";
const DISCOUNTED_PREMIUM_CHECKOUT_URL = "https://pay.wiapy.com/jAzDNswYn5"; // URL com desconto para R$ 14,90 (Upsell)

const useCountdown = (minutes: number) => {
  const target = useMemo(() => Date.now() + minutes * 60 * 1000, [minutes]);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const m = Math.floor(diff / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { m: String(m).padStart(2, "0"), s: String(s).padStart(2, "0") };
};

const HeadlineFont = "font-['Arial Black'] tracking-wide font-black leading-[1.15]";

const HeroCTA = ({ children, href = CHECKOUT_URL, pulse = true }: { children: React.ReactNode; href?: string; pulse?: boolean }) => (
  <a
    href={href}
    className={`block w-full text-center rounded-2xl px-6 py-5 text-lg font-extrabold uppercase tracking-wide bg-gradient-urgency text-urgency-foreground shadow-urgency active:scale-[0.98] transition-transform ${pulse ? "animate-pulse-cta" : ""}`}
  >
    {children}
  </a>
);

const tshirts = [
  { src: tshirt1, alt: "Estampa Faith Over Fear" },
  { src: tshirt2, alt: "Estampa Cristo é Rei" },
  { src: tshirt3, alt: "Estampa Salmo 23" },
  { src: tshirt4, alt: "Estampa Filhos de Deus" },
  { src: tshirt5, alt: "Estampa Cristo é Rei" },
  { src: tshirt6, alt: "Estampa Cristo é Rei" },
];



const bonuses = [
  {
    title: "Guia de Combinações",
    desc: "Veja como as cartas se combinam entre si e o significado que cada junção assume na leitura.",
    old: "R$9,90",
    imageSrc: Bonus01,
    isBonus: true,
  },
  {
    title: "Modelos de Tiragens",
    desc: "Receba modelos prontos de tiragens com o passo a passo de como dispor e interpretar cada carta em cada posição.",
    old: "R$14,90",
    imageSrc: Bonus03,
    isBonus: true,
  },
  {
    title: "Guia das Polaridades das Cartas",
    desc: "Descubra quais cartas são positivas, negativas e neutras — e como isso muda completamente a leitura das combinações.",
    old: "R$24,90",
    imageSrc: Bonus02,
    isBonus: true,
  },
];

const faqs = [
  { q: "Como recebo o acesso?", a: "O acesso é imediato! Assim que o pagamento for confirmado, você receberá um e-mail com o link para baixar todas as atividades e bônus." },
  { q: "Preciso de programas especiais para abrir?", a: "Não. Todos os arquivos estão em formato PDF de alta qualidade, prontos para abrir em qualquer celular ou computador e imprimir em folha A4 comum." },
  { q: "O pagamento é seguro?", a: "Sim, utilizamos uma das maiores plataformas de pagamentos do Brasil. Seus dados estão 100% protegidos e a entrega é garantida." },
  { q: "E se eu não gostar do material?", a: "Não se preocupe. Você tem uma garantia de 30 dias. Se por qualquer motivo não ficar satisfeito, devolvemos todo o seu dinheiro." },
];

const feedbackImages = [
  { src: Feedback01, alt: "Feedback de cliente 1" },
  { src: Feedback02, alt: "Feedback de cliente 2" },
  { src: Feedback03, alt: "Feedback de cliente 3" },
];

const Index = () => {
  const { m, s } = useCountdown(14);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleBasicClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPremiumModalOpen(true);
  };

  const handleConfirmPremium = () => {
    window.location.href = DISCOUNTED_PREMIUM_CHECKOUT_URL;
  };

  const handleDeclinePremium = () => {
    window.location.href = BASIC_CHECKOUT_URL;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tshirts.length);
    }, 2000); // Muda a imagem a cada 1 segundos
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = currentSlide * (carouselRef.current.children[0].clientWidth + 16); // 16px de gap
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentSlide]);



  return (
    <main className="bg-[#f3eae2] text-foreground">
      {/* Top urgency bar */}
      <div className="w-full bg-gradient-urgency text-urgency-foreground text-center text-sm sm:text-sm font-bold py-2 px-3">
        <span className="inline-flex items-center gap-1.5">
        ⚠️ Oferta única de pós-compra: adicione o material complementar antes de sair desta página
        </span>
      </div>

      <div className="mx-auto w-full max-w-[480px] px-4">
        {/* HERO */}
        <section className="pt-6 pb-10 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary border border-border px-3 py-1 text-xs font-semibold text-muted-foreground mb-4">
            Oportunidade única de agradecimento
          </div>

          <h1 className={`${HeadlineFont} text-[44px] sm:text-5xl text-primary`}>
            <span className="text-foreground">Muito obrigado por garantir os</span> Mapas Mentais
            <br />
          </h1>

        <section className="py-2">
          <div className="relative text-center">
            <div className="space-y-6 text-lg sm:text-base text-black/70 leading-relaxed">
              <p className="font-medium text-lg sm:text-lg">
               Em forma de agradecimento, liberamos uma oportunidade única para adicionar o Guia da Grande Tiragem (Grand Tableau) ao seu pedido por apenas R$17,90.
              </p>
            </div>
          </div>
        </section>

          <div className="mt-2 mb-2">
            <img 
              src={HeroCopa} 
              alt="Atividades Festa Junina" 
              className="w-full h-auto rounded-2xl"
              loading="eager"
            />
          </div>


          <section className="">
          <div className="relative text-center">
            <div className="space-y-6 text-lg sm:text-base text-black/70 leading-relaxed">
              <p className="font-bold text-lg sm:text-lg">
               Grand Tableau é uma das formas mais completas e informativas de leitura do baralho cigano. Este método utiliza todas as 36 cartas do baralho e as dispõe em uma formação específica sobre a mesa.
              </p>
            </div>
          </div>
        </section>

        </section>

        {/* T-SHIRTS */}
        <section className="py-2 border-t border-border mb-4">
          <h2 className={`${HeadlineFont} text-3xl sm:text-4xl text-center text-foreground`}>
            Veja alguns páginas do guia
          </h2>
          <p className="mt-2 text-sm text-muted-foreground text-center">Deslize para o lado pra ver mais</p>

          <div ref={carouselRef} className="mt-4 -mx-4 px-4 flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {tshirts.map((t, index) => (
              <div
                key={`${t.alt}-${index}`}
                className="snap-center shrink-0 w-[100%] aspect-[16/9] rounded-2xl overflow-hidden"
              >
                <img src={t.src} alt={t.alt} loading="lazy" className="w-full h-full object-contain block" />
              </div>
            ))}
          </div>
        </section>
      </div>

      <PremiumOfferModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        onConfirm={handleConfirmPremium}
        onDecline={handleDeclinePremium}
        premiumUrl={DISCOUNTED_PREMIUM_CHECKOUT_URL}
      />
    </main>
  );
};

export default Index;