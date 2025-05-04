import '../styles/App.css'
import { Checkout } from '../components/helpers/checkout'
import { Menu } from '../components/layout/menu'
import { Greeting } from '../components/helpers/greeting' 

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
