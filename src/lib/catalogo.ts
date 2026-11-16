import produtosJson from '../data/catalogo.json';
import info from '../data/estabelecimento.json';
import type { Lingua } from '../i18n/textos';

export type EstadoVerificacao =
  | 'confirmado'
  | 'a_confirmar'
  | 'preco_divergente'
  | 'sem_preco_confirmado';

export interface Produto {
  id: string;
  categoria: string;
  nome: string;
  /** Nome em inglês (opcional; sem ele usa-se o português). */
  nome_en?: string;
  preco_balcao_eur: number | null;
  unidade: string;
  descricao: string;
  descricao_en?: string;
  fonte_fotografia: string;
  estado_verificacao: string;
  notas: string;
  preco_alternativo_foto_eur: number | null;
  /** Opcional: `false` esconde o produto do site sem o apagar do ficheiro. */
  visivel?: boolean;
}

export interface Categoria {
  /** Tem de coincidir com o campo "categoria" em catalogo.json. */
  nome: string;
  nome_en: string;
  id: string;
  /** Texto curto mostrado por baixo do título. */
  nota?: string;
  nota_en?: string;
  /** "cartoes" destaca cada produto (menus); "lista" é a ementa clássica. */
  formato: 'cartoes' | 'lista';
}

/** Ordem e apresentação das categorias na ementa. */
export const categorias: Categoria[] = [
  {
    nome: 'Menus familiares',
    nome_en: 'Family menus',
    id: 'menus-familiares',
    nota: 'Para partilhar, com bebida de 1 L incluída.',
    nota_en: 'To share, with a 1 L drink included.',
    formato: 'cartoes',
  },
  {
    nome: 'Menus individuais',
    nome_en: 'Individual menus',
    id: 'menus-individuais',
    nota: 'Para uma pessoa, com bebida de 33 cl incluída.',
    nota_en: 'For one, with a 33 cl drink included.',
    formato: 'cartoes',
  },
  { nome: 'Grelhados e pratos', nome_en: 'Grills and dishes', id: 'grelhados-e-pratos', formato: 'lista' },
  {
    nome: 'Encomendas especiais',
    nome_en: 'Special orders',
    id: 'encomendas-especiais',
    nota: 'Apenas por encomenda antecipada.',
    nota_en: 'By advance order only.',
    formato: 'lista',
  },
  { nome: 'Acompanhamentos', nome_en: 'Sides', id: 'acompanhamentos', formato: 'lista' },
  {
    nome: 'Sobremesas',
    nome_en: 'Desserts',
    id: 'sobremesas',
    nota: 'As variedades mudam de dia para dia.',
    nota_en: 'Varieties change from day to day.',
    formato: 'lista',
  },
  { nome: 'Produtos embalados', nome_en: 'Packaged products', id: 'produtos-embalados', formato: 'lista' },
];

/** Categoria mostrada apenas como nota de rodapé da ementa (sacos). */
export const CATEGORIA_EMBALAGENS = 'Embalagens';

const produtos = (produtosJson as Produto[]).filter((p) => p.visivel !== false);

/**
 * Regra de publicação de preços: só aparece o valor de produtos com
 * estado "confirmado" e preço preenchido. Tudo o resto surge como
 * "Preço sob consulta".
 */
export function precoPublicavel(p: Produto): number | null {
  if (p.estado_verificacao !== 'confirmado') return null;
  if (typeof p.preco_balcao_eur !== 'number') return null;
  return p.preco_balcao_eur;
}

const formatador = new Intl.NumberFormat('pt-PT', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** "16,00 €" em português, "€16.00" em inglês. */
export function formatarPreco(valor: number, lingua: Lingua = 'pt'): string {
  return lingua === 'en' ? `€${valor.toFixed(2)}` : `${formatador.format(valor)}\u00A0€`;
}

export function nomeProduto(p: Produto, lingua: Lingua): string {
  return (lingua === 'en' && p.nome_en) || p.nome;
}

export function descricaoProduto(p: Produto, lingua: Lingua): string {
  return lingua === 'en' ? (p.descricao_en ?? p.descricao) : p.descricao;
}

export function nomeCategoria(c: Categoria, lingua: Lingua): string {
  return lingua === 'en' ? c.nome_en : c.nome;
}

export function notaCategoria(c: Categoria, lingua: Lingua): string | undefined {
  return lingua === 'en' ? (c.nota_en ?? c.nota) : c.nota;
}

/** Sufixo da unidade, só quando acrescenta informação (ex.: "/kg"). */
export function sufixoUnidade(p: Produto): string {
  return p.unidade === 'kg' ? '/kg' : '';
}

export interface GrupoCategoria extends Categoria {
  produtos: Produto[];
}

export const ementa: GrupoCategoria[] = categorias
  .map((c) => ({ ...c, produtos: produtos.filter((p) => p.categoria === c.nome) }))
  .filter((c) => c.produtos.length > 0);

export const embalagens: Produto[] = produtos.filter(
  (p) => p.categoria === CATEGORIA_EMBALAGENS && precoPublicavel(p) !== null,
);

export { info };
export const telHref = `tel:${info.telefone_e164}`;
export const moradaLinha1 = info.morada.rua;
export const moradaLinha2 = `${info.morada.codigo_postal} ${info.morada.localidade}, ${info.morada.concelho}`;

export interface DiaHorario {
  dia: string;
  /** "HH:MM"; vazio em ambos = encerrado. */
  abre: string;
  fecha: string;
}

/** Horário a mostrar; vazio enquanto "confirmado" for false. */
export const horario: DiaHorario[] = info.horario.confirmado
  ? (info.horario.dias as DiaHorario[])
  : [];

export function textoHoras(d: DiaHorario, fechado = 'Encerrado'): string {
  return d.abre && d.fecha ? `${d.abre}–${d.fecha}` : fechado;
}
