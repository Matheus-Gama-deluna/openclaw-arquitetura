# Exemplos de Registros de Divergência e Auditoria

Este arquivo mostra como registrar erros, divergências e o log de auditoria nos arquivos de controle do Vault.

---

## Arquivo `30-Controle/divergencias-linear.md`

Estrutura esperada do arquivo de divergências. Cada entrada é uma seção com `##`:

```markdown
# Divergências — Linear vs Obsidian

> [!warning] Instruções
> Este arquivo é gerenciado automaticamente pela `linear_worker_skill`.
> Só remova uma entrada após reconciliar e confirmar com Matheus.

---

## [2024-01-18] Divergência: tar-2024-01-18-criar-landing-page

- **ID Local:** `tar-2024-01-18-criar-landing-page`
- **Linear ID:** Desconhecido (script falhou antes de retornar)
- **Causa:** Timeout na requisição — `Error: connect ETIMEDOUT`
- **Status Obsidian:** `proxima_acao`
- **Status Linear:** Não criada
- **Ação Sugerida:** Re-executar `linear-cli.js createIssue` após verificar conexão

> [!bug] Requer Intervenção
> Não tentar novamente automaticamente. Aguardar aprovação de Matheus.

---

## [2024-01-17] Divergência: tar-2024-01-16-integrar-actual-budget

- **ID Local:** `tar-2024-01-16-integrar-actual-budget`
- **Linear ID:** `VOLTZ-42`
- **Causa:** Status no Linear é `Done` mas Obsidian ainda marca `ativa`
- **Status Obsidian:** `ativa`
- **Status Linear:** `Done`
- **Ação Sugerida:** Confirmar com Matheus se a tarefa foi realmente concluída e aplicar patch na nota

> [!question] Aguardando Confirmação
> Matheus precisa confirmar: a tarefa VOLTZ-42 está realmente concluída?

---

## ✅ Resolvidas

### [2024-01-15] tar-2024-01-10-configurar-mcp-server
- Reconciliada em 2024-01-11. Linear atualizado para `Done`. Nota sincronizada.
```

---

## Campo `auditoria_local` — Padrão de Entradas

O campo `auditoria_local` no YAML de cada nota deve usar o formato:
`"AAAA-MM-DD — [Agente/Ação]: Descrição do que foi feito"`

```yaml
auditoria_local:
  - "2024-01-15 — Criada via GTD Processamento a partir de captura no Telegram"
  - "2024-01-15 — Aprovada por Matheus via HITL"
  - "2024-01-16 — Linear ID VOLTZ-42 registrado pela linear_worker_skill"
  - "2024-01-18 — Status alterado para 'ativa' — obsidian_sync_skill"
  - "2024-01-20 — Divergência detectada: status Linear diverge do Obsidian"
  - "2024-01-21 — Reconciliada por Matheus. Status atualizado para 'concluida'"
```

---

## Exemplo de Chamada Bem-Sucedida (sem divergência)

Fluxo completo registrado em `auditoria_local`:

```yaml
auditoria_local:
  - "2024-01-18 14:30 — GTD Processamento: tarefa identificada em nota bruta do Secretário"
  - "2024-01-18 14:31 — Proposta enviada para fila_aprovacoes.md"
  - "2024-01-18 14:45 — Matheus aprovou via HITL"
  - "2024-01-18 14:46 — obsidian_sync: nota criada em tarefas/ com YAML completo"
  - "2024-01-18 14:47 — linear_worker: Issue criada — VOLTZ-55"
  - "2024-01-18 14:47 — obsidian_sync: linear_id e status_sync atualizados"
```
