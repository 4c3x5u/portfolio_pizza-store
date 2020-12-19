import mongoose from 'mongoose'

const { Schema } = mongoose

const ToppingSchema = new Schema({
  name: { type: String, required: true, unique: true }
})

export default ToppingSchema
