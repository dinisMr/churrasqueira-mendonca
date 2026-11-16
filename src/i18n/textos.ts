/**
 * Textos da interface nas duas línguas. Os nomes e descrições dos produtos
 * estão em src/data/catalogo.json (campos "nome_en" e "descricao_en").
 */
export type Lingua = 'pt' | 'en';

export const linguas: { codigo: Lingua; rotulo: string; nome: string; caminho: string; html: string }[] = [
  { codigo: 'pt', rotulo: 'PT', nome: 'Português', caminho: '/', html: 'pt-PT' },
  { codigo: 'en', rotulo: 'EN', nome: 'English', caminho: '/en/', html: 'en' },
];

const pt = {
  meta: {
    titulo: (nome: string, local: string, concelho: string) =>
      `${nome} — Churrasco e take-away em ${local}, ${concelho}`,
    descricao: (rua: string, local: string, tel: string) =>
      `Frango no churrasco, entrecosto, choco frito e menus familiares para levar. ${rua}, ${local}. Telefone: ${tel}.`,
    saltar: 'Saltar para o conteúdo',
    ogLocale: 'pt_PT',
    cozinha: ['Churrasco', 'Portuguesa'],
  },
  nav: {
    ementa: 'Ementa',
    sobre: 'Sobre nós',
    contactos: 'Contactos',
    principal: 'Navegação principal',
    rapida: 'Navegação rápida',
    inicio: 'início',
    lingua: 'Língua',
  },
  hero: {
    tituloA: 'O sabor do churrasco,',
    tituloB: 'perto de si',
    texto: (nome: string) =>
      `Frango no churrasco, entrecosto, choco frito e menus completos para levar para casa, na ${nome}.`,
    verEmenta: 'Ver ementa',
    contactos: 'Localização',
    takeaway: 'Take-away',
  },
  ementa: {
    sobretitulo: 'Ementa',
    titulo: 'Preços de balcão',
    intro:
      'Valores praticados na loja, com IVA incluído. Os preços e a disponibilidade podem mudar sem aviso — em caso de dúvida, ligue-nos.',
    categorias: 'Categorias da ementa',
    sobConsulta: 'Preço sob consulta',
    notaSobConsulta: 'indica artigos cujo valor confirmamos ao balcão ou pelo telefone.',
    sacos: 'Sacos',
    ligar: 'Ligar',
  },
  galeria: { sobretitulo: 'Galeria', titulo: 'Da nossa brasa' },
  sobre: {
    sobretitulo: 'Sobre nós',
    titulo: (local: string) => `Uma churrasqueira de bairro, em ${local}`,
    p1: (nome: string, rua: string, zona: string, concelho: string) =>
      `A ${nome} fica na ${rua}, na zona das ${zona}, concelho do ${concelho}. Aqui encontra comida tradicional portuguesa e churrasco para levar, com os preços afixados ao balcão.`,
    p2: 'Para esclarecer qualquer dúvida sobre a ementa do dia, o mais simples é telefonar-nos.',
    destaques: [
      {
        titulo: 'Churrasco e cozinha portuguesa',
        texto: 'Frango no churrasco, entrecosto grelhado, salsichas e choco frito.',
      },
      {
        titulo: 'Take-away',
        texto: 'Menus familiares e individuais, já com acompanhamentos e bebida, prontos a levar.',
      },
      {
        titulo: 'Leitão por encomenda',
        texto: 'Preparado apenas mediante pedido antecipado. Informe-se junto de nós.',
      },
    ],
  },
  contactos: {
    sobretitulo: 'Contactos e localização',
    titulo: 'Onde estamos',
    telefone: 'Telefone',
    telefoneTexto: 'Informações e esclarecimentos.',
    telefonar: 'Telefonar agora',
    morada: 'Morada',
    zona: (zona: string) => `Zona das ${zona}`,
    maps: 'Abrir no Google Maps',
    horario: 'Horário',
    horarioProvisorio: 'Consulte-nos pelo telefone',
    encerrado: 'Encerrado',
    pagamento: 'Pagamento na loja',
    entregaForte: 'Prefere receber em casa?',
    entregaTexto:
      'Também estamos nas plataformas de entrega. Os preços e a ementa nessas plataformas são diferentes dos de balcão.',
  },
  rodape: {
    comoChegar: 'Como chegar',
    legal: 'Preços de balcão com IVA incluído, sujeitos a alteração sem aviso prévio.',
  },
};

const en: typeof pt = {
  meta: {
    titulo: (nome, local, concelho) =>
      `${nome} — Portuguese barbecue and takeaway in ${local}, ${concelho}`,
    descricao: (rua, local, tel) =>
      `Barbecued chicken, pork ribs, fried cuttlefish and family menus to take away. ${rua}, ${local}, Portugal. Phone: ${tel}.`,
    saltar: 'Skip to content',
    ogLocale: 'en_GB',
    cozinha: ['Barbecue', 'Portuguese'],
  },
  nav: {
    ementa: 'Menu',
    sobre: 'About us',
    contactos: 'Contact',
    principal: 'Main navigation',
    rapida: 'Quick navigation',
    inicio: 'home',
    lingua: 'Language',
  },
  hero: {
    tituloA: 'The taste of the grill,',
    tituloB: 'close to you',
    texto: (nome) =>
      `Barbecued chicken, pork ribs, fried cuttlefish and complete menus to take home, at ${nome}.`,
    verEmenta: 'See the menu',
    contactos: 'Location',
    takeaway: 'Takeaway',
  },
  ementa: {
    sobretitulo: 'Menu',
    titulo: 'Counter prices',
    intro:
      'Prices charged in the shop, VAT included. Prices and availability may change without notice — if in doubt, give us a call.',
    categorias: 'Menu categories',
    sobConsulta: 'Price on request',
    notaSobConsulta: 'marks items whose price we confirm at the counter or by phone.',
    sacos: 'Bags',
    ligar: 'Call',
  },
  galeria: { sobretitulo: 'Gallery', titulo: 'From our grill' },
  sobre: {
    sobretitulo: 'About us',
    titulo: (local) => `A neighbourhood churrasqueira in ${local}`,
    p1: (nome, rua, zona, concelho) =>
      `${nome} is at ${rua}, in the ${zona} area, in the municipality of ${concelho}. Here you will find traditional Portuguese food and barbecue to take away, with prices displayed at the counter.`,
    p2: 'If you have any questions about the menu of the day, the easiest way is to call us.',
    destaques: [
      {
        titulo: 'Barbecue and Portuguese cooking',
        texto: 'Barbecued chicken, grilled pork ribs, sausages and fried cuttlefish.',
      },
      {
        titulo: 'Takeaway',
        texto: 'Family and individual menus, with sides and a drink included, ready to take away.',
      },
      {
        titulo: 'Suckling pig to order',
        texto: 'Prepared only by advance request. Ask us for details.',
      },
    ],
  },
  contactos: {
    sobretitulo: 'Contact and location',
    titulo: 'Where to find us',
    telefone: 'Phone',
    telefoneTexto: 'Information and enquiries.',
    telefonar: 'Call now',
    morada: 'Address',
    zona: (zona) => `${zona} area`,
    maps: 'Open in Google Maps',
    horario: 'Opening hours',
    horarioProvisorio: 'Please call us',
    encerrado: 'Closed',
    pagamento: 'Payment in store',
    entregaForte: 'Prefer delivery?',
    entregaTexto:
      'We are also on delivery platforms. Prices and the menu on those platforms differ from the counter ones.',
  },
  rodape: {
    comoChegar: 'Directions',
    legal: 'Counter prices include VAT and may change without notice.',
  },
};

export const textos: Record<Lingua, typeof pt> = { pt, en };

/** Dias da semana e meios de pagamento vêm em português de estabelecimento.json. */
const diasEn: Record<string, string> = {
  segunda: 'Monday',
  terça: 'Tuesday',
  quarta: 'Wednesday',
  quinta: 'Thursday',
  sexta: 'Friday',
  sábado: 'Saturday',
  domingo: 'Sunday',
};

/** Nome do dia em inglês ("Terça-feira" → "Tuesday"); undefined se não for reconhecido. */
export function diaEmIngles(dia: string): string | undefined {
  return diasEn[dia.trim().toLowerCase().split('-')[0] ?? ''];
}

export function nomeDia(dia: string, lingua: Lingua): string {
  return lingua === 'en' ? (diaEmIngles(dia) ?? dia) : dia;
}

const pagamentosEn: Record<string, string> = {
  dinheiro: 'Cash',
  multibanco: 'Multibanco (debit card)',
};

export function nomePagamento(p: string, lingua: Lingua): string {
  return lingua === 'en' ? (pagamentosEn[p.toLowerCase()] ?? p) : p;
}
