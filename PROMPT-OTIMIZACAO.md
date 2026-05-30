# Prompt — Página 100% otimizada (Mr. Inox)

> Cole este prompt sempre que pedir uma página nova (ou revisão). Ele força os
> critérios de **Performance, Acessibilidade, SEO e Boas Práticas** validados no
> Lighthouse/PageSpeed. Preencha os campos `{{...}}` e mande junto.

---

## PROMPT (copie a partir daqui)

Crie/revise a página **`{{nome-do-arquivo}}.html`** do site Mr. Inox seguindo
TODOS os critérios abaixo. A entrega só é válida se passar em **100% Performance,
Acessibilidade, SEO e Práticas recomendadas** no Lighthouse. Mantenha o mesmo
design system do projeto (`styles.css`, `main.js`, paleta dark + vermelho de marca,
fontes Inter/Space Grotesk).

**Conteúdo da página:** {{descreva seções, textos e objetivo}}

### 1. Performance
- **Imagens em WebP**, redimensionadas para no máximo ~2× o tamanho de exibição
  (cards ≈ 760px, hero ≈ 680px, logos ≈ 320px). Nunca usar JPG/PNG grande.
- Todo `<img>` com **`width` e `height` explícitos** (proporção real do arquivo).
- Imagens abaixo da dobra: **`loading="lazy" decoding="async"`**.
- Imagem do LCP (a maior visível no carregamento): **`fetchpriority="high"`**, SEM
  `lazy`, e com **`<link rel="preload" as="image">`** no `<head>`.
- **Fontes não-bloqueantes**: `preconnect` + `<link rel="preload" as="style"
  onload="this.rel='stylesheet'">` + `<noscript>` de fallback. Nunca `<link rel="stylesheet">`
  direto para Google Fonts.
- Nada de JS que leia `offsetTop`/`getBoundingClientRect` dentro de `scroll` sem
  **cache + requestAnimationFrame** (evitar refluxo forçado e tarefas longas).
- CSS/JS locais; sem bibliotecas pesadas desnecessárias.

### 2. Acessibilidade (AA)
- Estrutura semântica: `<header>` → **`<main id="conteudo">`** → `<footer>`.
  Conteúdo principal SEMPRE dentro de `<main>` (um único `<main>` por página).
- **Hierarquia de headings sem pular nível**: um único `<h1>`; depois `h2` → `h3`
  → `h4` em ordem. Nunca usar heading só por tamanho de fonte — estilize via CSS.
- **Contraste mínimo 4.5:1** para texto normal (3:1 para texto grande/bold ≥24px).
  Use os tokens já ajustados: textos secundários em `--steel-300/400`, nunca abaixo.
- **ARIA válido**: nunca `aria-label` em `<div>`/`<span>` sem `role`. Use elemento
  semântico ou adicione `role` compatível (`role="group"`, `role="img"` etc.).
- Todo `<img>` com **`alt`** descritivo (vazio `alt=""` só se for decorativa).
- Todo controle interativo (`<button>`, `<a>` com ícone) com texto ou `aria-label`.
- `<svg>` decorativo: `aria-hidden="true"` ou `<title>` se informativo.
- Inputs com `<label>` associado.

### 3. SEO
- `<html lang="pt-BR">`, `<meta charset="UTF-8">`, `<meta name="viewport" ...>`.
- **`<title>`** único e descritivo + **`<meta name="description">`** (≤ 160 caracteres).
- **`<link rel="canonical" href="https://www.misterinox.com.br/{{arquivo}}">`**.
- **Open Graph**: `og:title`, `og:description`, `og:image` (JPG/PNG ~1200×630), `og:type`.
- Adicionar a página ao **`sitemap.xml`** e garantir que está liberada no `robots.txt`.
- HTML semântico (`<section>`, `<nav aria-label>`, `<article>` quando fizer sentido).
- (Recomendado) JSON-LD `LocalBusiness`/`Organization` no `<head>`.

### 4. Práticas recomendadas
- `<meta name="theme-color" content="#0a0a0b">`.
- Links externos com `target="_blank"` SEMPRE com `rel="noopener"`.
- Sem erros no console; sem recursos 404; tudo via HTTPS.
- Favicon presente.

### Checklist final (responda item a item antes de entregar)
- [ ] Todas as imagens são `.webp` com `width`/`height`; LCP com preload+fetchpriority
- [ ] `lazy`+`decoding="async"` nas imagens fora da dobra
- [ ] Fontes carregadas sem bloquear renderização
- [ ] `<main>` presente; um único `<h1>`; headings sem pular nível
- [ ] Contraste AA; nenhum `aria-*` proibido; todos os `alt`/labels presentes
- [ ] `title`, `description`, `canonical`, Open Graph preenchidos
- [ ] Página adicionada ao `sitemap.xml`
- [ ] Sem erros de console / links externos com `rel="noopener"`

---

## Referência rápida — snippets prontos

### `<head>` base
```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#0a0a0b">
  <title>{{Título}} — Mr. Inox</title>
  <meta name="description" content="{{descrição ≤160 caracteres}}">

  <link rel="icon" type="image/png" href="assets/favicon.png">
  <link rel="canonical" href="https://www.misterinox.com.br/{{arquivo}}.html">

  <!-- Open Graph -->
  <meta property="og:title" content="{{Título}}">
  <meta property="og:description" content="{{descrição}}">
  <meta property="og:image" content="assets/slider/banner-14.jpg">
  <meta property="og:type" content="website">

  <!-- Preload do LCP (troque pela imagem principal da página) -->
  <link rel="preload" as="image" href="assets/{{lcp}}.webp" fetchpriority="high">

  <!-- Fontes não-bloqueantes -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style"
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
    onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"></noscript>

  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header"><!-- ... --></header>
  <main id="conteudo">
    <!-- conteúdo da página -->
  </main>
  <footer class="site-footer"><!-- ... --></footer>
  <script src="main.js"></script>
</body>
</html>
```

### Imagem padrão
```html
<!-- abaixo da dobra -->
<img src="assets/{{img}}.webp" width="760" height="570" loading="lazy" decoding="async" alt="{{descrição}}">

<!-- imagem do LCP (topo) -->
<img src="assets/{{lcp}}.webp" width="680" height="850" fetchpriority="high" decoding="async" alt="{{descrição}}">
```

### Converter imagens para WebP (rodar na raiz do projeto)
```bash
python3 - <<'EOF'
from PIL import Image
import glob, os
def conv(src, maxw, q=82, alpha=False):
    im = Image.open(src)
    im = im.convert('RGBA') if (alpha and im.mode in ('RGBA','LA','P')) else im.convert('RGB')
    if im.width > maxw:
        im = im.resize((maxw, round(im.height*maxw/im.width)), Image.LANCZOS)
    im.save(os.path.splitext(src)[0]+'.webp', 'WEBP', quality=q, method=6)
# exemplos:
for f in glob.glob('assets/{{pasta}}/*.jpg'):
    conv(f, 760)            # cards
# conv('assets/hero.jpg', 680, q=84)          # hero
# for f in glob.glob('assets/clientes/*.png'): conv(f, 320, q=86, alpha=True)
EOF
```

### Validar antes do deploy
```bash
# servir local
python3 -m http.server 8000
# rodar Lighthouse (precisa do Chrome + npx)
npx lighthouse http://localhost:8000/{{arquivo}}.html \
  --only-categories=performance,accessibility,best-practices,seo \
  --view
```

> ⚠️ **Cache (TTL):** o GitHub Pages fixa cache em ~10 min e isso aparece como
> oportunidade no PageSpeed — não é corrigível por código. Para cache longo + CDN,
> hospede em **Cloudflare Pages / Netlify / Vercel**.
