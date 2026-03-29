# Exemplos de Draft em Memória — Sensemaking Skill

Estes são exemplos completos e prontos para apresentar ao Matheus via HITL antes de persistir no Vault.

---

## Exemplo 1: Mensagem de Texto Solta no Telegram

**Input recebido:**
> "Preciso estudar sobre Kubernetes essa semana, achei um curso bom no YouTube"

**Draft gerado em memória:**

```markdown
---
id: "ref-20240115-kub1"
source: "telegram"
type: "reference"
status: "draft"
tags:
  - "reference"
  - "reading"
  - "dev"
context: "@reading"
url: "https://youtube.com"
aliases:
  - "Curso Kubernetes YouTube"
---
# Estudar Kubernetes — Curso YouTube

> [!info] Contexto da Captura
> Capturado via Telegram em 15/01/2024. Matheus identificou um curso no YouTube.

> [!todo] Próxima Ação
> Assistir o curso e criar notas de estudo em [[3_Resources/Dev/Kubernetes]].

## Material

- Tipo: Vídeo/Curso (YouTube)
- Prioridade: Esta semana

## Conexões

- [[2_Areas/Dev/Aprendizado Contínuo]]
```

---

## Exemplo 2: Ideia Capturada via Áudio

**Input recebido (transcrição):**
> "Tive uma ideia de fazer um bot que avisa quando meu cartão de crédito tá perto do limite"

**Draft gerado em memória:**

```markdown
---
id: "idea-20240116-bot1"
source: "audio_transcricao"
type: "idea"
status: "draft"
tags:
  - "idea"
  - "dev"
  - "finance"
context: "@dev"
aliases: []
---
# Bot de Alerta de Limite do Cartão de Crédito

> [!tip] Insight Capturado
> Automatização financeira: bot que monitora limite do cartão e envia alertas proativos.

## Descrição da Ideia

Criar um bot (Telegram?) que acessa os dados do [[Actual Budget]] e avisa quando o limite do cartão estiver acima de X%.

## Possível Próximo Passo

- Transformar em [[1_Projects/Finance Bot]] se aprovado
- Verificar viabilidade via [[2_Areas/Finanças/Actual Budget API]]
```

---

## Exemplo 3: Tarefa Urgente com Deadline

**Input recebido:**
> "Não esquece que tenho que pagar o IPTU até dia 20, senão tem multa"

**Draft gerado em memória:**

```markdown
---
id: "act-20240117-ipt1"
source: "telegram"
type: "action"
status: "draft"
tags:
  - "action"
  - "finance"
  - "errands"
context: "@finance"
due: 2024-01-20
priority: "urgent"
aliases: []
---
# Pagar IPTU — Vence dia 20/01

> [!warning] Deadline Crítico
> Prazo: **20 de Janeiro**. Multa por atraso incide após esta data.

> [!todo] Próxima Ação
> Acessar o portal da prefeitura e realizar o pagamento do IPTU.

## Critério de Conclusão

- [ ] Comprovante salvo em [[3_Resources/Documentos/IPTU 2024]]
```

---

## Exemplo 4: Projeto Novo com Escopo Definido

**Input recebido:**
> "Vou precisar construir a landing page do OpenClaw essa semana, tem que tá pronta pro lançamento"

**Draft gerado em memória:**

```markdown
---
id: "proj-20240118-lnd1"
source: "chat_direto"
type: "project"
status: "draft"
tags:
  - "project"
  - "dev"
area: "1_Projects"
priority: "high"
aliases:
  - "Landing OpenClaw"
---
# Landing Page — OpenClaw Lançamento

> [!abstract] Visão Geral
> Criar a landing page de apresentação do OpenClaw para o lançamento desta semana.

## Resultado Desejado

Landing page publicada e funcional antes do lançamento.

## Próximas Ações

- [ ] Definir estrutura de seções (hero, features, CTA)
- [ ] Criar design no Figma ou direto no código
- [ ] Publicar via [[2_Areas/Infra/Coolify]]

## Conexões

- [[2_Areas/OpenClaw/Roadmap]]
- [[3_Resources/Design/Referências Landing Pages]]
```
