import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

// import Monitor_title from './Monitor_title.png';
import Monitor_title from '../assets/img/Dashboard/Vector.svg';
import today from "../assets/img/Dashboard/today.svg";
import monthly from '../assets/img/Dashboard/monthly.svg';
import yearly from '../assets/img/Dashboard/yearly.svg';
import total from '../assets/img/Dashboard/total.svg';
import detail from '../assets/img/Dashboard/details.svg'

import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import Footter from "../component/Footter";
import "../assets/css/Content.css";
import "../assets/css/LandingPage.css";
import "../assets/css/Dashboard.css";
import Oem from "../component/OEM";
import CustomerService from "../component/CustomerService";
import {
  getUser,
  getToken,
  setOemlist,
  getOem,
  getComConfig,
} from "../Utils/Common";
import Configs from "../config";
import axios from "axios";
import {
  Icon_factory,
  factory,
  userdefault_img,
  Icon_contact,
  Icon_Choose,
} from "../routes/imgRoute/imgUrl";
import CurrentChart from "../component/Charts/currentChart";
import PowerChart from "../component/Charts/powerChart";
import EnergyChart from "../component/Charts/energyChart";
import VoltageChart from "../component/Charts/voltageChart";
import FrequencyChart from "../component/Charts/frequencyChart"
const handleClick = (e) => {
  console.log(e.target.name);
};
function Dashboad(params) {
  const [startDate, setStartDate] = useState(new Date());
  const [user, setUser] = useState(getUser());
  const [user_detail, setUser_detail] = useState({});
  const [company, setCompany] = useState({});
  const [oem, setOem] = useState([]);
  const [po_sign, setpo_sign] = useState(getComConfig());
  const [monitorData, setdata] = useState()
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

  useEffect(() => {
    axios(config_user)
      .then(function (response) {
        setUser_detail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios(config_com)
      .then(function (response) {
        const data = response.data;
        setCompany(data);
        setOem(data.oem);
        /* console.log(response.data); */
      })
      .catch(function (error) {
        console.log(error);
      });

    /*  axios(config_oem)
      .then(function (response) {
        console.log(oem)
        setOem(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
 */
    /* console.log(getOem()); */
  }, []);

  const current = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = current.toLocaleDateString(undefined, options);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <div className="monitor_title">
                <img src={Monitor_title} alt="" />
                <div className="title"><h1>Dashboard <span>Power Monitor</span></h1></div>
              </div>
              <div className="date-display"><p>Today {formattedDate}</p></div>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/Welcome">Home</a>
                </li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="overview">Overview</div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 sm:grid-cols-2">
            
            <div className="card">
              <div className="card-monitor grid grid-cols-4">
                <div className="col-span-1">
                  <img className="card-image" src={today} />
                </div>
                <div className="col-span-3">
                  <div className="monitor_card card-body">
                    <div className="card-title">Today's Energy</div>
                    
                    <div className="card-value">0.12 kWh</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-monitor grid grid-cols-4">
                <div className="col-span-1">
                  <img className="card-image" src={monthly} />
                </div>
                <div className="col-span-3">
                  <div className="monitor_card card-body">
                    <div className="card-title">Monthly Energy</div>
                    
                    <div className="card-value">0.60 kWh</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-monitor grid grid-cols-4">
                <div className="col-span-1">
                  <img className="card-image-little" src={yearly} />
                </div>
                <div className="col-span-3">
                  <div className="monitor_card card-body">
                    <div className="card-title">Yearly Energy</div>
                    
                    <div className="card-value">1.15 kWh</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-monitor grid grid-cols-4">
                <div className="col-span-1">
                  <img className="card-image-little" src={total} />
                </div>
                <div className="col-span-3">
                  <div className="monitor_card card-body">
                    <div className="card-title">Total Energy</div>
                    
                    <div className="card-value">2.45 kWh</div>
                  </div>
                </div>
              </div>
            </div>
                        
          </div>

          <div className="filter">

            <div className="multi-button">
              <button className="first">Day</button>
              <button >Month</button>
              <button className="third">Year</button>
            </div>

            {/* <div className="Date"> 
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div> */}
          </div>

          <div className="chart grid grid-cols-1">
            <div className="card chart-monitors">
              <div className="title-chart">
                <h2>Comparison</h2>
                <p>Comparison Current</p>
              </div>
            
              <div className="grid grid-cols-3">
                <div className="col-span-2">
                  <CurrentChart/>
                  
                </div>
                <div className="col-span-1">
                  <div className="card-list-main max-w-[300px]">
                      <div className="card-header">Selected Monitors</div>
                      <div className="listt h-[200px]">
                        <div className="monitor-list-main">
                          <div class="circle bg-[#291D89]"></div>
                          <p>Monitor A</p>
                          <div class="list-value">5.21 A</div>
                        </div>
                        <div className="monitor-list-main">
                          <div class="circle bg-[#1F78B4]"></div>
                          <p>Monitor B</p>
                          <div class="list-value">4.32 A</div>
                        </div>
                        <div className="monitor-list-main">
                          <div class="circle bg-[#7BBDED]"></div>
                          <p>Monitor C</p>
                          <div class="list-value">2.12 A</div>
                        </div>
                        <div className="monitor-list-main">
                          <div class="circle bg-[#E31A1C]"></div>
                          <p>Monitor D</p>
                          <div class="list-value">1.98 A</div>
                        </div>
                        <div className="monitor-list-main">
                          <div class="circle bg-[#FB9A99]"></div>
                          <p>Monitor E</p>
                          <div class="list-value">1.23 A</div>
                        </div>
                        <div className="monitor-list-main">
                          <div class="circle bg-[#D4DCF0]"></div>
                          <p>Monitor F</p>
                          <div class="list-value">2.15 A</div>
                        </div>
                        
                      </div>
                    </div>

                </div>
                
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-5">
            <div className="card chart-monitors">
              <div className="title-chart">
                <h2>Power</h2>
                <p>Power Usage</p>
              </div>
            
              <div className="grid grid-cols-3">
                <div className="col-span-2">
                  <PowerChart/>
                  
                </div>
                <div className="col-span-1">
                  <div className="card-list">
                      <div className="card-headers">
                        <div className="flex title-type">
                          <img src={detail} alt="" />
                          <h2> Power details</h2>
                        </div>
                        <div className="monitor-list">
                          <p>Type</p>
                          <p>Value</p>
                        </div>
                      </div>
                      <div className="listt">
                        
                        <div className="monitor-list">
                          <p>Minimum</p>
                          <div class="list-value">2.12 W</div>
                        </div>
                        <div className="monitor-list">
                          <p>Maximum</p>
                          <div class="list-value">1.98 W</div>
                        </div>
                        <div className="monitor-list">
                          <p>Average</p>
                          <div class="list-value">1.23 W</div>
                        </div>
                        
                      </div>
                  </div>

                </div>
                
              </div>
              
            </div>
            <div className="card chart-monitors">
              <div className="title-chart">
                <h2>Energy</h2>
                <p>Energy Usage</p>
              </div>
            
              <div className="grid grid-cols-3">
                <div className="col-span-2">
                  <EnergyChart/>
                  
                </div>
                <div className="col-span-1">
                <div className="card-list">
                      <div className="card-headers">
                        <div className="flex title-type">
                          <img src={detail} alt="" />
                          <h2>Energy details</h2>
                        </div>
                        <div className="monitor-list">
                          <p>Type</p>
                          <p>Value</p>
                        </div>
                      </div>
                      <div className="listt">
                        
                        <div className="monitor-list">
                          <p>Minimum</p>
                          <div class="list-value">2.12 kWh</div>
                        </div>
                        <div className="monitor-list">
                          <p>Maximum</p>
                          <div class="list-value">1.98 kWh</div>
                        </div>
                        <div className="monitor-list">
                          <p>Average</p>
                          <div class="list-value">1.23 kWh</div>
                        </div>
                        
                      </div>
                  </div>

                </div>
                
              </div>
              
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="card chart-monitors">
              <div className="title-chart">
                <h2>Voltage</h2>
                <p>Voltage Usage</p>
                {/* <div className="chart-title">Voltage (V)</div> */}
              </div>

            
              <div className="grid grid-cols-3">
                <div className="col-span-2">
                  <VoltageChart/>
                  
                </div>
                <div className="col-span-1">
                <div className="card-list">
                      <div className="card-headers">
                        <div className="flex title-type">
                          <img src={detail} alt="" />
                          <h2>Voltage details</h2>
                        </div>
                        <div className="monitor-list">
                          <p>Type</p>
                          <p>Value</p>
                        </div>
                      </div>
                      <div className="listt">
                        
                        <div className="monitor-list">
                          <p>Minimum</p>
                          <div class="list-value">2.12 V</div>
                        </div>
                        <div className="monitor-list">
                          <p>Maximum</p>
                          <div class="list-value">1.98 V</div>
                        </div>
                        <div className="monitor-list">
                          <p>Average</p>
                          <div class="list-value">1.23 V</div>
                        </div>
                        
                      </div>
                  </div>

                </div>
                {/* <div className="time-title">Time (h)</div> */}
              </div>
              
            </div>
            <div className="card chart-monitors">
              <div className="title-chart">
                <h2>Frequency</h2>
                <p>Frequency Usage</p>
              </div>
            
              <div className="grid grid-cols-3">
                <div className="col-span-2">
                  <FrequencyChart/>
                  
                </div>
                <div className="col-span-1">
                <div className="card-list">
                      <div className="card-headers">
                        <div className="flex title-type">
                          <img src={detail} alt="" />
                          <h2>Frequency detail</h2>
                        </div>
                        <div className="monitor-list">
                          <p>Type</p>
                          <p>Value</p>
                        </div>
                      </div>
                      <div className="listt">
                        
                        <div className="monitor-list">
                          <p>Minimum</p>
                          <div class="list-value">2.12 Hz</div>
                        </div>
                        <div className="monitor-list">
                          <p>Maximum</p>
                          <div class="list-value">1.98 Hz</div>
                        </div>
                        <div className="monitor-list">
                          <p>Average</p>
                          <div class="list-value">1.23 Hz</div>
                        </div>
                        
                      </div>
                  </div>

                </div>
                
              </div>
              
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
export default Dashboad;
