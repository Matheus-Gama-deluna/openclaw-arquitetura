// src/actual-client.ts
// Singleton Wrapper para o @actual-app/api com foco em estabilidade e Failover de Rede.
import api from '@actual-app/api';
import * as fs from 'fs';
import * as path from 'path';

export interface BaseOptions {
  serverURL: string;
  password?: string;
  syncId: string;
  dataDir?: string;
  e2ePassword?: string;
}

export class ActualClient {
  private static instance: ActualClient | null = null;
  private isConnected = false;
  private syncId: string;

  private constructor(syncId: string) {
    this.syncId = syncId;
  }

  // Singleton getter
  public static getInstance(syncId: string): ActualClient {
    if (!ActualClient.instance) {
      ActualClient.instance = new ActualClient(syncId);
    }
    return ActualClient.instance;
  }

  /**
   * Conecta à instância do Actual Server via Websockets e baixa o banco SQLite localmente.
   * Se os headers não derem Timeout e o Sync for sucesso: isConnected = true.
   */
  public async boot(options: BaseOptions): Promise<void> {
    if (this.isConnected) return; // Ja conectou nessa runtime

    const dataDirPath = options.dataDir || path.join(process.cwd(), '.actual-cache');
    
    // Garante que o diretorio exista
    if (!fs.existsSync(dataDirPath)) {
      fs.mkdirSync(dataDirPath, { recursive: true });
    }

    try {
      console.warn(`[ActualClient] Inicializando conexão ao servidor ${options.serverURL}...`);
      await api.init({
        serverURL: options.serverURL,
        password: options.password || '',
        dataDir: dataDirPath
      });

      console.warn(`[ActualClient] Fazendo download / cache do Sync-ID ${options.syncId}...`);
      
      const downloadOptions = options.e2ePassword ? { password: options.e2ePassword } : undefined;
      await api.downloadBudget(options.syncId, downloadOptions);

      this.isConnected = true;
      console.warn(`[ActualClient] Conectado e budget carregado com sucesso.`);
    } catch (e: any) {
      const errorMsg = e instanceof Error ? e.message : String(e);
      // Aqui determinamos se é um erro de Offline para a inteligência de falha
      console.error(`[ActualClient] ERRO GRAVE. Não foi possível conectar ao Actual Server.`);
      console.error(`- Detalhe: ${errorMsg}`);
      
      // Lança um erro customizado para o handler disparar a Queue
      throw new Error(`[ERROR_OFFLINE] Falha no bootstrap do Actual: ${errorMsg}`);
    }
  }

  /**
   * Getter seguro provendo referência ao pacote Original, caso o dev precise dele diretamente.
   */
  public getApi(): typeof api {
    if (!this.isConnected) {
      throw new Error("Você tentou acessar as APIs sem antes chamar boot()");
    }
    return api;
  }

  /**
   * Trava as dependências e solta o arquivo SQlite do Budget atual.
   * EXTREMAMENTE NECESSÁRIO EM TERMINAÇÕES COM SUCESSO.
   */
  public async shutdown(): Promise<void> {
    if (!this.isConnected) return;

    try {
      await api.shutdown();
      this.isConnected = false;
      console.warn(`[ActualClient] Conexão finalizada e lock removido.`);
    } catch (e) {
      console.error(`[ActualClient] Erro ao fechar conexão:`, e);
    }
  }
}
