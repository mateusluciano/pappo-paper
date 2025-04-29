import { Greeting } from "../components/greeting";
import { MeuFormulario } from '../components/formProduct';

function AddProduct() {
    return (
      <>
      { <Greeting clientName="Admin" />}
      <h3 className="basicTitle">Adicionar Produtos</h3>
      { <MeuFormulario /> }
      </>
    );
  }

  export default AddProduct;