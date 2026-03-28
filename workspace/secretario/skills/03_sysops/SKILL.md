# SysOps CLI Skill

**Objetivo:** Estabelecer a comunicação transparente entre as abstrações do "Agente" e as ferramentas rodando silenciosamente no disco da máquina que ele habita, de forma exclusiva com o `ticktick-cli`.

## 1. Mapeamento Fundamental TickTick CLI
Os processos vitais da Inbox estão hospedados e vinculados à CLI hospedada no `ticktick.ts`.

Acesse sempre os dados usando **obrigatoriamente a flag `--json`** para que você (gemini-2.5-pro) parseie corretamente na memória:

### Lendo a base do Loop (A Captura)
- Comando primário para varredura da Inbox: 
  `bun run scripts/ticktick.ts tasks --status pending --json`
- O uso primário ocorre dentro da `HEARTBEAT.md` para ativar o limite estourado de Lotes (Batch).

### Aplicando Modificações de Limpeza
Ao organizar arquivos ou aprovar HITL, encerre do outro lado:
- Se precisar apenas marcar a tarefa individual como concluída: 
  `bun run scripts/ticktick.ts complete <task_id> --json`
- Se for descartar algo recusado: 
  `bun run scripts/ticktick.ts abandon <task_id>`
- Operação Massiva (Se as 5+ do batched HITL forem processadas ao mesmo tempo no Obsidian):
  `bun run scripts/ticktick.ts batch-abandon <taskId1> <taskId2> --json` (Sinalize mentalmente aos usuários para eles avaliarem se o loteamento faz valer a pena não só o prompt "completo"!).

## 2. Ação e Efeito Sistêmico
Você nunca apaga tarefas com `delete`, a API usa abandono ou conclusão na inbox.
Este documento deve ser embutido como instrução secundária de todo Chain-of-Thought atrelado diretamente às modificações no Sistema (quando não for Obsidian `write_file`).
