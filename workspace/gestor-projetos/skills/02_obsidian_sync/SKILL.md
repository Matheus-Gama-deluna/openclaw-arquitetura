---
name: obsidian_sync_skill
description: "Lê e atualiza o Frontmatter YAML das notas de projeto no Vault Obsidian para incluir propriedades do Linear (ex: linear_sync e progress). Use IMEDIATAMENTE após criar entidades usando a Linear Worker Skill ou quando o Heartbeat identificar avanço de progresso de Sprints."
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

O seu objetivo é manter a consistência bidirecional ("O Elo") entre o Linear e as anotações do cofre Obsidian (`1_Projects/`), garantindo que os painéis (Dashboards) em Markdown visualizados pelo Matheus estejam sempre precisos e vivos.

## CRÍTICO: Regra de Preservação e Risco de Perda de Dados
- NUNCA reescreva uma nota do Obsidian apenas com o cabeçalho YAML.
- **PASSO OBRIGATÓRIO:** Você deve usar a ferramenta `read_file` PRIMEIRO no caminho do projeto para capturar o corpo de texto existente. Só depois você pode usar a ferramenta `write_file` com o arquivo completo.

## Instruções de Sincronização (Passo a Passo)

1. **Localização do Alvo**:
   - Descubra qual arquivo em `1_Projects/` é a semente do seu projeto atual. Use a tabela no `MEMORY.md` caso necessite lembrar o caminho.

2. **Leitura e Extração**:
   - Utilize `read_file` no caminho. Extraia cuidadosamente todo o bloco YAML localizado entre os marcadores `---` e `---` no topo, e preserve todo o texto abaixo do segundo `---`.

3. **Injeção de Metadados (O Elo)**:
   - Adicione ou atualize chaves críticas que conversam com o Linear. Se não existirem, crie-as:
   ```yaml
   ---
   # (mantenha os id, type, status originais)
   linear_sync: "VOLTZ-EP-10"   # ID principal do Epic ou Issue-Pai
   linear_team: "VOLTZ"         # Time/Projeto correspondente
   progress: 35                 # Se souber a % de conclusão, insira de 0 a 100
   ---
   ```

4. **Gravação**:
   - Reconstrua o texto (Frontmatter alterado + Corpo inalterado) e envie com `write_file`.
   - Adicione o link mapeado na sua tabela interna no arquivo `MEMORY.md` para evitar varreduras futuras lentas.
