import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {rooms,virtualDevices,defaultValues,evaluateVirtualDevice,deviceById} from '../src/lib/casa-virtual.ts';

const get=(path)=>readFileSync(new URL('../src/'+path,import.meta.url),'utf8');
const page=get('pages/casa-virtual/index.astro');
const client=get('scripts/casa-virtual-client.ts');
const scene=get('scripts/casa-virtual-3d.ts');
const layout=get('layouts/BaseLayout.astro');
const head=get('components/Header.astro');

test('seis decisiones y cuatro estancias únicas sin información personal',()=>{
 assert.equal(rooms.length,4);
 assert.equal(virtualDevices.length,6);
 assert.equal(new Set(virtualDevices.map(d=>d.id)).size,6);
 assert.equal(new Set(rooms.map(d=>d.id)).size,4);
 assert.deepEqual(virtualDevices.map(d=>d.room).sort(),['bano','cocina','cocina','dormitorio','salon','salon']);
 for(const d of virtualDevices)assert.ok(d.fields.every(x=>x.defaultValue>=x.min&&x.defaultValue<=x.max));
});

test('radiador: escenarios de termostato condicionales',()=>{
 const r=evaluateVirtualDevice('radiador',defaultValues(deviceById('radiador')));
 assert.ok(Math.abs(r.currentAnnual-86.4)<1e-6);
 assert.ok(Math.abs(r.alternativeAnnual-64.8)<1e-6);
 assert.ok(Math.abs(r.differenceAnnual-21.6)<1e-6);
});
test('standby: W por dispositivos y horas',()=>{
 const r=evaluateVirtualDevice('standby',defaultValues(deviceById('standby')));
 assert.ok(Math.abs(r.currentKwh-78.84)<1e-6);
 assert.ok(Math.abs(r.differenceAnnual-11.826)<1e-6);
});
test('frigorífico: retorno simple como cociente, solo con diferencia positiva',()=>{
 const d=deviceById('frigorifico');
 const r=evaluateVirtualDevice('frigorifico',defaultValues(d));
 assert.equal(r.currentAnnual,72);assert.equal(r.alternativeAnnual,36);
 assert.ok(Math.abs(r.paybackYears-600/36)<1e-7);
 const negative=evaluateVirtualDevice('frigorifico',{...defaultValues(d),newKwh:400});
 assert.ok(negative.differenceAnnual<0);assert.equal(negative.paybackYears,null);
});
test('horno frente a freidora: se cuentan tandas',()=>{
 const d=deviceById('horno');
 const r=evaluateVirtualDevice('horno',defaultValues(d));
 assert.equal(r.currentAnnual,37.44);assert.equal(r.alternativeAnnual,21.84);assert.equal(r.differenceAnnual,15.6);
 const batches=evaluateVirtualDevice('horno',{...defaultValues(d),batches:3});
 assert.ok(batches.differenceAnnual<0);
});
test('ducha: precio variable de agua y saneamiento y energía térmica',()=>{
 const d=deviceById('ducha');
 const r=evaluateVirtualDevice('ducha',defaultValues(d));
 assert.equal(r.currentLitres,26208);assert.equal(r.alternativeLitres,16380);
 assert.ok(r.currentAnnual>0);assert.ok(r.alternativeAnnual>0);
 assert.ok(Math.abs(r.differenceAnnual-r.currentAnnual*3/8)<.001);
});
test('aire: consumo por carga media sin confundir capacidad frigorífica',()=>{
 const d=deviceById('aire');
 const r=evaluateVirtualDevice('aire',defaultValues(d));
 assert.equal(r.currentAnnual,50.4);assert.equal(r.alternativeAnnual,36);assert.equal(r.differenceAnnual,14.4);
});

test('entradas no válidas y valores incongruentes se rechazan',()=>{
 const d=deviceById('ducha');
 assert.throws(()=>evaluateVirtualDevice('ducha',{...defaultValues(d),eff:0}),RangeError);
 assert.throws(()=>evaluateVirtualDevice('ducha',{...defaultValues(d),flow:Number.NaN}),RangeError);
 assert.throws(()=>evaluateVirtualDevice('frigorifico',{...defaultValues(deviceById('frigorifico')),purchase:-5}),RangeError);
 assert.throws(()=>evaluateVirtualDevice('horno',{...defaultValues(deviceById('horno')),price:999}),RangeError);
});
test('consumos cero no generan costes, diferencia negativa es posible',()=>{
 const a=evaluateVirtualDevice('aire',{...defaultValues(deviceById('aire')),days:0});
 assert.equal(a.currentAnnual,0);assert.equal(a.differenceAnnual,0);
 const b=evaluateVirtualDevice('standby',{...defaultValues(deviceById('standby')),altWatts:12});
 assert.ok(b.differenceAnnual<0);
});
test('HTML indexable y alternativas accesibles sin WebGL ni JS',()=>{
 for(const keyword of ['Casa virtual','ta-vr-fallback','data-virtual-room','data-virtual-form','data-virtual-plan-list','ta-vr-method','verificables','sin registro'])assert.ok(page.toLowerCase().includes(keyword.toLowerCase()),keyword);
 assert.match(page,/\{rooms\.map\(room=>/);
 assert.match(page,/\{virtualDevices\.filter\(device=>device\.room===room\.id\)/);
 assert.match(page,/id="explorar-casa"/);
 assert.match(page,/\{field\.hint\}/);
 assert.match(page,/WebApplication/);
});
test('3D diferido, interacción con controles y RV auténtica solo en compatible',()=>{
 assert.match(client,/await import\('\.\/casa-virtual-3d'\)/);
 assert.match(client,/IntersectionObserver/);
 assert.match(client,/data-virtual-room/);
 assert.match(client,/aria-invalid/);
 assert.match(client,/renderPlan/);
 assert.match(scene,/new THREE\.WebGLRenderer/);
 assert.match(scene,/new OrbitControls/);
 assert.match(scene,/getController/);
 assert.match(scene,/requestSession\('immersive-vr'/);
 assert.match(scene,/isSessionSupported\('immersive-vr'\)/);
 assert.match(scene,/window\.isSecureContext/);
 assert.match(layout,/page-virtual/);
 assert.match(head,/href="\/casa-virtual\/"/);
});
test('navegación preserva contenido anterior, sin cambiar los slugs de SEO',()=>{
 for(const path of ['pages/index.astro','pages/herramientas/index.astro','pages/comparativas/index.astro','pages/guias/index.astro','pages/categorias/index.astro'])assert.match(get(path),/\/casa-virtual\//);
 assert.match(get('pages/herramientas/[slug].astro'),/getStaticPaths/);
 assert.match(get('pages/comparativas/[slug].astro'),/getStaticPaths/);
 assert.match(get('pages/guias/[slug].astro'),/getStaticPaths/);
});
