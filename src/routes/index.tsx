import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Gift,
  Leaf,
  Lock,
  MessageCircle,
  Shield,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";




const heroImg = { url: "/img/hero-papinha.jpg" };
const flatlayImg = { url: "/img/flatlay-alimentos.jpg" };

const maePreparandoImg = { url: "/img/mae-preparando.jpg" };
const logoImg = { url: "/img/nutribaby-logo-full.png" };

const bookIntroducao = { url: "/img/book-introducao.png" };
const bookReceitas = { url: "/img/book-receitas.png" };
const bookPapinhas = { url: "/img/book-papinhas.png" };
const bookBLW = { url: "/img/book-blw.png" };
const bookCardapio = { url: "/img/book-cardapio.png" };
const bookLista = { url: "/img/book-lista.png" };
const bookSeletividade = { url: "/img/book-seletividade.png" };
const bookColecao = { url: "/img/colecao-guias.png" };
import nutribabyMockup from "@/assets/product-kit.jpeg.asset.json";
const whatsappProof4 = { url: "/img/prova-social-whatsapp-4.jpg" };
const whatsappProof5 = { url: "/img/prova-social-whatsapp-5.jpg" };
const whatsappProof6 = { url: "/img/prova-social-whatsapp-6.jpg" };
const whatsappProof7 = { url: "/img/prova-social-whatsapp-7.jpg" };
// Dynamic imports for browser-only performance tasks or heavy components if needed
// (Currently keeping it simple for maximum compatibility)

const refeicao1 = { url: "/img/refeicao-1.jpg" };
const refeicao2 = { url: "/img/refeicao-2.jpg" };
const refeicao3 = { url: "/img/refeicao-3.jpg" };
const refeicao4 = { url: "/img/refeicao-4.jpg" };
const refeicao5 = { url: "/img/refeicao-5.jpg" };
const refeicao6 = { url: "/img/refeicao-6.jpg" };

const whatsapp11 = { url: "/img/depoimento-a.jpeg" };
const whatsapp12 = { url: "/img/depoimento-b.jpeg" };
const whatsapp13 = { url: "/img/depoimento-c.jpeg" };
const whatsapp14 = { url: "/img/depoimento-d.jpeg" };
const whatsapp15 = { url: "/img/depoimento-e.jpeg" };
const whatsapp16 = { url: "/img/depoimento-f.jpeg" };

const whatsappProofs: string[] = [
  whatsapp11.url,
  whatsapp12.url,
  whatsapp13.url,
  whatsapp14.url,
  whatsapp15.url,
  whatsapp16.url,
   whatsappProof4.url,
   whatsappProof5.url,
   whatsappProof6.url,
   whatsappProof7.url,
 ];

// Links de checkout
const CHECKOUT_URL = "https://pay.cakto.com.br/antx4kt_976228"; // R$ 47,00 (Completo)
const CHECKOUT_URL_BASIC = "https://pay.cakto.com.br/395yy2x"; // R$ 29,90 (Básico)
const CHECKOUT_URL_UPSELL = "https://pay.cakto.com.br/vxfqnzy"; // R$ 37,00 (Upsell/Pop-up)





export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NutriBaby® — Praticidade para a mãe: receitas rápidas, lista de compras e cortes seguros" },
      {
        name: "description",
        content:
          "Receitas práticas, lista de compras montada por nutricionistas e guia visual de cortes seguros anti-engasgo. Menos preocupação, mais tempo com seu bebê.",
      },
      { property: "og:title", content: "NutriBaby® — O dia da mãe mais leve e prático" },
      {
        property: "og:description",
        content:
          "Receitas rápidas, lista de compras por nutricionistas e cortes seguros anti-engasgo — tudo pronto para aplicar hoje mesmo.",
      },
      { property: "og:image", content: heroImg.url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg.url },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [showUpsell, setShowUpsell] = useState(false);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <AnnouncementBar />
      <Nav />
      <VideoSection />
      <Hero />
      <Pillars />
      <SocialProof />
      <DailyMenu />
      <Problem />
      <Solution />
      <Comparison />
      <WeeklyMeals />
      <SocialProofCarousel />
      <Offer onSelectBasic={() => setShowUpsell(true)} />
      <Guarantee />
      <FAQ />
      <FooterCta />
      <Footer />
      
      <PurchasePopup />
      <ExitIntentPopup />
      <UpsellModal open={showUpsell} setOpen={setShowUpsell} />
      <StayGuard />
      <CaktoLinkSanitizer />
    </div>
  );
}


function VideoSection() {
  const [showVideo, setShowVideo] = useState(false);
  
  useEffect(() => {
    // Carrega o vídeo imediatamente após a montagem para aparecer "rápido"
    setShowVideo(true);
  }, []);

  return (
    <section className="py-10 sm:py-16">
      <div className="container-page">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="mb-6 font-serif text-4xl italic leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
              Pare de perder tempo pensando no que <span className="not-italic font-bold text-primary">cozinhar para seu bebê todos os dias.</span>
            </h2>
            <div className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              <p>Descubra o método que já ajudou milhares de mães a preparar semanas inteiras de alimentação saudável em poucas horas, congelando tudo da forma correta.</p>
            </div>
            <div className="mt-4 font-medium text-primary uppercase tracking-widest text-xs sm:text-sm">
              <p>Menos tempo no fogão. Mais tempo de qualidade com seu bebê.</p>
              <div className="mt-2 block text-sm sm:text-base font-bold text-foreground bg-primary/10 px-4 py-1 rounded-full w-fit mx-auto shadow-sm">
                Assista ao vídeo abaixo:
              </div>
            </div>
          </div>
          <div className="aspect-video overflow-hidden rounded-[2rem] border border-border shadow-2xl bg-black/5 relative">
            {!showVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            )}
            
            {showVideo && (
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/70tlclIadc8?modestbranding=1&rel=0&showinfo=0&autoplay=0"
                title="NutriBaby Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            )}
          </div>
          <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-primary/5 py-3 px-6 border border-primary/10 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-destructive"></span>
            </span>
            <div className="text-sm sm:text-base font-bold text-foreground tracking-tight">
              <span className="text-destructive">157 mães</span> assistindo a este vídeo agora
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





/* ─────────────────────  Retenção: trava saída/back + aviso de fechar aba  ───────────────────── */

function StayGuard() {
  useEffect(() => {
    // Trava apenas do botão "voltar": re-empilha estados e dispara popup de retenção
    const pushTrap = () => {
      for (let i = 0; i < 3; i++) {
        window.history.pushState({ nb: "trap" }, "", window.location.href);
      }
    };
    pushTrap();

    const onPopState = () => {
      window.dispatchEvent(new CustomEvent("nb:exit-intent"));
      pushTrap();
    };

    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return null;
}


/* Sanitiza links da Cakto: remove parâmetros UTM vazios que a Utmify injeta
   e podem fazer a página de checkout renderizar em branco. */
function CaktoLinkSanitizer() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.("a") as
        | HTMLAnchorElement
        | null;
      if (!target) return;
      const href = target.getAttribute("href") || "";
      if (!href.includes("cakto.com.br")) return;
      try {
        const url = new URL(target.href, window.location.origin);
        const toDelete: string[] = [];
        url.searchParams.forEach((value, key) => {
          if (!value || value.trim() === "") toDelete.push(key);
        });
        toDelete.forEach((k) => url.searchParams.delete(k));
        target.href = url.toString();
      } catch {
        /* noop */
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}


// Link de checkout do pop-up de saída (R$ 37,00)
const EXIT_CHECKOUT_URL = "https://pay.cakto.com.br/vxfqnzy";

function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [used, setUsed] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setUsed((prev) => {
        if (!prev) setOpen(true);
        return true;
      });
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("nb:exit-intent", trigger as EventListener);
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("nb:exit-intent", trigger as EventListener);
    };
  }, []);

  if (!open) return null;

  const currentCheckoutUrl = EXIT_CHECKOUT_URL;


  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl border border-border bg-card p-5 shadow-2xl sm:p-8"
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Fechar"
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          ✕
        </button>
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-destructive">
            <Flame className="h-3 w-3" /> ESPERA, MAMÃE!
          </span>
          <h3 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
            Uma oferta <span className="italic text-primary">só sua</span> antes de ir
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Sabemos que decisão de mãe é difícil. Liberamos um desconto exclusivo para você levar o Kit Completo agora.
          </p>

          <div className="mt-6 rounded-2xl border-2 border-dashed border-primary bg-primary/5 p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
              OFERTA EXCLUSIVA DESTA SESSÃO
            </p>
            <p className="mt-3 font-serif text-4xl font-black leading-none text-cta">
              R$ 37,00
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Pagamento único com desconto exclusivo antes de fechar esta página.
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-widest text-muted-foreground">
              à vista · acesso imediato
            </p>
          </div>

          <a
            href={currentCheckoutUrl}
            onClick={() => setOpen(false)}
            className="cta-hero mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold uppercase tracking-wide"
          >
              Quero garantir meu desconto exclusivo
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Válido apenas nesta sessão · desconto aplicado automaticamente no checkout
          </p>
        </div>
      </div>
    </div>
  );
}

function UpsellModal({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8 text-center"
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          ✕
        </button>
        
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="h-7 w-7" />
        </div>
        
        <h3 className="mt-5 font-serif text-3xl leading-tight text-foreground">
          Aproveite esta <br />
          <span className="italic text-primary">oferta especial</span>
        </h3>
        
        <p className="mt-4 text-sm text-muted-foreground px-2">
          Por apenas <span className="font-bold text-foreground">mais R$ 7,10</span>, você garante o <strong>Kit Completo</strong> com mais de 250 receitas e todos os bônus exclusivos.
        </p>
        
        <div className="mt-8 space-y-3">
          <a
            href={CHECKOUT_URL_UPSELL}
            className="flex w-full flex-col items-center justify-center rounded-2xl bg-cta px-6 py-4 text-cta-foreground shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-90">Opção Recomendada</span>
            <span className="text-base font-black uppercase tracking-wider">Upgrade para Completo — R$ 37,00</span>
          </a>
          
          <a
            href={CHECKOUT_URL_BASIC}
            className="flex w-full items-center justify-center rounded-2xl border border-border bg-muted/30 px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:bg-muted/50"
          >
            Não, prefiro o básico — R$ 29,90
          </a>
        </div>
        
        <div className="mt-6 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
          <span className="flex items-center gap-1.5"><Shield className="h-3 w-3" /> Seguro</span>
          <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> Criptografado</span>
        </div>
      </div>
    </div>
  );
}


/* ─────────────────────────────  Vagas + Popup de vendas  ───────────────────────────── */

const TOTAL_VAGAS = 50;
const START_LEFT = 12;

function useVagasLeft() {
  const secs = useOfferCountdown();
  if (secs <= 0) return 0;
  return Math.max(1, Math.ceil((START_LEFT * secs) / OFFER_DURATION_SECONDS));
}

function Vagas() {
  const left = useVagasLeft();
  const sold = TOTAL_VAGAS - left;
  const pct = Math.round((sold / TOTAL_VAGAS) * 100);
  return (
    <>
      <div className="mt-1 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-destructive transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs font-bold text-destructive tabular-nums">
          {left}/{TOTAL_VAGAS}
        </span>
      </div>
      <p className="mt-1 text-[10px] text-muted-foreground">
        {pct}% preenchidas durante esta oferta
      </p>
    </>
  );
}

function PurchasePopup() {
  const offerSecs = useOfferCountdown();
  const buyers = [
    { name: "Ana", city: "São Paulo/SP", plan: "Kit Completo" },
    { name: "Larissa", city: "Rio de Janeiro/RJ", plan: "Kit Completo" },
    { name: "Fernanda", city: "Belo Horizonte/MG", plan: "Kit Completo" },
    { name: "Camila", city: "Curitiba/PR", plan: "Kit Completo" },
    { name: "Patrícia", city: "Salvador/BA", plan: "Kit Completo" },
    { name: "Juliana", city: "Porto Alegre/RS", plan: "Kit Completo" },
    { name: "Marina", city: "Recife/PE", plan: "Kit Completo" },
    { name: "Isabela", city: "Fortaleza/CE", plan: "Kit Completo" },
    { name: "Renata", city: "Brasília/DF", plan: "Kit Completo" },
    { name: "Bruna", city: "Florianópolis/SC", plan: "Kit Completo" },
  ];
  const [current, setCurrent] = useState<null | { i: number; ago: number }>(null);

  useEffect(() => {
    let i = Math.floor(Math.random() * buyers.length);
    const show = () => {
      setCurrent({ i: i % buyers.length, ago: Math.floor(Math.random() * 5) + 1 });
      window.dispatchEvent(new CustomEvent("nb:vaga-vendida"));
      i += 1;
      window.setTimeout(() => setCurrent(null), 5500);
    };
    const first = window.setTimeout(show, 4000);
    const loop = window.setInterval(show, 14000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(loop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const b = current ? buyers[current.i] : null;

  if (offerSecs <= 0) return null;

  return (
    <div
      aria-live="polite"
      className={`fixed right-3 top-16 z-50 w-[min(260px,calc(100vw-1.5rem))] sm:right-4 sm:top-4 sm:w-72 transition-all duration-500 ${
        current ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
      }`}
    >
      {b && (
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card/95 p-2 pr-3 shadow-lg shadow-black/10 backdrop-blur">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/15 font-serif text-sm text-primary">
            {b.name[0]}
          </div>
          <div className="min-w-0 text-[11px] leading-tight">
            <p className="truncate font-semibold text-foreground">
              {b.name} de {b.city}
            </p>
            <p className="mt-0.5 text-muted-foreground">
              acabou de garantir o <span className="font-semibold text-primary">{b.plan}</span>
            </p>
            <p className="mt-0.5 text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
              há {current!.ago} min · compra verificada
            </p>
          </div>
          <div className="ml-auto h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#25D366]" />
        </div>
      )}
    </div>
  );
}

function WhatsAppFab() {
  const phone = "555496675642";
  const msg = encodeURIComponent("Oii, tenho interesse em saber mais sobre o NutriBaby!");
  return (
    <a
      href={`https://wa.me/${phone}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="group fixed bottom-20 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 ring-1 ring-white/20 transition-transform hover:scale-110 sm:bottom-24 sm:right-5"
    >
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-60 blur-md animate-pulse" aria-hidden />
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347zM12.05 2C6.505 2 2.02 6.485 2.02 12c0 1.937.51 3.822 1.474 5.478L2 22l4.643-1.462A9.986 9.986 0 0012.05 22c5.545 0 10.03-4.485 10.03-10S17.594 2 12.05 2zm0 18.32a8.31 8.31 0 01-4.235-1.16l-.303-.18-3.014.79.804-2.938-.198-.303A8.263 8.263 0 013.741 12c0-4.585 3.723-8.32 8.31-8.32 2.22 0 4.31.867 5.88 2.442A8.243 8.243 0 0120.36 12c0 4.585-3.725 8.32-8.31 8.32z"/>
      </svg>
    </a>
  );
}


/* ─────────────────────────────  Bar / Nav  ───────────────────────────── */

const OFFER_DURATION_SECONDS = 15 * 60;
const OFFER_DEADLINE_KEY = "nb_offer_deadline_v2";

function useOfferCountdown() {
  const getSecs = () => {
    if (typeof window === "undefined") return OFFER_DURATION_SECONDS;
    let deadline = Number(sessionStorage.getItem(OFFER_DEADLINE_KEY));
    if (!deadline || Number.isNaN(deadline)) {
      deadline = Date.now() + OFFER_DURATION_SECONDS * 1000;
      sessionStorage.setItem(OFFER_DEADLINE_KEY, String(deadline));
    }
    return Math.max(0, Math.floor((deadline - Date.now()) / 1000));
  };
  const [secs, setSecs] = useState<number | null>(null);
  useEffect(() => {
    setSecs(getSecs());
    const id = setInterval(() => setSecs(getSecs()), 1000);
    return () => clearInterval(id);
  }, []);
  return secs ?? OFFER_DURATION_SECONDS;
}

function AnnouncementBar() {
  const secs = useOfferCountdown();
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    <div className="bg-foreground text-background">
      <div className="container-page flex items-center justify-center gap-2 py-1.5 text-[10px] font-medium tracking-wide sm:gap-3 sm:py-2 sm:text-xs">
        <Sparkles className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
        {secs > 0 ? (
          <>
            <span className="truncate">
              <span className="sm:hidden">Oferta expira em</span>
              <span className="hidden sm:inline">Oferta de lançamento expira em</span>
            </span>
            <span className="rounded bg-background/15 px-1.5 py-0.5 font-semibold tabular-nums">
              {pad(m)}:{pad(s)}
            </span>
          </>
        ) : (
          <span className="font-semibold uppercase tracking-widest">Oferta encerrada</span>
        )}
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container-page relative flex h-14 items-center justify-between sm:h-20">
        <a href="#" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <img
            src={logoImg.url}
            alt="NutriBaby - Seu aliado na nutrição infantil"
            className="h-10 w-auto object-contain sm:h-16 md:h-20"
            fetchPriority="high"
          />
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#metodo" className="transition-colors hover:text-foreground">O método</a>
          <a href="#depoimentos" className="transition-colors hover:text-foreground">Mães reais</a>
          <a href="#comprar" className="transition-colors hover:text-foreground">Investimento</a>
          <a href="#faq" className="transition-colors hover:text-foreground">Dúvidas</a>
        </nav>
        <div />

      </div>
    </header>
  );
}

/* ─────────────────────────────  Hero (editorial layered)  ───────────────────────────── */

function Hero() {
  const offerSecs = useOfferCountdown();

  return (
    <section className="relative overflow-hidden">
      {/* Sage blur blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-primary/[0.07] blur-3xl" />
        <div className="absolute right-[-4rem] top-1/3 h-80 w-80 rounded-full bg-primary/10 blur-2xl" />
      </div>

      <div className="container-page grid grid-cols-12 gap-0 py-10 sm:py-16 lg:py-24">
        {/* Left content */}
        <div className="col-span-12 z-20 flex flex-col justify-center lg:col-span-7 lg:pr-12">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              <Flame className="h-3 w-3" /> {offerSecs > 0 ? "50% OFF nesta oferta" : "Oferta encerrada"}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <span className="flex text-primary">
                {[0,1,2,3,4].map((i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </span>
              +12.400 mães aprovaram
            </span>
          </div>

          <h1 className="mb-6 font-serif text-[2.65rem] italic leading-[0.92] tracking-tight text-foreground sm:mb-8 sm:text-7xl sm:leading-[0.85] lg:text-[7rem]">
            Seu bebê comendo melhor.
            <br />
            <span className="relative inline-block not-italic text-primary">
              Você vivendo essa fase com mais leveza.
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-primary/25"
                viewBox="0 0 400 20"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M0 10C50 10 150 2 200 2C250 2 350 10 400 10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
            </span>
          </h1>

          <div className="max-w-md">
            <p className="mb-6 text-base font-light leading-relaxed text-muted-foreground sm:text-xl">
              Receitas prontas em <strong className="font-semibold text-foreground">até 10 minutos</strong>,
              lista de compras por nutricionistas e guia visual anti-engasgo — tudo o que
              você precisa para nutrir seu bebê <strong className="font-semibold text-foreground">sem culpa e sem correria</strong>.
            </p>

            <ul className="mb-8 space-y-2 text-sm text-foreground sm:text-base">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>+250 receitas testadas por fase (6m, 8m, 10m, 12m+)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Guia visual de cortes seguros anti-engasgo</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Bônus: cardápio semanal + lista de compras pronta</span>
              </li>
            </ul>


            <div id="cta-oferta" className="hidden flex-col gap-3 sm:flex">
              <a
                href="#comprar"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("comprar")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="cta-hero group flex w-full flex-col items-center gap-0.5 rounded-full px-6 py-4 shadow-xl shadow-[color-mix(in_oklab,var(--primary)_35%,transparent)] sm:w-auto sm:px-10 text-center"
              >
                <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide sm:text-base">
                  Quero tudo isso agora <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-[11px] font-medium opacity-90">
                  acesso imediato · vitalício · sem mensalidade
                </span>
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-primary" /> 15 dias de garantia incondicional
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" /> Pagamento seguro
              </span>
            </div>
          </div>
        </div>

        {/* Right visual composition */}
        <div className="col-span-12 relative mt-12 sm:mt-20 lg:col-span-5 lg:mt-0">
          {/* Primary layered image */}
          <div className="relative z-10 aspect-square w-full overflow-hidden rounded-2xl">
            <img
              src={heroImg.url}
              alt="Papinha nutritiva de legumes servida em potinho de vidro"
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:hidden">
            <a
              href="#comprar"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("comprar")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="cta-hero group flex w-full flex-col items-center gap-0.5 rounded-full px-6 py-4 text-center shadow-xl shadow-[color-mix(in_oklab,var(--primary)_35%,transparent)]"
            >
              <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
                Quero tudo isso agora <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-[11px] font-medium opacity-90">
                acesso imediato · vitalício · sem mensalidade
              </span>
            </a>
          </div>




          {/* Decorative circle */}
          <div className="absolute -right-6 -top-6 -z-10 h-24 w-24 rounded-full border border-primary/30" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  Pillars (numbered editorial row)  ───────────────────────────── */

function Pillars() {
  const items = [
    { n: "01", t: "Receitas práticas", d: "Pronto em minutos, com 3 a 6 ingredientes que você já tem em casa." },
    { n: "02", t: "Lista de compras", d: "Montada por nutricionistas — vai ao mercado sem dúvida nenhuma." },
    { n: "03", t: "Cortes seguros", d: "Guia visual anti-engasgo por idade, para servir sem medo." },
    { n: "04", t: "Dia mais leve", d: "Cardápios prontos que devolvem tempo e calma para a sua rotina." },
  ];
  return (
    <section className="container-page pb-10 sm:pb-16">
      <div className="grid grid-cols-2 gap-10 border-t border-primary/15 pt-10 md:grid-cols-4 md:gap-12">
        {items.map((i) => (
          <div key={i.n} className="space-y-2">
            <span className="block font-serif text-2xl text-foreground">{i.n}</span>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
              {i.t}
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{i.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


/* ─────────────────────────────  Social proof strip  ───────────────────────────── */

function SocialProof() {
  const stats = [
    { n: "+12.400", l: "mães acompanhadas" },
    { n: "4.9/5", l: "avaliação média" },
    { n: "+250", l: "receitas testadas" },
    { n: "98%", l: "recomendariam" },
  ];
  return (
    <section className="border-y border-border/40 bg-transparent">
      <div className="container-page grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <p className="font-serif text-3xl text-foreground sm:text-4xl">{s.n}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {s.l}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────  Problem (magazine editorial)  ───────────────────────────── */

function DailyMenu() {
  const meals = [
    {
      icon: "🍱",
      time: "Preparo Único",
      title: "O dia de organizar",
      description: "Um dia da semana dedicado a montar as marmitinhas para economizar horas na cozinha.",
    },
    {
      icon: "❄️",
      time: "Congelamento",
      title: "Praticidade no freezer",
      description: "Técnicas seguras para congelar e descongelar, mantendo o sabor e os nutrientes.",
    },
    {
      icon: "⏱️",
      time: "Durante a semana",
      title: "Refeições em minutos",
      description: "Basta aquecer a marmitinha certa para o horário e oferecer ao seu bebê.",
    },
    {
      icon: "🥗",
      time: "Variedade Real",
      title: "Comida de verdade",
      description: "Garante que o bebê coma bem todos os dias, sem você precisar cozinhar do zero.",
    },
  ];

  return (
    <section className="container-page relative overflow-hidden py-12 sm:rounded-[2.5rem] sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-primary/25 bg-background/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary shadow-sm backdrop-blur">
          Praticidade Semanal
        </span>
        <h2 className="mt-6 font-serif text-[2.65rem] leading-[0.95] text-foreground sm:text-6xl lg:text-7xl">
          Sua semana resolvida em
          <br />
          <span className="italic text-primary">um único dia.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Aprenda a organizar um único dia de preparo para garantir as refeições da semana inteira. Foque em congelar as marmitinhas e ter sempre comida saudável pronta para o seu bebê.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-stretch">
        <div className="group relative min-h-[440px] overflow-hidden rounded-[2rem] border-2 border-primary/20 bg-card shadow-2xl sm:min-h-[560px]">
          <img
            src="/img/rotina-refeicoes.jpeg"
            alt="Refeições variadas preparadas e organizadas em recipientes de vidro"
            width={1450}
            height={1086}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/10 to-transparent" />
          <span className="absolute left-5 top-5 rounded-full bg-background/95 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground shadow-lg backdrop-blur">
            Planejamento prático
          </span>
          <div className="absolute inset-x-0 bottom-0 p-6 text-background sm:p-8">
            <p className="font-serif text-3xl leading-tight sm:text-4xl">Cozinhe uma vez, relaxe a semana toda.</p>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-background/75">
              O segredo está em preparar porções estratégicas e congelar as marmitinhas com segurança.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {meals.map((meal, index) => (
            <article
              key={meal.time}
              className="group relative overflow-hidden rounded-[1.75rem] border border-primary/15 bg-background/90 p-6 shadow-md backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-2xl">{meal.icon}</span>
                <span className="font-serif text-4xl text-primary/20">0{index + 1}</span>
              </div>
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{meal.time}</p>
              <h3 className="mt-2 font-serif text-2xl leading-tight">{meal.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{meal.description}</p>
            </article>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
        As sugestões devem ser adaptadas à idade, ao desenvolvimento e às orientações do pediatra ou nutricionista do bebê.
      </p>
    </section>
  );
}

function Problem() {
  const recipes = [
    {
      image: "/img/receita-creme-couve-flor.jpg",
      alt: "Creme de couve-flor servido em recipiente de vidro",
      phase: "6 meses+",
      title: "Creme suave de couve-flor",
      description: "Textura macia e sabor delicado para variar o pratinho.",
      detail: "Passo a passo simples",
    },
    {
      image: "/img/receita-caldo-verde.jpg",
      alt: "Caldo verde cremoso servido em recipiente de vidro",
      phase: "8 meses+",
      title: "Caldinho verde nutritivo",
      description: "Legumes e folhas em uma combinação prática para o dia a dia.",
      detail: "Ingredientes acessíveis",
    },
    {
      image: "/img/receita-caldinho-legumes.jpg",
      alt: "Caldinho de legumes servido em recipiente de vidro",
      phase: "9 meses+",
      title: "Caldinho da vovó",
      description: "Comida de verdade adaptada para a fase do seu bebê.",
      detail: "Preparo descomplicado",
    },
    {
      image: "/img/receita-creme-dourado.jpg",
      alt: "Creme dourado de legumes servido em recipiente de vidro",
      phase: "10 meses+",
      title: "Sopinha nutritiva",
      description: "Cores, aromas e temperos naturais na medida certa.",
      detail: "Mais variedade no cardápio",
    },
    {
      image: "/img/receita-abobora-carne.jpeg",
      alt: "Abóbora com carne desfiada servida em recipiente de vidro",
      phase: "9 meses+",
      title: "Abóbora com carne desfiada",
      description: "Uma combinação caseira, colorida e fácil de incluir na rotina.",
      detail: "Comida de verdade",
    },
    {
      image: "/img/receita-file-tilapia.jpeg",
      alt: "Filé de tilápia com arroz e legumes servido em recipiente de vidro",
      phase: "10 meses+",
      title: "Tilápia macia com legumes",
      description: "Uma opção completa para apresentar peixe com textura adequada.",
      detail: "Sabor e variedade",
    },
  ];

  return (
    <section className="bg-background py-14 sm:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-primary mb-6">
            <Zap className="h-3 w-3" /> Um cardápio que resolve a semana toda
          </span>
          <h2 className="font-serif text-4xl leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
            Sua cozinha <span className="italic text-primary">organizada</span> e seu bebê <span className="font-bold">bem nutrido.</span>
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Check className="h-4 w-4 text-primary" /> +250 receitas testadas
            </div>
            <div className="h-px w-8 bg-border sm:h-8 sm:w-px" />
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Check className="h-4 w-4 text-primary" /> Organizada por fase
            </div>
          </div>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            Para você sair do “o que eu preparo hoje?” e oferecer variedade com mais praticidade, usando ingredientes simples e orientações fáceis de acompanhar.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <article
              key={recipe.title}
              className="group overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={recipe.image}
                  alt={recipe.alt}
                  width={360}
                  height={270}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-foreground shadow-sm backdrop-blur">
                  {recipe.phase}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-2xl leading-[1.05] text-foreground">{recipe.title}</h3>
                <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">
                  {recipe.description}
                </p>
                <div className="mt-5 border-t border-dashed border-border pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                    {recipe.detail}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  Solution — bento / magazine grid  ───────────────────────────── */

function Solution() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const guidePages = [
    { image: "/img/guia-capa.jpeg", title: "Guia completo", detail: "Da primeira colherada ao prato da família" },
    { image: "/img/guia-receitas-sucos.webp", title: "Receitas por fase", detail: "Ingredientes e preparo explicados passo a passo" },
    { image: "/img/guia-cortes-seguros.webp", title: "Cortes e texturas", detail: "Orientações visuais para acompanhar cada etapa" },
    { image: "/img/guia-pures-papinhas.webp", title: "Purês e papinhas", detail: "Combinações práticas para variar o cardápio" },
    { image: "/img/guia-organizacao.webp", title: "Preparo e conservação", detail: "Organização para facilitar a rotina da semana" },
    { image: "/img/guia-cardapio-compras.webp", title: "Cardápio e lista de compras", detail: "Planejamento simples para não improvisar" },
    { image: "/img/guia-semana-equilibrada.webp", title: "Semana equilibrada", detail: "Proteínas, frutas e refeições organizadas" },
  ];

  const moveCarousel = (direction: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({ left: direction * carousel.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden py-14 sm:py-24">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-primary/20 bg-card/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary shadow-sm backdrop-blur">
              Conheça por dentro
            </span>
            <h2 className="mt-5 font-serif text-[2.65rem] leading-[0.98] sm:text-6xl lg:text-7xl">
              Um guia para acompanhar
              <br />
              <span className="italic text-primary">cada fase do seu bebê.</span>
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Receitas, cortes, texturas, cardápios e listas de compras reunidos em um material visual,
              para você consultar sempre que surgir uma dúvida na rotina.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground">
              <span className="rounded-full border border-border bg-card px-3 py-2">+250 receitas</span>
              <span className="rounded-full border border-border bg-card px-3 py-2">6 a 24 meses</span>
              <span className="rounded-full border border-border bg-card px-3 py-2">Acesso vitalício</span>
            </div>
          </div>
        </div>

        <div className="mt-9 flex items-center justify-between sm:hidden">
          <div>
            <p className="text-xs font-semibold text-foreground">Veja o guia por dentro</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">7 páginas demonstrativas</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => moveCarousel(-1)}
              aria-label="Página anterior do guia"
              className="grid h-11 w-11 place-items-center rounded-full border border-primary/20 bg-card text-xl shadow-md transition-transform active:scale-95"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => moveCarousel(1)}
              aria-label="Próxima página do guia"
              className="grid h-11 w-11 place-items-center rounded-full bg-primary text-xl text-primary-foreground shadow-lg shadow-primary/25 transition-transform active:scale-95"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="-mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3"
        >
          {guidePages.map((page, index) => (
            <article
              key={page.title}
              className={`group relative min-w-[calc(100vw-2.5rem)] snap-center rounded-[2.1rem] border border-primary/20 bg-gradient-to-br from-card via-card to-primary/10 p-2.5 shadow-[0_22px_55px_-28px_rgba(76,56,38,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_28px_65px_-24px_rgba(76,56,38,0.55)] sm:min-w-0 ${index === guidePages.length - 1 ? "lg:col-start-2" : ""}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.6rem] bg-white">
                <img
                  src={page.image}
                  alt={`${page.title} — página demonstrativa do guia NutriBaby`}
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-foreground/90 via-foreground/45 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-background/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] shadow-lg backdrop-blur">
                  {index === 0 ? "Capa" : `Prévia ${index}`}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 text-background sm:p-6">
                  <h3 className="font-serif text-2xl leading-tight sm:text-3xl">{page.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-background/80 sm:text-sm">{page.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-3 text-center sm:mt-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
            Material digital · acesso imediato
          </span>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            Consulte no celular, tablet ou computador e avance no seu ritmo.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  Method — 4 steps  ───────────────────────────── */

/* ─────────────────────────────  Comparison  ───────────────────────────── */

function Comparison() {
  const without = [
    "Horas no Google e conselhos que se contradizem",
    "Medo de engasgo diante de cada nova textura",
    "Decidir o cardápio todos os dias, sem planejamento",
    "Repetir as mesmas receitas por falta de opções",
    "Dúvidas sobre cortes, porções e conservação",
    "Lista de compras improvisada e ingredientes faltando",
    "Incerteza para avançar as texturas em cada fase",
    "Informações espalhadas em prints, vídeos e anotações",
  ];
  const with_ = [
    "Mais de 250 receitas organizadas por fase",
    "Cardápios semanais prontos para consultar",
    "Lista de compras para planejar a rotina",
    "Guia visual de cortes, formatos e texturas",
    "Orientações práticas dos 6 aos 24 meses",
    "Dicas de preparo, organização e congelamento",
    "Ideias para variar proteínas, frutas e legumes",
    "Material digital com acesso vitalício",
  ];
  return (
    <section className="py-14 text-foreground sm:py-24">
      <div className="container-page">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
          Tudo muda quando você tem um plano
        </span>
        <h2 className="mt-4 font-serif text-[2.65rem] leading-[0.98] sm:text-6xl lg:text-7xl">
          Do improviso à confiança:
          <br />
          <span className="italic text-primary">a diferença de seguir um método.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-background/70 sm:text-lg">
          O NutriBaby reúne em um só lugar o que você precisa para planejar, preparar e acompanhar
          a introdução alimentar com mais clareza na rotina.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["+250", "receitas"],
          ["6–24m", "por fase"],
          ["7 dias", "de cardápio"],
          ["Vitalício", "acesso ao guia"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-background/15 bg-background/5 p-4 text-center backdrop-blur">
            <p className="font-serif text-3xl text-primary sm:text-4xl">{value}</p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-background/60">{label}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl gap-5 md:grid-cols-2">
        <div className="rounded-[2rem] border border-background/15 bg-background/5 p-7 sm:p-9">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 text-lg text-background/70">
              ✕
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-background/50">
                No improviso
              </p>
              <p className="font-serif text-2xl">Tudo depende de você lembrar e pesquisar</p>
            </div>
          </div>
          <ul className="mt-6 space-y-3">
            {without.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-background/60">
                <span className="mt-1 text-destructive">✕</span>
                <span className="line-through decoration-destructive/40">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[2rem] border-2 border-primary bg-background p-7 text-foreground shadow-2xl shadow-black/30 sm:p-9">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg text-primary-foreground">
              ✓
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Com o NutriBaby
              </p>
              <p className="font-serif text-xl">Clareza do primeiro corte à última garfada</p>
            </div>
          </div>
          <ul className="mt-6 space-y-3">
            {with_.map((item) => (
              <li key={item} className="flex gap-3 text-sm">
                <span className="mt-1 text-primary">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="#comprar"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("comprar")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="cta-hero mt-8 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-center text-sm font-bold uppercase tracking-wide"
          >
            Quero ter tudo organizado <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  WeeklyMeals — Real examples  ───────────────────────────── */

function WeeklyMeals() {
  const meals = [
    {
      day: "Segunda-feira",
      title: "Almoço do bebê (7 meses)",
      ingredients: ["Brócolis", "Tomate", "Vagem", "Batata Doce Laranja", "Fígado"],
      image: refeicao1.url,
      desc: "Uma combinação equilibrada de ferro e vitaminas para começar a semana.",
    },
    {
      day: "Terça-feira",
      title: "Pratinho nutritivo",
      ingredients: ["Inhame", "Feijão", "Frango", "Couve-flor"],
      image: refeicao2.url,
      desc: "Texturas variadas que ajudam no desenvolvimento da mastigação.",
    },
    {
      day: "Quarta-feira",
      title: "Variedade e cor",
      ingredients: ["Acém", "Arroz e Feijão", "Tomate Cereja", "Vagem", "Abóbora Cabotia"],
      image: refeicao3.url,
      desc: "Cores que atraem e nutrientes que protegem a saúde do seu bebê.",
    },
    {
      day: "Quinta-feira",
      title: "Frango com Polenta",
      ingredients: ["Frango Desfiado", "Polenta", "Beterraba", "Repolho"],
      image: refeicao4.url,
      desc: "A polenta cremosa é ótima para bebês que estão começando a aceitar novas texturas.",
    },
    {
      day: "Sexta-feira",
      title: "Peixe e Legumes",
      ingredients: ["Tilápia", "Arroz e Feijão", "Maxixe", "Vagem"],
      image: refeicao5.url,
      desc: "O peixe é uma excelente fonte de ômega-3 para o desenvolvimento cerebral.",
    },
    {
      day: "Sábado",
      title: "Camarão e Abóbora",
      ingredients: ["Camarão", "Camarão com Abóbora", "Arroz", "Vagem"],
      image: refeicao6.url,
      desc: "Introduzir frutos do mar com segurança amplia o paladar e evita seletividade futura.",
    },
  ];

  return (
    <section className="py-12 sm:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
            Do método ao pratinho
          </span>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            Sete dias de refeições <br />
            <span className="italic">que cabem na vida real.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Veja como mães aplicam o NutriBaby todos os dias, transformando a comida da família em opções simples e adequadas para o bebê.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {meals.map((meal, idx) => (
            <div key={idx} className="group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:shadow-xl">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted/20">
                <img
                  src={meal.image}
                  alt={meal.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur-sm">
                    {meal.day}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl">{meal.title}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {meal.ingredients.map((ing) => (
                    <span key={ing} className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {ing}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic">
                  "{meal.desc}"
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────  Social Proof Carousel  ───────────────────────────── */

function SocialProofCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const proofs = [
    { url: "/img/proof-01.jpeg", alt: "Depoimento Renata", name: "Renata Pereira" },
    { url: "/img/proof-02.jpeg", alt: "Depoimento Samia", name: "Samia Monteiro" },
    { url: "/img/proof-03.jpeg", alt: "Depoimento Feedback", name: "Feedback Instagram" },
    { url: "/img/proof-04.jpeg", alt: "Depoimento Mamãe Gabrielly", name: "Mamãe Gabrielly" },
    { url: "/img/proof-05.png", alt: "Depoimento Vitória", name: "Vitória - Superação" },
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % proofs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [proofs.length, isPaused]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % proofs.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + proofs.length) % proofs.length);

  return (
    <section className="bg-transparent py-12 sm:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-4xl text-center mb-10">
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
            O que as mamães <span className="italic text-primary">estão vivendo</span>
          </h2>
        </div>

        <div className="mt-0 group relative mx-auto max-w-[450px]">
          <div 
            className="relative overflow-hidden transition-all duration-300"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {proofs.map((proof, idx) => (
                <div key={idx} className="w-full shrink-0 px-2">
                  <div className="relative mx-auto aspect-[9/16] w-full overflow-hidden rounded-2xl border border-primary/10 shadow-sm transition-transform duration-500 group-hover:scale-[1.01]">
                    <img 
                      src={proof.url} 
                      alt={proof.alt}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                    
                  </div>
                </div>
              ))}
            </div>

            {/* Setas de navegação otimizadas */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-primary shadow-lg backdrop-blur-sm transition-all hover:bg-primary hover:text-white"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-primary shadow-lg backdrop-blur-sm transition-all hover:bg-primary hover:text-white"
              aria-label="Próximo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Indicadores com barra de progresso */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {proofs.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="group relative h-1 flex-1 max-w-[40px] overflow-hidden rounded-full bg-primary/10 transition-all"
                aria-label={`Ver slide ${idx + 1}`}
              >
                <div 
                  className={`h-full bg-primary transition-all duration-300 ${
                    currentIndex === idx ? "w-full" : "w-0"
                  }`}
                />
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}


/* ─────────────────────────────  Offer — oferta única  ───────────────────────────── */

function OfferUrgency() {
  const secs = useOfferCountdown();
  const left = useVagasLeft();
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");

  return (
    <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-destructive/10 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-destructive">
      <Flame className="h-3.5 w-3.5 animate-pulse" />
      {secs > 0 ? `Restam ${left} vagas nesta condição · encerra em ${m}:${s}` : "Esta condição foi encerrada"}
    </div>
  );
}

function Offer({ onSelectBasic }: { onSelectBasic: () => void }) {


  const totalValue = 200; // 47+37+37+27+19+14+19

  return (
    <section id="comprar" className="relative overflow-hidden py-14 sm:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
              Escolha a melhor oferta para você
            </span>
            <div className="h-px w-10 bg-primary" />
          </div>
          <h2 className="font-serif text-[2.65rem] leading-[0.94] tracking-tight sm:text-6xl lg:text-7xl">
            Invista hoje na tranquilidade
            <br />
            <span className="relative mt-2 inline-block italic text-primary">
              das próximas refeições.
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-primary/25 not-italic"
                viewBox="0 0 400 20"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M0 10C50 10 150 2 200 2C250 2 350 10 400 10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
            Pagamento único · Acesso liberado imediatamente por e-mail · 15 dias de garantia incondicional
          </p>
          <OfferUrgency />
        </div>

        {/* Coleção completa — visual integrado à página */}
        <div className="mx-auto mt-12 max-w-5xl">
          <img
            src={nutribabyMockup.url}
            alt="NutriBaby — Kit Completo de Introdução Alimentar"
            className="mx-auto w-full max-w-4xl object-contain drop-shadow-2xl rounded-2xl"
            loading="lazy"
            decoding="async"
            width="896"
            height="504"
          />

          <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
            Tudo o que vem no Kit Completo →
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-start">
          {/* ─── Oferta Básica — Somente Guia + 30 Receitas ─── */}
          <div id="oferta-basica" className="relative flex flex-col rounded-[2rem] border border-border bg-card p-6 shadow-md transition-all sm:rounded-[2.5rem] lg:order-2">
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary-foreground">
                Opção Essencial
              </span>
            </div>

            <h3 className="font-serif text-2xl leading-tight text-foreground">
              Guia Introdução Alimentar <br />
              <span className="text-primary/80">+ 30 Receitas</span>
            </h3>
            
            <p className="mt-4 text-sm text-muted-foreground/90">
              O ponto de partida ideal para quem busca praticidade com o básico da introdução alimentar.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2 text-foreground/90">
                <Check className="h-4 w-4 text-primary" /> Guia de Introdução Alimentar
              </li>
              <li className="flex items-center gap-2 text-foreground/90">
                <Check className="h-4 w-4 text-primary" /> 30 receitas selecionadas
              </li>
              <li className="flex items-center gap-2 text-muted-foreground/50 line-through">
                <ArrowLeft className="h-3 w-3 rotate-180 opacity-50" /> Sem 250+ receitas completas
              </li>
              <li className="flex items-center gap-2 text-muted-foreground/50 line-through">
                <ArrowLeft className="h-3 w-3 rotate-180 opacity-50" /> Sem Cardápio Semanal
              </li>
              <li className="flex items-center gap-2 text-muted-foreground/50 line-through">
                <ArrowLeft className="h-3 w-3 rotate-180 opacity-50" /> Sem Lista de Compras
              </li>
            </ul>

            <div className="mt-auto pt-8 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Investimento único</p>
              <p className="mt-1 font-serif text-4xl font-black text-foreground">R$ 29,90</p>
              
              <div className="mt-2 flex flex-col items-center gap-1.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-destructive animate-pulse">
                  <Star className="h-3 w-3 fill-destructive" /> 98% preferem a oferta abaixo
                </span>
                
                <button
                  onClick={onSelectBasic}
                  className="inline-flex w-full items-center justify-center rounded-xl border-2 border-primary/20 bg-primary/5 py-4 text-sm font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary/10"
                >
                  Escolher Essencial
                </button>
              </div>

              <div className="mt-3 flex flex-col items-center gap-1">
                <p className="text-[10px] font-medium uppercase tracking-widest text-primary/70 italic">
                  💡 O Kit Completo por R$ 47,00 é muito mais vantajoso
                </p>
                <div className="animate-bounce text-primary/60">
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M19 12l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Oferta única — Kit Completo ─── */}
          <div id="oferta-completa" className="relative flex flex-col scroll-mt-24 rounded-[2rem] border-2 border-primary bg-card p-4 pt-8 shadow-[0_40px_100px_-45px_color-mix(in_oklab,var(--primary)_50%,transparent)] transition-transform hover:scale-[1.01] sm:rounded-[2.5rem] sm:p-8 lg:order-1">
            <div className="absolute -top-5 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 rounded-2xl bg-primary px-3 py-2 text-center text-[10px] font-black uppercase leading-tight tracking-[0.16em] text-primary-foreground shadow-xl sm:w-auto sm:whitespace-nowrap sm:rounded-full sm:px-6 sm:text-[11px] sm:tracking-[0.25em]">
              ⭐ Tudo o que você precisa em um só lugar
            </div>

            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                <Gift className="h-4 w-4" /> Kit Completo NutriBaby
              </span>
              <span className="rounded-full bg-cta px-3 py-1 text-[11px] font-black uppercase tracking-widest text-cta-foreground shadow-sm">
                −85% OFF
              </span>
            </div>

            <h3 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              Tudo do NutriBaby +{" "}
              <span className="italic text-primary">6 bônus exclusivos</span>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Guia principal, acervo completo com <span className="font-bold underline text-primary">+250 receitas</span>, cardápios e bônus estratégicos.
            </p>

            {/* Value stack */}
            <div className="mt-6 rounded-[1.75rem] border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                  Valor real do pacote
                </p>
                <span className="rounded-full bg-cta px-3 py-1 text-[10px] font-black uppercase tracking-widest text-cta-foreground shadow-sm">
                  Você economiza R$ {(totalValue - 47.0).toFixed(2).replace(".", ",")}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-serif text-2xl text-muted-foreground line-through decoration-cta/60">
                  R$ {totalValue},00
                </span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  → hoje por apenas
                </span>
              </div>

              {/* Entregáveis em destaque — estilo lista direta */}
              <ul className="mt-6 space-y-1.5 text-center text-base font-medium leading-snug text-foreground sm:text-lg">
                <li>+ Guia Completo de Introdução Alimentar</li>
                <li>+ 100 receitas para bebês e crianças</li>
                <li>+ 123 receitas de papinhas</li>
                <li>+ Mini guia Super Papinhas + BLW</li>
                <li>+ Cardápio semanal pronto</li>
                <li>+ Lista de compras inteligente</li>
                <li>+ Guia anti-seletividade</li>
              </ul>

              {/* Preço em destaque — modelo da referência */}
              <div className="mt-8 text-center">
                <p className="relative inline-block text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  De{" "}
                  <span className="relative inline-block">
                    R$ {totalValue},00
                    <svg
                      className="pointer-events-none absolute -inset-1 h-[calc(100%+0.5rem)] w-[calc(100%+0.5rem)] text-destructive"
                      viewBox="0 0 100 40"
                      preserveAspectRatio="none"
                      fill="none"
                      aria-hidden
                    >
                      <path d="M2 4 L98 36" stroke="currentColor" strokeWidth="3" />
                      <path d="M98 4 L2 36" stroke="currentColor" strokeWidth="3" />
                    </svg>
                  </span>{" "}
                  ...
                </p>

                <p className="mt-3 font-serif text-5xl font-black leading-[0.95] tracking-tight text-cta sm:text-6xl">
                  por 6x de
                  <br />
                  R$ 8,89
                </p>

                <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
                  ou R$ 47,00 à vista
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  <span>Acesso imediato</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                  <span>15 dias de garantia</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                  <span>Pix ou cartão</span>
                </div>
              </div>





              {/* Countdown + vagas */}
              <div className="mt-4 grid gap-3 border-t border-primary/15 pt-4 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-destructive">
                    ⏱ Oferta expira em
                  </p>
                  <Countdown />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Vagas nesta condição
                  </p>
                  <Vagas />
                </div>
              </div>
            </div>

            {/* Mini testimonial */}
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-secondary/60 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/20 font-serif text-lg text-primary">
                J
              </div>
              <div className="text-xs">
                <div className="mb-1 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                </div>
                <p className="italic leading-snug text-foreground">
                  "Melhor investimento que fiz na maternidade. Uso todo dia."
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  Juliana · mãe do Bento (7m)
                </p>
              </div>
            </div>


            {/* CTA principal */}
            <a
              id="cta-oferta"
              href={CHECKOUT_URL}
              className="cta-hero group mt-8 inline-flex w-full scroll-mt-28 items-center justify-center gap-3 rounded-xl bg-cta px-8 py-5 text-base font-black uppercase tracking-widest text-cta-foreground shadow-2xl transition-all hover:scale-[1.02] active:scale-95 sm:text-lg"
            >
              Comprar agora!
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
            </a>

            <p className="mt-3 text-center text-xs font-black uppercase tracking-widest text-destructive sm:text-sm">
              Oferta válida pelo tempo exibido no cronômetro
            </p>


            {/* Payment methods */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <span className="rounded-md bg-secondary/60 px-2 py-1">PIX</span>
              <span className="rounded-md bg-secondary/60 px-2 py-1">VISA</span>
              <span className="rounded-md bg-secondary/60 px-2 py-1">MASTER</span>
              <span className="rounded-md bg-secondary/60 px-2 py-1">ELO</span>
              <span className="rounded-md bg-secondary/60 px-2 py-1">BOLETO</span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-1 text-[9px] text-muted-foreground sm:gap-2 sm:text-[11px]">
              <p className="flex items-center justify-center gap-1.5">
                <Lock className="h-3 w-3" /> 100% Seguro
              </p>
              <p className="flex items-center justify-center gap-1.5">
                <Shield className="h-3 w-3" /> 15 dias garantia
              </p>
              <p className="flex items-center justify-center gap-1.5">
                <Clock className="h-3 w-3" /> Enviado no e-mail
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" /> 4.9/5 · 3.200+ avaliações
          </span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          <span>+12.400 mães acompanhadas</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-3 w-3" /> Bônus removidos após o lançamento
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  Countdown  ───────────────────────────── */

function Countdown() {
  const secs = useOfferCountdown();

  const m = Math.floor(secs / 60);
  const s = secs % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  const Cell = ({ v, l }: { v: string; l: string }) => (
    <div className="flex flex-col items-center">
      <span className="rounded-md bg-foreground px-2 py-1 font-serif text-lg leading-none text-background tabular-nums">
        {v}
      </span>
      <span className="mt-1 text-[9px] uppercase tracking-widest text-muted-foreground">{l}</span>
    </div>
  );
  return (
    <div className="mt-1 flex items-center gap-1.5">
      <Cell v={pad(m)} l="min" />
      <span className="font-serif text-lg text-foreground">:</span>
      <Cell v={pad(s)} l="seg" />
    </div>
  );
}





/* ─────────────────────────────  Guarantee  ───────────────────────────── */

function Guarantee() {
  return (
    <section className="container-page pb-20">
      <div className="mx-auto grid max-w-5xl gap-6 rounded-[2rem] border border-primary/20 bg-[#1a1410] p-6 shadow-2xl sm:gap-10 sm:p-12 md:grid-cols-[auto_1fr] md:items-center">
        {/* Selo estilo badge dourado */}
        <div className="mx-auto md:mx-0">
          <div className="relative grid h-40 w-40 place-items-center">
            {/* Borda serrilhada dourada externa */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f5c76a] via-[#d4a04a] to-[#a67628]"
              style={{
                maskImage:
                  "radial-gradient(circle, black 62%, transparent 63%), conic-gradient(from 0deg, black 0 6deg, transparent 6deg 12deg)",
                WebkitMask:
                  "radial-gradient(circle, black 62%, transparent 63%)",
              }}
            />
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#f5c76a] via-[#d4a04a] to-[#8a5f1f]" />
            {/* Círculo interno azul-marinho */}
            <div className="relative grid h-28 w-28 place-items-center rounded-full bg-[#0e2340] text-center shadow-inner ring-2 ring-[#f5c76a]/40">
              <div>
                <div className="font-serif text-2xl font-bold leading-none text-white">15</div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-white/90">
                  Dias
                </div>
              </div>
            </div>
            {/* Faixa "GARANTIA" */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-sm bg-gradient-to-r from-[#a67628] via-[#f5c76a] to-[#a67628] px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#0e2340] shadow-md">
              Garantia
            </div>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-[#f5c76a] sm:text-2xl">
            Garantia incondicional de 15 dias
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
            <span className="font-bold text-white">Confiamos tanto no nosso material</span>{" "}
            que você tem 15 dias completos para testar tudo sem nenhum risco.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
            Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do seu dinheiro.
            Sem perguntas, sem burocracia, sem enrolação.
          </p>
          <p className="mt-4 text-sm font-bold uppercase tracking-wider text-emerald-400 sm:text-base">
            O risco é todo nosso!
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  FAQ  ───────────────────────────── */

function FAQ() {
  const faqs = [
    {
      q: "Meu bebê ainda não completou 6 meses. Já vale a pena comprar?",
      a: "Sim. Você pode usar esse período para se preparar com calma, entender como funciona a introdução alimentar e organizar utensílios, compras, cardápios e receitas antes do início. Assim, quando chegar o momento indicado pelo pediatra, você estará mais segura e menos perdida.",
    },
    {
      q: "Meu bebê já tem 1 ano. O guia ainda serve?",
      a: "Sim. O conteúdo continua sendo útil para bebês maiores, especialmente para variar as refeições, sair da repetição, organizar a rotina alimentar e encontrar novas combinações de alimentos para o dia a dia.",
    },
    {
      q: "Preciso saber cozinhar?",
      a: "Não. As receitas foram pensadas para serem simples, práticas e fáceis de seguir, inclusive para quem não tem experiência na cozinha. Você recebe orientações claras para preparar as refeições sem complicação.",
    },
    {
      q: "O guia substitui o pediatra ou o nutricionista?",
      a: "Não. O guia é um material educativo e prático para apoiar sua rotina. Casos de alergias, restrições alimentares, dificuldades específicas ou condições de saúde devem ser acompanhados por um pediatra ou nutricionista.",
    },
    {
      q: "O pagamento é único mesmo?",
      a: "Sim. Você paga apenas uma vez e recebe acesso ao conteúdo da oferta escolhida, sem mensalidade e sem cobranças recorrentes.",
    },
    {
      q: "Como recebo o acesso depois da compra?",
      a: "Após a confirmação do pagamento, você recebe as instruções de acesso no e-mail informado durante a compra. O conteúdo é digital e pode ser acessado pelo celular, tablet ou computador.",
    },
  ];
  return (
    <section id="faq" className="container-page py-12 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
            Perguntas frequentes
          </span>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            O que perguntam
            <br /> <span className="italic">antes de comprar.</span>
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors open:border-primary/50"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <span className="font-serif text-lg leading-snug">{f.q}</span>
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border text-lg leading-none transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  Footer CTA + Footer  ───────────────────────────── */

function FooterCta() {
  return (
    <section className="border-y border-background/10 bg-foreground text-background">
      <div className="container-page grid gap-8 py-10 sm:py-16 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <h3 className="font-serif text-4xl leading-tight sm:text-5xl">
            Comece hoje. <br className="hidden sm:block" />
            <span className="italic text-primary">Sirva com confiança amanhã.</span>
          </h3>
          <p className="mt-4 max-w-lg text-background/70 text-lg leading-relaxed">
            Mais de 12.400 mães já trocaram as buscas no Google de madrugada por um cardápio pronto e a tranquilidade de saber o que fazer. Agora é a sua vez.
          </p>
        </div>
        <a
          href="#comprar"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("comprar")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-8 py-5 text-sm font-semibold uppercase tracking-wide text-foreground transition-transform hover:scale-[1.02] md:justify-self-end"
        >
          Quero acessar agora
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 text-xs text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-3">
          <img src={logoImg.url} alt="NutriBaby" className="h-10 w-auto object-contain" loading="lazy" />
          <p>© {new Date().getFullYear()} NutriBaby®. Todos os direitos reservados.</p>
        </div>
        <p>Conteúdo educativo. Não substitui consulta com pediatra ou nutricionista.</p>
      </div>
    </footer>
  );
}
