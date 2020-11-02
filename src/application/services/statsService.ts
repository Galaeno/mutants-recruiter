// Persistencia
import { get } from '../../infrastructure/persistence';

/*
 * Función para obtener la cantidad de ADN humano
 *
 * @param { string } livingBeingType - Tipo de ser vivo
 *
 * @return { Promise<number> } - Cantidad de ADN del tipo de ser vivo especificado
 */
export const getDnaCount = async (livingBeingType: string): Promise<number> => {
  const { count } = await get('LivingBeing', { type: livingBeingType });
  return count;
}

/*
 * Obtiene el ratio entre un ADN especifico y el resto
 *
 * @param { number } dnaToCalculate - Cantidad de ADN del cual se quiere obtiene el ratio
 * @param { number[] } rest - Cantidad restante de ADN
 *
 * @return { number } - Valor de ratio
 */
export const getDnaRatio = (dnaToCalculate: number, ...rest: number[]): number => {
  const totalRest = rest.reduce((acc, value) => acc + value);
  const ratio = totalRest > 0 ? dnaToCalculate / totalRest : 0;
  return ratio;
}