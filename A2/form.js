let state = {
  lastUser: 1,
  ids: [1],
}

const setState = (newState) => {
  state = {
    ...state,
    ...newState,
  }
  console.log(state)
}

const schema = ['first', 'last', 'birthday', 'email']

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
  const removeBtn = form.querySelector('.remove')
  removeBtn.setAttribute('onclick', `remove(${lastUser})`)

  const app = document.querySelector(`#app`)

  app.append(form)
  setState({
    lastUser,
    ids: [...state.ids, lastUser],
   })
}

const log = async () => {
  state.ids.forEach(id => getInputs(id))
  console.log(state)
}

const checkIfEmpty = () => {
  const { ids } = state
  const sum = schema.reduce((acc, prop) => acc += state[1][prop], '')
  return ids.length > 0 && sum === ''
}

const save = async () => {
  state.ids.forEach(id => getInputs(id))

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

const clearDatabase = async () => {
  try {
    const res = await fetch('/clear', {
      method: 'POST',
    })
    console.log(res)
  } catch(err) {
    console.log(err)
  }
}

const remove = (id) => {
  if (state.ids.length === 1) {
    alert('Cannot remove only card!')
    return
  }
  // remove from ids list
  const idList = state.ids.filter(userID => userID !== id)
  const form = document.querySelector(`#user-${id}`).remove()

  setState({
    ids: idList,
  })
}
