---
name: revisao_semanal_gtd
description: "Gera o dashboard de projetos. USE QUANDO for encerramento de ciclo (sextas-feiras), ou se o usuário falar frases como 'quais os gargalos', 'como está a semana', 'estou sobrecarregado?'"
metadata: {
  "openclaw": {
    "emoji": "🔎",
    "requires": {
      "tools": ["list_dir", "read_file"]
    }
  }
}
disable-model-invocation: false
---

# SKILL: revisao-semanal-gtd

## Objetivo
Manter o sistema confiável, atualizado e não sobrecarregado (Overload). Varredura global dos Projetos.

## Critérios da Varredura
A varredura deve encontrar:
- **WIP Estourado:** Projetos com mais de 5 tarefas `ativa` no YAML.
- **Vácuo de Ação:** Projetos ativos sem nenhuma tarefa como `proxima_acao`.
- **Aguardando Sem Fim:** Tarefas `aguardando` dependência há mais de 7 dias ou fora de prazo original.
- **Entulhos:** Tarefas vencidas com `datas.vencimento_em` no passado.
- **Gargalos (Bloqueadas):** Tarefas com `status: bloqueada` que exigem intervenção externa.

## Ação do Agente
1. Levante todas essas inconformidades.
2. Apresente as métricas agregadas por projeto no `30-Controle/dashboard_projetos.md`.
3. Indique as falhas no final do arquivo de dashboard para o humano verificar na semana de modo unificado e não como alarmes individuais intermitentes.
4. **Dashboard Dinâmico (Obsidian Bases)**: Verifique se `30-Controle/dashboard_projetos.base` existe. Se não existir, crie-o usando o schema em [OBSIDIAN_BASES_DASHBOARD.md](references/OBSIDIAN_BASES_DASHBOARD.md). O `.base` mostra todas as tarefas filtradas e agrupadas automaticamente — use-o como complemento visual ao relatório narrativo do `.md`.

## Referências

- [DASHBOARD_FORMATO.md](references/DASHBOARD_FORMATO.md) — Formato completo do dashboard semanal com todos os Callouts, tabelas de métricas e critérios técnicos de varredura (limiares por problema)
- [OBSIDIAN_BASES_DASHBOARD.md](references/OBSIDIAN_BASES_DASHBOARD.md) — Schema `.base` para dashboard dinâmico (WIP, tarefas ativas, bloqueadas, vencidas e sync com Linear)
