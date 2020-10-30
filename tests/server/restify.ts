import request from 'supertest';

import { createServer } from '../../src/server/Server';
import ServerRestify from '../../src/server/Restify';

const PORT: number = 3000;

describe('Servidor Restify', () => {
  it('Valida inicio del servidor', async (done: any) => {
    let restify: ServerRestify = new ServerRestify();
    try {
      const result: any = await request(restify.server).get('/');
      expect(result).not.toBeNull();
      done();
    } catch (err) {
      done(err);
    } finally {
      restify.close();
    }
  });

  it('Valida que al cerrar del servidor no retorne nulo', async (done: any) => {
    let restify: ServerRestify = new ServerRestify();
    await restify.start(PORT);
    expect(restify.close()).not.toBeNull();
    done();
  });

  it('Crear Servidor pasandole como parametro "Restify"', () => {
    const restify: ServerRestify = createServer('Restify');
    expect(restify).toBeInstanceOf(ServerRestify);
  });

  it('Crear Servidor pasandole como parametro "Restifyy" mal escrito', () => {
    expect(() => {
      createServer('Restifyy');
    }).toThrowError();
  });
});