# Plano de Implementação: Agente Secretário (Arquitetura Monolítica)

Este documento detalha o plano de criação dos arquivos vitais e das Skills operacionais do Agente Secretário, consolidando as respostas do questionário para formar um agente resiliente, econômico e integrado.

## Arquivos e Diretórios Alvo

A estrutura final no diretório `workspace/secretario/` será:
- `SOUL.md` (Personalidade e Fronteiras)
- `AGENTS.md` (Regras de Operação e Handoff)
- `HEARTBEAT.md` (Monitor Autônomo para Economia de Tokens)
- `TOOLS.md` (Mapeamento de Ferramentas)
- `MEMORY.md` (Gestor de Estado para HITL Expirado)
- `skills/02_obsidian_structuring_skill.md` (Lógica de Salvamento Flexível)
- `skills/03_sysops_skill.md` (Integração CLI / TickTick - Estrutura Base)

---

## Detalhamento das Configurações (Proposed Changes)

### 1. Configurações Centrais do Agente (`workspace/secretario/`)

#### [NEW] [SOUL.md](file:///c:/Users/gamam/OneDrive/Documentos/1-%20TramposTec/openclaw-arquitetura/openclaw-arquitetura/workspace/secretario/SOUL.md)
* **Identidade (Tom de Voz):** Será configurado para ser absurdamente **curto e direto**, expandindo texto **apenas** quando uma explicação de lógica complexa for estritamente necessária.
* **Fronteiras:** Regras estritas de *Human-in-the-Loop* (HITL). Se o usuário não responder na sessão atual, os dados devem transpor-se obrigatoriamente para a memória de longo prazo (arquivo temporário/STATE).
* **Eficiência:** Prioridade zero ao desperdício de tokens.

#### [NEW] [AGENTS.md](file:///c:/Users/gamam/OneDrive/Documentos/1-%20TramposTec/openclaw-arquitetura/openclaw-arquitetura/workspace/secretario/AGENTS.md)
* **Playbook Operacional:** Como engajar a "Sensemaking Skill" em lotes combinados de respostas.
* **Resiliência (Timeout HITL):** Instrução de salvar um JSON de `draft` dentro do `MEMORY.md` sempre que o chat com o usuário ficar ocioso durante o "Posso salvar?".
* **Integração (Handoffs):** Definição de que o repasse de informações para o **Gestor de Projetos** é um evento passivo (`notify_only`). O Secretário apenas usa `send_message` avisando que um arquivo P_ ou Action foi modificado no Obsidian `~/obsidian_vault` sem envolver envio de dados completos.

#### [NEW] [HEARTBEAT.md](file:///c:/Users/gamam/OneDrive/Documentos/1-%20TramposTec/openclaw-arquitetura/openclaw-arquitetura/workspace/secretario/HEARTBEAT.md)
* **Gatilho Otimizado (Economia):** O heartbeat ocorrerá, baseando-se nas regras de 5 tarefas ou 3 horas de prazo.
* **Lógica anti-vazamento de tokens:** Passo 1: O agente verifica o volume do Inbox por CLI; Passo 2: Se tem 0 itens, interrompe *instantaneamente* seu chain-of-thought retornando sucesso nulo. Se tem entre 1-4, checa a temporalidade (espera bater 5 itens ou teto de 3h); Passo 3: Havendo condição verdadeira de extração, compila tudo.

#### [NEW] [TOOLS.md](file:///c:/Users/gamam/OneDrive/Documentos/1-%20TramposTec/openclaw-arquitetura/openclaw-arquitetura/workspace/secretario/TOOLS.md)
* Registro explícito do caminho absoluto do sistema de arquivos para escritas: `~/obsidian_vault`.
* Parâmetros e limites das permissões de ferramentas (`write_file`, `read_file`, `exec_command`, `send_message`).

#### [NEW] [MEMORY.md](file:///c:/Users/gamam/OneDrive/Documentos/1-%20TramposTec/openclaw-arquitetura/openclaw-arquitetura/workspace/secretario/MEMORY.md)
* Template e regras estruturais. Atuará como um dicionário/lista de chaves dos rascunhos *(Draft Specs)* que ainda não receberam a avaliação fina de HITL pelo usuário, prevenindo que encerramentos abruptos de contexto matem as tarefas capturadas.

---

### 2. Modulos de Habilidades (`workspace/secretario/skills/`)

#### [MODIFY] [01_sensemaking_skill.md](file:///c:/Users/gamam/OneDrive/Documentos/1-%20TramposTec/openclaw-arquitetura/openclaw-arquitetura/workspace/secretario/skills/01_sensemaking_skill.md)
* Ajuste no Passo 4 (HITL) para acomodar a orientação de consolidação em lotes e de falha segura usando MEMORY quando houver timeout da resposta do usuário.

#### [NEW] [02_obsidian_structuring_skill.md](file:///c:/Users/gamam/OneDrive/Documentos/1-%20TramposTec/openclaw-arquitetura/openclaw-arquitetura/workspace/secretario/skills/02_obsidian_structuring_skill.md)
* **Organização Flexível:** A instrução dará capacidade orgânica ao agente para analisar a raiz `~/obsidian_vault`, criar pastas quando for taxonomicamente relevante, e criar tags transversais coerentes.
* **Merge Criativo de Arquivos Relacionados:** A skill prescreverá que, em caso de complementariedade de dados, a informação gerada formará vínculos bidirecionais (`[[links_markdown]]`) e tags entre si, evitando deleção de contexto isolado, ou sendo consolidados horizontalmente em um arquivo pai se pertencerem estritamente ao mesmo escopo atômico.

#### [NEW] [03_sysops_skill.md](file:///c:/Users/gamam/OneDrive/Documentos/1-%20TramposTec/openclaw-arquitetura/openclaw-arquitetura/workspace/secretario/skills/03_sysops_skill.md)
* Skill encarregada da integração direta com o ambiente local via CLI (`exec_command`).
* **Integração TickTick (`ticktick-cli`):** Como o usuário forneceu a documentação do `ticktick.ts`, a skill padronizará a CLI utilizando `bun run scripts/ticktick.ts tasks --status pending --json` para puxar os dados brutos e `bun run scripts/ticktick.ts complete <id>` ou comandos de manipulação precisos para lidar com os processamentos concluídos do Inbox.

---

> [!NOTE]
> A implementação destas regras de HITL, isolamento através das Skills em "Chain-of-Thoughts temporários" e foco em economia de processamento alinham-se totalmente ao paradigma de agentes monolíticos mais complexos propostos para o OpenClaw 4.1.

## Aprovação e Feedback do Usuário (Resolvido)

- **Método PARA mantido:** O agente deve, obrigatoriamente, respeitar as raízes `0_Inbox`, `1_Projects`, `2_Areas`, `3_Resources` e `4_Archives` ao inferir caminhos propostos, podendo criar subpastas e tags sob elas.
- **TickTick CLI Compreendido:** Acesso e mapeamento da CLI (`bun run scripts/ticktick.ts`) entendidos e prontos para codificação.

## Verification Plan

1. Analisaremos estaticamente toda a base gerada na pasta do OpenClaw revisando links de contexto e aderência de parâmetros de segurança.
2. Confirmaremos que a instrução de suspensão na memoria (`MEMORY.md`) está bem compreendida e exposta nos metaprompts corretos.
