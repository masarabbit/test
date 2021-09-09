import mongoose from 'mongoose'

export const mapSchema = new mongoose.Schema({
  map: { type: String, required: true },
  characters: { type: Array, required: true }
})

export default mongoose.model('wrldMap', mapSchema)