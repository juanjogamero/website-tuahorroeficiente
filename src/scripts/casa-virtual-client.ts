import {rooms,virtualDevices,deviceById,defaultValues,evaluateVirtualDevice,formatEur,formatNumber,type DeviceId,type RoomId,type ScenarioResult} from '../lib/casa-virtual';

const app=document.querySelector<HTMLElement>('[data-virtual-app]');
if(app){
  const q=<T extends Element>(selector:string)=>document.querySelector<T>(selector);
  const title=q<HTMLElement>('[data-virtual-title]');
  const description=q<HTMLElement>('[data-virtual-description]');
  const category=q<HTMLElement>('[data-virtual-category]');
  const fields=q<HTMLElement>('[data-virtual-fields]');
  const form=q<HTMLFormElement>('[data-virtual-form]');
  const error=q<HTMLElement>('[data-virtual-error]');
  const currentCost=q<HTMLElement>('[data-virtual-current]');
  const altCost=q<HTMLElement>('[data-virtual-alt]');
  const difference=q<HTMLElement>('[data-virtual-difference]');
  const explanation=q<HTMLElement>('[data-virtual-explanation]');
  const recommendation=q<HTMLElement>('[data-virtual-recommendation]');
  const learn=q<HTMLAnchorElement>('[data-virtual-learn]');
  const buttons=q<HTMLElement>('[data-virtual-device-switch]');
  const save=q<HTMLButtonElement>('[data-virtual-save]');
  const planCount=q<HTMLElement>('[data-virtual-plan-count]');
  const planTotal=q<HTMLElement>('[data-virtual-plan-total]');
  const planList=q<HTMLElement>('[data-virtual-plan-list]');
  const barCurrent=q<HTMLElement>('[data-virtual-bar-current]');
  const barAlt=q<HTMLElement>('[data-virtual-bar-alt]');
  const status=q<HTMLElement>('[data-virtual-scene-status]');
  const stage=q<HTMLElement>('[data-virtual-canvas]');
  const fallback=q<HTMLElement>('[data-virtual-fallback]');
  const immersive=q<HTMLButtonElement>('[data-virtual-immersive]');
  const values:Record<DeviceId,Record<string,number>>=Object.fromEntries(virtualDevices.map(device=>[device.id,defaultValues(device)])) as Record<DeviceId,Record<string,number>>;
  const selected=new Set<DeviceId>();
  let active:DeviceId='radiador';
  let currentRoom:RoomId='salon';
  let viewer:Awaited<ReturnType<typeof import('./casa-virtual-3d').createVirtualScene>>|null=null;
  const preferredReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderPlan=()=>{
    if(planCount)planCount.textContent=String(selected.size);
    let total=0;
    const entries:[string,number][]=[];
    for(const device of virtualDevices){
      if(!selected.has(device.id))continue;
      try{
        const diff=evaluateVirtualDevice(device.id,values[device.id]).differenceAnnual;
        total+=diff;
        entries.push([device.label,diff]);
      }catch{
        entries.push([device.label,Number.NaN]);
      }
    }
    if(planTotal)planTotal.textContent=entries.some(([,v])=>!Number.isFinite(v))?'Revisa los datos':formatEur(total);
    if(planList){
      planList.replaceChildren();
      if(!entries.length){
        const empty=document.createElement('p');
        empty.textContent='Selecciona un aparato en la casa y añádelo a tu plan.';
        planList.append(empty);
      }else{
        entries.forEach(([label,value])=>{
          const row=document.createElement('div');row.className='ta-vr-plan-item';
          const name=document.createElement('span');name.textContent=label;
          const amount=document.createElement('b');amount.textContent=Number.isFinite(value)?formatEur(value):'Revisar';
          row.append(name,amount);planList.append(row);
        });
      }
    }
  };
  const renderValues=()=>{
    const device=deviceById(active);if(!device)return;
    try{
      const result:ScenarioResult=evaluateVirtualDevice(active,values[active]);
      if(error){error.hidden=true;error.textContent='';}
      for(const input of form?.querySelectorAll<HTMLInputElement>('input')??[])input.removeAttribute('aria-invalid');
      if(currentCost)currentCost.textContent=formatEur(result.currentAnnual);
      if(altCost)altCost.textContent=formatEur(result.alternativeAnnual);
      if(difference)difference.textContent=formatEur(result.differenceAnnual);
      if(explanation)explanation.textContent=result.explanation+(result.paybackYears!==undefined ? (result.paybackYears===null?' No existe retorno positivo bajo estos supuestos.':' Retorno simple hipotético: '+formatNumber(result.paybackYears,1)+' años.'):'');
      if(recommendation)recommendation.textContent=device.recommendation;
      const max=Math.max(result.currentAnnual,result.alternativeAnnual,0.0001);
      if(barCurrent)barCurrent.style.width=Math.max(0,result.currentAnnual/max*100)+'%';
      if(barAlt)barAlt.style.width=Math.max(0,result.alternativeAnnual/max*100)+'%';
      viewer?.setInformation(device.label,result.differenceAnnual);
    }catch(exc){
      const text=exc instanceof Error?exc.message:'Revisa los valores del escenario.';
      if(error){error.hidden=false;error.textContent=text;}
      if(difference)difference.textContent='—';
      if(currentCost)currentCost.textContent='—';
      if(altCost)altCost.textContent='—';
      for(const input of form?.querySelectorAll<HTMLInputElement>('input')??[]){
        const field=device.fields.find(x=>x.key===input.name);
        if(field&&(input.valueAsNumber<field.min||input.valueAsNumber>field.max||!Number.isFinite(input.valueAsNumber)))input.setAttribute('aria-invalid','true');
      }
    }
    renderPlan();
  };
  const createFields=(id:DeviceId)=>{
    const device=deviceById(id);if(!device||!fields)return;
    fields.replaceChildren();
    for(const field of device.fields){
      const label=document.createElement('label');label.className='ta-vr-field';
      const name=document.createElement('span');name.textContent=field.label;
      const unit=document.createElement('small');unit.textContent=field.unit;name.append(unit);
      const input=document.createElement('input');input.type='number';input.inputMode='decimal';
      input.name=field.key;input.value=String(values[id][field.key]);input.min=String(field.min);input.max=String(field.max);input.step=String(field.step);
      const hint=document.createElement('small');hint.textContent=field.hint;hint.id='vr-help-'+id+'-'+field.key;
      input.setAttribute('aria-describedby',hint.id);
      label.append(name,input,hint);fields.append(label);
    }
  };
  const showRoomButtons=()=>{
    for(const roomButton of app.querySelectorAll<HTMLButtonElement>('[data-virtual-room]'))roomButton.setAttribute('aria-pressed',String(roomButton.dataset.virtualRoom===currentRoom));
    if(!buttons)return;
    buttons.replaceChildren();
    virtualDevices.filter(device=>device.room===currentRoom).forEach(device=>{
      const button=document.createElement('button');
      button.type='button';button.dataset.virtualChoose=device.id;
      button.setAttribute('aria-pressed',String(device.id===active));
      button.textContent=device.short;
      const arrow=document.createElement('span');arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';button.append(arrow);
      buttons.append(button);
    });
  };
  const choose=(id:DeviceId,focus=true)=>{
    const device=deviceById(id);if(!device)return;
    active=id;currentRoom=device.room;
    const room=rooms.find(r=>r.id===currentRoom);
    if(title)title.textContent=device.label;
    if(description)description.textContent=device.description;
    if(category)category.textContent=(room?.name??'Hogar').toUpperCase()+' · '+device.short.toUpperCase();
    if(learn)learn.href=device.learnMore;
    createFields(id);showRoomButtons();renderValues();
    if(save){save.setAttribute('aria-pressed',String(selected.has(id)));save.firstChild&&(save.firstChild.textContent=selected.has(id)?'Quitar del plan ':'Añadir este escenario a mi plan ');}
    for(const target of app.querySelectorAll<HTMLButtonElement>('[data-virtual-choose]'))target.setAttribute('aria-pressed',String(target.dataset.virtualChoose===active));
    if(status)status.textContent='Seleccionado: '+device.label+'. Ajusta los valores para comparar alternativas.';
    viewer?.select(id,focus);
  };
  app.addEventListener('click',event=>{
    const button=(event.target as Element).closest<HTMLButtonElement>('button');
    if(!button)return;
    const deviceId=button.dataset.virtualChoose;
    if(deviceId){choose(deviceId as DeviceId);return;}
    const roomId=button.dataset.virtualRoom;
    if(roomId){const first=virtualDevices.find(device=>device.room===roomId);if(first)choose(first.id);return;}
    if(button.matches('[data-virtual-reset-view]')){viewer?.resetCamera();return;}
    if(button.matches('[data-virtual-reset-values]')){const device=deviceById(active);if(device){values[active]=defaultValues(device);createFields(active);renderValues();}return;}
    if(button.matches('[data-virtual-save]')){
      if(selected.has(active))selected.delete(active);else{
        try{evaluateVirtualDevice(active,values[active]);selected.add(active);}
        catch{if(error){error.hidden=false;error.textContent='Corrige los valores antes de guardar el escenario.';}return;}
      }
      button.setAttribute('aria-pressed',String(selected.has(active)));
      button.firstChild&&(button.firstChild.textContent=selected.has(active)?'Quitar del plan ':'Añadir este escenario a mi plan ');
      renderPlan();return;
    }
    if(button.matches('[data-virtual-clear-plan]')){selected.clear();renderPlan();if(save){save.setAttribute('aria-pressed','false');save.firstChild&&(save.firstChild.textContent='Añadir este escenario a mi plan ');}return;}
  });
  form?.addEventListener('input',event=>{
    const input=event.target;
    if(!(input instanceof HTMLInputElement))return;
    values[active][input.name]=input.valueAsNumber;
    renderValues();
  });
  immersive?.addEventListener('click',async()=>{
    if(!viewer)return;
    try{await viewer.enterImmersive();}catch{if(status)status.textContent='No se pudo activar el modo inmersivo. Puedes continuar en vista 3D.';}
  });
  choose(active,false);
  const initialiseView=async()=>{
    if(!stage||viewer)return;
    try{
      const {createVirtualScene}=await import('./casa-virtual-3d');
      viewer=await createVirtualScene(stage,(id:DeviceId)=>choose(id,false),preferredReduced);
      fallback?.setAttribute('hidden','');
      viewer.select(active,false);
      renderValues();
      if(immersive&&await viewer.isImmersiveAvailable())immersive.hidden=false;
      if(status)status.textContent='Maqueta 3D lista. Selecciona un punto luminoso o una estancia.';
    }catch{
      if(status)status.textContent='Vista 3D no disponible en este navegador. Usa las tarjetas de las estancias para seguir explorando.';
    }
  };
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)){observer.disconnect();void initialiseView();}
    },{rootMargin:'250px'});
    const surface=q<HTMLElement>('[data-virtual-stage]');
    if(surface)observer.observe(surface);else void initialiseView();
  }else void initialiseView();
}
