import { cta } from "@/content/site";
import { Heading } from "@/components/ui/Heading";
import { Mono } from "@/components/ui/Mono";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { site } from "@/content/site";
import Link from "next/link";

/** Крупный финальный CTA: прямой телефон и WhatsApp компании. */
export function CtaForm({ source = "Форма внизу страницы", id = "request" }: { source?: string; id?: string }) {
  return (
    <SectionCard tone="graphite" id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 lg:!py-24">
      <Heading id={`${id}-title`} lines={cta.lines} cascade />
      <Reveal self delay={0.15} className="mt-6 max-w-xl text-[17px] text-on-dark-muted">
        <p>{cta.subtitle}</p>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal self className="flex flex-col items-start gap-5 lg:col-span-7">
          <a href={site.contacts.phoneHref} className="t-h3 text-on-dark">{site.contacts.phone}</a>
          <Link href={site.contacts.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center rounded-full bg-accent px-7 font-semibold text-ink transition-transform hover:-translate-y-0.5">Написать в WhatsApp ↗</Link>
        </Reveal>

        <Reveal className="lg:col-span-4 lg:col-start-9">
          <p data-reveal className="t-eyebrow mb-6 !text-on-dark-muted">Чтобы обсудить задачу</p>
          <ol className="border-t border-on-dark/15">
            {cta.after.map((step, i) => (
              <li key={step.text} data-reveal className="flex gap-5 border-b border-on-dark/15 py-5">
                <Mono className="w-6 shrink-0 !text-[13px] text-on-dark/55">{String(i + 1).padStart(2, "0")}</Mono>
                <span className="flex-1 text-[16px]">{step.text}</span>
                <Mono className="shrink-0 !text-[13px] text-on-dark/75">{step.term}</Mono>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </SectionCard>
  );
}
