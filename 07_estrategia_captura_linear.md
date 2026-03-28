# Estratégia de Captura e Arquitetura do Gestor de Projetos (Linear ↔ Obsidian)

> **Versão:** 1.0 | **Agentes Envolvidos:** Secretário e Gestor de Projetos

Este documento detalha o ciclo de vida de uma intenção (ideia/tarefa) desde a sua captura bruta até se tornar um conjunto de *Issues* rastreáveis no Linear, e como o **Gestor de Projetos** orquestra essa sincronização bidirecional com o Obsidian.

---

## 1. A Filosofia da Captura e Execução

O sistema opera com uma clara separação de papéis cognitivos, evitando que um único agente fique sobrecarregado com contextos muito distintos.

1. **O Secretário (A Mente Receptiva):** Captura o caos (Telegram, áudios, TickTick), limpa, estrutura (Sensemaking) e deposita a "semente" no cofre (Obsidian) no formato PARA (`0_Inbox/` ou `1_Projects/`).
2. **O Gestor de Projetos (A Mente Executora):** Lê as "sementes" estruturadas (projetos) no Obsidian, planeja a execução (Decomposição), pede aprovação e constrói a realidade no Linear. Ele é o guardião do *burndown* e da saúde dos Sprints.

---

## 2. Estratégia de Captura e o Fluxo de Vida (Passo a Passo)

A jornada de uma tarefa complexa segue um fluxo rigoroso de passagens de bastão (*Handoffs*) e aprovações humanas (*HITL*).

### Fase 1: A Semente (Secretário)
* **Gatilho:** Matheus envia um áudio no Telegram: *"Tive uma ideia para o VOLTZ, precisamos refazer a API de autenticação para usar JWT, é urgente para o próximo mês."*
* **Ação do Secretário:**
  1. Usa a **Sensemaking Skill** para traduzir o áudio em um rascunho YAML (`type: project`, `context: @dev`, `tags: [api, jwt]`).
  2. Pede aprovação no Telegram: *"Posso salvar o escopo da Nova API JWT em 1_Projects/p_voltz_api_jwt.md?"*
  3. Com o "Sim" de Matheus, usa a **Obsidian Structuring Skill** para executar o `write_file` no Vault.
  4. **Handoff:** O Secretário envia uma notificação interna para o Gestor de Projetos: *"Nova nota de projeto criada: p_voltz_api_jwt.md"* (via `send_message`).

### Fase 2: O Despertar (Gestor de Projetos)
* **Gatilho:** Recebe a mensagem do Secretário ou detecta a nova nota durante sua varredura no `HEARTBEAT.md` (Cron).
* **Ação do Gestor:**
  1. Lê a nova nota (`read_file`) no Obsidian.
  2. Inicia o seu processo de *Chain-of-Thought* para planejamento.

### Fase 3: Decomposição Cognitiva (Planejamento)
O Gestor não cria tarefas cegamente. Ele quebra o escopo em partes atômicas.
* **Pensamento Interno (Gestor):**
  * *"A nota fala sobre 'API JWT para o VOLTZ'."*
  * *"O Projeto Linear alvo é o VOLTZ."*
  * *"Isso requer um Epic (Refatoração Auth JWT)."*
  * *"Quais as issues necessárias? 1. Atualizar Schema DB. 2. Criar middleware JWT. 3. Atualizar endpoints REST. 4. Testes."*
* **Output:** Um rascunho de decomposição estruturado em memória.

### Fase 4: O Ponto de Checagem (HITL do Gestor)
* **Ação:** O Gestor de Projetos envia uma mensagem para Matheus no Telegram:
  > 📊 **Planejamento Linear: Nova API JWT (VOLTZ)**
  > Decompus o projeto `p_voltz_api_jwt.md` na seguinte estrutura:
  > - **Epic:** Refatoração Auth JWT
  >   - Issue 1: Atualizar Schema DB (Prioridade: Alta)
  >   - Issue 2: Middleware JWT (Prioridade: Alta)
  >   - Issue 3: Refatorar Endpoints REST (Prioridade: Média)
  >   - Issue 4: Cobertura de Testes (Prioridade: Baixa)
  >
  > Posso criar esse Epic e as 4 Issues no Linear?

### Fase 5: Execução (A Força Bruta)
* **Gatilho:** Matheus responde "Sim".
* **Ação do Gestor:**
  1. Equipa a **Linear Worker Skill**.
  2. Executa comandos locais de CLI (`exec_command: linear-cli.js createEpic ...`).
  3. Registra os IDs retornados pelo Linear (ex: `VOLTZ-EP-10`, `VOLTZ-140`, `VOLTZ-141`).

### Fase 6: O Elo Bidirecional (Obsidian Sync Skill)
Para manter o sistema coeso e os dashboards do Obsidian funcionando, o Gestor de Projetos precisa fechar o ciclo.
* **Ação:**
  1. O Gestor equipa a **Obsidian Sync Skill**.
  2. Lê o arquivo original `1_Projects/p_voltz_api_jwt.md`.
  3. Atualiza o *Frontmatter* (cabeçalho YAML) para injetar as chaves de sincronia:
     ```yaml
     ---
     id: "p_voltz_api_jwt"
     type: "project"
     status: "active"
     linear_sync: "VOLTZ-EP-10"  # ← O ELO FOI CRIADO
     linear_team: "VOLTZ"
     progress: 0
     ---
     ```
  4. Executa o `write_file` para salvar a alteração.
  5. Avisa o Matheus: *"✅ Issues criadas no Linear e sincronizadas com sucesso na nota do Obsidian."*

---

## 3. Arquitetura do Agente Gestor de Projetos

O Gestor de Projetos será configurado na pasta `workspace/gestor-projetos/` com a seguinte topologia de arquivos:

### 3.1 Arquivos Core (`workspace/gestor-projetos/`)

*   **`SOUL.md`**: Define a identidade do agente ("Você é o Gestor de Projetos do Matheus"). Estabelece seus valores inegociáveis: proatividade, clareza cirúrgica, e a proibição absoluta de apagar projetos ou lotar o backlog sem aprovação (HITL).
*   **`AGENTS.md`**: O manual de operações. Ensina o agente *quando* evocar suas Skills. Explica a diferença entre receber um *Handoff* do Secretário e varrer projetos no *Heartbeat*.
*   **`HEARTBEAT.md`**: O cronograma de saúde. Disparado a cada X minutos/horas. Instruções para:
    *   Verificar se alguma *Issue* está parada há muitos dias (`Linear Worker Skill`).
    *   Verificar a saúde do Sprint ativo (`Linear Worker Skill`).
    *   Sincronizar o `% de progresso` do Linear para o frontmatter do Obsidian (`Obsidian Sync Skill`).
*   **`MEMORY.md`**: Armazena o mapeamento temporário de `linear_id` <-> `caminho_nota_obsidian` para acesso rápido sem precisar fazer `grep` no Obsidian inteiro a cada requisição.
*   **`TOOLS.md`**: Declara as ferramentas permitidas (`exec_command` para o CLI do Linear e `write_file`/`read_file` para o Obsidian).

### 3.2 Arquitetura de Skills (`workspace/gestor-projetos/skills/`)

O Gestor possuirá duas Skills principais:

#### 1. Linear Worker Skill (`01_linear_worker/SKILL.md`)
*   **Objetivo:** Interagir exclusivamente com a API do Linear (via CLI ou script local).
*   **Metadados:** Exigirá a variável de ambiente `$LINEAR_API_KEY`.
*   **Instruções de Prompt:**
    *   Como construir comandos para o `linear-cli.js`.
    *   Como consultar o status de um Epic.
    *   Como criar Issues em lote (retornando sempre os IDs gerados para a memória).

#### 2. Obsidian Sync Skill (`02_obsidian_sync/SKILL.md`)
*   **Objetivo:** Manter as propriedades YAML (*Frontmatter*) das notas `1_Projects/` atualizadas.
*   **Instruções de Prompt:**
    *   Sempre executar `read_file` antes de `write_file`.
    *   Regras estritas de formatação de YAML para não quebrar as visualizações do plugin Dataview.
    *   Atualizar o campo `progress` (0 a 100) baseado no cálculo de tarefas concluídas vs totais do Epic retornado pela *Linear Worker Skill*.

---

## 4. O Fluxo de Rotina e Revisões (Gestão Passiva)

Além de reagir a novas notas, o Gestor de Projetos tem vida própria (guiado pelo seu `HEARTBEAT.md`):

1.  **Monitoramento Diário:** Durante o dia, ele consulta o Linear para buscar *Issues* com status `In Progress` que não mudam há dias e envia alertas no Telegram: *"⚠️ A issue VOLTZ-141 (Middleware JWT) está parada há 4 dias. Precisamos revisar?"*
2.  **A Atualização de Progresso (Sync):** Periodicamente, ele lê o status dos Epics atrelados aos Projetos (`linear_sync`) e atualiza o campo `progress` nos arquivos `.md` correspondentes no Obsidian. Isso alimenta os Dashboards (Dataview) que Matheus consulta.
3.  **A Revisão Semanal:** Toda segunda-feira, ele compila um relatório profundo: Sprints encerrados, burndowns, gargalos. Ele mescla os dados do Linear com o que o Secretário limpou no Inbox do Obsidian, entregando uma "fotografia" perfeita do sistema.
