import logo from './logo.svg';
import './App.css';
import CustomerForm from "./CustomerForm/CustomerForm";
import CustomerTable from "./CustomerTable/CustomerTable";
import CustomerDetails from "./CustomerDetails/CustomerDetails";
import { BrowserRouter as Router, Route, IndexRoute } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <CustomerForm />
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
