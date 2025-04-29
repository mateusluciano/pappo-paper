import { Header } from "../components/header"
import { Greeting } from "../components/greeting";
import { MeuFormulario } from '../components/formCategory';

function AddCategory() {
    return (
      <>
      { <Header /> }
      { <Greeting clientName="Admin" />}
      <h3 className="basicTitle">Adicionar Categoria</h3>
      { <MeuFormulario /> }
      </>
    );
  }

  export default AddCategory;