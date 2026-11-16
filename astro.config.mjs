// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import info from './src/data/estabelecimento.json' with { type: 'json' };

// O endereço final do site define-se em src/data/estabelecimento.json ("url_site").
// Enquanto estiver vazio, não são emitidos canonical nem og:url.
export default defineConfig({
  site: info.url_site || undefined,
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
