import { createServer } from '../../src/server/Server';
import ServerFastify from '../../src/server/Fastify';

const PORT: number = 3000;

describe('Servidor Fastify', () => {
  it('Valida inicio del servidor', async (done: any) => {
    let fastify: ServerFastify = new ServerFastify();
    try {
      const response = await fastify.server.inject({ method: "GET", url: "/" });
      expect(response).not.toBeNull();
      done();
    } catch (err) {
      done(err);
    } finally {
      fastify.close();
    }
  });

  it('Valida que al cerrar del servidor no retorne nulo', async (done: any) => {
    let fastify: ServerFastify = new ServerFastify();
    await fastify.start(PORT);
    expect(fastify.close()).not.toBeNull();
    done();
  });

  it('Crear Servidor pasandole como parametro "Fastify"', () => {
    const fastify: ServerFastify = createServer('Fastify');
    expect(fastify).toBeInstanceOf(ServerFastify);
  });

  it('Crear Servidor pasandole como parametro "Fastifyy" mal escrito', () => {
    expect(() => {
      createServer('Fastifyy');
    }).toThrowError();
  });
});