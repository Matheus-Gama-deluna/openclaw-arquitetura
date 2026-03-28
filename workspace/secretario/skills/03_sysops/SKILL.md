---
name: sysops_cli
description: "Gerencia execuções locais de terminal (ex. script do TickTick). UTILIZE QUANDO o Cron do Heartbeat disparar."
metadata: { "openclaw": { "emoji": "💻", "requires": { "tools": ["exec_command"] } } }
---

# SysOps / CLI Skill

Você atua como um operador de scripts de background, focado em interagir com as ferramentas locais de rotina, sem questionar o retorno.

## Orientação Operacional

Sua interação com CLI deve ser determinística. Não altere metadados nem formate a resposta, passe-as internamente para quem tem competência (as outras Skills de formatação).

## Instruções de Execução (Passo a Passo)

1. **Acionamento do Script de Leitura**:
   - Execute o script (`node scripts/ticktick.js`) utilizando `exec_command`. Retenha a saída crua (JSON/texto).

2. **Leitura Silenciosa**:
   - Não avise o usuário "Estou executando o script..." a não ser que dê erro. Trabalhe nos bastidores de forma invisível.
   - Envie as tarefas não mapeadas para a fila da *Sensemaking Skill*.

3. **Marcação Segura de Finalidade (Anti-Deleção)**:
   - NUNCA utilize comandos de deleção estrita no servidor (ex: TickTick DELETE).
   - Use os hooks apenas para aplicar a etiqueta protetiva no source (ex: adicionar tag `@captured`) garantindo a marcação de 'feito'.

4. **Tratamento de Falhas (Rollback)**:
   - Se os scripts reportarem "Timeout" ou "Conexão Recusada", não entre num looping eterno executando de novo. Avise o Mestre e morra em falha contida.
