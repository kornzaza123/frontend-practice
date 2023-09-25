import React from 'react';
import { BrowserRouter as Router, Switch, Redirect ,Route } from "react-router-dom";
import Footter from "./component/Footter";
import Sidebar from "./component/Sidebar";
import Headers from './component/Header';
import Langingpage from './templates/main';
import PrivateRoute from './routes/PrivateRoute'
import Login from "./view/Auth/Login"
/* import Login from "./view/Auth/Login";
import PrivateRoute from './routes/PrivateRoute';
import Product from './view/WarehousMGT/Product';
import Product_add from './view/WarehousMGT/Product_add';
import Materail_add from './view/WarehousMGT/Materail_add';
import Materail from './view/WarehousMGT/Materail';
import FGInOut from './view/WarehousMGT/FGInOut';
import WIPInOut from './view/WarehousMGT/WIPInOut';
import RawMatInOut from './view/WarehousMGT/RawMatInOut';
import Warehouse_history from './view/WarehousMGT/Warehouse_history';
import Mat_Approve from './view/Materail_Requir_Plan/Approve';
import Product_Approve from './view/Product_Plan/Approve';
import Uploadorderforecast from './view/Product_Plan/Uploadorderforecast';
import MateForPO from './view/Materail_Requir_Plan/MateForPO';
import DeleveryRecord from './view/Static_n_History/DeleveryRecord';
import MaterailCon from './view/Static_n_History/MaterailCon';
import LogMonitory from './view/Quanlity_Control/LogMonitory';
import ModeTranning from './view/Quanlity_Control/ModeTranning';
import QCM from './view/Quanlity_Control/QCM';
import QIAI from './view/Quanlity_Control/QIAI' */
/* import {Langingview,
  ProdLineMGT,
ProcessMgt,
MachineSetup,
dashboard,
  Product,
  Product_add,
  Materail_add,
  Materail,
  Supplier,
  Supplier_add,
  Project,
  Project_add,
  FGInOut,
  WIPInOut,
  RawMatInOut,
  Warehouse_history,
  Mat_Approve,
  Product_Approve,
  OrderProduct,
  Uploadorderforecast,
  MateForPO,
  DeleveryRecord,
  MaterailCon,
  LogMonitory,
  ModeTranning,
  CuttingInOut,
  Product_Grouping,
  Production_Line,
  Factory_parameter,
  Factory_parameter_section_add,
  Factory_parameter_process_add,
  Factory_parameter_line_add,
  Factory_parameter_machine_add,
  QCM,
  OrderSummaryReport_add,
  OrderSummaryReport,
  QIAI,
  Factory_work_hours,
  Logistic,
  Logistic_add,
  End_user,
  End_user_add,
  LogisticInOut,
  End_userInOut,
  Customer,
  Customer_add,

} from './view'; */
function App() {
  return (
<div /* className="wrapper" */>
{/* 
        <Headers/>
        <Sidebar/>
      <div  className="content-wrapper"> */}
    <Router >
    <Switch>
      <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login}/>
      <PrivateRoute exact path={`${process.env.PUBLIC_URL}/`} component={Langingpage} />

      <PrivateRoute exact path={`${process.env.PUBLIC_URL}/Welcome`} component={Langingpage}/>
      <PrivateRoute exact path={`${process.env.PUBLIC_URL}/dashbord`} component={Langingpage}/>
    
    </Switch>
  </Router>
  {/* </div>
<Footter/> */}
  </div>
  );
}

export default App;
