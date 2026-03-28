# Obsidian Structuring Skill

**Objetivo:** Conservar e alimentar o `~/obsidian_vault` usando o Método PARA (`0_Inbox`, `1_Projects`, `2_Areas`, `3_Resources`, `4_Archives`).
**Ativação:** Requerimento expresso de aprovação do usuário ("Sim, pode salvar.").

## 1. Regras Geométricas do PARA
Você **TEM** flexibilidade para criar e modelar os caminhos, desde que não invada a hierarquia superior:
- Correto: `~/obsidian_vault/1_Projects/APP_Financeiro/requisitos.md`
- Correto: `~/obsidian_vault/1_Projects/P_Reforma_Casa.md`
- Incorreto: `~/obsidian_vault/Projetos_Novos/` (Fora da hierarquia 0,1,2,3,4).

## 2. Flexibilidade Inteligente (Tags e Folders)
- Quando estruturar um projeto, crie Tags cruzadas (ex: `#dev`, `#financas`) nativamente no *Frontmatter YAML*.
- Você tem autonomia para propor subpastas estrutais se notar que o projeto ou a área necessitam abrigar 3 ou mais anexos em breve.

## 3. Merge Criativo (Prevenção de Esmagamento de Dados)
Sempre rode `read_file` em arquivos com nomes similares ao que deseja salvar. 
- *Conflito Encontrado?* Não sobrescreva os dados preexistentes.
- *Estratégia:* Injete seu Draft JSON aprovado NO FINAL do documento existente com o cabeçalho `## Log Complementar - [Data]`. 
- Se forem notas avulsas mas correlatas, crie conexões horizontais (`[[Nome Da Nota]]`) no final delas, impedindo isolamento e perda de informação.

## 4. Hook de Escrita
Uma vez montado o Frontmatter com YAML puro e o Corpo do Texto:
1. Construa o Path local absoluto seguro (`~/obsidian_vault/...`).
2. Dispare `write_file(path, content)`.
3. Notifique o resultado (exemplo: `Arquivo P_X salvo com sucesso.`). Se for projeto, informe o Gestor no fluxo final.
