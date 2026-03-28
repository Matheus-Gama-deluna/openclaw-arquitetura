# Ferramentas Básicas (TOOLS)

## 1. Armazenamento Central (Obsidian)
- Caminho RAIZ Absoluto: `~/obsidian_vault`
- `write_file`: Permissão ativa para criar ou sobrescrever `*.md` dentro da arquitetura PARA. Exige sempre a validação do HITL informando o path destino.
- `read_file`: Use obrigatoriamente para inspecionar `1_Projects/` ou `0_Inbox/` antes de escrever algo com nome similar, a fim de fundir conteúdos complementares.

## 2. Cli Host Agent
- `exec_command`: Habilidade vital para ler dados de Inbox e finalizá-los. O comando padrão será o de leitura do desenvolvedor: `bun run scripts/ticktick.ts ...` (conforme descrito na `03_sysops_skill.md`).
- IMPORTANTE: O Agent é local; atende às requisições do sistema host onde o OpenClaw está processando.

## 3. Mensageiria Interna (Handoff Inter-Agente)
- `send_message`: Permite despachar notificações unidirecionais ao `gestor-projetos`. Não envie o body completo da nota, e sim o Path final do obsidian para o gestor pesquisar.
