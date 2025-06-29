# Brev.ly - Frontend

## 📋 Descrição

Frontend da aplicação **Brev.ly** - Encurtador de URL desenvolvido para o desafio da Faculdade de Tecnologia Rocketseat.

Este projeto implementa uma aplicação React SPA que permite o gerenciamento de URLs encurtadas, utilizando TypeScript, Vite e seguindo fielmente o layout do Figma.

## 🚀 Funcionalidades e Regras

### ✅ Funcionalidades Obrigatórias

- [ ] Deve ser possível criar um link
    - [ ] Não deve ser possível criar um link com encurtamento mal formatado
    - [ ] Não deve ser possível criar um link com encurtamento já existente
- [ ] Deve ser possível deletar um link
- [ ] Deve ser possível obter a URL original por meio do encurtamento
- [ ] Deve ser possível listar todas as URL's cadastradas
- [ ] Deve ser possível incrementar a quantidade de acessos de um link
- [ ] Deve ser possível baixar um CSV com o relatório dos links criados

### 🎨 Regras Específicas do Frontend

- [ ] É obrigatória a criação de uma aplicação React no formato SPA utilizando o Vite como `bundler`
- [ ] Siga o mais fielmente possível o layout do Figma
- [ ] Trabalhe com elementos que tragam uma boa experiência ao usuário (`empty state`, ícones de carregamento, bloqueio de ações a depender do estado da aplicação)
- [ ] Foco na responsividade: essa aplicação deve ter um bom uso tanto em desktops quanto em celulares

## 📄 Páginas da Aplicação

### 1. Página Raiz (`/`)
- Formulário de cadastro de links
- Listagem dos links cadastrados
- Dashboard principal da aplicação

### 2. Página de Redirecionamento (`/:url-encurtada`)
- Busca o valor dinâmico da URL
- Faz pesquisa na API por aquela URL encurtada
- Redireciona para a URL original

### 3. Página de Recurso Não Encontrado
- Exibida para URLs que não seguem o padrão
- Caso o usuário digite endereço errado
- Caso a URL encurtada não exista

## 🛠️ Stack Tecnológica

### Obrigatório
- **TypeScript** - Linguagem de programação
- **React** - Biblioteca de interface
- **Vite** - Bundler (sem framework)

### Flexível (Recomendado)
- **TailwindCSS** - Framework CSS
- **React Query** - Gerenciamento de estado e cache
- **React Hook Form** - Formulários
- **Zod** - Validação de dados

### Adicional
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones
- **React Hot Toast** - Notificações

## 📁 Estrutura do Projeto

```
web/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   │   ├── ui/        # Componentes de UI base
│   │   └── forms/     # Componentes de formulário
│   ├── pages/         # Páginas da aplicação
│   ├── hooks/         # Custom hooks
│   ├── services/      # Serviços de API
│   ├── utils/         # Utilitários
│   ├── types/         # Tipos TypeScript
│   ├── styles/        # Estilos globais
│   ├── App.tsx        # Componente principal
│   └── main.tsx       # Entry point
├── public/            # Arquivos estáticos
├── .env.example       # Exemplo de variáveis de ambiente
├── package.json
├── vite.config.ts     # Configuração do Vite
├── tailwind.config.js # Configuração do Tailwind
└── README.md
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
VITE_FRONTEND_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:3333
```

### Scripts Disponíveis

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint

# Type check
npm run type-check
```

## 🎨 Design System

### Style Guide (Figma)
- **Cores**: Paleta consistente definida no Figma
- **Tipografia**: Fontes e hierarquias
- **Componentes**: Botões, inputs, cards, etc.
- **Espaçamentos**: Sistema de grid e margins
- **Ícones**: Biblioteca de ícones consistente

### Responsividade
- **Mobile First**: Desenvolvimento focado em mobile
- **Breakpoints**: Tablet e Desktop
- **Flexibilidade**: Layout adaptativo

## 📱 Experiência do Usuário (UX)

### Estados da Interface
- **Loading States**: Indicadores de carregamento
- **Empty States**: Estados vazios informativos
- **Error States**: Tratamento de erros
- **Success States**: Confirmações de ações

### Interações
- **Feedback Visual**: Animações e transições
- **Validação em Tempo Real**: Formulários responsivos
- **Acessibilidade**: ARIA labels e navegação por teclado
- **Performance**: Carregamento otimizado

## 🔗 Integração com API

### Endpoints Utilizados
- `POST /links` - Criar link
- `GET /links` - Listar links
- `DELETE /links/:id` - Deletar link
- `GET /links/export` - Download CSV

### Gerenciamento de Estado
- **React Query**: Cache e sincronização
- **Local State**: Estados de formulário
- **Global State**: Configurações da aplicação

## 🧪 Testes

### Estrutura de Testes
```
tests/
├── unit/           # Testes unitários
├── integration/    # Testes de integração
└── e2e/           # Testes end-to-end
```

### Comandos de Teste
```bash
npm run test
npm run test:watch
npm run test:coverage
```

## 🚀 Deploy

### Produção
- Build otimizado com Vite
- Variáveis de ambiente configuradas
- CDN para assets estáticos
- SPA routing configurado

### Desenvolvimento
- Hot reload
- Dev tools habilitadas
- Logs detalhados
- Proxy para API

## 💡 Dicas de Implementação

### 1. Comece pelo Style Guide
- Prepare o tema, fontes e componentes base
- Facilita o desenvolvimento das páginas

### 2. Mobile First
- Desenvolva primeiro para mobile
- Aproveite ferramentas como Tailwind

### 3. Experiência do Desenvolvedor (DX)
- Use bibliotecas que facilitem o desenvolvimento
- Mantenha o código organizado e tipado

### 4. Performance
- Lazy loading de componentes
- Otimização de imagens
- Bundle splitting

## 🚀 Desafios Extras (Opcional)

### SPA → SSR
- Migrar para Next.js ou Remix
- Renderização no servidor

### Metadados OpenGraph
- Descrição do link
- Imagem de preview
- Metadados dinâmicos

### Upload de Imagem
- Upload para OpenGraph
- Preview de imagens

### Interface Otimista
- Feedback imediato
- Rollback em caso de erro

## 🔗 Links Úteis

- [Documentação React](https://react.dev/)
- [Documentação Vite](https://vitejs.dev/)
- [Documentação TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação React Query](https://tanstack.com/query/latest)
- [Figma do Projeto](https://www.figma.com/community/file/1477335071553579816/encurtador-de-links)

## 📱 Screenshots

### Desktop
![Desktop View](screenshots/desktop.png)

### Mobile
![Mobile View](screenshots/mobile.png)

---

**Desenvolvido com 💜 para o desafio da Faculdade de Tecnologia Rocketseat** 