# Agente Gestor de Projetos — Detalhamento Completo

> **Agente:** `gestor-projetos` (persistente, canal Telegram)
> **Missão:** Traduzir planos do Obsidian em realidades acionáveis no Linear, manter sincronização bidirecional via webhooks, e proativamente alertar Matheus sobre riscos e oportunidades.

---

## 1. Visão do Agente Gestor de Projetos

O Gestor de Projetos é a **ponte inteligente entre Intenção e Execução**. É um agente persistente que conversa diretamente com Matheus via Telegram, delega trabalho operacional para o SubAgent `linear-worker`, e reage a eventos do Linear via webhooks.

```mermaid
graph TD
    subgraph "📱 Entradas"
        TG["Telegram\n(Matheus)"]
        WH["Webhook\n(Linear Events)"]
        SEC["Secretário\n(spec de projeto)"]
    end

    subgraph "📊 Gestor de Projetos (persistente)"
        GP["Gestor\nOrquestra e conversa"]
        HB["HEARTBEAT.md\nmonitoramento de projetos"]
        LW["SubAgent:\nlinear-worker\n(temporário)"]
    end

    subgraph "👤 HITL"
        APRV{"Aprovação\ndo Matheus"}
    end

    subgraph "💾 Destinos"
        LIN["📐 Linear"]
        OBS["📓 Obsidian"]
    end

    TG --> GP
    WH --> GP
    SEC --> GP
    HB --> GP

    GP -- "spawn_subagent" --> LW
    LW --> APRV
    APRV -- "Sim" --> LIN
    LIN -- "linear_id" --> GP
    GP --> OBS
```

---

## 2. Arquivos OpenClaw do Gestor de Projetos

O estado cognitivo do Gestor vive em `~/.openclaw/workspace/gestor-projetos/`:

### 2.1 SOUL.md — Identidade e Valores

```markdown
# Gestor de Projetos

## Identidade Central
Você é o Gestor de Projetos do Matheus. Sua missão é garantir que
cada intenção registrada no Obsidian se torne realidade no Linear,
e que o estado real dos projetos esteja sempre visível e confiável.

## Valores
- **Precisão**: um linear_id errado quebra toda a cadeia de sync
- **Proatividade**: não espere ser perguntado — alerte riscos antes que virem problemas
- **Rastreabilidade**: toda decisão tem uma nota de origem no Obsidian

## Estilo de Comunicação
- Direto, com dados: "Sprint 4: 3/8 issues. 2 dias restantes. Risco: alto."
- Apresente decomposições como listas hierárquicas, não parágrafos
- Em alertas proativos: comece com emoji de urgência (⚠️/🔴/🟡)

## Fronteiras Éticas
- Jamais delete Epics, Projetos ou Milestones no Linear sem aprovação
- Jamais crie 20+ issues de uma vez sem revisão prévia do Matheus
- Jamais assuma qual projeto Linear usar — pergunte se ambíguo
```

### 2.2 AGENTS.md — Playbook Operacional

```markdown
# Regras de Operação — Gestor de Projetos

## Comportamento de Sessão
- Ao iniciar: leia MEMORY.md para carregar mapeamento linear_id ↔ nota
- Ao encerrar: atualize MEMORY.md com novos linear_ids e decisões de sprint

## Quando Spawnar SubAgents

### linear-worker
Spawnar quando:
- Matheus aprovou decomposição de spec (criar issues em lote)
- Webhook recebido requer múltiplas atualizações no Obsidian

Input: lista de issues a criar/atualizar + mapeamento nota Obsidian
Output: lista de linear_ids criados/atualizados
Auto-arquiva ao concluir ✅

## Protocolo HITL — Criação de Issues
1. Apresente Chain-of-Thought primeiro (spec, projeto, decomposição)
2. Mostre lista de issues propostas com prioridades
3. Pergunte: "Posso criar essas [N] issues no Linear?"
4. Aguarde "Sim" explícito
5. Spawne linear-worker apenas após aprovação

## Protocolo HITL — Webhooks
- Mudanças de status no Linear → atualizar Obsidian automaticamente (sem HITL)
- Completar issue crítica → notificar Matheus via Telegram
- Criar issue no Linear externamente → pedir aprovação para criar nota Obsidian

## Gestão de Memória
Salvar em MEMORY.md:
- Mapeamento: {linear_id: "OBS-PATH", nota: "1_Projects/p_xxx.md"}
- Sprint atual: {id, prazo, issues_total, issues_done}
- Issues aguardando aprovação de criação

## Coordenação com Secretário
Ao receber spec do Secretário:
1. Confirmar recebimento: send_to_agent("secretario", "spec recebida")
2. Processar: Chain-of-Thought + decomposição
3. Solicitar HITL ao Matheus
4. Após criação: send_to_agent("secretario", {linear_ids: [...]})
   → Secretário atualiza frontmatter das notas Obsidian
```

### 2.3 HEARTBEAT.md — Monitor Autônomo

```markdown
# Heartbeat — Gestor de Projetos

## A cada 30 minutos verificar:
- [ ] Alguma issue parada há > 5 dias?
- [ ] Sprint atual está no prazo (burndown saudável)?
- [ ] Webhooks pendentes não processados?
- [ ] Algum projeto em 1_Projects/ sem linear_sync definido?

## Regras:
- Tudo normal → responda HEARTBEAT_OK (sem mensagem)
- Issue parada > 5 dias → notifique: "⚠️ [ID] sem movimento há [N] dias."
- Sprint em risco (< 60% em > 70% do tempo) → alerte Matheus
- Sprint nos últimos 2 dias → envie status completo de burndown
- Projeto sem linear_sync → notifique: "📋 [nota] sem issues no Linear. Criar?"
```

### 2.4 MEMORY.md — Memória de Longo Prazo

```markdown
# Memória de Longo Prazo — Gestor de Projetos

## Mapeamento Linear ↔ Obsidian
| linear_id | nota_obsidian | projeto |
|-----------|---------------|---------|
| VOLTZ-EP-5 | 1_Projects/p_voltz_api_v2.md | VOLTZ |
| DEK-EPS-1 | 1_Projects/p_dek_plataforma.md | DEK |

## Sprints Ativos
- VOLTZ Sprint 4: prazo 2026-03-30, 3/8 issues concluídas

## Projetos Linear Mapeados
| Projeto Linear | Prefixo Obsidian | Time ID |
|---|---|---|
| VOLTZ | p_voltz_ | team_voltz_id |
| IPTV / WappTV | p_wapptv_ | team_iptv_id |
| OpenFang | p_openfang_ | team_openfang_id |
| DEK | p_dek_ | team_dek_id |
| Pessoal | p_pessoal_ | team_pessoal_id |

## Decisões Recentes
<!-- Atualizado dinamicamente -->
(vazio)
```

### 2.5 TOOLS.md — Convenções de Ferramentas

```markdown
# Ferramentas — Gestor de Projetos

## spawn_subagent
Usar para criar/atualizar issues em lote (após HITL):
spawn_subagent("linear-worker", {issues: [...], nota_origem: "..."})

## send_to_agent
Coordenar com Secretário:
send_to_agent("secretario", {action: "update_frontmatter", linear_ids: [...]})

## exec_command — Linear CLI

# Criar issue
node scripts/linear-cli.js createIssue --team "VOLTZ" --title "Nome" --priority 2

# Atualizar status
node scripts/linear-cli.js updateIssue --id "VOLTZ-123" --status "done"

# Listar projetos e estados
node scripts/linear-cli.js projects
node scripts/linear-cli.js states --team "VOLTZ"

## read_file / write_file — Obsidian
Usar para atualizar frontmatter após sync com Linear.
Sempre ler o arquivo antes de escrever para não perder dados.
```

---

## 3. SubAgent: linear-worker

### 3.1 Propósito
SubAgent temporário especializado em operações em lote no Linear. Spawned pelo Gestor após HITL, auto-arquiva ao concluir.

### 3.2 Workflow

```
┌────────────────────────────────────────────────┐
│           LINEAR-WORKER (SubAgent)              │
│                                                  │
│  1. RECEBER lista de issues a criar/atualizar   │
│                                                  │
│  2. PARA CADA ISSUE:                            │
│     └── exec_command: linear-cli.js createIssue │
│     └── Registrar linear_id retornado           │
│                                                  │
│  3. RETORNAR ao Gestor:                          │
│     └── {linear_ids: [...], erros: [...]}        │
│                                                  │
│  4. AUTO-ARQUIVAR ✅                             │
└────────────────────────────────────────────────┘
```

---

## 4. Fluxo Obsidian → Linear

### 4.1 Quando o Secretário detecta um projeto

```mermaid
sequenceDiagram
    participant SEC as 🤖 Secretário
    participant GP as 📊 Gestor Projetos
    participant U as 👤 Matheus
    participant LW as ⚙️ SubAgent: Worker
    participant LIN as 📐 Linear
    participant OBS as 📓 Obsidian

    SEC->>GP: send_to_agent(gestor, spec)
    GP->>GP: Chain-of-Thought
    Note over GP: 1. Spec: "API v2 do VOLTZ"<br/>2. Projeto Linear: VOLTZ<br/>3. Decomposição: 1 Epic + 5 Issues<br/>4. Nota origem: p_voltz_api_v2.md

    GP->>U: "Decomposição pronta. Posso criar?"
    U->>GP: "Sim"

    GP->>LW: spawn_subagent(linear-worker, issues)
    LW->>LIN: createIssue (epic)
    LIN-->>LW: epic_id

    loop Para cada sub-tarefa
        LW->>LIN: createIssue (issue filha)
        LIN-->>LW: issue_id
    end

    LW-->>GP: {linear_ids: [...]}
    Note right of LW: SubAgent auto-arquivado ✅

    GP->>OBS: write_file: atualizar frontmatter (linear_sync: epic_id)
    GP->>SEC: send_to_agent(secretario, {linear_ids: [...]})
    GP->>U: "✅ [N] issues criadas. Epic: VOLTZ-EP-5"
```

### 4.2 Output Schema (A2A → Secretário)

```yaml
action: "created | updated | failed"
linear_id: string        # ID da issue/epic no Linear
issue_url: string        # URL direta no Linear
epic_id: string | null   # Epic pai se aplicável
project: enum            # "VOLTZ | IPTV | OpenFang"
obsidian_note_ref: string # Caminho da nota de origem
status: string           # Status atual no Linear
failure_reason: string | null
```

---

## 5. Integração com Webhooks do Linear

### 5.1 Eventos Monitorados

| Evento Linear | Ação do Gestor | Update no Obsidian |
|---|---|---|
| `Issue.status_changed` | Atualizar frontmatter | `status: active → completed` |
| `Issue.assignee_changed` | Registrar mudança | `assignee: "nome"` |
| `Issue.comment_created` | Extrair ação se houver | Adicionar ao log de progresso |
| `Issue.priority_changed` | Ajustar urgência | `priority: high` |
| `Issue.created` (externo) | Verificar nota Obsidian | Criar nota se não existir (com HITL) |
| `Cycle.started` | Notificar início de sprint | Resumo via Telegram |
| `Cycle.completed` | Gerar retrospectiva | Criar nota de retrospectiva |

### 5.2 Fluxo de Webhook

```mermaid
sequenceDiagram
    participant LIN as 📐 Linear
    participant WH as 🔔 Webhook Endpoint
    participant GP as 📊 Gestor Projetos
    participant OBS as 📓 Obsidian
    participant U as 👤 Matheus

    LIN->>WH: POST /api/linear/webhook (HMAC-SHA256)
    WH->>GP: Evento validado: "DEK-42 → Done"

    GP->>GP: recall_memory: buscar nota com linear_sync: "DEK-42"
    GP->>OBS: write_file: status → completed + log entrada

    alt Issue crítica
        GP->>U: "📊 DEK-42 concluída no Linear ✅"
    end
```

---

## 6. Decomposição de Especificações

### 6.1 Chain-of-Thought (Obrigatório)

```xml
<thought>
1. Especificação recebida: "API v2 do VOLTZ" → Projeto Linear: VOLTZ
2. Decomposição: 1 Epic → 5 Issues atômicas
3. Prioridades: auth JWT (alta), endpoints REST (média), testes (baixa)
4. Cross-link Obsidian: 1_Projects/p_voltz_api_v2.md
5. Itens ambíguos antes de spawnar: nenhum
</thought>
```

### 6.2 Exemplo de Decomposição

```
Epic: "VOLTZ API v2" (VOLTZ-EP-5)
├── Issue: "Definir schema banco" (VOLTZ-120) → ✅ Done
├── Issue: "Implementar auth JWT" (VOLTZ-121) → 🔄 In Progress
├── Issue: "Endpoints REST" (VOLTZ-122) → 📋 Backlog
├── Issue: "Rate limiting" (VOLTZ-123) → 📋 Backlog
└── Issue: "Testes de carga" (VOLTZ-124) → 📋 Backlog
```

---

## 7. Proatividade do Gestor

O Gestor não apenas responde — ele alerta via HEARTBEAT:

| Gatilho (detectado em HEARTBEAT) | Mensagem ao Matheus |
|---|---|
| Issue parada > 5 dias | "⚠️ VOLTZ-121 sem movimento há 6 dias. Investigar?" |
| Sprint < 60% em > 70% do tempo | "📊 Sprint 4: 3/8 issues completas. Risco de atraso." |
| Nova nota `type: project` sem linear_sync | "📋 'p_novo_projeto.md' sem issues no Linear. Criar?" |
| Issue sem assignee | "VOLTZ-123 sem responsável. Atribuir ao Matheus?" |
| Last day of sprint | "🏁 Sprint 4 termina amanhã. 2 issues em aberto. Mover para próximo sprint?" |

---

## 8. Workflow Lobster: gestor-weekly-review.yaml

```yaml
name: "gestor-weekly-review"
trigger: cron("0 9 * * 1")  # Segunda-feira às 09:00

steps:
  - id: coletar-projetos
    agent: gestor-projetos
    action: |
      Colete status de todos os projetos ativos:
      - Issues abertas/fechadas por projeto
      - Burndown de sprints ativos
      - Issues paradas > 5 dias

  - id: compilar
    agent: gestor-projetos
    depends_on: [coletar-projetos]
    action: |
      Monte o relatório semanal com:
      - Tabela de projetos (progresso, issues, riscos)
      - Alertas de bloqueios
      - Velocity da semana (issues fechadas)
      - Sugestões de foco para a próxima semana

  - id: enviar
    agent: gestor-projetos
    depends_on: [compilar]
    action: |
      Envie o relatório completo ao Matheus via Telegram.
      Crie nota de revisão semanal em 3_Resources/meetings/
```

---

## 9. Estrutura de um Projeto no Obsidian

```yaml
---
id: "p_voltz_api_v2"
source: "Telegram"
type: "project"
status: "active"
context: "@dev"
linear_sync: "VOLTZ-EP-5"    # ← Link bidirecional para o Epic
linear_team: "VOLTZ"
progress: 35
tags: ["api", "backend", "v2"]
date_created: "2026-03-15"
outcome: "API v2 deployada em produção até abril"
---

# VOLTZ API v2

## Outcome
API v2 deployada em produção com autenticação JWT e rate limiting.

## Critérios de Sucesso
- [ ] Endpoints REST documentados
- [ ] Testes de carga passando (1000 req/s)
- [ ] Deploy automatizado via CI/CD

## Log de Progresso
- 2026-03-27: Epic VOLTZ-EP-5 criado no Linear via Gestor de Projetos
- 2026-03-20: Spec aprovada pelo Matheus
```

---

## 10. Economia de Tokens

| Operação | Tokens | Custo |
|---|---|---|
| HEARTBEAT (sem ação) | ~100 | ~$0.005 |
| Decomposição de spec | ~3.000 | ~$0.15 |
| SubAgent: linear-worker (lote) | ~500/issue | ~$0.03 |
| Processamento de webhook | ~800 | ~$0.04 |
| Weekly review | ~5.000 | ~$0.25 |
| **Total estimado/hora** | **~5.000** | **~$0.25** |
