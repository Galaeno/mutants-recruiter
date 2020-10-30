import request from 'supertest';

import { createServer } from '../../src/server/Server';
import ServerExpress from '../../src/server/Express';

const PORT: number = 3000;

describe('Servidor Express', () => {
  it('Valida inicio del servidor', async (done: any) => {
    let express: ServerExpress = new ServerExpress();
    try {
      const result: any = await request(express.app).get('/');
      expect(result).not.toBeNull();
      done();
    } catch (err) {
      done(err);
    } finally {
      express.close();
    }
  });

  it('Valida que al cerrar del servidor no retorne nulo', async (done: any) => {
    let express: ServerExpress = new ServerExpress();
    await express.start(PORT);
    expect(express.close()).not.toBeNull();
    done();
  });

  it('Crear Servidor pasandole como parametro "Express"', () => {
    const express: ServerExpress = createServer('Express');
    expect(express).toBeInstanceOf(ServerExpress);
  });

  it('Crear Servidor pasandole como parametro "Expresss" mal escrito', () => {
    expect(() => {
      createServer('Expresss');
    }).toThrowError();
  });
});