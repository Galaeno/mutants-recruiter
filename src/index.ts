// Dependencias externas
import * as dotenv from 'dotenv';

// Servidor
import { Server, createServer } from './infrastructure/server/server';

// Persistencia
import { initPersistence, finishPersistence } from './infrastructure/persistence';

// Constantes
import { PORT } from './shared/constants/app';
import { SERVER } from './shared/constants/config';

// Errores
import errorHandler from './shared/errorHandler';

// Logger
import { INFO, ERROR } from './shared/logger';

// Configuración inicial
dotenv.config();

/*
 * Funcion que inicia la aplicacion
 *
 * @return Promise<void>
 */
const init = async (): Promise<void> => {
  try {
    // Inicia manejadores de errores
    errorHandler.initUncaughtException();
    errorHandler.initUnhandledRejection();

    // Inicia la persistencia de la aplicación
    await initPersistence();

    // Crea instancia de la aplicación
    const server: Server = createServer(SERVER);

    INFO('--[ Iniciando apliación ]--');

    // Inicia servidor
    await server.start(PORT);
    
    INFO(`Server (${SERVER}) iniciado en el puerto ${PORT}`);
  } catch (err: any) {
    finishPersistence();
    ERROR(err.message);
    finish();
  }
};

/*
 * Funcion que finaliza la aplicacion
 *
 * @return void
 */
const finish = (): void => {
  INFO('--[ Deteniendo aplicación ]--')
  process.exit(1);
};

init();