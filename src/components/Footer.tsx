import Logo from "./Logo";
import { NAV, PHONE, PHONE_HREF } from "../data";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container-x flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo height={56} />
          <p className="mt-4 font-['Caveat'] text-2xl text-emerald">Мы на высоте в каждой детали.</p>
        </div>
        <nav className="grid grid-cols-2 gap-x-12 gap-y-2.5">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-ink/60 transition hover:text-emerald">{n.label}</a>
          ))}
        </nav>
        <div className="space-y-2.5 text-sm text-ink/70">
          <a href={PHONE_HREF} className="block font-semibold text-graphite hover:text-emerald">{PHONE}</a>
          <span className="block">Калуга · выезд по городу</span>
        </div>
      </div>
      <div className="border-t border-black/5">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink/40 md:flex-row">
          <span>© {new Date().getFullYear()} Вершина. Профессиональный клининг.</span>
          <a href="./privacy.html" className="hover:text-emerald">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}
