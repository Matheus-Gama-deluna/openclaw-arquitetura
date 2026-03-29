# Referência de Callouts — Uso GTD no Sensemaking

Este arquivo mapeia qual tipo de Callout do Obsidian deve ser usado para cada situação dentro do sistema GTD do Secretário.

## Callouts Padrão por Situação

### Ao Resumir uma Entrada (Draft em Memória)

Use `> [!abstract]` para o **resumo da intenção capturada**:

```markdown
> [!abstract] Resumo da Captura
> O usuário quer criar uma landing page para o produto X. Prioridade alta, sem deadline definido.
```

### Para Ações Concretas

Use `> [!todo]` para destacar **próximas ações GTD**:

```markdown
> [!todo] Próxima Ação
> Ligar para o cliente Marcos até sexta-feira para confirmar reunião.
```

### Para Alertas e Deadlines Críticos

Use `> [!warning]` para **prazos urgentes ou bloqueios**:

```markdown
> [!warning] Deadline Crítico
> Vence em 2 dias. Precisa de aprovação do Matheus antes de avançar.
```

### Para Contexto e Informações de Suporte

Use `> [!info]` para **contexto introdutório** de qualquer nota:

```markdown
> [!info] Contexto
> Esta nota foi capturada via Telegram em 15/01/2024. Fonte: mensagem de voz.
```

### Para Insights e Ideias

Use `> [!tip]` para **insights capturados em ideias soltas**:

```markdown
> [!tip] Insight
> Possível feature para o app: integração com Google Calendar via webhook.
```

### Para Perguntas ao Usuário (HITL)

Use `> [!question]` ao apresentar o draft para aprovação:

```markdown
> [!question] Revisão Necessária
> A classificação acima está correta? Posso enviar para o Obsidian?
```

### Para Bloqueios ou Problemas Identificados

Use `> [!bug]` para **inconsistências ou conflitos detectados**:

```markdown
> [!bug] Conflito Detectado
> Já existe uma nota com nome similar em `1_Projects/`. Verificar antes de criar.
```

---

## Tabela de Referência Rápida

| Situação no Sensemaking | Callout Recomendado |
|--------------------------|---------------------|
| Resumo da intenção capturada | `[!abstract]` |
| Próxima ação GTD | `[!todo]` |
| Deadline urgente / bloqueio | `[!warning]` |
| Contexto introdutório da nota | `[!info]` |
| Ideia ou insight | `[!tip]` |
| Pergunta de aprovação HITL | `[!question]` |
| Conflito / duplicata detectada | `[!bug]` |

---

## Callouts Dobráveis (para notas longas)

Use `-` para iniciar colapsado, `+` para iniciar expandido:

```markdown
> [!info]- Detalhes Adicionais (clique para expandir)
> Conteúdo mais extenso que não precisa aparecer de imediato.
```
