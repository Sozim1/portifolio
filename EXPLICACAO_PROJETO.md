# Portfólio Gabriel Alves

## Objetivo do projeto

Este projeto é um portfólio pessoal para apresentar os principais projetos de Gabriel Alves, com foco em sistemas reais, desenvolvimento full-stack, integrações, automação, dashboards, IoT e Wear OS.

O visual foi baseado no design de referência do arquivo `DESIGN.md`, inspirado no estilo do site `monopo.vn`: tema escuro, tipografia branca, fundo com gradiente orgânico animado, layout espaçoso e elementos minimalistas.

## Stack usada

- Vite
- Tailwind CSS v4
- CSS custom properties
- HTML estático
- JavaScript mínimo apenas para carregar o CSS

O projeto não usa React, Next.js ou back-end. A intenção é manter o portfólio simples, rápido e fácil de publicar.

## Arquivos principais

- `index.html`: estrutura completa da página, incluindo hero, navegação, projetos, stack e contato.
- `src/styles.css`: estilos principais, layout responsivo, animação de background, cards, botões e navegação lateral.
- `variables.css`: tokens CSS do design, como cores, fontes, espaçamentos e raios.
- `theme.css`: configuração de tema para Tailwind v4.
- `vite.config.js`: configuração do Vite com plugin do Tailwind v4.
- `package.json`: scripts e dependências do projeto.

## Comandos

Instalar dependências:

```bash
npm install
```

Rodar localmente:

```bash
npm run dev
```

Gerar build de produção:

```bash
npm run build
```

Servidor local usado durante o desenvolvimento:

```text
http://localhost:5173
```

## Direção visual

O design segue estas regras:

- Fundo principal preto (`#000000`).
- Texto principal branco (`#ffffff`).
- Tipografia principal usando `Roobert`, com fallback para system fonts.
- Layout espaçoso, com bastante respiro entre seções.
- Botões em formato pill com raio `75.024px`.
- Bordas sutis com `rgba(255, 255, 255, 0.3)`.
- Sem sombras fortes.
- Sem cores de destaque muito saturadas além do gradiente definido.
- Fundo animado com massas grandes de cor, inspirado no comportamento visual do `monopo.vn`.

## Background animado

O background animado foi implementado em CSS puro com a classe:

```html
<div class="motion-background" aria-hidden="true"></div>
```

Essa camada fica fixa atrás de todo o site e usa pseudo-elementos `::before` e `::after` com:

- `linear-gradient`
- `radial-gradient`
- `transform`
- animações `@keyframes`

As animações principais são:

- `gradient-drift`

Também existe suporte a acessibilidade com:

```css
@media (prefers-reduced-motion: reduce)
```

Nesse caso, a animação é desativada para usuários que preferem menos movimento.

## Navegação

A navegação foi alterada para ficar parecida com a referência visual enviada:

- Sem background escuro.
- Fixa na lateral direita no desktop.
- Links empilhados verticalmente.
- Texto em uppercase.
- Opacidade baixa por padrão e destaque no hover.

Links atuais:

- `WORK` aponta para `#projetos`
- `STACK` aponta para `#stack`
- `CONTACT` aponta para `#contato`

No mobile, a navegação volta para o topo em linha para não cobrir o conteúdo.

## Projetos exibidos

O portfólio mostra estes projetos:

- Wrist RSVP Reader
- Sozim SDK para Galaxy Watch Ultra
- Sistema de RH com assinatura digital integrado ao ForSign
- MercadoRCC
- Sistema PDV multi-tenant
- Integração centralizada com AWS S3
- Dashboard QA do Sozim SDK
- CodexPet
- Site para Transnet
- Sistema IoT de iluminação pública inteligente
- Bot/analisador de memecoins da Axiom Trade
- Sistema de pedidos de pizza via WhatsApp

Cada projeto é apresentado em um card com:

- índice numérico
- nome
- descrição curta
- tags de tecnologia ou área

## Seções da página

### Hero

Primeira dobra da página, com título grande:

```text
Portfólio de projetos reais, sistemas SaaS e integrações técnicas.
```

Inclui uma descrição curta sobre atuação com web, back-end, dashboards, AWS, Wear OS, IoT e automações.

### Projetos

Seção principal do portfólio. Os dois primeiros projetos aparecem em cards maiores, e os demais em uma grade de cards menores.

### Stack

Resume as áreas de atuação:

- Front-end
- Back-end
- Infra e dados
- Dispositivos

### Contato

Footer com chamada curta e link de e-mail:

```text
gabrielperus2009@gmail.com
```

## Responsividade

O CSS tem breakpoints para:

- telas abaixo de `920px`
- telas abaixo de `640px`

Nessas telas:

- a grade de projetos vira uma coluna
- a navegação lateral vira navegação superior
- paddings são reduzidos
- o hero alinha melhor o conteúdo para telas menores

## Estado atual

O projeto já foi validado com:

```bash
npm run build
```

O build passou sem erros.

Também foi testado localmente em:

```text
http://localhost:5173/#projetos
```

## Observações para outra IA

Se outra IA for continuar este projeto, deve preservar:

- Tailwind v4
- CSS variables existentes
- estética dark/minimalista do `DESIGN.md`
- background animado em CSS
- navegação lateral transparente no desktop
- botões pill com raio `75.024px`
- ausência de sombras pesadas
- foco em projetos reais e descrição objetiva

Evitar transformar a página em landing page genérica. A primeira tela deve continuar funcionando como portfólio real, com conteúdo direto sobre Gabriel Alves e seus projetos.
