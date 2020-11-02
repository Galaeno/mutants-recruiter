// Configuración
import { 
  infrastructure,
  application
} from '../../../app.config';

// Interfaces
import { LivingBeingTypes } from '../interfaces/app';

// Infraestructura
export const SERVER: string = infrastructure.server || 'restify';

// Aplicación
export const LIVING_BEING_TYPES: LivingBeingTypes = application.livingBeingTypes;