// Entorno
export const ENV: string = process.env.NODE_ENV || 'development';

// Server
export const PORT: number | string = process.env.PORT || 1986;

// DB
export const DB_URI: string = process.env.DB_URI || 'mongodb://localhost:27017/mutants-recruiter';
export const DB_NAME: string = process.env.DB_NAME || 'mutants-recruiter';
export const DB_USER: string = process.env.DB_USER || 'mutant-admin-user';
export const DB_PASSWORD: string = process.env.DB_PASSWORD || '9qb__D!*75zZsa';