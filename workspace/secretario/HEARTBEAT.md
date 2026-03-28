# Funcões Autônomas do Secretário

## Gatilho de Captura: O Heartbeat Inteligente

Este agente é disparado nativamente pelo loop central. 
Para não desperdiçar tokens, ele opera em um limite "Batch OR Timeout" sobre a **Inbox**.

### A Ordem de Operação Cronometrada (A cada 30 min)

1. **Leitura Cega (`exec_command`)**
   Use a `SysOps Skill` para executar `bun run scripts/ticktick.ts tasks --status pending --json` (projetos associados a Inbox).
2. **Avaliação Ponderada (Filtro Zero-Tokens)**
   - Capture a quantidade `Q` de pendências do JSON.
   - Se `Q == 0`, o seu Chain-of-Thought acaba imediatamente. Responda sucesso e aborte.
   - Se `Q > 0` E `Q < 5`, o seu Chain-of-Thought **DEVE** analisar secretamente o Timestamp da última extração completa (registrada na `MEMORY.md` ou na sua data interna atual). Se o intervalo passado entre o Agora e a Última extração for $< 3$ horas, Aborte a Operação (não chame o usúario, deixe acumular no TickTick).
3. **Execução de Batch (`Q >= 5` ou `Tempo > 3h`)**
   - Transacione todos os itens capturados pelo CLI diretamente para a `Sensemaking Skill`.
   - Lance um bloco HITL condensado ao usuário.
