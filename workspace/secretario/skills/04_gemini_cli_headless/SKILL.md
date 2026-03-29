---
name: gemini_cli
description: "Delega processamento direto a chamadas do Gemini CLI (Headless Mode) com output JSON estruturado. UTILIZE para interagir e delegar leitura em arquivos volumosos à IA auxiliar no terminal, poupando seu contexto."
metadata: { "openclaw": { "emoji": "🥷", "requires": { "tools": ["exec_command"] } } }
---

# Gemini CLI Skill (Modo Headless)

Você atua como um coordenador mestre de inteligência via script. Em vez de você mesmo saturar sua memória com operações colossais, você delega o trabalho pesado rodando o binário secundário local (`gemini`) na máquina de forma invisível.

## Restrições Base

Toda vez que você usar o CLI local para invocar uma segunda IA (para focar em processamento sem perdas), o acionamento será imperativamente configurado em **Headless Mode** (`--output-format`). Isso evita devoluções de UI em texto não tratado, devolvendo um banco de dados confiável para você trabalhar.

## Instruções de Execução em Terminal (Passo a Passo)

1. **Construção Segura do Comando**:
   - Formule seu prompt envolto em aspas para a flag `-p`.
   - Use o prefixo `@` para injeção nativa de arquivos diretos ao CLI, não utilize cat/pipe. Ex: `gemini -p "Resuma criticamente @1_Projects/projeto_gigante.md"`.
   - Adicione ABSOLUTAMENTE a flag obrigatória da sua skill: `--output-format json`.

2. **Acionamento via Ferramenta**:
   - Utilize a sua capacidade de engajar o `exec_command`.
   - O comando esperado será puramente, por exemplo:
     `gemini -p "Prompt focado aqui" --output-format json`

3. **Análise de Resposta Estruturada (O Parse)**:
   - Você receberá na saída do shell um texto JSON único com este esqueleto vital:
     - `response`: O resultado limpo e final da solicitação.
     - `stats`: Estatísticas computacionais sobre latência e contadores do sub-agente.
     - `error`: Popula em caso de falha subjacente da API local.
   
4. **Governança Feroz de Exit Codes**:
   - **Exit Code 0 (Success)**: O parse JSON transcorreu perfeitamente e o campo `response` retém a execução. Avance.
   - **Exit Code 42 (Input error)**: Você tentou injetar um path/prompt inválido. Você DEVE refinar o escape de strings de bash (tirar aspas duplas de dentro das aspas do bash, por exemplo) e auto-comandar de novo a correção.
   - **Exit Code 1 ou 53**: Time Out ou General Error da API. Não tente auto-refinar um loop eterno; acuse imediatamente o defeito Mestre no Telegram, repassando a string extraída da chave `error`.

5. **Passagem de Bastão Fim/HITL**:
   - Entregue os resultados limpos do processamento Headless paralelizável a você mesmo, apresente o conteúdo ou amostras para o Mestre: *"Tarefa Local Paralela concluída pelo CLI sem problemas. Foram gastos [stats.usage] tokens e rendeu: [pequeno trecho]..."*
   - Peça permissão para rotear o conteúdo resolvido para a instrução oficial e gravar via *Obsidian Structuring Skill*.

## Referências

- O output processado deve ser entregue à `skills/02_obsidian_structuring/SKILL.md` para formatação final em Obsidian Flavored Markdown
- Use como entrada arquivos `.md` do Vault — nunca passe conteúdo raw que já existe em nota sem ler antes com `read_file`
- Para processamento em batch de notas (ex: refatoração de múltiplas notas do Inbox), consulte os exemplos em `skills/01_sensemaking/references/EXEMPLOS_DRAFT.md`

