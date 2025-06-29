# 🧪 API Testing Files

Esta pasta contém todos os arquivos necessários para testar a API do Brev.ly.

## 📁 Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `Brev.ly-API.postman_collection.json` | Coleção do Postman/Insomnia com todas as rotas da API |
| `Brev.ly-API.postman_environment.json` | Variáveis de ambiente configuradas |
| `API-TESTING.md` | Guia completo de como usar os arquivos de teste |

## 🚀 Como Usar

1. **Importe os arquivos** no Postman ou Insomnia
2. **Configure o ambiente** com as variáveis
3. **Siga o guia** em `API-TESTING.md`
4. **Teste todos os endpoints** da API

## 📋 Endpoints Disponíveis

- ✅ Health Check - `/health`
- ✅ Database Test - `/db-test`
- ✅ Create Link - `POST /api/links`
- ✅ Delete Link - `DELETE /api/links/:id`
- ✅ Export CSV - `GET /api/links/export`
- ✅ Redirect - `GET /api/links/:shortCode`
- ✅ Get Stats - `GET /api/links/:shortCode/stats`
- ✅ Get All Links - `GET /api/links`

## 🔧 Pré-requisitos

- Servidor rodando em `http://localhost:3333`
- PostgreSQL configurado e conectado
- Migrations executadas
- Cloudflare R2 configurado (para exportação CSV)

## 🔄 Fluxo de Teste Completo

1. **Health Check** - Verificar se o servidor está rodando
2. **Database Test** - Verificar conexão com PostgreSQL
3. **Create Link** - Criar um link encurtado
4. **Copy IDs** - Copiar `shortCode` e `linkId` da resposta
5. **Set Variables** - Definir variáveis de ambiente
6. **Get Stats** - Verificar estatísticas do link criado
7. **Redirect Test** - Testar redirecionamento (deve retornar 302)
8. **Get All Links** - Listar todos os links criados
9. **Export CSV** - Exportar links para CSV e fazer upload para CDN
10. **Delete Link** - Deletar o link criado
11. **Verify Deletion** - Confirmar que o link foi deletado

---

📖 **Para instruções detalhadas, consulte o arquivo `API-TESTING.md`** 