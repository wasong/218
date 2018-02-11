let state = {
  lastUpdated: 0,
}

const setState = (newState) => {
  state = {
    ...state,
    ...newState,
  }
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
  console.log(state)
}
