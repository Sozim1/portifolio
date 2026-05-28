/**
 * projects.js — Centralized project data.
 *
 * HOW TO ADD A NEW PROJECT:
 * 1. Copy one of the objects below and paste it at the end of the array.
 * 2. Fill in all the fields (leave empty strings "" for missing links).
 * 3. For images, place them at:
 *      /assets/projects/<id>/cover.png
 *      /assets/projects/<id>/screen-01.png
 *      /assets/projects/<id>/screen-02.png
 *      etc.
 * 4. For a demo video, place it at:
 *      /assets/projects/<id>/demo.mp4
 *    If no video exists, an animated fake demo will be shown automatically.
 */

export const projects = [
  {
    id: "wrist-rsvp-reader",
    title: "Wrist RSVP Reader",
    shortDescription: "Leitor RSVP para Wear OS com foco em leitura rápida e interface circular otimizada.",
    description:
      "Aplicativo para Wear OS que implementa a técnica RSVP (Rapid Serial Visual Presentation) de leitura, exibindo uma palavra por vez no visor circular do smartwatch para maximizar velocidade de leitura e foco.",
    problem:
      "Ler textos longos em um smartwatch com tela pequena e circular é desconfortável. O scroll convencional não funciona bem em dispositivos de pulso.",
    solution:
      "Implementação do algoritmo RSVP que exibe palavras sequencialmente em alta velocidade, eliminando o movimento ocular e aproveitando ao máximo a tela redonda do Wear OS com ajustes de velocidade e pausa intuitivos.",
    features: [
      "Exibição RSVP de uma palavra por vez",
      "Controle de velocidade ajustável (WPM)",
      "Pausa e retomada por gesto",
      "Sincronização com dispositivo pareado",
      "Interface circular segura para Wear OS",
      "Progresso de leitura visível",
    ],
    techs: ["Wear OS", "Kotlin", "Jetpack Compose", "Sync API", "Watch Face"],
    cover: "/assets/projects/wrist-rsvp-reader/cover.jpeg",
    images: ["/assets/projects/wrist-rsvp-reader/imagem1.jpeg"],
    demoVideo: "",
    links: { github: "", deploy: "", docs: "" },
    accentColor: "#6ee7b7",
  },
  {
    id: "sozim-sdk",
    title: "Sozim SDK — Galaxy Watch Ultra",
    shortDescription: "SDK com BLE HID, reconhecimento de gestos, telemetria IMU e dashboard de QA em tempo real.",
    description:
      "SDK completo para Galaxy Watch Ultra que transforma o relógio em um controlador HID sem fio via BLE, com reconhecimento de gestos baseado em IMU, modo mouse WOWMouse e dashboard operacional para validação de desempenho.",
    problem:
      "Smartwatches não são nativamente suportados como dispositivos de entrada HID. Não havia SDK open-source que expusesse telemetria de sensores e gestos em tempo real para validação em loop fechado.",
    solution:
      "Desenvolvimento de um SDK em Kotlin com pipeline BLE HID completo, motor de gestos sobre dados IMU, e um dashboard FastAPI/WebSocket para monitorar, validar e depurar sessões de teste em tempo real.",
    features: [
      "BLE HID (Bluetooth Low Energy Human Interface Device)",
      "Reconhecimento de gestos por IMU (giroscópio + acelerômetro)",
      "Modo mouse WOWMouse estilo apontador",
      "Dashboard QA com WebSocket em tempo real",
      "Pipeline de validação de gestos",
      "Telemetria de sensores com gráficos ao vivo",
      "Sessões de teste com métricas e relatórios",
    ],
    techs: ["Kotlin", "Wear OS", "BLE HID", "FastAPI", "Python", "WebSocket", "Chart.js"],
    cover: "/assets/projects/sozim-sdk/cover.jpeg",
    images: ["/assets/projects/sozim-sdk/imagem1.png"],
    demoVideo: "",
    links: { github: "", deploy: "", docs: "" },
    accentColor: "#818cf8",
  },
  {
    id: "rh-assinatura-digital",
    title: "Sistema de RH com Assinatura Digital",
    shortDescription: "Integração com ForSign para fluxo completo de assinatura de documentos de RH com AWS S3.",
    description:
      "Sistema integrado de Recursos Humanos com fluxo completo de assinatura digital via ForSign. Inclui envio de documentos para funcionário e RH, aprovação de anexos, sincronização via cron job e armazenamento de ZIPs assinados no S3.",
    problem:
      "O processo de coleta de assinaturas em documentos de RH era manual, demorado e sem rastreabilidade. Documentos circulavam por e-mail sem garantia de integridade.",
    solution:
      "Integração com a API do ForSign para criação automática de envelopes de assinatura, notificações para signatários, webhook de conclusão, e armazenamento centralizado dos documentos assinados no AWS S3.",
    features: [
      "Criação automática de envelopes ForSign",
      "Fluxo de assinatura funcionário + RH",
      "Aprovação de anexos digitais",
      "Cron de sincronização de status",
      "Download de ZIP assinado",
      "Armazenamento seguro no AWS S3",
      "Histórico e rastreabilidade",
    ],
    techs: ["PHP", "CakePHP", "ForSign API", "AWS S3", "Cron Jobs", "MySQL"],
    cover: "/assets/projects/rh-assinatura-digital/cover.png",
    images: [],
    demoVideo: "",
    links: { github: "", deploy: "", docs: "" },
    accentColor: "#34d399",
  },
  {
    id: "mercado-rcc",
    title: "MercadoRCC",
    shortDescription: "Plataforma multi-anúncios estilo marketplace com Next.js, autenticação JWT e perfil de vendedor.",
    description:
      "Marketplace completo onde usuários podem publicar, editar e gerenciar anúncios de produtos com upload de imagens, categorias, perfil de vendedor e sistema de autenticação JWT com refresh token.",
    problem:
      "A região precisava de uma plataforma de compra e venda local acessível, sem as complicações de grandes marketplaces, com foco na experiência do vendedor pequeno.",
    solution:
      "Desenvolvida uma plataforma full-stack com Next.js no front-end, Node.js/Express no back-end, banco de dados relacional e upload de imagens otimizado. JWT com refresh token garante sessões seguras.",
    features: [
      "Publicação e edição de anúncios",
      "Upload de múltiplas imagens por produto",
      "Categorias e filtros de busca",
      "Perfil de vendedor com histórico",
      "Autenticação JWT + refresh token",
      "Dashboard administrativo",
      "Layout responsivo",
    ],
    techs: ["Next.js", "Node.js", "Express", "JWT", "PostgreSQL", "Multer", "TypeScript"],
    cover: "/assets/projects/mercado-rcc/cover.png",
    images: [],
    demoVideo: "",
    links: { github: "", deploy: "", docs: "" },
    accentColor: "#fbbf24",
  },
  {
    id: "pdv-multi-tenant",
    title: "PDV Multi-Tenant",
    shortDescription: "Sistema de ponto de venda SaaS com isolamento por empresa, SQLite compactado e dashboards.",
    description:
      "Sistema de PDV (Ponto de Venda) com arquitetura multi-tenant, onde cada empresa opera em banco SQLite isolado e compactado. Inclui controle financeiro, relatórios e dashboards administrativos.",
    problem:
      "Pequenos comerciantes precisam de sistemas de PDV simples, baratos e sem dependência de internet constante, mas com dados separados por estabelecimento.",
    solution:
      "Arquitetura multi-tenant com SQLite por tenant permite isolamento total dos dados, backup por arquivo e operação offline. Dashboards em tempo real mostram fluxo de caixa e estoque.",
    features: [
      "Isolamento multi-tenant por SQLite",
      "Registro de vendas e emissão de recibos",
      "Controle de estoque em tempo real",
      "Relatórios financeiros diários/mensais",
      "Dashboard administrativo por empresa",
      "Backup por compressão de arquivo",
      "Operação offline",
    ],
    techs: ["Node.js", "SQLite", "Chart.js", "TypeScript", "SaaS Architecture"],
    cover: "/assets/projects/pdv-multi-tenant/cover.png",
    images: [],
    demoVideo: "",
    links: { github: "", deploy: "", docs: "" },
    accentColor: "#f472b6",
  },
  {
    id: "aws-s3-integration",
    title: "Integração Centralizada com AWS S3",
    shortDescription: "Upload e download via presigned URLs com migração de módulos legados CakePHP.",
    description:
      "Módulo centralizado de gestão de arquivos com AWS S3, usando presigned URLs para uploads diretos do browser, armazenamento apenas da key no banco e migração transparente de módulos legados.",
    problem:
      "Arquivos eram armazenados no próprio servidor, causando problemas de escala, backup e segurança. Módulos legados em CakePHP acessavam arquivos por caminhos de disco.",
    solution:
      "Integração com AWS S3 usando presigned URLs que permitem upload direto do browser sem passar pelo servidor, armazenando apenas a key no banco. Camada de compatibilidade migra módulos legados sem reescrita completa.",
    features: [
      "Upload direto via presigned URL",
      "Download seguro com URL temporária",
      "Apenas key armazenada no banco",
      "Migração de módulos legados CakePHP",
      "Controle de acesso por papel",
      "Expiração automática de URLs",
    ],
    techs: ["PHP", "CakePHP", "AWS S3", "AWS SDK", "Presigned URLs", "MySQL"],
    cover: "/assets/projects/aws-s3-integration/cover.png",
    images: [],
    demoVideo: "",
    links: { github: "", deploy: "", docs: "" },
    accentColor: "#fb923c",
  },
  {
    id: "sozim-qa-dashboard",
    title: "Dashboard QA do Sozim SDK",
    shortDescription: "Painel Python/FastAPI com WebSocket, gráficos IMU, sessões de teste e viewer de logcat.",
    description:
      "Dashboard de QA para o Sozim SDK que conecta ao Galaxy Watch via BLE, exibe telemetria de sensores IMU em tempo real, gerencia sessões de teste de gestos, e integra viewer de logcat ADB.",
    problem:
      "Validar o pipeline de gestos e a qualidade dos dados IMU sem uma interface visual era lento e impreciso. Logs de ADB misturados com outras saídas dificultavam o debug.",
    solution:
      "FastAPI com WebSocket mantém conexão contínua com o watch, transmitindo dados IMU filtrados para gráficos ao vivo. Gerenciador de sessões registra testes e gera métricas. Viewer de logcat filtra por tag.",
    features: [
      "Conexão BLE com Galaxy Watch Ultra",
      "Gráficos IMU em tempo real (giroscópio + acelerômetro)",
      "Gerenciamento de sessões de teste",
      "Pipeline de validação de gestos",
      "Viewer de logcat ADB com filtros",
      "Métricas por sessão e relatórios",
      "Interface WebSocket reativa",
    ],
    techs: ["Python", "FastAPI", "WebSocket", "Chart.js", "ADB", "BLE", "HTML/CSS/JS"],
    cover: "/assets/projects/sozim-qa-dashboard/cover.png",
    images: [],
    demoVideo: "",
    links: { github: "", deploy: "", docs: "" },
    accentColor: "#a78bfa",
  },
  {
    id: "codexpet",
    title: "CodexPet",
    shortDescription: "Produto web para organização de fluxos pet com área administrativa e experiência do usuário final.",
    description:
      "Plataforma web para gestão de petshops e clínicas veterinárias, combinando interface administrativa completa com experiência do cliente para agendamentos, histórico de atendimentos e lembretes.",
    problem:
      "Petshops pequenos gerenciam agendamentos por WhatsApp e cadernos, perdendo histórico de animais e causando falhas de comunicação com tutores.",
    solution:
      "Web app com área do tutor (agendamentos, histórico, vacinação) e área administrativa (agenda, prontuários, financeiro), com notificações automáticas e interface responsiva.",
    features: [
      "Agendamento online pelo tutor",
      "Prontuário digital do pet",
      "Histórico de vacinação e consultas",
      "Área administrativa completa",
      "Notificações de lembretes",
      "Relatórios financeiros",
      "Layout responsivo",
    ],
    techs: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "TypeScript", "Tailwind CSS"],
    cover: "/assets/projects/codexpet/cover.png",
    images: [],
    demoVideo: "",
    links: { github: "", deploy: "", docs: "" },
    accentColor: "#4ade80",
  },
  {
    id: "transnet-site",
    title: "Site Transnet",
    shortDescription: "Plataforma institucional e operacional com front público, área admin e arquitetura modular.",
    description:
      "Site institucional e operacional para a Transnet com área pública, painel administrativo e arquitetura preparada para evolução contínua de módulos internos de gestão.",
    problem:
      "A empresa precisava de presença digital profissional com área de gestão interna, mas as soluções existentes não integravam bem os dois mundos sem duplicação de código.",
    solution:
      "Monorepo com Next.js no front, NestJS no back e Prisma como ORM. Arquitetura modular permite adicionar funcionalidades internas sem afetar o site público.",
    features: [
      "Site institucional público responsivo",
      "Área administrativa protegida",
      "Gestão de conteúdo dinâmico",
      "Arquitetura modular e escalável",
      "API REST com NestJS",
      "ORM Prisma com migrations",
    ],
    techs: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    cover: "/assets/projects/transnet-site/cover.png",
    images: [],
    demoVideo: "",
    links: { github: "", deploy: "", docs: "" },
    accentColor: "#38bdf8",
  },
  {
    id: "iluminacao-publica-iot",
    title: "Iluminação Pública Inteligente",
    shortDescription: "Sistema IoT para ajuste automático de intensidade luminosa baseado em presença, alinhado à ODS 11.",
    description:
      "Sistema IoT para smart cities que ajusta automaticamente a intensidade de postes de luz com base em sensores de presença de pedestres e veículos, reduzindo consumo energético e alinhando-se à ODS 11 da ONU.",
    problem:
      "Postes de iluminação pública operam em 100% da intensidade a noite toda, desperdiçando energia quando não há pessoas ou veículos nas vias.",
    solution:
      "Rede de sensores ultrassônicos e PIR conectados a microcontroladores que modulam a intensidade do LED via PWM. Dashboard centralizado mostra consumo em tempo real e histórico de eventos.",
    features: [
      "Sensores de presença PIR e ultrassônico",
      "Controle PWM de intensidade",
      "Redução de até 70% no consumo",
      "Dashboard de monitoramento",
      "Comunicação MQTT entre nós",
      "Alinhamento com ODS 11 ONU",
      "Relatórios de economia energética",
    ],
    techs: ["ESP32", "MQTT", "PIR Sensor", "PWM", "Python", "Dashboard IoT"],
    cover: "/assets/projects/iluminacao-publica-iot/cover.png",
    images: [],
    demoVideo: "",
    links: { github: "", deploy: "", docs: "" },
    accentColor: "#fde047",
  },
  {
    id: "axiom-memecoin-bot",
    title: "Bot de Memecoins Axiom Trade",
    shortDescription: "Analisador de memecoins com coleta via WebSocket, scoring de momentum e alertas automáticos.",
    description:
      "Ferramenta de análise de memecoins que coleta dados em tempo real da Axiom Trade via WebSocket e XHR, aplica algoritmo de scoring de momentum e envia alertas para oportunidades de entrada.",
    problem:
      "Memecoins têm janelas de oportunidade de minutos. Monitorar manualmente dezenas de tokens simultaneamente é impossível sem perder os momentos de alta.",
    solution:
      "Bot que intercepta dados da plataforma via WebSocket, calcula score de momentum com base em volume, variação de preço e holders, e gera alertas filtrados por threshold configurável.",
    features: [
      "Coleta de dados via WebSocket em tempo real",
      "Score de momentum por token",
      "Alertas configuráveis por threshold",
      "Histórico de sinais gerados",
      "Filtros por volume e variação",
      "Dashboard de monitoramento",
    ],
    techs: ["JavaScript", "WebSocket", "XHR Intercept", "Node.js", "Scoring Algorithm"],
    cover: "/assets/projects/axiom-memecoin-bot/cover.png",
    images: [],
    demoVideo: "",
    links: { github: "", deploy: "", docs: "" },
    accentColor: "#f43f5e",
  },
  {
    id: "pizza-whatsapp-bot",
    title: "Pedidos de Pizza via WhatsApp",
    shortDescription: "CRUD de pedidos integrado com bot WhatsApp para organizar o fluxo comercial de pizzarias.",
    description:
      "Sistema de pedidos para pizzarias com bot de WhatsApp que recebe pedidos conversacionalmente, registra endereço, telefone e pizza escolhida, e organiza o fluxo no painel do atendente.",
    problem:
      "Pizzarias pequenas recebem pedidos por WhatsApp de forma desorganizada, perdendo pedidos e errando entregas por falta de sistematização.",
    solution:
      "Bot WhatsApp com fluxo conversacional guiado coleta dados do pedido passo a passo e registra no sistema. Painel do atendente mostra fila de pedidos em tempo real com status de preparo e entrega.",
    features: [
      "Bot WhatsApp com fluxo conversacional",
      "CRUD completo de pedidos",
      "Registro de endereço e telefone",
      "Seleção de sabores e tamanhos",
      "Painel de atendente em tempo real",
      "Status de preparo e entrega",
      "Histórico de pedidos por cliente",
    ],
    techs: ["Node.js", "WhatsApp Bot", "CRUD", "Express", "SQLite", "JavaScript"],
    cover: "/assets/projects/pizza-whatsapp-bot/cover.png",
    images: ["/assets/projects/pizza-whatsapp-bot/imagem1.png"],
    demoVideo: "",
    links: { github: "", deploy: "", docs: "" },
    accentColor: "#a3e635",
  },
  {
    id: "devlens-ai",
    title: "DevLens AI",
    shortDescription: "API FastAPI com GenAI para code review, documentacao tecnica e sugestao de testes.",
    description:
      "API modular criada para simular uma ferramenta interna de produtividade para times de desenvolvimento. Recebe trechos de codigo, avalia riscos, sugere melhorias, gera documentacao em Markdown e cria planos de testes unitarios.",
    problem:
      "Revisoes manuais de codigo, documentacao e escrita de testes consomem tempo do time e podem deixar passar riscos simples de seguranca, validacao e manutenibilidade.",
    solution:
      "FastAPI com Pydantic, provider isolado para OpenAI/Gemini, fallback local deterministico, historico em SQLite, exportacao em Markdown, rate limit simples e Swagger automatico para validar os fluxos da API.",
    features: [
      "Endpoint de code review com score, risco e problemas encontrados",
      "Sugestoes de melhoria e versao refatorada do codigo",
      "Geracao automatica de documentacao tecnica em Markdown",
      "Geracao de casos de teste e exemplo de teste unitario",
      "Historico das analises em SQLite",
      "Provider configuravel para OpenAI, Gemini ou fallback local",
      "Docker, Swagger e testes automatizados com Pytest",
    ],
    techs: ["Python", "FastAPI", "Pydantic", "GenAI", "SQLite", "Docker", "Pytest"],
    cover: "",
    images: [],
    demoVideo: "",
    links: { github: "https://github.com/Sozim1/devlens-ai", deploy: "", docs: "" },
    accentColor: "#22d3ee",
  },
];
