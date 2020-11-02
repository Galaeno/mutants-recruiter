// Servicio
import { dnaValidator } from '../../../src/application/services/livingBeingService';

// Configuracion
import { application } from '../../../app.config';

// Constantes
const { 
  dnaDimensions: {
    column,
    row
  }
} = application;

describe('Living Being Service Service', () => {
  it ('Validador de ADN: si hay información de ADN', () => {
    let dna: string[] = [];
    expect(dnaValidator(dna).dnaOk).toBeFalsy();
  });

  it ('Validador de ADN: Chequea si existe una letra o carácter que no esté dentro de las permitidas -> FALSE', () => {
    let dna: string[] = ["4TGCG4", "C4GTGC", "TT4TGT", "4G44GG", "CCCCG4", "T44GGG"];
    expect(dnaValidator(dna).dnaOk).toBeFalsy();
  });

  it ('Validador de ADN: Chequea que todas las cadenas posean la misma longitud -> FALSE', () => {
    let dna: string[] = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCGA", "TAAGGGAAAAA"];
    expect(dnaValidator(dna).dnaOk).toBeFalsy();
  });

  it ('Validador de ADN: Chequea que todas las columnas tengan la misma cantidad que lo configurado en application: dnaDimensions: column -> FALSE', () => {
    let dna: string[] = ["ATGCGAA", "CAGTGCA", "TTATGTA", "AGAAGGA", "CCCCGAA", "TAAGGGA"];
    expect(dnaValidator(dna).dnaOk).toBeFalsy();
  });

  it ('Validador de ADN: Chequea que todas las filas tengan la misma cantidad que lo configurado en application: dnaDimensions: row -> FALSE', () => {
    let dna: string[] = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCGA", "TAAGGG", "TAAGGG"];
    expect(dnaValidator(dna).dnaOk).toBeFalsy();
  });
});