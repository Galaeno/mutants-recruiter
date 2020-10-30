// Dependencias externas
import fastify, { FastifyInstance } from 'fastify';

// Dependencias internas
import Server from './Server';

class ServerFastify extends Server {
  constructor () {
    super();
    this.server = <FastifyInstance>fastify({ logger: false });
  }

  public async start (port: Number | String): Promise<void> {
    return await this.server.listen(port, '0.0.0.0');
  }
};

export default ServerFastify;