# Referência de Schema YAML — Sensemaking Skill

## Schema Completo por Tipo de Nota

Este arquivo define o Frontmatter YAML exato para cada tipo de nota que o Sensemaking deve gerar em memória antes de enviar para aprovação HITL.

> **Regra obrigatória**: Todos os campos de `id`, `source`, `type` e `status` são SEMPRE obrigatórios. Os demais campos são condicionais ao tipo.

---

### Tipo: `action` (Tarefa / Next Action GTD)

```yaml
---
id: "act-20240115-abc1"
source: "telegram"
type: "action"
status: "draft"
tags:
  - "action"
  - "dev"
context: "@dev"
due: 2024-02-01
priority: "medium"
aliases: []
---
# Título da Ação (verbo no infinitivo)

> [!todo] Próxima Ação
> Descreva aqui a ação concreta e os critérios de conclusão.

## O que precisa ser feito?

- Passo 1
- Passo 2

## Dependências

- [[Nome de Nota Relacionada]]
```

---

### Tipo: `project` (Projeto GTD com entrega)

```yaml
---
id: "proj-20240115-xyz9"
source: "telegram"
type: "project"
status: "draft"
tags:
  - "project"
  - "dev"
context: "@dev"
due: 2024-03-15
area: "1_Projects"
priority: "high"
aliases:
  - "Nome Alternativo do Projeto"
---
# Nome do Projeto

> [!abstract] Visão Geral
> Descreva o objetivo final e o critério de "pronto" para este projeto.

## Resultado Desejado

Qual é o resultado concreto quando este projeto estiver completo?

## Próximas Ações

- [ ] [[Tarefa Inicial]]
- [ ] Definir escopo com Matheus

## Referências

- [[Nota de Contexto Relacionada]]
```

---

### Tipo: `idea` (Ideia ou Pensamento Solto)

```yaml
---
id: "idea-20240115-qwe2"
source: "audio_transcricao"
type: "idea"
status: "draft"
tags:
  - "idea"
  - "reading"
context: "@anywhere"
aliases: []
---
# Título da Ideia

> [!tip] Insight
> Resumo da ideia capturada da fonte original.

## Contexto de Captura

Quando/onde surgiu e o que motivou este pensamento?

## Possível Próximo Passo

- Transformar em [[Projeto]] ou [[Recurso]]?
```

---

### Tipo: `reference` (Material de Pesquisa ou Recurso)

```yaml
---
id: "ref-20240115-mno5"
source: "telegram"
type: "reference"
status: "draft"
tags:
  - "reference"
  - "reading"
context: "@reading"
url: "https://exemplo.com/artigo"
author: "Nome do Autor"
aliases:
  - "Título Alternativo"
---
# Título do Material

> [!info] Sobre este recurso
> Breve descrição do que é este material e por que é relevante.

## Resumo

Conteúdo extraído ou anotado.

## Links Relacionados

- [[Projeto que usa este recurso]]
```

---

## Valores Permitidos por Campo

| Campo | Valores Válidos |
|-------|----------------|
| `source` | `telegram`, `ticktick`, `audio_transcricao`, `chat_direto`, `email` |
| `type` | `action`, `project`, `idea`, `reference` |
| `status` | `draft` (apenas no Sensemaking — a Structuring Skill atualiza) |
| `context` | `@dev`, `@reading`, `@finance`, `@errands`, `@calls`, `@anywhere` |
| `priority` | `low`, `medium`, `high`, `urgent` |

## Regras de Tags

Tags são **sempre em minúsculo**, **sem `@`**, e usando `/` para hierarquia:

```yaml
tags:
  - "project"          # tipo
  - "dev"              # contexto de trabalho
  - "finance/pessoal"  # hierarquia de área
```
