# Funções Autônomas do Guardião do Mês

## Gatilhos e Observabilidade

O Agente Financeiro atua em um formato híbrido, respondendo ativamente a comandos em linguagem natural e processando varreduras de retaguarda (Background Cronjobs) via suas Skills operacionais.

*(Atualização: O loop infinito do OpenClaw possui cronjobs que ativam o Guardião do Mês de forma autônoma para que ele verifique discrepâncias, limites prestes a estourar, aprovação de lançamentos diários agendados e avisos sobre vencimentos de fatura.)*

## Verificações Proativas
1. **Auditoria Diária**: Lê as faturas pendentes da fatura e o "Available To Spend".
2. **Sincronização Forçada (`sincronizar_dados`)**: Regulariza qualquer fila local (`Local Queue`) que estava offline contra o _Actual Budget_.
3. **Análise Proativa (`analise_proativa`)**: Avaliações semanais e mensais da saúde financeira (handoff para o usuário ao fechar uma análise grave ou sugestiva).
