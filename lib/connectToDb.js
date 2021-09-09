import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'

export default function connectToDatabase() {
    const options = { 
      useNewUrlParser: true,  
      useUnifiedTopology: true 
    }

  return mongoose.connect(dbURI, options)
}
