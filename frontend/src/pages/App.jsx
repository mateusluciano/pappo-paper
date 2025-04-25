import '../styles/App.css'
import { Header } from '../components/header'
import { Checkout } from '../components/checkout'
import { Menu } from '../components/menu'
import { Greeting } from '../components/greeting' 

function App() {

  return (
    <>
      { <Header /> }
      { <Greeting clientName="Mateus de Oliveira" />}
      { <Checkout /> }
      <hr className="divisor" />
      { <Menu /> }
    </>
  )
}

export default App
