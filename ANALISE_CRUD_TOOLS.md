# Análise do CRUD de Tools

## 📋 Estrutura da Migration

```typescript
table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary()
table.string("name").notNullable().unique()
table.string("description").notNullable()
table.integer("quantity").notNullable().defaultTo(0)
table.string("brand").notNullable()
table.timestamps(true, true) // Cria created_at e updated_at
```

**Campos da tabela:**
- `id` (UUID, PK)
- `name` (string, unique, not null)
- `description` (string, not null)
- `quantity` (integer, not null, default: 0)
- `brand` (string, not null)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## ✅ O que está implementado

### 1. **DTOs**
- ✅ `ToolCreateRequestDto` - DTO para criação
- ✅ `ToolCreateResponseDto` - DTO de resposta
- ✅ `ToolUpdateRequestDto` - DTO para atualização

### 2. **Repository**
- ✅ Interface `ToolsRepositoryInterface`
- ✅ Implementação `ToolsRepository` (Knex)
- ✅ Métodos: create, getToolByName, listAll, getById, update, delete

### 3. **Use Cases**
- ✅ `CreateTool` - Criar ferramenta (valida nome único)
- ✅ `ListTools` - Listar todas as ferramentas
- ✅ `GetToolById` - Buscar por ID
- ✅ `UpdateTool` - Atualizar ferramenta
- ✅ `DeleteTool` - Deletar ferramenta

### 4. **Factories**
- ✅ Todos os factories implementados

### 5. **Routes**
- ✅ POST `/tools` - Criar
- ✅ GET `/tools` - Listar todas
- ✅ GET `/tools/:id` - Buscar por ID
- ✅ PUT `/tools/:id` - Atualizar
- ✅ DELETE `/tools/:id` - Deletar

---

## ⚠️ Problemas Identificados

### 🔴 **CRÍTICO**

#### 1. **Inconsistência entre Migration e DTO de Resposta**

**Problema:**
- Migration não tem campo `status`
- `ToolCreateResponseDto` tem campo `status: boolean`

**Impacto:** Erro ao buscar/listar tools (campo não existe no banco)

**Solução:**
```typescript
// Remover do DTO ou adicionar na migration
// Opção 1: Remover do DTO
export interface ToolCreateResponseDto {
  id: string
  name: string
  description: string
  brand: string
  quantity: number
  // status: boolean // REMOVER
  createdAt: Date
  updatedAt: Date
}

// Opção 2: Adicionar na migration (se necessário)
table.boolean("status").defaultTo(true).notNullable()
```

#### 2. **Inconsistência de Nomenclatura (snake_case vs camelCase)**

**Problema:**
- Migration cria: `created_at`, `updated_at` (snake_case)
- DTO espera: `createdAt`, `updatedAt` (camelCase)

**Impacto:** Campos não são mapeados corretamente

**Solução:**
```typescript
// No repository, fazer mapeamento ou ajustar DTO
async listAll(): Promise<ToolCreateResponseDto[]> {
  const tools = await connection("tools").select("*")
  return tools.map(tool => ({
    ...tool,
    createdAt: tool.created_at,
    updatedAt: tool.updated_at,
  }))
}
```

#### 3. **Falta de Autenticação nas Rotas**

**Problema:**
- Nenhuma rota tem `ensureAuthentication`
- Qualquer pessoa pode criar/editar/deletar tools

**Impacto:** Falta de segurança

**Solução:**
```typescript
import { ensureAuthentication } from "../../../../shared/middlewares/ensure-authentication"

export async function toolsRoutes(app: FastifyInstance) {
  app.post("/", { onRequest: [ensureAuthentication] }, ...)
  app.get("/", { onRequest: [ensureAuthentication] }, ...)
  app.get("/:id", { onRequest: [ensureAuthentication] }, ...)
  app.put("/:id", { onRequest: [ensureAuthentication] }, ...)
  app.delete("/:id", { onRequest: [ensureAuthentication] }, ...)
}
```

#### 4. **Falta de Validação com Zod**

**Problema:**
- Controllers não validam dados de entrada
- Usa `request.body as any` (sem type safety)

**Impacto:** Dados inválidos podem ser salvos

**Solução:**
```typescript
import { z } from "zod"

const createToolSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  brand: z.string().min(1),
  quantity: z.number().int().min(0),
})

app.post("/", async (request, reply) => {
  const data = createToolSchema.parse(request.body)
  // ...
})
```

#### 5. **updated_at não é atualizado no Update**

**Problema:**
- Repository não atualiza `updated_at` automaticamente

**Solução:**
```typescript
async update(id: string, data: ToolUpdateRequestDto): Promise<void> {
  await connection("tools").where("id", id).update({
    ...data,
    updated_at: new Date(),
  })
}
```

---

### 🟡 **MÉDIO**

#### 6. **Falta de Ordenação na Listagem**

**Problema:**
- `listAll()` não ordena os resultados

**Solução:**
```typescript
async listAll(): Promise<ToolCreateResponseDto[]> {
  return await connection("tools")
    .select("*")
    .orderBy("created_at", "desc")
}
```

#### 7. **Controller não está sendo usado**

**Problema:**
- Existe `ToolsController` mas não é usado
- Rotas implementam lógica diretamente

**Solução:**
- Usar o controller ou remover se não for necessário
- Seguir padrão do projeto (units/requesters usam controllers)

#### 8. **Falta validação de nome único no Update**

**Problema:**
- Update permite alterar nome para um que já existe

**Solução:**
```typescript
async execute(data: { id: string; [key: string]: any }) {
  const { id, ...updateData } = data
  
  const tool = await this.toolsRepository.getById(id)
  if (!tool) throw new AppError("Tool not found")
  
  // Validar nome único se estiver sendo alterado
  if (updateData.name && updateData.name !== tool.name) {
    const existingTool = await this.toolsRepository.getToolByName(updateData.name)
    if (existingTool) {
      throw new AppError("Tool name already exists")
    }
  }
  
  await this.toolsRepository.update(id, updateData)
}
```

#### 9. **Falta tratamento de erros global**

**Problema:**
- Erros não são tratados de forma consistente

**Solução:**
- Implementar error handler global no Fastify

---

### 🟢 **BAIXO / MELHORIAS**

#### 10. **Falta paginação na listagem**

**Solução:**
```typescript
async listAll(page = 1, limit = 10): Promise<{
  tools: ToolCreateResponseDto[]
  total: number
  page: number
  limit: number
}> {
  const offset = (page - 1) * limit
  const tools = await connection("tools")
    .select("*")
    .orderBy("created_at", "desc")
    .limit(limit)
    .offset(offset)
  
  const total = await connection("tools").count("* as count").first()
  
  return {
    tools,
    total: Number(total?.count || 0),
    page,
    limit,
  }
}
```

#### 11. **Falta busca/filtro**

**Solução:**
- Adicionar filtros por nome, brand, etc.

---

## 📊 Resumo

| Item | Status | Prioridade |
|------|--------|------------|
| CRUD Completo | ✅ | - |
| Autenticação | ❌ | 🔴 CRÍTICO |
| Validação Zod | ❌ | 🔴 CRÍTICO |
| Inconsistência status | ❌ | 🔴 CRÍTICO |
| Inconsistência timestamps | ❌ | 🔴 CRÍTICO |
| updated_at no update | ❌ | 🔴 CRÍTICO |
| Ordenação | ❌ | 🟡 MÉDIO |
| Validação nome único (update) | ❌ | 🟡 MÉDIO |
| Paginação | ❌ | 🟢 BAIXO |
| Busca/Filtro | ❌ | 🟢 BAIXO |

---

## 🔧 Recomendações Prioritárias

### **Alta Prioridade (Fazer Imediatamente)**

1. ✅ Remover campo `status` do DTO ou adicionar na migration
2. ✅ Corrigir mapeamento de `created_at`/`updated_at` para `createdAt`/`updatedAt`
3. ✅ Adicionar autenticação em todas as rotas
4. ✅ Adicionar validação Zod nos controllers
5. ✅ Atualizar `updated_at` no método update

### **Média Prioridade**

6. ✅ Adicionar ordenação na listagem
7. ✅ Validar nome único no update
8. ✅ Usar controller ou remover código não utilizado

### **Baixa Prioridade**

9. ✅ Adicionar paginação
10. ✅ Adicionar busca/filtro

---

## 📝 Conclusão

O CRUD de Tools está **parcialmente implementado** mas possui **problemas críticos** que impedem seu funcionamento correto:

- ❌ Inconsistências entre migration e DTOs
- ❌ Falta de segurança (autenticação)
- ❌ Falta de validação de dados
- ❌ Problemas de mapeamento de campos

**Recomendação:** Corrigir os problemas críticos antes de usar em produção.

