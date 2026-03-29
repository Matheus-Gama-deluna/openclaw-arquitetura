// src/cli.ts
// Entrypoint unificado que o agente "Guardião" executa.
import { ActualClient } from './actual-client.ts';
import type { CliResponse, TransactionPayload } from './domain/types.ts';
import { handleVisaoGeralMes } from './handlers/overview.ts';
import { handleRegistrarTransacao } from './handlers/transaction.ts';
import { parseArgs } from 'util';

const CONFIG = {
  serverURL: process.env.ACTUAL_SERVER_URL || 'http://localhost:5006',
  password: process.env.ACTUAL_PASSWORD || 'sua-senha-aqui',
  syncId: process.env.ACTUAL_SYNC_ID || '1cfdbb80-6274-49bf-b0c2-737235a4c81f', 
};

function reportOutput(response: CliResponse<any>) {
  console.log(JSON.stringify(response, null, 2));
  process.exit(response.success ? 0 : 1);
}

async function main() {
  const { values } = parseArgs({
    args: Bun.argv,
    options: {
      intent: { type: 'string' },
      payload: { type: 'string' }, // String passada pelo Agente em JSON escappado
      month: { type: 'string' },   // Parâmetro helper YYYY-MM
      account: { type: 'string' }, // Parâmetro helper "Nubank"
    },
    strict: true,
    allowPositionals: true,
  });

  if (!values.intent) {
    reportOutput({
      success: false,
      intent: 'NONE',
      error: 'Agumento --intent ausente. O Agente deve especificar a intenção.',
      failover_required: false
    });
    return;
  }

  const client = ActualClient.getInstance(CONFIG.syncId);

  try {
    await client.boot({
      serverURL: CONFIG.serverURL,
      password: CONFIG.password,
      syncId: CONFIG.syncId
    });

    const apiManager = client.getApi();
    let outputData: any = {};

    switch (values.intent) {
      case 'visao_geral_mes':
        // Expects --month
        const targetMonth = values.month || new Date().toISOString().slice(0, 7);
        outputData = await handleVisaoGeralMes(apiManager, targetMonth);
        break;

      case 'registrar_transacao':
        // Expects --payload
        if (!values.payload || !values.account) {
           throw new Error("Transações requerem --payload JSON e nome de --account");
        }
        const parseablePayload: TransactionPayload = JSON.parse(values.payload);
        outputData = await handleRegistrarTransacao(apiManager, parseablePayload, values.account);
        break;

      default:
        throw new Error(`Intent '${values.intent}' não implementado ou em desenvolvimento.`);
    }

    await client.shutdown();
    
    reportOutput({
      success: true,
      intent: values.intent,
      data: outputData,
      failover_required: false
    });

  } catch (err: any) {
    const errorString = err instanceof Error ? err.message : String(err);
    const isOffline = errorString.includes('[ERROR_OFFLINE]');
    
    reportOutput({
      success: false,
      intent: values.intent || 'UNKNOWN',
      error: errorString,
      failover_required: isOffline
    });
  }
}

main().catch((e) => {
  console.error("Erro critico de runtime nao tratado:", e);
  process.exit(1);
});
