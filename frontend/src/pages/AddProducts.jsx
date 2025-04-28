import { Header } from "../components/header"
import { Greeting } from "../components/greeting";
import { MeuFormulario } from '../components/form';

function AddProduct() {
    return (
      <>
      { <Header /> }
      { <Greeting clientName="Admin" />}
      <h3 className="basicTitle">Adicionar Produtos</h3>
      { <MeuFormulario /> }
      </>
    );
  }

  export default AddProduct;