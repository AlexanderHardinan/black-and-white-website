// pages/contact.js
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Contact() {
  const router = useRouter();

  useEffect(() => {
    const btn = document.querySelector('button[aria-label="Contact Us"]');
    if (btn) btn.click();
    router.replace("/?contact=1", undefined, { shallow: true });
  }, [router]);

  return (
    <>
      <Head>
        <title>Contact | The Culinary World Gazette</title>
        <meta name="description" content="Contact The Culinary World Gazette." />
      </Head>

      <main className="container py-10 sm:py-12 text-white">
        <div className="rounded-3xl border border-white/12 bg-white/5 backdrop-blur overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
          <div className="px-5 sm:px-7 py-5 border-b border-white/10">
            <div className="text-xs text-white/60 tracking-widest uppercase">Contact</div>
          </div>

          <div className="p-5 sm:p-7">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Contact the Gazette
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
              Opening the contact form…
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
