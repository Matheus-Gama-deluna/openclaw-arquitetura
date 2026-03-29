# Próximos Passos (Fases 3, 4 e 5)

Até o momento, a espinha dorsal (conexão Segura Node, Types, Visão de Saldo e Injeção de Compras) está finalizada. Analisando os 7 *intents* propostos no nosso sistema para que o **Guardião do Mês** seja 100% autônomo, faltam 5 rotas de ação.

## Fase 3: Consultas Analíticas (Leitura Avançada)
1. **`ver_saldos_por_conta.ts`**: Baterá no `api.getAccounts()`, iterando as contas para separar e cruzar os `.balance` entre `depository` (dinheiro real/checking) e `credit` (cartões), entregando os saldos reais em vez de apenas o total do mês.
2. **`acompanhar_dia_a_dia.ts`**: Utilizará o `.runQuery()` do `ActualQL` para filtrar apenas transações lançadas hoje/esta semana, agrupadas, alertando a velocidade do gasto vs limite remanescente do mês.
3. **`analise_proativa.ts`**: O "Hacker Fiscal" interno. Irá iterar a fundo o `getBudgetMonth`, checando as "despesas vs receita orçada". Se categorias excederem limiares, dispara flags vermelhas automáticas.

## Fase 4: Manipulações de Orçamento (Escrita Complexa)
4. **`gerir_reservas_e_caixinhas.ts`**: Intent para alavancar fundos para as "Caixinhas/Cofres" usando `setBudgetAmount`.
5. **`planejar_mes.ts`**: Script de Bootstrap mensal limitador. Lê inputs do Telegram e molda provisões usando `setBudgetAmount`.

## Fase 5: Setup Físico
6. Criar `.env` e rodar `bun install` físico.
7. TestDrive de injeção direta.
