// src/handlers/overview.ts
import type { MonthOverview } from '../domain/types.ts';
import { toUserFloat } from '../domain/business.ts';

export async function handleVisaoGeralMes(
  apiManager: any, 
  monthTarget: string
): Promise<MonthOverview> {
  // 1. Coleta metadados agrupados do mes
  const budget = await apiManager.getBudgetMonth(monthTarget);
  // O formato budget contém { month, income, expenseCategories, etc. }
  // O ActualQL retorna sub-arrays, a tipagem oficial pode diferir, 
  // mas vamos encapsular um loop sobre categoryGroups retornados
  
  let totalIncomeInteger = budget.income || 0;
  let totalSpentInteger = 0;
  let totalReservedInteger = 0; // Quantia congelada (Cofres)

  // Iterar nas categorias pra separar despesas comuns de "Cofres/Reservas"
  if (budget.categoryGroups) {
    for (const group of budget.categoryGroups) {
      // Regra de Ouro Guardião: O grupo chama 'Reservas', 'Cofres' ou 'Caixinhas'
      const isCofre = /cofre|reserva|caixinha/i.test(group.name);
      
      for (const cat of group.categories) {
        if (isCofre) {
          totalReservedInteger += (cat.balance || 0); // O balance no mês
        } else {
          totalSpentInteger += (cat.spent || 0);
        }
      }
    }
  }

  const income = toUserFloat(totalIncomeInteger);
  const spent = Math.abs(toUserFloat(totalSpentInteger));
  const reserved = toUserFloat(totalReservedInteger);

  // Available to Spend = Income - Spent - Reserved
  // Observação: Dependendo se o Actual trata income/spent como negativo nativamente 
  // aqui tratamos tudo como absoluto pra clareza do humano.
  const availableToSpend = income - spent - reserved;

  let status: 'ANALYSIS_OK' | 'WARNING_OVERBUDGET' = 'ANALYSIS_OK';
  if (availableToSpend < 0) {
    status = 'WARNING_OVERBUDGET';
  }

  return {
    month: monthTarget,
    income,
    spent,
    availableToSpend,
    status
  };
}
