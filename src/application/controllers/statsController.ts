// Dominio
import { Stats } from '../../domain/stats';

// Services
import { 
  getDnaCount,
  getDnaRatio
} from '../services/statsService';

// Constantes
import { LIVING_BEING_TYPES } from '../../shared/constants/config';

/*
 * Función que obtendrá las estadisticas de la información persistda sobre mutantes y no mutantes
 *
 * @return { Promise<Stats> } - Retorna un objeto indicando las estadisticas:
 *                              {
 *                                count_mutant_dna: 0,
 *                                count_human_dna: 0,
 *                                ratio: 0,
 *                              }
 */
export const getStats = async (): Promise<Stats> => {
  try {
    const stats: Stats = {
      count_mutant_dna: 0,
      count_human_dna: 0,
      ratio: 0
    };

    stats.count_mutant_dna = await getDnaCount(LIVING_BEING_TYPES.mutant);
    stats.count_human_dna = await getDnaCount(LIVING_BEING_TYPES.human);
    stats.ratio = getDnaRatio(stats.count_mutant_dna, stats.count_human_dna);

    return stats;
  } catch (err) {
    throw new Error(err.message);
  }
}