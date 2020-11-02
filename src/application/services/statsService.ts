// Persistencia
import { get } from '../../infrastructure/persistence';

// Constantes
import { LIVING_BEING_TYPES } from '../../shared/constants/config';

export const getHumanDnaCount = async (): Promise<number> => {
  const { count } = await get('LivingBeing', { type: LIVING_BEING_TYPES.human });
  return count;
}

export const getMutantDnaCount = async (): Promise<number> => {
  const { count } = await get('LivingBeing', { type: LIVING_BEING_TYPES.mutant });
  return count;
}

export const getDnaRatio = (dnaToCalculate: number, ...rest: number[]): number => {
  const totalRest = rest.reduce((acc, value) => acc + value);
  const ratio = totalRest > 0 ? dnaToCalculate / totalRest : 0;
  return ratio;
}