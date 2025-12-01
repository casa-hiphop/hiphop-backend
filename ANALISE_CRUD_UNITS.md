# Análise do CRUD de Units para Frontend

## 📋 Estrutura da Migration

```typescript
table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"))
table.string("name").notNullable()
table.string("description").notNullable()
table.string("cep").notNullable()
table.string("street").notNullable() // Preenchido via ViaCEP
table.string("number").notNullable()
table.string("neighborhood").notNullable() // Preenchido via ViaCEP
table.string("city").notNullable() // Preenchido via ViaCEP
table.string("state").notNullable() // Preenchido via ViaCEP
table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable()
table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable()
```

**Campos da tabela:**

- `id` (UUID, PK)
- `name` (string, not null) - Nome da unidade
- `description` (string, not null) - Descrição da unidade
- `cep` (string, not null) - CEP do endereço
- `street` (string, not null) - Rua/Logradouro (preenchido via ViaCEP)
- `number` (string, not null) - Número do endereço
- `neighborhood` (string, not null) - Bairro (preenchido via ViaCEP)
- `city` (string, not null) - Cidade (preenchido via ViaCEP)
- `state` (string, not null) - Estado (preenchido via ViaCEP)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## 🔍 Análise do Backend

### **DTOs**

#### CreateUnitRequestDto

```typescript
{
  name: string
  description: string
  cep: string
  number: string
}
```

**Nota:** Apenas 4 campos são enviados. O backend busca o endereço completo via ViaCEP.

#### UnitResponseDto

```typescript
{
  id: string
  name: string
  description: string
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
  number: string
  created_at: Date
  updated_at: Date
}
```

**Nota:** Retorna todos os campos, incluindo os preenchidos automaticamente.

#### UpdateUnitRequestDto

```typescript
{
  name: string
  description: string
  cep: string
  number: string
}
```

**Nota:** Mesma estrutura do create. O backend pode buscar novo endereço se o CEP mudar.

---

## 🔄 Fluxo de Funcionamento

### **Criação/Atualização**

1. Frontend envia: `name`, `description`, `cep`, `number`
2. Backend valida se já existe unidade com mesmo CEP + número
3. Backend busca endereço completo via ViaCEP API usando o CEP
4. Backend preenche automaticamente: `street`, `neighborhood`, `city`, `state`
5. Backend salva no banco com todos os campos

### **Listagem/Busca**

- Retorna todas as unidades com endereço completo
- Ordenado por `created_at` DESC (mais recentes primeiro)

---

## 📡 Endpoints da API

```
POST   /units          - Criar unidade (autenticado)
GET    /units          - Listar todas (autenticado)
GET    /units/:id      - Buscar por ID (autenticado)
PUT    /units/:id      - Atualizar (autenticado)
DELETE /units/:id      - Deletar (autenticado)
```

### **Respostas**

**POST /units**

```json
{
  "message": "Unit created"
}
```

**GET /units**

```json
{
  "units": [
    {
      "id": "uuid",
      "name": "Unidade São Paulo",
      "description": "Descrição",
      "cep": "01310-100",
      "street": "Avenida Paulista",
      "neighborhood": "Bela Vista",
      "city": "São Paulo",
      "state": "SP",
      "number": "1000",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**GET /units/:id**

```json
{
  "unit": {
    "id": "uuid",
    "name": "Unidade São Paulo",
    ...
  }
}
```

**PUT /units/:id**

```json
{
  "message": "Unit updated"
}
```

**DELETE /units/:id**

```json
{
  "message": "Unit deleted"
}
```

---

## 🎨 Requisitos para o Frontend

### **1. Campos do Formulário**

**Campos obrigatórios:**

- ✅ Nome da Unidade (name)
- ✅ Descrição (description)
- ✅ CEP (cep) - com máscara
- ✅ Número (number)

**Campos exibidos (somente leitura após busca):**

- Rua (street) - preenchido automaticamente
- Bairro (neighborhood) - preenchido automaticamente
- Cidade (city) - preenchido automaticamente
- Estado (state) - preenchido automaticamente

### **2. Funcionalidades Necessárias**

#### **Busca de CEP (ViaCEP)**

- Ao digitar CEP, buscar endereço automaticamente
- Preencher campos de endereço (read-only)
- Validar CEP antes de enviar
- Mostrar loading durante busca
- Tratar erros de CEP inválido

#### **Validações**

- CEP válido (formato: 00000-000)
- Nome obrigatório
- Descrição obrigatória
- Número obrigatório
- Validar se CEP existe antes de salvar

#### **Tabela de Listagem**

- Nome da unidade
- Cidade/Estado
- Endereço completo (Rua, Número, Bairro)
- Data de cadastro
- Ações: Visualizar, Editar, Excluir

### **3. Máscaras Necessárias**

- **CEP**: `00000-000` (8 dígitos)
- Usar função `formatCEP` existente

---

## 📝 Estrutura de Dados Frontend

### **Interface ITool**

```typescript
export interface IUnit {
  id: string
  name: string
  description: string
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
  number: string
  created_at: string
  updated_at: string
}
```

### **Interface Create/Update**

```typescript
export interface ICreateUnitRequest {
  name: string
  description: string
  cep: string
  number: string
}
```

---

## ⚠️ Pontos de Atenção

1. **CEP deve ser buscado antes de salvar** - O backend valida se já existe unidade com mesmo CEP + número
2. **Campos de endereço são read-only** - Preenchidos automaticamente via ViaCEP
3. **Validação de CEP único** - Backend não permite duas unidades no mesmo CEP + número
4. **Atualização pode mudar endereço** - Se CEP mudar, novo endereço é buscado
5. **Formato de data** - Backend retorna timestamps, frontend deve formatar

---

## ✅ Checklist de Implementação

- [ ] Criar API client (`src/api/units.ts`)
- [ ] Integrar API client no `src/api/index.ts`
- [ ] Criar/Atualizar página de unidades
- [ ] Implementar busca de CEP via ViaCEP
- [ ] Adicionar máscara de CEP
- [ ] Implementar formulário de criação/edição
- [ ] Implementar tabela de listagem
- [ ] Adicionar ações (visualizar, editar, excluir)
- [ ] Adicionar loading states
- [ ] Adicionar toast notifications
- [ ] Adicionar validações
- [ ] Implementar dialog de visualização
- [ ] Implementar dialog de confirmação de exclusão

---

## 🎯 Próximos Passos

1. Criar API client seguindo padrão de `requesters.ts` e `tools.ts`
2. Implementar página seguindo padrão de `solicitantes/page.tsx`
3. Adicionar integração com ViaCEP para busca automática de endereço
4. Adicionar máscara de CEP
5. Testar todas as operações CRUD
