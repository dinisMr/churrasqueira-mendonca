# Churrasqueira Mendonça — website

Site informativo de página única (Astro + TypeScript + Tailwind CSS), estático,
sem backend, carrinho ou encomendas online. Preparado para Cloudflare Pages.

## Executar

Requer Node.js 20 ou superior.

```bash
npm install
```

```bash
npm run dev
```

Abre em `http://localhost:4321`. Outros comandos:

| Comando           | O que faz                                  |
| ----------------- | ------------------------------------------ |
| `npm run build`   | Gera o site final na pasta `dist/`         |
| `npm run preview` | Serve a pasta `dist/` para verificação     |
| `npm run check`   | Verifica os tipos TypeScript/Astro         |

## Alterar produtos e preços

Tudo está em **`src/data/catalogo.json`**. Cada produto é um bloco:

```json
{
  "id": "p008",
  "categoria": "Grelhados e pratos",
  "nome": "Frango inteiro",
  "preco_balcao_eur": 9.0,
  "unidade": "unidade",
  "descricao": "Frango no churrasco.",
  "estado_verificacao": "confirmado"
}
```

- **Mudar um preço:** alterar `preco_balcao_eur` (usar ponto decimal: `9.5`).
- **Regra de publicação:** o preço só aparece no site se
  `estado_verificacao` for `"confirmado"` **e** `preco_balcao_eur` tiver valor.
  Qualquer outro estado (`a_confirmar`, `preco_divergente`,
  `sem_preco_confirmado`) mostra "Preço sob consulta".
- **Publicar um preço que estava pendente:** corrigir o valor e mudar o estado
  para `"confirmado"`.
- **Adicionar um produto:** copiar um bloco, dar-lhe um `id` novo e usar uma
  `categoria` existente.
- **Esconder um produto sem o apagar:** acrescentar `"visivel": false`.
- **Unidade:** `"kg"` acrescenta "/kg" ao preço; os outros valores não mostram sufixo.
- Os campos `fonte_fotografia`, `notas` e `preco_alternativo_foto_eur` são
  apenas registo interno e não aparecem no site.

A ordem, os nomes e as notas das **categorias** estão em `src/lib/catalogo.ts`
(lista `categorias`). Uma categoria nova no JSON tem de ser acrescentada aí.

## Alterar contactos, horário e ligações

Em **`src/data/estabelecimento.json`**:

- `telefone_display` / `telefone_e164`, `morada`, `instagram`, `google_maps`.
- **Horário:** lista `horario.dias`, um bloco por dia com `abre` e `fecha`
  (`"HH:MM"`). Deixar ambos vazios (`""`) mostra "Encerrado". Com
  `"confirmado": false` o site volta a mostrar "Consulte-nos pelo telefone".

- `pagamentos`: lista mostrada em "Pagamento na loja" (lista vazia esconde o bloco).
- `plataformas_entrega.mostrar`: `false` esconde as ligações Uber Eats/Glovo.
- `url_site`: endereço final do site (ex.: `https://www.exemplo.pt`). Preencher
  antes de publicar — ativa o `canonical`, o `og:url` e o URL nos dados
  estruturados.

## Fotografias

Coloque as imagens em `src/assets/fotos/`:

- `capa.jpg` passa a ser o fundo da página inicial.
- As restantes aparecem na secção "Galeria", por ordem alfabética do nome.
- O texto alternativo de cada uma define-se em `src/data/fotos.json`
  (`{ "01-frango.jpg": "Frangos a assar na brasa" }`).

Sem fotografias na pasta, a galeria não aparece e a capa usa o fundo decorativo.

## Publicar no Cloudflare Pages

Ainda nada foi publicado. Quando for altura:

1. Em Cloudflare → Workers & Pages → Create → Pages → ligar o repositório Git.
2. Framework preset: **Astro** · Build command: `npm run build` · Output: `dist`.
3. Preencher `url_site` com o domínio final e fazer novo deploy.

`public/_headers` define cabeçalhos de segurança e cache; `wrangler.toml`
indica a pasta de saída; `.nvmrc` fixa o Node 22.

## Estrutura

```
src/
  data/catalogo.json          produtos e preços
  data/estabelecimento.json   contactos, horário, ligações
  lib/catalogo.ts             categorias e regra de publicação de preços
  components/                 Cabecalho, Hero, Ementa, Sobre, Contactos, Rodape
  layouts/Base.astro          <head>, SEO e dados estruturados
  pages/index.astro           a página
  styles/global.css           cores, tipografia e estilos base
```
