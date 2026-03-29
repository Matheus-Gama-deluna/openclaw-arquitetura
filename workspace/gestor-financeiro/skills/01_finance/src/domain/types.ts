// src/domain/types.ts

// Tipos de Input Genéricos (Payload do CLI)
export interface TransactionPayload {
  date: string;         // YYYY-MM-DD
  amount: number;       // Valor em float (ex: 15.50 para gasto, -1500 pra receita) -> Atenção as regras de sinal do Actual.
  payee_name: string;   // Destino (Ex: Padaria, Restaurante)
  category_id?: string; // Opcional se for para aprender
  notes?: string;
  cleared: boolean;     // Padrão geralmente false, a menos que conciliado na hora
}

// Respostas Retornáveis Globais ao OpenClaw
export interface MonthOverview {
  month: string;           // YYYY-MM
  income: number;          // Total que entrou
  spent: number;           // Total que já saiu das categorias do budget
  availableToSpend: number; // Saldo calculado pelo Guardião (Receita - Gasto - Cofres)
  status: 'ANALYSIS_OK' | 'WARNING_OVERBUDGET';
}

export interface CliResponse<T> {
  success: boolean;
  intent: string;
  data?: T;
  error?: string;
  failover_required?: boolean; // Booleano sinalizando Agente salvar a fila Local (MEMORY.md)
}
