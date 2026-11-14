import assert from 'node:assert/strict';
import {TARIFFS} from '../src/data.ts';
import {calculateVisit} from '../src/pricing.ts';
const expected=[150,230,370,450,280,410,500];
assert.equal(TARIFFS.length,5);
assert.deepEqual(TARIFFS.flatMap(t=>t.rateOptions?t.rateOptions.map(o=>o.rate):[t.rate]),expected);
for(const t of TARIFFS){
 assert.equal(t.minPrice,6000);
 for(const option of t.rateOptions??[{name:undefined,rate:t.rate}])for(const area of [0,1,25,40,60,100,250]){
  const total=calculateVisit(area?[option.rate*area]:[]);
  assert.equal(total,area?Math.max(6000,option.rate*area):0);
 }
}
assert.equal(calculateVisit([]),0);assert.equal(calculateVisit([0]),0);
assert.equal(calculateVisit([4500]),6000);assert.equal(calculateVisit([4500,2000]),6500);
assert.equal(calculateVisit([1000,2000]),6000);assert.equal(calculateVisit([9000,1000]),10000);
assert.throws(()=>calculateVisit([-1]));assert.throws(()=>calculateVisit([NaN]));
assert.deepEqual(TARIFFS.map(t=>t.id),["regular","general","facade-general","after-renovation","turnkey"]);
assert.equal(TARIFFS[2].name,'Генеральная уборка с окнами');
const {readFileSync}=await import('node:fs');
const calc=readFileSync('src/components/Calculator.tsx','utf8');
assert(!/textarea|clipboard|copyQuote|cleaning-quote|WhatsApp|WA_LINK/.test(calc));
assert(calc.includes('href={PHONE_HREF}'));assert(calc.includes('Позвонить'));
console.log('Pricing: 7 tariff/window variants × 7 areas, UI order, phone CTA, empty and whole-visit minimum passed');
