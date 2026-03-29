# Referência de Wikilinks e Estrutura de Links — Obsidian Structuring

Este arquivo define como o agente deve criar **conexões internas** no Vault ao escrever qualquer nota final no Obsidian.

## Regra Principal

> **NUNCA use links Markdown padrão `[texto](caminho)` para notas internas do Vault.**  
> Use **sempre** a sintaxe de Wikilink: `[[Nome da Nota]]`

O Obsidian rastreia automaticamente wikilinks — se a nota for renomeada, todos os links são atualizados. Links Markdown padrão quebram.

---

## Sintaxe de Wikilinks

```markdown
[[Nome da Nota]]                       Link simples
[[Nome da Nota|Texto de Exibição]]     Link com texto customizado
[[Nome da Nota#Seção]]                 Link para uma seção específica
[[Nome da Nota#^block-id]]             Link para um bloco específico
[[#Seção na mesma nota]]               Link interno (mesma nota)
```

---

## Padrão de Links no Sistema PARA

Ao criar ou editar uma nota, conecte-a sempre às notas do seu "ecossistema":

### Links Obrigatórios por Tipo

**Para `type: action`** → linkar ao projeto pai:
```markdown
## Contexto

Esta ação faz parte de [[1_Projects/Nome do Projeto]].
```

**Para `type: project`** → linkar à área responsável:
```markdown
## Área Responsável

Vinculado a [[2_Areas/Dev/Backend]] e [[2_Areas/Finanças]].
```

**Para `type: reference`** → linkar aos projetos/áreas que usam:
```markdown
## Usado em

- [[1_Projects/Landing Page OpenClaw]]
- [[2_Areas/Dev/Estudo Contínuo]]
```

**Para `type: idea`** → linkar ao possível destino:
```markdown
## Possível Destino

- Transformar em [[1_Projects/Finance Bot]] (se aprovada)
```

---

## Links para Áreas do Vault

Use sempre estes caminhos padrão ao criar referências:

| Destino | Caminho de Wikilink |
|---------|---------------------|
| Projetos ativos | `[[1_Projects/Nome]]` |
| Área de Dev | `[[2_Areas/Dev/Nome]]` |
| Área de Finanças | `[[2_Areas/Finanças/Nome]]` |
| Área OpenClaw | `[[2_Areas/OpenClaw/Nome]]` |
| Recursos de referência | `[[3_Resources/Categoria/Nome]]` |
| Notas diárias | `[[Daily Notes/YYYY-MM-DD]]` |

---

## Embeds (Conteúdo Embutido)

Para incorporar conteúdo de outras notas **dentro** de uma nota:

```markdown
![[Nome da Nota]]                      Embed nota completa
![[Nome da Nota#Seção]]               Embed só a seção
![[Nome da Nota#^block-id]]           Embed só o bloco
![[imagem.png]]                        Embed imagem local
![[imagem.png|400]]                    Embed imagem com largura
![[documento.pdf#page=2]]             Embed página específica de PDF
```

### Quando usar Embeds

- **Embed de seção** → Quando uma action referencia o escopo de um projeto sem copiar tudo
- **Embed de bloco** → Para reutilizar um snippet de decisão de outra nota
- **Embed de imagem** → Anexos capturados pelo Secretário (screenshots, fotos)

---

## IDs de Bloco (Block IDs)

Para criar links para um parágrafo específico, adicione `^id-do-bloco` após o texto:

```markdown
Esta é uma decisão importante que tomamos em reunião. ^decisao-reuniao-jan

<!-- Em outra nota, você pode linkar diretamente: -->
Ver [[Nota de Reunião#^decisao-reuniao-jan]]
```

Regras de IDs de bloco: apenas letras, números e hífens. Sem espaços.
