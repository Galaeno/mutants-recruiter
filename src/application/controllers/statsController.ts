// Dominio
import { Stats } from '../../domain/stats';

// Services
import { 
  getHumanDnaCount,
  getMutantDnaCount,
  getDnaRatio
} from '../services/statsService';

export const getStats = async (): Promise<Stats> => {
  try {
    const stats: Stats = {
      count_mutant_dna: 0,
      count_human_dna: 0,
      ratio: 0
    };

    stats.count_mutant_dna = await getMutantDnaCount();
    stats.count_human_dna = await getHumanDnaCount();
    stats.ratio = getDnaRatio(stats.count_mutant_dna, stats.count_human_dna);

    return stats;
  } catch (err) {
    throw new Error(err.message);
  }
}