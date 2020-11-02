// Dependencias externas
import glob from 'glob';
import path from 'path';

// Constantes
const SUFFIX_FILE = 'Routes';

/*
 * Obtiene las rutas a utilizar
 *
 * @return { Object } - Retorna un objeto con todas las rutas a utilizar
 */
const getRoutes = (): any => {
  // Obtiene la ruta de rutas
  const routesFiles: string[] = glob.sync(path.normalize(path.join(`${__dirname}/*`)));

  // Filtra para no traer éste archivo
  const routesFilter: string[] = routesFiles.filter(file => file !== __filename && !file.includes('.map'));

  // Requiere los archivos de rutas
  const routes: any = {};

  for (const key of routesFilter) {
    // Obtiene el nombre del archivo sin extension ni ruta
    const file: string | undefined = key.split('/').pop()?.replace(SUFFIX_FILE, '').split('.')[0];

    if (file)
      routes[file] = require(key);
  }

  return routes;
}

export const routes = getRoutes();

export interface Router {
  initRoutes?() :void;
  get() :void;
  post() :void;
}