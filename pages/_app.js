import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import "../styles/globals.css";
import ContactWidget from "../components/ContactWidget";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Script from "next/script";

const ORIGIN = "https://black-and-white-website.vercel.app";

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

  return (
    <>
      {/* Canonical for every page */}
      <Head>
        <link rel="canonical" href={canonical} />
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
