import produtosJson from '../data/catalogo.json';
import info from '../data/estabelecimento.json';

export type EstadoVerificacao =
  | 'confirmado'
  | 'a_confirmar'
  | 'preco_divergente'
  | 'sem_preco_confirmado';

export interface Produto {
  id: string;
  categoria: string;
  nome: string;
  preco_balcao_eur: number | null;
  unidade: string;
  descricao: string;
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
  id: string;
  /** Texto curto mostrado por baixo do título. */
  nota?: string;
  /** "cartoes" destaca cada produto (menus); "lista" é a ementa clássica. */
  formato: 'cartoes' | 'lista';
}

/** Ordem e apresentação das categorias na ementa. */
export const categorias: Categoria[] = [
  {
    nome: 'Menus familiares',
    id: 'menus-familiares',
    nota: 'Para partilhar, com bebida de 1 L incluída.',
    formato: 'cartoes',
  },
  {
    nome: 'Menus individuais',
    id: 'menus-individuais',
    nota: 'Para uma pessoa, com bebida de 33 cl incluída.',
    formato: 'cartoes',
  },
  { nome: 'Grelhados e pratos', id: 'grelhados-e-pratos', formato: 'lista' },
  {
    nome: 'Encomendas especiais',
    id: 'encomendas-especiais',
    nota: 'Apenas por encomenda antecipada.',
    formato: 'lista',
  },
  { nome: 'Acompanhamentos', id: 'acompanhamentos', formato: 'lista' },
  {
    nome: 'Sobremesas',
    id: 'sobremesas',
    nota: 'As variedades mudam de dia para dia.',
    formato: 'lista',
  },
  { nome: 'Produtos embalados', id: 'produtos-embalados', formato: 'lista' },
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

export function formatarPreco(valor: number): string {
  return `${formatador.format(valor)} €`;
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

export function textoHoras(d: DiaHorario): string {
  return d.abre && d.fecha ? `${d.abre}–${d.fecha}` : 'Encerrado';
}
