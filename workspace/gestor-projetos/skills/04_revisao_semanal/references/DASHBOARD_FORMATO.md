# Referência do Dashboard Semanal — Revisão GTD

Este arquivo define o formato esperado do `30-Controle/dashboard_projetos.md` gerado pela Revisão Semanal, e os critérios de varredura com exemplos reais.

---

## Formato do `dashboard_projetos.md`

```markdown
# Dashboard de Projetos — Semana [N] / [Ano]

> [!info] Gerado automaticamente pela `revisao_semanal_gtd` em [data]

---

## 📊 Métricas Globais

| Métrica | Valor |
|---------|-------|
| Projetos ativos | 4 |
| Total tarefas `proxima_acao` | 7 |
| Total tarefas `ativa` | 12 |
| Total tarefas `aguardando` | 3 |
| Total tarefas `bloqueada` | 1 |
| Tarefas vencidas (sem conclusão) | 2 |

---

## 🔴 Problemas Detectados

### 1. WIP Estourado

> [!warning] WIP Estourado
> O projeto **OpenClaw Lançamento v1** tem **7 tarefas ativas** (limite: 5).

Tarefas excedentes:
- [[tar-2024-01-18-criar-landing-page]] — `ativa`
- [[tar-2024-01-17-configurar-ci-cd]] — `ativa`

**Ação sugerida:** Mover 2 tarefas para `algum_dia` ou `aguardando`.

---

### 2. Vácuo de Ação

> [!danger] Projeto Sem Próxima Ação
> O projeto **Finance Bot** está ativo mas **não tem nenhuma tarefa com `proxima_acao`**.

**Ação sugerida:** Revisar backlog e promover ao menos 1 tarefa para `proxima_acao`.

---

### 3. Aguardando Sem Fim

> [!warning] Aguardando há mais de 7 dias
> [[tar-2024-01-10-integrar-api-pagamentos]] está `aguardando` desde **10/01/2024** (9 dias).

Dependência: `tar-2024-01-08-contratar-gateway` (ainda não concluída)
**Ação sugerida:** Verificar status da dependência ou desbloquear manualmente.

---

### 4. Entulhos (Tarefas Vencidas)

> [!failure] Tarefas Vencidas sem Conclusão

| Tarefa | Vencimento | Status |
|--------|-----------|--------|
| [[tar-2024-01-12-reuniao-cliente]] | 2024-01-12 | `proxima_acao` |
| [[tar-2024-01-14-publicar-changelog]] | 2024-01-14 | `ativa` |

**Ação sugerida:** Concluir, cancelar ou reprogramar cada uma.

---

### 5. Gargalos (Bloqueadas)

> [!bug] Tarefas Bloqueadas

| Tarefa | Bloqueio | Dias bloqueada |
|--------|----------|----------------|
| [[tar-2024-01-16-deploy-staging]] | Aguardando acesso SSH do servidor | 2 dias |

---

## ✅ Projetos Saudáveis

- **OpenClaw Infra** — 3 tarefas ativas, 2 próximas ações. Dentro do WIP.
- **Secretário Agent** — Sem tarefas pendentes. Fase de monitoramento.

---

## 📋 Próximos Passos Sugeridos

1. Reduzir WIP do OpenClaw Lançamento v1 (mover 2 tarefas)
2. Definir próxima ação para Finance Bot
3. Resolver ou renegociar tarefas vencidas (2 itens)
4. Intervir no bloqueio do deploy de staging

---

*Gerado por: `revisao_semanal_gtd` | Próxima revisão: [próxima sexta-feira]*
```

---

## Critérios de Varredura — Definições Técnicas

| Problema | Condição YAML | Limiar |
|----------|--------------|--------|
| WIP Estourado | `status: ativa` count por projeto | > 5 |
| Vácuo de Ação | Projeto sem nenhuma tarefa `proxima_acao` | Qualquer projeto ativo |
| Aguardando Sem Fim | `status: aguardando` + `datas.criado_em` | > 7 dias atrás sem mudança |
| Entulho | `datas.vencimento_em` < hoje + `status != concluida/cancelada` | Qualquer |
| Gargalo | `status: bloqueada` | Qualquer |

---

## Callouts Usados no Dashboard

| Situação | Callout |
|----------|---------|
| WIP estourado | `> [!warning]` |
| Projeto sem ação | `> [!danger]` |
| Aguardando longo | `> [!warning]` |
| Vencidas | `> [!failure]` |
| Bloqueadas | `> [!bug]` |
| Projetos saudáveis | `> [!success]` |
| Próximos passos | Lista simples numerada |
