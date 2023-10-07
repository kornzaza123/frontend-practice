import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Langingpage from "./templates2/main";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./view2/Auth/Login";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/login`}
            component={Login}
          />
          {/* <Route exact path={`${process.env.PUBLIC_URL}/employee_history`} component={Info}/> */}
          {/* <Route exact path={`${process.env.PUBLIC_URL}/employee_history/:id`} component={() => <Info mode="edit" />}/>
      <Route exact path={`${process.env.PUBLIC_URL}/employee_history`} component={() => <Info mode="add" />}/> */}
          {/*<Route exact path={`${process.env.PUBLIC_URL}/employee_history`} component={Info}/> */}
          {/*    <Route exact path={`${process.env.PUBLIC_URL}/employee_history/:id`} component={Info}/> */}
         
          <PrivateRoute
            path={`${process.env.PUBLIC_URL}/`}
            component={Langingpage}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
