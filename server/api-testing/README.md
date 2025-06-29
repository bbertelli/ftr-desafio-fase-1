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
- ✅ Redirect - `GET /api/links/:shortCode`
- ✅ Get Stats - `GET /api/links/:shortCode/stats`
- ✅ Get All Links - `GET /api/links`

## 🔧 Pré-requisitos

- Servidor rodando em `http://localhost:3333`
- PostgreSQL configurado e conectado
- Migrations executadas

---

📖 **Para instruções detalhadas, consulte o arquivo `API-TESTING.md`** 