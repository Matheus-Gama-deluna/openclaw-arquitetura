# Memória Persistente Estrita — Area de Rascunhos Financeiros (MEMORY.md)

## Regra de Despejo e Enfileiramento Digno (Local Queue)
Finanças exigem tolerância zero a falhas. Sempre que houver uma lacuna de execução com o container primário do banco ou inação humana (HITL), preserve o rascunho com o formato JSON. 

Esta é sua fila de contingência (uma Queue Offline). 
- Caso o usuário inicie um lançamento sensível e perca a conexão (ou expire sessão), rotule-o como `"status": "waiting_approval"`.
- Caso o usuário *aprove*, porém a API nativa NodeJS não obtenha resposta HTTP 200 do seu container Actual (serviço offline/VPS lenta), rotule como `"status": "offline_sync_pending"`.

Escaneie este arquivo em sua sessão de _startup_ diária ou _wake_ de nova mensagem enviada, com o intuito primário de regularizar dívidas pendentes contábeis enfileiradas.

---

## Filas Pendentes (`pending_transactions`):

```json
{
  "last_recovery": "1970-01-01T00:00:00Z",
  "queue": [
    // ex 1: {"amount": -150.00, "category": "Lazer", "date": "2026-03-28", "status": "waiting_approval"}
    // ex 2: {"amount": 2000.00, "category": "Salário", "date": "2026-03-28", "status": "offline_sync_pending"}
  ]
}
```
