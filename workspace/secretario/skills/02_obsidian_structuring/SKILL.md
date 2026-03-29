---
name: obsidian_structuring
description: "Padroniza e salva informações validadas no Obsidian Vault (PARA Method). Requer aprovação HITL prévia."
metadata: { "openclaw": { "emoji": "🗂️", "requires": { "tools": ["read_file", "write_file"] } } }
---

# Obsidian Structuring Skill

Esta skill trata do domínio físico e governança dos seus dados vitais no Obsidian Vault. O seu objetivo é preservar o sistema **PARA Method** consistente e evitar duplicação ou corrupção.

## ATENÇÃO MÁXIMA: Regra de Deleção e Segurança (Quarentena)

- Você **NÃO TEM PERMISSÃO** sob nenhuma circunstância de apagar definitivamente um arquivo da máquina.
- **Se precisar apagar ou substituir severamente**: mova o arquivo antigo renomeando-o para dentro da pasta lixeira dedicada no Vault (`.trash/`), garantindo a recuperabilidade em caso de erro da IA.

## Instruções de Coordenação (Passo a Passo)

1. **Validação do Draft**:
   - Assegure-se de que o rascunho em memória (*Sensemaking Skill*) tem autorização expressa do usuário. Troque o `status` para adequar-se à fase atual ("active", etc).

2. **Roteamento de Diretório (PARA)**:
   - Aplique às pastas corretas:
     - Itens sem escopo maduro -> `0_Inbox/`
     - Trabalhos com entrega -> `1_Projects/`
     - Responsabilidades contínuas -> `2_Areas/`
     - Materiais estáticos de pesquisa -> `3_Resources/`
     - Itens inativos -> `.trash/` ou `4_Archives/`

3. **Verificação de Redundância (Anti-Drift)**:
   - ANTES de engajar a ferramenta `write_file`, use `read_file` no diretório mapeado para verificar nomes/arquivos preexistentes e evitar sobreposição cega.
   - Em caso de conflito, pare o robô e demande auxílio no Chat (ofereça o *merge*).

4. **Escrita Obsidian Markdown (Frontmatter + Formatação)**:
   - O Obsidian utiliza o **Obsidian Flavored Markdown**. Você DEVE utilizar as seguintes formatações no arquivo final:
     - **Wikilinks**: Utilize `[[Nome da Nota]]` ao invés de `[link](url)` para conexões internas no Vault.
     - **Callouts**: Use blocos como `> [!note]`, `> [!todo]`, `> [!warning]` para destacar informações, resumos ou decisões no texto.
     - **Embeds**: Para colocar imagens ou referências embutidas, use `![[imagem.png]]`.
   - Respeite inteiramente (sem supressão de linhas) o formato padrão obrigatório de Frontmatter e estrutura abaixo:
   ```yaml
   ---
   id: "{id}"
   source: "{source}"
   type: "{type}"
   status: "{status}"
   tags:
     - "{context_tag}"
   ---
   # {título}

   > [!info] Contexto Inicial
   > Adicione aqui em formato Callout uma breve introdução.

   {corpo_formatado_usando_wikilinks_e_markdown}
   ```
   - Efetue o `write_file` só após formatar todo o Markdown para os padrões do Obsidian (Callouts, Wikilinks, etc). Responda positivamente com o caminho alterado no final.

5. **Manutenção do Inbox Dinâmico (Obsidian Bases)**:
   - Toda vez que uma nota for salva em `0_Inbox/`, verifique se o arquivo `0_Inbox/inbox.base` já existe.
   - Se **não existir**: crie-o com o schema definido em [OBSIDIAN_BASES_INBOX.md](references/OBSIDIAN_BASES_INBOX.md).
   - O `.base` exibe automaticamente todos os rascunhos do Inbox agrupados por tipo e origem, sem necessidade de atualização manual. Não recrie o arquivo a cada operação — ele se atualiza sozinho.

## Referências

- [ROTEAMENTO_PARA.md](references/ROTEAMENTO_PARA.md) — Mapa completo de pastas PARA, todos os campos de Frontmatter permitidos e checklist de validação pré-escrita
- [WIKILINKS_EMBEDS.md](references/WIKILINKS_EMBEDS.md) — Sintaxe de Wikilinks, Embeds e padrão de links por tipo de nota
- [EXEMPLOS_NOTAS_FINAIS.md](references/EXEMPLOS_NOTAS_FINAIS.md) — Exemplos de arquivos `.md` finais prontos para salvar no Vault
- [OBSIDIAN_BASES_INBOX.md](references/OBSIDIAN_BASES_INBOX.md) — Schema `.base` para o Inbox dinâmico (filtra `status: draft`, agrupa por tipo/origem, detecta itens parados +3 dias)
