// Dependencias externas
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';

// Dependencias internas
import { Server } from '../server';
import { Router, routes } from '../../routes';


class ServerExpress extends Server implements Router {
  public app: Express;

  constructor () {
    super();
    this.app = express();
    this.initMiddlewares();
    this.initRoutes();
  }

  public async start (port: number | string): Promise<void> {
    this.server = await this.app.listen(port);
  }

  private initMiddlewares (): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  public initRoutes(): void {
    this.get();
    this.post();
  }

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
  
  public post (): void {
    this.app.post('/mutant/', routes.mutants.save);

    this.app.post('*', (req: Request, res: Response) => {
      res.status(404);
      res.send(`No se encuentra el recurso: ${req.url}`)}
    );
  }
}

export default ServerExpress;