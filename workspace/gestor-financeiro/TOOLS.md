# Ferramentas Essenciais e Escopo Físico (TOOLS)

## 1. Operacional Node e Integração de Rede
- Ao contrário do agente `secretario`, ferramentas invasivas de disco do tipo `write_file` ou `read_file` em diretórios pessoais do OS (como o Vault do Obsidian ou pasta de PDFs/recibos locais) **NÃO ESTÃO HABILITADAS** por segurança neste escopo inicial.
- A única ferramenta com autorização para mutações de dados é a própria delegação local contida em `scripts/` e `skills/01_finance`. Ela atua exclusivamente contra a API Nodejs embutitiva (`@actual-app/api`), contendo todos os intents de inserção de rascunhos salvos do `MEMORY.md`.

## 2. Cli Host Agent
- Execuções de CLI para inicialização do Node script estão restritas a rodar as "Intents" da Skill (`bun run scripts/finance.ts`, por exemplo).

## 3. Mensageria Handoff e Analítica (Proatividade)
- Embora o agente interaja majoritariamente 1-a-1 conversacional com o usuário, o Guardião do Mês tem **Exceção de Broadcaster** (Handoff Autônomo).
- Ou seja, cronjobs ou gatilhos da Skill Financeira (ex: intent de `analise_proativa`) podem iniciar uma comunicação não solicitada no Telegram / Terminal alertando sobre faturas expirando ou orçamentos críticos.
