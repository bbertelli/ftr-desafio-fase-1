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

### Frontend
- [ ] Interface React com TypeScript
- [ ] Dashboard para gerenciar links
- [ ] Formulário para criar novos links
- [ ] Lista de links com ações (editar/remover)
- [ ] Relatórios visuais de acessos
- [ ] Design responsivo e moderno

### DevOps
- [ ] Containerização com Docker
- [ ] Deploy automatizado
- [ ] CI/CD pipeline

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

### Frontend 🔄 **PRÓXIMO PASSO**
- [ ] Interface React com TypeScript
- [ ] Integração com API do backend
- [ ] Dashboard responsivo
- [ ] Formulários e validações

### DevOps 📋 **PENDENTE**
- [ ] Containerização com Docker
- [ ] Deploy automatizado
- [ ] CI/CD pipeline

## 📄 Licença

Este projeto é de uso educacional.

---

**Desenvolvido com 💜 para o desafio da Faculdade de Tecnologia Rocketseat** 