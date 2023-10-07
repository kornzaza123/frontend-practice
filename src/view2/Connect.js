import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import Footter from "../component/Footter";
import "../assets/css/Content.css";
import "../assets/css/LandingPage.css";
import Monitor_title from '../assets/img/Dashboard/Vector.svg';
import ConnectTable from  "../component/Table/connectTable";
import sampleDataConnect from "./Data/sampleDataConnect.json";
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
import { connect } from "react-redux";
function Connect(params) {
  const [connect, setConnect] = useState(null);
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

  var config_oem = {
    method: "get",
    url: Configs.API_URL_AUTH + "/company/findOEMByCompanyId?id=" + user.com,
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
    },
  };

  var config_connect = {
    method: 'GET',
    // url: 'http://150.95.25.8:6682/powerMonitorConnection',
    url: 'http://localhost:4000/powerMonitorConnection',
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
    axios(config_connect)
      .then(function (response) {
        const data = response.data;
        setConnect(data);
      })
      .catch(function (error) {
        console.log(error + 'kuy');
      });
  }, []);

  console.log(connect);


  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <div className="monitor_title">
                <img src={Monitor_title} alt="" />
                <div className="title"><h1>Power <span>Monitor Connection</span></h1></div>
              </div>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/Welcome">Home</a>
                </li>
                <li className="breadcrumb-item active">Power Monitor Connection</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
        {connect === null ? (
            <div></div>
          ) : (
            <ConnectTable data={connect} allpage={true} />
        )}
          {/* <HistoryTable data={sampleDataHistory} allPage={true}/> */}
          {/* <ConnectTable data={sampleDataConnect} allPage={true}/> */}
        </div>
        {/* /.container-fluid */}
      </section>
    </div>
  );
}
export default Connect;
