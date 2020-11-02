const initUnhandledRejection = (): void => {
  process.on('unhandledRejection', (reason: Error) => {
    throw reason;
  });
}

const initUncaughtException = (): void => {
  process.on('uncaughtException', (reason: Error) => {
    throw reason;
  });
}

export default {
  initUnhandledRejection,
  initUncaughtException
};