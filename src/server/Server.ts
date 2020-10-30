// Dependencias externas
import { Server as httpServer } from 'http';

class Server {
  public app: any;
  public server: any;

  constructor () {
    this.initMiddlewares();
    this.initRoutes();
  }

  private initMiddlewares (): void {}

  private initRoutes (): void {}

  public async start (port: Number | String): Promise<void> {}

  public close (): httpServer {
    return this.server?.close();
  }
};

export default Server;

export const createServer = (server: string): any => {
  try {
    const { default: ServerClass } = require(`./${server}`);

    return new ServerClass();
  } catch (err) {
    throw new Error(`No se pudo crear el servidor: ${err.message}`);
  }
};