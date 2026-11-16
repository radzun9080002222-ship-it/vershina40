import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import vm from 'node:vm';
const statsSource = readFileSync('src/lib/cleaningStats.ts', 'utf8');
const compiled = ts.transpileModule(statsSource, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { parseMonthlyArea, moscowMonth, requestMonthlyArea, MAX_STATS_AGE_MS } = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));

const now = Date.parse('2026-11-16T09:00:00Z');
const valid = { month: '2026-11', area: 954, updatedAt: '2026-11-16T05:00:00Z', scope: 'all-cities' };
assert.equal(parseMonthlyArea(valid, now), 954);
assert.equal(parseMonthlyArea({ ...valid, area: 0 }, now), 0);
for (const payload of [null, {}, { ...valid, area: -1 }, { ...valid, area: NaN }, { ...valid, area: Infinity }, { ...valid, area: '954' }, { ...valid, scope: 'city' }, { ...valid, month: '2026-10' }, { ...valid, updatedAt: 'bad' }, { ...valid, updatedAt: new Date(now - MAX_STATS_AGE_MS - 1).toISOString() }, { ...valid, updatedAt: new Date(now + 60001).toISOString() }]) assert.equal(parseMonthlyArea(payload, now), null);
assert.equal(moscowMonth(Date.parse('2026-11-30T21:01:00Z')), '2026-12');
const hero = readFileSync('src/components/Hero.tsx', 'utf8');
const badge = readFileSync('src/components/MonthlyCleaningBadge.tsx', 'utf8');
assert.equal((hero.match(/<MonthlyCleaningBadge\s*\/>/g) || []).length, 1);
assert(!/computeArea|monthsSince|const \[area\]|47 пунктов|приёмка по стандарту/.test(hero));
assert(badge.includes('убрано в этом месяце') && badge.includes('м²'));
assert(!badge.includes('по всем городам'), 'Keep the approved two-line tile');
assert(badge.includes('Данные временно недоступны'));
assert(!badge.includes('hidden') && !badge.includes('md:block'), 'Badge must remain visible on mobile');
const originalFetch = globalThis.fetch;
try {
  globalThis.fetch = async () => ({ ok: false });
  await assert.rejects(requestMonthlyArea(new AbortController().signal));
  globalThis.fetch = async () => ({ ok: true, json: async () => ({}) });
  await assert.rejects(requestMonthlyArea(new AbortController().signal));
  globalThis.fetch = async () => { throw new Error('Network unavailable'); };
  await assert.rejects(requestMonthlyArea(new AbortController().signal));
} finally { globalThis.fetch = originalFetch; }

// Exercise the real component's effect/render without a browser or network.
const badgeJs = ts.transpileModule(badge, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
async function renderScenario(value, fail = false) {
  const slots = []; let cursor = 0; let effect;
  const exports = {};
  const jsx = (type, props) => ({ type, props });
  const context = {
    exports, AbortController,
    window: { setTimeout: () => 1, clearTimeout: () => {} },
    require: name => {
      if (name === 'react') return { useState: initial => { const i = cursor++; if (!(i in slots)) slots[i] = initial; return [slots[i], next => { slots[i] = next; }]; }, useEffect: cb => { effect = cb; } };
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
      if (name === '../lib/cleaningStats') return { requestMonthlyArea: async () => { if (fail) throw Error('offline'); return value; } };
      throw Error('Unexpected import ' + name);
    },
  };
  vm.runInNewContext(badgeJs, context);
  const render = () => { cursor = 0; return exports.default(); };
  const flatten = node => node == null || node === false ? '' : typeof node === 'object' ? Array.isArray(node) ? node.map(flatten).join('') : flatten(node.props.children) : String(node);
  const initial = render(); assert(flatten(initial).includes('— м²')); assert(!flatten(initial).includes('47 пунктов'));
  const cleanup = effect();
  await new Promise(resolve => setImmediate(resolve));
  const text = flatten(render()); cleanup();
  return text;
}
assert((await renderScenario(954)).includes('954 м²'));
assert((await renderScenario(0)).includes('0 м²'));
assert((await renderScenario(null, true)).includes('Данные временно недоступны'));
console.log('Hero statistics passed: valid/zero/stale/month/scope/invalid/error; no fabricated count; mobile badge retained');
