import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import "../../assets/css/table.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the default styles
import { CSVLink } from 'react-csv';
import eye from '../../assets/img/Dashboard/eye.svg';
import edit from '../../assets/img/Dashboard/edit.svg';
import deletes from '../../assets/img/Dashboard/delete.svg';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

function ConnectTable(params) {
    const rowsData = params.data.rows;
    const history = useHistory();

    const [searchID, setSearchID] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [this_page, setthis_page] = useState({ page: 1 });
    const [show_entries, setshow_entries] = useState({ entries: 10 });
    const [all_page, setall_page] = useState([]);
    const [formGroupZIndex, setFormGroupZIndex] = useState(10000);
  
    // Add these states to your component
    const [filteredData, setFilteredData] = useState(rowsData);

    const navigateToViewPage = (rowData) => {
      history.push('/IoT_Master_Data/PowerMonitorConnection/viewMonitor', {
        rowData,
      })
    }

    const navigateToEditPage = (rowData) => {
      history.push('/IoT_Master_Data/PowerMonitorConnection/editMonitor', {
        rowData,
      });
    }
  
    const prepareDataForCSV = () => {
      const csvData = filteredData.map((el) => ({
        'Monitor Name': el.monitor_name,
        'Monitor ID': el.monitor_id,
        'Frequency API (minute)': el.frequency_api,
        'Power (W)': el.power,
        'Energy (kWh)': el.energy,
        'Voltage (V)': el.voltage,
        'Current (A)': el.current,
        'Frequency (Hz)': el.frequency,
        'Add Date': el.date,
      }));
    
      return csvData;
    };
  
    // Modify the search criteria handling
    // useEffect(() => {
    //   const filteredRows = rowsData.filter(
    //     (el) =>
    //       el.Part_Name.toLowerCase().includes(searchID.toLowerCase()) &&
    //       el.Part_No.toLowerCase().includes(searchName.toLowerCase())
    //   );
    //   setFilteredData(filteredRows);
    // }, [searchID, searchName, rowsData]);
    
  
    const filterData = () => {
      console.log(searchID);
      console.log(searchName);
      console.log(searchDate);
    
    
      const filteredRows = rowsData.filter((el) => {
        let matchID = true;
        let matchName = true;
        let matchDate = true;
    
        if (searchID) {
          matchID = el.monitor_id.toLowerCase().includes(searchID.toLowerCase());
        }
    
        if (searchName) {
          matchName = el.monitor_name.toLowerCase().includes(searchName.toLowerCase());
        }
    
        if (searchDate) {
          const formattedDate = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(searchDate)
          console.log(formattedDate)
    
          matchDate = el.date.toLowerCase().includes(formattedDate.toLowerCase());
        }
    
        return matchID && matchName && matchDate;
      });
    
      console.log(this_page);
      setPage(1);
      setFilteredData(filteredRows);
    };
  
    const clearSearchData = () => {
      setSearchID("");
      setSearchName("");
      setSearchDate("");
      setPage(1); // Reset the page to 1
      setshow_entries({ entries: 10 }); // Reset the entries to default
      setFilteredData(rowsData); // Reset the filtered data to the original data
    }
  
    var BN = 0;
    var FN = 0;
  
    function setPage(page) {
      /*  console.log("this page : ", page); */
      setthis_page({ ...this_page, page: page });
    }
  
    function previous_page() {
      let page_ = this_page.page - 1;
      if (page_ >= 1) {
        setthis_page({ ...this_page, page: page_ });
      }
    }
  
    function next_page() {
      let page_ = this_page.page + 1;
      if (page_ <= totalPageCount) {
        setthis_page({ ...this_page, page: page_ });
      }
    }
  
    function performSearch(event) {
      event.preventDefault(); // Prevent default form submission behavior
      setPage(1); // Reset to the first page
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(searchDate);
      setFilteredData(
        rowsData.filter(
          (el) =>
          el.monitor_id.toLowerCase().includes(searchID.toLowerCase()) &&
          el.monitor_name.toLowerCase().includes(searchName.toLowerCase()) &&
          el.date.includes(formattedDate)
        )
      );
    }  

    const handleDelete = (monitorId) => {
      // Show a confirmation dialog using SweetAlert
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          // Delete the row from filteredData
          const updatedData = filteredData.filter((el) => el.monitor_id !== monitorId);
          setFilteredData(updatedData);

          setFormGroupZIndex(-1);
  
          Swal.fire(
            'Deleted!',
            'The record has been deleted.',
            'success'
          );
        }
      });
    };
    
  
    async function setEntries(entries) {
      await setshow_entries({ ...show_entries, entries: entries });
      var page_arr = [];
      let page = 1;
  
      console.log("showAllPage", rowsData.length);
      for (let i = 0; i < rowsData.length; i++) {
        if (Math.ceil(i / entries) >= page) {
          console.log(Math.ceil(i / entries), page);
          let temp = {
            page: page,
          };
          page_arr.push(temp);
          page++;
        }
      }
      await setall_page(page_arr);
      await setPage(1);
    }
  
  const totalPageCount = Math.ceil(filteredData.length / show_entries.entries);
  
  return (
    <div>
      <div class="col-10">
        <div className="label-filter">
          <label>Monitor Name</label>
          <label className="ml-[13%]">Monitor ID</label>
          <label className="ml-[15%]">Date</label>
        </div>
        <div class="form-group">
            <form onSubmit={performSearch}>
              <div className="filter">
              <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              />
            <input
              type="text"
              value={searchID}
              onChange={(e) => setSearchID(e.target.value)}
            />  
            {/* <span class="input-group-text" id="basic-addon1">@</span> */}
            <DatePicker   
              className="date-picker"
              dateFormat="dd/MM/yyyy" // Set the desired date format
              selected={searchDate}
              onChange={(date) => setSearchDate(date)}
            />  
            <button
              type="button" // This will trigger the form submission
              className="btn btn-primary"
              onClick={filterData}
            >
              Search
            </button>

            <button
              type="button" // This will trigger the form submission
              className="btn btn-outline-dark"
              onClick={clearSearchData}
            >
              Clear
            </button>
              </div>
                
            </form>

            <Link to="/IoT_Master_Data/PowerMonitorConnection/addMonitor" className="btn add">
              Add
            </Link>
      
        </div>
      </div>

      <div className="table-frame">
      <div className="selected-entries mt-[10px]">
          <div className="entries">
            <label htmlFor="">Show entries</label><br/>
            <select
                className="form-control custom-select select2"
                type="text"
                required
                onChange={(e) => setEntries(e.target.value)}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={rowsData.length}>{rowsData.length} (ALL)</option>
            </select>
          </div>
          
          <form>
          <input
            type="text"
            className="global"
            
          />
          </form>
        </div>
        

      <div className="table-responsive">
        <MDBTable
          className="table"
          striped
          bordered
          hover
          // fixedHeader
        >
          <MDBTableHead>
            <tr>
              <th>No</th>
              <th>Monitor Name</th>
              <th>Monitor ID</th>
              <th>Frequency API</th>
              <th>Status</th>
              <th>Added Date</th>
              <th>Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {filteredData.slice((this_page.page - 1) * show_entries.entries, this_page.page * show_entries.entries)
              .map((el, index) => {
                const startIndex = (this_page.page - 1) * show_entries.entries;
                const endIndex = Math.min(startIndex + show_entries.entries, filteredData.length);
                BN = startIndex + 1;
                FN = endIndex;
                const dataIndex = (this_page.page - 1) * show_entries.entries + index;
                return (
                  <tr key={dataIndex}>
                    <td style={{ textAlign: "center" }}>{dataIndex + 1}</td>
                    <td style={{ textAlign: "center" }}>{el.ims_name}</td>
                    <td style={{ textAlign: "center" }}>{el.ims_monitor_id}</td>
                    <td style={{ textAlign: "center" }}>{el.ims_frequency_api}</td>
                    <td className="status-cell" style={{ textAlign: "center" }}>
                      {el.ims_in_use === true ? <span className="green-circle" /> : <span className="red-circle" />}
                      {el.ims_in_use === true ? "online" : "offline"}
                    </td>
                    <td style={{ textAlign: "center" }}>{el.to_char}</td>
                    <td className="action" style={{ textAlign: "center" }}>
                      <a href="/IoT_Master_Data/PowerMonitorConnection/viewMonitor" value="">
                        <img src={eye} onClick={() => navigateToViewPage(el)}/>
                      </a>
                      <a href="/IoT_Master_Data/PowerMonitorConnection/editMonitor">
                        <img src={edit} onClick={() => navigateToEditPage(el)}/>
                      </a>
                       <img
                          src={deletes}
                          alt="Delete"
                          className="delete-icon"
                          onClick={() => handleDelete(el.ims_monitor_id)}
                        />
                    </td>
  
                  </tr>
                );
              })}
          </MDBTableBody>
        </MDBTable>
      </div>

      <div className="row">
        <div className="col-5">
          <p>Showing {BN} to {FN} of {filteredData.length} entries</p>
        </div>
        <div className="col-0.5">
          <button
            type="button"
            className="btn btn-block btn-outline-primary border"
            onClick={previous_page}
            disabled={this_page.page === 1}
          >
            Previous
          </button>
        </div>
  
        {Array.from({ length: totalPageCount }, (_, index) => {
          const pageNumber = index + 1;
          const isActive = pageNumber === this_page.page;

          return (
            <div className="col-0.5" key={index}>
              <button
                type="button"
                className={`btn btn-block ${
                  isActive ? "btn-primary" : "btn-outline-primary"
                } border`}
                onClick={() => setthis_page({ ...this_page, page: pageNumber })}
              >
                {pageNumber}
              </button>
            </div>
          );
        })}
        <div className="col-0.5">
          <button
            type="button"
            className="btn btn-block btn-outline-primary border"
            onClick={next_page}
            disabled={this_page.page === totalPageCount}
          >
            Next
          </button>
        </div>
      </div>
      </div>

      
    </div>
  );
}

export default ConnectTable;
