# Guia Completo: Criação e Adaptação de Skills no OpenClaw

Este relatório funde as melhores práticas oficiais sobre a criação de Skills no ecossistema OpenClaw com orientações táticas projetadas especificamente para a nossa arquitetura de Agentes (como o **Secretary Agent** e o **Project Manager Agent**). 

---

## 1. O que são Skills no OpenClaw?

Skills são capacidades modulares que combinam instruções em linguagem natural (para o LLM) com metadados estruturados de configuração, execução e restrições de ambiente. Elas permitem que o agente encadeie ferramentas e processos locais com inteligência contextual. Baseiam-se na especificação **AgentSkills** e **Pi-compatible**.

O OpenClaw descobre, gerencia e injeta essas `skills` diretas no *System Prompt* do agente, formatando-as dinamicamente com base em filtros e no contexto da execução atual.

---

## 2. Visão Geral do Arquivo `SKILL.md`

Todo o ciclo de vida de uma Skill gira em torno de uma pasta contendo um arquivo chamado `SKILL.md`.

### A. Estrutura Padrão
O `SKILL.md` é dividido em duas partes: **Frontmatter** (Metadados em YAML) e **Corpo** (Instruções em Markdown).

```markdown
---
name: linear-manager
description: Gerencia issues e tickets no Linear.
metadata: {
  "openclaw": {
    "emoji": "📋",
    "requires": {
      "env": ["LINEAR_API_KEY"],
      "bins": ["curl", "jq"]
    },
    "primaryEnv": "LINEAR_API_KEY"
  }
}
disable-model-invocation: false
---

# Linear Manager Skill
Quando o usuário pedir para visualizar as issues abertas, utilize a ferramenta `exec` com o binário `curl` para enviar uma request à API do Linear usando a `$LINEAR_API_KEY`.
...
```

### B. Elementos do Frontmatter
Para nossos agentes, os seguintes campos são fundamentais:
- **`name`** e **`description`**: Definem o que a skill faz. Seja conciso, pois ambos consomem *tokens* e são lidos diretamente pelo modelo.
- **`user-invocable`** (true/false): Permite que a skill seja chamada via Slash Commands (ex: `/linear-manager`).
- **`disable-model-invocation`** (true/false): Oculta a skill do LLM na geração normal de resposta, deixando-a acessível apenas quando invocada manualmente (ajuda a economizar *tokens* para skills de nicho).

---

## 3. Gestão de Escopo e Hierarquia de Carregamento

Na nossa arquitetura com **Secretário** e **Project Manager**, precisamos aplicar o princípio de privilégio mínimo na exposição de skills. O OpenClaw carrega skills nas seguintes precedências (do menor para o maior contexto):

1. **Workspace Skills (`<workspace>/skills/...`)**: Skills locais. **Recomendado:** Crie skills específicas para cada agente. O Secretary Agent deve ter uma pasta própria para lidar com Obsidian e TickTick; o Project Manager para o Linear.
2. **Managed/Local Skills (`~/.openclaw/skills/...`)**: Skills compartilhadas globalmente via `ClawHub` ou local. Útil se precisarmos de uma skill compartilhada utilitária (ex: buscar no Google).
3. **Bundled Skills (`npm package / App`)**: Skills nativas.

---

## 4. Segurança, Gating e Injeção de Variáveis (Metadados)

O campo `"metadata": { "openclaw": { ... } }` serve para proteger o agente de tentar usar skills que quebrarão na sua máquina (ex: falta de APIs ou executáveis).

- **`requires.bins` e `requires.anyBins`**: A skill não será carregada no LLM se os binários (ex: `git`, `uv`, `node`) não estiverem no `PATH`.
- **`requires.env`**: Exige variáveis de ambiente, como `GEMINI_API_KEY` ou `LINEAR_API_KEY`.
- **`requires.config`**: Verifica o arquivo global `~/.openclaw/openclaw.json` (ex: `browser.enabled`).
- **Isolamento de Credenciais**: As chaves são expostas ao processo apenas durante o *turn* (turno de resposta) do agente, e logo removidas.
- **Isolamento (Sandboxing)**: O OpenClaw prioriza containers. Se a sua skill precisa de binários adicionais no ambiente do container docker, deve-se fornecê-los via `agentes.defaults.sandbox.docker.setupCommand`.

---

## 5. Melhores Práticas Gerais (Fundação)

* **Seja Conciso:** O texto em `SKILL.md` consome *tokens* no system prompt de cada requisição. O custo aproximado é de 195 caracteres base + metadados. Explique o "o quê" a IA deve fazer com a ferramenta, não fique ensinando conceitos abstratos de IA.
* **Segurança e HITL (Human in the Loop):** Trate entradas de usuários como não confiáveis. Se você criar uma skill baseada em `exec`, garanta regras estritas para evitar `Command Injection`. Instrua o agente no `SKILL.md` para "sempre confirmar antes de apagar arquivos" (especialmente crítico para o Obsidian).
* **Uso de Variáveis Relativas:** Use a flag `{baseDir}` no corpo do markdown da sua skill para chamar scripts em Python, Bash ou JS que estiverem guardados na mesma pasta do arquivo `SKILL.md`. Isso facilita modularizar e testar funções longas (ex: rodar `{baseDir}/parse_ticktick.py`).
* **Testes Modulares:** Antes de empacotar e disponibilizar uma skill nos fluxos do Orquestrador, teste unitariamente no CLI: `openclaw agent --message "use test-skill to do X"`.

---

## 6. Adaptação Estratégica para Nossos Agentes

Aqui entra a governança para o nosso sistema produtivo Pessoal/Profissional:

### **Secretary Agent (Obsidian / TickTick / Capture)**
* **Contexto de Múltiplos Arquivos:** O foco desse agente é gestão de conhecimento e rotinas. Suas Skills devem incluir `requires.bins`: `[python, jq]` para lidar com automações dos arquivos do TickTick ou Git no repositório do Obsidian.
* **Skill Recomendada - `obsidian-indexer`**:
  * Uma skill focada apenas em formatar links ou inserir blocos no final de páginas de log diário no formato correto do PARA.
* **Restrição (`disable-model-invocation: true`)**: Para sub-rotinas (como disparar alertas no Telegram do TickTick), restrinja as Skills para serem invocadas apenas via *Workflow Slash Commands* (ex: `/sync-ticktick`), impedindo que o modelo decida rodar isso a qualquer momento.

### **Project Manager Agent (Linear)**
* **Contexto de API e Integração Web:**
  * Depende fortemente do Linear e da manipulação de estados de projetos. As skills devem obrigatoriamente validar `"requires.env": ["LINEAR_API_KEY"]`.
  * **Skill Recomendada - `linear-bot`**: Ensiná-lo via instruções `{baseDir}/linear_request.sh` como consumir dados de status das sub-tasks e alinhar com o nosso framework local em `.md`.

### **SubAgents Dinâmicos**
* Tarefas pontuais delegadas (como pesquisar um assunto e extrair os dados). Essas tarefas não precisam enxergar as skills globais de "Project Manager". Garanta que o sub-agent gerado use caminhos restritos ao rodar na Sandbox ou ao menos reescreva/limite as environment keys disponíveis, preservando a segurança.

---

> **Dica Final:** Se desejar compartilhar ou referenciar ferramentas maiores e mais estruturadas, você pode disponibilizar scripts e sincronizá-los com o comando `clawhub sync --all` e `openclaw skills update --all` se for manter um repositório interno próprio. Para scripts confidenciais (nosso setup Obsidian), mantenha apenas como Skills Locais dentro das pastas `workspace/skills/` de cada agente.
