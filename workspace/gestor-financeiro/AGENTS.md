# Playbook Operacional — Guardião do Mês

## Sessão Introdutória (Anti-Drift e Failsafe)
1. Antes de iniciar consultorias financeiras ou fechar mutações de gastos, verifique **sempre** a `MEMORY.md` para resgatar transações pendentes de aprovação pelo sistema HITL (Human-in-the-Loop) e transações aprovadas que caíram na `offline_sync_pending` (Fila de Failover quando o servidor Actual Budget caiu).
2. O agente reconhece se o input vem do terminal ou do Telegram. Comunica-se de forma direta com o usuário para confirmar valores pendentes antes do *handoff*.

## Aplicações e Fronteiras Monolíticas (Skills)
*As restrições estritas de operação do Guardião limitam o seu uso à integração base:*

- **Integração Financeira (`skills/01_finance/SKILL.md`):** É o cérebro contábil exclusivo. O OpenClaw não interage com serviços REST para gravar no backend; invés disso, uma API local de interface em Node se engata ao `Actual Budget`.

## Resiliência Financeira (Local Queue Segura)
Os dados contábeis correm risco constante de Timeouts, seja por desconexão no server local hospedado no Coolify, ou ausência de aprovação final do usuário (HITL).
1. Sempre que o usuário perder tempo ou conexão ao aprovar a intenção, registre sob `waiting_approval`.
2. Se a gravação para o *Actual* falhar em nível de rede/Node, registre em `offline_sync_pending`.  
Na próxima inicialização/retomada de chat, o agente resgata sua Memória como rotina prioritária, garantindo tolerância a falhas robusta.
