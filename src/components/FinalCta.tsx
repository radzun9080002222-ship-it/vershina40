import { PHONE, PHONE_HREF, MAX_LINK } from "../data";
import Messengers from "./Messengers";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-mist py-24 md:py-32">
      <img
        src="./images/mountain-relief.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-full opacity-80"
        style={{ maskImage: "linear-gradient(to left, black 35%, transparent)", WebkitMaskImage: "linear-gradient(to left, black 35%, transparent)" }}
        loading="lazy"
        decoding="async"
      />
      <div className="container-x relative text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-snug text-graphite md:text-5xl">
          Чистота, в которую
          <br />приятно возвращаться.
        </h2>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href={MAX_LINK} target="_blank" rel="noreferrer" className="btn-primary">Написать в MAX</a>
          <a href={PHONE_HREF} className="rounded-full border border-graphite/25 px-7 py-3.5 text-sm font-semibold text-graphite transition hover:border-emerald hover:text-emerald">Позвонить</a>
        </div>
        <Messengers className="mt-6 justify-center" items={["tg", "wa"]} />
        <a href={PHONE_HREF} className="mt-6 block text-sm font-semibold text-ink/60 hover:text-emerald">или по телефону: {PHONE}</a>
      </div>
    </section>
  );
}
