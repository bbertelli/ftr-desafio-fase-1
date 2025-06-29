# 🧪 API Testing Guide

Este guia explica como testar a API do Brev.ly usando Postman ou Insomnia.

## 📁 Arquivos de Teste

- `Brev.ly-API.postman_collection.json` - Coleção com todas as rotas
- `Brev.ly-API.postman_environment.json` - Variáveis de ambiente

## 🚀 Como Importar

### Postman
1. Abra o Postman
2. Clique em "Import"
3. Selecione os arquivos `.json`
4. Configure o ambiente "Brev.ly API - Local"

### Insomnia
1. Abra o Insomnia
2. Clique em "Create" → "Import from File"
3. Selecione o arquivo de coleção
4. Configure as variáveis de ambiente

## 🔧 Variáveis de Ambiente

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `baseUrl` | `http://localhost:3333` | URL base da API |
| `shortCode` | (dinâmico) | Código do link encurtado |
| `linkId` | (dinâmico) | ID do link no banco |

## 📋 Endpoints Disponíveis

### 1. Health Check
```
GET {{baseUrl}}/health
```
**Resposta esperada:**
```json
{
  "status": "ok"
}
```

### 2. Database Test
```
GET {{baseUrl}}/db-test
```
**Resposta esperada:**
```json
{
  "status": "success",
  "message": "Database connection working",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 3. Create Shortened Link
```
POST {{baseUrl}}/api/links
Content-Type: application/json

{
  "originalUrl": "https://www.google.com"
}
```
**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "shortCode": "abc12345",
    "originalUrl": "https://www.google.com",
    "shortUrl": "http://localhost:3333/api/links/abc12345"
  }
}
```

### 4. Delete Link
```
DELETE {{baseUrl}}/api/links/{{linkId}}
```
**Resposta esperada:**
```json
{
  "success": true,
  "message": "Link deleted successfully",
  "data": {
    "id": "uuid-here",
    "shortCode": "abc12345",
    "originalUrl": "https://www.google.com"
  }
}
```

### 5. Export Links to CSV
```
GET {{baseUrl}}/api/links/export
```
**Resposta esperada:**
```json
{
  "success": true,
  "message": "Links exported successfully to CSV",
  "data": {
    "downloadUrl": "https://your-cdn.com/links-abc123def456.csv",
    "fileName": "links-abc123def456.csv",
    "exportedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 6. Redirect to Original URL
```
GET {{baseUrl}}/api/links/{{shortCode}}
```
**Resposta esperada:** HTTP 302 (redirect)

### 7. Get Link Statistics
```
GET {{baseUrl}}/api/links/{{shortCode}}/stats
```
**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "originalUrl": "https://www.google.com",
    "shortCode": "abc12345",
    "accessCount": 5,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "shortUrl": "http://localhost:3333/api/links/abc12345"
  }
}
```

### 8. Get All Links
```
GET {{baseUrl}}/api/links
```
**Resposta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-here",
      "originalUrl": "https://www.google.com",
      "shortCode": "abc12345",
      "accessCount": 5,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "shortUrl": "http://localhost:3333/api/links/abc12345"
    }
  ]
}
```

## 🔄 Fluxo de Teste Recomendado

1. **Health Check** - Verificar se o servidor está rodando
2. **Database Test** - Verificar conexão com PostgreSQL
3. **Create Link** - Criar um link encurtado
4. **Copy shortCode** - Copiar o `shortCode` da resposta
5. **Copy linkId** - Copiar o `id` da resposta
6. **Set Environment Variables** - Definir `{{shortCode}}` e `{{linkId}}`
7. **Get Stats** - Verificar estatísticas do link criado
8. **Redirect Test** - Testar redirecionamento (deve retornar 302)
9. **Get All Links** - Listar todos os links criados
10. **Export CSV** - Exportar links para CSV e fazer upload para CDN
11. **Delete Link** - Deletar o link criado
12. **Verify Deletion** - Tentar acessar o link deletado (deve retornar 404)

## ⚠️ Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado com sucesso
- `302` - Redirecionamento
- `400` - Erro de validação
- `404` - Link não encontrado
- `500` - Erro interno do servidor

## 🐛 Troubleshooting

### Servidor não responde
- Verifique se o servidor está rodando: `cd server && npm run dev`
- Verifique se a porta 3333 está livre

### Erro de banco de dados
- Verifique se o PostgreSQL está rodando
- Verifique as variáveis de ambiente no `.env`
- Execute as migrations: `npm run db:migrate`

### Erro de validação
- Verifique se a URL está no formato correto (com http/https)
- Verifique se todos os campos obrigatórios estão presentes

### Erro ao deletar link
- Verifique se o `linkId` está correto (deve ser um UUID válido)
- Verifique se o link existe antes de tentar deletar

### Erro na exportação CSV
- Verifique se as credenciais do Cloudflare R2 estão configuradas no `.env`
- Verifique se o bucket existe e está configurado corretamente
- Verifique se as permissões de acesso estão corretas 