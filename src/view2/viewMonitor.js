import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import Footter from "../component/Footter";
import "../assets/css/Content.css";
import "../assets/css/LandingPage.css";
import "../assets/css/addMonitor.css";
import Oem from "../component/OEM";
import CustomerService from "../component/CustomerService";
import view from '../assets/img/Dashboard/view.svg';
import { useLocation, useHistory } from 'react-router-dom';


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
import Swal from "sweetalert2";
function ViewMonitor(params) {
  const routerLocation = useLocation();
  const rowData = routerLocation.state?.rowData || {};
  const [user, setUser] = useState(getUser());
  const [user_detail, setUser_detail] = useState({});
  const [company, setCompany] = useState({});
  const [oem, setOem] = useState([]);
  const [po_sign, setpo_sign] = useState(getComConfig());
  const [size, setSize] = useState({
    width: 1280,
    height: 720,
  });
  const {
    monitor_id,
    monitor_name,
    monitor_detail,
    location,
    remark,
    hour,
    minute,
    frequency_api,
  } = rowData;
  console.log(frequency_api);
  console.log(monitor_id);
  console.log(rowData);

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

  const handleClick = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  function ViewMonitor() {
    const location = useLocation();
    const rowData = location.state?.rowData || {};
  }
  

  return (
    <div className="content-wrapper bg-[#FEFEFE]">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/Welcome">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/IoT_Master_Data/PowerMonitorConnection">Power Connection</a>
                </li>
                <li className="breadcrumb-item active">View Power Monitor</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div class="px-0 mx-auto max-w-7xl pb-5 sm:px-4 mx-bt">
            <div class="form-frame w-full px-8 pt-4 pb-2 mx-auto bg-white rounded-[10px] sm:rounded-lg sm:w-full md:w-8/12 lg:w-full xl:w-full sm:px-6">
              <div className="add-title">
                <img src={view}/>
                <h1 class="title-add font-semibold text-center text-gray-900">View Power Monitor</h1>
              </div>
              
              <form class="mt-[25px] mb-2 space-y-4">
                <label class="block">
                  <div class="block mb-1 text-gray-700 font-normal">Monitor ID <span>*</span></div>
                  <div className="form-view">{monitor_id}</div>
                </label>
                <label class="block">
                  <div class="block mb-1  text-gray-700 font-normal">Monitor Name<span>*</span></div>
                  <div className="form-view">{monitor_name}</div>
                </label>
                <label class="block">
                  <div class="block mb-1  text-gray-700 font-normal">Monitor Detail</div>
                  <div className="form-view area">{monitor_detail}</div>                </label>
                <label class="block">
                  <div class="block mb-1  text-gray-700 font-normal">Location <span>*</span></div>
                  <div className="form-view area">{location}</div>                
                </label>
                <label class="block">
                  <div class="block mb-1  text-gray-700 font-normal">Remark</div>
                  <div className="form-view area ">{remark}</div>
                </label>
                <label class="block">
                  <div class="block mb-1  text-gray-700 font-normal">Frequency API <span>*</span></div>
                    <div className="time-selected flex items-center">
                      <div className="form-view textarea">{hour}</div>                      
                      <div className="hour-freq ml-2 font-normal">hour</div>
                      <div className="form-view textarea ml-2">{minute}</div>
                      <div className="min-freq ml-2 font-normal">minute</div>
                    </div>
                </label>

                <div className="line"></div>
                <div className="bottom-phase">
  
                  <a href="/IoT_Master_Data/PowerMonitorConnection" className="form-button closes flex justify-center align-items-center" >
                    Close
                  </a>
                </div>
                
              </form>
            </div>
            </div>
        </div>
      </section>
    </div>
  );
}
export default ViewMonitor;