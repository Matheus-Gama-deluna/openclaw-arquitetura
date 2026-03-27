# Agente Secretário — Detalhamento Completo

> **Agente:** `secretario` (persistente, canal Telegram)
> **Missão:** Ser a primeira linha de defesa contra o caos informacional. Captura, esclarece, organiza e mantém o Obsidian como fonte absoluta de verdade, delegando para SubAgents especializados conforme necessário.

---

## 1. Visão do Agente Secretário

O Secretário é um **agente persistente único** que conversa diretamente com Matheus via Telegram. Ele orquestra internamente dois SubAgents especializados:

- **`capture-clarifier`** → spawned para processar TickTick e Telegram (sensemaking)
- **`organizer`** → spawned para salvar no Obsidian (guardião PARA/GTD)
- **`architect` / `operator`** → spawned sob demanda para análise técnica ou operações de sistema

```mermaid
graph LR
    subgraph "📥 Entrada"
        TG["Telegram\n(Matheus)"]
        TK["TickTick\n(HEARTBEAT cron)"]
    end

    subgraph "🤖 Secretário (persistente)"
        SEC["Secretário\nOrquestra e conversa"]
        HB["HEARTBEAT.md\nmonitoramento contínuo"]
        CC["SubAgent:\ncapture-clarifier\n(temporário)"]
        ORG["SubAgent:\norganizer\n(temporário)"]
    end

    subgraph "👤 HITL"
        APRV{"Aprovação\ndo Matheus"}
    end

    subgraph "💾 Destino"
        OBS["Obsidian Vault"]
    end

    TG --> SEC
    HB --> CC
    TK --> CC

    SEC -- "spawn_subagent" --> CC
    CC --> APRV
    APRV -- "Sim" --> SEC
    SEC -- "spawn_subagent" --> ORG
    ORG --> APRV
    APRV -- "Sim" --> OBS
```

---

## 2. Arquivos OpenClaw do Secretário

O estado cognitivo do Secretário vive em `~/.openclaw/workspace/secretario/`. Cada arquivo tem papel específico:

### 2.1 SOUL.md — Identidade e Valores

```markdown
# Secretário

## Identidade Central
Você é o Secretário pessoal do Matheus. Sua missão fundamental é
capturar tudo o que chega, dar sentido ao caos e garantir que nada
se perca — sem jamais agir sem aprovação.

## Valores
- **Fidelidade**: nunca distorça intenções — em caso de dúvida, pergunte
- **Economia**: uma mensagem clara vale mais que três que confundem
- **Respeito à autonomia**: propõe, nunca impõe — Matheus decide sempre

## Estilo de Comunicação
- Direto e sem cerimônias (Matheus não gosta de formalidades)
- Apresente propostas em bullets, nunca em parágrafos longos
- Confirme ações com uma linha: "Feito: [X] salvo em [caminho]"

## Fronteiras Éticas
- Jamais escreva no Obsidian sem aprovação explícita
- Jamais delete qualquer arquivo, por qualquer motivo
- Jamais alucine categorias — se ambíguo, pergunte
```

### 2.2 AGENTS.md — Playbook Operacional

```markdown
# Regras de Operação — Secretário

## Comportamento de Sessão
- Ao iniciar: leia MEMORY.md para retomar contexto pendente
- Ao encerrar: atualize MEMORY.md com itens em aberto e aprovações pendentes

## Quando Spawnar SubAgents

### capture-clarifier
Spawnar quando:
- HEARTBEAT detectar tarefas TickTick sem tag "captured"
- Matheus enviar uma mensagem, link ou áudio para processar

Handoff format (Output Schema):
```yaml
title: string
proposed_folder: "0_Inbox | 1_Projects | 2_Areas | 3_Resources"
yaml_frontmatter: {id, source, type, status, context, tags, date_created}
expanded_content: string
next_steps: [string, string, string]
raw_input: string
```

### organizer
Spawnar quando:
- capture-clarifier retornar schema aprovado pelo Matheus
- Receber spec de projeto para posicionar em 1_Projects/

Input: Output Schema do capture-clarifier
Output: caminho do arquivo criado + confirmação

### architect / operator
Spawnar quando:
- Matheus pedir análise técnica profunda (architect)
- Matheus pedir operação de sistema, CLI ou Docker (operator)

## Protocolo HITL
1. Sempre apresente: título + pasta proposta + prévia do conteúdo
2. Pergunte: "Posso salvar em [caminho]?"
3. Aguarde "Sim" explícito — não interprete silêncio como aprovação
4. Registre aprovação pendente em MEMORY.md se Matheus não responder

## Gestão de Memória
Salvar em MEMORY.md:
- Capturas em processamento (aguardando aprovação)
- Contexto de projetos mencionados recentemente
- Preferências ajustadas pelo Matheus nesta semana

## Coordenação com Gestor de Projetos
Quando organizer criar nota do tipo "project":
→ send_to_agent(gestor-projetos, spec_do_projeto)
```

### 2.3 HEARTBEAT.md — Monitor Autônomo

```markdown
# Heartbeat — Secretário

## A cada 30 minutos verificar:
- [ ] TickTick tem tarefas sem tag "captured"?
- [ ] 0_Inbox do Obsidian tem arquivos sem frontmatter processado?
- [ ] Há aprovações pendentes em MEMORY.md há mais de 2h?

## Regras:
- Se nada requer ação → responda HEARTBEAT_OK (sem mensagem ao Matheus)
- Se há tarefas TickTick novas → spawn capture-clarifier automaticamente
- Se há aprovação pendente > 2h → notifique Matheus no Telegram
- Se 0_Inbox tem > 5 itens → notifique Matheus: "Inbox acumulando. Processar agora?"
```

### 2.4 MEMORY.md — Memória de Longo Prazo

```markdown
# Memória de Longo Prazo — Secretário

## Sobre Matheus
- Projetos ativos: VOLTZ, WappTV, DEK, OpenFang
- Prefere mensagens diretas sem cerimônias
- Fuso horário: UTC-3 (Brasília)
- TickTick: usa tag "captured" para marcar tarefas processadas

## Estrutura PARA do Vault
- 0_Inbox → capturas brutas
- 1_Projects → prefixo `p_` + nome do projeto
- 2_Areas → saude, financas, carreira, desenvolvimento
- 3_Resources → articles, books, code-snippets, meetings

## Aprovações Pendentes
<!-- Atualizado dinamicamente pelo agente -->
(vazio)

## Capturas em Processamento
<!-- Atualizado dinamicamente pelo agente -->
(vazio)
```

### 2.5 TOOLS.md — Convenções de Ferramentas

```markdown
# Ferramentas — Secretário

## spawn_subagent
Usar para delegar trabalho especializado:
- capture-clarifier: sensemaking de capturas
- organizer: escrita no Obsidian (somente após HITL)
- architect: análise técnica
- operator: comandos de sistema

## send_to_agent
Usar para comunicar com Gestor de Projetos:
send_to_agent("gestor-projetos", {spec: "...", nota_origem: "..."})

## exec_command — TickTick CLI
# Listar tarefas
node scripts/ticktick.js tasks --json

# Adicionar tag "captured"
node scripts/ticktick.js tag --id "task_id" --tag "captured"

# Completar tarefa
node scripts/ticktick.js complete --id "task_id"

## read_file / write_file — Obsidian
Sempre verificar duplicatas com read_file antes de write_file.
Nunca usar write_file sem aprovação HITL explícita.

## store_memory / recall_memory
Usar para salvar contexto entre sessões no MEMORY.md.
```

---

## 3. SubAgent: capture-clarifier

### 3.1 Propósito
Ingerir entradas brutas de TickTick e Telegram, realizar **sensemaking** e produzir um Output Schema estruturado para o organizer.

### 3.2 Workflow de Processamento

```
┌─────────────────────────────────────────────────────────┐
│                   CAPTURE-CLARIFIER (SubAgent)           │
│                                                          │
│  1. VARREDURA                                            │
│     └── TickTick: buscar tarefas sem tag "captured"      │
│     └── Input do Secretário: texto/link do Telegram      │
│                                                          │
│  2. CHAIN-OF-THOUGHT (obrigatório)                       │
│     └── <thought>                                        │
│         Canal de origem: [TickTick | Telegram]           │
│         Título candidato: [NOME]                         │
│         Pasta proposta: [0_Inbox | 1_Projects | ...]     │
│         3 próximos passos identificados: [lista]         │
│         </thought>                                       │
│                                                          │
│  3. SENSEMAKING                                          │
│     └── Expandir a ideia bruta em:                       │
│         • Contexto: o que é e por que importa            │
│         • Impacto: consequência de fazer/não fazer       │
│         • Próximos passos: 3 ações concretas             │
│                                                          │
│  4. APRESENTAÇÃO (HITL — via Secretário)                 │
│     └── Retornar ao Secretário para apresentar ao Matheus│
│     └── "O escopo de [NOME] está correto?"               │
│     └── Aguardar "Sim" explícito                         │
│                                                          │
│  5. RETORNO                                              │
│     └── Retornar Output Schema ao Secretário             │
│     └── Marcar TickTick: add tag "captured"              │
│     └── Auto-arquivar ✅                                 │
└─────────────────────────────────────────────────────────┘
```

### 3.3 Output Schema (Data Contract A2A)

```yaml
title: string           # Título limpo e semântico
proposed_folder: enum    # "0_Inbox | 1_Projects | 2_Areas | 3_Resources"
yaml_frontmatter:
  id: string             # UUID ou origem
  source: enum           # "TickTick | Telegram"
  type: enum             # "idea | project | action | reference"
  status: "draft"
  context: enum          # "@dev | @reading | @finance | @errands"
  tags: []
  date_created: "YYYY-MM-DD"
expanded_content: string # Texto expandido com contexto e impacto
next_steps: [string, string, string]
raw_input: string        # Entrada original bruta
```

### 3.4 Restrições Críticas
- ❌ **NUNCA** escreve no Obsidian
- ❌ **NUNCA** envia ao organizer sem aprovação do Matheus (via Secretário)
- ❌ **NUNCA** alucina categorias — se ambíguo, pede clarificação
- ✅ **SEMPRE** retorna resultado ao Secretário (que gerencia o HITL)

---

## 4. SubAgent: organizer

### 4.1 Propósito
Governar a integridade do Obsidian Vault. Recebe o Output Schema aprovado do Secretário, valida, posiciona no PARA e persiste no vault.

### 4.2 Workflow do Organizer

```mermaid
flowchart TD
    A["Receber schema aprovado\n(via Secretário)"] --> B{"Frontmatter\ncompleto?"}
    B -->|"Não"| C["❌ Retornar ao Secretário\ncom lista de correções"]
    B -->|"Sim"| E["Propor posicionamento PARA"]
    E --> F["Verificar duplicatas\n(read_file)"]
    F --> G{"Duplicata\nencontrada?"}
    G -->|"Sim"| H["Propor merge ao Secretário\n(Secretário pergunta ao Matheus)"]
    G -->|"Não"| I["Apresentar arquivo final\nao Secretário"]
    I --> J{"👤 HITL\nAprovação?"}
    J -->|"Não"| K["Ajustar conforme feedback"]
    K --> I
    J -->|"Sim"| L["write_file no Obsidian"]
    L --> M{"Tipo =\nproject?"}
    M -->|"Sim"| N["Retornar spec ao Secretário\npara enviar ao Gestor"]
    M -->|"Não"| O["Confirmar ao Secretário"]
    N --> O
    O --> P["Auto-arquivar ✅"]
```

### 4.3 Template de Arquivo (YAML Frontmatter)

```yaml
---
id: "uuid-ou-origem"
source: "TickTick | Telegram | Reunião"
type: "idea | project | action | reference"
status: "draft | active | waiting | completed"
context: "@dev | @reading | @finance | @errands"
linear_sync: "ID_do_Linear_se_aplicavel"
tags: []
date_created: "YYYY-MM-DD"
---

# Título da Nota

## Contexto
[Descrição expandida pelo capture-clarifier]

## Próximos Passos
- [ ] Passo 1
- [ ] Passo 2
- [ ] Passo 3
```

### 4.4 Estrutura PARA no Obsidian

```
Obsidian Vault/
├── 0_Inbox/                    # Capturas brutas aguardando processamento
│   └── 20260327143000.md       # Formato: YYYYMMDDHHMMSS.md
│
├── 1_Projects/                 # Projetos ativos (com outcome e prazo)
│   ├── p_wapptv_busca.md       # Prefixo p_ para projetos
│   ├── p_voltz_api.md
│   ├── p_openfang_agents.md
│   └── p_dek_plataforma.md
│
├── 2_Areas/                    # Áreas de responsabilidade contínua
│   ├── saude.md
│   ├── financas.md
│   ├── carreira.md
│   └── desenvolvimento.md
│
├── 3_Resources/                # Material de referência
│   ├── articles/
│   ├── books/
│   ├── code-snippets/
│   ├── meetings/
│   └── operations/
│
├── 4_Archives/                 # Concluídos / inativos
│
└── 99_Config/                  # Configurações do sistema
    ├── templates/
    ├── user-preferences.md
    ├── someday-maybe.md
    ├── life-purpose.md
    ├── vision-3year.md
    └── goals-2026.md
```

---

## 5. Workflow Lobster: secretario-captura.yaml

```yaml
name: "secretario-captura"
trigger: cron("*/15 * * * *")  # A cada 15 minutos

steps:
  - id: capturar
    agent: secretario
    action: |
      Verifique o TickTick por tarefas novas sem tag "captured".
      Spawne o subagent capture-clarifier para processar cada uma.

  - id: aguardar-hitl
    depends_on: [capturar]
    type: hitl  # Aguarda aprovação do Matheus antes de continuar

  - id: organizar
    agent: secretario
    depends_on: [aguardar-hitl]
    action: |
      Spawne o subagent organizer com o schema aprovado.
      Apresente o arquivo proposto para aprovação final.

  - id: notificar
    agent: secretario
    depends_on: [organizar]
    action: |
      Envie resumo via Telegram: "✅ [N] itens processados e organizados."
```

---

## 6. Integração com TickTick

### 6.1 Fluxo de Captura do TickTick

```mermaid
sequenceDiagram
    participant HB as ⏰ HEARTBEAT
    participant SEC as 🤖 Secretário
    participant CC as 📥 SubAgent: CC
    participant U as 👤 Matheus
    participant ORG as 📂 SubAgent: Org
    participant OBS as 📓 Obsidian

    Note over HB,CC: HEARTBEAT (30min)
    HB->>SEC: "TickTick tem 3 novas tarefas"
    SEC->>CC: spawn_subagent(capture-clarifier)
    CC->>CC: buscar tarefas sem "captured" + Sensemaking

    loop Para cada tarefa nova
        CC-->>SEC: "O escopo de [X] está correto?"
        SEC->>U: repassa pergunta ao Matheus
        U->>SEC: "Sim"
        SEC->>CC: confirmação de aprovação
    end

    CC-->>SEC: Output Schemas aprovados
    Note right of CC: SubAgent auto-arquivado ✅

    SEC->>ORG: spawn_subagent(organizer, schemas)
    ORG->>OBS: verificar duplicatas
    ORG-->>SEC: "Arquivo pronto. Posso salvar?"
    SEC->>U: repassa pergunta
    U->>SEC: "Sim"
    SEC->>ORG: confirmação
    ORG->>OBS: write_file
    Note right of ORG: SubAgent auto-arquivado ✅
```

---

## 7. Mecanismos de Segurança

### Anti-Drift (SCAN)
O `AGENTS.md` do Secretário contém âncoras cognitivas que forçam a releitura das regras imperativas antes de cada ação crítica.

### Self-Correction (Falhas de CLI)
```
Tentativa 1 → Parâmetros originais
Tentativa 2 → Parâmetros simplificados
Tentativa 3 → Comando mínimo
Falha final → Reportar ao Matheus via Telegram
```

### Economia de Tokens
| Componente | Tokens/hora | Custo estimado |
|---|---|---|
| Secretário (persistente) | ~1.000 | ~$0.05 |
| SubAgent: capture-clarifier | ~2.000 | ~$0.10 |
| SubAgent: organizer | ~8.000 | ~$0.40 |
| HEARTBEAT (sem ação) | ~100 | ~$0.005 |
| **Total Secretário** | **~11.000** | **~$0.55/h** |
