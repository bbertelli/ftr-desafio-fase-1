# Brev.ly - Frontend

Frontend da aplicação Brev.ly, um encurtador de URLs desenvolvido com React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones
- **React Hook Form** - Gerenciamento de formulários
- **React Query** - Gerenciamento de estado e cache
- **Zod** - Validação de schemas

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Edite o arquivo `.env` com a URL da API:
```env
VITE_API_URL=http://localhost:3333
```

## 🏃‍♂️ Executando

### Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build de Produção
```bash
npm run build
```

### Preview do Build
```bash
npm run preview
```

## 🎨 Funcionalidades

### ✅ Implementadas
- [x] Interface responsiva e moderna
- [x] Criação de links encurtados
- [x] Listagem de links criados
- [x] Exclusão de links
- [x] Exportação para CSV
- [x] Copiar link para área de transferência
- [x] Abertura de links em nova aba
- [x] Loading states e feedback visual
- [x] Tratamento de erros
- [x] Design responsivo (mobile-first)

### 🎯 Características

- **Interface Moderna**: Design limpo e intuitivo com gradientes e sombras
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Feedback Visual**: Estados de loading, sucesso e erro bem definidos
- **Acessibilidade**: Botões com títulos, contraste adequado
- **UX Otimizada**: Formulários com validação, feedback imediato

## 📱 Layout

A aplicação segue um layout responsivo com:

1. **Header**: Logo e descrição do serviço
2. **Formulário**: Campo para inserir URL e botão de encurtamento
3. **Mensagens**: Feedback de sucesso e erro
4. **Lista de Links**: Cards com informações dos links criados
5. **Ações**: Botões para copiar, abrir e deletar links

## 🔧 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── hooks/         # Custom hooks
├── pages/         # Páginas da aplicação
├── services/      # Serviços de API
├── types/         # Definições de tipos TypeScript
├── utils/         # Utilitários
├── App.tsx        # Componente principal
└── main.tsx       # Ponto de entrada
```

## 🌐 Integração com Backend

O frontend se comunica com o backend através das seguintes rotas:

- `POST /api/links` - Criar link encurtado
- `GET /api/links` - Listar todos os links
- `DELETE /api/links/:id` - Deletar link
- `GET /api/links/export` - Exportar links para CSV

## 🎨 Design System

### Cores
- **Primária**: Azul (#2563eb)
- **Secundária**: Verde (#16a34a)
- **Erro**: Vermelho (#dc2626)
- **Sucesso**: Verde (#16a34a)
- **Background**: Gradiente azul claro

### Componentes
- **Botões**: Bordas arredondadas, hover effects
- **Cards**: Sombras suaves, bordas arredondadas
- **Inputs**: Focus rings, validação visual
- **Ícones**: Lucide React para consistência

## 📊 Performance

- **Bundle Size**: Otimizado com Vite
- **Lazy Loading**: Componentes carregados sob demanda
- **Caching**: React Query para cache de dados
- **Code Splitting**: Automático com Vite

## 🔒 Segurança

- **CORS**: Configurado no backend
- **Validação**: URLs validadas no frontend e backend
- **Sanitização**: Dados sanitizados antes de enviar

## 🚀 Deploy

A aplicação pode ser deployada em qualquer plataforma que suporte aplicações React:

- **Vercel**: Deploy automático
- **Netlify**: Deploy automático
- **GitHub Pages**: Deploy estático
- **Docker**: Containerização

## 📝 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build
- `npm run lint` - Linting do código
- `npm run type-check` - Verificação de tipos

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
