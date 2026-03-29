import { expect, test, describe } from "bun:test";
import { applyCreditCardRules, toActualInteger, toUserFloat } from "../../src/domain/business.ts";

describe("Regras de Fechamento de Cartão de Crédito", () => {
  test("Deve pular mês para compras feitas no dia do fechamento + 1", () => {
    // Fatura fecha dia 25. Compra dia 26/03/2026 => Joga conta para o dia 01/04/2026.
    const purchaseDate = "2026-03-26";
    const result = applyCreditCardRules(purchaseDate, true, 25);
    expect(result).toBe("2026-04-01");
  });

  test("Deve manter a data se feita antes ou no dia exato do fechamento", () => {
    // Se a fatura fecha dia 25, gastos dia 25 ainda contam pro mês vigente.
    const purchaseDate = "2026-03-25";
    const result = applyCreditCardRules(purchaseDate, true, 25);
    expect(result).toBe("2026-03-25");
  });

  test("Não deve alterar datas independente do dia se for uma Conta Corrente", () => {
    // isCreditCard = false
    const purchaseDate = "2026-03-26";
    const result = applyCreditCardRules(purchaseDate, false, 25);
    expect(result).toBe("2026-03-26");
  });
});

describe("Conversores Financeiros do Atual Budget", () => {
  test("Garante que Float -> Integer evite dízimas JS (floating point traps)", () => {
    expect(toActualInteger(15.5)).toBe(1550);
    expect(toActualInteger(-14.33)).toBe(-1433);
    // Verificando os JS traps base: 0.1 + 0.2 
    expect(toActualInteger(parseFloat((0.1 + 0.2).toFixed(2)))).toBe(30); 
  });

  test("Integer -> Float reverte para visão humana com perfeição", () => {
    expect(toUserFloat(-1433)).toBe(-14.33);
  });
});
