// Dependencias externas
import restify, { Server as RestServer } from 'restify';

// Dependencias internas
import Server from './Server';

class ServerRestify extends Server {
  constructor () {
    super();
    this.server = <RestServer>restify.createServer();
  }

  public async start (port: Number | String): Promise<void> {
    return await this.server.listen(port);
  }

};

export default ServerRestify;