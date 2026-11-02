import Image from "next/image";
import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { buildMetadata } from "@/lib/seo";

const p = pages.works;
const photos = [
  { src: "/images/industry/facade-worker.jpg", alt: "Специалист работает у фасадного остекления на высоте", title: "Работа с остеклением на высоте" },
  { src: "/images/industry/glass-worker.jpg", alt: "Высотный специалист снаружи здания у фасада", title: "Канатный доступ к фасаду" },
  { src: "/images/industry/glass-building.jpg", alt: "Современное здание с фасадным остеклением", title: "Фасад и панорамное остекление" },
  { src: "/images/industry/client-gallery-building-evening.jpg", alt: "Здание с внешней подсветкой в вечернее время", title: "Фасад здания вечером" },
  { src: "/images/industry/client-gallery-building-facade.jpg", alt: "Фасад высотного здания с окнами и облицовкой", title: "Фасад и оконные проёмы" },
  { src: "/images/industry/client-gallery-facade-glass.jpg", alt: "Высотное здание с панорамным остеклением", title: "Остеклённый фасад" },
  { src: "/images/industry/client-gallery-rope-worker.jpg", alt: "Специалист работает на высоте у фасада здания", title: "Высотные работы у фасада" },
  { src: "/images/industry/client-gallery-window-cleaning.jpg", alt: "Очистка фасадного остекления на высоте", title: "Работа с фасадным остеклением" },
  { src: "/images/industry/client-gallery-building-aerial.jpg", alt: "Современный жилой комплекс с высоты", title: "Здание и прилегающая территория" },
  { src: "/images/industry/client-gallery-facade-worker.jpg", alt: "Специалист на подвесной системе у фасада", title: "Работа на фасаде" },
  { src: "/images/industry/client-gallery-facade-install.jpg", alt: "Монтажные работы у наружных элементов здания", title: "Монтаж у фасадной системы" },
];

export const metadata: Metadata = buildMetadata({ title: p.title, description: p.description, path: "/works" });

export default function WorksPage() {
  return (
    <>
      <PageHero eyebrow={p.eyebrow} lines={p.lines} lead={p.lead} image={p.image} alt={p.alt} crumbs={[{ name: "Фото", path: "/works" }]} />
      <SectionCard tone="surface" aria-label="Фотографии фасадов и высотных работ">
        <Reveal as="ul" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <li key={photo.src} data-reveal="tilt" className="group overflow-hidden rounded-[var(--radius-card)] bg-surface-2">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" priority={index === 0} />
              </div>
              <p className="px-5 py-4 text-[15px] font-medium">{photo.title}</p>
            </li>
          ))}
        </Reveal>
        <p className="mt-8 max-w-3xl text-[14px] leading-relaxed text-ink-muted">Фотографии предоставлены в материалах компании. Названия объектов, заказчики и состав выполненных работ не указаны.</p>
      </SectionCard>
      <CtaBand source="Страница фото" />
    </>
  );
}
