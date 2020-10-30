// Dependencias externas
import * as dotenv from 'dotenv';

// Dependencias internas
import { createServer } from './server/Server';
import { PORT } from './utils/constants/app';
import { SERVER } from './utils/constants/config';

// Configuración inicial
dotenv.config();

const init = async (): Promise<void> => {
  try {
    // Crea instancia de la aplicación
    const server: any = createServer(SERVER);

    console.info('--[ Iniciando apliación ]--');

    // Inicia servidor
    await server.start(PORT);
    
    console.info(`Server (${SERVER}) iniciado en el puerto ${PORT}`);
  } catch (err: any) {
    console.error(err.message);
    finish();
  };
};

const finish = ():void => {
  console.info('--[ Deteniendo aplicación ]--')
  process.exit(1);
};

init();