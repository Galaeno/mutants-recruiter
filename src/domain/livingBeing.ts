export interface LivingBeing {
  dna: string[];
  checkDNA: () => boolean;
}

export interface DnaValidator {
  dnaOk: boolean;
  message?: string;
}