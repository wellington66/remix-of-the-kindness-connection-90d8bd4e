import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Clock,
  Flame,
  Gift,
  Lock,
  Shield,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

// ─────────────────────────────  Imagens (placeholders determinísticos)  ─────────────────────────────

const heroPhoto = "https://picsum.photos/seed/breakfast1/900/1000";
const problemPhoto = "https://picsum.photos/seed/breakfast1/700/860";

const recipeImages = [
  { seed: "breakfast2", title: "Omelete de Forno Recheada", tag: "180 kcal · 15 min" },
  { seed: "breakfast3", title: "Panqueca de Aveia e Banana", tag: "210 kcal · 10 min" },
  { seed: "breakfast4", title: "Crepioca Cremosa", tag: "160 kcal · 8 min" },
  { seed: "breakfast5", title: "Tapioca Recheada Low Carb", tag: "195 kcal · 12 min" },
  { seed: "breakfast6", title: "Vitamina Proteica Cremosa", tag: "220 kcal · 5 min" },
  { seed: "breakfast7", title: "Mingau de Aveia com Canela", tag: "175 kcal · 7 min" },
];

// Links de checkout (mantidos)
const CHECKOUT_URL = "https://pay.cakto.com.br/antx4kt_976228"; // R$ 27,90 (Plano Completo)
const CHECKOUT_URL_BASIC = "https://pay.cakto.com.br/395yy2x"; // R$ 17,90 (Plano Essencial)
const CHECKOUT_URL_UPSELL = "https://pay.cakto.com.br/vxfqnzy"; // R$ 23,90 (Upsell/Pop-up)
const EXIT_CHECKOUT_URL = "https://pay.cakto.com.br/vxfqnzy";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "101 Cafés da Manhã Saudáveis para Substituir o Pão — sem cair na mesmice",
      },
      {
        name: "description",
        content:
          "101 receitas práticas e rápidas para trocar o pão do café da manhã por opções saudáveis, sem mesmice e sem passar horas na cozinha.",
      },
      {
        property: "og:title",
        content: "101 Cafés da Manhã Saudáveis para Substituir o Pão",
      },
      {
        property: "og:description",
        content:
          "Receitas práticas, rápidas e nutritivas para variar o café da manhã sem pão — guia digital com acesso imediato.",
      },
      { property: "og:image", content: heroPhoto },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroPhoto },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [showUpsell, setShowUpsell] = useState(false);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <AnnouncementBar />
      <Hero />
      <Problem />
      <RedUrgencyBanner />
      <RecipesShowcase />
      <Bonuses />
      <Offer onSelectBasic={() => setShowUpsell(true)} />
      <Guarantee />
      <SocialProof />
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

/* ─────────────────────────────  Retenção / infraestrutura  ───────────────────────────── */

function StayGuard() {
  useEffect(() => {
    const pushTrap = () => {
      for (let i = 0; i < 3; i++) {
        window.history.pushState({ cm: "trap" }, "", window.location.href);
      }
    };
    pushTrap();

    const onPopState = () => {
      window.dispatchEvent(new CustomEvent("cm:exit-intent"));
      pushTrap();
    };

    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return null;
}

function CaktoLinkSanitizer() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.("a") as HTMLAnchorElement | null;
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
    window.addEventListener("cm:exit-intent", trigger as EventListener);
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("cm:exit-intent", trigger as EventListener);
    };
  }, []);

  if (!open) return null;

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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
            <Flame className="h-3 w-3" /> ESPERA!
          </span>
          <h3 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
            Uma oferta <span className="italic text-accent">só sua</span> antes de ir
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Liberamos um desconto exclusivo para você garantir o guia de 101 cafés da manhã agora
            mesmo.
          </p>

          <div className="mt-6 rounded-2xl border-2 border-dashed border-accent bg-accent/5 p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
              OFERTA EXCLUSIVA DESTA SESSÃO
            </p>
            <p className="mt-3 font-serif text-4xl font-black leading-none text-cta">R$ 23,90</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Pagamento único com desconto exclusivo antes de fechar esta página.
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-widest text-muted-foreground">
              à vista · acesso imediato
            </p>
          </div>

          <a
            href={EXIT_CHECKOUT_URL}
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

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Sparkles className="h-7 w-7" />
        </div>

        <h3 className="mt-5 font-serif text-3xl leading-tight text-foreground">
          Aproveite esta <br />
          <span className="italic text-accent">oferta especial</span>
        </h3>

        <p className="mt-4 text-sm text-muted-foreground px-2">
          Por apenas <span className="font-bold text-foreground">mais R$ 6,00</span>, você garante o{" "}
          <strong>Plano Completo</strong> com todos os bônus exclusivos.
        </p>

        <div className="mt-8 space-y-3">
          <a
            href={CHECKOUT_URL_UPSELL}
            className="flex w-full flex-col items-center justify-center rounded-2xl bg-cta px-6 py-4 text-cta-foreground shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-90">
              Opção Recomendada
            </span>
            <span className="text-base font-black uppercase tracking-wider">
              Upgrade para Completo — R$ 23,90
            </span>
          </a>

          <a
            href={CHECKOUT_URL_BASIC}
            className="flex w-full items-center justify-center rounded-2xl border border-border bg-muted/30 px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:bg-muted/50"
          >
            Não, prefiro o essencial — R$ 17,90
          </a>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
          <span className="flex items-center gap-1.5">
            <Shield className="h-3 w-3" /> Seguro
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="h-3 w-3" /> Criptografado
          </span>
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
    { name: "Ana", city: "São Paulo/SP", plan: "Plano Completo" },
    { name: "Larissa", city: "Rio de Janeiro/RJ", plan: "Plano Completo" },
    { name: "Fernanda", city: "Belo Horizonte/MG", plan: "Plano Completo" },
    { name: "Camila", city: "Curitiba/PR", plan: "Plano Completo" },
    { name: "Patrícia", city: "Salvador/BA", plan: "Plano Completo" },
    { name: "Juliana", city: "Porto Alegre/RS", plan: "Plano Completo" },
    { name: "Marina", city: "Recife/PE", plan: "Plano Completo" },
    { name: "Isabela", city: "Fortaleza/CE", plan: "Plano Completo" },
    { name: "Renata", city: "Brasília/DF", plan: "Plano Completo" },
    { name: "Bruna", city: "Florianópolis/SC", plan: "Plano Completo" },
  ];
  const [current, setCurrent] = useState<null | { i: number; ago: number }>(null);

  useEffect(() => {
    let i = Math.floor(Math.random() * buyers.length);
    const show = () => {
      setCurrent({ i: i % buyers.length, ago: Math.floor(Math.random() * 5) + 1 });
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
              acabou de garantir o <span className="font-semibold text-accent">{b.plan}</span>
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

/* ─────────────────────────────  Countdown / oferta  ───────────────────────────── */

const OFFER_DURATION_SECONDS = 15 * 60;
const OFFER_DEADLINE_KEY = "cm_offer_deadline_v1";

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

/* ─────────────────────────────  Announcement bar  ───────────────────────────── */

function AnnouncementBar() {
  const secs = useOfferCountdown();
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    <div className="bg-accent text-accent-foreground">
      <div className="container-page flex flex-wrap items-center justify-center gap-2 py-1.5 text-center text-[10px] font-bold tracking-wide sm:gap-3 sm:py-2 sm:text-xs">
        <Zap className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
        {secs > 0 ? (
          <>
            <span className="uppercase">⚡ Oferta válida somente hoje!</span>
            <span className="rounded bg-black/15 px-1.5 py-0.5 font-semibold tabular-nums">
              {pad(m)}:{pad(s)}
            </span>
          </>
        ) : (
          <span className="font-semibold uppercase tracking-widest">Oferta encerrada</span>
        )}
        <a
          href="#comprar"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("comprar")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="ml-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-accent shadow-sm transition-transform hover:scale-105 sm:text-[10px]"
        >
          Garantir minha vaga agora
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────  Hero  ───────────────────────────── */

function BookCoverMockup() {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[300px] overflow-hidden rounded-lg border-4 border-black/10 bg-gradient-to-br from-[#1f3d2b] to-[#142a1c] p-6 shadow-2xl">
      <div className="absolute inset-x-4 top-4 h-px bg-white/10" />
      <div className="flex h-full flex-col items-center justify-between text-center">
        <div className="mt-2">
          <span className="inline-block rounded-full bg-[#c1272d] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow">
            Guia Digital
          </span>
        </div>
        <div>
          <p className="font-serif text-6xl font-black leading-none text-[#e9c84a]">101</p>
          <h3 className="mt-3 font-serif text-2xl font-black uppercase leading-[1.05] text-white">
            Cafés da Manhã <span className="text-[#c1272d]">Saudáveis</span>
          </h3>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
            para substituir o pão
          </p>
        </div>
        <div className="mb-2 flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#e9c84a]" />
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[220px] rounded-[2rem] border-[6px] border-foreground bg-foreground p-2 shadow-2xl">
      <div className="overflow-hidden rounded-[1.4rem] bg-background">
        <div className="bg-primary px-3 py-2 text-center text-[10px] font-black uppercase tracking-widest text-primary-foreground">
          101 Cafés
        </div>
        <div className="grid grid-cols-2 gap-1 p-1.5">
          {recipeImages.slice(0, 6).map((r) => (
            <div key={r.seed} className="aspect-square overflow-hidden rounded-md bg-muted">
              <img
                src={`https://picsum.photos/seed/${r.seed}/150/150`}
                alt={r.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/40 to-background">
      <div className="container-page py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-black uppercase leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            101 Cafés da Manhã Saudáveis para <span className="text-accent">Substituir o Pão</span>
          </h1>
          <p className="mt-3 font-serif text-xl italic text-foreground sm:text-2xl">
            — sem cair na mesmice.
          </p>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Chega de comer sempre a mesma coisa. Descubra 101 receitas práticas e rápidas para
            começar o dia com energia, sem depender do pão.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 items-center gap-10 sm:grid-cols-2">
          <BookCoverMockup />
          <PhoneMockup />
        </div>

        <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-6 text-center">
          {[
            { icon: <Zap className="h-4 w-4" />, label: "PRÁTICAS" },
            { icon: <Clock className="h-4 w-4" />, label: "RÁPIDAS" },
            { icon: <Sparkles className="h-4 w-4" />, label: "NUTRITIVAS" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary"
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-md text-center">
          <div className="rounded-2xl border-2 border-accent/30 bg-card p-5 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              de <span className="line-through">R$ 47,90</span> por
            </p>
            <p className="mt-1 font-serif text-5xl font-black text-accent">R$ 17,90</p>
            <a
              href="#comprar"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("comprar")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="cta-hero mt-5 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black uppercase tracking-wide"
            >
              Quero meu guia agora <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-primary" /> Acesso imediato · pagamento seguro
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  Problem  ───────────────────────────── */

function Problem() {
  const pains = [
    "Cansaço da mesmice: pão, pão e mais pão todos os dias",
    "Falta de tempo para preparar algo diferente de manhã",
    "Vontade de emagrecer sem abrir mão do café da manhã",
    "Sensação de estar sempre comendo carboidrato em excesso",
    "Dificuldade de achar receitas rápidas e saudáveis",
  ];
  return (
    <section className="bg-background py-14 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-serif text-3xl font-black leading-tight text-primary sm:text-4xl">
            Você ainda come sempre pão no café da manhã?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Se você se identifica com algum destes pontos, o guia 101 Cafés da Manhã foi feito para
            você:
          </p>
          <ul className="mt-6 space-y-3">
            {pains.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-3 text-sm"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-foreground">{p}</span>
              </li>
            ))}
          </ul>
          <a
            href="#comprar"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("comprar")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="cta-hero mt-8 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-black uppercase tracking-wide"
          >
            Quero variar meu café da manhã <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-2xl">
          <img
            src={problemPhoto}
            alt="Café da manhã saudável servido na mesa"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  Red urgency banner  ───────────────────────────── */

function RedUrgencyBanner() {
  return (
    <section className="bg-accent py-6 text-accent-foreground">
      <div className="container-page flex flex-col items-center gap-1 text-center">
        <p className="font-serif text-2xl font-black uppercase tracking-tight sm:text-3xl">
          ⚠️ Atenção! Essa oferta encerra hoje
        </p>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-foreground/90 sm:text-sm">
          O desconto de R$ 47,90 por R$ 17,90 expira ao final do cronômetro acima
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────  Recipes showcase  ───────────────────────────── */

function RecipesShowcase() {
  return (
    <section className="bg-secondary/30 py-14 sm:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-black uppercase text-primary sm:text-4xl">
            Veja o que você vai encontrar no guia
          </h2>
          <p className="mt-3 text-muted-foreground">
            Uma amostra das 101 receitas práticas, rápidas e nutritivas do guia.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipeImages.map((r) => (
            <article
              key={r.seed}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={`https://picsum.photos/seed/${r.seed}/500/375`}
                  alt={r.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl leading-tight text-foreground">{r.title}</h3>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-accent">
                  {r.tag}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  Bonuses  ───────────────────────────── */

function BonusCover({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border-2 border-black/10 bg-gradient-to-br from-[#1f3d2b] to-[#142a1c] p-4 shadow-lg">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <span className="text-4xl">{icon}</span>
        <span className="mt-3 inline-block rounded-full bg-[#c1272d] px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-white">
          Bônus
        </span>
        <p className="mt-3 font-serif text-sm font-bold leading-tight text-white">{title}</p>
      </div>
    </div>
  );
}

function Bonuses() {
  const bonuses = [
    { icon: "🍳", title: "Café da Manhã Prático em Dobro" },
    { icon: "🛒", title: "Lista de Compras Econômica" },
    { icon: "🗓️", title: "Planejamento Semanal Pronto" },
    { icon: "🥪", title: "Guia de Lanches Saudáveis" },
    { icon: "🍯", title: "+50 Receitas sem Açúcar" },
  ];
  return (
    <section className="bg-background py-14 sm:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-accent">
            <Gift className="h-3.5 w-3.5" /> Só hoje
          </span>
          <h2 className="mt-4 font-serif text-3xl font-black uppercase text-primary sm:text-4xl">
            Ganhe 5 bônus exclusivos hoje
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {bonuses.map((b) => (
            <BonusCover key={b.title} icon={b.icon} title={b.title} />
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-md rounded-2xl border-2 border-dashed border-accent bg-accent/5 p-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
            Valor total dos bônus
          </p>
          <p className="mt-2 font-serif text-4xl font-black text-accent">R$ 289,90</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Incluído gratuitamente na sua compra de hoje
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  Offer / pricing  ───────────────────────────── */

function OfferUrgency() {
  const secs = useOfferCountdown();
  const left = useVagasLeft();
  const m = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");

  return (
    <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-destructive/10 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-destructive">
      <Flame className="h-3.5 w-3.5 animate-pulse" />
      {secs > 0
        ? `Restam ${left} vagas nesta condição · encerra em ${m}:${s}`
        : "Esta condição foi encerrada"}
    </div>
  );
}

function Offer({ onSelectBasic }: { onSelectBasic: () => void }) {
  return (
    <section id="comprar" className="relative overflow-hidden bg-[#F1EEE3] py-14 sm:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-black uppercase text-primary sm:text-5xl">
            Escolha seu plano
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Pagamento único · Acesso liberado imediatamente por e-mail
          </p>
          <OfferUrgency />
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-8 lg:grid-cols-2 lg:items-start">
          {/* Plano Essencial */}
          <div className="relative flex flex-col rounded-[2rem] border border-border bg-card p-6 shadow-md sm:p-8 lg:order-1">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary-foreground">
              Plano Essencial
            </span>
            <h3 className="mt-4 font-serif text-2xl leading-tight text-foreground">
              Guia com 101 Receitas
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              O básico para você já começar a variar o café da manhã hoje mesmo.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2 text-foreground/90">
                <Check className="h-4 w-4 text-primary" /> Guia completo com 101 receitas
              </li>
              <li className="flex items-center gap-2 text-foreground/90">
                <Check className="h-4 w-4 text-primary" /> Acesso vitalício
              </li>
              <li className="flex items-center gap-2 text-muted-foreground/50 line-through">
                Sem os 5 bônus exclusivos
              </li>
              <li className="flex items-center gap-2 text-muted-foreground/50 line-through">
                Sem lista de compras econômica
              </li>
            </ul>
            <div className="mt-auto pt-8 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Investimento único
              </p>
              <p className="mt-1 font-serif text-4xl font-black text-foreground">R$ 17,90</p>
              <button
                onClick={onSelectBasic}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border-2 border-primary/20 bg-primary/5 py-4 text-sm font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary/10"
              >
                Escolher Essencial
              </button>
            </div>
          </div>

          {/* Plano Completo */}
          <div className="relative flex flex-col rounded-[2rem] border-2 border-accent bg-card p-4 pt-8 shadow-[0_40px_100px_-45px_color-mix(in_oklab,var(--accent)_50%,transparent)] transition-transform hover:scale-[1.01] sm:p-8 lg:order-2">
            <div className="absolute -top-5 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 rounded-full bg-accent px-3 py-2 text-center text-[10px] font-black uppercase leading-tight tracking-[0.16em] text-accent-foreground shadow-xl sm:w-auto sm:whitespace-nowrap sm:px-6 sm:text-[11px]">
              ⭐ Mais popular
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent">
              <Gift className="h-4 w-4" /> Plano Completo
            </span>
            <h3 className="mt-4 font-serif text-2xl leading-tight text-foreground sm:text-3xl">
              Guia + todos os bônus
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Tudo do plano essencial, mais os 5 bônus exclusivos e suporte prioritário.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2 text-foreground/90">
                <Check className="h-4 w-4 text-accent" /> Guia completo com 101 receitas
              </li>
              <li className="flex items-center gap-2 text-foreground/90">
                <Check className="h-4 w-4 text-accent" /> Os 5 bônus exclusivos (valor R$ 289,90)
              </li>
              <li className="flex items-center gap-2 text-foreground/90">
                <Check className="h-4 w-4 text-accent" /> Acesso vitalício
              </li>
              <li className="flex items-center gap-2 text-foreground/90">
                <Check className="h-4 w-4 text-accent" /> Suporte prioritário
              </li>
            </ul>

            <div className="mt-6 rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/10 via-card to-card p-5 text-center">
              <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                De <span className="line-through">R$ 47,90</span>
              </p>
              <p className="mt-2 font-serif text-5xl font-black leading-[0.95] tracking-tight text-cta">
                R$ 27,90
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                pagamento único
              </p>
              <div className="mt-4 border-t border-accent/15 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-destructive">
                  ⏱ Oferta expira em
                </p>
                <Countdown />
              </div>
              <div className="mt-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  Vagas nesta condição
                </p>
                <Vagas />
              </div>
            </div>

            <a
              href={CHECKOUT_URL}
              className="cta-hero group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-cta px-8 py-5 text-base font-black uppercase tracking-widest text-cta-foreground shadow-2xl transition-all hover:scale-[1.02] active:scale-95 sm:text-lg"
            >
              Quero o plano completo!
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
            </a>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <span className="rounded-md bg-secondary/60 px-2 py-1">PIX</span>
              <span className="rounded-md bg-secondary/60 px-2 py-1">VISA</span>
              <span className="rounded-md bg-secondary/60 px-2 py-1">MASTER</span>
              <span className="rounded-md bg-secondary/60 px-2 py-1">ELO</span>
              <span className="rounded-md bg-secondary/60 px-2 py-1">BOLETO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <div className="mt-1 flex items-center justify-center gap-1.5">
      <Cell v={pad(m)} l="min" />
      <span className="font-serif text-lg text-foreground">:</span>
      <Cell v={pad(s)} l="seg" />
    </div>
  );
}

/* ─────────────────────────────  Guarantee  ───────────────────────────── */

function Guarantee() {
  return (
    <section className="container-page py-16">
      <div className="mx-auto grid max-w-4xl gap-6 rounded-[2rem] border border-primary/20 bg-[#142a1c] p-6 shadow-2xl sm:gap-10 sm:p-12 md:grid-cols-[auto_1fr] md:items-center">
        <div className="mx-auto md:mx-0">
          <div className="relative grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-[#f5c76a] via-[#d4a04a] to-[#8a5f1f] shadow-xl">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-[#c1272d] text-center ring-2 ring-[#f5c76a]/40">
              <div>
                <div className="font-serif text-xl font-bold leading-none text-white">7</div>
                <div className="text-[9px] font-semibold uppercase tracking-widest text-white/90">
                  Dias
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-[#f5c76a] sm:text-2xl">
            Você está 100% seguro
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
            Garantia incondicional de 7 dias. Se não gostar do guia, devolvemos 100% do seu
            dinheiro, sem perguntas e sem burocracia.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  Social proof  ───────────────────────────── */

function SocialProof() {
  const testimonials = [
    {
      name: "Camila R.",
      quote:
        "Nunca mais fiquei sem ideia para o café da manhã. As receitas são rápidas de verdade!",
    },
    {
      name: "Beatriz S.",
      quote: "Sai do pão todo dia e já sinto diferença na disposição. Recomendo muito.",
    },
    {
      name: "Marcos T.",
      quote: "Achei que ia ser difícil de seguir, mas é tudo bem simples e prático.",
    },
    {
      name: "Juliana M.",
      quote: "As receitas de tapioca e crepioca viraram queridinhas aqui em casa.",
    },
  ];
  return (
    <section id="depoimentos" className="bg-secondary/30 py-14 sm:py-20">
      <div className="container-page text-center">
        <h2 className="font-serif text-2xl font-black uppercase text-primary sm:text-3xl">
          2.425 pessoas já transformaram a cozinha
        </h2>
        <div className="mt-4 flex flex-col items-center gap-1">
          <p className="font-serif text-5xl font-black text-foreground">4.9</p>
          <div className="flex text-accent">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border bg-card p-5 text-left shadow-sm"
            >
              <div className="flex text-accent">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm italic leading-relaxed text-foreground">"{t.quote}"</p>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                {t.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  FAQ  ───────────────────────────── */

function FAQ() {
  const faqs = [
    {
      q: "Como recebo o guia?",
      a: "Após a confirmação do pagamento, você recebe o acesso por e-mail com um link para baixar o material digital instantaneamente.",
    },
    {
      q: "Funciona para quem não gosta de cozinhar?",
      a: "Sim! As receitas foram pensadas para serem simples, rápidas e fáceis de seguir, mesmo para quem não tem experiência na cozinha.",
    },
    {
      q: "Tem garantia?",
      a: "Sim, você tem 7 dias de garantia incondicional. Se não gostar, devolvemos 100% do valor pago, sem burocracia.",
    },
    {
      q: "Posso acessar pelo celular?",
      a: "Sim. O guia é digital e pode ser acessado pelo celular, tablet ou computador, a qualquer hora.",
    },
    {
      q: "Por quanto tempo tenho acesso?",
      a: "O acesso é vitalício. Você paga uma única vez e pode consultar o guia sempre que quiser, sem mensalidades.",
    },
  ];
  return (
    <section id="faq" className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-black uppercase text-primary sm:text-4xl">
            Dúvidas frequentes
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors open:border-accent/50"
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
    <section className="border-y border-background/10 bg-primary text-primary-foreground">
      <div className="container-page grid gap-8 py-10 sm:py-16 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <h3 className="font-serif text-3xl font-black uppercase leading-tight sm:text-4xl">
            Comece hoje. <br className="hidden sm:block" />
            <span className="italic text-[#e9c84a]">Sirva um café da manhã diferente amanhã.</span>
          </h3>
          <p className="mt-4 max-w-lg text-primary-foreground/80 text-base leading-relaxed">
            Mais de 2.400 pessoas já trocaram o pão de todo dia por opções saudáveis e variadas.
            Agora é a sua vez.
          </p>
        </div>
        <a
          href="#comprar"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("comprar")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-5 text-sm font-black uppercase tracking-wide text-accent-foreground transition-transform hover:scale-[1.02] md:justify-self-end"
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
        <p className="font-serif text-sm font-bold text-primary">
          101 Cafés da Manhã Saudáveis © {new Date().getFullYear()}. Todos os direitos reservados.
        </p>
        <p>Conteúdo educativo. Não substitui consulta com nutricionista.</p>
      </div>
    </footer>
  );
}
