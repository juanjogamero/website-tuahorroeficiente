import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {virtualDevices,type DeviceId} from '../lib/casa-virtual';

type Point = [number,number,number];
const locations:Record<DeviceId,Point>={
 radiador:[-3.38,1.00,-1.72],
 standby:[-1.0,1.03,-.72],
 frigorifico:[1.03,1.85,-2.72],
 horno:[3.18,1.12,-.84],
 ducha:[-3.07,1.25,1.72],
 aire:[3.17,2.01,2.71]
};
const palette={navy:0x153b50,deep:0x113348,mint:0xcbded5,lime:0xe1ff57,glass:0xb4d4d9,wood:0xc5a889,white:0xf8faf6};

export async function createVirtualScene(
  host:HTMLElement,
  onChoose:(id:DeviceId)=>void,
  reducedMotion:boolean
){
  // Se inicializa solo al entrar en la sección, para no penalizar el resto del portal.
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
  const gl=renderer.getContext();
  if(!gl)throw new Error('WebGL no disponible');
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.8));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.4;
  renderer.xr.enabled=true;
  renderer.xr.setReferenceSpaceType('local-floor');
  const canvas=renderer.domElement;
  canvas.setAttribute('aria-label','Vista interactiva en tres dimensiones de la vivienda.');
  canvas.setAttribute('tabindex','0');
  host.prepend(canvas);

  const scene=new THREE.Scene();
  scene.background=null;
  const camera=new THREE.PerspectiveCamera(36,1,.05,90);
  camera.position.set(9.7,12,11.2);
  const origin=new THREE.Vector3(0,.5,0);
  const controls=new OrbitControls(camera,canvas);
  controls.target.copy(origin);
  controls.enableDamping=!reducedMotion;
  controls.dampingFactor=.055;
  controls.enablePan=false;
  controls.minDistance=8;controls.maxDistance=23;
  controls.minPolarAngle=.29;controls.maxPolarAngle=1.37;
  controls.update();

  const hemi=new THREE.HemisphereLight(0xffffff,0xa0bbad,3.1);scene.add(hemi);
  const key=new THREE.DirectionalLight(0xffffff,3.2);key.position.set(-8,16,9);scene.add(key);
  const edge=new THREE.DirectionalLight(0xa2ddd9,1.1);edge.position.set(7,8,-8);scene.add(edge);
  const world=new THREE.Group();scene.add(world);
  const MAT={
    shadow:new THREE.MeshStandardMaterial({color:0xc2d0c7,roughness:1}),
    wall:new THREE.MeshStandardMaterial({color:0xfaf8f1,roughness:.95}),
    trim:new THREE.MeshStandardMaterial({color:0xe8eee6,roughness:.94}),
    roomSalon:new THREE.MeshStandardMaterial({color:0xcbdad4,roughness:.98}),
    roomCocina:new THREE.MeshStandardMaterial({color:0xdbddc9,roughness:.96}),
    roomBano:new THREE.MeshStandardMaterial({color:0xc8dee4,roughness:.96}),
    roomDormitorio:new THREE.MeshStandardMaterial({color:0xe5d9d5,roughness:.96}),
    wood:new THREE.MeshStandardMaterial({color:0xb79574,roughness:.8}),
    lightWood:new THREE.MeshStandardMaterial({color:0xe7c69f,roughness:.82}),
    green:new THREE.MeshStandardMaterial({color:0x698f7c,roughness:.92}),
    sage:new THREE.MeshStandardMaterial({color:0x9ab9a7,roughness:.9}),
    slate:new THREE.MeshStandardMaterial({color:0x305f70,roughness:.86}),
    navy:new THREE.MeshStandardMaterial({color:0x244557,roughness:.77}),
    charcoal:new THREE.MeshStandardMaterial({color:0x24343c,roughness:.6}),
    soft:new THREE.MeshStandardMaterial({color:0xeceee5,roughness:.85}),
    white:new THREE.MeshStandardMaterial({color:0xffffff,roughness:.7}),
    metal:new THREE.MeshStandardMaterial({color:0xced8d5,metalness:.35,roughness:.4}),
    black:new THREE.MeshStandardMaterial({color:0x192b35,metalness:.14,roughness:.27}),
    lemon:new THREE.MeshStandardMaterial({color:0xe1ff57,roughness:.75}),
    glass:new THREE.MeshPhysicalMaterial({color:0xc0e2e6,roughness:.2,metalness:.02,transparent:true,opacity:.47})
  };
  const box=(parent:THREE.Object3D,w:number,h:number,d:number,x:number,y:number,z:number,mat:THREE.Material,rotation=0)=>{
    const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);
    mesh.position.set(x,y,z);mesh.rotation.y=rotation;mesh.castShadow=false;mesh.receiveShadow=false;parent.add(mesh);return mesh;
  };
  const cylinder=(parent:THREE.Object3D,r:number,h:number,x:number,y:number,z:number,mat:THREE.Material)=>{
    const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,16),mat);
    mesh.position.set(x,y,z);parent.add(mesh);return mesh;
  };
  const group=(x:number,y:number,z:number)=>{const g=new THREE.Group();g.position.set(x,y,z);world.add(g);return g;};

  // Base y pavimentos de cuatro estancias, con paredes abiertas (maqueta arquitectónica).
  box(world,8.65,.19,6.92,0,-.22,0,MAT.shadow);
  box(world,4.16,.10,3.26,-2.13,-.07,-1.68,MAT.roomSalon);
  box(world,4.16,.10,3.26,2.13,-.07,-1.68,MAT.roomCocina);
  box(world,4.16,.10,3.26,-2.13,-.07,1.68,MAT.roomBano);
  box(world,4.16,.10,3.26,2.13,-.07,1.68,MAT.roomDormitorio);
  box(world,8.54,.9,.16,0,.4,-3.35,MAT.wall);
  box(world,.15,.9,6.8,-4.27,.4,0,MAT.wall);
  box(world,.15,.9,6.8,4.27,.4,0,MAT.wall);
  box(world,.10,.5,2.75,0,.20,-1.9,MAT.trim);
  box(world,.10,.5,2.65,0,.20,1.95,MAT.trim);
  box(world,7.2,.12,.14,-.20,.03,.02,MAT.trim);
  // Ventanas en pared trasera.
  box(world,1.45,1.2,.07,-2.25,1.32,-3.39,MAT.white);
  box(world,1.19,.94,.075,-2.25,1.32,-3.35,MAT.glass);
  box(world,1.4,1.2,.075,2.2,1.32,-3.39,MAT.white);
  box(world,1.14,.95,.075,2.2,1.32,-3.35,MAT.glass);

  // Salón: sofá, mesa, TV y radiador con elementos propios.
  box(world,2.15,.38,.84,-2.22,.35,-2.07,MAT.green);
  box(world,2.15,.68,.25,-2.22,.76,-2.45,MAT.sage);
  box(world,.32,.55,.88,-3.33,.47,-2.07,MAT.green);
  box(world,.32,.55,.88,-1.12,.47,-2.07,MAT.green);
  box(world,1.1,.12,.72,-2.1,.43,-.88,MAT.lightWood);
  for(const dx of [-.43,.43])for(const dz of [-.25,.25])box(world,.09,.32,.09,-2.1+dx,.23,-.88+dz,MAT.wood);
  box(world,1.02,.55,.07,-.79,1.02,-1.3,MAT.black);
  box(world,.54,.08,.41,-.78,.63,-1.3,MAT.wood);
  for(let i=0;i<5;i++)box(world,.13,.76,.29,-3.52,.63,-1.72+i*.19,MAT.soft);
  box(world,.78,.08,.44,-3.53,1.05,-1.36,MAT.metal);
  // Planta en salón.
  cylinder(world,.28,.34,-.75,.26,-2.55,MAT.wood);
  for(const angle of [0,1.2,2.4,3.6]){const leaf=box(world,.14,.72,.22,-.75+Math.cos(angle)*.19,.75,-2.55+Math.sin(angle)*.19,MAT.green);leaf.rotation.z=.15;}

  // Cocina: frigorífico, bancada, vitro, horno y detalles.
  box(world,.95,2.03,1.03,.90,.98,-2.58,MAT.white);
  box(world,.95,.045,1.03,.90,1.14,-2.58,MAT.trim);
  box(world,.04,.41,.05,1.39,1.48,-2.2,MAT.metal);
  box(world,2.03,.75,.76,2.95,.38,-2.66,MAT.sage);
  box(world,2.03,.12,.86,2.95,.83,-2.66,MAT.lightWood);
  box(world,1.26,.77,.71,3.20,.39,-1.15,MAT.soft);
  box(world,1.32,.13,.8,3.20,.83,-1.15,MAT.wood);
  box(world,.65,.085,.66,3.09,.94,-1.12,MAT.black);
  for(const cx of [2.9,3.25])for(const cz of [-1.32,-.98])cylinder(world,.095,.012,cx,.988,cz,MAT.metal);
  box(world,.82,.56,.05,3.2,.4,-.765,MAT.black);
  box(world,1.17,.16,.79,1.39,.42,-1.05,MAT.lightWood);
  cylinder(world,.18,.23,1.39,.61,-1.05,MAT.slate);
  // Luminaria
  box(world,.91,.12,.45,1.98,1.84,-1.42,MAT.white);

  // Baño: ducha, mampara de cristal, plato, lavabo y mueble.
  box(world,1.38,.09,1.22,-3.14,.025,1.99,MAT.white);
  box(world,.045,1.65,1.29,-2.48,.88,1.99,MAT.glass);
  cylinder(world,.14,.06,-3.50,1.98,2.29,MAT.metal);
  box(world,.04,1.42,.04,-3.54,1.18,2.29,MAT.metal);
  box(world,1.35,.74,.54,-.99,.39,2.46,MAT.sage);
  box(world,1.48,.10,.69,-.99,.84,2.45,MAT.soft);
  cylinder(world,.24,.08,-.99,.93,2.45,MAT.white);
  box(world,.46,.66,.06,-.99,1.54,3.29,MAT.glass);
  box(world,.69,.12,.49,-1.1,.2,.60,MAT.soft);
  cylinder(world,.23,.30,-1.1,.40,.60,MAT.white);

  // Dormitorio: cama doble, mesas y split aire acondicionado.
  box(world,2.17,.28,2.05,2.12,.29,1.93,MAT.wood);
  box(world,2.03,.20,1.97,2.12,.53,1.93,MAT.white);
  box(world,2.05,.12,.3,2.12,.59,2.75,MAT.sage);
  for(const dx of [-.48,.48])box(world,.62,.14,.43,2.12+dx,.68,2.54,MAT.soft);
  box(world,2.18,.72,.17,2.12,.68,3.03,MAT.slate);
  box(world,.55,.51,.52,.73,.28,2.51,MAT.lightWood);
  box(world,.55,.51,.52,3.5,.28,2.51,MAT.lightWood);
  box(world,1.31,.37,.37,3.12,2.06,3.03,MAT.white);
  box(world,1.13,.055,.04,3.12,1.93,2.82,MAT.slate);
  cylinder(world,.09,.45,.73,.76,2.51,MAT.metal);
  cylinder(world,.22,.11,.73,1.03,2.51,MAT.white);

  // Marcadores reales en 3D, visibles también dentro de un visor WebXR.
  const markerMaterial=(selected:boolean)=>new THREE.MeshStandardMaterial({
    color:selected?palette.lime:0xf0fff6,emissive:selected?0x9abf29:0x237280,
    emissiveIntensity:selected?.6:.42,roughness:.34,metalness:.05
  });
  const spotObjects=new Map<DeviceId,THREE.Mesh>();
  const spotButtons=new Map<DeviceId,HTMLButtonElement>();
  for(const device of virtualDevices){
    const [x,y,z]=locations[device.id];
    const marker=new THREE.Mesh(new THREE.SphereGeometry(.185,20,14),markerMaterial(device.id==='radiador'));
    marker.position.set(x,y,z);
    const halo=new THREE.Mesh(new THREE.RingGeometry(.25,.31,36),new THREE.MeshBasicMaterial({color:0x92cebe,side:THREE.DoubleSide,transparent:true,opacity:.75}));
    halo.rotation.x=-Math.PI/2;halo.position.set(x,y-.23,z);
    world.add(marker,halo);
    marker.userData.deviceId=device.id;
    spotObjects.set(device.id,marker);
    const button=document.createElement('button');
    button.type='button';button.className='ta-vr-hotspot';
    button.dataset.virtualChoose=device.id;
    button.setAttribute('aria-label','Seleccionar '+device.label);
    button.setAttribute('aria-pressed',String(device.id==='radiador'));
    button.innerHTML='<span aria-hidden="true">✦</span><span class="ta-vr-hotspot-label"></span>';
    const label=button.querySelector<HTMLElement>('.ta-vr-hotspot-label');
    if(label)label.textContent=device.short;
    button.addEventListener('click',()=>onChoose(device.id));
    host.append(button);
    spotButtons.set(device.id,button);
  }

  // Cartel 3D de contexto, visible en modo inmersivo sin depender de HTML flotante.
  const labelCanvas=document.createElement('canvas');labelCanvas.width=1024;labelCanvas.height=250;
  const context=labelCanvas.getContext('2d');
  const labelTexture=new THREE.CanvasTexture(labelCanvas);
  labelTexture.colorSpace=THREE.SRGBColorSpace;
  const labelBoard=new THREE.Mesh(new THREE.PlaneGeometry(4.3,1.04),new THREE.MeshBasicMaterial({map:labelTexture,transparent:true,side:THREE.DoubleSide,depthWrite:false}));
  labelBoard.position.set(0,2.8,-2.5);world.add(labelBoard);
  const setInformation=(name:string,difference:number)=>{
    if(!context)return;
    context.clearRect(0,0,1024,250);
    context.fillStyle='#153a4c';
    context.beginPath();context.roundRect(0,0,1024,250,26);context.fill();
    context.fillStyle='#e1ff57';context.fillRect(28,32,7,187);
    context.fillStyle='#c4e5dd';context.font='700 28px Arial';context.fillText('TU AHORRO EFICIENTE · ESCENARIO',60,73);
    context.fillStyle='#fff';context.font='700 52px Arial';context.fillText(name.slice(0,29),60,135);
    context.fillStyle='#e1ff57';context.font='700 43px Arial';
    context.fillText('Diferencia: '+new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(difference)+'/año',60,201);
    labelTexture.needsUpdate=true;
  };
  setInformation('Radiador eléctrico',0);

  const project=new THREE.Vector3();
  const target=new THREE.Vector3();
  const hideButtons=(hidden:boolean)=>{
    for(const button of spotButtons.values())button.style.display=hidden?'none':'';
  };
  const updateProjectedHotspots=()=>{
    if(renderer.xr.isPresenting)return;
    const width=host.clientWidth,height=host.clientHeight;
    world.updateMatrixWorld(true);camera.updateMatrixWorld(true);
    for(const [id,button] of spotButtons){
      const mesh=spotObjects.get(id);
      if(!mesh)continue;
      mesh.getWorldPosition(project);
      project.project(camera);
      const visible=project.z>-1&&project.z<1&&Math.abs(project.x)<1&&Math.abs(project.y)<1;
      button.style.display=visible?'inline-flex':'none';
      if(visible){
        button.style.left=((project.x+1)*width/2)+'px';
        button.style.top=((-project.y+1)*height/2)+'px';
      }
    }
  };
  const clock=new THREE.Clock();
  const animate=()=>{
    if(!renderer.xr.isPresenting)controls.update();
    if(!reducedMotion){const elapsed=clock.getElapsedTime();for(const mesh of spotObjects.values())mesh.scale.setScalar(1+Math.sin(elapsed*2.3+mesh.position.x)*.09);}
    renderer.render(scene,camera);updateProjectedHotspots();
  };
  const resize=()=>{
    const width=Math.max(240,host.clientWidth);
    const height=Math.max(240,host.clientHeight);
    camera.aspect=width/height;camera.updateProjectionMatrix();
    renderer.setSize(width,height,false);
  };
  const observer=new ResizeObserver(resize);observer.observe(host);resize();
  renderer.setAnimationLoop(animate);
  let activeId:DeviceId='radiador';
  const select=(id:DeviceId,focus:boolean)=>{
    const selected=spotObjects.get(id);if(!selected)return;
    activeId=id;
    for(const [key,mesh] of spotObjects){
      const mat=mesh.material;
      if(mat instanceof THREE.MeshStandardMaterial){
        mat.color.setHex(key===id?palette.lime:0xf0fff6);
        mat.emissive.setHex(key===id?0x9abf29:0x237280);
      }
    }
    for(const [key,button] of spotButtons)button.setAttribute('aria-pressed',String(key===id));
    if(focus&&!renderer.xr.isPresenting){
      const position=selected.position;
      // Mantener el ángulo isométrico; acercar la cámara hacia la estancia.
      target.set(position.x*.38,.48,position.z*.40);
      const offset=new THREE.Vector3(9.7,11.5,11.2).multiplyScalar(.87);
      camera.position.copy(target).add(offset);
      controls.target.copy(target);controls.update();
    }
  };
  const resetCamera=()=>{
    if(renderer.xr.isPresenting)return;
    camera.position.set(9.7,12,11.2);controls.target.copy(origin);controls.update();
  };

  // WebXR opcional y real. Solo solicita la sesión desde una interacción del usuario.
  const xrSystem=(navigator as Navigator & {xr?:{
    isSessionSupported:(mode:string)=>Promise<boolean>;
    requestSession:(mode:string,options?:{optionalFeatures:string[]})=>Promise<any>;
  }}).xr;
  const isImmersiveAvailable=async()=>{
    if(!xrSystem||!window.isSecureContext)return false;
    try{return await xrSystem.isSessionSupported('immersive-vr');}catch{return false;}
  };
  let currentSession:any=null;
  const controllers:THREE.Group[]=[];
  const raycaster=new THREE.Raycaster();
  const rayOrigin=new THREE.Vector3();
  const rayDirection=new THREE.Vector3();
  const enterImmersive=async()=>{
    if(!xrSystem||!await isImmersiveAvailable())throw new Error('Visor no disponible.');
    // La solicitud ocurre antes de cualquier trabajo pesado tras el clic.
    const session=await xrSystem.requestSession('immersive-vr',{optionalFeatures:['local-floor','bounded-floor']});
    currentSession=session;
    world.position.set(0,-1.38,-4.45);world.scale.setScalar(.43);
    hideButtons(true);
    const onSelect=(event:THREE.Event)=>{
      const controller=event.target as THREE.Object3D;
      controller.getWorldPosition(rayOrigin);
      controller.getWorldQuaternion(new THREE.Quaternion()).normalize();
      const rotation=new THREE.Quaternion();controller.getWorldQuaternion(rotation);
      rayDirection.set(0,0,-1).applyQuaternion(rotation).normalize();
      raycaster.set(rayOrigin,rayDirection);
      const hits=raycaster.intersectObjects([...spotObjects.values()],false);
      if(hits.length){
        const id=hits[0].object.userData.deviceId as DeviceId;
        onChoose(id);
      }
    };
    for(let index=0;index<2;index++){
      const controller=renderer.xr.getController(index);
      controller.addEventListener('selectstart',onSelect);
      // Haz blanco de puntería visible sin depender de modelos de mandos.
      const pointer=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,-6)]),
        new THREE.LineBasicMaterial({color:0xe1ff57,transparent:true,opacity:.58}));
      controller.add(pointer);
      scene.add(controller);controllers.push(controller);
    }
    session.addEventListener('end',()=>{
      currentSession=null;
      world.position.set(0,0,0);world.scale.setScalar(1);
      hideButtons(false);
      for(const controller of controllers){scene.remove(controller);}
      controllers.length=0;resetCamera();
    },{once:true});
    await renderer.xr.setSession(session);
  };
  return {select,resetCamera,setInformation,isImmersiveAvailable,enterImmersive,dispose:()=>{
    if(currentSession)currentSession.end();
    renderer.setAnimationLoop(null);observer.disconnect();controls.dispose();
    scene.traverse(obj=>{if(obj instanceof THREE.Mesh){obj.geometry.dispose();if(Array.isArray(obj.material))obj.material.forEach(m=>m.dispose());else obj.material.dispose();}});
    renderer.dispose();canvas.remove();for(const b of spotButtons.values())b.remove();
  }};
}
