# Referência de Mapeamento Linear ↔ Obsidian

Este arquivo define exatamente como os campos do Obsidian YAML se traduzem em campos do Linear, e vice-versa.

> **Fonte de verdade**: SEMPRE o Obsidian. O Linear é o espelho de execução.

---

## Tabela de Mapeamento de Campos

| Campo Obsidian YAML | Campo Linear | Notas |
|---------------------|--------------|-------|
| `titulo` | `title` | Direto |
| `projeto` | `team` + `project` | Conforme mapeamento de projetos abaixo |
| `status` | `state` | Conversão via tabela abaixo |
| `prioridade` | `priority` | Conversão numérica: 1→Urgent, 2→High, 3→Normal, 4→Low |
| `energia` | `estimate` | leve=1pt, media=2pt, foco=3pt, profunda=5pt |
| `datas.vencimento_em` | `dueDate` | Formato ISO: `YYYY-MM-DD` |
| `sincronizacao.linear_id` | `id` | Preenchido APÓS criação no Linear |
| `contextos.ferramentas` | `labels` | Lista de labels no Linear |

---

## Conversão de Status GTD → Linear

| Status Obsidian | State Linear | Quando usar |
|-----------------|-------------|-------------|
| `rascunho` | `Backlog` | Aguardando processamento |
| `proxima_acao` | `Ready` | Pronta para ser pega |
| `ativa` | `In Progress` | Em execução agora |
| `aguardando` | `Blocked` | Depende de outra tarefa/pessoa |
| `bloqueada` | `Blocked` | Bloqueio técnico ou externo |
| `algum_dia` | `Backlog` (sem deadline) | Desejos futuros |
| `concluida` | `Done` | Feita e validada |
| `cancelada` | `Cancelled` | Descartada com motivo |

---

## Pré-Condições para Usar o Script `linear-cli.js`

Antes de qualquer operação no Linear, verifique:

1. `LINEAR_API_KEY` está disponível no ambiente (`process.env.LINEAR_API_KEY`)
2. A nota Obsidian tem `aprovacao.status: "aprovada"`
3. O campo `titulo` não está vazio ou com placeholder

```bash
# Criar uma nova issue
node scripts/linear-cli.js createIssue \
  --title "Implementar Landing Page" \
  --team "VOLTZ" \
  --state "Ready" \
  --priority 1

# Atualizar issue existente
node scripts/linear-cli.js updateIssue \
  --id "VOLTZ-42" \
  --state "In Progress" \
  --dueDate "2024-02-01"
```

---

## Fluxo de Sincronização Pós-Criação

Após criar/atualizar uma issue no Linear, execute **imediatamente** o patch YAML na nota Obsidian:

```yaml
# Campos a atualizar na nota após retorno do Linear:
sincronizacao:
  linear_id: "VOLTZ-123"      # ← ID retornado pelo script
  status_sync: "sincronizado"  # ← Muda de "pendente" para "sincronizado"

auditoria_local:
  - "2024-01-15 — Criada/Atualizada no Linear: VOLTZ-123"
```

---

## Tratamento de Divergências

Se `status_sync: "divergente"` for detectado, registre **imediatamente** no arquivo de controle:

**Arquivo:** `30-Controle/divergencias-linear.md`

```markdown
## [2024-01-15] Divergência: tar-2024-01-15-slug

- **ID Local:** tar-2024-01-15-slug
- **Linear ID:** VOLTZ-123 (se conhecido)
- **Causa:** [descreva o erro retornado pelo script]
- **Status Obsidian:** ativa
- **Status Linear:** Done (conflito!)
- **Ação Sugerida:** Verificar e reconciliar manualmente

> [!bug] Requer Intervenção Humana
> Não tente resolver automaticamente. Aguardar Matheus.
```
