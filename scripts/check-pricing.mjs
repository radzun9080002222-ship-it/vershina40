import assert from 'node:assert/strict';
import {TARIFFS} from '../src/data.ts';
import {calculateVisit, createQuote} from '../src/pricing.ts';
const expected=[150,230,280,370,450,410,500];
assert.equal(TARIFFS.length,5);
assert.deepEqual(TARIFFS.flatMap(t=>t.rateOptions?t.rateOptions.map(o=>o.rate):[t.rate]),expected);
for(const t of TARIFFS){
 assert.equal(t.minPrice,6000);
 for(const option of t.rateOptions??[{name:undefined,rate:t.rate}])for(const area of [0,1,25,40,60,100,250]){
  const total=calculateVisit(area?[option.rate*area]:[]);
  assert.equal(total,area?Math.max(6000,option.rate*area):0);
  const quote=createQuote(t.name,option.name,area,option.rate,total);
  assert(quote.includes(t.name));if(option.name)assert(quote.includes(option.name));
  assert(quote.includes(option.rate+' ₽/м²'));assert(quote.includes(total.toLocaleString('ru-RU')+' ₽'));
 }
}
assert.equal(calculateVisit([]),0);assert.equal(calculateVisit([0]),0);
assert.equal(calculateVisit([4500]),6000);assert.equal(calculateVisit([4500,2000]),6500);
assert.equal(calculateVisit([1000,2000]),6000);assert.equal(calculateVisit([9000,1000]),10000);
assert.throws(()=>calculateVisit([-1]));assert.throws(()=>calculateVisit([NaN]));
console.log('Pricing: 7 tariff/window variants × 7 areas, quote, empty and whole-visit minimum passed');
