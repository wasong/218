import mongoose from 'mongoose'

// Set mongoose promise to use native ES6 Promise
mongoose.Promise = Promise

// db setup
mongoose.connect(`mongodb://${process.env.DBUSER || 'wasong'}:${process.env.DBPASS || 'wasong'}@ds123259.mlab.com:23259/wasong`)

const db = mongoose.connection
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
  },
  userId: {
    type: String,
  },
  sessionId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // history: {
  //   // list of courses user checked in
  // },
})

const sessionSchema = new Schema({
  id: {
    type: String,
    max: 120,
  },
  active: Boolean,
  students: [Schema.Types.Mixed],
})

const UserModel = mongoose.model('user', userSchema)
const SessionModel = mongoose.model('session', sessionSchema)

const createUser = ({ name, date }) => {
  const User = new UserModel({
    name,
    date,
  })

  User.save((err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Saved!')
    }
  })
}

const getSession = async (id) => {
  let res = null
  try {
    res = await SessionModel.findOne({ id })

    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

const updateSession = async (id, update) => {
  let res = null

  try {
    res = await SessionModel.findOneAndUpdate(
      { id },
      update,
      {
        new: true,
        upsert: true,
      },
    )

    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

const startSession = id => updateSession(id, { active: true })
const endSession = id => updateSession(id, { active: false })

const checkIn = async (student) => {
  const session = await getSession(student.id)

  if (session && session.active) {

    return updateSession(student.id, {
      students: [
        ...session.students,
        student,
      ],
    })
  }
  return null
}

const actions = {
  createUser,
  getSession,
  startSession,
  endSession,
  checkIn,
}

export default actions
