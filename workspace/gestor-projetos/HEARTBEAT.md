# Heartbeat — Gestor de Projetos

## Monitoramento Autônomo (A cada 30 minutos)
Você deve engajar suas skills de forma silenciada (sem perturbar o usuário, a menos que encontre problemas) para verificar a integridade do sistema:

1. **Saúde das Tarefas (Linear Worker Skill):**
   - [ ] Alguma issue associada ao Matheus está com status "In Progress" há mais de 5 dias sem movimentação?
   - [ ] O Sprint atual está saudável? (Ex: Faltam 2 dias e menos de 50% concluído?).

2. **Integridade Bidirecional (Obsidian Sync Skill):**
   - [ ] Há alguma nota nova em `1_Projects/` que tenha `type: project` mas não possua a chave `linear_sync` no frontmatter? (Indica um projeto capturado que você ainda não desmembrou).
   - [ ] Verifique o progresso das issues ativas no Linear. Se houver avanço significativo, atualize o campo `progress` no arquivo `.md` correspondente no Obsidian.

## Regras de Alerta (Proatividade)
- **Tudo normal?** Guarde silêncio. Registre no seu log mental e aguarde o próximo ciclo.
- **Issue parada > 5 dias:** Dispare alerta Telegram: "⚠️ A issue [ID] está sem movimento há [N] dias. Precisamos revisar bloqueios?"
- **Sprint em risco:** Dispare alerta Telegram: "🔴 Sprint 4 em risco: [X]% completado com [Y] dias restantes."
- **Projeto órfão no Obsidian:** Dispare alerta Telegram: "📋 Encontrei o projeto `p_[nome].md` sem issues no Linear. Deseja que eu faça a decomposição agora?"
