// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

//EXTRA CREDIT 3 custom hook
function useLocalStorageState(name, defaultValue = '') {
  const [state, setState] = React.useState(() => window.localStorage.getItem(name) ?? defaultValue)

  React.useEffect(() => {
    window.localStorage.setItem(name, state)
  }, [name, state])

  return [state, setState]
}

//EXTRA CREDIT 3 custom hook + json handling
function useLocalStorageStateJson(name, defaultValue = '') {
  //init
  const [state, setState] = React.useState(() => {
    try {
      const localValue = window.localStorage.getItem(name)
      return localValue == null ? defaultValue : JSON.parse(localValue)
    } catch(error) {
      console.error("Oops! Error with parsing local value to JSON: ", error)
      return defaultValue
    }
  })

  //usage
  React.useEffect(() => {
    try {
      window.localStorage.setItem(name, JSON.stringify(state))
    } catch(error) {
      console.error("Oops! Error with parsing JSON to local value: ", error)
      //window.localStorage.setItem(name, JSON.stringify(defaultValue)) ?
    }
    
  }, [name, state]) //is this enough for setItem to occur only when the state changes? will it occur if it's set to the same value?

  return [state, setState]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  // const [name, setName] = React.useState(window.localStorage.getItem('name') ?? initialName)
  //EXTRA CREDIT 1 lazy init
  // const [name, setName] = React.useState(() => window.localStorage.getItem('name') ?? initialName)
  //EXTRA CREDIT 3
  const [name, setName] = useLocalStorageState('name', initialName)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name]) //EXTRA CREDIT 2 dependency array


  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
