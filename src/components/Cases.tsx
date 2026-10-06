import { useState } from "react";
import { CASES } from "../data";

function BeforeAfter({ before, after, alt }: { before: string; after: string; alt: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl">
      <img src={after} alt={`${alt} — после`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
      <img
        src={before}
        alt={`${alt} — до`}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }} />
      <div
        className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[10px] font-bold text-graphite shadow-lg"
        style={{ left: `${pos}%` }}
      >
        ⇄
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Сравнить до и после"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
      <span className="absolute left-3 top-3 rounded-full bg-graphite/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">до</span>
      <span className="absolute right-3 top-3 rounded-full bg-emerald px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">после</span>
    </div>
  );
}

export default function Cases() {
  return (
    <section id="cases" className="bg-mist py-20 md:py-28">
      <div className="container-x">
        <div className="kicker">Результаты</div>
        <h2 className="mt-3 text-3xl font-semibold text-graphite md:text-4xl">Двигайте ползунок.</h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-ink/60">
          Визуализации результата уборки. Изображения созданы с помощью ИИ, это не фотографии выполненных заказов. Состав работ и время заранее фиксируем под ваш объект.
        </p>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {CASES.map((c) => (
            <article key={c.title + c.place}>
              <BeforeAfter before={c.before} after={c.after} alt={c.title} />
              <h3 className="mt-5 text-base font-semibold text-graphite">{c.title}</h3>
              <div className="mt-1 text-sm text-ink/55">{c.place}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.facts.map((f) => (
                  <span key={f} className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-ink/65">{f}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
