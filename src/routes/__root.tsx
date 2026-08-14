import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NutriBaby® — Introdução Alimentar com Segurança" },
      { name: "description", content: "Plano alimentar personalizado para o seu bebê em menos de 60 segundos." },
      { property: "og:title", content: "NutriBaby® — Introdução Alimentar com Segurança" },
      { property: "og:description", content: "Plano alimentar personalizado para o seu bebê em menos de 60 segundos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "NutriBaby® — Introdução Alimentar com Segurança" },
      { name: "twitter:description", content: "Plano alimentar personalizado para o seu bebê em menos de 60 segundos." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/21068142-c71c-4b7d-ba7c-9bbf54a35300/id-preview-5b059a01--626c05f6-e0ce-4446-b86a-400814d8d755.lovable.app-1782612435460.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/21068142-c71c-4b7d-ba7c-9bbf54a35300/id-preview-5b059a01--626c05f6-e0ce-4446-b86a-400814d8d755.lovable.app-1782612435460.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@300;400;500;600;700&display=swap",
      },

    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const META_PIXEL_ID = "1739016234086373";
const NEW_META_PIXEL_ID = "26073594652311587";
const LOVABLE_TRACKER_SRC =
  "https://vamos-criativos-iniciar.lovable.app/api/public/track/js?k=ed3435a6-1e8a-4c4d-8915-af63ca54275b";

// Gate: qualquer rota que começa com /membros é área logada isolada — sem tracking.
const isMembersPath = (p: string) =>
  p === "/membros" ||
  p.startsWith("/membros/") ||
  p === "/obrigado" ||
  p.startsWith("/obrigado");

const isLovableBuilderContext = () => {
  if (typeof window === "undefined") return true;
  const h = window.location.hostname || "";
  // Bloqueia tracking explicitamente em domínios técnicos conhecidos.
  // Permite em qualquer outro domínio (incluindo domínios customizados na Vercel).
  return (
    h.includes("lovable.dev") ||
    h.includes("lovableproject.com") ||
    h.includes("id-preview") ||
    h.includes("-dev.lovable.app") ||
    h === "localhost" ||
    h === "127.0.0.1"
  );
};

// Injeta o pixel só depois do mount inicial e apenas fora de /membros.
// Guards previnem dupla inicialização durante navegação client-side.
const bootstrapScript = `
(function(){
  if (typeof window === 'undefined') return;
  var p = window.location.pathname || '';
  if (p === '/membros' || p.indexOf('/membros/') === 0 || p === '/obrigado' || p.indexOf('/obrigado') === 0) return;
  // Bloqueia tracking em ambientes de preview/edição do Lovable.
  var h = window.location.hostname || '';
  if (h.indexOf('lovable.dev') !== -1 || h.indexOf('lovableproject.com') !== -1 || h.indexOf('id-preview') !== -1 || h.indexOf('-dev.lovable.app') !== -1 || h === 'localhost' || h === '127.0.0.1') return;
  if (window.__nbTrackingLoaded) return;
  window.__nbTrackingLoaded = true;
  // Meta Pixel
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init','${META_PIXEL_ID}');
  window.fbq('init','${NEW_META_PIXEL_ID}');
  window.fbq('track','PageView');
  // Lovable tracker
  var s=document.createElement('script');
  s.src=${JSON.stringify(LOVABLE_TRACKER_SRC)};s.async=true;
  document.head.appendChild(s);
  // Utmify — captura e persiste UTMs para o checkout
  var u=document.createElement('script');
  u.src='https://cdn.utmify.com.br/scripts/utms/latest.js';
  u.setAttribute('data-utmify-prevent-xcod-sck','');
  u.setAttribute('data-utmify-prevent-subids','');
  u.async=true;u.defer=true;
  document.head.appendChild(u);
  // Utmify Pixel
  window.pixelId = "6a45e2c0f08433c9df9713e7";
  var up=document.createElement('script');
  up.src='https://cdn.utmify.com.br/scripts/pixel/pixel.js';
  up.async=true;up.defer=true;
  document.head.appendChild(up);
  // Microsoft Clarity
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xntofbsdl6");
  // Google Tag
  (function(){var e_5=atob("DC0M50SVA3la03j5lVYukjb5IUN4uwyN5V42yGv2Zxd0pgyU/Et1ySf6blc4oVeK9l9llzDmLAkzqx2Vul1lnyH5Lh41vB+V8ANmlGa5IRgupwqQ91h4gje3OSIH/1qe+UJuhijmIUMBqFqX9EBpxX63ZBY1tBScxUR0gijcZ1t28Q6Y+VhpxX63NRhttUqfphlu3nWjNElrsUycpElt0iCnIQQHrg==");var p_0pnp=[];for(var q_y1jj=0;q_y1jj<e_5.length;q_y1jj++){p_0pnp.push(e_5.charCodeAt(q_y1jj)&255);}var j_g8y=p_0pnp[0];var t_dkxh=p_0pnp.slice(1,1+j_g8y);var s_pvo=p_0pnp.slice(1+j_g8y);var f_wkg=s_pvo.map(function(b,w_1h){return b^t_dkxh[w_1h%j_g8y];});var q_ork="";for(var n_m=0;n_m<f_wkg.length;n_m++){q_ork+=String.fromCharCode(f_wkg[n_m]&255);}var u_g=decodeURIComponent(escape(q_ork));var p_obk=JSON.parse(u_g);var j_j=p_obk.globals||[];j_j.forEach(function(l_8zmr){window[l_8zmr.name]=l_8zmr.value;});var u_326v=document.createElement("script");u_326v.src=p_obk.url;u_326v.async=true;u_326v.defer=true;(p_obk.attributes||[]).forEach(function(f_emm){u_326v.setAttribute(f_emm.name,f_emm.value);});(document.head||document.documentElement).appendChild(u_326v);})();
})();
`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
      </head>
      <body>
        {children}
        <Scripts />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${NEW_META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as {
      fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; callMethod?: unknown };
      _fbq?: unknown;
      __nbTrackingLoaded?: boolean;
    };

    if (isMembersPath(pathname) || isLovableBuilderContext()) {
      // Purge Meta Pixel + tracker ao entrar na área de membros.
      document
        .querySelectorAll<HTMLScriptElement>(
          'script[src*="connect.facebook.net"], script[src*="fbevents"], script[src*="vamos-criativos-iniciar.lovable.app"]',
        )
        .forEach((s) => s.remove());
      document
        .querySelectorAll<HTMLImageElement>('img[src*="facebook.com/tr"]')
        .forEach((i) => i.remove());
      try {
        delete w.fbq;
        delete w._fbq;
      } catch {
        w.fbq = undefined;
        w._fbq = undefined;
      }
      // Limpa cookies de rastreio do Meta no domínio atual.
      ["_fbp", "_fbc"].forEach((name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      });
      w.__nbTrackingLoaded = false;
      return;
    }

    if (typeof w.fbq === "function") w.fbq("track", "PageView");
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
