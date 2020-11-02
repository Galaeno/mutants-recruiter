// Dependencias externas
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';

// Dependencias internas
import { Server } from '../server';
import { Router, routes } from '../../routes';

/*
 * Clase representa a un servidor ServerExpress
 *
 * @extends { Server }
 * @implements { Router} 
 */
class ServerExpress extends Server implements Router {
  public app: Express;

  /*
   * Crea un ServerExpress
   */
  constructor () {
    super();
    this.app = express();
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
    this.server = await this.app.listen(port);
  }

  /*
   * Inicia los middlewares
   *
   * @return { void }
   */
  private initMiddlewares (): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
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
    this.app.get('/stats', routes.stats.get);

    // Raiz
    this.app.get('/', (req: Request, res: Response) => {
      res.json({
        isOnline: true
      })
    });

    // Resto de rutas
    this.app.get('*', (req: Request, res: Response) => {
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
    this.app.post('/mutant/', routes.mutants.save);

    this.app.post('*', (req: Request, res: Response) => {
      res.status(404);
      res.send(`No se encuentra el recurso: ${req.url}`)}
    );
  }
}

export default ServerExpress;