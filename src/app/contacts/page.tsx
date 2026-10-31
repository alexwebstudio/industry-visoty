import Link from "next/link";
import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { site } from "@/content/site";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { buildMetadata } from "@/lib/seo";

const p = pages.contacts;
export const metadata: Metadata = buildMetadata({ title: p.title, description: p.description, path: "/contacts" });

export default function ContactsPage() {
  return (
    <>
      <PageHero eyebrow={p.eyebrow} lines={p.lines} lead={p.lead} image={p.image} alt={p.alt} crumbs={[{ name: "Контакты", path: "/contacts" }]} />
      <SectionCard tone="surface" aria-label="Контактная информация">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="t-eyebrow mb-5">Индустрия высоты</p>
            <h2 className="t-h2">Обсудим задачу</h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink-muted">Позвоните и расскажите о фасаде, остеклении или высотной задаче. Для первичного обсуждения полезно подготовить фото участка и примерный объём.</p>
          </div>
          <Reveal as="ul" className="hair-grid sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            <li data-reveal className="flex gap-4 bg-surface py-7 sm:px-6 sm:pl-0">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line"><Icon name="phone" size={20} /></span>
              <span><span className="t-caption block text-ink-muted">Телефон</span><a href={site.contacts.phoneHref} className="t-mono link-underline mt-1.5 inline-block pb-0.5 !text-[16px]">{site.contacts.phone}</a></span>
            </li>
            <li data-reveal className="flex gap-4 bg-surface py-7 sm:px-6">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line"><Icon name="whatsapp" size={20} /></span>
              <span><span className="t-caption block text-ink-muted">Город</span><span className="mt-1.5 block text-[16px]">{site.city}</span></span>
            </li>
          </Reveal>
        </div>
        <Link href={site.contacts.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex min-h-14 items-center gap-3 rounded-full bg-graphite px-7 text-on-dark transition-colors hover:bg-graphite-2">
          Написать в WhatsApp <span aria-hidden>↗</span>
        </Link>
      </SectionCard>
      <CtaBand source="Страница контактов" />
    </>
  );
}
