import logo from './logo.svg';
import './App.css';
import CustomerForm from "./CustomerForm/CustomerForm";
import CustomerTable from "./CustomerTable/CustomerTable";
import CustomerDetails from "./CustomerDetails/CustomerDetails";
import GoogleFrom from "./Components/GoogleForm";
import Centeredtabs from "./Components/Tabs";
import GoogleQues from "./Components/GoogleQues";
import RegistrationForm from "./Components/Registeration";
import Login from "./Components/Login";
import QuestionForm from "./Components/QuestionForm";

import { BrowserRouter as Router, Route, IndexRoute } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Centeredtabs/> */}
      <Route path={"/gajanansurwase-angularminds.github.io"} component={RegistrationForm} exact/>
      <Route path={"/GoogleQues"} component={GoogleQues} />
      <Route path={"/GoogleFrom"} component={GoogleFrom} />
      <Route path={"/QuestionForm"} component={QuestionForm} />
      <Route path={"/Login"} component={Login} />

      </Router>
      {/* <CustomerTable/> */}
      {/* <Router>
        <Route path={"/"} component={CustomerTable} exact/>
        <Route path={"/customerform"} component={CustomerForm} />
        <Route path={"/customerdetails"} component={CustomerDetails} />

      </Router> */}

    </div>
  );
}

export default App;
