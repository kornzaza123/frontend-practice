import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import Footter from "../component/Footter";
import "../assets/css/Content.css";
import "../assets/css/LandingPage.css";
import "../assets/css/addMonitor.css";
import Oem from "../component/OEM";
import CustomerService from "../component/CustomerService";
import { useLocation, useHistory } from 'react-router-dom';

import view from '../assets/img/Dashboard/view.svg';

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
function AddMonitor(params) {
  const history = useHistory();

  const [dataInput, addData] = useState({
    monitorId: "",
    monitorName: "",
    location: "",
    frequency: "",
  });

  const handleClickAdd = (event) => {
    event.preventDefault();

    const missingFields = [];

    // Check if the required fields are filled
    if (!dataInput.monitorId) {
      missingFields.push('Monitor ID');
    }
    if (!dataInput.monitorName) {
      missingFields.push('Monitor Name');
    }
    if (!dataInput.location) {
      missingFields.push('Location');
    }
    if (!dataInput.frequency) {
      missingFields.push('Frequency');
    }

    // Check if the required fields are filled
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

    // Create an object containing the monitor data to send to the server
    const monitorData = {
      monitorId: dataInput.monitorId,
      monitorName: dataInput.monitorName,
      location: dataInput.location,
      frequency: dataInput.frequency,
      // Add other fields here if needed
    };

    // Define the configuration for the POST request
    var config_add = {
      method: 'POST',
      url: 'http://localhost:4000/powerMonitorConnection/add', // Make sure this URL matches your server endpoint
      headers: {
        Authorization: getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: monitorData, // Include the monitorData in the request body
    };

    // Send a POST request to your server using the config_add object
    axios(config_add)
      .then((response) => {
        // Handle the response from the server, e.g., show a success message
        Swal.fire({
          title: 'Success',
          text: 'Power monitor added successfully!',
          icon: 'success',
          confirmButtonColor: '#1A56DB',
          customClass: {
            cancelButton: 'custom-swal-cancel-button',
          },
        }).then(() => {
          history.push('/IoT_Master_Data/PowerMonitorConnection');
        });
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while adding the power monitor. Please try again later.',
          icon: 'error',
          confirmButtonColor: '#1A56DB',
          customClass: {
            cancelButton: 'custom-swal-cancel-button',
          },
        });
      });
  };

  const handleClickCancel = (event) => {
    event.preventDefault();
    {
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
                <li className="breadcrumb-item active">Add Power Monitor</li>
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
                <h1 class="title-add text-center text-gray-900">Add Power Monitor</h1>
              </div>
              
              <form className="mt-[25px] mb-2 space-y-4">
                <label className="block">
                  <div className="block mb-1 text-gray-700 font-normal">Monitor ID <span>*</span></div>
                  <input className="form-input" type="text" maxlength="6" required onChange={(e) => addData({ ...dataInput, monitorId: e.target.value })}/>
                </label>
                <label className="block">
                  <div className="block mb-1  text-gray-700 font-normal">Monitor Name<span>*</span></div>
                  <input className="form-input" type="text" required onChange={(e) => addData({ ...dataInput, monitorName: e.target.value })}/>
                </label>
               
                <label className="block">
                  <div className="block mb-1  text-gray-700 font-normal">Monitor Detail</div>
                  <textarea className="form-input area" id="detail" rows="3"></textarea>
                </label>
                <label className="block">
                  <div className="block mb-1  text-gray-700 font-normal">Location <span>*</span></div>
                  <textarea className="form-input area" id="location" rows="3" required onChange={(e) => addData({ ...dataInput, location: e.target.value })}></textarea>
                </label>
                <label className="block">
                  <div className="block mb-1  text-gray-700 font-normal">Remark</div>
                  <textarea className="form-input area" id="remark" rows="3"></textarea>
                </label>
                <label className="block">
                  <div className="block mb-1  text-gray-700 font-normal">Frequency API <span>*</span></div>
                    <div className="time-selected flex items-center">
                      <input class="form-input freq" type="number" min="00" max="24" placeholder="0" required />
                      <div className="hour-freq ml-2 font-normal">hour</div>
                      <input class="form-input freq ml-2" type="number" min="00" max="60" placeholder="0" required onChange={(e) => addData({ ...dataInput, frequency: e.target.value })}/>
                      <div className="min-freq ml-2 font-normal">minute</div>
                    </div>
                </label>

                <div className="line"></div>
                <div className="bottom-phase">
                  <input type="submit" className="form-button cancel" value="Cancel" onClick={handleClickCancel}/>
                  <input type="submit" className="form-button add" value="Add Monitor" onClick={handleClickAdd} />
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default AddMonitor;
