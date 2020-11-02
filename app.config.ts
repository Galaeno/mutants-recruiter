
export const infrastructure = {
  /* Tipos de servers a utilizar:
   * - restify
   * - fastify
   * - express
   */
  server: 'restify',

  /* Cómo se realizará la persistencia de la información:
   * - mongoose
   * - (string vacio) no se realizará persistencia. 
   */
  persistence: 'mongoose'
};

export const application = {
  /* Cómo serán las dimensiones esperadas de la cadena de ADN;
   * - column: 0 a n
   * - row: 0 a n
   */
  dnaDimensions: {
    column: 6,
    row: 6
  },

  /* Cadena de letras esperadas. */
  dnaWords: ['A', 'C', 'G', 'T'],

  /* Cantidad de letras en secuencia para determinar qué tipo de ADN es */
  dnaSequenceWords: 4,

  /* Especificará si es en modo estricta la cadena de ADN.
   * Esto permite que se realice una comprobacion en base a si hay letras que no se encuentran en dnaWords y/o si
   * no coinciden todas las files y/o columnas maximas establecidas en dnaDimensions:
   * true o false 
   */
  dnaStrictMode: true,

  /* Tipos de seres vivos */
  livingBeingTypes: {
    mutant: 'mutant',
    human: 'human'
  }
}