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
  active: Boolean,
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
  let res = null
  try {
    res = await SessionModel.findOneAndUpdate(
      { id },
      { active: true },
    )

    if (!res) {
      const courseSession = new SessionModel({
        id,
        active: true,
      })

      return await courseSession.save()
    }
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

const actions = {
  createUser,
  startSession,
}

export default actions
