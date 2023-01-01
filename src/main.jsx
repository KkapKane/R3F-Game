import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CharacterAnimationProvider } from './context/CharacterAnimation'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CharacterAnimationProvider >

    <App />
  </CharacterAnimationProvider>
 
)
