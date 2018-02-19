const fetchUsers = async () => {
  const data = await fetch('/data/users.json', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
  })
  const json = await data.json()
  console.log(json)
  const ids = Object.keys(json)
  ids.forEach((id) => {
    const usersContent = document.querySelector('#users')
    if (id === 'lastUser') {
      usersContent.innerText += `Last User: ${json[id]}`
    } else {
      usersContent.innerHTML += `
        <div>
          <div><span>First Name: </span><span>${json[id].first}</span></div>
          <div><span>Last Name: </span><span>${json[id].last}</span></div>
          <div><span>Birthday: </span><span>${json[id].birthday}</span></div>
          <br />
        </div>
      `
    }
  })
}

fetchUsers()
