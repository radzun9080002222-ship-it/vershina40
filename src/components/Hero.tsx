import { Phone } from "lucide-react";
import { PHONE_HREF } from "../data";
import Messengers from "./Messengers";
import MonthlyCleaningBadge from "./MonthlyCleaningBadge";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pt-[72px]">
      <div className="container-x grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-emerald/40" />
            <span className="text-base font-bold uppercase tracking-widest2 text-emerald">Вершина</span>
            <span className="h-px w-8 bg-emerald/40" />
          </div>
          <h1 className="text-[17vw] font-bold leading-[0.95] tracking-tight text-graphite md:text-[120px]">
            Чисто<span className="text-emerald">.</span>
          </h1>
          <span
            className="mt-1 block leading-[0.8] text-emerald text-[13vw] md:text-[66px]"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            в Калуге
          </span>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70 md:text-xl">
            Доступный клининг в каждую квартиру и дом Калуги.
            Точная цена за 2 минуты — до приезда, а не после.
          </p>
          <div className="mt-9">
            <a href={PHONE_HREF} className="btn-primary">
              Позвонить <Phone size={16} />
            </a>
          </div>
          <Messengers className="mt-5" />
          <dl className="mt-12 flex gap-10 border-t border-black/5 pt-7">
            <div>
              <dt className="text-2xl font-bold text-graphite">47</dt>
              <dd className="mt-1 text-xs text-ink/55">пунктов чек-листа приёмки</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-graphite">48 ч</dt>
              <dd className="mt-1 text-xs text-ink/55">гарантии после уборки</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-graphite">0 ₽</dt>
              <dd className="mt-1 text-xs text-ink/55">доплат на месте</dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <img src="/images/hero-kaluga.webp" alt="Светлая квартира с видом на музей космонавтики и ракету «Восток» в Калуге" className="aspect-[4/5] w-full rounded-3xl object-cover" fetchPriority="high" />
          <MonthlyCleaningBadge />
        </div>
      </div>
    </section>
  );
}
