import type { ImageMetadata } from 'astro';
import descricoes from '../data/fotos.json';

// Todas as imagens em src/assets/fotos/ são apanhadas automaticamente.
const modulos = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/fotos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}',
  { eager: true },
);

export interface Foto {
  ficheiro: string;
  imagem: ImageMetadata;
  alt: string;
}

const alts = descricoes as Record<string, string>;

const todas: Foto[] = Object.entries(modulos)
  .map(([caminho, m]) => {
    const ficheiro = caminho.split('/').pop() as string;
    return {
      ficheiro,
      imagem: m.default,
      alt: alts[ficheiro] ?? 'Fotografia da Churrasqueira Mendonça',
    };
  })
  .sort((a, b) => a.ficheiro.localeCompare(b.ficheiro, 'pt'));

const eCapa = (f: Foto) => /^capa\./i.test(f.ficheiro);

/** Fotografia de fundo da página inicial (ficheiro "capa.*"), se existir. */
export const capa: Foto | undefined = todas.find(eCapa);

/** Restantes fotografias, mostradas na galeria. */
export const galeria: Foto[] = todas.filter((f) => !eCapa(f));
