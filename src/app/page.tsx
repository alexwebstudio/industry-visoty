import type { Metadata } from "next";
import { CtaForm } from "@/components/home/CtaForm";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { TrustBento } from "@/components/home/TrustBento";
import { pages } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({ title: pages.home.title, description: pages.home.description, path: "/" }),
  title: { absolute: pages.home.title },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Services />
      <TrustBento />
      <Process />
      <Faq />
      <CtaForm />
    </>
  );
}
