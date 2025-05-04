import { Greeting } from "../components/helpers/greeting";  
import { Settings } from "../components/layout/admin";

function Admin() {
    return (
      <>
      { <Greeting clientName="Admin" />}
      { <Settings /> }
      </>
    );
  }
  
  export default Admin;
  