---
name: linear_worker_skill
description: "Gerencia API do Linear. USE QUANDO precisar aprovar, baixar tarefas ou empurrar dados validados do Obsidian (YAML_sync). NÃO USE se as tarefas não estiverem aprovadas na fila_aprovacoes.md ou sem ordem direta. NÃO USE para operações matemáticas ou rotinas puras fora do Linear."
metadata: {
  "openclaw": {
    "emoji": "⚙️",
    "requires": {
      "env": ["LINEAR_API_KEY"],
      "tools": ["exec_command"]
    }
  }
}
disable-model-invocation: false
---

# Linear Worker Skill

A sua função ao ativar esta skill é materializar intenções e atividades do Obsidian para o banco de dados do Linear e vice-versa, sendo que **o Obsidian (YAML) é a fonte absoluta de verdade.**

## Regras de Sincronização (Criação ou Atualização)
1. **Verificação de Aprovação:**
   - Nunca crie ou altere uma issue se a propriedade `aprovacao.status` da nota original não for igual a `aprovada`.
2. **Leitura/Mapeamento GTD para Linear:**
   - `titulo` -> title
   - `projeto` -> team/project no Linear
   - `status` -> status do Linear (ex: `ativa` = In Progress, `proxima_acao` = Ready, `bloqueada` / `aguardando` = Blocked)
3. **Se a issue já existir (`linear_id` preenchido):**
   - Execute o script `node scripts/linear-cli.js updateIssue` para refletir campos que tenham mudado.
4. **Após Criação/Alteração:**
   - Recupere o `linear_id` final e, IMEDIATAMENTE após, acione a skill `obsidian_sync` para atualizar o ID e o `status_sync: "sincronizado"` na nota original.

## Instruções de Leitura (Heartbeat & Alertas)
Quando evocar esta skill para varrer o status (conforme `HEARTBEAT.md`):
- Puxe os projetos ativos.
- Compare com as informações da sua `MEMORY.md`.
- Se encontrar issues estagnadas que estão "In Progress" no Linear mas que deveriam estar bloqueadas ou esperando revisão, leve isso à Revisão Semanal.

## TRATAMENTO DE ERRO (Gatilho de Fallback)
- Se o script `linear-cli.js` quebrar, falhar por timeout ou credencial inválida, **não entre em loop de tentativa erro**. Pare a execução da ferramenta.
- Escreva o log / sumário do erro no arquivo `30-Controle/divergencias-linear.md` para revisão pelo humano.

## Referências

- [MAPEAMENTO_LINEAR.md](references/MAPEAMENTO_LINEAR.md) — Tabela completa de campos Obsidian ↔ Linear, conversão de status GTD e exemplos de comandos do `linear-cli.js`
- [EXEMPLOS_AUDITORIA.md](references/EXEMPLOS_AUDITORIA.md) — Formato do arquivo de divergências e padrão de entradas no campo `auditoria_local`
