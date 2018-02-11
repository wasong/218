let state = {
  lastUser: 0,
}

const setState = (newState) => {
  state = {
    ...state,
    ...newState,
  }
  // console.log(state)
}

const schema = ['first', 'last', 'birthday']

const getInputs = (userID = 0) => {
  const elems = document.querySelector(`#user-${userID}`)
  const inputs = []

  // query for inputs
  schema.forEach((prop) => {
    const elem = elems.querySelector(`input[name="${prop}"]`)
    inputs.push(elem)
  })

  const user = {}
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

const save = async () => {
  for(let i = 0; i <= state.lastUser; i++) getInputs(i)
  let json = null
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
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
