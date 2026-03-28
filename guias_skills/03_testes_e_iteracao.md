# Guia 03: Testes, Iteração e Resolução de Problemas (Troubleshooting)

As Skills são documentos vivos. Modelos mudam, APIs atualizam e comportamentos imprevistos acontecem. O segredo para uma skill robusta é saber testar o gatilho, avaliar as métricas de sucesso e ajustar o comportamento falho da Inteligência Artificial.

## 1. Definindo Critérios de Sucesso (Métricas)

Antes de criar uma skill, estabeleça como medir sua eficiência qualitativa e quantitativamente se comparada a mandar a IA fazer a mesma tarefa sem nenhuma skill.

**A. Métricas Quantitativas:**
- A skill é acionada (gatilho disparado) em **90% das vezes** que o usuário a solicita (com diferentes construções verbais).
- A redução do tempo ou quantidade do Uso de Tokens/Mensagens transacionadas é drástica (Ex: Sem skill o agente gastaria 12 mil tokens. Com skill gastou 6 mil).
- **Zero Falhas nas Chamadas:** Monitorar o servidor MCP revelando `0` calls de API quebrados.

**B. Métricas Qualitativas:**
- O agente obedeceu aos padrões estéticos / regras de negócios na primeira tentativa, sem precisar que o usuário o corrigisse ("Ah não, refaça usando esta regra").
- O Fluxo de dados chegou ao destino intacto.

## 2. Metodologia de Teste para Gatilhos

Você precisa garantir que a skill seja ativada na hora certa e nunca na hora errada.

| Tipo de Retorno | Sintoma | Solução Primária |
|-----------------|----------|-------------------|
| **Under-triggering** (Sub-ativação) | O agente não usa a skill quando deveria e você precisa pedi-lo ativamente "Use a skill X!". | Revisite o Frontmatter (`description`). Certifique-se de não ser genérico demais. Adicione **jargões e termos verbais** usados pelos desenvolvedores. Ex: Incluir que a skill gere planilhas no Excel adicionando `.xlsx`. |
| **Over-triggering** (Super-ativação)| O agente puxa essa skill para tentar responder problemas nada a ver. O usuário ativa a restrição dela toda hora. | Adicione **Gatilhos Negativos** no YAML ("**NÃO USE** para fazer isso..."). Isole e clarifique o escopo ("Restrito a workflows online, não responda perguntas simples bancárias"). |

## 3. Comportamento Falho da IA (Laziness & Desobediência)

Algumas vezes, a sua conexão funciona perfeitamente, mas a IA "finge" trabalhar ou ignora algumas tarefas dadas.

> [!WARNING]
> **O LLM está sendo 'preguiçoso' ou ignorando instruções?**
> Ao invés de ficar discutindo com a IA na conversa primária, mude o design principal:
> 
> 1. **Remova Verbosidade inútil:** A IA perde foco com blocos literais grandes. Use Bullet Points rigorosos e numéricos (`1.`, `2.`, `3.`)
> 2. **Instruções Soterradas:** Se os passos vitais estão espremidos entre dois blocos massivos de documentação, re-localize esse conhecimento complementar em um arquivo auxiliar na pasta referenciado (*Progressive Disclosure*).
> 3. **Cabeçalhos Intimidadores:** Traga atenção redobrada usando encabeçamentos em caps-lock como `## CRÍTICO` ou `## ATENÇÃO MÁXIMA`.
> 4. **Tranquilize o Modelo na Skill:** Escreva no arquivo `SKILL.md` termos limitadores pacíficos: "Leve o tempo que precisar. Qualidade aqui é mais importante que rapidez. NÃO pule testes de validação".

## 4. Otimização de Janela de Contexto

Se todo o sistema da IA estiver rodando de forma degradada (lento e com respostas de má qualidade):
- Reduza o número de skills globais ativadas por projeto no seu agente base. Tente não sobrecarregar os perfis de contexto de cada IA.
- Retire a bagagem dos Manuais de Referência do seu arquivo markdown principal em favor do acesso à leitura sobre demanda e a sistemas RAG.
