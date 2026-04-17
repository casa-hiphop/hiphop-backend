# Casa do HipHop — API

API REST em **Node.js** com **Fastify** para gestão de usuários, unidades, ferramentas, solicitantes e empréstimos (reservas/devoluções). Autenticação via **JWT**; persistência em **PostgreSQL** com **Knex**; validação com **Zod**; e-mail transacional com **Nodemailer** (fluxo de recuperação de senha).

## Requisitos

- **Node.js** 20+ (recomendado; alinhado ao CI)
- **PostgreSQL** acessível pelas variáveis de ambiente

## Configuração

1. Instale dependências:

```bash
npm install
```

2. Copie o arquivo de ambiente e preencha os valores:

```bash
cp .env.sample .env
```

Variáveis validadas na inicialização (ver `src/shared/env/environments.ts`):

| Variável | Descrição |
|----------|-----------|
| `PORT` | Porta HTTP (padrão: `3333`) |
| `NODE_ENV` | `local` ou `production` |
| `DB_CLIENT` | Cliente Knex (ex.: `pg`) |
| `DB_POOL_MIN` / `DB_POOL_MAX` | Pool de conexões |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_DATABASE` | Conexão PostgreSQL |
| `JWT_SECRET` | Segredo para assinatura/verificação do token |
| `JWT_EXPIRES_IN` | Expiração do JWT (padrão: `1h`) |
| `SALT_RESULT` | Rounds do bcrypt (padrão: `10`) |
| `MAIL_*` | SMTP: host, porta, TLS, usuário, senha, remetente |
| `FRONTEND_URL` | URL do front (links de reset de senha / CORS em produção) |

3. Execute as migrações:

```bash
npm run knex -- migrate:latest
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor em modo desenvolvimento (`tsx watch`) |
| `npm run build` | Build ESM para `dist/` |
| `npm start` | Executa `node dist/server.js` (após build) |
| `npm run knex` | CLI do Knex (ex.: `migrate:latest`, `migrate:rollback`) |

## Executar localmente

```bash
npm run dev
```

Health check: `GET http://localhost:<PORT>/health` → `{ "status": "API is running" }`.

## Autenticação

1. `POST /login` com JSON `{ "email", "password" }` — resposta inclui `token` (JWT).
2. Nas rotas protegidas, envie o header: `Authorization: Bearer <token>`.

Rotas que exigem JWT: prefixos `/units`, `/tools`, `/requesters`, `/borrows` (conforme `ensureAuthentication`).

## Visão geral dos endpoints

Base URL: `http://localhost:<PORT>` (ajuste em produção).

### Públicos

| Método | Caminho | Descrição |
|--------|---------|-----------|
| `GET` | `/health` | Status da API |
| `POST` | `/login` | Login |
| `POST` | `/forgot-password` | Solicita reset de senha (e-mail) |
| `PATCH` | `/reset-password/:token` | Define nova senha com token |
| `POST` | `/users` | Cadastro de usuário |
| `GET` | `/users` | Lista usuários |
| `GET` | `/users/:id` | Usuário por ID |
| `PUT` | `/users/:id` | Atualiza usuário |
| `DELETE` | `/users/:id` | Remove usuário |

### Autenticados (`Authorization: Bearer …`)

| Método | Caminho | Descrição |
|--------|---------|-----------|
| **Unidades** (`/units`) | | |
| `POST` | `/units` | Cria unidade |
| `GET` | `/units` | Lista unidades |
| `GET` | `/units/:id` | Unidade por ID |
| `PUT` | `/units/:id` | Atualiza |
| `DELETE` | `/units/:id` | Remove |
| **Ferramentas** (`/tools`) | | |
| `POST` | `/tools` | Cria ferramenta |
| `GET` | `/tools` | Lista |
| `GET` | `/tools/:id` | Detalhe |
| `PUT` | `/tools/:id` | Atualiza |
| `DELETE` | `/tools/:id` | Remove |
| **Solicitantes** (`/requesters`) | | |
| `POST` | `/requesters` | Cria |
| `GET` | `/requesters` | Lista |
| `GET` | `/requesters/:id` | Por ID |
| `PUT` | `/requesters/:id` | Atualiza |
| `DELETE` | `/requesters/:id` | Remove |
| **Empréstimos** (`/borrows`) | | |
| `POST` | `/borrows` | Cria empréstimo |
| `GET` | `/borrows` | Lista |
| `GET` | `/borrows/pending` | Pendentes |
| `GET` | `/borrows/overdue` | Em atraso |
| `GET` | `/borrows/available-for-return` | Disponíveis para devolução |
| `GET` | `/borrows/tool/:tool_id` | Por ferramenta |
| `GET` | `/borrows/:id` | Por ID |
| `PUT` | `/borrows/:id` | Atualiza |
| `PATCH` | `/borrows/:id/return` | Registra devolução |
| `DELETE` | `/borrows/:id` | Remove |

> Detalhes de corpos de requisição e respostas estão nos controllers e DTOs em `src/domains/*/`.

## CORS

- Em `NODE_ENV=local`, todas as origens são permitidas (desenvolvimento).
- Em produção, origens incluem `FRONTEND_URL`, `https://casa-hiphop.stack2u.net` e `localhost` nas portas 3000/3001.

## CI/CD

No push para `main`, o workflow em `.github/workflows/ci-cd.yml` faz checkout, usa Node 20 e, em deploy, sincroniza o código via `rsync` e executa `./release.sh` no servidor (variáveis e segredos configurados no repositório).

## Estrutura do projeto (resumo)

- `src/server.ts` — bootstrap Fastify, CORS, JWT, health e error handler
- `src/shared/` — rotas agregadas, env, banco, middlewares, migrações
- `src/domains/` — módulos por domínio (rotas, controllers, casos de uso, repositórios Knex)

---

**Casa do HipHop** — API de apoio à gestão do espaço e do acervo de ferramentas.
