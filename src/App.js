import './App.css';
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './Components/HomePage/HomePage';
import Lessons from './Components/Lessons/Lessons';

function App() {
  return (
     <Router>
     <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/lessons">
          <Lessons />
        </Route>
     </Switch>
 </Router>
  );
}

export default App;
