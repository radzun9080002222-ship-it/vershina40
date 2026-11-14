import { useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { TARIFFS, MAX_LINK, PHONE_HREF } from "../data";

import { calculateVisit } from "../pricing";

const fmt = (n: number) => n.toLocaleString("ru-RU");

export default function Calculator() {
  const [area, setArea] = useState(60);
  const [tariffId, setTariffId] = useState("regular");
  const [rateOptionId, setRateOptionId] = useState("standard");
  const tariff = TARIFFS.find((t) => t.id === tariffId);
  const rateOption = tariff?.rateOptions?.find((option) => option.id === rateOptionId);
  const rate = tariff?.rate ?? rateOption?.rate ?? null;
  const price = calculateVisit(rate && area > 0 ? [rate * area] : []);

  return (
    <section id="calc" className="bg-graphite py-20 text-white md:py-28">
      <div className="container-x grid min-w-0 gap-12 lg:grid-cols-2">
        <div>
          <div className="kicker">Калькулятор</div>
          <h2 className="mt-3 text-3xl font-semibold leading-snug md:text-4xl">
            Узнайте цену сейчас.
            <br />
            <span className="text-white/50">Без звонков и «менеджер свяжется».</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/60">
            Это финальная цена, а не приманка. Фиксируем её до приезда команды —
            на месте она не вырастет.
          </p>
        </div>

        <div className="min-w-0 rounded-3xl bg-white/[0.06] p-7 backdrop-blur md:p-9">
          <div className="flex flex-wrap gap-2">
            {TARIFFS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTariffId(t.id); }}
                aria-pressed={t.id === tariffId}
                className={`max-w-full whitespace-normal rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                  t.id === tariffId ? "bg-emerald text-white" : "bg-white/10 text-white/70 hover:bg-white/15"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {tariff?.rateOptions && (
            <div className="mt-6">
              <div className="mb-2 text-sm text-white/60">Тип остекления</div>
              <div className="flex flex-wrap gap-2">
                {tariff.rateOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setRateOptionId(option.id)}
                    aria-pressed={option.id === rateOptionId}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                      option.id === rateOptionId
                        ? "border-emerald bg-emerald/15 text-white"
                        : "border-white/10 bg-white/[0.04] text-white/65 hover:bg-white/[0.08]"
                    }`}
                  >
                    <span className="block font-semibold">{option.name}</span>
                    <span className="mt-0.5 block text-xs text-white/50">{fmt(option.rate)} ₽/м²</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <div className="flex items-baseline justify-between">
              <label htmlFor="area" className="text-sm text-white/60">
                Площадь помещения
              </label>
              <span className="text-xl font-bold">{area} м²</span>
            </div>
            <input
              id="area"
              type="range"
              min={25}
              max={250}
              step={5}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="mt-3 w-full accent-emerald"
            />
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            {price ? (
              <>
                <div className="text-sm text-white/55">Стоимость · {tariff?.duration}</div>
                <div className="mt-1 text-4xl font-bold text-white">{fmt(price)} ₽</div>
                <div className="mt-2 text-xs text-white/40">
                  {fmt(rate!)} ₽/м²
                   · минимум выезда 6 000 ₽ на всю сумму услуг
                </div>
              </>
            ) : (
              <>
                <div className="text-sm text-white/55">Выберите вид уборки</div>
                <div className="mt-1 text-2xl font-bold text-white">0 ₽</div>
              </>
            )}
            <button type="button" className="mt-4 text-xs text-white/60 underline" onClick={() => { setTariffId(""); setArea(25); setRateOptionId("standard"); }}>Очистить расчёт</button>
            {price > 0 && <>
              <a href={MAX_LINK} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full justify-center">Забронировать в MAX <ArrowRight size={16} /></a>
              <a href={PHONE_HREF} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"><Phone size={16} /> Позвонить</a>
              <p className="mt-4 text-center text-[11px] text-white/50">Оплата — после приёмки работы.</p>
            </>}
          </div>
        </div>
      </div>
    </section>
  );
}
