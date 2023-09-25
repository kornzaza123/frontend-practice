import React, { useCallback, useState, useEffect } from "react";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import Footter from "../component/Footter";
import "../assets/css/Content.css";
import "../assets/css/LandingPage.css";
import "../assets/css/addMonitor.css";
import Oem from "../component/OEM";
import CustomerService from "../component/CustomerService";
import { useLocation, useHistory } from 'react-router-dom';



import edit from '../assets/img/Dashboard/view.svg';

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
function EditMonitor(params) {
  const history = useHistory();
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

  const handleClickUpdate = (event) => {
    event.preventDefault();

    const missingFields = [];

    // Check if the required fields are filled
    if (!idValue) {
      missingFields.push('Monitor ID');
    }
    if (!nameValue) {
      missingFields.push('Monitor Name');
    }
    if (!locationValue) {
      missingFields.push('Location');
    }
    if (!hourValue && !minuteValue) {
      missingFields.push('Frequency');
    }

    if (missingFields.length > 0) {
      Swal.fire({
        title: 'Error',
        html: `Please fill in the following required fields: <br>${missingFields.join('<br>')}`,
        icon: 'error',
        confirmButtonColor: '#1A56DB',
        customClass: {
          cancelButton: 'custom-swal-cancel-button',
        },
      });
      return; // Don't proceed if required fields are missing
    }

    Swal.fire({
      title: 'Confirm Changes',
      text: 'Are you sure you want to Change Power monitor?',
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#1A56DB',
      confirmButtonText: 'Confirm',
      customClass: {
        cancelButton: 'custom-swal-cancel-button',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        history.push('/IoT_Master_Data/PowerMonitorConnection');
      }
    });
  };

  const handleClickCancel = (event) => {
    event.preventDefault();
    
      Swal.fire({
        title: 'Cancel',
        text: 'Are you sure you want to cancel this process?',
        icon: 'warning',
        showCancelButton: true,
        reverseButtons: true,
        // cancelButtonColor: '#FFF',
        confirmButtonColor: '#1A56DB',
        confirmButtonText: 'Confirm',
        customClass: {
          cancelButton: 'custom-swal-cancel-button', // Apply the custom class to the cancel button
        },

      }).then((result) => {
        if (result.isConfirmed) {
          history.push('/IoT_Master_Data/PowerMonitorConnection');
        }
      });
    
  };

  
  const {
    monitor_id,
    monitor_name,
    monitor_detail,
    location,
    remark,
    hour,
    minute
  } = rowData;

  const [idValue, setID] = useState(monitor_id);

  const handleInputChangeID = (event) => {
    setID(event.target.value);
  };

  const [nameValue, setName] = useState(monitor_name);

  const handleInputChangeName = (event) => {
    setName(event.target.value);
  };

  const [detailValue, setDynamicDetail] = useState(monitor_detail);

  const handleInputChangeDetail = (event) => {
    setDynamicDetail(event.target.value);
  };

  const [locationValue, setLocation] = useState(location);

  const handleInputChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const [reamarkValue, setRemark] = useState(remark);

  const handleInputChangeRemark = (event) => {
    setRemark(event.target.value);
  };

  const [hourValue, setHour] = useState(hour);

  const handleInputChangeHour = (event) => {
    setHour(event.target.value);
  };

  const [minuteValue, setMinute] = useState(minute);

  const handleInputChangeMinute = (event) => {
    setMinute(event.target.value);
  };

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
                <li className="breadcrumb-item active">Edit Power Monitor</li>
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
                <img src={edit}/>
                <h1 class="title-add font-semibold text-center text-gray-900">Edit Power Monitor</h1>
              </div>
              
              <form class="mt-[25px] mb-2 space-y-4">
                <label class="block">
                  <div class="block mb-1 text-gray-700 font-normal">Monitor ID <span>*</span> </div>
                  <input type="text" class="form-input" value={idValue} onChange={handleInputChangeID} maxlength="6" required />
                </label>
                <label class="block">
                  <div class="block mb-1  text-gray-700 font-normal">Monitor Name <span>*</span></div>
                  <input type="text" class="form-input" value={nameValue} onChange={handleInputChangeName} required/>
                </label>
                <label class="block">
                  <div class="block mb-1  text-gray-700 font-normal">Monitor Detail</div>
                  <textarea class="form-input area" id="detail" rows="3" value={detailValue} onChange={handleInputChangeDetail} ></textarea>
                </label>
                <label class="block">
                  <div class="block mb-1  text-gray-700 font-normal">Location <span>*</span></div>
                  <textarea class="form-input area" id="location" rows="3" value={locationValue} onChange={handleInputChangeLocation} required></textarea>
                </label>
                <label class="block">
                  <div class="block mb-1  text-gray-700 font-normal">Remark</div>
                  <textarea class="form-input area" id="remark" rows="3" value={reamarkValue} onChange={handleInputChangeRemark}></textarea>
                </label>
                <label class="block">
                  <div class="block mb-1  text-gray-700 font-normal">Frequency API <span>*</span></div>
                    <div className="time-selected flex items-center">
                      <input class="form-input freq" type="number" min="00" max="24" placeholder="0" required value={hourValue} onChange={handleInputChangeHour} />
                      <div className="hour-freq ml-2 font-normal">hour</div>
                      <input class="form-input freq ml-2" type="number" min="00" max="24" placeholder="0" required value={minuteValue} onChange={handleInputChangeMinute} />
                      <div className="min-freq ml-2 font-normal">minute</div>
                    </div>
                </label>

                <div className="line"></div>
                <div className="bottom-phase">
                <input type="submit" className="form-button cancel" value="Cancel" onClick={handleClickCancel}/>

                <input type="submit" className="form-button add" value="Update Monitor" onClick={handleClickUpdate}/>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default EditMonitor;
