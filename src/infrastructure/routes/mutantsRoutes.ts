
// Controller
import { mutantValidator } from '../../application/controllers/mutantController';

// Dominio
import { MutantValidator } from '../../domain/mutant';

// Shared
import { MethodResponse } from '../../shared/interfaces/app';

/*
 * Función para manejar la ruta de la peticion para saber si una cadena de ADN es mutante o no
 *
 * @param { Request } req - Petición del cliente
 * @param { Response } res - Respuesta al cliente
 *
 * @return { Promise<void> }
 */
export const save = async (req: any, res: any): Promise<void> => {
  try {
    const dna = req.body?.dna;

    // Si existe el dna lo procesa, sino retorna error
    if (dna) {
      const mutantValidate: MutantValidator = await mutantValidator(dna);

      // Si mutantValidate.dnaOk es false, es porque hubo error en validacion de dna, retorno error
      if (mutantValidate.dnaOk) {

        // Si no es mutante, retorna 403
        if (!mutantValidate.isMutant)
          res.status(403);
        else
          res.status(200); 

        res.json({
          isMutant: mutantValidate.isMutant
        });
      } else {
        const errorResponse: MethodResponse = {
          error: true,
          message: mutantValidate.message
        };

        res.status(400);
        res.json(errorResponse);
      }
    } else {
      const errorResponse: MethodResponse = {
        error: true,
        message: 'Es requerido el dna'
      };

      res.status(400);
      res.json(errorResponse);
    } 
  } catch (err) {
    const errorResponse: MethodResponse = {
      error: true,
      message: err.message
    };

    res.status(500);
    res.json(errorResponse)
  }
}