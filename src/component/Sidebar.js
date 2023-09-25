import React, { useEffect, useState } from "react";
import "../assets/css/Sidebar.css";
import { getUser, getToken, setOemlist, getOem } from "../Utils/Common";
import {
  logo_smz,
  logo_kubota,
  down_menulogoTTT_02,
  LogoPMRP_TTT_08,
  Icon_Materailplaning,
  Icon_productionplanning,
  Icon_warehousemanage,
  Icon_deliveryaddon,
  Icon_quality_control,
  menu_bt_blank,
  Icon_costmonitoring,
  userdefault_img
} from "../routes/imgRoute/imgUrl";
import Configs from "../config";
import axios from "axios";

const prod_icon = "far fa-calendar-check nav-icon";
const mate_icon = "fas fa-pen-square nav-icon";
const ware_icon = "fas fa-industry nav-icon";
const qc_icon = "fas far fa-check-circle nav-icon";

function Sidebar(params) {
  const [fixwarehousemenu, setFixwarehousemenu] = useState("");
  const [fixppmenu, setFixppmenu] = useState("");
  const [fixmrpmenu, setFixmrpmenu] = useState("");
  const [fixsnhmenu, setFixsnhmenu] = useState("");
  const [fixqcmenu, setFixqcmenu] = useState("");
  const [fixppapprove, setFixppapprove] = useState("");
  const [fixppuof, setFixppuof] = useState("");
  const [fixorder, setFixorder] = useState("");
  const [fixosr, setfixosr] = useState("")
  const [fixmrpapprove, setFixmrpapprove] = useState("");
  const [fixmrparm, setFixmrparm] = useState("");
  const [matactive, setMatactive] = useState("");
  const [pro_group, setpro_group] = useState("");
  const [suppmenu, setsuppmenu] = useState("");
  const [projmenu, setprojmenu] = useState("");
  const [pro_line, setpro_line] = useState("");
  const [wipinout, setWipinout] = useState("");
  const [logisticinout, setlogisticinout] = useState("");
  const [end_userinout, setend_userinout] = useState("");
  const [history, setHistory] = useState("");
  const [fginout, setFginout] = useState("");
  const [rawmatinout, setRawmatinout] = useState("");
  const [cuttinginout, setCuttinginout] = useState("");
  const [fixsubmenu, setFixsubmenu] = useState("");
  const [productactive, setProductactive] = useState("");
  const [snhdr, setSnhdr] = useState("");
  const [snhmc, setSnhmc] = useState("");
  const [qcqc, setQCc] = useState("");
  const [facpara, setfacpara] = useState("");
  const [facworkhours,setfacworkhours] = useState("");
  const [logistic,setlogistic] = useState("");
  const [end_user,setend_user] = useState("");
  const [qcqi, setQCqi] = useState("");
  const [qclm, setQClm] = useState("");
  const [qcmt, setQCmt] = useState("");
  const [oem, setOem] = useState(getOem());
  const [oem_data, setOem_data] = useState([]);
  const [company, setcompany] = useState();
  const [customer, setcustomer] = useState("");

  useEffect(() => {
    const script = document.createElement("script");

    script.src = `js/Product`;
    document.body.appendChild(script);

    if (params.menu === "warehouse") {
      setFixwarehousemenu("menu-open");

      if (params.submenu === "factmaster") {
        setFixsubmenu("menu-open");
        
        if (params.activemenu === "product") {
          setProductactive("active");
        }else if (params.activemenu === "pro_group") {
          setpro_group("active");
        } else if (params.activemenu === "materail") {
          setMatactive("active");  
        }else if (params.activemenu === "suppmenu") {
          setsuppmenu("active");
        }else if (params.activemenu === "projmenu") {
          setprojmenu("active");
        }else if (params.activemenu === "pro_line") {
          setpro_line("active");
        }else if (params.activemenu === "facpara") {
          setfacpara("active");
        }else if (params.activemenu === "facworkhours") {
          setfacworkhours("active");
        }else if (params.activemenu === "logistic") {
          setlogistic("active");
        }else if (params.activemenu === "end_user") {
          setend_user("active");
        }else if (params.activemenu === "customer") {
          setcustomer("active");
        }

      } else if (params.activemenu === "cuttinginout") {
        setCuttinginout("active");
      } else if (params.activemenu === "wipinout") {
        setWipinout("active");
      }  else if (params.activemenu === "fginout") {
        setFginout("active");
      } else if (params.activemenu === "rawmatinout") {
        setRawmatinout("active");
      }
      else if (params.activemenu === "logisticinout") {
        setlogisticinout("active");
      }
      else if (params.activemenu === "end_userinout") {
        setend_userinout("active");
      }
    } else if (params.menu === "pp") {
      setFixppmenu("menu-open");

      if (params.activemenu === "approve") {
        setFixppapprove("active");
      } else if (params.activemenu === "uof") {
        setFixppuof("active");
      }else if (params.activemenu === "order") {
        setFixorder("active");
      }else if (params.activemenu === "osr") {
        setfixosr("active");
      }
    } else if (params.menu === "mrp") {
      setFixmrpmenu("menu-open");
      if (params.activemenu === "ami") {
        setFixmrpapprove("active");
      } else if (params.activemenu === "arm") {
        setFixmrparm("active");
      }
    } else if (params.menu === "snh") {
      setFixsnhmenu("menu-open");

      if (params.activemenu === "dr") {
        setSnhdr("active");
      } else if (params.activemenu === "mc") {
        setSnhmc("active");
      }else if (params.activemenu === "history") {
        setHistory("active");
      }
    } else if (params.menu === "qc") {
      setFixqcmenu("menu-open");
      if (params.activemenu === "lm") {
        setQClm("active");
      } else if (params.activemenu === "mt") {
        setQCmt("active");
      } else if (params.activemenu === "qcm") {
        setQCc("active");
      } else if (params.activemenu === "qiai") {
        setQCqi("active");
      }
    }
  }, []);

  var config_getOem = {
    method: "get",
    url: Configs.API_URL_AUTH + "/company/findOEMByCompanyId?id=" + getUser().com,
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
      "X-TTT": Configs.API_TTT,
    },
  };

  useEffect(() => {
    if (oem != undefined && oem != null && oem != "") {
      axios(config_getOem)
        .then(function (response) {
          response.data.map((el) => {
            if (el.id === oem) {
              return setOem_data(el);
            }
          });
        })

        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  var config_com = {
    method: "get",
    url: Configs.API_URL_AUTH + "/company/findById?id=" + getUser().com,
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
      "X-TTT": Configs.API_TTT,
    },
  };
  useEffect(() => {
    axios(config_com)
      .then(function (response) {
        //console.log(response.data);
        setcompany(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (oem) {
    return (
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4 set-bg">
          {/* Brand Logo */}
          <a
            href="/Welcome"
            className="brand-link"
            style={{
              backgroundImage: "url(" + LogoPMRP_TTT_08.imgs + ")",
            }}
          >
            <img
              src="dist/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ visibility: "hidden" }}
            />
            <span
              style={{ visibility: "hidden" }}
              className="brand-text font-weight-light"
            >
              TTTTTT
            </span>
          </a>

          <a
            href="/Welcome"
            className="brand-link"
            style={{ textAlign: "center" }}
          >
            <img
              alt="..."
              className="img-fluid rounded img-size-50 mr-3"
              src={
                company !== undefined &&
                company !== null &&
                company !== ""
                  ? Configs.API_URL_IMG+company.logo_path
                  : userdefault_img.imgs
              }
              style={{ width: "80px" , height:"75px"}}
            />
            <img
              alt="..."
              className="img-fluid rounded img-size-50 mr-3"
              src={
                oem_data !== undefined && oem_data !== null && oem_data !== ""
                  ?  Configs.API_URL_IMG + oem_data.logo_path
                  : userdefault_img.imgs
              }
              style={{ width: "80px" , height:"75px" }}
            />
          </a>
          {/* Sidebar */}
          <div className="sidebar sidebar-font" style={{marginBottom:"35px"}}> 
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item has-treeview">
                  <a
                    href="/dashbord"
                    className="nav-link ttt-menu-bg"
                    style={{
                      backgroundImage: "url(" + menu_bt_blank.imgs + ")",
                    }}
                  >
                    <span className="nav-icon fas ">
                      <img
                        alt="..."
                        className="img-fluid rounded img-size-50 mr-3"
                        src={Icon_costmonitoring.imgs}
                      />
                    </span>
                    <p>Dashboard</p>
                  </a>
                </li>

                <li className={"nav-item has-treeview " + fixppmenu}>
                  <a
                    href=""
                    className="nav-link ttt-menu-bg"
                    style={{
                      backgroundImage: "url(" + menu_bt_blank.imgs + ")",
                    }}
                  >
                    <span className="nav-icon fas ">
                      <img
                        alt="..."
                        className="img-fluid rounded img-size-50 mr-3"
                        src={Icon_productionplanning.imgs}
                      />
                    </span>
                    <p>
                      Production Planing
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item ">
                      <a
                        href="/Production_Planing/Upload_Order_Forecast"
                        className={"nav-link " + fixppuof}
                      >
                        <i className={prod_icon} />
                        <p>Upload Order Forecast</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/Production_Planing/Approve_Production_Item"
                        className={"nav-link " + fixppapprove}
                      >
                        <i className={prod_icon} />
                        <p>Approve Production Item</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/Production_Planing/Order_Production"
                        className={"nav-link " + fixorder}
                      >
                        <i className={prod_icon} />
                        <p>Order Production </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/Production_Planing/Order_Summary_Report"
                        className={"nav-link " + fixosr}
                      >
                        <i className={prod_icon} />
                        <p>Order Summary Report</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className={"nav-item has-treeview " + fixmrpmenu}>
                  <a
                    href=""
                    className="nav-link ttt-menu-bg"
                    style={{
                      backgroundImage: "url(" + menu_bt_blank.imgs + ")",
                    }}
                  >
                    <span className="nav-icon fas ">
                      <img
                        alt="..."
                        className="img-fluid rounded img-size-50 mr-3"
                        src={Icon_Materailplaning.imgs}
                      />
                    </span>
                    <p>
                      Material Requirement Planning
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a
                        href="/Material_Requirement_Planning/Approve_Material_item"
                        className={"nav-link " + fixmrpapprove}
                      >
                        <i className={mate_icon} />
                        <p>Approve Material item</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/Material_Requirement_Planning/Approve_Raw_Material_for_PO"
                        className={"nav-link " + fixmrparm}
                      >
                        <i className={mate_icon} />
                        <p>Approve Raw Material for PO</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className={"nav-item has-treeview " + fixwarehousemenu}>
                  <a
                    href=""
                    className="nav-link ttt-menu-bg"
                    style={{
                      backgroundImage: "url(" + menu_bt_blank.imgs + ")",
                    }}
                  >
                    <span className="nav-icon fas ">
                      <img
                        alt="..."
                        className="img-fluid rounded img-size-50 mr-3"
                        src={Icon_warehousemanage.imgs}
                      />
                    </span>
                    <p>
                      Warehouse Management
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                  
                    <li className="nav-item">
                      <a
                        href="/Warehouse_Management/Raw_Mat_In_Out"
                        className={"nav-link " + rawmatinout}
                      >
                        <i className={ware_icon} />
                        <p>Raw Mat IN/OUT</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/Warehouse_Management/CuttingInOut"
                        className={"nav-link " + cuttinginout}
                      >
                        <i className={ware_icon} />
                        <p>Cutting IN/OUT</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/Warehouse_Management/WIP_IN_OUT"
                        className={"nav-link " + wipinout}
                      >
                        <i className={ware_icon} />
                        <p>WIP IN/OUT</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/Warehouse_Management/End_user_IN_OUT"
                        className={"nav-link " + end_userinout}
                      >
                        <i className={ware_icon} />
                        <p>End_user IN/OUT</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/Warehouse_Management/Logistic_IN_OUT"
                        className={"nav-link " + logisticinout}
                      >
                        <i className={ware_icon} />
                        <p>Logistic IN/OUT</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/Warehouse_Management/F_G_In_Out"
                        className={"nav-link " + fginout}
                      >
                        <i className={ware_icon} />
                        <p>F/G IN/OUT</p>
                      </a>
                    </li>

                    <li className={"nav-item " + fixsubmenu}>
                      <a href="" className="nav-link">
                        <i className={ware_icon} />
                        <p>
                          Factory Master Data
                          <i className="right fas fa-angle-left"></i>
                        </p>
                      </a>
                      <ul className="nav nav-treeview ">
                        <li className="nav-item sub2-menu ">
                          <a
                            href="/Warehouse_Management/Factory_Master_Data/Product"
                            className={"nav-link " + productactive}
                          >
                            <span className="spacing"> </span>
                            <i className={ware_icon} />
                            <p>Product</p>
                          </a>
                        </li>
                        <li className="nav-item sub2-menu" /* style={{display:"none"}} */>
                          <a
                            href="/Warehouse_Management/Factory_Master_Data/Product_Grouping"
                            className={"nav-link " + pro_group}
                          >
                            <span className="spacing"> </span>
                            <i className={ware_icon} />
                            <p>Product Grouping</p>
                          </a>
                        </li>
                        <li className="nav-item sub2-menu">
                          <a
                            href="/Warehouse_Management/Factory_Master_Data/Raw_Materail"
                            className={"nav-link " + matactive}
                          >
                            <span className="spacing"> </span>
                            <i className={ware_icon} />
                            <p>Raw Material</p>
                          </a>
                        </li>
                      
                        <li className="nav-item sub2-menu" /* style={{display:"none"}} */>
                          <a
                            href="/Warehouse_Management/Factory_Master_Data/Supplier"
                            className={"nav-link " + suppmenu}
                          >
                            <span className="spacing"> </span>
                            <i className={ware_icon} />
                            <p>Supplier</p>
                          </a>
                        </li>
                        
                        <li className="nav-item sub2-menu" /* style={{display:"none"}} */>
                          <a
                            href="/Warehouse_Management/Factory_Master_Data/Project"
                            className={"nav-link " + projmenu}
                          >
                            <span className="spacing"> </span>
                            <i className={ware_icon} />
                            <p>Project</p>
                          </a>
                        </li>
                 
                        <li className="nav-item sub2-menu" /* style={{display:"none"}} */>
                          <a
                            href="/Warehouse_Management/Factory_Master_Data/Production_Line"
                            className={"nav-link " + pro_line}
                          >
                            <span className="spacing"> </span>
                            <i className={ware_icon} />
                            <p>Product Cycle Time</p>
                          </a>
                        </li>
                        <li className="nav-item sub2-menu" /* style={{display:"none"}} */>
                          <a
                            href="/Warehouse_Management/Factory_Master_Data/Factory_Parameter"
                            className={"nav-link " + facpara}
                          >
                            <span className="spacing"> </span>
                            <i className={ware_icon} />
                            <p>Factory Parameter</p>
                          </a>
                        </li>
                        <li className="nav-item sub2-menu" /* style={{display:"none"}} */>
                          <a
                            href="/Warehouse_Management/Factory_Master_Data/Factory_Work_Hours"
                            className={"nav-link " + facworkhours}
                          >
                            <span className="spacing"> </span>
                            <i className={ware_icon} />
                            <p>Factory Work Hours</p>
                          </a>
                        </li>
                        <li className="nav-item sub2-menu" /* style={{display:"none"}} */>
                          <a
                            href="/Warehouse_Management/Factory_Master_Data/Logistic"
                            className={"nav-link " + logistic}
                          >
                            <span className="spacing"> </span>
                            <i className={ware_icon} />
                            <p>Logistic</p>
                          </a>
                        </li>
                        <li className="nav-item sub2-menu" /* style={{display:"none"}} */>
                          <a
                            href="/Warehouse_Management/Factory_Master_Data/End_user"
                            className={"nav-link " + end_user}
                          >
                            <span className="spacing"> </span>
                            <i className={ware_icon} />
                            <p>End_user</p>
                          </a>
                        </li>
                        <li className="nav-item sub2-menu" /* style={{display:"none"}} */>
                          <a
                            href="/Warehouse_Management/Factory_Master_Data/Customer"
                            className={"nav-link " + customer}
                          >
                            <span className="spacing"> </span>
                            <i className={ware_icon} />
                            <p>Customer</p>
                          </a>
                        </li>
                      </ul>
                    </li>
                    
                  </ul>
                </li>
                <li className={"nav-item has-treeview " + fixsnhmenu}>
                  <a
                    href=""
                    className="nav-link ttt-menu-bg"
                    style={{
                      backgroundImage: "url(" + menu_bt_blank.imgs + ")",
                    }}
                  >
                    <span className="nav-icon fas ">
                      <img
                        alt="..."
                        className="img-fluid rounded img-size-50 mr-3"
                        src={Icon_deliveryaddon.imgs}
                      />
                    </span>
                    <p>
                      Statistic {"&"} History
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a
                        href="/Statistic_n_History/Delivery_Record"
                        className={"nav-link " + snhdr}
                      >
                        <i className={qc_icon} />
                        <p>Delivery Record</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/Statistic_n_History/Materail_Consumtion"
                        className={"nav-link " + snhmc}
                      >
                        <i className={qc_icon} />
                        <p>Material Consumtion</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/Warehouse_Management/Warehouse_History"
                        className={"nav-link " + history}
                      >
                        <i className={ware_icon} />
                        <p>Warehouse History</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className={"nav-item has-treeview " + fixqcmenu}>
                  <a
                    href=""
                    className="nav-link ttt-menu-bg"
                    style={{
                      backgroundImage: "url(" + menu_bt_blank.imgs + ")",
                    }}
                  >
                    <span className="nav-icon fas ">
                      <img
                        alt="..."
                        className="img-fluid rounded img-size-50 mr-3"
                        src={Icon_quality_control.imgs}
                      />
                    </span>
                    <p>
                      Quanlity Control
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a
                        href="/Quanlity_Control/Manual"
                        className={"nav-link " + qcqc}
                      >
                        <i className={qc_icon} />
                        <p>Quanlity Control(Manual)</p>
                      </a>
                    </li>
                    <li className="nav-item ">
                      <a
                        href="/Quanlity_Control/AI"
                        className={"nav-link " + qcqi}
                      >
                        <i className={qc_icon} />
                        <p>Quanlity Inspection (AI)</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/Quanlity_Control/Model_Traning"
                        className={"nav-link " + qcmt}
                      >
                        <i className={qc_icon} />
                        <p>Model Traning</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/Quanlity_Control/Log_Monitor"
                        className={"nav-link " + qclm}
                      >
                        <i className={qc_icon} />
                        <p>Log Monitory</p>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
           
          </div>

          <img
              alt="..."
              className="img-fluid botton-img"
              src={down_menulogoTTT_02.imgs}
            />
        </aside>
      </div>
    );
  } else {
    return (
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4 set-bg">
          {/* Brand Logo */}
          <a
            href="/Welcome"
            className="brand-link"
            style={{
              backgroundImage: "url(" + LogoPMRP_TTT_08.imgs + ")",
            }}
          >
            <img
              src="dist/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ visibility: "hidden" }}
            />
            <span
              style={{ visibility: "hidden" }}
              className="brand-text font-weight-light"
            >
              TTTTTT
            </span>
          </a>

          <a
            href="/Welcome"
            className="brand-link"
            style={{ textAlign: "center" }}
          >
            <img
              alt="..."
              className="img-fluid rounded img-size-50 mr-3"
              src={
                company !== undefined &&
                company !== null &&
                company !== ""
                  ? Configs.API_URL_IMG + company.logo_path
                  : userdefault_img.imgs
              }
              style={{ width: "80px" , height:"75px"}}
            /> 

            <img
              alt="..."
              className="img-fluid rounded img-size-50 mr-3"
              src={
                oem_data !== undefined && oem_data !== null && oem_data !== ""
                  ? userdefault_img.imgs
                  : Configs.API_URL_IMG + oem_data.logo_path
              }
              style={{ width: "80px", height:"75px" }}
            />
          </a>
          {/* Sidebar */}
          <div className="sidebar sidebar-font">
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item has-treeview">
                  <a
                    href="/"
                    className="nav-link ttt-menu-bg"
                    style={{
                      backgroundImage: "url(" + menu_bt_blank.imgs + ")",
                    }}
                  >
                    <span className="nav-icon fas "></span>
                    <p>Please Select OEM</p>
                  </a>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
            <img
              alt="..."
              className="img-fluid botton-img"
              src={down_menulogoTTT_02.imgs}
            />
          </div>

          {/* /.sidebar */}
        </aside>
      </div>
    );
  }
}
export default Sidebar;
