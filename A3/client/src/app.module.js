// ------------------------------------
// Constants
// ------------------------------------
const ADMIN_SIGNIN_SUCCESS = 'ADMIN_SIGNIN_SUCCESS'
const ADMIN_SIGNIN_ERROR = 'ADMIN_SIGNIN_ERROR'
const ADMIN_SIGNOUT_SUCCESS = 'ADMIN_SIGNOUT_SUCCESS'
const SESSION_UPDATE_SUCCESS = 'SESSION_UPDATE_SUCCESS'
// TODO: handle session update error
const STUDENT_CHECKIN_SUCCESS = 'STUDENT_CHECKIN_SUCCESS'
const STUDENT_CHECKIN_ERROR = 'STUDENT_CHECKIN_ERROR'
const STUDENT_CHECKIN_CLEAR = 'STUDENT_CHECKIN_CLEAR'
const FETCH_SESSIONS_REQUEST = 'FETCH_SESSIONS_REQUEST'
const FETCH_SESSIONS_SUCCESS = 'FETCH_SESSIONS_SUCCESS'
const FETCH_SESSIONS_ERROR = 'FETCH_SESSIONS_ERROR'

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

const studentCheckInSuccess = () => ({
  type: STUDENT_CHECKIN_SUCCESS,
})

const studentCheckInError = () => ({
  type: STUDENT_CHECKIN_ERROR,
})

const studentCheckInClear = () => ({
  type: STUDENT_CHECKIN_CLEAR,
})

const fetchSessionsRequest = () => ({
  type: FETCH_SESSIONS_REQUEST,
})

const fetchSessionsSuccess = () => ({
  type: FETCH_SESSIONS_SUCCESS,
})

const fetchSessionsError = () => ({
  type: FETCH_SESSIONS_ERROR,
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

const checkIn = student => async (dispatch) => {
  let res = null
  try {
    res = await fetch(`${process.env.API}/checkIn`, {
      body: JSON.stringify(student),
      ...postConfigs,
    })

    res = await res.json()
    console.log(res)
    if (res.success) {
      dispatch(studentCheckInSuccess())
    } else {
      dispatch(studentCheckInError())
    }
  } catch (err) {
    console.log(err)
  }
}

const clearCheckin = () => (dispatch) => {
  dispatch(studentCheckInClear())
}

const fetchHistory = () => (dispatch) => {
  dispatch(fetchSessionsRequest())


}

export const actions = {
  adminSignIn,
  adminSignOut,
  checkSession,
  startSession,
  endSession,
  checkIn,
  clearCheckin,
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
  [STUDENT_CHECKIN_SUCCESS]: state => ({
    ...state,
    checkInSuccess: true,
    checkInError: false,
  }),
  [STUDENT_CHECKIN_ERROR]: state => ({
    ...state,
    checkInSuccess: false,
    checkInError: true,
  }),
  [STUDENT_CHECKIN_CLEAR]: state => ({
    ...state,
    checkInSuccess: false,
    checkInError: false,
  }),
  [FETCH_SESSIONS_REQUEST]: state => ({
    ...state,
    fetchSessionsRequest: false,
  }),
  [FETCH_SESSIONS_SUCCESS]: (state, { history }) => ({
    ...state,
    fetchSessionsRequest: false,
    fetchSessionsSuccess: true,
    fetchSessionsError: false,
    history,
  }),
  [FETCH_SESSIONS_ERROR]: state => ({
    ...state,
    fetchSessionsSuccess: false,
    fetchSessionsError: true,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  adminSignedIn: false,
  adminSignInError: false,
  checkInSuccess: false,
  checkInError: false,
  session: {
    id: null,
    active: false,
    students: [],
  },
  fetchSessionsRequest: false,
  fetchSessionsSuccess: false,
  fetchSessionsError: false,
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
