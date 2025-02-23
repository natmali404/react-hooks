// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

//EXTRA CREDIT 4
class ErrorBoundary extends React.Component { //niezle rzeczy tu sa
  state = {error: null}
  static getDerivedStateFromError(error) {
    return {error}
  }

  render() {
    const {error} = this.state
    
    if (error) {
      return <this.props.FallbackComponent error={error} /> //skąd
    }

    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  // const [pokemon, setPokemon] = React.useState(null)
  // const [error, setError] = React.useState(null)
  //EXTRA CREDIT 1
  // //idle, pending, resolved, failed
  // const [status, setStatus] = React.useState('idle')

  //EXTRA CREDIT 3
  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status: 'idle',
    })

  const {pokemon, error, status} = state

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  React.useEffect(() => {
    console.log(pokemonName)
    if (!pokemonName) {
      return
    }
    //EXTRA CREDIT 3
    // setPokemon(null)
    // setStatus('pending')
    setState({pokemon: null, status: 'pending'})
    fetchPokemon(pokemonName).then(result => {
      // setPokemon(result)
      // setError(null)
      // setStatus('resolved')
      setState({pokemon: result, status: 'resolved', error: 'null'})
    })
    .catch(
      error => {
        // setError(error)
        // setStatus('rejected')
        setState({pokemon: null, status: 'rejected', error: error})
      }
    )
  }, [pokemonName])

  
  // return !pokemonName ? 'Submit a pokemon' : !pokemon ? <PokemonInfoFallback name={pokemonName} /> : <PokemonDataView pokemon={pokemon} />
  //EXTRA CREDIT 2
  switch(status) {
    case 'idle':
      return 'Submit a pokemon'
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />
    case 'rejected':
      // return (
      //   <div role="alert">
      //   There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      //   </div>
      // )
      // EXTRA CREDIT 4
      throw error
    default:
      throw new Error('Unexpected')
  }
}

function ErrorMessage({error}) {
  return (
    <div role="alert">
    There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    console.log('Button clicked - handleSubmit')
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
