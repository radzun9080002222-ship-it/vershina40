const prices = [
  { service: "Влажная уборка", rate: "160 ₽/м²", minimum: "от 6 000 ₽" },
  { service: "Генеральная уборка", rate: "250 ₽/м²", minimum: "от 9 000 ₽" },
  { service: "После ремонта", rate: "300 ₽/м²", minimum: "от 12 000 ₽" },
  { service: "Под ключ", rate: "от 450 ₽/м²", minimum: "от 12 000 ₽" },
];

export default function SeoCopy() {
  return (
    <section aria-labelledby="kaluga-cleaning-title" className="bg-mist py-16 md:py-20">
      <div className="container-x grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <div className="kicker">Клининг в Калуге</div>
          <h2 id="kaluga-cleaning-title" className="mt-3 text-3xl font-semibold leading-snug text-graphite md:text-4xl">
            Уборка квартир и домов с понятной ценой
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-ink/65">
            «Вершина» выполняет влажную и генеральную уборку, клининг после ремонта
            и комплексную уборку под ключ в Калуге. Мы привозим оборудование и
            профессиональные средства, работаем по чек-листу и заранее фиксируем стоимость.
          </p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-ink/65">
            Расчёт в калькуляторе начинается с 25 м². Для уборки под ключ цена зависит
            от типа окон: стандартные — 450 ₽/м², панорамные — 550 ₽/м².
          </p>
        </div>

        <dl className="grid gap-px overflow-hidden rounded-3xl bg-black/10 sm:grid-cols-2">
          {prices.map((item) => (
            <div key={item.service} className="bg-white p-6">
              <dt className="text-sm font-semibold text-graphite">{item.service}</dt>
              <dd className="mt-3 text-2xl font-bold text-emerald">{item.rate}</dd>
              <dd className="mt-1 text-xs text-ink/50">минимальный заказ {item.minimum}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
