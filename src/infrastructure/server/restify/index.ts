// Dependencias externas
import restify, { Server as RestServer, plugins, Request, Response, Next } from 'restify';

// Dependencias internas
import { Server } from '../server';
import { Router, routes } from '../../routes';

/*
 * Clase representa a un servidor ServerRestify
 *
 * @extends { Server }
 * @implements { Router} 
 */
class ServerRestify extends Server implements Router {

  /*
   * Crea un ServerRestify
   */
  constructor () {
    super();

    this.server = <RestServer>restify.createServer();

    this.initMiddlewares();
    this.initRoutes();
  }

  /*
   * Inicia los middlewares
   *
   * @return { void }
   */
  private initMiddlewares (): void {
    this.server.use(plugins.bodyParser());
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
   * Manejo de rutas de metodo GET
   *
   * @return { void }
   */
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
  
  /*
   * Manejo de rutas de metodo POST
   *
   * @return { void }
   */
  public post (): void {
    this.server.post('/mutant/', routes.mutants.save);

    this.server.post('*', (req: Request, res: Response) => {
      res.status(404);
      res.send(`No se encuentra el recurso: ${req.url}`)}
    );
  }
}

export default ServerRestify;