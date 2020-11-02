import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { createServer } from '../../src/infrastructure/server/server';
import ServerExpress from '../../src/infrastructure/server/express';

import { LivingBeing } from '../../src/domain/livingBeing';

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

  it('Crear Servidor pasandole como parametro "express"', () => {
    const express: ServerExpress = <ServerExpress>createServer('express');
    expect(express).toBeInstanceOf(ServerExpress);
  });

  it('Crear Servidor pasandole como parametro "Express" mal escrito', () => {
    expect(() => {
      createServer('Express');
    }).toThrowError();
  });
});

describe('Servidor Express + APIs + MongoDB', () => {
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
    // Elimina la base de datos
    await mongoose.connection.db?.dropDatabase();

    // Cierra las conexiónes
    await mongoose.disconnect(done);
    await mongoServer.stop()
  });

  it ('API GET -> 404', async (done) => {
    let express: ServerExpress = new ServerExpress();
    try {
      const result: any = await request(express.app)
        .get('/some');

        expect(result.status).toBe(404);
      done();
    } catch (err) {
      done(err);
    } finally {
      express.close();
    }
  });

  it ('API POST -> 404', async (done) => {
    let express: ServerExpress = new ServerExpress();
    try {
      const result: any = await request(express.app)
        .post('/');

      expect(result.status).toBe(404);
      done();
    } catch (err) {
      done(err);
    } finally {
      express.close();
    }
  });
  
  it ('API POST /mutant/ -> ADN Humano -> FALSE', async (done) => {
    let express: ServerExpress = new ServerExpress();
    try {
      const result: any = await request(express.app)
        .post('/mutant/')
        .send(bodyRequestHuman);

      expect(result.status).toBe(403);
      done();
    } catch (err) {
      done(err);
    } finally {
      express.close();
    }
  });
  
  it ('API POST /mutant/ -> ADN Mutante -> TRUE', async (done) => {
    let express: ServerExpress = new ServerExpress();
    try {
      const result: any = await request(express.app)
        .post('/mutant/')
        .send(bodyRequestMutant);

      expect(result.status).toBe(200);
      done();
    } catch (err) {
      done(err);
    } finally {
      express.close();
    }
  });

  it ('API GET /stats -> Obtiene detalle de persistencia-> Mutante = 1 | Humano = 1 |  Prop 1', async (done) => {
    let express: ServerExpress = new ServerExpress();
    try {
      const result: any = await request(express.app)
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
      express.close();
    }
  });
});