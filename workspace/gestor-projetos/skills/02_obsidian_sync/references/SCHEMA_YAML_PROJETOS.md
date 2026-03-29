# Schema YAML Completo — Tarefas e Projetos

Este arquivo define o Frontmatter YAML exato que o **Gestor de Projetos** deve criar, ler e atualizar no Vault. É o contrato imutável entre o Obsidian e o Linear.

> **Regra de ouro**: O Obsidian YAML é sempre a **fonte de verdade**. O Linear é um espelho.

---

## Schema Completo de uma Tarefa (`tipo_registro: tarefa`)

```yaml
---
# ─── Identidade ─────────────────────────────────────────────────
id: "tar-2024-01-15-slug-curto"          # Gerado na criação, nunca alterado
tipo_registro: "tarefa"                  # tarefa | referencia | nota
titulo: "Verbo Forte + Objeto + Contexto"

# ─── Estado GTD ─────────────────────────────────────────────────
status: "proxima_acao"
# Valores: rascunho | proxima_acao | ativa | aguardando | bloqueada | algum_dia | concluida | cancelada

contextos:
  dispositivos:
    - "computador"                       # computador | celular
  ferramentas:
    - "vscode"                           # obsidian | github | vscode | linear | terminal
  modo_trabalho: "foco"                  # foco | reuniao | leve

energia: "media"                         # leve | media | foco | profunda
prioridade: 2                            # 1 (urgente) a 4 (baixa)

# ─── Projeto e Área ─────────────────────────────────────────────
projeto: "Nome do Projeto Pai"
area: "Dev"                              # Dev | Finanças | OpenClaw | Pessoal | Infra

# ─── Tags Obsidian ───────────────────────────────────────────────
tags:
  - "tarefa"
  - "dev"
  - "proxima_acao"
aliases: []

# ─── Datas ──────────────────────────────────────────────────────
datas:
  criado_em: 2024-01-15
  vencimento_em: 2024-02-01              # Opcional — sem aspas
  concluido_em:                          # Preenchido apenas ao concluir

# ─── Sincronização com Linear ───────────────────────────────────
sincronizacao:
  linear_id: ""                          # Preenchido pela linear_worker_skill
  status_sync: "pendente"               # pendente | sincronizado | divergente

# ─── Aprovação HITL ─────────────────────────────────────────────
aprovacao:
  status: "pendente"                     # pendente | aprovada | rejeitada
  aprovado_em:                           # Preenchido ao aprovar
  aprovado_por: "Matheus"

# ─── Auditoria ──────────────────────────────────────────────────
auditoria_local:
  - "2024-01-15 — Tarefa criada via GTD Processamento"
---
# Verbo Forte + Objeto + Contexto

> [!info] Contexto do Projeto
> Esta tarefa pertence a [[1_Projects/Nome do Projeto Pai]].

> [!todo] Próxima Ação
> Descrição clara do que precisa ser feito.

## Detalhes

Corpo da tarefa com descrição, critérios de aceite e links relevantes.

## Dependências

- [[tar-2024-01-10-tarefa-anterior]] (bloqueante)
- [[3_Resources/Dev/Documentação Relacionada]]
```

---

## Schema de Referência (`tipo_registro: referencia`)

```yaml
---
id: "ref-2024-01-15-nome-material"
tipo_registro: "referencia"
titulo: "Nome do Material de Referência"
status: "ativa"
projeto: "Nome do Projeto que Usa"
area: "Dev"
tags:
  - "referencia"
  - "dev"
url: "https://docs.exemplo.com"
autor: "Nome do Autor"
aliases:
  - "Nome Alternativo"
datas:
  criado_em: 2024-01-15
auditoria_local:
  - "2024-01-15 — Referência criada via GTD Processamento"
---
# Nome do Material

> [!info] Sobre este Material
> Referência criada para suportar [[1_Projects/Nome do Projeto]].

## Notas de Leitura

Conteúdo resumido e insights extraídos.

## Conexões

- Aplicado em [[tar-2024-01-15-tarefa-relacionada]]
```

---

## Schema de Nota Operacional (`tipo_registro: nota`)

```yaml
---
id: "nota-2024-01-15-slug"
tipo_registro: "nota"
titulo: "Observação ou Hipótese"
status: "ativa"
projeto: "Nome do Projeto"
tags:
  - "nota"
datas:
  criado_em: 2024-01-15
---
# Observação / Hipótese

> [!abstract] TL;DR
> Resumo em uma linha do que esta nota captura.

Corpo da observação ou hipótese operacional.
```

---

## Valores Permitidos por Campo

| Campo | Valores Possíveis |
|-------|-----------------|
| `tipo_registro` | `tarefa`, `referencia`, `nota` |
| `status` | `rascunho`, `proxima_acao`, `ativa`, `aguardando`, `bloqueada`, `algum_dia`, `concluida`, `cancelada` |
| `energia` | `leve`, `media`, `foco`, `profunda` |
| `prioridade` | `1` (urgente), `2` (alta), `3` (normal), `4` (baixa) |
| `aprovacao.status` | `pendente`, `aprovada`, `rejeitada` |
| `sincronizacao.status_sync` | `pendente`, `sincronizado`, `divergente` |

## Convenção de Nome de Arquivo

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Tarefa | `tar-AAAA-MM-DD-slug.md` | `tar-2024-01-15-criar-landing.md` |
| Referência | `ref-AAAA-MM-DD-slug.md` | `ref-2024-01-15-api-linear.md` |
| Nota | `nota-AAAA-MM-DD-slug.md` | `nota-2024-01-15-decisao-arquitetura.md` |
| Revisão | `rev-AAAA-MM-DD-semana.md` | `rev-2024-01-15-semana02.md` |
