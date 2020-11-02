// Dependencias externas
import restify, { Server as RestServer, plugins, Request, Response, Next } from 'restify';

// Dependencias internas
import { Server } from '../server';
import { Router, routes } from '../../routes';

class ServerRestify extends Server implements Router {
  constructor () {
    super();

    this.server = <RestServer>restify.createServer();

    this.initMiddlewares();
    this.initRoutes();
  }

  private initMiddlewares (): void {
    this.server.use(plugins.bodyParser());
  }
  
  public initRoutes(): void {
    this.get();
    this.post();
  }

  public get (): void {
    this.server.get('/stats', (req: Request, res: Response, next: Next) => {
      req.query = req.query()
      next();
    }, routes.stats.get);

    // Raiz
    this.server.get('/', (req: Request, res: Response) => {
      res.json({
        isOnline: true
      })
    });

    // Resto de rutas
    this.server.get('*', (req: Request, res: Response) => {
      res.status(404);
      res.send(`No se encuentra el recurso: ${req.url}`)}
    );
  }
  
  public post (): void {
    this.server.post('/mutant/', routes.mutants.save);

    this.server.post('*', (req: Request, res: Response) => {
      res.status(404);
      res.send(`No se encuentra el recurso: ${req.url}`)}
    );
  }
}

export default ServerRestify;