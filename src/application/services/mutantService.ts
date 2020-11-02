// Configuration
import { MethodResponse } from '../../shared/interfaces/app';
import { application } from '../../../app.config';

// Persistencia
import { get, save, LivingBeingModel } from '../../infrastructure/persistence';

const { 
  dnaSequenceWords
} = application;

/*
 * Función que valida si un ADN es mutante o no
 *
 * @param { string[] } dna - Cadena de ADN
 *
 * @return { boolean }
 */
export const isMutant = (dna: string[]): boolean => {
  if (dna && Array.isArray(dna) && dna.length > 0) {
    let count = 0;

    // Obtiene las secuencias para las filas
    count += getDNASequences(dna);

    // Obtiene las secuencias para las columnas
    count += getDNASequences(getColumns(dna));

    // Obtiene las secuencias para las diagonales
    count += getDNASequences(getDiagonals(dna));

    // Si la cantidad es mayor a 1, es porque hay más de un adn de mutante, retorna true
    if (count > 1) {
      return true;
    }
  }

  return false;
};

/*
 * Funcion que ordena un ADN en sus diagonales:
 * Si recibe ['ABCD', 'ABCD', 'ABCD']
 * debería devolver ['AAA', 'BBB', 'CCC', 'DDD']
 * 
 * @param { string[] } dna - Cadena de ADN
 * 
 * @return { string[] } - Cadena de ADN
 */
const getColumns = (dna: string[]): string[] => {
  const newOrder: string[] = [];

  // Se recorre el adn para ordenar por columnas
  dna.forEach((item) => {
    // Se recorren las letras
    for (let i = 0; i < item.length; i++) {
      const currentLetter = item[i];

      // Si la posicion no existe, la crea
      if (!newOrder[i])
        newOrder[i] = '';

      newOrder[i] += currentLetter;
    }
  });

  return newOrder;
};

/*
 * Funcion que ordena un ADN en sus diagonales:
 * Si recibe ['ABCD', 'ABCD', 'ABCD']
 * debería devolver ['A', 'AB', 'ABC', 'BCD', 'CD', 'D']
 * 
 * @param { string[] } dna - Cadena de ADN
 * 
 * @return { string[] } - Cadena de ADN
 */
const getDiagonals = (dna: string[]): string[] => {
  const newOrder: string[] = [];
  let count = dna.length - 1; // Obtiene la cantidad total de filas -1 para partir de la posición 0

  // Se recorre el adn para ordenar por columnas
  dna.forEach((item) => {
    // Se recorren las letras
    for (let i = 0; i < item.length; i++) {
      const currentLetter = item[i];

      // Si la posicion no existe, la crea
      if (!newOrder[i + count])
        newOrder[i + count] = '';

      newOrder[i + count] += currentLetter;
    }

    count--;
  });

  return newOrder;
};

/*
 * Funcion para obtener las secuencias de una cadena de ADN
 * 
 * @param { string[] } orderedDna - Cadena de ADN
 * 
 * @return { number } - Cantidad de secuencias encontradas
 */
const getDNASequences = (orderedDna: string[]): number => {
  let count = 0;

  // Recorre el array y por cada item, valida si hay la misma cantidad se letras repetidas que lo que dnaSequenceWords indica
  orderedDna.forEach((item) => {
    let letterCount = 0;
    let lastLetter = '';
  
    // Recorre las letras para encontrar las secuencias
    for (let i = 0; i < item.length; i++) {
      const currentLetter = item[i];

      // Si la letra que se recorre es distinta a la ultima, reinicia el conteo
      if (currentLetter !== lastLetter) {
        lastLetter = currentLetter;
        letterCount = 1;
      } else {
        letterCount++;

        // Si la cantidad alcanzó a dnaSequenceWords, aumenta el contador de adn y reinicia el de letras
        if (letterCount === dnaSequenceWords) {
          letterCount = 0;
          count++;
        }
      }
    }
  });

  return count;
};

/*
 * Funcion para obtener las secuencias de una cadena de ADN
 *
 * @param { LivingBeingModel } livingBeing - Objeto que tendrá la información del ADN y qué tipo de ADN es. 
 *
 * @return { Promise<MethodResponse> } - Retorna un objeto indicando si se logró persistir la información:
 *                                        {
 *                                          error: false,
 *                                          message?: ''
 *                                        }
 */
export const saveDna = async (livingBeing: LivingBeingModel): Promise<MethodResponse> => {
  try {
    const response: MethodResponse = {
      error: false
    };

    // Verifica si el ADN no existe
    const dbDna = await get('LivingBeing', { dna: livingBeing.dna });

    // Si existe información, lanza error
    if (dbDna && dbDna.count > 0) {
      response.error = true;
      response.message = 'El ADN ya fue almacenado';
    } else {
      await save('LivingBeing', livingBeing);
    }

    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};