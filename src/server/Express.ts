// Dependencias externas
import express, { Express } from 'express';

// Dependencias internas
import Server from './Server';

class ServerExpress extends Server {
  constructor () {
    super();
    this.app = <Express>express();
  }

  public async start (port: Number | String): Promise<void> {
    return this.server = await this.app.listen(port);
  }
};

export default ServerExpress;