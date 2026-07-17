// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";
import ContactWidget from "../components/ContactWidget";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ORIGIN = "https://tcwgazette.com";
const SITE_NAME = "The Culinary World Gazette";
const DEFAULT_TITLE =
  "The Culinary World Gazette | Global Culinary Editorial Publication";
const DEFAULT_DESC =
  "The Culinary World Gazette is a global culinary editorial publication featuring chefs, restaurants, hospitality leaders, culinary journeys, industry insights, and extraordinary gastronomic stories from around the world.";
const OG_IMAGE = `${ORIGIN}/images/logo.png`;

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const pathname = router.asPath?.split(/[?#]/)[0] || "/";
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const canonical = `${ORIGIN}${normalizedPath}`;

  // GA4 pageview on route change
  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag?.("config", process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // PWA: register service worker
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
      } catch {
        // Silent failure to avoid production console noise.
      }
    };

    register();
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsMediaOrganization",
        "@id": `${ORIGIN}/#organization`,
        name: SITE_NAME,
        url: ORIGIN,
        description: DEFAULT_DESC,
        logo: {
          "@type": "ImageObject",
          "@id": `${ORIGIN}/#logo`,
          url: OG_IMAGE,
          contentUrl: OG_IMAGE,
          caption: SITE_NAME,
        },
        image: {
          "@id": `${ORIGIN}/#logo`,
        },
        founder: {
          "@type": "Person",
          name: "Alexander Hardinan",
        },
        publishingPrinciples: ORIGIN,
      },
      {
        "@type": "WebSite",
        "@id": `${ORIGIN}/#website`,
        url: ORIGIN,
        name: SITE_NAME,
        description: DEFAULT_DESC,
        publisher: {
          "@id": `${ORIGIN}/#organization`,
        },
        inLanguage: "en",
      },
    ],
  };

  return (
    <>
      {/* Global SEO, PWA and icons */}
      <Head>
        <title>{DEFAULT_TITLE}</title>

        {/* Canonical */}
        <link rel="canonical" href={canonical} />

        {/* Basic SEO */}
        <meta name="description" content={DEFAULT_DESC} />
        <meta
          name="robots"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />
        <meta
          name="googlebot"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />

        {/* Theme and PWA */}
        <meta name="theme-color" content="#0b0e10" />
        <meta name="application-name" content={SITE_NAME} />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Icons */}
        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />

        {/* Open Graph */}
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={DEFAULT_TITLE} />
        <meta property="og:description" content={DEFAULT_DESC} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:secure_url" content={OG_IMAGE} />
        <meta
          property="og:image:alt"
          content={`${SITE_NAME} official publication logo`}
        />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={DEFAULT_TITLE} />
        <meta name="twitter:description" content={DEFAULT_DESC} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta
          name="twitter:image:alt"
          content={`${SITE_NAME} official publication logo`}
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      {/* GA4 */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />

          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];

              function gtag() {
                window.dataLayer.push(arguments);
              }

              gtag("js", new Date());

              gtag("config", "${process.env.NEXT_PUBLIC_GA_ID}", {
                send_page_view: true
              });
            `}
          </Script>
        </>
      )}

      <Header />
      <Component {...pageProps} />
      <Footer />
      <ContactWidget />
    </>
  );
}