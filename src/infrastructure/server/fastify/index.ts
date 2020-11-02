// Dependencias externas
import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import middie from 'middie';

// Dependencias internas
import { Server } from '../server';
import { Router, routes } from '../../routes';

class ServerFastify extends Server implements Router {
  constructor () {
    super();
    this.server = <FastifyInstance>fastify({ logger: false });

    this.initMiddlewares();
    this.initRoutes();
  }

  public async start (port: number | string): Promise<void> {
    await this.server.listen(port, '0.0.0.0');
  }

  private initMiddlewares (): void {
    this.server.register(middie);
    this.server.register(async () => {
      this.server.addHook('onRequest', this.jsonMiddleware)
      this.server.use((req: any, res: any, next: any) => next())
    });
  }

  public initRoutes(): void {
    this.get();
    this.post();
  }

  private async jsonMiddleware (req: any, reply: any): Promise<void> {
    reply.json = reply.send;
  }

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
  
  public post (): void {
    this.server.post('/mutant/', routes.mutants.save);

    this.server.post('*', (req: FastifyRequest, res: FastifyReply) => {
      res.status(404);res.send
      res.send(`No se encuentra el recurso: ${req.url}`)}
    );
  }
  
}

export default ServerFastify;