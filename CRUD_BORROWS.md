# CRUD Completo de Empréstimos (Borrows)

## 📋 Estrutura da Migration

A tabela `borrows` possui os seguintes campos:
- `id` (UUID, PK)
- `tool_id` (UUID, FK para tools)
- `unit_id` (UUID, FK para units)
- `requester_id` (UUID, FK para requesters)
- `date` (date) - Data do empréstimo
- `return_date` (date) - Data prevista de devolução
- `returned_at` (date, nullable) - Data real de devolução (adicionado via migration)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## ✅ Funcionalidades Implementadas

### 1. **DTOs**
- ✅ `CreateBorrowRequestDto` - DTO para criação de empréstimo
- ✅ `BorrowResponseDto` - DTO de resposta (inclui relacionamentos opcionais)
- ✅ `UpdateBorrowRequestDto` - DTO para atualização

### 2. **Repository**
- ✅ Interface `BorrowsRepositoryInterface`
- ✅ Implementação `BorrowsRepository` (Knex)
- ✅ Métodos:
  - `create` - Criar empréstimo
  - `findAll` - Listar todos os empréstimos
  - `findById` - Buscar por ID
  - `findByToolId` - Buscar empréstimos de uma ferramenta
  - `findByRequesterId` - Buscar empréstimos de um solicitante
  - `findPending` - Buscar empréstimos pendentes (não devolvidos e não vencidos)
  - `findOverdue` - Buscar empréstimos em atraso (não devolvidos e vencidos)
  - `findPendingByToolId` - Buscar empréstimos pendentes de uma ferramenta específica
  - `findAvailableForReturn` - Buscar empréstimos disponíveis para devolução
  - `update` - Atualizar empréstimo
  - `returnBorrow` - Registrar devolução
  - `delete` - Deletar empréstimo

### 3. **Use Cases**
- ✅ `CreateBorrow` - Criar empréstimo
  - Valida existência de tool, unit e requester
  - Valida disponibilidade da ferramenta (quantidade)
  - Valida que return_date >= date
- ✅ `GetAllBorrows` - Listar todos os empréstimos
- ✅ `GetBorrowById` - Buscar empréstimo por ID
- ✅ `GetPendingBorrows` - Listar empréstimos pendentes
- ✅ `GetOverdueBorrows` - Listar empréstimos em atraso
- ✅ `GetBorrowsByTool` - Listar empréstimos de uma ferramenta
- ✅ `GetAvailableForReturn` - Listar empréstimos disponíveis para devolução
- ✅ `UpdateBorrow` - Atualizar empréstimo
  - Valida existência de tool, unit e requester (se alterados)
  - Valida datas (se alteradas)
- ✅ `ReturnBorrow` - Registrar devolução
  - Valida que o empréstimo existe
  - Valida que não foi devolvido anteriormente
  - Registra a data de devolução
- ✅ `DeleteBorrow` - Deletar empréstimo

### 4. **Factories**
- ✅ Todos os factories implementados para todos os use cases

### 5. **Controllers**
- ✅ Todos os controllers com validação Zod

### 6. **Routes**
- ✅ POST `/borrows` - Criar empréstimo
- ✅ GET `/borrows` - Listar todos
- ✅ GET `/borrows/pending` - Listar pendentes
- ✅ GET `/borrows/overdue` - Listar em atraso
- ✅ GET `/borrows/available-for-return` - Listar disponíveis para devolução
- ✅ GET `/borrows/tool/:tool_id` - Listar por ferramenta
- ✅ GET `/borrows/:id` - Buscar por ID
- ✅ PUT `/borrows/:id` - Atualizar
- ✅ PATCH `/borrows/:id/return` - Registrar devolução
- ✅ DELETE `/borrows/:id` - Deletar

Todas as rotas estão protegidas com `ensureAuthentication`.

## 🔍 Filtros Implementados

### 1. **Ferramentas para Devolução**
- Endpoint: `GET /borrows/available-for-return`
- Retorna todos os empréstimos que ainda não foram devolvidos (`returned_at IS NULL`)

### 2. **Empréstimos em Atraso**
- Endpoint: `GET /borrows/overdue`
- Retorna empréstimos não devolvidos onde `return_date < hoje`

### 3. **Verificar com quem está**
- Endpoint: `GET /borrows/tool/:tool_id`
- Retorna todos os empréstimos de uma ferramenta específica
- O `BorrowResponseDto` inclui informações do `requester` (opcional, pode ser preenchido via join no frontend)

## 📝 Migration Adicional

Foi criada uma migration adicional para adicionar o campo `returned_at`:
- `20251201233614_add_returned_at_to_borrows.ts`

Execute as migrations:
```bash
npm run knex migrate:latest
```

## 🎯 Próximos Passos

Para o frontend, será necessário:
1. Criar API client para `/borrows`
2. Implementar tela de listagem com filtros
3. Implementar modal de criação/edição
4. Implementar funcionalidade de devolução
5. Mostrar informações de quem está com cada ferramenta

