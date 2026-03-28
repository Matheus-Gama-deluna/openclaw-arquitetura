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

4. **Escrita Frontmatter**:
   - Respeite inteiramente (sem supressão de linhas) o formato obrigatório abaixo:
   ```yaml
   ---
   id: "{id}"
   source: "{source}"
   type: "{type}"
   status: "{status}"
   context: "{context}"
   ---
   # {título}

   {corpo}
   ```
   - Efetue o `write_file` só após formatar. Responda positivamente com o caminho alterado no final.
