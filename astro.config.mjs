import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// El entorno de pruebas se publica en un repositorio de proyecto (no en la raíz del dominio).
// Nunca apunta al dominio de producción salvo que se configure de forma deliberada.
const production = process.env.PUBLICATION_MODE === 'production';
const repo = 'website-tuahorroeficiente';

export default defineConfig({
  site: production ? 'https://tuahorroeficiente.es' : 'https://juanjogamero.github.io',
  base: production ? '/' : `/${repo}/`,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({
    filter: page => !page.includes('/404/') && !page.endsWith('/404.html')
  })],
  build: { inlineStylesheets: 'auto' }
});
