# Guia: Integrando OpenClaw com a API Node do Actual Budget (`@actual-app/api`)

Este guia explora como a API do Actual funciona e como nossa skill será moldada para trabalhar com ela da forma mais segura.

## A Grande Diferença
A API oficial do Actual Budget **não é uma API HTTP REST tradicional**.
O Node age como um cliente que espelha as operações orçamentárias de forma local, comunicando-se com o container principal nos bastidores de forma "headless" (sem UI, como se fosse um cliente desktop oculto).

### Por Que Isso Importa Para o Nosso Agente?
Se nós simplesmente ativarmos chamadas avulsas no Node a cada requisição (uma skill A para criar conta e uma skill B para ler despesas), criaremos um caos de sincronização (`syncId`). O pacote NPM opera um download contínuo do banco de dados (SQLite modificado) para um `dataDir` local no disco da VPS.

Em decorrência disso, nossa Skill Financeira deve implementar o **padrão `Singleton`** via o arquivo proposto `actual-client.ts`. Este será o gerenciador principal do estado e orquestrará a entrada e saída do Actual.

---

## Fluxo da Sessão

Cada interação forte do agente OpenClaw deve seguir este ciclo de vida simplificado abstraído no código:

1. `actual.init(...)` // Configura a sessão para autenticar com password e url.
2. `actual.downloadBudget("sync-id")` // Traz a base de dados mais recente gravada no Coolify.
3. `Execução de Query / Mutações / Lançamentos`
4. O Actual enviará as alterações de volta ao servidor remoto por background sync após nossas ações.
5. (Opcional se formos emular stateful proxy contínuo) `actual.shutdown()`.

> [!CAUTION]
> **Bloqueio de Múltiplos Leitores/Escritores:**
> Apenas a nossa classe principal/arquivo central da skill 01 (`actual-client.ts`) importará o módulo `@actual-app/api`. Nenhuma outra skill jamais interage com banco fora daqui.

---

## Lógica das Operações Core (`actual-mappers` & Intents)

### 1. `Atualização de Budget / Saldo Disponível`
O Actual trata orçamentos como **gavetas** ("envelopes"). Para darmos a resposta de "Saldo disponível no Mês", teremos que somar categorias via `runQuery(q('transactions').filter(...))`. 
A visão gerencial que você tem na sua rotina PDF (Balanço Geral contendo Rendas, Gastos, Aquisição Pendente) será formatada num modelo gerencial Typescript construído exclusivamente por nosso mapper, já que a API expõe uma lista crua em JSON.

### 2. A Linguagem `ActualQL`
Nas entranhas da skill, a leitura dos dados usa o "ActualQL":
```js
  const { runQuery, q } = require('@actual-app/api');
  
  // Exemplo de uma query no nosso módulo para retornar saldos a pagar do mês:
  const bills = await runQuery(
    q('transactions')
      .filter({ 
        date: { $gte: '2026-03-01', $lte: '2026-03-31' },
        cleared: false // Ou tag específica para "Pendente"
      })
      .select(['date', 'amount', 'payee', 'notes'])
  );
```
O OpenClaw é livre da sintaxe AcutalQL; as intenções da skill abstraem e simplificam essa leitura no "Balanço Mensal" (`MonthOverview`).
