import '../styles/App.css'
import { Checkout } from '../components/checkout'
import { Menu } from '../components/menu'
import { Greeting } from '../components/greeting' 

function App() {

  return (
    <>
      <Greeting clientName="Mateus de Oliveira" />
      { <Checkout /> }
      <hr className="divisor" />
      { <Menu /> }
    </>
  )
}

export default App
