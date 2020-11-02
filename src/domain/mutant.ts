// Services
import { isMutant } from '../application//services/mutantService';

// Dominio
import { DnaValidator, LivingBeing } from './livingBeing';

export default class Mutant implements LivingBeing {
  public dna: string[];

  constructor (dna: string[]) {
    this.dna = dna;
  }

  public checkDNA (): boolean {
    return isMutant(this.dna);
  }
}

export interface MutantValidator extends DnaValidator {
  isMutant: boolean;
}