// pages/about.js
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AnimatedButton from "../components/AnimatedButton";
import Footer from "../components/Footer";

export default function About() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("aboutTitle")}</title>
        <meta name="description" content={t("aboutTitle")} />
      </Head>

      <main className="container py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">{t("aboutTitle")}</h1>

        <section className="mt-8 card p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">{t("mission")}</h2>
            <p className="text-white/80 mt-1">{t("missionText")}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{t("vision")}</h2>
            <p className="text-white/80 mt-1">{t("visionText")}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{t("values")}</h2>
            <ul className="mt-2 space-y-3">
              <li>
                <p className="text-[var(--gold)] font-semibold">{t("excellence")}</p>
                <p className="text-white/80">{t("excellenceText")}</p>
              </li>
              <li>
                <p className="text-[var(--gold)] font-semibold">{t("discovery")}</p>
                <p className="text-white/80">{t("discoveryText")}</p>
              </li>
              <li>
                <p className="text-[var(--gold)] font-semibold">{t("inspiration")}</p>
                <p className="text-white/80">{t("inspirationText")}</p>
              </li>
              <li>
                <p className="text-[var(--gold)] font-semibold">{t("integrity")}</p>
                <p className="text-white/80">{t("integrityText")}</p>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{t("promise")}</h2>
            <p className="text-white/80 mt-1">{t("promiseText")}</p>
          </div>

          <div className="pt-4">
            <AnimatedButton href="/" variant="outline">{t("backHome")}</AnimatedButton>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
