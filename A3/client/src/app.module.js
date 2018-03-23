// ------------------------------------
// Constants
// ------------------------------------
const ADMIN_SIGNIN_SUCCESS = 'ADMIN_SIGNIN_SUCCESS'
const ADMIN_SIGNIN_ERROR = 'ADMIN_SIGNIN_ERROR'
const ADMIN_SIGNOUT_SUCCESS = 'ADMIN_SIGNOUT_SUCCESS'
const ACTIVE_SESSION_SUCCESS = 'ACTIVE_SESSION_SUCCESS'
const END_SESSION_SUCCESS = 'END_SESSION_SUCCESS'

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

const activeSessionSuccess = () => ({
  type: ACTIVE_SESSION_SUCCESS,
})

const endSessionSuccess = () => ({
  type: END_SESSION_SUCCESS,
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

const startSession = id => (dispatch) => {
  // handle POST request to start session
}

const endSession = id => (dispatch) => {
  // handle POST request to start session
}

export const actions = {
  adminSignIn,
  adminSignOut,
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
  [ACTIVE_SESSION_SUCCESS]: state => ({
    ...state,
    activeSession: true,
  }),
  [END_SESSION_SUCCESS]: state => ({
    ...state,
    activeSession: false,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  adminSignedIn: false,
  adminSignInError: false,
  activeSession: false,
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
