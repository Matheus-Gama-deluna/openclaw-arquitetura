# Referência Técnica: OpenClaw — Arquitetura e Multiagentes

> **Atualizado em:** 2026-03-27 | **Versão pesquisada:** 2026.x (pós-rebrand de Clawdbot)
> **Stack do projeto:** OpenClaw + Gemini API (via VPS)
> **Arquitetura atual:** 2 agentes persistentes + SubAgents temporários

---

## 1. O que é o OpenClaw

OpenClaw é um **Agent OS de código aberto** que conecta LLMs ao ambiente local e a aplicações de mensagens. Opera como um "trabalhador digital programável":
- Executa tarefas de forma autônoma (não apenas conversa)
- Persiste memória entre sessões via **arquivos Markdown**
- Funciona 24/7 em servidor, reagindo a eventos e agendamentos

**Gateway** é o coração do sistema: gerencia sessões, roteia canais, despacha tools e processa eventos.

```
┌──────────────────────────────────────────────────────┐
│                   OPENCLAW GATEWAY                    │
│                                                        │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │  Channel    │  │   Session    │  │   Tool      │  │
│  │  Router     │  │   Manager   │  │  Dispatcher │  │
│  │  (Telegram, │  │  (contexto  │  │  (shell,    │  │
│  │  Slack...)  │  │   + memória)│  │  MCP, API)  │  │
│  └─────────────┘  └──────────────┘  └─────────────┘  │
│                          ↓                            │
│                  ┌───────────────┐                    │
│                  │ Agent Runtime │                    │
│                  │  1. Monta ctx │                    │
│                  │  2. Chama LLM │                    │
│                  │  3. Exec tools│                    │
│                  │  4. Salva state│                   │
│                  └───────────────┘                    │
└──────────────────────────────────────────────────────┘
```

---

## 2. Design "File-First" — Os Arquivos do Agente

O estado cognitivo completo de um agente OpenClaw está em **Markdown puro**. Isso garante:
- ✅ Auditabilidade total (você lê o que o agente sabe)
- ✅ Portabilidade (é só texto)
- ✅ Controle humano (edite e a mudança está feita)

### Localização dos arquivos
```
~/.openclaw/
├── openclaw.json          ← Config global (JSON5)
└── workspace/
    └── [nome-do-agente]/
        ├── SOUL.md        ← Quem o agente É
        ├── AGENTS.md      ← O que o agente FAZ e como
        ├── IDENTITY.md    ← O que o usuário VÊ
        ├── USER.md        ← Preferências do usuário
        ├── TOOLS.md       ← Como usar as ferramentas
        ├── MEMORY.md      ← Memória de longo prazo (curada)
        ├── HEARTBEAT.md   ← Checklists de monitoramento autônomo
        └── BOOTSTRAP.md   ← Script de boot (opcional)
```

### Papel de cada arquivo

| Arquivo | Pergunta que responde | Lido quando |
|---|---|---|
| `SOUL.md` | *Quem você é?* Valores, personalidade, ética | Início de TODA sessão |
| `AGENTS.md` | *O que você faz?* Regras, workflows, coordenação | Início de TODA sessão |
| `IDENTITY.md` | *Como você se apresenta?* Nome, ID, role | Apresentação pública |
| `USER.md` | *Quem é o usuário?* Preferências, contexto | Toda sessão |
| `TOOLS.md` | *Como usar tools?* Convenções de uso | Quando vai usar tools |
| `MEMORY.md` | *O que você sabe?* Fatos duráveis curados | Recuperação de contexto |
| `HEARTBEAT.md` | *O que monitorar?* Checklist periódico | A cada 30min (padrão) |
| `BOOTSTRAP.md` | *Como iniciar?* Script de setup | Apenas no boot |

---

## 3. Arquivos Core em Detalhe

### 3.1 SOUL.md (Blueprint Filosófico)
```markdown
# Nome do Agente

## Identidade Central
Você é [persona]. Sua missão fundamental é [missão].

## Valores
- [Valor 1]: explicação
- [Valor 2]: explicação

## Estilo de Comunicação
- Tom: [descrição]
- O que NUNCA fazer: [lista]

## Fronteiras Éticas
- Jamais [ação inaceitável]
```

### 3.2 AGENTS.md (Playbook Operacional)
```markdown
# Regras de Operação

## Comportamento de Sessão
- Como iniciar cada sessão
- Como encerrar

## Gestão de Memória
- O que salvar em MEMORY.md
- Quando atualizar

## Workflows
### Workflow: [Nome]
1. Passo 1
2. Passo 2 (condição)

## Coordenação Multi-Agente
- Quando chamar [agente-B]
- Formato do handoff
```

### 3.3 HEARTBEAT.md (Monitor Autônomo)
```markdown
# Heartbeat Checklist

## A cada 30 minutos verificar:
- [ ] Inbox do TickTick tem novas tarefas?
- [ ] Algum projeto bloqueado há > 5 dias?
- [ ] Vault Obsidian tem itens em 0_Inbox?

## Regras:
- Se nada requer ação → responda HEARTBEAT_OK (suprime mensagem)
- Se ação necessária → execute e notifique
- Você pode atualizar este arquivo conforme aprende
```

> 💡 `HEARTBEAT_OK` = OpenClaw suprime a mensagem de saída → economia de API calls.

---

## 4. Configuração do Gateway (`openclaw.json`)

```json5
// ~/.openclaw/openclaw.json (formato JSON5 — aceita comentários)
{
  gateway: {
    mode: "local",  // ou "remote"
    token: "seu-token-aqui",
    host: "localhost",  // bind local (mais seguro)
    port: 3000
  },

  // Definição de agentes persistentes
  agents: [
    {
      id: "orchestrator",
      workspace: "~/.openclaw/workspace/orchestrator",
      model: "gemini/gemini-2.5-flash-lite",
      channels: ["telegram"],  // Canal de entrada
    },
    {
      id: "capture-clarifier",
      workspace: "~/.openclaw/workspace/capture-clarifier",
      model: "gemini/gemini-2.5-pro",
      // Sem channel = só recebe de outros agentes
    }
  ]
}
```

---

## 5. Sistema de Multiagentes

### 5.1 Tipos de Agentes

```
OpenClaw Multi-Agent
├── Agente Persistente      → Longa vida, mapeado a canal
│                             Mantém workspace completo
│
├── SubAgent (filho)        → Temporário, tarefa específica
│                             Spawned pelo orquestrador
│                             AUTO-ARQUIVA ao concluir ✅
│
└── Agent Team             → Múltiplos agentes colaborando
    ├── Team Lead           → Coordena o grupo
    └── Teammates           → Interagíveis individualmente
                              Exploração paralela e independente
```

### 5.2 Padrões de Colaboração

| Padrão | Como funciona | Melhor para |
|---|---|---|
| **Orquestrador** | Master agent delega, combina resultados | Fluxos sequenciais previsíveis |
| **Peer-to-Peer** | Agentes colaboram diretamente | Pesquisa exploratória |
| **Hierárquico** | Árvore de delegação especializada | Projetos multi-fase complexos |

### 5.3 Como SubAgents funcionam na prática
```
Orquestrador recebe tarefa
       │
       ├── Analisa complexidade
       │
       ├── Spawna SubAgent A  → [processa] → retorna resultado
       ├── Spawna SubAgent B  → [processa] → retorna resultado  (paralelo!)
       │
       ├── Coleta resultados de A e B
       │
       └── Consolida → responde ao usuário

⚠️ SubAgents se auto-arquivam ao terminar a tarefa
```

### 5.4 Workflow Engine "Lobster"

O OpenClaw inclui um motor de workflows chamado **Lobster**, que pode ser disparado por HEARTBEAT ou cron:

```yaml
# Exemplo de workflow multiagente via Lobster
name: "secretario-diario"
trigger: cron("0 18 * * *")   # Todo dia às 18h

steps:
  - id: coletar
    agent: capture-clarifier
    action: "Processe o inbox do TickTick"

  - id: organizar
    agent: organizer
    depends_on: [coletar]
    input: "{{steps.coletar.output}}"

  - id: notificar
    agent: orchestrator
    depends_on: [organizar]
    action: "Envie resumo via Telegram"
```

Suporta:
- ✅ Execução **sequencial** (`depends_on`)
- ✅ Execução **paralela** (sem `depends_on`)
- ✅ **Branching condicional** (por output do step anterior)
- ✅ **Retry logic** e fallback
- ✅ **State passing** entre steps (`{{steps.X.output}}`)

---

## 6. Sistema de Tools e Skills

### 6.1 Tools Nativas (100+ built-in)
```
Filesystem      → read_file, write_file, list_dir
Shell           → exec_command (sandboxado)
Web             → browse_url, web_search, fetch_content
Comunicação     → send_message, send_email
APIs            → http_request (com auth)
Memória         → store_memory, recall_memory
Agentes         → spawn_subagent, send_to_agent, message_team
```

### 6.2 Skills (Plugins Modulares)
Skills = extensões que permitem capacidades além das tools nativas.

```
~/.openclaw/workspace/[agente]/skills/
├── ticktick-mcp/     → Integração TickTick
├── linear-mcp/       → Integração Linear
├── obsidian-mcp/     → Leitura/escrita Obsidian
└── custom-skill/     → Skill personalizada
```

### 6.3 MCP Integration
O OpenClaw actua em **dois modos MCP simultâneos**:

```
Como CLIENTE MCP:
  OpenClaw → consome ferramentas de servidores externos
  Exemplos: GitHub MCP, Obsidian MCP, Linear MCP, TickTick MCP

Como SERVIDOR MCP:
  OpenClaw → expõe seus agentes como ferramentas MCP
  Qualquer IDE ou agente externo pode chamar:
  openfang_agent_orchestrator(task="...")
  openfang_agent_organizer(task="...")
```

---

## 7. Sistema de Memória

```
Memória do Agente OpenClaw
│
├── Sessão (curto prazo)    → Contexto da conversa atual
│                             Resetado ao fechar sessão
│
├── MEMORY.md (longo prazo) → Fatos curados manualmente/auto
│                             Persiste entre sessões
│                             Editável pelo humano e pelo agente
│
└── Via MCP (externo)       → Serviços como Pieces LTM
                              Memória semântica distribuída
```

### Exemplo de MEMORY.md
```markdown
# Memória de Longo Prazo

## Sobre Matheus
- Projetos ativos: VOLTZ, WappTV, DEK, OpenFang
- Prefere mensagens diretas sem cerimônias
- Fuso horário: UTC-3 (Brasília)
- TickTick: usa tags para marcar tarefas processadas

## Decisões Técnicas
- Obsidian Vault: estrutura PARA (0_Inbox, 1_Projects...)
- Linear: VOLTZ / IPTV / OpenFang como projetos
- Agentes com HITL obrigatório antes de escrever arquivos

## Contexto de Projetos
- VOLTZ: foco em Sprint 4, bloqueio na autenticação
- WappTV: feature de busca em desenvolvimento
```

---

## 8. Scheduling: Heartbeat vs Cron

| | **HEARTBEAT** | **CRON** |
|---|---|---|
| Pergunta | "Preciso agir?" | "Faça isso AGORA" |
| Contexto | Dentro da sessão principal | Sessão isolada |
| Cadência | Fixo (padrão: 30min) | Qualquer cron syntax |
| Ideal para | Monitoramento, inbox, alertas | Relatórios, revisões, syncs |
| Custo | Baixo (HEARTBEAT_OK suprime) | Por execução |

**Estratégia recomendada: combine os dois**
```
HEARTBEAT (30min) → monitoramento contínuo, nada escapa
CRON (18:00)      → daily review determinística
CRON (Segunda)    → weekly review automática
```

---

## 9. Segurança

> ⚠️ CVE-2026-25253 (Fev 2026): vulnerabilidade de RCE foi corrigida. Mantenha sempre atualizado.

**Boas práticas:**
- Bind do Gateway apenas em `localhost`
- Use SSH tunneling para acesso remoto (não exponha porta diretamente)
- Rotacione o `gateway.token` periodicamente
- Sandbox habilitado para `exec_command`
- `openclaw doctor` para diagnóstico de configuração

---

## 10. Mapeamento do Projeto Atual → OpenClaw

### Topologia de Agentes

| Tipo | Agente | Canal | Workspace |
|---|---|---|---|
| **Persistente** | `secretario` | Telegram | `~/.openclaw/workspace/secretario/` |
| **Persistente** | `gestor-projetos` | Telegram | `~/.openclaw/workspace/gestor-projetos/` |
| **SubAgent** | `capture-clarifier` | — (spawned) | Sem workspace próprio |
| **SubAgent** | `organizer` | — (spawned) | Sem workspace próprio |
| **SubAgent** | `linear-worker` | — (spawned) | Sem workspace próprio |
| **SubAgent** | `architect` | — (sob demanda) | Sem workspace próprio |
| **SubAgent** | `operator` | — (sob demanda) | Sem workspace próprio |

### Arquivos OpenClaw por Agente Persistente

| Arquivo | Papel | secretario | gestor-projetos |
|---|---|---|---|
| `SOUL.md` | Identidade filosófica | ✅ | ✅ |
| `AGENTS.md` | Playbook operacional | ✅ | ✅ |
| `IDENTITY.md` | Apresentação pública | ✅ | ✅ |
| `USER.md` | Perfil do Matheus | ✅ | ✅ |
| `TOOLS.md` | Convenções de tools | ✅ | ✅ |
| `MEMORY.md` | Memória longa | ✅ (capturas pendentes) | ✅ (linear_id map) |
| `HEARTBEAT.md` | Monitor autônomo | ✅ (TickTick, Inbox) | ✅ (issues, sprints) |
| `workflows/` | Workflows Lobster | secretario-captura.yaml | gestor-weekly-review.yaml |

### openclaw.json Completo do Projeto

```json5
// ~/.openclaw/openclaw.json
{
  gateway: {
    mode: "local",
    token: "SEU_TOKEN_AQUI",
    host: "localhost",  // bind local — não exponha diretamente
    port: 3000
  },

  // Apenas 2 agentes persistentes com canal Telegram
  agents: [
    {
      id: "secretario",
      workspace: "~/.openclaw/workspace/secretario",
      model: "gemini/gemini-2.5-pro",
      channels: ["telegram"],
      heartbeat: {
        interval: "30m",
        suppress_ok: true  // HEARTBEAT_OK suprime output → economia de tokens
      }
    },
    {
      id: "gestor-projetos",
      workspace: "~/.openclaw/workspace/gestor-projetos",
      model: "gemini/gemini-2.5-pro",
      channels: ["telegram"],
      heartbeat: {
        interval: "30m",
        suppress_ok: true
      }
    }
    // SubAgents (capture-clarifier, organizer, linear-worker, architect, operator)
    // são spawned dinamicamente via spawn_subagent() — não precisam de config estática
  ]
}
```

---

## 11. Comandos CLI Principais

```bash
# Setup e diagnóstico
openclaw doctor                             # Verifica configuração
openclaw config set gateway.token "TOKEN"   # Define token do gateway

# Gerenciar agentes
openclaw agent list                         # Lista agentes ativos
openclaw agent new [template]               # Cria de template built-in
openclaw agent spawn [manifest.json]        # Deploy de manifest customizado

# Gateway
openclaw start                              # Inicia o gateway
openclaw restart                            # Reinicia (aplica config)

# Workflows (Lobster)
openclaw workflow run [workflow.yaml]       # Executa workflow
openclaw workflow list                      # Lista workflows ativos
```

---

## 12. Próximos Passos para o Projeto

A arquitetura v4.0 está definida. Ordem de implementação sugerida:

| Prioridade | Item | Agente | Status |
|---|---|---|---|
| 🔴 Alta | Criar `SOUL.md` e `AGENTS.md` de ambos os agentes | Secretário + Gestor | Pendente |
| 🔴 Alta | Criar `HEARTBEAT.md` com checklists corretos | Secretário + Gestor | Pendente |
| 🔴 Alta | Criar `MEMORY.md` com dados iniciais | Secretário + Gestor | Pendente |
| 🟡 Média | Criar `TOOLS.md` com convenções CLI | Secretário + Gestor | Pendente |
| 🟡 Média | Implementar Workflow Lobster `secretario-captura.yaml` | Secretário | Pendente |
| 🟡 Média | Implementar Workflow Lobster `gestor-weekly-review.yaml` | Gestor | Pendente |
| 🟢 Baixa | Configurar MCP para TickTick e Linear (via Skills) | Ambos | Pendente |
| 🟢 Baixa | Testar spawn_subagent em ambiente de desenvolvimento | Ambos | Pendente |

> **Regra de ouro implementada:** Matheus interage apenas com `secretario` e `gestor-projetos`. Todo trabalho especializado é delegado internamente via `spawn_subagent`.
