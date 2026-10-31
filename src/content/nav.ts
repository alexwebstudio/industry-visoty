import { site } from "./site";

export type NavItem = { label: string; href: string };

export const mainNav: (NavItem & { mega?: boolean })[] = [
  { label: "Услуги", href: "/services" },
  { label: "О компании", href: "/about" },
  { label: "Фото", href: "/works" },
  { label: "Контакты", href: "/contacts" },
];

export const mobileNav: NavItem[] = [
  { label: "Главная", href: "/" },
  ...mainNav,
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  { title: "Направления", items: [{ label: "Все услуги", href: "/services" }, { label: "Остекление", href: "/services#osteklenie" }, { label: "Фасад", href: "/services#fasad" }, { label: "Высотные работы", href: "/services#alpinizm" }] },
  { title: "Компания", items: [{ label: "О компании", href: "/about" }, { label: "Фото", href: "/works" }, { label: "Контакты", href: "/contacts" }, { label: "Политика конфиденциальности", href: "/privacy" }] },
];

export const messengers = [
  { label: "WhatsApp", href: site.contacts.whatsapp, icon: "whatsapp" },
] as const;

export const megaMenu = { title: "Направления", text: "Фасадные, стекольные и высотные работы.", hubLabel: "Все услуги →" } as const;
