// ------------------------------------
// Constants
// ------------------------------------
const ADMIN_SIGNIN_SUCCESS = 'ADMIN_SIGNIN_SUCCESS'
const ADMIN_SIGNIN_ERROR = 'ADMIN_SIGNIN_ERROR'
const ADMIN_SIGNOUT_SUCCESS = 'ADMIN_SIGNOUT_SUCCESS'
const SESSION_UPDATE_SUCCESS = 'SESSION_UPDATE_SUCCESS'

const postConfigs = {
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-cache',
  method: 'POST',
}

// ------------------------------------
// Actions
// ------------------------------------
const adminSignInSuccess = () => ({
  type: ADMIN_SIGNIN_SUCCESS,
})

const adminSignInError = () => ({
  type: ADMIN_SIGNIN_ERROR,
})

const adminSignOutSuccess = () => ({
  type: ADMIN_SIGNOUT_SUCCESS,
})

const sessionUpdateSucccess = session => ({
  type: SESSION_UPDATE_SUCCESS,
  session,
})

const adminSignIn = (user, pass) => (dispatch) => {
  if (user === process.env.ADMIN.USER && pass === process.env.ADMIN.PASS) {
    dispatch(adminSignInSuccess())
  } else {
    dispatch(adminSignInError())
  }
}

const adminSignOut = () => (dispatch) => {
  dispatch(adminSignOutSuccess())
}

const checkSession = id => async (dispatch) => {
  let res = null
  try {
    const data = await fetch(`${process.env.API}/session`, {
      body: JSON.stringify({ id }),
      ...postConfigs,
    })

    res = await data.json()
    dispatch(sessionUpdateSucccess(res))
  } catch (err) {
    console.log(err)
  }
}

const startSession = id => async (dispatch) => {
  // handle POST request to start session
  let res = null
  try {
    const data = await fetch(`${process.env.API}/start`, {
      body: JSON.stringify({ id }),
      ...postConfigs,
    })

    res = await data.json()
    dispatch(sessionUpdateSucccess(res))
  } catch (err) {
    console.log(err)
  }
}

const endSession = id => async (dispatch) => {
  // handle POST request to end session
  let res = null
  try {
    const data = await fetch(`${process.env.API}/end`, {
      body: JSON.stringify({ id }),
      ...postConfigs,
    })

    res = await data.json()
    dispatch(sessionUpdateSucccess(res))
  } catch (err) {
    console.log(err)
  }
}

export const actions = {
  adminSignIn,
  adminSignOut,
  checkSession,
  startSession,
  endSession,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADMIN_SIGNIN_SUCCESS]: state => ({
    ...state,
    adminSignedIn: true,
    adminSignInError: false,
  }),
  [ADMIN_SIGNIN_ERROR]: state => ({
    ...state,
    adminSignInError: true,
  }),
  [ADMIN_SIGNOUT_SUCCESS]: state => ({
    ...state,
    adminSignedIn: false,
    adminSignInError: false,
  }),
  [SESSION_UPDATE_SUCCESS]: (state, { session }) => ({
    ...state,
    session,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  adminSignedIn: false,
  adminSignInError: false,
  session: null,
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
