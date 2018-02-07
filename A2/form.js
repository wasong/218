let state = {
  totalUsers: 1,
}

const setState = (newState) => {
  state = {
    ...state,
    ...newState,
  }
}

// const createUserElement = (i) => {
//   const user = document.createElement('div')
//   user.setAttribute('id', `user${i}`)
//   return user
// }
//
// const createNameElement = (i) => {
//   const id = `name${i}`
//   const container = document.createElement('div')
//   let label = document.createElement('label')
//   label.setAttribute('for', id)
//   label.setAttribute('innerText', `Name:`)
//
//   let name = document.createElement('input')
//   name.setAttribute('id', id)
//   name.setAttribute('type', `text:`)
//   name.setAttribute('name', id)
//
//   container.appendChild(label)
//   console.log(container)
//   container.appendChild(name)
//
//   return container
// }
//
// const addOnChange = (node) => {
//   node.addEventListener('change', (event) => {
//     const { value, name } = event.target
//     setState({ [name]: value })
//     console.log(value, state)
//   })
// }
//
// const addUser = () => {
//   const parent = createUserElement(state.totalUsers)
//   parent.appendChild(createNameElement(state.totalUsers))
//   document.querySelector('#root').appendChild(parent)
//
//   addOnChange(parent)
//   setState({
//     totalUsers: state.totalUsers + 1,
//   })
// }

const cloneForm = () => {
  const form = document.querySelector(`#user${state.totalUsers}`)
  const newForm = form.cloneNode(true)


  console.log(newForm)
}
