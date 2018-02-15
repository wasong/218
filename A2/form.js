let state = {
  lastUser: 1,
}

const setState = (newState) => {
  state = {
    ...state,
    ...newState,
  }
  // console.log(state)
}

const schema = ['first', 'last', 'birthday']

const getInputs = (userID = 1) => {
  const elems = document.querySelector(`#user-${userID}`)
  const inputs = []

  // query for inputs
  schema.forEach((prop) => {
    const elem = elems.querySelector(`input[name="${prop}"]`)
    inputs.push(elem)
  })

  const user = {
    id: userID,
  }
  // save inputs
  inputs.forEach((input) => {
    user[input.name] = input.value
  })

  setState({ [userID]: user })
}

const addUser = () => {
  const lastUser = state.lastUser + 1
  const template = document.querySelector('#template')
  const form = template.cloneNode(true)
  form.setAttribute('class', 'card')
  form.setAttribute('id', `user-${lastUser}`)

  const app = document.querySelector(`#app`)

  app.append(form)
  setState({ lastUser })
}

const log = async () => {
  for(let i = 1; i <= state.lastUser; i++) getInputs(i)
  console.log(state)
}

const checkIfEmpty = () => {
  const sum = schema.reduce((acc, prop) => acc += state[1][prop], '')
  return state.lastUser === 1 && sum === ''
}

const save = async () => {
  for(let i = 1; i <= state.lastUser; i++) getInputs(i)

  // check if no user added
  if (checkIfEmpty()) {
    alert('Empty List!')
    return
  }

  let json = null
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(state)
    })

    json = await res.json()
  } catch(err) {
    console.log(err)
  }
  console.log(json)
}
