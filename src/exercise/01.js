// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

//BASIC + EXTRA CREDIT 1
function Greeting({initialName}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
    //const name = ''
  const [name, setName] = React.useState(initialName) //EXTRA CREDIT 1


  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
      {/* EXTRA CREDIT 1 - this wasn't necessary tho*/}
      {/* <strong>Hello {name ? name : initialName}</strong> */}
    </div>
  )
}

function App() {
  return <Greeting initialName={'Żelek'} />
}

export default App
