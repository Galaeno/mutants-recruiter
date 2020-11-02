import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { createServer } from '../../src/infrastructure/server/server';
import ServerRestify from '../../src/infrastructure/server/restify';

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

  it('Crear Servidor pasandole como parametro "restify"', () => {
    const restify: ServerRestify = <ServerRestify>createServer('restify');
    expect(restify).toBeInstanceOf(ServerRestify);
  });

  it('Crear Servidor pasandole como parametro "Restify" mal escrito', () => {
    expect(() => {
      createServer('Restify');
    }).toThrowError();
  });
});

describe('Servidor Restify + APIs + MongoDB', () => {
  let mongoServer: MongoMemoryServer;
  const bodyRequestHuman: any = {
    dna: [
      "ATGCGA",
      "CAGTGC",
      "TTATTT",
      "AGACGG",
      "GCGTCA",
      "TCACTG"
    ]
  };
  const bodyRequestMutant: any = {
    dna: [
      "ATGCGA",
      "CAGTGC",
      "TTATGT",
      "AGAAGG",
      "CCCCTA",
      "TCACTG"
    ]
  };

  beforeAll(async () => {
    // Crea la conexión
    mongoServer = new MongoMemoryServer();
    const URI = await mongoServer.getUri();
    process.env.DB_URI = URI;

    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async (done) => {
    // Elimina todas las conexiones
    await mongoose.connection.db?.dropDatabase();

    // Cierra la conexión
    await mongoose.disconnect(done);
    await mongoServer.stop()
  });

  it ('API GET -> 404', async (done) => {
    let restify: ServerRestify = new ServerRestify();
    try {
      const result: any = await request(restify.server)
        .get('/some');

      expect(result.status).toBe(404);
      done();
    } catch (err) {
      done(err);
    } finally {
      restify.close();
    }
  });

  it ('API POST -> 404', async (done) => {
    let restify: ServerRestify = new ServerRestify();
    try {
      const result: any = await request(restify.server)
        .post('/')

      expect(result.status).toBe(404);
      done();
    } catch (err) {
      done(err);
    } finally {
      restify.close();
    }
  });
  
  it ('API POST /mutant/ -> ADN Humano -> FALSE', async (done) => {
    let restify: ServerRestify = new ServerRestify();
    try {
      const result: any = await request(restify.server)
        .post('/mutant/')
        .send(bodyRequestHuman);

      expect(result.status).toBe(403);
      done();
    } catch (err) {
      done(err);
    } finally {
      restify.close();
    }
  });
  
  it ('API POST /mutant/ -> ADN Mutante -> TRUE', async (done) => {
    let restify: ServerRestify = new ServerRestify();
    try {
      const result: any = await request(restify.server)
        .post('/mutant/')
        .send(bodyRequestMutant);

      expect(result.status).toBe(200);
      done();
    } catch (err) {
      done(err);
    } finally {
      restify.close();
    }
  });

  it ('API GET /stats -> Obtiene detalle de persistencia-> Mutante = 1 | Humano = 1 |  Prop 1', async (done) => {
    let restify: ServerRestify = new ServerRestify();
    try {
      const result: any = await request(restify.server)
        .get('/stats');

      expect(result.status).toBe(200);
      expect(result.body).toMatchObject({
        count_mutant_dna: 1,
        count_human_dna: 1,
        ratio: 1
      });
      done();
    } catch (err) {
      done(err);
    } finally {
      restify.close();
    }
  });
});