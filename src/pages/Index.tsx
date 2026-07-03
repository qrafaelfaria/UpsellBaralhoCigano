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

import HeroCopa from "@/assets/HeroCigano.png";
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
    <main className="bg-background text-foreground">
      {/* Top urgency bar */}
      <div className="w-full bg-gradient-urgency text-urgency-foreground text-center text-xs sm:text-sm font-bold py-2 px-3">
        <span className="inline-flex items-center gap-1.5">
          <Flame className="w-4 h-4" /> 50% OFF acaba em {m}:{s}
        </span>
      </div>

      <div className="mx-auto w-full max-w-[480px] px-4">
        {/* HERO */}
        <section className="pt-6 pb-10 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary border border-border px-3 py-1 text-xs font-semibold text-muted-foreground mb-4">
            ⭐⭐⭐⭐⭐ +4.300 avaliações
          </div>

          <h1 className={`${HeadlineFont} text-[44px] sm:text-5xl text-primary`}>
            <span className="text-foreground">36 Cartas do Baralho Cigano</span> em Mapas Mentais
            <br />
          </h1>

          <div className="mt-6 mb-4">
            <img 
              src={HeroCopa} 
              alt="Atividades Festa Junina" 
              className="w-full h-auto rounded-2xl"
              loading="eager"
            />
          </div>

         {/* INFO SECTION */}
        <section className="py-6">
          <div className="relative rounded-[2rem] bg-success/5 border border-border p-8 sm:p-10 text-center">
            {/* Decorative notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-2 bg-foreground/80 rounded-full"></div>

            <div className="space-y-6 text-lg sm:text-base text-black/70 leading-relaxed">
              <p className="font-medium text-lg sm:text-lg">
               Aprenda a ler e interpretar todas as 36 Cartas do Baralho Cigano de forma Simples, Visual e Organizada.
              </p>
            </div>
          </div>
        </section>

          <div className="mt-2">
            <HeroCTA>Garantir Acesso</HeroCTA>
            <p className="mt-3 text-center text-xs text-muted-foreground inline-flex w-full items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-success" /> Pagamento 100% seguro · Acesso imediato
            </p>
          </div>
        </section>

        {/* T-SHIRTS */}
        <section className="py-6 border-t border-border">
          <h2 className={`${HeadlineFont} text-3xl sm:text-4xl text-center text-foreground`}>
            Veja alguns dos mapas mentais que você vai receber
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

        {/* HIGHLIGHTS SECTION */}
        <section className="mb-8">
          <div className="space-y-4">
            {[
              { 
                icon: "💰", 
                title: "Material Pronto para imprimir em A4.", 
              },
              { 
                icon: "✂️", 
                title: "Cartas e seus significados explicados de forma simples.",
              },
              { 
                icon: "✏️", 
                title: "Material visual, bonito e fácil de entender.",
              },
              { 
                icon: "✅", 
                title: "Ideal para estudos.",
              },
            ].map((item, idx) => (
              <div 
                key={idx}
                className="flex gap-4 p-5 bg-white border border-border/60 border-l-4 border-l-primary rounded-2xl shadow-sm"
              >
                <div className="space-y-1">
                  <h3 className="font-bold text-foreground text-lg leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT'S INSIDE SECTION */}
        <section className="pt-6 border-t border-border">
          <div className="text-center mb-5 px-4">
            <h2 className={`${HeadlineFont} text-3xl sm:text-4xl text-foreground mb-1`}>
              Tudo que está dentro do Material
            </h2>
          </div>
          <div className="mt-4 mb-8 px-4">
            <img 
              src={HeroCopa} 
              alt="Preview do Material Festa Junina" 
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </section>  
        
          {/* FEATURES LIST SECTION */}
        <section className="mt-4">
          <div className="space-y-3">
            {[
              { emoji: "✅", text: "36 Mapas mentais prontos das cartas do baralho cigano." },
              { emoji: "✅", text: "Significado explicado de forma simples." },
              { emoji: "✅", text: "Palavras-chave, pontos positivos e desafios." },
              { emoji: "✅", text: "Significado geral e conselho." },
              { emoji: "✅", text: "Interpretação no amor." },
              { emoji: "✅", text: "Interpretação no financeiro." },
              { emoji: "✅", text: "Interpretação na espiritualidade." },
              { emoji: "✅", text: "Material em PDF para acessar, estudar e imprimir." },
              { emoji: "🎁", text: "Bônus exclusivos no Plano Completo." },
            ].map((item, idx) => (
              <div 
                key={idx}
                className={`flex items-center gap-4 p-4 border border-2 border-border/10 rounded-2xl relative ${item.emoji === "🎁" ? "border-beam" : "bg-white"}`}
              >
                <div className="text-2xl shrink-0 z-10">
                  {item.emoji}
                </div>
                <span className="text-[15px] font-semibold text-foreground leading-snug z-10">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
          
          {/* Additional Info */}
          <div className="mt-8 space-y-2 text-center">
            <p className="text-[15px] font-semibold text-foreground flex items-center justify-center gap-2">
              Você recebe tudo na hora, direto no seu e-mail. 📧
            </p>
            <p className="text-[15px] font-semibold text-foreground flex items-center justify-center gap-2">
              É só imprimir e usar.
            </p>
          </div>
        </section>

        {/* BONUSES */}
        <section className="py-6 mt-4">
          <div className="bg-accent -mx-4 px-6 py-10 mb-8 text-center text-white">
            <p className="text-lg sm:text-xl font-medium leading-tight mb-6">
              🎁 Além dos <strong> 36 Mapas Mentais das Cartas do Baralho Cigano</strong>, ao adquirir o <br />
              Plano Completo você vai levar <strong>3 SUPER BÔNUS!</strong>
            </p>
            
            <p className="text-gold text-lg sm:text-xl font-bold italic underline mb-4">
              (se comprar depois não ganha)
            </p>
            
            <h2 className={`${HeadlineFont} text-2xl sm:text-3xl text-gold leading-tight uppercase`}>
              BÔNUS DISPONÍVEIS SOMENTE NO <br />
              PLANO COMPLETO
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            {(() => {
              let bonusCount = 0;
              return bonuses.map((b) => {
                if (b.isBonus) bonusCount++;
                return (
                  <BonusCard
                    key={b.title}
                    imageSrc={b.imageSrc}
                    bonusNumber={b.isBonus ? String(bonusCount).padStart(2, "0") : undefined}
                    title={b.title}
                    description={b.desc}
                    oldPrice={b.old}
                    showBonusLabel={b.isBonus}
                    showFreeBadge={b.isBonus}
                  />
                );
              });
            })()}
          </div>
        </section>

{/* TESTIMONIALS CAROUSEL */}
        <section className="py-10 border-t border-border">
          <h2 className={`${HeadlineFont} text-3xl sm:text-4xl text-center text-foreground`}>
            Depoimentos de Quem Já Usou
          </h2>
          <p className="mt-2 text-sm text-muted-foreground text-center">Deslize para o lado pra ver mais</p>

          <div className="mt-5 -mx-4 px-4 flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {feedbackImages.map((f, index) => (
              <div
                key={index}
                className="snap-center shrink-0 w-[85%] aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-border shadow-card-dark"
              >
                <img src={f.src} alt={f.alt} loading="lazy" className="w-full h-full object-contain block" />
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="checkout" className="py-10 border-t border-border">
          <h2 className={`${HeadlineFont} text-4xl sm:text-6xl text-center text-foreground`}>
            Aproveite Enquanto o <span className="text-destructive underline decoration-2">Plano Completo</span> está em Promoção!
          </h2>
          <div className="mt-6 space-y-5">

            {/* Basic */}
            <div className="rounded-2xl bg-card border border-border p-6 opacity-90 text-center flex flex-col items-center">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Básico</div>
              <div className="mt-2 flex items-end justify-center gap-2">
                <span className="text-4xl font-extrabold text-foreground">R$10,00</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-left self-start">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-muted-foreground mt-0.5" /> 36 Mapas Mentais das Cartas do Baralho Cigano</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-muted-foreground mt-0.5" /> Material em PDF para acessar e estudar</li>
                <li className="flex items-start gap-2"><X className="w-4 h-4 text-destructive mt-0.5" /> Não inclui os bônus do Plano Completo</li>
              </ul>
              <button
                onClick={handleBasicClick}
                className="mt-5 block w-full text-center rounded-xl bg-success text-success-foreground border border-border px-5 py-3 font-bold text-sm active:scale-[0.98] transition"
              >
                Somente o básico
              </button>
              <div className="mt-8">
                <p className="text-destructive font-black text-medium leading-snug uppercase">
                  ATENÇÃO: Temos uma <br />
                  opção <span className="underline decoration-2 underline-offset-4">ainda mais VANTAJOSA</span> <br />
                  para você! Veja logo abaixo
                </p>
                <div className="mt-2 flex flex-col items-center -space-y-4">
                  <ChevronsDown className="w-10 h-10 text-destructive animate-bounce" />
                </div>
              </div>
            </div>

            {/* Premium */}
            <div className="relative rounded-3xl p-[2px] bg-gold shadow-gold overflow-hidden">
              <div className="bg-gold text-black py-1.5 flex items-center justify-center gap-2 font-black text-[11px] uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5" />
                <Trophy className="w-3.5 h-3.5" />
                MELHOR CUSTO-BENEFÍCIO
              </div>
              <div className="rounded-b-[22px] bg-card p-6 text-center flex flex-col items-center">
                <div className="text-xs font-bold uppercase tracking-wider text-foreground mt-2">Premium</div>
                
                <div className="mt-4 mb-2">
                  <img 
                    src={HeroCopa} 
                    alt="Preview Premium" 
                    className="w-full h-auto rounded-xl" 
                  />
                </div>

                <div className="mt-2 flex items-end justify-center gap-2">
                  <span className="text-base line-through text-muted-foreground">De R$129</span>
                </div>
                <div className="flex items-end justify-center gap-2">
                  <span className="text-6xl font-extrabold text-foreground mt-2">R$27,00</span>
                </div>

                <div className="mt-2">
                  <span className="text-xl text-foreground/80">ou 3x de R$ 9,81</span>
                  <p className="text-sm text-muted-foreground italic mt-0.5">Pagamento único, sem mensalidades.</p>
                </div>

                <ul className="mt-5 space-y-2.5 text-medium text-left self-start">
                  {[
                    { text: "36 Mapas Mentais das Cartas do Baralho Cigano", isBonus: false },
                    { text: "Material em PDF para acessar e estudar", isBonus: false },
                    { text: "Cartas e seus significados explicados de forma simples.", isBonus: false },
                    { text: "Guia de Combinações", isBonus: true, bonusNum: 1 },
                    { text: "Modelos de Tiragens", isBonus: true, bonusNum: 2 },
                    { text: "Guia das Polaridades das Cartas", isBonus: true, bonusNum: 3 },
                    { text: "Envio imediato por e-mail (PDF pronto para imprimir)", isBonus: false, },
                    { text: "Acesso vitalício ao material", isBonus: false, },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      {item.isBonus ? (
                        <span className="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-gold text-black shrink-0">
                          <Gift className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-success text-success-foreground shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                      <span className={item.isBonus ? "font-bold text-foreground" : "text-muted-foreground"}>
                        {item.isBonus ? `Bônus ${item.bonusNum} - ` : ""}{item.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 w-full">
                  <HeroCTA href={PREMIUM_CHECKOUT_URL} pulse={false}>
                    QUERO O PLANO PREMIUM
                  </HeroCTA>
                </div>

                <div className="mt-4 flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5 text-success" />
                    Compra 100% segura
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="py-12 px-6 rounded-3xl bg-success/5 border border-border text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            <img 
              src={GarantiaImage} 
              alt="Selo de Garantia 30 Dias" 
              className="w-32 h-32 object-contain animate-float"
            />
            <div>
              <h2 className={`${HeadlineFont} text-3xl sm:text-4xl text-foreground mb-4`}>
                Garantia de Satisfação Total
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  Confiamos tanto no nosso material que se por qualquer motivo voce nao ficar satisfeito <span className="text-foreground font-bold">basta nos enviar uma mensagem dentro de 30 dias e devolvemos</span> 100% do seu dinheiro, sem perguntas, sem burocracia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10">
          <h2 className={`${HeadlineFont} text-3xl sm:text-4xl text-center`}>
            Perguntas Frequentes
          </h2>

          <Accordion type="single" collapsible className="mt-5">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-bold text-base hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <footer className="py-8 text-center text-xs text-muted-foreground border-t border-border mt-10">
          <p>
            © {new Date().getFullYear()} Artes Festa Junina · Todos os direitos reservados
          </p>
        </footer>
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