import { useEffect, useState } from 'react';
import { requestMonthlyArea } from '../lib/cleaningStats';

/** Shared completed-work aggregate, not a city-specific or date-generated counter. */
export default function MonthlyCleaningBadge() {
  const [area, setArea] = useState<number | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;
    const timer = window.setTimeout(() => controller.abort(), 8000);
    requestMonthlyArea(controller.signal)
      .then(value => { if (mounted) setArea(value); })
      .catch(() => { if (mounted) setUnavailable(true); })
      .finally(() => window.clearTimeout(timer));
    return () => { mounted = false; window.clearTimeout(timer); controller.abort(); };
  }, []);

  return (
    <div className="absolute -bottom-5 left-3 max-w-[calc(100%_-_1.5rem)] rounded-2xl bg-white p-5 shadow-card sm:-left-5" data-monthly-cleaning-badge>
      <div className="text-[11px] font-semibold uppercase tracking-widest2 text-emerald">убрано в этом месяце</div>
      <div className="mt-1 text-2xl font-bold text-graphite" aria-live="polite" aria-busy={area === null && !unavailable}>
        {area === null ? '—' : area.toLocaleString('ru-RU')} м²
      </div>
      {area === null && <div className="mt-1 text-xs text-ink/55" role="status">{unavailable ? 'Данные временно недоступны' : 'Загружаем статистику…'}</div>}
    </div>
  );
}
