import express from 'express'

import logger from './lib/logger.js'
import { port } from './config/environment.js'
import connectToDatabase from './lib/connectToDb.js'

import wrldMap from './models/map.js' 

const app = express()



async function startServer() {
  try {
    await connectToDatabase()
    console.log(' Database has connected')
    // app.use(express.json())
    app.use(logger)

    // app.get('/api/doodles', async (_req, res) => {
    //   const doodles = await Doodle.find()
    //   return res.status(200).json(doodles)
    // })

    app.listen(port, () => console.log(`Up and running on port ${port}`))


  } catch (err) {
    console.log(err)
  }
}
startServer()


app.use(express.json())
//* this was required to make the req.body work



// const mapSchema = new mongoose.Schema({
//   map: { type: String, required: true },
//   characters: { type: Array, required: true }
// })
// const wrldMap = mongoose.model('wrldMap', mapSchema)


app.get('/api/maps', async (_req, res) => {
  const maps = await wrldMap.find()
  return res.status(200).json(maps)
})

app.post('/api/maps', async (req, res) => {
  try {
    const newMap = await wrldMap.create(req.body)
    return res.status(201).json(newMap)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
})

app.get('/api/maps/:id', async (req, res) => {
  const { id } = req.params
  try {
    const map = await wrldMap.findById(id)
    if (!map) throw new Error()
    return res.status(200).json(map)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'Not Found' })
  }
})

app.delete('/api/maps/:id', async (req, res) => {
  const { id } = req.params
  try {
    const mapToDelete = await wrldMap.findById(id)
    if (!mapToDelete) throw new Error()
    await mapToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'Not Found' })
  }
})

app.put('/api/maps/:id', async (req,res) => {
  const { id } = req.params 
  try {
    const mapToEdit = await wrldMap.findById(id)
    if (!mapToEdit) throw new Error()
    Object.assign(mapToEdit, req.body)
    await mapToEdit.save()
    return res.status(202).json(mapToEdit)
  } catch (err) {
    console.log(err)
  }
})