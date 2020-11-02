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

/*
 * Clase representa a la base Mongo
 */
export default class Mongo {

  /*
   * Funcion para conectar con MongoDB
   *
   * @return { Promise<typeof mongoose> } - Retorna la instancia de conexión
   */
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

  /*
   * Funcion para desconectar de MongoDB
   *
   * @return { Promise<void> }
   */
  private async disconnect (): Promise<void> {
    try {
      await mongoose.disconnect();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /*
   * Funcion para manejar las queries de obtencion de información de la base de datos
   *
   * @param { string } collection - Nombre de la colección a utilizar
   * @param { any } conditions - Condiciones a ejecutar en la query/consulta
   *
   * @return { Promise<QueryResult> } - Retorna un objeto indicando la cantidad de elementos y su información:
   *                                        {
   *                                          count: 0,
   *                                          data: []
   *                                        }
   */
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

  /*
   * Funcion para manejar las queries de guardado de información en la base de datos
   *
   * @param { string } collection - Nombre de la colección a utilizar
   * @param { any } data - Información a almacenar
   *
   * @return { Promise<QueryResult> } - Retorna un objeto indicando la cantidad de elementos y su información:
   *                                        {
   *                                          count: 0,
   *                                          data: []
   *                                        }
   */
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

/*
 * Función para obtener el modelo a utilizar
 *
 * @param { string } collection - Nombre de la colección a utilizar
 *
 * @return { Model<Document> } - Retorna el Modelo a utilizar
 */
const getModel = (collection: string): Model<Document> => {
  // Dependiendo la colección, qué modelo carga
  switch (collection) {
    case 'LivingBeing':
      return LivingBeingModel;
    default:
      throw new Error(`No se encuentra el ${collection}`);
  }
}