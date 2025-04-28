import { Header } from "../components/header"
import { Greeting } from "../components/greeting";  
import { Settings } from "../components/settings";

function Admin() {
    return (
      <>
      { <Header /> }
      { <Greeting clientName="Admin" />}
      { <Settings /> }
      </>
    );
  }
  
  export default Admin;
  