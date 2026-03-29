// src/domain/business.ts
// Lógicas de negócios exclusivas do Guardião do Mês

/**
 * Aplica a regra de negócio de cartões de crédito:
 * Se a compra foi feita após o dia de fechamento da fatura,
 * empurramos a transação para o mês seguinte (Ex: dia 1 do próximo mês)
 * para que o orçamento atual (Available to Spend) não seja penalizado imediatamente.
 */
export function applyCreditCardRules(
  originalDateStr: string, // YYYY-MM-DD
  isCreditCard: boolean,
  closingDay: number = 25 // Padrão
): string {
  if (!isCreditCard) return originalDateStr;

  const date = new Date(originalDateStr);
  const day = date.getUTCDate();

  if (day > closingDay) {
    // Muda pro mês seguinte, dia 1 (ou mantém o dia, depende da preferência contábil, mas dia 1 amarra na fatura nova)
    const nextMonthDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1));
    return nextMonthDate.toISOString().split('T')[0];
  }

  return originalDateStr;
}

/**
 * Converte Float tradicional do usuário para Format Integer do Actual Budget.
 * Ex: R$ 123.45 => 12345
 */
export function toActualInteger(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Converte Format Integer do Actual Budget para Float de Leitura.
 * Ex: 12345 => R$ 123.45
 */
export function toUserFloat(integerAmount: number): number {
  return integerAmount / 100;
}
