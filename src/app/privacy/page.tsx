import type { Metadata } from "next";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Heading } from "@/components/ui/Heading";
import { SectionCard } from "@/components/ui/SectionCard";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Политика конфиденциальности",
  description: `Информация о передаче контактных данных компании «${site.name}» через WhatsApp.`,
  path: "/privacy",
});

const sections = [
  { title: "Форма связи", text: "Данные, введённые в форму, используются браузером только для подготовки текста сообщения в WhatsApp. Сайт не отправляет эти поля на собственный сервер и не сохраняет их в своей базе. Сообщение передаётся компании только после нажатия кнопки отправки в WhatsApp." },
  { title: "Какие сведения можно указать", text: "Имя, номер телефона, предпочтительный способ связи и комментарий к задаче. Не указывайте сведения, которые не нужны для обсуждения работ." },
  { title: "Передача в WhatsApp", text: "При открытии WhatsApp пользователь переходит к стороннему сервису. Дальнейшая обработка сообщения регулируется правилами и настройками самого сервиса." },
  { title: "Контакт компании", text: `По вопросам, связанным с обращением, можно связаться по телефону ${site.contacts.phone}.` },
];

export default function PrivacyPage() {
  return (
    <SectionCard tone="surface" className="!pt-[calc(var(--header-h)+40px)]">
      <Breadcrumbs items={[{ name: "Политика конфиденциальности", path: "/privacy" }]} />
      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12">
        <div className="lg:col-span-12"><Heading level="h1" lines={["Политика", "*конфиденциальности*"]} cascade instant /></div>
        <div className="flex flex-col gap-10 lg:col-span-7 lg:col-start-6">
          <p className="border-l-2 border-accent pl-5 text-[15px] leading-relaxed text-ink-muted">Демонстрационный текст. Перед публикацией владелец сайта должен дополнить сведения об операторе персональных данных и проверить документ для фактического способа обработки обращений.</p>
          {sections.map((section, i) => (
            <section key={section.title} className="border-t border-line pt-6">
              <h2 className="t-h3 mb-4"><span className="t-mono mr-3 !text-[13px] text-ink-muted">{String(i + 1).padStart(2, "0")}</span>{section.title}</h2>
              <p className="leading-relaxed text-ink-muted">{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
