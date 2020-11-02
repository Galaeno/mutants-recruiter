// Config
import { application } from '../../../app.config';

// Dominio
import { DnaValidator } from '../../domain/livingBeing';

// Constantes
const { 
  dnaDimensions: {
    column,
    row
  },
  dnaWords,
  dnaStrictMode
} = application;

export const dnaValidator = (dna: string[]): DnaValidator => {
  const result: DnaValidator = {
    dnaOk: true
  };

  // Si no viene adn o viene vacio, retorna que no es válido
  if (dna && dna.length > 0) {

    // Si no esta en strict mode = false, retorna true porque no valida
    if (!dnaStrictMode) 
      return result;

    // Chequea si todos los items del array son strings
    if (!dna.every(i => (typeof i === 'string'))) {
      result.dnaOk = false;
      result.message = 'El DNA posee formato incorrecto: No son todos caracteres de texto';
      return result;
    }

    // Chequea si existe una letra o carácter que no esté dentro de las permitidas
    if (!checkDifferentCharacters(dna)) {
      result.dnaOk = false;
      result.message = `El DNA posee algun caracter no válido. Permitido: [${dnaWords}]`;
      return result;
    }

    // Chequea que todas las cadenas posean la misma longitud
    if (!checkLengthValues(dna)) {
      result.dnaOk = false;
      result.message = `El DNA no posee la mis cantidad de información en cada valor suministrado`;
      return result;
    }

    // Chequea que todas las columnas y filas tengan la misma cantidad que column y row
    if (dna[0].length !== column || dna.length !== row) {
      result.dnaOk = false;
      result.message = `El DNA no posee la cantidad de columnas (${dna.length} de ${column}) y/o filas (${dna[0].length} de ${row}) esperadas`;
      return result;
    }
  } else {
    result.dnaOk = false;
    result.message = `Es requerido el DNA`;
    return result;
  }

  return result;
}

const checkLengthValues = (dna: string[]): boolean => {
  // Obtiene la cantidad de total de valores en las cadenas
  const dnaLengths: number[] = dna.map((i) => i.length);
  const dnaColumns: number = dnaLengths.reduce((accumulator, currentValue) => accumulator + currentValue);
  const firstItemLength = dna[0].length;

  // Obtiene el resultado de dividir esa cantidad, por la longitud del primer valor
  const average: number = dnaColumns / firstItemLength;

  // Si el resultado es el mismo, es porque posee la misma cantidad en cada indice del array, sino alguno posee un string mayor o menor al resto
  if (average === dna.length) {
    return true;
  } else {
    return false;
  }
}

const checkDifferentCharacters = (dna: string[]): boolean => {
  // Recorre cada item del ADN y por cada item, lo separa en caracteres a cada string.
  // Este array generado, recorre cada item buscando que todos los carácteres coincidan con dnaWords
  return dna.every((item) => [...item].every((letter) => dnaWords.join('').includes(letter)))
}