import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { createServer } from '../../src/infrastructure/server/server';
import ServerFastify from '../../src/infrastructure/server/fastify';

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

  it('Crear Servidor pasandole como parametro "fastify"', () => {
    const fastify: ServerFastify = <ServerFastify>createServer('fastify');
    expect(fastify).toBeInstanceOf(ServerFastify);
  });

  it('Crear Servidor pasandole como parametro "Fastify" mal escrito', () => {
    expect(() => {
      createServer('Fastify');
    }).toThrowError();
  });
});

describe('Servidor Fastify + APIs + MongoDB', () => {
  let mongoServer: MongoMemoryServer;
  const bodyRequestHuman: any = { // @TODO: Cambiar a interfaz de dna
    dna: [
      "ATGCGA",
      "CAGTGC",
      "TTATTT",
      "AGACGG",
      "GCGTCA",
      "TCACTG"
    ]
  };
  const bodyRequestMutant: any = { // @TODO: Cambiar a interfaz de dna
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
    // Elimina la base de datos
    await mongoose.connection.db?.dropDatabase();

    // Cierra las conexiónes
    await mongoose.disconnect(done);
    await mongoServer.stop()
  });

  it ('API GET -> 404', async (done) => {
    let fastify: ServerFastify = new ServerFastify();
    try {
      const response = await fastify.server.inject({ method: "GET", url: "/some" });
      expect(response.statusCode).toBe(404);
      done();
    } catch (err) {
      done(err);
    } finally {
      fastify.close();
    }
  });

  it ('API POST -> 404', async (done) => {
    let fastify: ServerFastify = new ServerFastify();
    try {
      const response = await fastify.server.inject({ method: "POST", url: "/" });
      expect(response.statusCode).toBe(404);
      done();
    } catch (err) {
      done(err);
    } finally {
      fastify.close();
    }
  });
  
  it ('API POST /mutant/ -> ADN Humano -> FALSE', async (done) => {
    let fastify: ServerFastify = new ServerFastify();
    try {
      const response: any = await fastify.server.inject({ 
        method: "POST",
        url: "/mutant/",
        body: bodyRequestHuman
      });

      expect(response.statusCode).toBe(403);
      done();
    } catch (err) {
      done(err);
    } finally {
      fastify.close();
    }
  });
  
  it ('API POST /mutant/ -> ADN Mutante -> TRUE', async (done) => {
    let fastify: ServerFastify = new ServerFastify();
    try {
      const response: any = await fastify.server.inject({ 
        method: "POST",
        url: "/mutant/",
        body: bodyRequestMutant
      });

      expect(response.statusCode).toBe(200);
      done();
    } catch (err) {
      done(err);
    } finally {
      fastify.close();
    }
  });

  it ('API GET /stats -> Obtiene detalle de persistencia-> Mutante = 1 | Humano = 1 |  Prop 1', async (done) => {
    let fastify: ServerFastify = new ServerFastify();
    try {
      const response: any = await fastify.server.inject({ method: "GET", url: "/stats"});
      expect(response.statusCode).toBe(200);
      expect(response.json()).toMatchObject({
        count_mutant_dna: 1,
        count_human_dna: 1,
        ratio: 1
      });
      done();
    } catch (err) {
      done(err);
    } finally {
      fastify.close();
    }
  });
});