let state = {
  totalUsers: 1,
}

const setState = (newState) => {
  state = {
    ...state,
    ...newState,
  }
}

const cloneForm = () => {
  const form = document.querySelector(`#user${state.totalUsers}`)
  const newForm = form.cloneNode(true)
  const children = newForm.children

  const firstLabel = children[`firstLabel${state.totalUsers}`]
  const first = children[`first${state.totalUsers}`]

  const lastLabel = children[`lastLabel${state.totalUsers}`]
  const last = children[`last${state.totalUsers}`]

  const id = state.totalUsers + 1
  setState({ totalUsers: id })

  firstLabel.setAttribute('id', `firstLabel${id}`)
  firstLabel.setAttribute('for', `first${id}`)
  first.setAttribute('id', `first${id}`)
  first.setAttribute('name', `first${id}`)

  lastLabel.setAttribute('id', `lastLabel${id}`)
  lastLabel.setAttribute('for', `last${id}`)
  last.setAttribute('id', `last${id}`)
  last.setAttribute('name', `last${id}`)

  newForm.setAttribute('id', `user${id}`)

  document.querySelector('#root').appendChild(newForm)
}
