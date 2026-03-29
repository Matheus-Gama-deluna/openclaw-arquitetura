import { expect, test, describe } from "bun:test";

describe("CLI Entrypoint e Proteções de Failover (E2E Fake)", () => {
  
  test("Intent ausente deve abortar com JSON estruturado avisando erro", async () => {
    // Invocamos CLI sem os parâmetros obrigatórios `--intent` via Subprocesso Bun
    const proc = Bun.spawn([process.execPath, "run", "src/cli.ts"], {
      cwd: "./",
      stdout: "pipe",
    });
    const result = await new Response(proc.stdout).text();
    const json = JSON.parse(result);
    
    expect(json.success).toBe(false);
    expect(json.intent).toBe("NONE");
    expect(json.error).toContain("Agumento --intent ausente");
  });

  test("Simulação de Falha do Server Offline (Timeout) deve exigir obrigatoriamente Failover (MEMORY.md)", async () => {
    // Executa CLI mandando pra uma URL localhost invalida com dados falsos.
    // Assim o @actual-app/api vai falhar ao baixar o SQLite.
    // O Singleton deve processar o erro de Fetch e cuspir [ERROR_OFFLINE] convertendo pra failover_required = true
    const proc = Bun.spawn([process.execPath, "run", "src/cli.ts", "--intent=visao_geral_mes"], {
      cwd: "./",
      env: { 
        ...process.env, 
        ACTUAL_SERVER_URL: "http://localhost:9999", 
        ACTUAL_PASSWORD: "fake",
        ACTUAL_SYNC_ID: "fake"
      },
      stdout: "pipe",
    });

    const result = await new Response(proc.stdout).text();
    const json = JSON.parse(result.trim());
    
    expect(json.success).toBe(false);
    expect(json.failover_required).toBe(true);  // Chave critica de funcionamento e seguranca da skill
    expect(json.error).toContain("[ERROR_OFFLINE]"); 
  });
});
