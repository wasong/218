import mongoose from 'mongoose'

// Set mongoose promise to use native ES6 Promise
mongoose.Promise = Promise

// db setup
mongoose.connect(`mongodb://${process.env.DBUSER || 'wasong'}:${process.env.DBPASS || 'wasong'}@ds123259.mlab.com:23259/wasong`)

const db = mongoose.connection
const Schema = mongoose.Schema

const userSchema = new Schema({
  uname: {
    type: String,
  },
  age: {
    type: Number,
    min: [0, 'not-born-yet'],
    max: 120,
  },
  pass: {
    type: String,
    minLength: 4,
  },
})

const sessionSchema = new Schema({
  id: {
    type: String,
    max: 120,
  },
})

const UserModel = mongoose.model('user', userSchema)
const SessionModel = mongoose.model('session', sessionSchema)

const createUser = ({ uname, age, pass }) => {
  const User = new UserModel({
    uname,
    age,
    pass,
  })

  User.save((err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Saved!')
    }
  })
}

const startSession = async (id) => {
  const data = await SessionModel.findOneAndUpdate(
    { id },
    { active: true },
  )

  console.log(data)
  return data
}

const actions = {
  createUser,
  startSession,
}

export default actions
