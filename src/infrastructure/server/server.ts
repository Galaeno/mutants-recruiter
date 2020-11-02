// Dependencias externas
import { Server as httpServer } from 'http';

/*
 * Clase Server
 */
export class Server {
  public server: any;

  public async start (port: number | string): Promise<void> {
    await this.server.listen(port);
  }

  public close (): httpServer {
    return this.server?.close();
  }
}

/*
 * createServer
 */
export const createServer = (server: string): Server => {
  try {
    const { default: ServerClass } = require(`./${server}`);
    return new ServerClass();
  } catch (err) {
    throw new Error(`No se pudo crear el servidor: ${err.message}`);
  }
};