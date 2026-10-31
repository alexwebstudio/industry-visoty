"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";
import { Input, Textarea } from "@/components/ui/Input";
import { formatPhone, leadSchema, MESSENGERS, messengerLabels, type LeadData, type LeadInput } from "@/lib/validation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { site } from "@/content/site";

type Status = "idle" | "loading" | "success" | "error";

type Props = {
  dark?: boolean;
  source: string;
  submitLabel?: string;
  /** После успеха: редирект на /thanks или сообщение на месте (в модалке). */
  onSuccess?: "redirect" | "inline";
  onDone?: () => void;
};

export function LeadForm({ dark, source, submitLabel = "Продолжить в WhatsApp →", onSuccess = "inline", onDone }: Props) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [whatsAppHref, setWhatsAppHref] = useState("");
  const [serverError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadInput, unknown, LeadData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", phone: "", comment: "", messenger: "call", consent: false, website: "", source },
  });

  const onSubmit = (data: LeadData) => {
    setStatus("loading");
    const message = [
      `Здравствуйте! Меня зовут ${data.name}.`,
      `Телефон для связи: ${data.phone}.`,
      `Предпочтительный способ связи: ${messengerLabels[data.messenger]}.`,
      data.comment ? `Задача: ${data.comment}` : "",
      `Источник: ${data.source ?? source}.`,
    ].filter(Boolean).join("\n");
    const href = `${site.contacts.whatsapp}?text=${encodeURIComponent(message)}`;
    setWhatsAppHref(href);
    setStatus("success");
    window.open(href, "_blank", "noopener,noreferrer");
  };

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-5 py-4">
        <span className={cn("inline-flex size-12 items-center justify-center rounded-full border", dark ? "border-on-dark/40" : "border-line")}>
          <Check size={22} />
        </span>
        <p className="t-h3">Сообщение подготовлено</p>
        <p className={dark ? "text-on-dark-muted" : "text-ink-muted"}>
          Сообщение подготовлено в WhatsApp. Нажмите «Отправить» в приложении, чтобы передать его компании.
        </p>
        <a href={whatsAppHref} target="_blank" rel="noopener noreferrer" className="link-underline pb-0.5 font-medium">Открыть WhatsApp →</a>
        {onDone && (
          <Button variant={dark ? "light" : "dark"} onClick={onDone}>
            Готово
          </Button>
        )}
      </div>
    );
  }

  const id = (name: string) => `${uid}-${name}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5" aria-busy={status === "loading"}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input id={id("name")} label="Имя" autoComplete="name" placeholder="Как к вам обращаться" dark={dark} error={errors.name?.message} {...register("name")} />
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <Input
              id={id("phone")}
              label="Телефон"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 (___) ___-__-__"
              dark={dark}
              error={errors.phone?.message}
              name={field.name}
              ref={field.ref}
              value={field.value}
              onBlur={field.onBlur}
              onChange={(e) => field.onChange(formatPhone(e.target.value))}
            />
          )}
        />
      </div>

      <Textarea
        id={id("comment")}
        label="Проект или комментарий (необязательно)"
        placeholder="Тип фасада, вид работ, объём, район объекта"
        dark={dark}
        error={errors.comment?.message}
        {...register("comment")}
      />

      <fieldset className="flex flex-col gap-3">
        <legend className={cn("mb-3 text-[14px] font-medium", dark ? "text-on-dark/85" : "text-ink")}>Как удобнее связаться</legend>
        <div className="flex flex-wrap gap-2">
          {MESSENGERS.map((m) => (
            <label key={m} className="relative">
              <input type="radio" value={m} className="peer sr-only" {...register("messenger")} />
              <span
                className={cn(
                  "inline-flex h-11 cursor-pointer items-center rounded-full border px-5 text-[15px] font-medium transition-colors duration-300",
                  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
                  dark
                    ? "border-on-dark/25 text-on-dark/85 peer-checked:border-on-dark peer-checked:bg-on-dark peer-checked:text-graphite peer-focus-visible:outline-on-dark"
                    : "border-line text-ink peer-checked:border-graphite peer-checked:bg-graphite peer-checked:text-on-dark peer-focus-visible:outline-graphite",
                )}
              >
                {messengerLabels[m]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Honeypot — скрыт от людей и от скринридеров */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Сайт</label>
        <input id={id("website")} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex cursor-pointer items-start gap-3 text-[14px]">
          <input
            type="checkbox"
            className={cn("mt-0.5 size-5 shrink-0 cursor-pointer", dark ? "accent-on-dark" : "accent-graphite")}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? id("consent-error") : undefined}
            {...register("consent")}
          />
          <span className={dark ? "text-on-dark/80" : "text-ink-muted"}>
            Согласен передать контактные данные компании через WhatsApp после отправки сообщения. Ознакомлен с{" "}
            <Link href="/privacy" className="underline underline-offset-4" target="_blank">
              политикой конфиденциальности
            </Link>
          </span>
        </label>
        {errors.consent && (
          <p id={id("consent-error")} role="alert" className={cn("text-[13px]", dark ? "text-[#f0b9a5]" : "text-[#b3462d]")}>
            {errors.consent.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button type="submit" variant={dark ? "light" : "dark"} size="lg" disabled={status === "loading"}>
          {status === "loading" ? "Подготавливаем…" : submitLabel}
        </Button>
        <p aria-live="polite" className={cn("text-[14px]", status === "error" ? (dark ? "text-[#f0b9a5]" : "text-[#b3462d]") : "sr-only")}>
          {status === "error" ? `${serverError}. Попробуйте ещё раз или напишите нам в мессенджер.` : ""}
        </p>
      </div>
    </form>
  );
}
