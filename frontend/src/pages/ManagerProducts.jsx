import { Greeting } from '../components/greeting';
import '../styles/App.css';
import { Section } from '../components/divSection'

function ManagerProducts() {
    return (
        <>
            <Greeting clientName="Admin" />
            <h1 className='basicTitle'>Gerenciar Produtos</h1>
            <Section />
        </>
    )
}

export default ManagerProducts