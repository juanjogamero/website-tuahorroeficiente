/* Filtrado progresivo; todo el catálogo permanece visible sin JS. */
const root=document.querySelector<HTMLElement>('[data-tools-catalog]');
if(root){
 const search=root.querySelector<HTMLInputElement>('[data-tool-search]');
 const buttons=Array.from(root.querySelectorAll<HTMLButtonElement>('[data-catalog-filter]'));
 const items=Array.from(root.querySelectorAll<HTMLElement>('[data-catalog-item]'));
 const count=root.querySelector<HTMLElement>('[data-catalog-count]');
 const reset=root.querySelector<HTMLButtonElement>('[data-catalog-reset]');
 const empty=root.querySelector<HTMLElement>('[data-catalog-empty]');
 const emptyReset=root.querySelector<HTMLButtonElement>('[data-catalog-empty-reset]');
 let current='todos';
 const norm=(s:string)=>s.toLocaleLowerCase('es-ES').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
 function update(){
  const q=norm(search?.value??'');let visible=0;
  for(const item of items){
   const matchesGroup=current==='todos'||(current==='comparativas'?item.dataset.kind==='comparativas':item.dataset.category===current);
   const matchesText=!q||norm(item.dataset.search??'').includes(q);
   item.hidden=!(matchesGroup&&matchesText);
   if(!item.hidden)visible++;
  }
  if(count)count.textContent=String(visible);
  if(empty)empty.hidden=visible!==0;
  if(reset)reset.hidden=current==='todos'&&!q;
  for(const b of buttons)b.setAttribute('aria-pressed',String(b.dataset.catalogFilter===current));
 }
 const clear=()=>{current='todos';if(search)search.value='';update();search?.focus();};
 for(const b of buttons)b.addEventListener('click',()=>{current=b.dataset.catalogFilter??'todos';update();});
 search?.addEventListener('input',update);
 reset?.addEventListener('click',clear);
 emptyReset?.addEventListener('click',clear);
 update();
}
