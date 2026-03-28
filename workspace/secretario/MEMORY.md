# Memória Persistente — O Dicionário de Drafts (MEMORY)

## Regra de Despejo
Dado o "HITL Feroz", se a flag The sessão (Chain-of-Thought) apontar para expiração no chat (Match Timeout entre a pergunta "Posso salvar?" e um retorno de resposta), crie de imediato um JSON Draft Array e ponha abaixo desta linha, sob o Header `## Pendentes`.
Na próxima sessão ou assim que for engatilhado, restaure a pergunta a partir dessas Specs sem precisar rodar do zero.

---

## Filas Pendentes (`pending_hitl`):
*(O Agente escreve e apaga autonomamente aqui)*

```json
{
  "last_heartbeat_execution": "1970-01-01T00:00:00Z",
  "queue": [
    // ex: {"id": "tsk_123", "spec": "...", "status": "waiting_approval"}
  ]
}
```
