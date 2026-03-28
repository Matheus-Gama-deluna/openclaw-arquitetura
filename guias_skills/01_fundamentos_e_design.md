# Guia 01: Fundamentos e Design de Skills

Uma **Skill** (Habilidade) é um conjunto de instruções empacotadas como um projeto simples, geralmente uma pasta (ou estrutura análoga), que ensina um Modelo de Inteligência Artificial a lidar com tarefas ou fluxos de trabalho específicos.

Ao invés de re-explicar preferências, processos e a sua expertise de domínio toda vez que um agente é acionado, as skills permitem que a IA aprenda a sua metodologia uma única vez. Elas funcionam especialmente bem com integrações MCP (Model Context Protocol), servindo como a "camada de conhecimento" essencial sobre essas ferramentas.

> [!NOTE]
> **A Analogia da Cozinha**
> Os servidores **MCP** são a conexão. Eles representam a **cozinha profissional**: fornecem acesso aos equipamentos, ingredientes e dados de um serviço (como bancos de dados, API do Notion, Github, etc.).
> 
> As **Skills** são as **receitas**. Elas ditam as etapas passo-a-passo e embutem os fluxos de trabalho adequados para que os agentes combinem de forma consistente o uso das ferramentas à sua disposição.
> 
> Sem skills, o modelo sabe *o que pode fazer*, mas corre o risco de não saber *como ou quando* fazê-lo de maneira efetiva no seu sistema.

---

## Estrutura Básica de uma Skill

Embora a implementação exata possa variar de acordo com o software que integra a IA (ex: OpenClaw, Claude Code, ou pipelines personalizadas), abstratamente, toda Skill possui:

- **Instruções Base** (`SKILL.md` ou equivalente): Arquivo principal em Markdown, possuindo um *frontmatter* YAML no cabeçalho e as instruções detalhadas no corpo.
- **Scripts:** Códigos auxiliares executáveis (ex: em bash, python, JS) que podem ser chamados para automatizações em massa e análises determinísticas que o modelo não deva tentar adivinhar verbalmente.
- **Referências/Documentações:** Diretório com padrões arquiteturais e normas das APIs carregados apenas *sob demanda*.
- **Assets/Templates:** Modelos e bases estáticas necessárias na saída (como esqueletos de relatórios).

---

## Princípio da Divulgação Progressiva

Construir o LLM (Large Language Model) para ler todo o seu banco de dados e arquivos simultaneamente gasta tempo e tokens indiscriminadamente e causa lentidão ou divagações. Bons padrões aplicam a *Divulgação Progressiva*:

1. **Primeiro Nível (Frontmatter YAML):** É essencial. Ele fica sempre carregado no *system prompt* da IA. Contém o metadado principal que identifica à IA **quando** esta rotina deve ser acionada. Ele deve prover informações estritamente necessárias, sem todo o esqueleto interno.
2. **Segundo Nível (Corpo Principal):** Apenas carregado pela IA *quando ela ativou conscientemente o gatilho da Skill*. Possui o roteiro com os tutoriais detalhados de uso, com os comandos a rodar e fluxos (ex: Passo 1, Passo 2, Resolução de Erros).
3. **Terceiro Nível (Arquivos Referenciados):** Textos documentais completos (como o esquema da sua API inteira) que a IA usa o "Tool Calling" se decidir que precisa navegar ou ler.

---

## A Arte dos "Gatilhos" (*Triggers*)

Ao criar o metadado YAML no topo das suas instruções (a campo `description`), não se trata apenas de resumir, mas criar um mecanismo de ativação robusto.

O campo `description` DEVE incluir:
1. **O quê** a skill faz.
2. **Quando** o usuário/agente deve adotá-la (frases de gatilho, jargões).
3. E, quando aplicável, identificar restrições negativas explícitas.

### Boas e Más Descrições

> [!TIP]
> **Exemplo Bom - Acionador Específico:**
> `description`: Analisa arquivos iterativos do design e gera documentações estritas para handover. **Utilize quando** o desenvolvedor colocar arquivos .fig, ou falar "crie o setup da página", "faça os documentos do spec de UI".

> [!WARNING]
> **Exemplo Ruim - Vago:**
> `description`: Ajuda com tarefas comuns do projeto. 
> *Problema: O modelo de IA nunca saberá precisamente o que é uma "tarefa comum" contra o que é uma "tarefa sistêmica" e nunca engatilhará a skill por conta própria.*

### Regras de Ouro de Descrições:
- Seja extremamente focado em resultados ("O que acontece ao fim?"), listando verbalizações típicas.
- Em caso de uma skill ser ativada por acidente (Overtriggering), atualize a descrição fornecendo contra-indicações explícitas (Ex: "...**Não utilize** para fazer análises de rotina numéricas. Para isso use a skill XY...").
