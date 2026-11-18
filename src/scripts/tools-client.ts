import { calculate, parseEs, money, number } from '../lib/calculators';

type CalculatorElement = HTMLElement & { dataset: DOMStringMap };
const formatUnit = (v:number,unit:string)=> unit==='eur'?money(v):`${number(v)} ${unit==='litres'?'L':unit==='m3'?'m³':'kWh'}`;
function init(root:CalculatorElement) {
 const form=root.querySelector<HTMLFormElement>('form');
 if(!form)return;
 const fieldInputs=Array.from(form.querySelectorAll<HTMLInputElement>('input[name]'));
 const error=root.querySelector<HTMLElement>('[data-error]');
 const shareStatus=root.querySelector<HTMLElement>('[data-share-status]');
 const setText=(sel:string,value:string)=>{const el=root.querySelector<HTMLElement>(sel);if(el)el.textContent=value;};
 const update=()=>{
  const data:Record<string,number>={};
  for(const input of fieldInputs){const value=parseEs(input.value);input.removeAttribute('aria-invalid');if(!Number.isFinite(value)){input.setAttribute('aria-invalid','true');input.focus();throw new RangeError(`${input.labels?.[0]?.textContent?.trim()||input.name}: escribe un número válido.`);}data[input.name]=value;}
  const out=calculate(root.dataset.tool??'',data);
  setText('[data-primary]',money(out.primary));setText('[data-primary-label]',out.primaryLabel);
  out.secondary.forEach((item,i)=>setText(`[data-secondary="${i}"]`,formatUnit(item.value,item.unit)));
  if(out.difference!==undefined){setText('[data-difference]',money(out.difference));setText('[data-difference-label]',out.differenceLabel??'Diferencia estimada');}
  setText('[data-note]',out.note);
  if(error){error.hidden=true;error.textContent='';}
  return data;
 };
 form.addEventListener('submit',ev=>{
  ev.preventDefault();
  try {
    update();
    const result = root.querySelector<HTMLElement>('.calculator-result');
    if (result) {
      // En una columna, el resultado está debajo del formulario: llevarlo a la vista.
      // En escritorio preservamos la posición para evitar saltos innecesarios.
      if (window.matchMedia('(max-width: 890px)').matches) {
        result.focus({preventScroll:true});
        result.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
      } else result.scrollIntoView({block:'nearest',behavior:'smooth'});
    }
  } catch(e) {
    if(error){error.hidden=false;error.textContent=e instanceof Error?e.message:'Revisa los valores.';error.scrollIntoView({block:'nearest'});}
  }
 });
 root.querySelector<HTMLButtonElement>('[data-reset]')?.addEventListener('click',()=>{
  for(const i of fieldInputs)i.value=i.dataset.default??'';
  try { history.replaceState(null,'',location.pathname+location.hash); } catch { /* La vista previa local puede restringir History API. */ }
  try{update();}catch{}
  if(shareStatus)shareStatus.textContent='Ejemplo restablecido. Ningún dato se ha guardado.';
 });
 root.querySelector<HTMLButtonElement>('[data-share]')?.addEventListener('click',async()=>{
  try{
   update();const url=new URL(location.href);url.search='';url.hash='';
   for(const i of fieldInputs){url.searchParams.set(i.name,i.value.replaceAll(' ',''));}
   // No se envía ningún dato a un servidor de la web.
   if(navigator.clipboard && window.isSecureContext){await navigator.clipboard.writeText(url.toString());if(shareStatus)shareStatus.textContent='Enlace copiado. Contiene tus valores numéricos en la URL.';}
   else{if(shareStatus)shareStatus.textContent='Enlace para copiar: '+url.toString();}
  }catch(e){if(error){error.hidden=false;error.textContent=e instanceof Error?e.message:'No se ha podido compartir.';}}
 });
 const q=new URL(location.href).searchParams;
 if(fieldInputs.some(i=>q.has(i.name))){for(const i of fieldInputs)if(q.has(i.name))i.value=q.get(i.name)??i.value;try{update();}catch{for(const i of fieldInputs)i.value=i.dataset.default??'';try{update();}catch{}}}
}
document.querySelectorAll<CalculatorElement>('[data-calculator]').forEach(init);
