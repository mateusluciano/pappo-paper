import { Greeting } from "../components/greeting";  
import { Settings } from "../components/settings";

function Admin() {
    return (
      <>
      { <Greeting clientName="Admin" />}
      { <Settings /> }
      </>
    );
  }
  
  export default Admin;
  