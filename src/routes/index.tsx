import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Play,
  Scissors,
  ShieldCheck,
  ShoppingBasket,
  X,
} from "lucide-react";

/* ──────────────────────────  Assets (todos já existentes em /public/img)  ────────────────────────── */

const logoImg = "/img/nutribaby-logo-full.png";
const mockupImg = "/img/product-kit.jpeg";

const previewFases = "/img/guia-pures-papinhas.webp";
const previewCardapio = "/img/guia-semana-equilibrada.webp";
const previewLista = "/img/guia-cardapio-compras.webp";
const previewCortes = "/img/guia-cortes-seguros.webp";

const receitas = [
  { url: "/img/refeicao-1.jpg", alt: "Prato de refeição infantil com legumes cozidos em pedaços macios" },
  { url: "/img/refeicao-2.jpg", alt: "Papinha cremosa servida em pote com colher de silicone" },
  { url: "/img/refeicao-3.jpg", alt: "Refeição de bebê com arroz, feijão amassado e legumes" },
  { url: "/img/refeicao-4.jpg", alt: "Prato colorido com frutas e legumes cortados em tiras" },
];

const depoimentos = [
  { url: "/img/depoimento-a.jpeg", tema: "Organização da rotina" },
  { url: "/img/depoimento-b.jpeg", tema: "Variedade nas refeições" },
  { url: "/img/depoimento-c.jpeg", tema: "Praticidade no dia a dia" },
  { url: "/img/depoimento-d.jpeg", tema: "Organização da rotina" },
  { url: "/img/depoimento-e.jpeg", tema: "Variedade nas refeições" },
  { url: "/img/depoimento-f.jpeg", tema: "Praticidade no dia a dia" },
];

/* ──────────────────────────  Checkout (links preservados)  ────────────────────────── */

const CHECKOUT_URL = "https://pay.cakto.com.br/antx4kt_976228"; // Kit Completo — R$ 27,90
const CHECKOUT_URL_BASIC = "https://pay.cakto.com.br/395yy2x"; // Oferta Essencial — R$ 17,90

const YOUTUBE_ID = "70tlclIadc8";

/** Preserva UTMs da URL atual e remove parâmetros vazios (que quebravam o checkout da Cakto). */
function buildCheckoutUrl(base: string): string {
  if (typeof window === "undefined") return base;
  try {
    const url = new URL(base);
    const current = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "src", "sck"].forEach((k) => {
      const v = current.get(k);
      if (v && v.trim() !== "") url.searchParams.set(k, v.trim());
    });
    const empty: string[] = [];
    url.searchParams.forEach((value, key) => {
      if (!value || value.trim() === "") empty.push(key);
    });
    empty.forEach((k) => url.searchParams.delete(k));
    return url.toString();
  } catch {
    return base;
  }
}

/** InitiateCheckout dispara apenas no clique real em um CTA que leva ao checkout. */
function trackInitiateCheckout(value: number) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
  if (typeof fbq === "function") {
    fbq("track", "InitiateCheckout", { value, currency: "BRL" });
  }
}

type BuyProps = {
  plan: "completo" | "essencial";
  children: React.ReactNode;
  className?: string;
};

function BuyLink({ plan, children, className = "" }: BuyProps) {
  const base = plan === "completo" ? CHECKOUT_URL : CHECKOUT_URL_BASIC;
  const value = plan === "completo" ? 27.9 : 17.9;

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      trackInitiateCheckout(value);
      e.currentTarget.href = buildCheckoutUrl(base);
    },
    [base, value],
  );

  return (
    <a
      href={base}
      onClick={onClick}
      className={`inline-flex min-h-[52px] items-center justify-center rounded-full px-7 text-center text-base font-semibold tracking-tight outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </a>
  );
}

/* ──────────────────────────  Rota  ────────────────────────── */

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NutriBaby — Receitas e planejamento para a introdução alimentar" },
      {
        name: "description",
        content:
          "Receitas organizadas por fase, cardápios semanais, lista de compras e exemplos visuais para apoiar a rotina alimentar de bebês de 6 a 24 meses.",
      },
      { property: "og:title", content: "NutriBaby — Receitas e planejamento para a introdução alimentar" },
      {
        property: "og:description",
        content:
          "Receitas por fase, cardápio semanal, lista de compras e exemplos visuais de cortes e texturas para bebês de 6 a 24 meses.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Identificacao />
        <Beneficios />
        <Previas />
        <Video />
        <ComoAjuda />
        <Receitas />
        <Transparencia />
        <Depoimentos />
        <OfertaCompleta />
        <Garantia />
        <OfertaEssencial />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}

/* ──────────────────────────  1 · Barra superior + cabeçalho  ────────────────────────── */

function TopBar() {
  return (
    <div className="bg-sage-soft/60 py-2 text-center text-[13px] text-foreground">
      Material digital · Acesso imediato · 15 dias de garantia
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="container-page flex items-center justify-between py-3">
        <img src={logoImg} alt="NutriBaby" width={132} height={36} className="h-8 w-auto" />
        <a
          href="#oferta"
          className="hidden min-h-[44px] items-center rounded-full border border-border px-5 text-sm font-medium transition-colors hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
        >
          Ver a oferta
        </a>
      </div>
    </header>
  );
}

/* ──────────────────────────  3 · Primeira dobra  ────────────────────────── */

const heroBenefits = [
  "Mais de 250 ideias de receitas organizadas por fase",
  "Cardápio semanal e lista de compras",
  "Exemplos visuais de cortes, formatos e texturas",
  "Acesso imediato pelo celular, tablet ou computador",
];

function Hero() {
  return (
    <section className="gradient-hero">
      <div className="container-page grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div>
          <span className="inline-block rounded-full bg-sage-soft px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground">
            Guia prático para bebês de 6 a 24 meses
          </span>

          <h1 className="mt-5 max-w-[17ch] font-serif text-[2rem] leading-[1.1] sm:text-5xl">
            Pare de perder tempo pensando no que preparar para o seu bebê.
          </h1>

          <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            Receitas organizadas por fase, cardápios semanais, lista de compras e exemplos visuais de cortes e
            texturas para deixar sua rotina mais prática.
          </p>

          <ul className="mt-6 space-y-2.5">
            {heroBenefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-base">
                <Check className="mt-1 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <BuyLink plan="completo" className="w-full bg-cta text-cta-foreground hover:brightness-105 sm:w-auto">
              QUERO ORGANIZAR AS REFEIÇÕES
            </BuyLink>
            <p className="mt-3 text-sm text-muted-foreground">
              Acesso imediato • Pagamento seguro • 15 dias de garantia
            </p>
            <p className="mt-2 text-base font-semibold">
              Kit Completo: 6x de R$ 4,65 ou R$ 27,90 à vista
            </p>
            <a
              href="#previas"
              className="mt-3 inline-block text-sm underline underline-offset-4 transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
            >
              Ver tudo o que está incluído
            </a>
          </div>
        </div>

        <div className="order-last">
          <img
            src={mockupImg}
            alt="Kit NutriBaby exibido em celular, tablet e computador"
            width={1000}
            height={1000}
            fetchPriority="high"
            decoding="async"
            className="mx-auto w-full max-w-[520px] rounded-[1.75rem] soft-shadow"
          />
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────  4 · Identificação  ────────────────────────── */

const situacoes = [
  "Falta de ideias para variar as refeições.",
  "Dúvida sobre o que oferecer em cada fase.",
  "Lista de compras feita sem planejamento.",
  "Receitas e orientações espalhadas em prints, vídeos e anotações.",
];

function Identificacao() {
  return (
    <section className="container-page py-14 sm:py-20">
      <h2 className="mx-auto max-w-[24ch] text-center font-serif text-2xl leading-tight sm:text-4xl">
        Se toda refeição começa com “o que eu preparo hoje?”, você não precisa continuar improvisando.
      </h2>
      <ul className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
        {situacoes.map((s) => (
          <li key={s} className="rounded-2xl border border-border bg-card px-5 py-4 text-base leading-relaxed">
            {s}
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-8 max-w-[52ch] text-center text-base text-muted-foreground">
        O NutriBaby reúne essas informações em um material visual e organizado para facilitar sua rotina.
      </p>
    </section>
  );
}

/* ──────────────────────────  5 · Benefícios principais  ────────────────────────── */

const beneficios = [
  {
    icon: BookOpen,
    title: "Receitas por fase",
    text: "Ideias organizadas para acompanhar diferentes momentos dos 6 aos 24 meses.",
  },
  {
    icon: ClipboardList,
    title: "Cardápios semanais",
    text: "Uma referência pronta para reduzir as decisões diárias.",
  },
  {
    icon: ShoppingBasket,
    title: "Lista de compras",
    text: "Planejamento mais simples antes de ir ao mercado.",
  },
  {
    icon: Scissors,
    title: "Cortes e texturas",
    text: "Exemplos visuais para consultar e conversar com o profissional que acompanha o bebê.",
  },
];

function Beneficios() {
  return (
    <section className="bg-muted/40 py-14 sm:py-20">
      <div className="container-page grid gap-5 sm:grid-cols-2">
        {beneficios.map(({ icon: Icon, title, text }) => (
          <div key={title} className="premium-card p-6 sm:p-8">
            <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
            <h3 className="mt-4 font-serif text-2xl">{title}</h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────  6 · Prévias reais  ────────────────────────── */

const previas = [
  { url: previewFases, title: "Receitas por fase" },
  { url: previewCardapio, title: "Cardápio semanal" },
  { url: previewLista, title: "Lista de compras" },
  { url: previewCortes, title: "Cortes e texturas" },
];

function Previas() {
  return (
    <section id="previas" className="container-page py-14 sm:py-20">
      <h2 className="text-center font-serif text-3xl sm:text-4xl">Veja exatamente o que você receberá</h2>
      <p className="mt-3 text-center text-base text-muted-foreground">
        Material digital com acesso imediato e vitalício.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {previas.map((p) => (
          <figure key={p.title} className="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src={p.url}
              alt={`Prévia do material NutriBaby: ${p.title}`}
              width={900}
              height={1200}
              loading="lazy"
              decoding="async"
              className="w-full object-cover"
            />
            <figcaption className="border-t border-border px-5 py-3 text-base font-medium">{p.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────  7 · Vídeo sob demanda  ────────────────────────── */

function Video() {
  const [play, setPlay] = useState(false);

  return (
    <section className="bg-muted/40 py-14 sm:py-20">
      <div className="container-page mx-auto max-w-3xl">
        <h2 className="text-center font-serif text-3xl sm:text-4xl">
          Veja em poucos minutos como o NutriBaby funciona
        </h2>
        <p className="mt-3 text-center text-base text-muted-foreground">Opcional — a página funciona sem o vídeo.</p>

        <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-border bg-card">
          {play ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Como o NutriBaby funciona"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlay(true)}
              aria-label="Reproduzir vídeo sobre o NutriBaby"
              className="group relative block h-full w-full focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src={`https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`}
                alt=""
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-foreground/25">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cta text-cta-foreground">
                  <Play className="h-7 w-7 translate-x-0.5" aria-hidden="true" />
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────  8 · Como ajuda na organização  ────────────────────────── */

const passos = [
  { n: "1", t: "Escolha a fase", d: "Localize as receitas indicadas para o momento do seu bebê." },
  { n: "2", t: "Monte a semana", d: "Use o cardápio semanal como referência e ajuste ao que a família já come." },
  { n: "3", t: "Leve a lista", d: "A lista de compras sai do cardápio, sem improviso no mercado." },
  { n: "4", t: "Consulte os visuais", d: "Cortes, formatos e texturas ilustrados para consultar na hora de preparar." },
];

function ComoAjuda() {
  return (
    <section className="container-page py-14 sm:py-20">
      <h2 className="text-center font-serif text-3xl sm:text-4xl">Como o material organiza a sua rotina</h2>
      <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {passos.map((p) => (
          <li key={p.n} className="rounded-2xl border border-border bg-card p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-soft text-base font-semibold">
              {p.n}
            </span>
            <h3 className="mt-4 font-serif text-xl">{p.t}</h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ──────────────────────────  9 · Quatro receitas  ────────────────────────── */

function Receitas() {
  return (
    <section className="bg-muted/40 py-14 sm:py-20">
      <div className="container-page">
        <h2 className="text-center font-serif text-3xl sm:text-4xl">Exemplos de refeições do material</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {receitas.map((r) => (
            <img
              key={r.url}
              src={r.url}
              alt={r.alt}
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full rounded-2xl border border-border object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────  10 · Autoria e transparência  ────────────────────────── */

function Transparencia() {
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-7 text-center sm:p-10">
        <ShieldCheck className="mx-auto h-8 w-8 text-sage" aria-hidden="true" />
        <h2 className="mt-4 font-serif text-2xl sm:text-3xl">Um material educativo para apoiar sua organização</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          O NutriBaby foi criado para reunir ideias de receitas, planejamento e exemplos visuais em um único lugar. O
          conteúdo é educativo e não substitui a avaliação individual do pediatra ou nutricionista.
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────  11 · Depoimentos reais  ────────────────────────── */

function Depoimentos() {
  const [i, setI] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const total = depoimentos.length;

  const go = (dir: -1 | 1) => setI((v) => (v + dir + total) % total);

  useEffect(() => {
    const el = trackRef.current?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [i]);

  return (
    <section className="bg-muted/40 py-14 sm:py-20">
      <div className="container-page">
        <h2 className="text-center font-serif text-3xl sm:text-4xl">O que as mães têm compartilhado</h2>

        <div
          ref={trackRef}
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {depoimentos.map((d) => (
            <figure key={d.url} className="w-[260px] shrink-0 snap-center sm:w-[300px]">
              <img
                src={d.url}
                alt={`Mensagem de cliente sobre ${d.tema.toLowerCase()}`}
                width={600}
                height={1000}
                loading="lazy"
                decoding="async"
                className="w-full rounded-2xl border border-border bg-card object-contain"
              />
              <figcaption className="mt-2 text-center text-sm text-muted-foreground">{d.tema}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Depoimento anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próximo depoimento"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────  12 · Oferta principal  ────────────────────────── */

const itensKit = [
  "Guia Completo de Introdução Alimentar",
  "Acervo de receitas NutriBaby",
  "Receitas de papinhas",
  "Mini guia Super Papinhas + BLW",
  "Cardápio semanal",
  "Lista de compras",
  "Guia de variedade alimentar",
];

function OfertaCompleta() {
  return (
    <section id="oferta" className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-xl rounded-[1.5rem] border border-border bg-card p-7 soft-shadow sm:p-10">
        <h2 className="text-center font-serif text-3xl sm:text-4xl">Kit Completo NutriBaby</h2>

        <ul className="mt-7 space-y-3">
          {itensKit.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-base">
              <Check className="mt-1 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <p className="font-serif text-4xl">6x de R$ 4,65</p>
          <p className="mt-1 text-base text-muted-foreground">ou R$ 27,90 à vista</p>
        </div>

        <BuyLink
          plan="completo"
          className="mt-6 w-full bg-cta text-cta-foreground hover:brightness-105"
        >
          QUERO O KIT COMPLETO
        </BuyLink>

        <p className="mt-3 text-center text-sm text-muted-foreground">
          Acesso imediato • Pagamento único • 15 dias de garantia
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────  13 · Garantia  ────────────────────────── */

function Garantia() {
  return (
    <section className="bg-sage-soft/40 py-14 sm:py-20">
      <div className="container-page mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-2xl sm:text-3xl">Você tem 15 dias para conhecer o material</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Após a compra, você poderá acessar o conteúdo e avaliar se ele faz sentido para sua rotina. Caso não fique
          satisfeita, poderá solicitar o reembolso dentro do prazo informado.
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────  14 · Oferta Essencial  ────────────────────────── */

function OfertaEssencial() {
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-background p-6 sm:p-8">
        <h2 className="font-serif text-2xl">Prefere começar pelo básico?</h2>
        <p className="mt-3 text-base text-muted-foreground">
          Guia de Introdução Alimentar + 30 receitas por R$ 17,90.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold">Inclui</p>
            <ul className="mt-2 space-y-1.5 text-base text-muted-foreground">
              <li>Guia de Introdução Alimentar</li>
              <li>30 receitas</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Não inclui</p>
            <ul className="mt-2 space-y-1.5 text-base text-muted-foreground">
              <li>Acervo completo de receitas</li>
              <li>Cardápio semanal e lista de compras</li>
              <li>Guia de cortes e texturas</li>
            </ul>
          </div>
        </div>

        <BuyLink
          plan="essencial"
          className="mt-6 w-full border border-border bg-background text-foreground hover:bg-accent/30"
        >
          ESCOLHER OFERTA ESSENCIAL
        </BuyLink>
      </div>
    </section>
  );
}

/* ──────────────────────────  15 · FAQ  ────────────────────────── */

const faq = [
  {
    q: "Meu bebê ainda não completou 6 meses. Posso comprar?",
    a: "Pode. O acesso é vitalício, então você pode se organizar antes e usar o material quando a introdução alimentar começar, conforme a orientação do profissional que acompanha o bebê.",
  },
  {
    q: "Meu bebê já tem mais de 1 ano. O material ainda serve?",
    a: "Sim. O conteúdo cobre a faixa de 6 a 24 meses, com receitas, cardápios e exemplos de texturas para as fases posteriores.",
  },
  { q: "O material é indicado dos 6 aos 24 meses?", a: "Sim, essa é a faixa contemplada pelo conteúdo." },
  {
    q: "Preciso saber cozinhar?",
    a: "Não. As receitas usam ingredientes simples e passos objetivos, pensados para o dia a dia.",
  },
  { q: "É um produto físico ou digital?", a: "É 100% digital. Nada é enviado pelos Correios." },
  {
    q: "Como recebo o acesso?",
    a: "Após a confirmação do pagamento, o acesso é enviado para o e-mail informado no checkout.",
  },
  { q: "O pagamento é único?", a: "Sim. É um pagamento único, sem assinatura ou renovação." },
  { q: "Por quanto tempo terei acesso?", a: "O acesso ao material é vitalício." },
  {
    q: "O material substitui pediatra ou nutricionista?",
    a: "Não. O conteúdo é educativo e não substitui a avaliação individual do profissional que acompanha o seu bebê.",
  },
  {
    q: "Como funciona a garantia?",
    a: "Você tem 15 dias para conhecer o material. Caso não fique satisfeita, pode solicitar o reembolso dentro do prazo informado.",
  },
  {
    q: "Qual a diferença entre Essencial e Kit Completo?",
    a: "A Essencial traz o Guia de Introdução Alimentar e 30 receitas. O Kit Completo acrescenta o acervo de receitas, papinhas, o mini guia Super Papinhas + BLW, cardápio semanal, lista de compras e o guia de variedade alimentar.",
  },
];

function Faq() {
  return (
    <section className="bg-muted/40 py-14 sm:py-20">
      <div className="container-page mx-auto max-w-2xl">
        <h2 className="text-center font-serif text-3xl sm:text-4xl">Perguntas frequentes</h2>
        <div className="mt-8 space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-border bg-card px-5 py-4">
              <summary className="cursor-pointer list-none text-base font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {f.q}
              </summary>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────  16 · CTA final  ────────────────────────── */

function CtaFinal() {
  return (
    <section className="container-page py-14 text-center sm:py-20">
      <h2 className="mx-auto max-w-[24ch] font-serif text-3xl sm:text-4xl">
        Comece hoje com as refeições do seu bebê organizadas
      </h2>
      <p className="mt-3 text-base text-muted-foreground">Kit Completo: 6x de R$ 4,65 ou R$ 27,90 à vista</p>
      <BuyLink plan="completo" className="mt-6 bg-cta text-cta-foreground hover:brightness-105">
        QUERO O KIT COMPLETO
      </BuyLink>
      <p className="mt-3 text-sm text-muted-foreground">Acesso imediato • Pagamento único • 15 dias de garantia</p>
    </section>
  );
}

/* ──────────────────────────  17 · Rodapé  ────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-border bg-card pb-28 pt-10 sm:pb-10">
      <div className="container-page text-center">
        <img src={logoImg} alt="NutriBaby" width={132} height={36} loading="lazy" className="mx-auto h-8 w-auto" />
        <p className="mx-auto mt-4 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
          Conteúdo educativo sobre organização da alimentação infantil. Não substitui a avaliação individual do
          pediatra ou nutricionista responsável pelo seu bebê.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} NutriBaby. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

/* ──────────────────────────  CTA fixo mobile  ────────────────────────── */

function MobileStickyCta() {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center gap-3 px-4 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold">Kit Completo — R$ 27,90</p>
          <p className="truncate text-[11px] text-muted-foreground">Acesso imediato · 15 dias de garantia</p>
        </div>
        <BuyLink plan="completo" className="min-h-[44px] bg-cta px-5 text-sm text-cta-foreground">
          QUERO ACESSAR
        </BuyLink>
        <button
          type="button"
          onClick={() => setClosed(true)}
          aria-label="Fechar barra de oferta"
          className="flex h-11 w-8 items-center justify-center text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
