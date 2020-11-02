// Dependencias externas
import { Schema, Document, model } from 'mongoose';

export interface LivingBeingMongoInterface extends Document {
  dna: string[];
  type: string;
}

const LivingBeingSchema: Schema = new Schema({
  dna: {
    type: Array,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

export default model<LivingBeingMongoInterface>('LivingBeing', LivingBeingSchema);