import { Greeting } from "../components/helpers/greeting";
import { MeuFormulario } from '../components/layout/addProduct';

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