
// Configuracion
import { infrastructure } from '../../../app.config';

// Constantes
const {
  persistence
} = infrastructure;

// Globales
let _persistence_: any;

// Interfaces
export interface LivingBeingModel {
  dna: string[];
  type: string;
}

export interface QueryResult {
  count: number;
  data: any[];
}

/*
 * Inicia la persistencia de la aplicación
 */
export const initPersistence = async (): Promise<boolean> => {
  try {
    const { default: PersistenceClass } = require(`./${persistence}`);

    _persistence_ = new PersistenceClass();

    return await _persistence_.connect();
  } catch (err) {
    throw new Error(`No se pudo iniciar la persistencia: ${err.message}`);
  }
}

/*
 * Finaliza la persistencia de la aplicación
 */
export const finishPersistence = async (): Promise<boolean> => {
  try {
    return await _persistence_ && _persistence_.disconnect();
  } catch (err) {
    throw new Error(`No se pudo finalizar la persistencia: ${err.message}`);
  }
}

/*
 * Obtiene todos los registros que concuerden con parametros
 */
export const get = async (collection: string, conditions: any): Promise<QueryResult> => {
  try {
    let result: QueryResult = {
      count: 0,
      data: []
    };

    if (!_persistence_)
      initPersistence();

    result = _persistence_.get(collection, conditions);

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}

/*
 * Obtiene todos los registros que concuerden con parametros
 */
export const save = async (collection: string, data: any): Promise<QueryResult> => {
  try {
    let result: QueryResult = {
      count: 0,
      data: []
    };

    if (!_persistence_)
      initPersistence();

    result = _persistence_.save(collection, data);

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}