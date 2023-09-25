import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import Footter from "../component/Footter";
import "../assets/css/Content.css";
import "../assets/css/LandingPage.css";
import Monitor_title from '../assets/img/Dashboard/Vector.svg';
import HistoryTable from  "../component/Table/historyTable";
import sampleDataHistory from "./Data/sampleDataHistory.json";
import Oem from "../component/OEM";
import CustomerService from "../component/CustomerService";
import Table from "../component/table";
import { getUser, getToken, setOemlist, getOem, getComConfig } from "../Utils/Common";
import Configs from "../config";
import axios from "axios";

import {
  Icon_factory,
  factory,
  userdefault_img,
  Icon_contact,
  Icon_Choose,
} from "../routes/imgRoute/imgUrl";
import FGInOutTable from "../component/Table/fgTable";

function FGInOut(params) {
  const [his, setHis] = useState(null); // Initialize as null
  const [user, setUser] = useState(getUser());
  const [user_detail, setUser_detail] = useState({});
  const [company, setCompany] = useState({});
  const [oem, setOem] = useState([]);
  const [po_sign, setpo_sign] = useState(getComConfig());
  const [size, setSize] = useState({
    width: 1280,
    height: 720,
  });

  var config_user = {
    method: "get",
    url: Configs.API_URL_AUTH + "/company/findUserById?id=" + user.fup,
    headers: {
      Authorization: getToken(),
      "X-TTT": Configs.API_TTT,
      "Content-Type": "application/json",
    },
  };

  var config_com = {
    method: "get",
    url: Configs.API_URL_AUTH + "/company/findById?id=" + user.com,
    headers: {
      Authorization: getToken(),
      "X-TTT": Configs.API_TTT,
      "Content-Type": "application/json",
    },
  };

  var config_his = {
    method: 'GET',
    url: 'http://150.95.25.8:6682/historyPowerMonitor',
    headers: {
      Authorization: getToken(),
      "X-TTT": Configs.API_TTT,
      "Content-Type": "application/json",
    },
    redirect: 'follow'
  };

  useEffect(() => {
    // Fetch user data
    axios(config_user)
      .then(function (response) {
        setUser_detail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    // Fetch company data
    axios(config_com)
      .then(function (response) {
        const data = response.data;
        setCompany(data);
        setOem(data.oem);
      })
      .catch(function (error) {
        console.log(error);
      });

    // Fetch history data
    axios(config_his)
      .then(function (response) {
        const data = response.data;
        setHis(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);



  

  return (
    <div className="content-wrapper">
      <section className="content-header">
      <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <div className="monitor_title">
                <img src={Monitor_title} alt="" />
                <div className="title"><h1>F/G <span>In-Out</span></h1></div>
              </div>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/Welcome">IoT Connection</a>
                </li>
                <li className="breadcrumb-item active">F/G In-Out</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        
        <div className="container-fluid">
          {his === null ? (
            <p></p>
          ) : (
            <FGInOutTable data={his} allpage={true} />
          )}

          
        </div>
      </section>
    </div>
  );
}

export default FGInOut;
