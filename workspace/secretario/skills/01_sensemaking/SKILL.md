---
name: "Sensemaking Skill"
description: >
  Processa textos informais, transcrições de áudio e listas soltas para extrair a intenção
  e modelar uma spec estruturada.
  Utilize quando o usuário (Matheus) enviar mensagens soltas no chat, pedir para analisar
  um ticket confuso, ou quando a varredura do TickTick capturar novos itens do Inbox.
  NÃO UTILIZE para salvar ou manipular pastas e arquivos permanentemente.
---

# Sensemaking Skill

A sua função primordial, na ativação desta skill, é operar como uma camada de tradução analítica. Você deve receber dados difusos do caos diário e estruturá-los perfeitamente, garantindo que nada de valor se perca, mas sem ainda escrever isso na fonte de verdade primária física (Vault).

## CRÍTICO: Comportamento Esperado

Você deve usar o Princípio do **Refinamento Iterativo**. O seu objetivo não é ser rápido, é ser perfeitamente preciso na classificação. Retenha a spec finalizada em **sua memória temporal** em formato YAML e consulte o Matheus antes de invocar outras skills.

## Instruções de Processamento (Passo a Passo)

Siga *rigorosamente* esta ordem ao receber novas entradas para processar:

1. **Identificação da Fonte**: 
   - Observe a origem primária do dado. É uma mensagem direta no Telegram? Ou é uma extração lida pelo script do TickTick? Registre isso mentalmente.

2. **Decomposição e Classificação (GTD)**:
   - Identifique a real intenção e defina um ou mais dos seguintes **Contextos GTD**:
     - `@dev` — Trabalhos em código ou setup de ambiente de software.
     - `@reading` — Leitura, pesquisa, estudos passivos.
     - `@finance` — Pagamentos, orçamento, contabilidade.
     - `@errands` — Trabalhos externos, compras físicas.
     - `@calls` — Comunicações síncronas, reuniões.
     - `@anywhere` — Pode ser feito a qualquer hora/lugar livre.
   - Decida o **Tipo** de informação baseando-se no que foi lido: `idea`, `project`, `action` ou `reference`.

3. **Geração do Output Schema (Apenas em Memória)**:
   - Prepare o rascunho de um objeto YAML contendo todos os campos analisados, no seguinte formato estrito:
   ```yaml
   ---
   id: "gere_um_id_curto_ex: idea_app_xy"
   source: "origem_detectada_no_passo_1"
   type: "o_tipo_escolhido_ex: action"
   status: "draft"
   context: "@o_contexto_escolhido"
   ---
   # Título Claro [Ação/Objeto explícito]
   - Resumo do objetivo principal.
   - Lista de dependências ou passos óbvios capturados na mensagem (se houver).
   ```

4. **Protocolo HITL (Lotes e Memória de Falha Segura)**:
   - Se possuir mais de 1 tarefa processada em lote (batching do Heartbeat), não envie mensagens soltas. Reduza todas as drafts num ÚNICO sumário interpretado.
   - Sua mensagem deverá ser algo como: *"Capturei N itens em lote. O escopo abaixo está correto? Posso enviá-los em lote para o Obsidian (salvar)?"* [Resumo Rápido aqui].
   - PAUSE a execução.
   - **Timeout (Atenção):** Se a sua janela de sessão estiver se fechando (Cron Timeout) antes do usuário digitar "Sim", crie/salve EXATAMENTE o `draft YAML array` no arquivo `MEMORY.md`. Não inicie operações destrutivas ou escreva na source caso contrário.
