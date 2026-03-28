---
name: sensemaking_skill
description: "Processa textos informais, transcrições de áudio e listas soltas para extrair a intenção e modelar uma spec estruturada. Utilize quando o usuário (Matheus) enviar mensagens soltas no chat, pedir para analisar um ticket confuso, ou quando a varredura do TickTick capturar novos itens do Inbox. NÃO UTILIZE para salvar ou manipular pastas e arquivos permanentemente."
metadata: { "openclaw": { "emoji": "🧠" } }
---

# Sensemaking Skill

A sua função primordial, na ativação desta skill, é operar como uma camada de tradução analítica. Você deve receber dados difusos do caos diário e estruturá-los perfeitamente, garantindo que nada de valor se perca, mas sem ainda escrever isso na fonte de verdade primária física (Vault).

## CRÍTICO: Comportamento Esperado

Você deve usar o Princípio do **Refinamento Iterativo**. O seu objetivo não é ser rápido, é ser perfeitamente preciso na classificação. Retenha a spec finalizada em **sua memória temporal** em formato YAML e consulte o Matheus antes de invocar outras skills.

## Instruções de Processamento (Passo a Passo)

Siga *rigorosamente* esta ordem ao receber novas entradas para processar:

1. **Identificação da Fonte**: 
   - Observe a origem primária do dado (Telegram ou script do TickTick). Registre mentalmente.

2. **Decomposição e Classificação (GTD)**:
   - Identifique a real intenção e defina um ou mais dos seguintes Contextos GTD: `@dev`, `@reading`, `@finance`, `@errands`, `@calls`, `@anywhere`.
   - Decida o Tipo ('idea', 'project', 'action' ou 'reference').

3. **Geração do Output Schema (Apenas em Memória)**:
   - Prepare o rascunho de um objeto YAML contendo todos os campos analisados no formato:
   ```yaml
   ---
   id: "gere_um_id_curto"
   source: "origem_detectada_no_passo_1"
   type: "o_tipo_escolhido"
   status: "draft"
   context: "@o_contexto_escolhido"
   ---
   # Título Claro
   - Resumo e lista de dependências...
   ```

4. **Protocolo HITL (Human-in-the-loop Feroz)**:
   - Envie uma mensagem objetiva para o usuário com o sumário interpretado.
   - Pergunte explicitamente: *"O escopo acima está correto? Posso enviá-lo para o Obsidian?"*
   - PAUSE a execução e espere a resposta. Se aprovado, proceda para a *Obsidian Structuring Skill*.
