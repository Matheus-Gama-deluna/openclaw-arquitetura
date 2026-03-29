# 10-Guias/convencoes-obisidian.md

Sempre assuma esta arquitetura ao extrair contexto das notas no seu sistema (Obsidian Root: `../Projetos/`).

## Estrutura por projeto
Cada projeto deve ter:
- `00-visao-geral.md`
- pasta `tarefas/`
- pasta `referencias/`
- pasta `notas/`
- pasta `revisoes/`

## Convenção de nomes
- Tarefas: `tar-aaaa-mm-dd-slug.md`
- Referências: `ref-aaaa-mm-dd-slug.md`
- Notas: `nota-aaaa-mm-dd-slug.md`
- Revisões: `rev-aaaa-mm-dd-semana.md`

## Regra de classificação
- `tipo_registro: tarefa` para item acionável.
- `tipo_registro: referencia` para material útil não acionável.
- `tipo_registro: nota` para observação operacional, hipótese ou registro transitório.

## Regra de projeto
- Toda tarefa profissional deve apontar para um `projeto`.
- Toda tarefa clara e pronta deve poder virar `proxima_acao`.
- **Nenhum projeto deve manter mais de 5 tarefas com `status: ativa`.**
