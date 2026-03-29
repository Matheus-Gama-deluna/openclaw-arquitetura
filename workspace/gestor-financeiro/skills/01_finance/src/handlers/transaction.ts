// src/handlers/transaction.ts
import type { TransactionPayload } from '../domain/types.ts';
import { applyCreditCardRules, toActualInteger } from '../domain/business.ts';

/**
 * Processa a intenção de incluir uma nova mutação na base (Despesa ou Receita).
 * Resolve por Nome da Conta e usa o importTransactions() para deduping seguro.
 */
export async function handleRegistrarTransacao(
  apiManager: any,
  payload: TransactionPayload,
  accountNameOrId: string // O LLM pode mandar o nome "Nubank" ou o ID bruto
): Promise<any> {
  const accounts = await apiManager.getAccounts();
  const payees = await apiManager.getPayees();

  // 1. Resolve a Account ID
  const targetAccount = accounts.find((acc: any) => 
    acc.id === accountNameOrId || acc.name.toLowerCase() === accountNameOrId.toLowerCase()
  );

  if (!targetAccount) {
    throw new Error(`Conta informada '${accountNameOrId}' não encontrada no Actual Budget.`);
  }

  // Se a conta for definida como "credit" (offbudget, etc) no banco
  const isCreditCard = targetAccount.type === 'credit';
  
  // 2. Resolve a Regra de Negócio Mensal da Transação
  const processedDate = applyCreditCardRules(payload.date, isCreditCard, 25);

  // 3. Monta o Objeto transacional cru
  // 'payee_name' no create vai criar caso nao exista, de forma headless
  const rawTransaction: any = {
    account: targetAccount.id,
    date: processedDate,
    amount: toActualInteger(payload.amount),
    payee_name: payload.payee_name,
    cleared: payload.cleared || false,
  };

  if (payload.notes) {
    rawTransaction.notes = payload.notes;
  }
  if (payload.category_id) {
    rawTransaction.category = payload.category_id;
  }

  // 4. Injeta via Import (Padrão ouro do @actual-app/api pra evitar dupes e respeitar regras criadas na Interface)
  const resultIds = await apiManager.importTransactions(targetAccount.id, [rawTransaction]);

  return {
    success: true,
    message: `Transação de ${payload.amount} para ${payload.payee_name} registrada com segurança.`,
    modifiedDate: processedDate !== payload.date ? processedDate : undefined,
    isCreditCardRuleApplied: processedDate !== payload.date,
    transactionIds: resultIds
  };
}
