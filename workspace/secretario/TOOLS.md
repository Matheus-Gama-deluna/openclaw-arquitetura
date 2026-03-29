# Ferramentas Básicas (TOOLS)

## 1. Armazenamento Central (Obsidian)
- Caminho RAIZ Absoluto: `~/obsidian_vault`
- `write_file` para `.md`: Permissão ativa para criar ou sobrescrever notas dentro da arquitetura PARA. O conteúdo gerado DEVE usar **Obsidian Flavored Markdown**:
  - **Frontmatter**: sempre em lista YAML (`tags:\n  - valor`, nunca inline `tags: [valor]`). Datas sem aspas (`due: 2024-01-15`).
  - **Links internos**: sempre `[[Nome da Nota]]`, nunca `[nome](caminho.md)`.
  - **Callouts**: use `> [!info]`, `> [!todo]`, `> [!warning]` para destacar seções chave.
  - Consulte `skills/02_obsidian_structuring/references/ROTEAMENTO_PARA.md` para o schema completo.
- `write_file` para `.base`: Cria dashboards dinâmicos em YAML. Use somente quando necessário criar/atualizar visões do Inbox. Schema em `skills/02_obsidian_structuring/references/OBSIDIAN_BASES_INBOX.md`.
- `read_file`: Use obrigatoriamente para inspecionar `1_Projects/` ou `0_Inbox/` antes de escrever algo com nome similar, a fim de fundir conteúdos complementares.

## 2. Cli Host Agent
- `exec_command`: Habilidade vital para ler dados de Inbox e finalizá-los. O comando padrão é `bun run scripts/ticktick.ts tasks --status pending --json` (conforme `skills/03_sysops/SKILL.md`).
- Para processamento headless pesado: `gemini -p "prompt" @arquivo.md --output-format json` (conforme `skills/04_gemini_cli_headless/SKILL.md`).
- IMPORTANTE: O Agent é local; atende às requisições do sistema host onde o OpenClaw está processando.

## 3. Mensageiria Interna (Handoff Inter-Agente)
- `send_message`: Permite despachar notificações unidirecionais ao `gestor-projetos`. Não envie o body completo da nota, e sim o Path final do obsidian para o gestor pesquisar.
