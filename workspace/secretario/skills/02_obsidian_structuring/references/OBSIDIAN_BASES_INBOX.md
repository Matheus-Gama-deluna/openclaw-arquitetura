# Obsidian Bases — Inbox Dinâmico do Secretário

Este arquivo define como criar e manter a **visão viva do Inbox** usando arquivos `.base` do Obsidian.

> **Quando usar**: Após salvar notas no Vault via `write_file`, garanta que o arquivo `0_Inbox/inbox.base` existe e está atual. Ele mostra automaticamente tudo que está pendente de processamento — sem precisar varrer manualmente a pasta.

---

## Base do Inbox: `0_Inbox/inbox.base`

Crie este arquivo para ter uma visão permanente de tudo que entrou mas ainda não foi promovido a projeto ou área:

```yaml
filters:
  and:
    - file.inFolder("0_Inbox")
    - 'status == "draft"'

formulas:
  dias_no_inbox: '(today() - date(created)).days'
  precisa_atencao: 'if(created, (today() - date(created)).days > 3, false)'
  origem_icon: 'if(source == "telegram", "📱", if(source == "audio_transcricao", "🎙️", if(source == "email", "📧", "💬")))'

properties:
  type:
    displayName: "Tipo"
  source:
    displayName: "Origem"
  status:
    displayName: "Status"
  formula.origem_icon:
    displayName: ""
  formula.dias_no_inbox:
    displayName: "Dias no Inbox"
  formula.precisa_atencao:
    displayName: "Atenção?"

views:
  - type: table
    name: "📥 Todos no Inbox"
    order:
      - formula.origem_icon
      - file.name
      - type
      - source
      - formula.dias_no_inbox
      - formula.precisa_atencao
    groupBy:
      property: type
      direction: ASC
    summaries:
      formula.dias_no_inbox: Average

  - type: cards
    name: "🃏 Galeria do Inbox"
    order:
      - formula.origem_icon
      - file.name
      - type
      - source
      - formula.dias_no_inbox

  - type: table
    name: "⚠️ Parados (+3 dias)"
    filters:
      and:
        - 'formula.precisa_atencao == true'
    order:
      - file.name
      - type
      - source
      - formula.dias_no_inbox
```

---

## Base de Itens por Área: `0_Inbox/por_contexto.base`

Para o Secretário filtrar rapidamente o que é de cada área antes de rotear:

```yaml
filters:
  and:
    - file.inFolder("0_Inbox")

formulas:
  origem_icon: 'if(source == "telegram", "📱", if(source == "audio_transcricao", "🎙️", "💬"))'

views:
  - type: table
    name: "Por Tipo"
    order:
      - formula.origem_icon
      - file.name
      - type
      - status
      - tags
    groupBy:
      property: type
      direction: ASC

  - type: table
    name: "Por Origem"
    order:
      - formula.origem_icon
      - file.name
      - type
      - status
    groupBy:
      property: source
      direction: ASC
```

---

## Quando Criar/Recriar a Base

A base deve ser criada **uma vez** e depois persiste se atualizando automaticamente. O agente só precisa intervir se:

1. A base não existir ainda → criar com `write_file`
2. A estrutura do Frontmatter mudar → atualizar os campos em `order`
3. O usuário pedir uma nova view ou filtro

```
Caminho canônico: {vault_root}/0_Inbox/inbox.base
```

---

## Como Embutir na Nota de Boas-Vindas ou Overview

Se existir uma nota `0_Inbox/README.md` ou `00-visao-geral.md`, embutir a base lá:

```markdown
## Inbox Atual

![[inbox.base#Todos no Inbox]]

## Itens Parados

![[inbox.base#Parados (+3 dias)]]
```

---

## Limitações Importantes

- O `.base` **não cria nem move arquivos** — ele só lê e filtra os existentes
- O agente ainda precisa usar `write_file` para salvar notas novas no Inbox
- Notas sem o campo `created` no frontmatter não vão aparecer na fórmula `dias_no_inbox`
- O campo `tags` é uma lista — o `.base` consegue exibir mas não filtrar por tag individual facilmente; use `file.hasTag("nome")` nos filtros
