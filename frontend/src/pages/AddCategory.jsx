import { Greeting } from "../components/helpers/greeting";
import { MeuFormulario } from '../components/forms/formCategory';

function AddCategory() {
    return (
      <>
      { <Greeting clientName="Admin" />}
      <h3 className="basicTitle">Adicionar Categoria</h3>
      { <MeuFormulario /> }
      </>
    );
  }

  export default AddCategory;