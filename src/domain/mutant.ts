// Services
import { isMutant } from '../application//services/mutantService';

// Dominio
import { DnaValidator, LivingBeing } from './livingBeing';

/*
 * Clase representa a un Mutante
 */
export default class Mutant implements LivingBeing {
  public dna: string[];

  /*
   * Crea un mutante
   * @param { string[] } dna - Cadena de ADN
   */
  constructor (dna: string[]) {
    this.dna = dna;
  }

  /*
   * Chequea ADN para corroborar que sea Mutante o no
   *
   * @return { boolean }
   */
  public checkDNA (): boolean {
    return isMutant(this.dna);
  }
}

export interface MutantValidator extends DnaValidator {
  isMutant: boolean;
}