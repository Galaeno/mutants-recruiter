// Servicio
import { isMutant } from '../../../src/application/services/mutantService';

describe('Mutant Service', () => {
  let humanDna: string[] = [
    "ATGCGA",
    "CAGTGC",
    "TTATTT",
    "AGACGG",
    "GCGTCA",
    "TCACTG"
  ];

  it ('Valida si es Mutante => Deberia retornar TRUE por tener mas de una secuencia (3)', () => {
    // ADN Mutante, posee 3 secuencias
    let mutantDna: string[] = [
      "ATGCGA",
      "CAGTGC",
      "TTATGT",
      "AGAAGG",
      "CCCCGA",
      "TAAGGG"
    ];
    expect(isMutant(mutantDna)).toBeTruthy();
  });

  it ('Valida si es Mutante => Deberia retornar FALSE por ser ADN humano', () => {
    expect(isMutant(humanDna)).toBeFalsy();
  });

  it ('Valida si es Mutante => Deberia retornar FALSE por tener solo una secuencia', () => {
    let mutantDna: string[] = [
      "ATGCGA",
      "CTGTCC",
      "TTATGT",
      "AGAAGG",
      "CCCCGT",
      "TCACTG"
    ];
    expect(isMutant(mutantDna)).toBeFalsy();
  });
});