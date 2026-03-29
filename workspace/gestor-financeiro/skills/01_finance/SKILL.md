---
name: "Gestor Financeiro - Integração NodeJS [Actual]"
version: "1.0.0"
description: "Módulo principal sem WebGateway. O proxy NodeJS efetua o parse interativo de inteligência conversacional do OpenClaw direto para o pacote @actual-app/api."
---

# 01_finance: Integração "Bare Metal" ao Actual Budget

Esta skill atua como o **Adapter Financeiro Primário** ("Faixada") do OpenClaw. Em vez de utilizar microserviços em Gateway HTTP, o OpenClaw despacha solicitações internamente para chamadas diretas Node.js que se conectam ao container do `Actual Budget` via Coolify. 

Isto consolida uma arquitetura segura de "Single Writer" (único escritor no banco para evitar anomalias de acesso). 

## A Lógica "Guardião do Mês"
O módulo carrega lógicas operacionais de domínio (Receitas, Gastos Realizados, Valores a Pagar, Receita Restante) espelhando a planilha pessoal do usuário e subtraindo os "Cofres/Caixinhas" do seu "Saldo Disponível".

Para os **Cartões de Crédito**, a skill leva em consideração os dias de Fechamento da fatura contra o dia da compra: compras efetuadas em dias pós-fechamento são jogadas automaticamente para o mês sequencial.

## Intents Implementados

Abaixo listamos as sete competências (`intents`) centrais operáveis que refletem o planejamento natural no fluxo financeiro:

1. **`planejar_mes`**: Auxilia na elaboração primária do plano, receitas projetadas vs gastos fixos/variáveis, além de instanciar cofres ou potes de reserva.
2. **`visao_geral_mes`**: Retorna os totais globais `(Receita do mês, Gasto atual, Pago, Pendentes/A Pagar, Caixas Reservadas e Valor Disponível calculável)`.
3. **`registrar_transacao`**: Intent acionável para inputs (tipo, valor, data, conta, status). Aplica as regras do `Cartão de crédito` com base na data do registro x corte da fatura. Exibe um resumo pedindo **permissão antes de lançar**.
4. **`ver_saldos_por_conta`**: Segmentos separados por métodos (dinheiro, crédito, saldos travados em cofres).
5. **`acompanhar_dia_a_dia`**: Respostas proativas ou sob demanda orientando as decisões diárias ("já gastou X hoje", etc).
6. **`analise_proativa`**: Um job de escrutínio. Dispara alertas no budget, sugerindo adaptações com as devidas explicações contábeis.
7. **`gerir_reservas_e_caixinhas`**: Modifica os saldos entre as carteiras "Ativas" e "Reservas", protegendo o capital sem poluir o "Available to Spend".

## Resiliência e Failover

Se o container principal do Actual server ficar offline, a skill deverá criar filas seguras (`Local Queue`) logando os *Intents*, além de reportar e orientar o usuário sobre a falha temporária.
