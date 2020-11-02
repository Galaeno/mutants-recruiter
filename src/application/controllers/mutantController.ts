// Services
import { dnaValidator } from '../services/livingBeingService';
import { saveDna } from '../services/mutantService';

// Dominio
import Mutant, { MutantValidator } from '../../domain/mutant';

// Constantes
import { LIVING_BEING_TYPES } from '../../shared/constants/config';
import { LivingBeingModel } from '../../infrastructure/persistence';

export const mutantValidator = async (dna: string[]): Promise<MutantValidator> => {
  try {
    const ret: MutantValidator = {
      isMutant: false,
      dnaOk: false
    };

    if (dna && dna.length > 0) {
      // Verifica si el dna obtenido cumple con el estandard definido y lo asigna a la variable ret
      Object.assign(ret, dnaValidator(dna));

      // Si el DNA es válido, lo persiste y chequea si es mutante
      if (ret.dnaOk) {
        const mutant: Mutant = new Mutant(dna);

        ret.isMutant = mutant.checkDNA();

        const data: LivingBeingModel = {
          dna,
          type: (ret.isMutant) ? LIVING_BEING_TYPES.mutant : LIVING_BEING_TYPES.human
        };
        
        // Almacena en DB
        await saveDna(data);
      }
    } else {
      ret.message = 'Es requerido el DNA';
    }

    return ret;
  } catch (err) {
    throw new Error(err.message)
  }
}