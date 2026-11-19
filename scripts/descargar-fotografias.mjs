/**
 * Descarga y prepara el catálogo de imágenes editoriales para GitHub Pages.
 * Se ejecuta en la compilación, no en el navegador; el sitio final es 100 % estático.
 * Cada fotografía se corresponde con una ficha de licencia documentada en docs/22-fotografia-editorial-y-licencias.md.
 * Nunca se sustituye un archivo válido por una descarga corrupta.
 */
import { mkdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export const images = [
  ['medidor-consumo.webp', 'https://images.unsplash.com/photo-1658753145551-8f44e5811d21?fm=webp&fit=crop&w=1200&q=76', 'image/webp'],
  ['ducha-bano.webp', 'https://images.unsplash.com/photo-1690603935238-b60582bcb273?fm=webp&fit=crop&w=1200&q=76', 'image/webp'],
  ['grifo-agua.webp', 'https://images.unsplash.com/photo-1722773129561-472ba62e44a0?fm=webp&fit=crop&w=1200&q=76', 'image/webp'],
  ['radiador-hogar.webp', 'https://images.unsplash.com/photo-1669725341213-7379ff6c90d5?fm=webp&fit=crop&w=1200&q=76', 'image/webp'],
  ['aire-acondicionado.webp', 'https://images.unsplash.com/photo-1762341123870-d706f257a12e?fm=webp&fit=crop&w=1200&q=76', 'image/webp'],
  ['climatizacion-exterior.webp', 'https://images.unsplash.com/photo-1622787066476-2794c60844d3?fm=webp&fit=crop&w=1200&q=76', 'image/webp'],
  ['horno-cocina.webp', 'https://images.unsplash.com/photo-1772567733108-38d940269d86?fm=webp&fit=crop&w=1200&q=76', 'image/webp'],
  ['freidora-aire.jpg', 'https://images.pexels.com/photos/29461935/pexels-photo-29461935/free-photo-of-modern-kitchen-with-air-fryer-and-toaster.jpeg?auto=compress&dpr=1&h=900&w=1300', 'image/jpeg'],
  ['lavanderia.webp', 'https://images.unsplash.com/photo-1758279745240-b75977c88fa8?fm=webp&fit=crop&w=1200&q=76', 'image/webp'],
  ['vida-hogar.webp', 'https://images.unsplash.com/photo-1770364321618-09af20458226?fm=webp&fit=crop&w=1200&q=76', 'image/webp'],
  ['placas-tejado.webp', 'https://images.unsplash.com/photo-1745187946672-2c1d8cf26a2b?fm=webp&fit=crop&w=1200&q=76', 'image/webp'],
  ['agua-hogar.webp', 'https://images.unsplash.com/photo-1756312177990-d771bfeaa030?fm=webp&fit=crop&w=1200&q=76', 'image/webp'],
  ['nosotros-parque-eolico.jpg', 'https://images.pexels.com/photos/28652561/pexels-photo-28652561.jpeg?auto=compress&dpr=1&w=2400', 'image/jpeg']
];

const out = resolve('public/images');
const head = (b, kind) => kind === 'image/webp'
  ? b.subarray(0, 4).toString() === 'RIFF' && b.subarray(8, 12).toString() === 'WEBP'
  : b[0] === 255 && b[1] === 216;

async function download([name, url, kind]) {
  const file = resolve(out, name);
  if (!process.env.FORZAR_FOTOGRAFIAS) {
    try { if ((await stat(file)).size > 4500) { console.log(`✓ Ya existe ${name}`); return; } } catch { /* no existe */ }
  }
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'TuAhorroEficiente/1.0 (sitio editorial; contacto en la web)', 'Accept': kind === 'image/webp' ? 'image/webp,image/*;q=0.8' : 'image/jpeg,image/*;q=0.8' },
        signal: AbortSignal.timeout(25000)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const b = Buffer.from(await res.arrayBuffer());
      if (b.length < 4500 || b.length > 5_000_000 || !head(b, kind)) throw new Error(`Imagen no válida (${b.length} bytes; ${res.headers.get('content-type')})`);
      const temporary = `${file}.tmp`;
      try { await writeFile(temporary, b); await rename(temporary, file); } finally { await rm(temporary, {force: true}); }
      console.log(`✓ ${name}: ${(b.length / 1024).toFixed(0)} KiB`);
      return;
    } catch (e) {
      lastError = e;
      console.warn(`Intento ${attempt}/3: ${name} — ${e.message}`);
      if (attempt < 3) await new Promise(r => setTimeout(r, 700 * attempt));
    }
  }
  throw new Error(`No se pudo preparar ${name}: ${lastError?.message}`);
}

if (process.argv[1]?.endsWith('descargar-fotografias.mjs')) {
  await mkdir(out, {recursive: true});
  // Pequeño límite de concurrencia para evitar errores 429 del banco.
  for (let i = 0; i < images.length; i += 3) {
    await Promise.all(images.slice(i, i + 3).map(download));
  }
  console.log(`Fotografías verificadas: ${images.length}. Se publican como archivos locales.`);
}
