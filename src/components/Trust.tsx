import { TRUST } from "../data";

export default function Trust() {
  return (
    <section className="bg-white pb-20 md:pb-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative">
        <img src="./images/team-kaluga.webp" alt="Команда клининга «Вершина» в квартире в Калуге" className="aspect-[4/3] w-full rounded-3xl object-cover" loading="lazy" decoding="async" />
        </div>
        <div>
          <div className="kicker">Почему нам оставляют ключи</div>
          <h2 className="mt-3 text-3xl font-semibold leading-snug text-graphite md:text-4xl">
            Доверие — это не слоган.
            <br />Это процедуры.
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {TRUST.map((t) => (
              <div key={t.title} className="border-l-2 border-emerald pl-5">
                <h3 className="text-base font-semibold text-graphite">{t.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink/60">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
