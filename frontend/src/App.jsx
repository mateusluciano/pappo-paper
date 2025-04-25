import { useState } from 'react'
import './App.css'
import { Header } from './components/header'
import { Checkout } from './components/checkout'
import { Menu } from './components/menu'

function App() {

  return (
    <>
      { <Header /> }
      { <Checkout /> }
      <hr className="divisor" />
      { <Menu /> }
    </>
  )
}

export default App
