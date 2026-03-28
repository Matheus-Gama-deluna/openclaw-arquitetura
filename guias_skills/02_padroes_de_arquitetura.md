# Guia 02: Padrões de Arquitetura de Skills

Estes padrões emergiram de implementações baseadas em Inteligência Artificial no mundo real. Eles representam abordagens comuns que funcionam de forma consistente com LLMs na orquestração de rotinas complexas.

## A Escolha Inicial: Foco no Problema vs Foco na Ferramenta

A lógica de uma skill pode seguir dois caminhos:
1. **Foco no Problema ("Preciso de um setup de projeto"):** A skill orquestra as chamadas do provedor de ferramentas na sequência correta. O usuário descreve um resultado final, e a skill resolve usando tudo que tiver acesso.
2. **Foco na Ferramenta ("Tenho um Conector do Notion"):** A skill ensina a IA como é a *melhor maneira* de usar e lidar com erros do Notion ali conectado. Ela provê a *teoria de uso*.

Na maioria das vezes a skill penderá para um destes caminhos. Conectar estas ideias gera os 5 padrões a seguir:

---

## 1. Orquestração de Fluxo Sequencial

**Quando usar:** Seus usuários/agentes precisam executar rotinas obrigatoriamente ordenadas (Ex: Onboarding de cliente, Publicação de mídia).

**Técnicas Relevantes:**
- Ordernação explícita no markdown da skill (`Passo 1`, `Passo 2`).
- Restrição de dependências (Ex: Não execute o Passo 2 antes do 1 retornar `success`).
- Ditar regras de Validação e *Rollback* (se der erro no passo 3, reverta o 2).

## 2. Coordenação Multi-Ferramenta (Multi-MCP)

**Quando usar:** Fluxos de trabalho que cruzam diferentes plataformas.

**Técnicas Relevantes:**
- Separação em **Fases** claras.
  - *Fase 1: Extrair design no Figma (MCP Figma)*
  - *Fase 2: Fazer Upload dos dados no Drive (MCP Drive)*
  - *Fase 3: Criar um ticket de engenharia no Jira e atachar os links (MCP Jira)*
- Validação consolidada antes de repassar o bastão para a próxima ferramenta.
- Tratamento de erro centralizado para não enviar links mortos.

## 3. Refinamento Iterativo

**Quando usar:** A qualidade final melhora sempre que há auto-revisão (ex: Escrevendo relatórios documentais densos, gerando layout visual).

**Técnicas Relevantes:**
- Critérios de Qualidade Explícitos estabelecidos no prompt.
- **Loop de Refinamento:** A skill determina que após um rascunho, o agente rode um script interno (como `check_report.py`) ou use um MCP de lint/validação. Se apontar erro, ele foca em arrumar apenas isso, *regenerando apenas as seções afetadas*.
- Define rigidamente *quando parar de iterar* (limite de iterações vs limiar de pontuação alcançado) para evitar loop infinito.

## 4. Seleção Inteligente baseada em Contexto

**Quando usar:** O mesmo resultado final pode ser atingido de vários jeitos mudando apenas as condições do ambiente (ex: Salvar logs vs salvar relatórios visuais).

**Técnicas Relevantes:**
- **Árvore de Decisão:** Definir na skill as escolhas como:
  - *"Se o arquivo for grande > Use o MCP de S3 Storage AWS."*
  - *"Se for para colaborar o texto > Use o Notion."*
  - *"Se for código puro > Commit no Github MCP."*
- Prover Fallbacks (Plano B caso o serviço principal negue acesso).

## 5. Inteligência Específica de Domínio

**Quando usar:** Sua skill é vital para adicionar *Conhecimento Restrito* acima e muito além apenas do "Acesso à ferramenta".

**Técnicas Relevantes:**
- **Passo Anti-Erro (ex: Auditoria prévia):** Em uma skill financeira, ela exige consultar sanções e permissões jurisdicionais ANTES sequer de invocar um MCP de pagamento ou repasse.
- Regra de Negócio como Lei.
- Log / Trilhas de auditoria: Escrever ao final um log contendo quais decisões foram tomadas de acordo com as leis instruídas.
