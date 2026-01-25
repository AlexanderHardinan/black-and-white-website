// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import "../styles/globals.css";
import ContactWidget from "../components/ContactWidget";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Script from "next/script";

const ORIGIN = "https://black-and-white-website.vercel.app";
const SITE_NAME = "The Culinary World Gazette";
const DEFAULT_DESC =
  "Discover the best restaurants around the world — guides, reviews, and chef stories.";
const OG_IMAGE = `${ORIGIN}/images/logo.png`;

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const canonical = ORIGIN + (router.asPath?.split("?")[0] || "/");

  // GA4 pageview on route change
  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag?.("config", process.env.NEXT_PUBLIC_GA_ID, { page_path: url });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  // PWA: register service worker
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      } catch {
        // silent fail (no console noise in production)
      }
    };

    register();
  }, []);

  return (
    <>
      {/* Global SEO + PWA + Icons */}
      <Head>
        {/* Canonical */}
        <link rel="canonical" href={canonical} />

        {/* Basic SEO */}
        <meta name="description" content={DEFAULT_DESC} />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />

        {/* Theme / PWA */}
        <meta name="theme-color" content="#0b0e10" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Icons everywhere (uses your logo) */}
        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />

        {/* Open Graph */}
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={SITE_NAME} />
        <meta property="og:description" content={DEFAULT_DESC} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={OG_IMAGE} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_NAME} />
        <meta name="twitter:description" content={DEFAULT_DESC} />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* Structured Data (Website) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              url: ORIGIN,
              description: DEFAULT_DESC,
              publisher: {
                "@type": "Organization",
                name: SITE_NAME,
                logo: {
                  "@type": "ImageObject",
                  url: OG_IMAGE,
                },
              },
            }),
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
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { send_page_view: true });
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
