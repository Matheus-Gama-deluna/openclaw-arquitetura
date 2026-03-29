---
name: processamento_tarefas_obsidian
description: "Processa intenções em tarefas GTD limpas. USE QUANDO o usuário jogar arquivos vagos em `1_Projects` ou pedir 'organize minhas tasks'. NÃO USE para tarefas que já possuem schema longo preenchido; nesse caso, use apenas o obsidian_sync."
metadata: {
  "openclaw": {
    "emoji": "🧩",
    "requires": {
      "tools": []
    }
  }
}
disable-model-invocation: false
---

# SKILL: processamento-tarefas-obsidian

## Objetivo Central
Ler as notas brutas (ex: criadas pelo Secretário) e sugerir melhorias de escopo, dependências, contexto (GTD) ou decomposição de subtarefas, convertendo o item amorfo em "próxima ação".

## Regra Áurea
Você NÃO salva essas propostas no arquivo fonte! Você deposita a proposta no `30-Controle/fila_aprovacoes.md`. Somente após autorização do humano, você acionará o `obsidian_sync` com as modificações finais.

## Heurísticas de Processamento (GTD)
1. Categorizar entre `tarefa` (acionável), `referencia` ou `nota`.
2. Se o título estiver vago, proponha a reescrita (Verbo Forte + Objeto + Contexto Opcional, ex: "Definir schema do banco").
3. Determine Contextos:
   - `dispositivos`: computador, celular.
   - `ferramentas`: obsidian, github, vscode.
   - `modo_trabalho`: foco, reuniao.
4. Escopo do Projeto: Identifique onde a tarefa se encaixa (veja o diretório). Se extrapolar o limite ideal de 5 tarefas ativas, sugira colocar em `status: algum_dia` ou `status: aguardando`.
5. Proponha uma "Energia" à tarefa: leve, media, foco, profunda.

## Ação da Skill
Transforme essa intuição em um JSON / Patch de modificações a ser registrado em `fila_aprovacoes.md`.
