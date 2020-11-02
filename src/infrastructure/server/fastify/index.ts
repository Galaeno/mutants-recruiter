// Dependencias externas
import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import middie from 'middie';

// Dependencias internas
import { Server } from '../server';
import { Router, routes } from '../../routes';

/*
 * Clase representa a un servidor ServerFastify
 *
 * @extends { Server }
 * @implements { Router} 
 */
class ServerFastify extends Server implements Router {

  /*
   * Crea un ServerFastify
   */
  constructor () {
    super();
    this.server = <FastifyInstance>fastify({ logger: false });

    this.initMiddlewares();
    this.initRoutes();
  }

  /*
   * Inicia un servidor
   *
   * @param { number | string } port - Puerto al cual conectarse
   *
   * @return { Promise<void> }
   */
  public async start (port: number | string): Promise<void> {
    await this.server.listen(port, '0.0.0.0');
  }

  /*
   * Inicia los middlewares
   *
   * @return { void }
   */
  private initMiddlewares (): void {
    this.server.register(middie);
    this.server.register(async () => {
      this.server.addHook('onRequest', this.jsonMiddleware)
      this.server.use((req: any, res: any, next: any) => next())
    });
  }

  /*
   * Inicia las rutas
   *
   * @return { void }
   */
  public initRoutes(): void {
    this.get();
    this.post();
  }

  /*
   * Middleware para crear la propiedad json
   *
   * @param { FastifyRequest } req - Peticion del cliente
   * @param { FastifyReply } res - Respuesta al cliente
   *
   * @return { Promise<void> }
   */
  private async jsonMiddleware (req: any, reply: any): Promise<void> {
    reply.json = reply.send;
  }

  /*
   * Manejo de rutas de metodo GET
   *
   * @return { void }
   */
  public get (): void {
    this.server.get('/stats', routes.stats.get);

    // Raiz
    this.server.get('/', (req: FastifyRequest, res: FastifyReply) => {
      res.send({
        isOnline: true
      })
    });

    // Resto de rutas
    this.server.get('*', (req: FastifyRequest, res: FastifyReply) => {
      res.status(404);
      res.send(`No se encuentra el recurso: ${req.url}`)}
    );
  }
  
  /*
   * Manejo de rutas de metodo POST
   *
   * @return { void }
   */
  public post (): void {
    this.server.post('/mutant/', routes.mutants.save);

    this.server.post('*', (req: FastifyRequest, res: FastifyReply) => {
      res.status(404);res.send
      res.send(`No se encuentra el recurso: ${req.url}`)}
    );
  }
  
}

export default ServerFastify;