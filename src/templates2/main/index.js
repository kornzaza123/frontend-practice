import React, { useState, useEffect } from "react";
import Headers from '../../component/Header';

import { setCurrentPath, removeUserSession, removeOem } from "../../Utils/Common";
import { BrowserRouter as Router, Switch, Redirect, Route, useLocation } from "react-router-dom";
import Footter from "../../component/Footter";
import Sidebar from "../../component/Sidebar2";
import Swal from 'sweetalert2';
import {
  Langingview,

  Dashboard,

  History,
  
  Connect,

  AddMonitor,

  ViewMonitor,

  EditMonitor,


} from '../../view2';
import FGInOut from "../../view2/FGInOut";


const Homepage = () => {
  const location = useLocation();
  /*   var test = getCurrentPath(); */
  useEffect(() => {
    sessionStorage.setItem("timeline", 0);
    setCurrentPath(location.pathname)
    //let status = 0;

    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keydown"
    ];
    var fiveMinutes = 60 * 31;

    var myInterval = setInterval(myTimer, 1000);
    //countdown(fiveMinutes);
    var timer = fiveMinutes, minutes, seconds;
    function myTimer() {

      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      // console.log(timer)
      if (timer === 60) {

        //console.log("timer")
        Swal.fire({
          position: 'top',
          allowOutsideClick: false, icon: 'info',
          title: 'คุณไม่ได้ทำรายการใดๆ เป็นเวลา 30 นาที',
          text: 'หากไม่ทำรายการใดๆต่อ \n จะออกจากระบบอัตโนมัติภายใน 1 นาที',
          showConfirmButton: true,
        }).then((result) => {

        })
      }
      if (--timer < 0) {
        removeUserSession();
        removeOem();
        sessionStorage.removeItem("setupTime");
        sessionStorage.removeItem("feature");
        sessionStorage.removeItem("com_config");
        window.location.href = "/login";
      } else {
        //console.log( minutes + ":" + seconds)

        sessionStorage.setItem('setupTime', minutes + ":" + seconds);
      }
    }
    for (var e = 0; e < events.length; e++) {
      //console.log(events);
      document.addEventListener(events[e], (event) => {

        clearInterval(myInterval);
        timer = 60 * 31;
        myInterval = setInterval(myTimer, 1000);

      }, false);

    }



  }, [])
  return (
    <div className="wrapper">
      <Headers />
      <Sidebar />

      <Switch>
        {/*       <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login}/> */}
        <Redirect exact from={`${process.env.PUBLIC_URL}/`} to={`${process.env.PUBLIC_URL}/Welcome`} />

        {/*   <Route exact path={`${process.env.PUBLIC_URL}/`} component={Langingview} /> */}

        <Route exact path={`${process.env.PUBLIC_URL}/Welcome`} component={Langingview} />
        <Route exact path={`${process.env.PUBLIC_URL}/IOT_Connect/Dashboard_Power_Monitor`} component={Dashboard} />
        <Route exact path={`${process.env.PUBLIC_URL}/Statistic_n_History/HistoryPowerMonitor`} component={History} />
        <Route exact path={`${process.env.PUBLIC_URL}/IoT_Master_Data/PowerMonitorConnection`} component={Connect} />
        <Route exact path={`${process.env.PUBLIC_URL}/IoT_Master_Data/PowerMonitorConnection/addMonitor`} component={AddMonitor} />
        <Route exact path={`${process.env.PUBLIC_URL}/IoT_Master_Data/PowerMonitorConnection/viewMonitor`} component={ViewMonitor} />
        <Route exact path={`${process.env.PUBLIC_URL}/IoT_Master_Data/PowerMonitorConnection/editMonitor`} component={EditMonitor} />

        <Route exact path={`${process.env.PUBLIC_URL}/IOT_Connect/FG_In_Out`} component={FGInOut} />

      </Switch>

      <Footter />
    </div>
  );
}

export default Homepage;
