# Exemplos Completos — Notas Finais do Gestor de Projetos

Estes são exemplos de arquivos `.md` prontos para serem gravados no Vault após o ciclo GTD + HITL.

---

## Exemplo 1: Tarefa de Desenvolvimento (Próxima Ação)

**Arquivo:** `Projetos/OpenClaw/tarefas/tar-2024-01-18-criar-landing-page.md`

```markdown
---
id: "tar-2024-01-18-criar-landing-page"
tipo_registro: "tarefa"
titulo: "Implementar Landing Page do OpenClaw"
status: "proxima_acao"
contextos:
  dispositivos:
    - "computador"
  ferramentas:
    - "vscode"
    - "github"
  modo_trabalho: "foco"
energia: "profunda"
prioridade: 1
projeto: "OpenClaw Lançamento v1"
area: "Dev"
tags:
  - "tarefa"
  - "dev"
  - "proxima_acao"
aliases: []
datas:
  criado_em: 2024-01-18
  vencimento_em: 2024-01-25
  concluido_em:
sincronizacao:
  linear_id: ""
  status_sync: "pendente"
aprovacao:
  status: "aprovada"
  aprovado_em: 2024-01-18
  aprovado_por: "Matheus"
auditoria_local:
  - "2024-01-18 — Criada via GTD Processamento a partir de mensagem no Telegram"
  - "2024-01-18 — Aprovada por Matheus via HITL"
---
# Implementar Landing Page do OpenClaw

> [!info] Contexto do Projeto
> Esta tarefa pertence a [[1_Projects/OpenClaw/Lançamento v1]]. É a porta de entrada do produto.

> [!todo] Próxima Ação
> Criar estrutura HTML/CSS com seções: hero, features, CTA, footer. Publicar via [[2_Areas/Infra/Coolify]].

## Critérios de Conclusão

- [ ] Seções hero, features e CTA implementadas
- [ ] Design responsivo (mobile-first)
- [ ] Deploy no Coolify funcionando
- [ ] URL final validada com Matheus

## Referências

- [[3_Resources/Design/Referências Landing Pages]]
- [[ref-2024-01-15-coolify-docs]]

## Notas Técnicas

Stack: HTML + Vanilla CSS + JS mínimo. Sem frameworks para manter leveza.
```

---

## Exemplo 2: Tarefa Bloqueada Aguardando Dependência

**Arquivo:** `Projetos/Finance Bot/tarefas/tar-2024-01-16-integrar-actual-budget.md`

```markdown
---
id: "tar-2024-01-16-integrar-actual-budget"
tipo_registro: "tarefa"
titulo: "Integrar Finance Bot com Actual Budget API"
status: "aguardando"
contextos:
  dispositivos:
    - "computador"
  ferramentas:
    - "terminal"
    - "vscode"
  modo_trabalho: "foco"
energia: "profunda"
prioridade: 2
projeto: "Finance Bot"
area: "Dev"
tags:
  - "tarefa"
  - "dev"
  - "finance"
  - "aguardando"
aliases: []
datas:
  criado_em: 2024-01-16
  vencimento_em: 2024-02-10
  concluido_em:
sincronizacao:
  linear_id: "VOLTZ-42"
  status_sync: "sincronizado"
aprovacao:
  status: "aprovada"
  aprovado_em: 2024-01-16
  aprovado_por: "Matheus"
auditoria_local:
  - "2024-01-16 — Criada via GTD Processamento"
  - "2024-01-17 — Sincronizada com Linear: VOLTZ-42"
  - "2024-01-18 — Status mudado para aguardando: depende de tar-2024-01-16-doc-api"
---
# Integrar Finance Bot com Actual Budget API

> [!warning] Aguardando Dependência
> Bloqueada por [[tar-2024-01-16-doc-api-actual-budget]]. Aguardando documentação da API ser concluída.

> [!info] Contexto
> Parte do projeto [[1_Projects/Finance Bot]]. Integração Node.js com a API REST do Actual Budget hospedado no Coolify.

## Escopo Técnico

- Endpoint de leitura de saldo por categoria
- Webhook para alertas de limite de gasto (>80%)
- Autenticação via token armazenado em `.env`

## Dependências

- [[tar-2024-01-16-doc-api-actual-budget]] ← **bloqueante**
- [[ref-2024-01-15-actual-budget-api-docs]]
```

---

## Exemplo 3: Tarefa com Linear ID Sincronizado

**Arquivo:** `Projetos/OpenClaw/tarefas/tar-2024-01-10-configurar-mcp-server.md`

```markdown
---
id: "tar-2024-01-10-configurar-mcp-server"
tipo_registro: "tarefa"
titulo: "Configurar MCP Server para o Agente Secretário"
status: "concluida"
contextos:
  dispositivos:
    - "computador"
  ferramentas:
    - "terminal"
    - "vscode"
  modo_trabalho: "foco"
energia: "foco"
prioridade: 1
projeto: "OpenClaw Infra"
area: "Infra"
tags:
  - "tarefa"
  - "infra"
  - "concluida"
aliases: []
datas:
  criado_em: 2024-01-10
  vencimento_em: 2024-01-12
  concluido_em: 2024-01-11
sincronizacao:
  linear_id: "VOLTZ-38"
  status_sync: "sincronizado"
aprovacao:
  status: "aprovada"
  aprovado_em: 2024-01-10
  aprovado_por: "Matheus"
auditoria_local:
  - "2024-01-10 — Criada e aprovada via HITL"
  - "2024-01-10 — Linear ID VOLTZ-38 registrado pela linear_worker_skill"
  - "2024-01-11 — Concluída. Status sincronizado com Linear"
---
# Configurar MCP Server para o Agente Secretário

> [!success] Concluída
> MCP Server configurado e funcionando. Agente Secretário operacional.

## O que foi feito

- MCP filesystem configurado para apontar ao Vault do Obsidian
- Permissões de leitura e escrita validadas
- Agente testado com Sensemaking + Obsidian Structuring

## Conexões

- [[2_Areas/OpenClaw/Arquitetura MCP]]
- [[1_Projects/OpenClaw/Lançamento v1]]
```
