# Referência de Roteamento PARA e Frontmatter Final

Este arquivo define as regras de destino no Vault e o Frontmatter completo esperado na nota **após** a aprovação HITL.

> **Nota**: O campo `status` muda de `draft` (Sensemaking) para o valor correto aqui na Structuring Skill.

---

## Mapa de Roteamento PARA

| `type` da nota | `status` | Pasta de Destino |
|----------------|----------|-----------------|
| `action` | `active` | `1_Projects/[Projeto Pai]/` ou `0_Inbox/` se sem projeto |
| `project` | `active` | `1_Projects/[Nome do Projeto]/` |
| `idea` | `draft` | `0_Inbox/` (aguarda promoção futura) |
| `reference` | `active` | `3_Resources/[Categoria]/` |
| Qualquer | `archived` | `4_Archives/` |
| Qualquer (deletar) | — | `.trash/` (NUNCA deletar, apenas mover) |

---

## Frontmatter Final — Todos os Campos Permitidos

```yaml
---
# ─── Campos Obrigatórios ────────────────────────────────────────
id: "tipo-YYYYMMDD-hash4"   # Gerado no Sensemaking, nunca alterado
source: "telegram"           # Origem: telegram | ticktick | audio_transcricao | chat_direto | email
type: "action"               # Tipo: action | project | idea | reference
status: "active"             # Status FINAL: draft | active | done | archived | cancelled

# ─── Campos de Contexto GTD ─────────────────────────────────────
context: "@dev"              # Contexto: @dev | @reading | @finance | @errands | @calls | @anywhere
tags:
  - "action"                 # Sempre repetir o type como tag
  - "dev"                    # Contexto sem o @
  - "finance/pessoal"        # Tags hierárquicas com /
priority: "high"             # Opcional: low | medium | high | urgent

# ─── Campos Temporais ───────────────────────────────────────────
created: 2024-01-15          # Data de criação (preenchida pela Structuring Skill)
due: 2024-02-01              # Opcional: prazo de entrega
completed: false             # Checkbox: false | true

# ─── Campos de Identidade (Obsidian) ───────────────────────────
aliases:
  - "Nome Alternativo"       # Sugestões de link alternativas
cssclasses: []               # Classes CSS customizadas (geralmente vazio)

# ─── Campos Específicos por Tipo ────────────────────────────────
# Para type: reference
url: "https://exemplo.com"
author: "Nome do Autor"

# Para type: project
area: "1_Projects"           # Pasta de destino explícita
---
```

---

## Regras Críticas de Frontmatter

### 1. Listas YAML (nunca inline para tags)

```yaml
# ✅ CORRETO — lista YAML padrão do Obsidian
tags:
  - "action"
  - "dev"

# ❌ ERRADO — sintaxe inline quebra algumas versões do Obsidian
tags: [action, dev]
```

### 2. Datas sem aspas

```yaml
# ✅ CORRETO
due: 2024-02-01
created: 2024-01-15

# ❌ ERRADO — aspas fazem o Obsidian tratar como texto, não Date
due: "2024-02-01"
```

### 3. IDs nunca mudam após criação

```yaml
# O id é gerado no Sensemaking e jamais alterado na Structuring
id: "act-20240118-lnd1"   # ← imutável
```

### 4. `status` é atualizado apenas aqui

O Sensemaking **sempre** entrega `status: "draft"`.  
A Structuring Skill é a única responsável por atualizar para `active`, `done`, ou `archived`.

---

## Checklist de Validação Antes do `write_file`

Antes de salvar o arquivo no Vault, confirme:

- [ ] `id` mantido idêntico ao gerado no Sensemaking
- [ ] `status` atualizado de `draft` para o valor correto
- [ ] `created` preenchido com a data de hoje
- [ ] `tags` em formato de lista YAML (sem inline)
- [ ] Todos os wikilinks `[[link]]` foram verificados (nota de destino existe ou será criada)
- [ ] Pelo menos 1 Callout no corpo da nota
- [ ] Pasta de destino verificada com `read_file` para anti-duplicação
- [ ] Arquivo não conflita com existente (se conflitar → oferecer merge ao usuário)
