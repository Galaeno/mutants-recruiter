// Dependencias externas
import { Server as httpServer } from 'http';

/*
 * Clase representa a un Servidor
 */
export class Server {
  public server: any;

  /*
   * Inicia un servidor
   *
   * @param { number | string } port - Puerto al cual conectarse
   *
   * @return { Promise<void> }
   */
  public async start (port: number | string): Promise<void> {
    await this.server.listen(port);
  }

  /*
   * Finaliza el servidor
   *
   * @return { httpServer } - Información del servidor finalizado
   */
  public close (): httpServer {
    return this.server?.close();
  }
}

/*
 * Crea la instancia del servidor a utilizar en base a lo que se encuentre en configuración
 *
 * @param { string } server - Nombre del Server a utilizar
 *
 * @return { Server } - Retorna la instancia del Servidor a utilizar
 */
export const createServer = (server: string): Server => {
  try {
    const { default: ServerClass } = require(`./${server}`);
    return new ServerClass();
  } catch (err) {
    throw new Error(`No se pudo crear el servidor: ${err.message}`);
  }
};