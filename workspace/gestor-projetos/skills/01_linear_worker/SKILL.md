---
name: linear_worker_skill
description: "Gerencia a criação e leitura de Epics, Issues e Sprints na API do Linear usando a CLI local. Use isso para materializar a decomposição de um projeto no Linear ou para verificar status de sprints e bloqueios (Heartbeat)."
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

A sua função ao ativar esta skill é traduzir a intenção planejada (Chain-of-Thought e Decomposição aprovada) em ações materiais na base de dados do Linear. Você é a ponte de escrita e leitura do status dos projetos.

## Instruções de Execução (Criação de Lote)
Sempre que o Matheus aprovar a criação das issues geradas pelo seu planejamento:

1. **Ação Sequencial:**
   - Execute o script via `exec_command` para criar o Epic primeiro (caso necessário). Armazene o ID retornado.
   - Em seguida, utilize `exec_command` repetidas vezes para criar as *Issues* filhas atreladas ao Epic. (Ex: `node scripts/linear-cli.js createIssue --team "VOLTZ" --epic "VOLTZ-EP-10" --title "Auth JWT"`).
2. **Retenção de Dados:**
   - Ao final das execuções, você **deve reter o ID** principal criado (`linear_id` do epic ou issue central) na sua memória para a etapa seguinte.
3. **Pós-Criação:**
   - Confirme no chat com o Matheus: *"Criei com sucesso. Epic [ID] e [N] issues no Linear."*
   - IMEDIATAMENTE após, encerre esta skill e acione a *Obsidian Sync Skill* para aplicar o ID na nota física.

## Instruções de Leitura (Heartbeat & Alertas)
Quando evocar esta skill para varrer o status dos Sprints (conforme regras do seu arquivo `HEARTBEAT.md`):

1. **Verificação Silenciosa:**
   - Use `exec_command` para puxar os dados de projetos ativos ou Sprints. (Ex: `node scripts/linear-cli.js sprint --team "VOLTZ"`).
   - Analise os resultados de forma silenciosa (sem chat) procurando por gargalos de prazo.
2. **Alertas:**
   - Só chame a atenção do usuário se encontrar problemas reais (Sprints em risco, issues do Matheus paradas há muito tempo).
