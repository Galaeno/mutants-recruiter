// Dominio
import { Stats } from '../../domain/stats';

// Controllers
import { getStats } from '../../application/controllers/statsController';

// Shared
import { MethodResponse } from '../../shared/interfaces/app';

/*
 * Función para manejar la ruta de la peticion para obtener las estadisticas de los ADN
 *
 * @param { Request } req - Petición del cliente
 * @param { Response } res - Respuesta al cliente
 *
 * @return { Promise<void> }
 */
export const get = async (req: any, res: any): Promise<void> => {
  try {
    const stats: Stats = await getStats();

    res.json(stats);
  } catch (err) {
    const errorResponse: MethodResponse = {
      error: true,
      message: err.message
    };

    res.status(500);
    res.json(errorResponse)
  }  
}