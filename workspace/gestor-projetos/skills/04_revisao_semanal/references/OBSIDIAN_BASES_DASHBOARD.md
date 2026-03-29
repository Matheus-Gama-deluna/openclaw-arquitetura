# Obsidian Bases — Dashboard Dinâmico de Projetos

Este arquivo define como criar e manter o **dashboard vivo** do Gestor de Projetos usando arquivos `.base` do Obsidian.

> **Quando usar**: Em vez de escrever manualmente o `dashboard_projetos.md`, crie um `.base` que filtro e agrupe automaticamente todas as tarefas do Vault. O dashboard `.base` dispensa varredura manual — ele sempre reflete o estado atual.

---

## Base Principal: `30-Controle/dashboard_projetos.base`

Crie este arquivo no Vault para ter uma visão viva de todas as tarefas ativas:

```yaml
filters:
  and:
    - file.inFolder("Projetos")
    - 'tipo_registro == "tarefa"'
    - 'status != "concluida"'
    - 'status != "cancelada"'

formulas:
  dias_desde_criacao: '(today() - date(datas.criado_em)).days'
  esta_vencida: 'if(datas.vencimento_em, date(datas.vencimento_em) < today() && status != "concluida", false)'
  dias_ate_vencimento: 'if(datas.vencimento_em, (date(datas.vencimento_em) - today()).days, "")'
  wip_icon: 'if(status == "ativa", "🟡", if(status == "proxima_acao", "🟢", if(status == "bloqueada", "🔴", if(status == "aguardando", "⏳", "⚪"))))'

properties:
  status:
    displayName: "Status"
  projeto:
    displayName: "Projeto"
  energia:
    displayName: "Energia"
  prioridade:
    displayName: "Prioridade"
  formula.wip_icon:
    displayName: ""
  formula.dias_ate_vencimento:
    displayName: "Dias p/ Vencer"
  formula.esta_vencida:
    displayName: "Vencida?"
  formula.dias_desde_criacao:
    displayName: "Dias desde Criação"
  sincronizacao.status_sync:
    displayName: "Linear Sync"

views:
  - type: table
    name: "🟡 Ativas e Próximas Ações"
    filters:
      or:
        - 'status == "ativa"'
        - 'status == "proxima_acao"'
    order:
      - formula.wip_icon
      - file.name
      - projeto
      - status
      - prioridade
      - energia
      - formula.dias_ate_vencimento
      - sincronizacao.status_sync
    groupBy:
      property: projeto
      direction: ASC

  - type: table
    name: "🔴 Bloqueadas e Aguardando"
    filters:
      or:
        - 'status == "bloqueada"'
        - 'status == "aguardando"'
    order:
      - formula.wip_icon
      - file.name
      - projeto
      - status
      - formula.dias_desde_criacao
    summaries:
      formula.dias_desde_criacao: Average

  - type: table
    name: "⚠️ Vencidas"
    filters:
      and:
        - 'formula.esta_vencida == true'
    order:
      - file.name
      - projeto
      - status
      - datas.vencimento_em
      - formula.dias_ate_vencimento

  - type: table
    name: "📋 Backlog (Algum Dia)"
    filters:
      and:
        - 'status == "algum_dia"'
    order:
      - file.name
      - projeto
      - prioridade
```

---

## Base de WIP por Projeto: `30-Controle/wip_projetos.base`

Para monitorar rapidamente quantas tarefas ativas cada projeto tem:

```yaml
filters:
  and:
    - file.inFolder("Projetos")
    - 'tipo_registro == "tarefa"'
    - 'status == "ativa"'

views:
  - type: table
    name: "WIP por Projeto"
    order:
      - projeto
      - file.name
    groupBy:
      property: projeto
      direction: ASC
    summaries:
      projeto: Filled
```

> **Interpretação**: Se o count por grupo > 5, o projeto tem WIP estourado.

---

## Base de Divergências Linear: `30-Controle/sync_status.base`

Para monitorar tarefas com sincronização pendente ou divergente:

```yaml
filters:
  and:
    - file.inFolder("Projetos")
    - 'tipo_registro == "tarefa"'
    - 'sincronizacao.status_sync != "sincronizado"'

views:
  - type: table
    name: "Pendentes de Sync"
    order:
      - file.name
      - projeto
      - sincronizacao.status_sync
      - status
    groupBy:
      property: sincronizacao.status_sync
      direction: ASC
```

---

## Como Criar/Atualizar um Arquivo `.base`

1. Use `write_file` para salvar o conteúdo YAML no caminho `30-Controle/nome.base`
2. O Obsidian carrega automaticamente — não precisa de configuração extra
3. Para embutir a base em outra nota: `![[dashboard_projetos.base]]`
4. Para embutir uma view específica: `![[dashboard_projetos.base#Ativas e Próximas Ações]]`

---

## Quando Usar `.base` vs Escrever o `dashboard_projetos.md`

| Situação | Use `.base` | Use `.md` escrito pelo agente |
|----------|------------|-------------------------------|
| Dashboard permanente e sempre atualizado | ✅ | — |
| Relatório narrativo com análise contextual | — | ✅ |
| Resumo semanal com comentários do agente | — | ✅ |
| Filtrar/agrupar tarefas por critério | ✅ | — |
| Registrar decisões e notas da revisão | — | ✅ |

> **Recomendação**: Use o `.base` como fonte de dados visual contínua. Use o `.md` narrativo para registrar a análise contextual da revisão semanal (o "porquê" dos problemas, não só o "o quê").
