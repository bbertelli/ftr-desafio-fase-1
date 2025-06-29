# Brev.ly - Backend

## 📋 Descrição

Backend da aplicação **Brev.ly** - Encurtador de URL desenvolvido para o desafio da Faculdade de Tecnologia Rocketseat.

Este projeto implementa uma API REST para gerenciar o encurtamento de URLs, utilizando TypeScript, Fastify, Drizzle e PostgreSQL.

## 🚀 Funcionalidades e Regras

### ✅ Funcionalidades Obrigatórias

- [x] Deve ser possível criar um link
    - [x] Não deve ser possível criar um link com URL encurtada mal formatada
    - [x] Não deve ser possível criar um link com URL encurtada já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível obter a URL original por meio de uma URL encurtada
- [x] Deve ser possível listar todas as URL's cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [x] Deve ser possível exportar os links criados em um CSV
    - [x] Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
    - [x] Deve ser gerado um nome aleatório e único para o arquivo
    - [x] Deve ser possível realizar a listagem de forma performática
    - [x] O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação

## 🛠️ Stack Tecnológica

### Obrigatório
- [x] **TypeScript** - Linguagem de programação
- [x] **Fastify** - Framework web
- [x] **Drizzle** - ORM para banco de dados
- [x] **PostgreSQL** - Banco de dados

### Recomendado
- [x] **@fastify/cors** - Middleware CORS
- [x] **@fastify/helmet** - Segurança
- [x] **dotenv** - Variáveis de ambiente
- [x] **JSON Schema** - Validação de dados (implementado no Fastify)

## 📁 Estrutura do Projeto

```
server/
├── src/
│   ├── controllers/     # Controladores da aplicação ✅
│   ├── routes/         # Rotas da API ✅
│   ├── services/       # Lógica de negócio ✅
│   ├── models/         # Modelos do Drizzle ✅
│   ├── database/       # Conexão com banco ✅
│   ├── migrations/     # Migrações do banco ✅
│   ├── utils/          # Utilitários
│   └── app.ts          # Configuração do Fastify ✅
├── api-testing/        # Arquivos de teste da API ✅
├── docker/
│   └── Dockerfile      # Dockerfile da aplicação
├── .env.example        # Exemplo de variáveis de ambiente ✅
├── package.json
└── README.md
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
PORT=3333
DATABASE_URL="postgresql://user:password@localhost:5432/brevly"

CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET=""
CLOUDFLARE_PUBLIC_URL=""
```

### Scripts Disponíveis

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Executar migrations
npm run db:migrate

# Build para produção
npm run build

# Executar em produção
npm start
```

## 📝 Endpoints da API

### Links
- [x] `POST /api/links` - Criar novo link encurtado
- [x] `GET /api/links` - Listar todos os links
- [x] `DELETE /api/links/:id` - Deletar link
- [x] `GET /api/links/:shortCode` - Redirecionar para URL original
- [x] `GET /api/links/:shortCode/stats` - Obter estatísticas do link
- [x] `GET /api/links/export` - Exportar links em CSV

### Utilitários
- [x] `GET /health` - Health check
- [x] `GET /db-test` - Teste de conexão com banco

## 🗄️ Banco de Dados

### Tabelas

#### links ✅
- `id` - UUID (Primary Key)
- `original_url` - TEXT (URL original)
- `short_code` - VARCHAR (Código encurtado único)
- `access_count` - INTEGER (Contador de acessos)
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

## 🐳 Docker

O projeto inclui um `Dockerfile` otimizado seguindo as melhores práticas:

- Multi-stage build
- Usuário não-root
- Otimização de camadas
- Health check

### Comandos Docker

```bash
# Build da imagem
docker build -t brevly-backend .

# Executar container
docker run -p 3333:3333 brevly-backend

# Com Docker Compose
docker-compose up
```

## 🔒 Segurança

- [x] CORS habilitado
- [x] Validação de entrada com JSON Schema
- [x] Sanitização de dados
- [ ] Rate limiting (recomendado)
- [x] Helmet para headers de segurança

## 📊 Performance

- [x] Índices no banco de dados para `short_code`
- [ ] Paginação na listagem de links
- [ ] Cache para URLs mais acessadas (recomendado)
- [x] Otimização de queries com Drizzle

## 🧪 Testes

### Arquivos de Teste ✅
- [x] Coleção Postman/Insomnia completa
- [x] Variáveis de ambiente configuradas
- [x] Documentação de uso
- [x] Todos os endpoints testados e funcionando

### Estrutura de Testes (Futuro)
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

## 📈 Monitoramento

- [x] Logs estruturados
- [ ] Métricas de performance
- [x] Health check endpoint
- [ ] Error tracking

## 🚀 Deploy

### Produção
- Build otimizado
- Variáveis de ambiente configuradas
- Banco de dados PostgreSQL
- CDN para arquivos CSV

### Desenvolvimento
- [x] Hot reload
- [x] Logs detalhados
- [x] Banco local ou Docker

## 💡 Dicas de Implementação

1. **Consistência**: ✅ Mantenha padrão entre usar `id` ou `short_code` para operações
2. **Validação**: ✅ Valide URLs antes de salvar
3. **Unicidade**: ✅ Garanta que `short_code` seja único
4. **Performance**: ✅ Use índices no banco de dados
5. **Segurança**: ⚠️ Implemente rate limiting
6. **Logs**: ✅ Registre acessos para estatísticas

## 🔗 Links Úteis

- [Documentação Fastify](https://www.fastify.io/docs/)
- [Documentação Drizzle](https://orm.drizzle.team/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

**Desenvolvido com 💜 para o desafio da Faculdade de Tecnologia Rocketseat** 