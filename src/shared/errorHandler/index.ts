/*
 * Función para manejar los rechazos de las promesas que no fueron capturados
 *
 * @return { void }
 */
const initUnhandledRejection = (): void => {
  process.on('unhandledRejection', (reason: Error) => {
    throw reason;
  });
}

/*
 * Función para manejar las excepciones que no fueron capturadas
 *
 * @return { void }
 */
const initUncaughtException = (): void => {
  process.on('uncaughtException', (reason: Error) => {
    throw reason;
  });
}

export default {
  initUnhandledRejection,
  initUncaughtException
};