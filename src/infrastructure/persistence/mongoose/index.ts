// Dependencias externas
import mongoose, { Model, Document } from 'mongoose';

// Configuracion
import {
  DB_URI
} from '../../../shared/constants/app';

// Interfaces
import { QueryResult } from '../../persistence';

// Modelos
import LivingBeingModel from './models/livingBeingModel';

export default class Mongo {
  private async connect (): Promise<typeof mongoose> {
    try {
      return await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  private async disconnect (): Promise<void> {
    try {
      return await mongoose.disconnect();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async get (collection: string, conditions: any): Promise<QueryResult> {
    try {
      const response: QueryResult = {
        count: 0,
        data: []
      };

      const model: Model<Document> = getModel(collection);
      const result = await model.find(conditions);

      response.count = result.length;
      response.data = result;

      return response;
    } catch (err) {
      throw new Error(err.message)
    }
  }

  public async save (collection: string, data: any): Promise<QueryResult> {
    try {
      const response: QueryResult = {
        count: 0,
        data: []
      };

      const model: Model<Document> = getModel(collection);
      const result: any = await model.create(data);
      
      response.count = 1;
      response.data = result;

      return response;
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

const getModel = (collection: string): Model<Document> => {
  // Dependiendo la colección, qué modelo carga
  switch (collection) {
    case 'LivingBeing':
      return LivingBeingModel;
    default:
      throw new Error(`No se encuentra el ${collection}`);
  }
}