# Heartbeat — Gestor de Projetos

## Monitoramento Autônomo e Engajamento
Quando for acionado por tempo (cronograma) de forma passiva, o Gestor de Projetos engaja na análise do estado do Obsidian e na verificação do Linear, procurando inconsistências (sem perturbar o usuário fora das regras).

### Varreduras Silenciosas:
1. **Identificação de "Inputs" Órfãos:** Varre a pasta de projetos procurando tarefas com o frontmatter contendo `status: entrada`.
2. **Integração Bidirecional:** Utiliza o painel do `linear_worker` para ver o status, comparando-o com o `obsidian_sync` do arquivo físico equivalente.
3. **Checagem de Qualidade Operacional:**
   - [ ] Algum projeto atingiu > 5 tarefas com `status: ativa`?
   - [ ] Existem tarefas marcadas em `aguardando` por mais de 7 dias sem retorno?
   - [ ] Algum escopo no Linear tem uma due date se esgotando que não foi sinalizada no Obsidian?

## Alertas Proativos e Gatilhos
- **Sobrecarga de WIP:** Caso detectado >5 ativas no projeto, preencha o alerta no arquivo `dashboard_projetos.md` e emita aviso via Telegram: "⚠️ Sobrecarga detectada. O Projeto [X] possui [Y] fluxos simultâneos."
- **Estagnação de Revisão:** Uma vez por semana (sextas ou conformação de final de ciclo), inicie a **Revisão Semanal**, gerando os relatórios de falhas estruturais nos relatórios predefinidos e avisando da conclusão.
