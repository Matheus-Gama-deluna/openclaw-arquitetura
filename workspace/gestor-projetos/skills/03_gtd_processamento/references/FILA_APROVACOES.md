# Referência da Fila de Aprovações — GTD Processamento

Este arquivo define o formato exato do arquivo `30-Controle/fila_aprovacoes.md` e como o agente deve estruturar as propostas GTD antes de enviá-las para aprovação HITL.

> **Regra de ouro**: Nenhuma modificação no Vault é feita sem uma entrada aprovada na fila.

---

## Estrutura do Arquivo `fila_aprovacoes.md`

```markdown
# Fila de Aprovações — Gestor de Projetos

> [!abstract] Instruções
> Cada entrada abaixo é uma proposta de criação/modificação gerada pelo GTD Processamento.
> Marque `status: aprovada` ou `status: rejeitada` e informe o agente para continuar.

---

## ⏳ Pendentes

### [2024-01-18] Proposta #001 — Criar tarefa: Landing Page OpenClaw

**Tipo de operação:** `criar_tarefa`
**Arquivo destino:** `Projetos/OpenClaw/tarefas/tar-2024-01-18-criar-landing-page.md`

**YAML Proposto:**
    id: "tar-2024-01-18-criar-landing-page"
    tipo_registro: "tarefa"
    titulo: "Implementar Landing Page do OpenClaw"
    status: "proxima_acao"
    energia: "profunda"
    prioridade: 1
    projeto: "OpenClaw Lançamento v1"

**Justificativa:** Tarefa identificada em nota bruta `Inbox/nota-2024-01-18-ideia-landing.md`.
Título reescrito com verbo forte. Energia "profunda" pois envolve implementação completa.

**Aprovação:**
- [ ] ✅ Aprovada — Matheus
- [ ] ❌ Rejeitada — Motivo: ___

---

## ✅ Aprovadas (histórico)

### [2024-01-15] Proposta #000 — Criar tarefa: Configurar MCP Server

**Status:** `aprovada` em 2024-01-15
**Resultado:** `tar-2024-01-10-configurar-mcp-server.md` criada. Linear ID VOLTZ-38.
```

---

## Heurísticas de Reescrita de Título (GTD)

O título da tarefa DEVE seguir o padrão: **Verbo Forte + Objeto + Contexto Opcional**

| Título Original (vago) | Título Proposto (GTD) |
|------------------------|----------------------|
| "Landing page" | "Implementar Landing Page do OpenClaw" |
| "Revisar código" | "Revisar e aprovar PR #42 do Finance Bot" |
| "API" | "Documentar endpoints da Actual Budget API" |
| "Reunião João" | "Ligar para João confirmar reunião de alinhamento" |
| "Estudar K8s" | "Assistir módulo 1 do curso de Kubernetes (YouTube)" |

---

## Classificação de Energia por Tipo de Trabalho

| Tipo de Trabalho | Energia | Exemplos |
|-----------------|---------|----------|
| Ler email, revisar doc | `leve` | "Revisar documento de requisitos" |
| Reunião, chamada rápida | `media` | "Call com cliente — 30min" |
| Implementação focada | `foco` | "Implementar autenticação JWT" |
| Arquitetura, design técnico profundo | `profunda` | "Projetar banco de dados do Finance Bot" |

---

## Decisão de Status Inicial

| Situação da Nota | Status Proposto |
|-----------------|----------------|
| Ação totalmente clara e sem bloqueio | `proxima_acao` |
| Depende de outra tarefa listada | `aguardando` |
| Incerta, precisa amadurecer | `algum_dia` |
| Ideia solta capturada | `rascunho` |

---

## Limite WIP — Regra dos 5

> **Antes de propor `status: ativa` ou `status: proxima_acao`**, verifique quantas tarefas ativas já existem no projeto.

```
Máximo de tarefas ativas por projeto: 5
```

- Se já há 5+ tarefas `ativa`: proponha `algum_dia` ou `aguardando`
- Sinalize no HITL: *"Projeto X já tem N tarefas ativas (WIP estourado). Propor como `algum_dia`?"*
