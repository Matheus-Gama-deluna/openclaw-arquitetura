# Exemplos Completos — Notas Finais para o Vault

Estes exemplos mostram como deve ser o **arquivo `.md` final** gerado pela Obsidian Structuring Skill após aprovação HITL. Inclui Frontmatter completo, Callouts, Wikilinks e estrutura PARA correta.

---

## Exemplo 1: Action Note (Pasta `0_Inbox/` ou `1_Projects/`)

**Arquivo:** `1_Projects/OpencClaw/Criar Landing Page OpenClaw.md`

```markdown
---
id: "act-20240118-lnd1"
source: "chat_direto"
type: "action"
status: "active"
tags:
  - "action"
  - "dev"
context: "@dev"
due: 2024-01-25
priority: "high"
---
# Criar Landing Page — OpenClaw

> [!info] Contexto
> Ação criada em 18/01/2024 a partir de mensagem no chat. Parte do lançamento do OpenClaw.

> [!todo] Próxima Ação
> Criar estrutura HTML/CSS da landing page e publicar via Coolify.

## Escopo

Vinculada ao projeto: [[1_Projects/OpenClaw/Lançamento v1]]

## Passos

- [ ] Esboçar seções (hero, features, CTA, footer)
- [ ] Implementar design responsivo
- [ ] Publicar em [[2_Areas/Infra/Coolify]] e validar URL

## Referências Úteis

- [[3_Resources/Design/Referências Landing Pages]]
- [[2_Areas/OpenClaw/Pitch e Posicionamento]]
```

---

## Exemplo 2: Project Note (Pasta `1_Projects/`)

**Arquivo:** `1_Projects/Finance Bot/Finance Bot — Alerta de Limite.md`

```markdown
---
id: "proj-20240116-bot1"
source: "audio_transcricao"
type: "project"
status: "active"
tags:
  - "project"
  - "dev"
  - "finance"
context: "@dev"
due: 2024-02-28
priority: "medium"
aliases:
  - "Bot Cartão"
  - "Finance Alert Bot"
---
# Finance Bot — Alerta de Limite do Cartão

> [!abstract] Visão Geral
> Bot automatizado que monitora o limite do cartão de crédito via Actual Budget e envia alertas proativos via Telegram.

## Resultado Desejado

Bot funcional enviando alertas quando gasto > 80% do limite definido.

## Área Responsável

- [[2_Areas/Finanças/Gestão Financeira Pessoal]]
- [[2_Areas/Dev/Automações]]

## Próximas Ações

- [ ] [[Documentar API do Actual Budget]]
- [ ] Criar webhook listener no servidor
- [ ] Integrar com [[2_Areas/Infra/Bot Telegram]]

## Dependências

- [[3_Resources/Dev/Actual Budget API Docs]]
- [[2_Areas/Infra/Coolify]] (deploy do bot)

## Log de Progresso

| Data | Atualização |
|------|-------------|
| 2024-01-16 | Projeto criado via captura de áudio |
```

---

## Exemplo 3: Reference Note (Pasta `3_Resources/`)

**Arquivo:** `3_Resources/Dev/Kubernetes — Curso Introdutório.md`

```markdown
---
id: "ref-20240115-kub1"
source: "telegram"
type: "reference"
status: "active"
tags:
  - "reference"
  - "reading"
  - "dev"
context: "@reading"
url: "https://youtube.com/watch?v=exemplo"
author: "Canal TechPower"
aliases:
  - "Curso Kubernetes"
  - "K8s YouTube"
---
# Kubernetes — Curso Introdutório (YouTube)

> [!info] Sobre este Recurso
> Curso encontrado via Telegram em 15/01/2024. Material de referência para estudo de orquestração de containers.

## Resumo

Cobre os conceitos básicos de:
- Pods, Deployments e Services
- ConfigMaps e Secrets
- Ingress e Load Balancing

## Notas de Estudo

> [!tip] Insight Principal
> Kubernetes é mais simples se você já conhece Docker Compose — pense em manifests YAML como uma versão "cluster" do compose.

## Conexões

- Usado em: [[1_Projects/Infra OpenClaw/Migração para K8s]]
- Área relacionada: [[2_Areas/Dev/Infraestrutura e DevOps]]
```

---

## Exemplo 4: Idea Note (Pasta `0_Inbox/`)

**Arquivo:** `0_Inbox/Ideia — Dashboard de Produtividade Obsidian.md`

```markdown
---
id: "idea-20240120-dsh1"
source: "chat_direto"
type: "idea"
status: "draft"
tags:
  - "idea"
  - "dev"
context: "@anywhere"
aliases: []
---
# Ideia — Dashboard de Produtividade no Obsidian

> [!tip] Insight
> Criar um arquivo `.base` no Obsidian que agrega todas as actions ativas, projetos em andamento e itens de inbox em uma única view.

## Descrição

Um dashboard usando [[Obsidian Bases]] que mostra:
- Todas as notas com `type: action` e `status: active`
- Projetos com deadlines próximos
- Contador de itens no Inbox

## Possível Próximo Passo

- [ ] Transformar em [[1_Projects/Obsidian Dashboard]] se aprovado
- [ ] Consultar [[3_Resources/Obsidian/Bases Skill]] para implementação

> [!question]- Aprovação Pendente
> Esta ideia deve ser promovida a projeto ou arquivada como referência?
```
