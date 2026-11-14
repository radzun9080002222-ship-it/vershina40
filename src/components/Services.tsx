import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TARIFFS } from "../data";

const fmt = (n: number) => n.toLocaleString("ru-RU");

export default function Services() {
  const [openId, setOpenId] = useState<string | null>("general");

  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="kicker">Услуги</div>
        <h2 className="mt-3 text-3xl font-semibold text-graphite md:text-4xl">Пять уровней. Один стандарт.</h2>
        <p className="mt-4 max-w-lg text-sm leading-7 text-ink/60">
          Каждая услуга — это конкретный список работ, который вы видите до заказа
          и по которому принимаете результат.
        </p>

        <div className="mt-12 divide-y divide-black/8 border-y border-black/8">
          {TARIFFS.map((t) => {
            const open = openId === t.id;
            return (
              <div key={t.id}>
                <button
                  onClick={() => setOpenId(open ? null : t.id)}
                  className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-4 py-7 text-left transition hover:bg-mist/60 md:grid-cols-[60px_minmax(0,1fr)_220px_40px] md:gap-6"
                >
                  <span className="text-sm font-bold text-emerald">{t.n}</span>
                  <span>
                    <span className="block text-xl font-semibold text-graphite md:text-2xl">{t.name}</span>
                    <span className="mt-1 block text-sm text-ink/55">{t.tagline}</span>
                  </span>
                  <span className="hidden text-right text-lg font-bold text-graphite md:block">
                    {t.rate
                      ? `от ${t.rate} ₽/м²`
                      : t.rateOptions
                        ? `от ${Math.min(...t.rateOptions.map((option) => option.rate))} ₽/м²`
                        : "индивидуально"}
                    <span className="block text-xs font-normal text-ink/45">мин. заказ {t.minPrice ? `${fmt(t.minPrice)} ₽` : "—"}</span>
                  </span>
                  <ChevronDown className={`justify-self-end text-ink/40 transition ${open ? "rotate-180" : ""}`} size={20} />
                </button>
                {open && (
                  <div className="grid gap-x-10 gap-y-2 pb-8 sm:grid-cols-2 lg:grid-cols-3">
                    {t.checklist.map((c) => (
                      <div key={c} className="flex gap-2.5 text-sm leading-6 text-ink/70">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                        {c}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-ink/45">
          Отдельно: химчистка мебели и ковров, офисы. Цена — по запросу.
        </p>
      </div>
    </section>
  );
}
