# Brev.ly - Encurtador de URL

## 📋 Descrição

O **Brev.ly** é uma aplicação FullStack de encurtador de URL desenvolvida como projeto da Faculdade de Tecnologia Rocketseat. A aplicação permite o cadastro, listagem e remoção de links encurtados, geração de relatório dos acessos de cada link e redirecionamento correto do link encurtado para o link original.

## 🚀 Funcionalidades

### Backend ✅ **100% COMPLETO**
- [x] API REST com Node.js e Fastify
- [x] Cadastro de links encurtados
- [x] Listagem de links
- [x] Remoção de links
- [x] Geração de relatórios de acesso
- [x] Redirecionamento de URLs encurtadas
- [x] Exportação de links em CSV
- [x] Banco de dados PostgreSQL com Drizzle ORM
- [x] Validação de dados com JSON Schema
- [x] Upload de arquivos para CDN (Cloudflare R2)

### Frontend ✅ **100% COMPLETO**
- [x] Interface React com TypeScript
- [x] Dashboard para gerenciar links
- [x] Formulário para criar novos links
- [x] Lista de links com ações (copiar/remover)
- [x] Exportação de links para CSV
- [x] Design responsivo e moderno
- [x] Integração completa com API do backend

### DevOps
- [x] Containerização com Docker
- [x] Deploy automatizado
- [x] CI/CD pipeline

## 📁 Estrutura do Projeto

```
ftr-desafio-fase-1/
├── server/          # Backend - Node.js + Fastify ✅ COMPLETO
│   ├── src/         # Código fonte
│   ├── api-testing/ # Arquivos de teste da API
│   └── README.md    # Documentação do backend
├── web/            # Frontend - React + TypeScript
└── README.md       # Este arquivo
```

## 🛠️ Tecnologias

### Backend ✅
- Node.js
- Fastify (framework web)
- TypeScript
- PostgreSQL
- Drizzle ORM
- Cloudflare R2 (CDN)
- CORS
- Helmet
- JSON Schema (validação)

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Query

### DevOps
- Docker
- Docker Compose

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- PostgreSQL
- Docker (opcional)

### Backend ✅
```bash
cd server
npm install
# Configure as variáveis de ambiente no .env
npm run dev
```

**Endpoints disponíveis:**
- `GET /health` - Health check
- `GET /db-test` - Teste de conexão com banco
- `POST /api/links` - Criar link encurtado
- `DELETE /api/links/:id` - Deletar link
- `GET /api/links/export` - Exportar links em CSV
- `GET /api/links/:shortCode` - Redirecionar para URL original
- `GET /api/links/:shortCode/stats` - Estatísticas do link
- `GET /api/links` - Listar todos os links

### Frontend
```bash
cd web
npm install
npm run dev
```

## 📝 Endpoints da API ✅

### Links
- `POST /api/links` - Criar novo link encurtado
- `GET /api/links` - Listar todos os links
- `DELETE /api/links/:id` - Remover link
- `GET /api/links/:shortCode/stats` - Estatísticas do link
- `GET /api/links/export` - Exportar links em CSV

### Redirecionamento
- `GET /api/links/:shortCode` - Redirecionar para URL original

### Utilitários
- `GET /health` - Health check
- `GET /db-test` - Teste de conexão com banco

## 🎨 Design

O design da aplicação segue o layout disponibilizado no Figma:
- Interface moderna e intuitiva
- Paleta de cores consistente
- Componentes reutilizáveis
- Responsividade para mobile

## 📊 Funcionalidades Principais

1. **Encurtamento de URLs**: Transforma URLs longas em links curtos e únicos ✅
2. **Dashboard**: Interface para gerenciar todos os links criados
3. **Relatórios**: Visualização de estatísticas de acesso por link ✅
4. **Exportação CSV**: Download de relatórios em formato CSV ✅
5. **API RESTful**: Backend completo com todos os endpoints necessários ✅

## 🔧 Desenvolvimento

Este projeto foi desenvolvido como parte do desafio da faculdade, consolidando conhecimentos em:
- Desenvolvimento FullStack
- APIs REST
- Frontend moderno
- DevOps básico
- Boas práticas de código

## 📈 Progresso do Projeto

### Backend ✅ **100% COMPLETO**
- ✅ API REST com Fastify
- ✅ Banco de dados PostgreSQL + Drizzle ORM
- ✅ Validação de dados com JSON Schema
- ✅ Exportação CSV com upload para CDN
- ✅ Testes completos com Postman/Insomnia
- ✅ Documentação detalhada

### Frontend ✅ **100% COMPLETO**
- [x] Interface React com TypeScript
- [x] Integração com API do backend
- [x] Dashboard responsivo
- [x] Formulários e validações
- [x] Design moderno com Tailwind CSS
- [x] Estados de loading e feedback visual

### DevOps 📋
- [x] Containerização com Docker
- [x] Deploy automatizado
- [x] CI/CD pipeline

## 🔗 Observações sobre o fluxo de redirecionamento
- O link encurtado exibido ao usuário aponta para o frontend (`/r/:shortCode`)
- O frontend exibe uma tela de redirecionamento estilizada e, após 2s, redireciona para o backend (`/r/:shortCode`)
- O contador de acessos é incrementado apenas ao acessar a rota pública do backend 

## 🚀 Deploy Automatizado (Vercel)

### Frontend
- O frontend pode ser deployado facilmente na Vercel.
- Configure o projeto na Vercel apontando para a pasta `web`.
- Defina a variável de ambiente `VITE_API_URL` com a URL do backend.
- O deploy será feito automaticamente pelo workflow do GitHub Actions após cada push na branch main.

### Backend
- Para projetos Fastify tradicionais, recomenda-se deploy em Railway, Render, Fly.io, etc.
- (Opcional) Para deploy Serverless na Vercel, é necessário adaptar o backend.

### CI/CD (GitHub Actions)
- O workflow `.github/workflows/ci.yml` faz build/lint do frontend e backend e deploya o frontend na Vercel.
- Configure os secrets no repositório GitHub:
  - `VERCEL_TOKEN`: Token de acesso da Vercel
  - `VERCEL_ORG_ID`: ID da organização Vercel
  - `VERCEL_PROJECT_ID`: ID do projeto Vercel (frontend) 

## ✅ Status Final do Projeto
- [x] Layout 100% fiel ao Figma (SPA, responsivo, UX moderna)
- [x] Feedback visual (toast) em todas as ações principais
- [x] Fluxo de redirecionamento SPA: link encurtado aponta para o frontend, que exibe tela de redirecionamento e depois redireciona para o backend
- [x] Contador de acessos incrementado apenas via rota pública do backend
- [x] Containerização com Docker concluída
- [x] CI/CD com GitHub Actions (build, lint e deploy automático do frontend na Vercel)
- [x] Instruções de deploy automatizado e integração frontend-backend atualizadas 

## 📄 Licença

Este projeto é de uso educacional.

---

**Desenvolvido com 💜 para o desafio da Faculdade de Tecnologia Rocketseat** 