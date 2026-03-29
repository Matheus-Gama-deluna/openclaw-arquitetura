---
name: obsidian_sync_skill
description: "Lê e atualiza o Frontmatter YAML das notas de projeto no Vault Obsidian para refletir estados GTD, aprovações, e IDs remotos (Linear). Use após modificações estruturais do processamento ou após criações remotas."
metadata: {
  "openclaw": {
    "emoji": "🔄",
    "requires": {
      "tools": ["read_file", "write_file"]
    }
  }
}
disable-model-invocation: false
---

# Obsidian Sync Skill

O seu objetivo é manter a consistência física do modelo YAML das notas de tarefas e projetos (`Projetos/Gestor de Projetos/tarefas/` etc). 

## ATENÇÃO MÁXIMA: PREGUIÇA É INACEITÁVEL
- NUNCA reescreva uma nota do Obsidian apenas com o cabeçalho YAML jogando fora o corpo. Omitir campos resultará em quebra catástrófica do Vault. Leve o tempo que precisar, mas reescreva todas as chaves YAML intactas.
- **PASSO OBRIGATÓRIO:** Use a ferramenta `read_file` PRIMEIRO para capturar o corpo em Markdown integralmente.

## Instruções de Atualização (Patch YAML)
Quando for aplicar a gravação de uma nota (seja porque aprovou um processamento GTD, seja porque o Linear retornou um ID):

1. **Localização**: Veja a estrutura em `MEMORY.md` e ache o alvo.
2. **Extração**: Separe o YAML entre os marcadores `---`.
3. **Patch Seguro**:
   - Respeite o novo formato extenso de YAML (com `contextos`, `energia`, `prioridade`, `sincronizacao`, `datas`).
   - Se for update do Linear, mude:
   ```yaml
   sincronizacao:
     linear_id: "VOLTZ-123"
     status_sync: "sincronizado"
   ```
   - Se possuir divergência, crie e preencha os campos referentes e informe o usuário enviando o problema para `30-Controle/divergencias-linear.md`.
4. **Gravação**: Reúna Frontmatter + Corpo e salve. Atualize os eventos em `auditoria_local`.

## Referências

- [SCHEMA_YAML_PROJETOS.md](references/SCHEMA_YAML_PROJETOS.md) — Schema YAML completo para tarefas, referências e notas, incluindo todos os campos obrigatórios e opcionais
- [EXEMPLOS_NOTAS.md](references/EXEMPLOS_NOTAS.md) — Exemplos de notas `.md` finais prontas para o Vault (tarefa ativa, bloqueada, concluída com Linear ID)
