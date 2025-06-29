# Brev.ly - Encurtador de URL

## 📋 Descrição

O **Brev.ly** é uma aplicação FullStack de encurtador de URL desenvolvida como projeto da Faculdade de Tecnologia Rocketseat. A aplicação permite o cadastro, listagem e remoção de links encurtados, geração de relatório dos acessos de cada link e redirecionamento correto do link encurtado para o link original.

## 🚀 Funcionalidades

### Backend
- [ ] API REST com Node.js e Express
- [ ] Cadastro de links encurtados
- [ ] Listagem de links
- [ ] Remoção de links
- [ ] Geração de relatórios de acesso
- [ ] Redirecionamento de URLs encurtadas
- [ ] Autenticação e autorização
- [ ] Banco de dados (SQLite/PostgreSQL)

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
├── server/          # Backend - Node.js + Express
├── web/            # Frontend - React + TypeScript
└── README.md       # Este arquivo
```

## 🛠️ Tecnologias

### Backend
- Node.js
- Express.js
- TypeScript
- SQLite/PostgreSQL
- JWT para autenticação
- Cors
- Helmet

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
- Docker (opcional)

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd web
npm install
npm run dev
```

## 📝 Endpoints da API

### Autenticação
- `POST /auth/register` - Cadastrar usuário
- `POST /auth/login` - Fazer login

### Links
- `POST /links` - Criar novo link encurtado
- `GET /links` - Listar links do usuário
- `DELETE /links/:id` - Remover link
- `GET /links/:id/stats` - Estatísticas do link

### Redirecionamento
- `GET /:shortCode` - Redirecionar para URL original

## 🎨 Design

O design da aplicação segue o layout disponibilizado no Figma:
- Interface moderna e intuitiva
- Paleta de cores consistente
- Componentes reutilizáveis
- Responsividade para mobile

## 📊 Funcionalidades Principais

1. **Encurtamento de URLs**: Transforma URLs longas em links curtos e únicos
2. **Dashboard**: Interface para gerenciar todos os links criados
3. **Relatórios**: Visualização de estatísticas de acesso por link
4. **Autenticação**: Sistema de login/registro para usuários
5. **API RESTful**: Backend completo com todos os endpoints necessários

## 🔧 Desenvolvimento

Este projeto foi desenvolvido como parte do desafio da faculdade, consolidando conhecimentos em:
- Desenvolvimento FullStack
- APIs REST
- Frontend moderno
- DevOps básico
- Boas práticas de código

## 📄 Licença

Este projeto é de uso educacional.

---

**Desenvolvido com 💜 para o desafio da Faculdade de Tecnologia Rocketseat** 