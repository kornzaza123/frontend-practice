import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import "../../assets/css/table.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the default styles
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'


function FGInOutTable(params) {
  
  const rowsData = params.data.rows;

  console.log(rowsData);

  const [searchID, setSearchID] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");

  const [this_page, setthis_page] = useState({ page: 1 });
  const [show_entries, setshow_entries] = useState({ entries: 10 });
  const [all_page, setall_page] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const renderPageButtons = () => {
    const pageButtons = [];
    const numPages = Math.ceil(filteredData.length / show_entries.entries);
  
    // Calculate the range of page numbers to display
    const startPage = Math.max(1, this_page.page - 2);
    const endPage = Math.min(numPages, startPage + 4);
  
    // Add the first page button explicitly only if not in the range
    if (startPage > 1) {
      pageButtons.push(
        <div className="col-0.5" key={1}>
          <button
            type="button"
            className={`btn btn-block ${
              1 === this_page.page ? "btn-primary" : "btn-outline-primary"
            } border`}
            onClick={() => setPage(1)}
          >
            1
          </button>
        </div>
      );
    }
  
    // Add ellipsis if necessary before the start page
    if (startPage > 2) {
      pageButtons.push(
        <div className="col-0.5" key="ellipsis1">
          <button
            type="button"
            className="btn btn-block btn-outline-primary border"
            disabled={true}
          >
            ...
          </button>
        </div>
      );
    }
  
    // Add page buttons in the calculated range
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <div className="col-0.5" key={i}>
          <button
            type="button"
            className={`btn btn-block ${
              i === this_page.page ? "btn-primary" : "btn-outline-primary"
            } border`}
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        </div>
      );
    }
  
    // Add ellipsis if necessary after the end page
    if (endPage < numPages - 1) {
      pageButtons.push(
        <div className="col-0.5" key="ellipsis2">
          <button
            type="button"
            className="btn btn-block btn-outline-primary border"
            disabled={true}
          >
            ...
          </button>
        </div>
      );
    }
  
    return pageButtons;
  };
  
  
  
  const handleSearchClick = () => {
  // Create a copy of the filtered data to apply new filters
  let filteredRows = [...rowsData];

  // Apply the search criteria on the copy of filtered data
  if (searchID) {
    filteredRows = filteredRows.filter((el) =>
      el.ims_monitor_id.toString().toLowerCase().includes(searchID.toLowerCase())
    );
  }

  if (searchName) {
    filteredRows = filteredRows.filter((el) =>
      el.ims_name.toLowerCase().includes(searchName.toLowerCase())
    );
  }

  if (searchDate) {
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(searchDate);
    filteredRows = filteredRows.filter((el) =>
      el.ihs_timestamp.toLowerCase().includes(formattedDate.toLowerCase())
    );
  }

  // Set the filtered data based on the applied criteria
  setFilteredData(filteredRows);
};
  
    // Add these states to your component
    const [filteredData, setFilteredData] = useState(rowsData);
  
    const prepareDataForCSV = () => {
      const csvData = filteredData.map((el) => ({
        'Monitor Name': el.ims_name,
        'Monitor ID': el.ims_monitor_id,
        'Frequency API (minute)': el.ims_frequency_api,
        'ihs_power (W)': el.ihs_power,
        'ihs_energy (kWh)': el.ihs_energy,
        'Voltage (V)': el.ihs_voltage,
        'Current (A)': el.ihs_current,
        'Frequency (Hz)': el.ihs_frequency,
        'Add Date': el.ihs_timestamp,
      }));
    
      return csvData;
    };

    useEffect(() => {
      // Filter the data based on the global search
      const globalFilteredRows = rowsData.filter((el) => {
        return Object.values(el).some((value) =>
          value.toString().toLowerCase().includes(globalSearch.toLowerCase())
        );
      });
    
      // Filter the data based on other filters
      if (searchClicked) {
        const filteredRows = globalFilteredRows.filter((el) => {
          let matchID = true;
          let matchName = true;
          let matchDate = true;
  
          if (searchID) {
            matchID = el.ims_monitor_id.toString().toLowerCase().includes(searchID.toLowerCase());
          }
  
          if (searchName) {
            matchName = el.ims_name.toLowerCase().includes(searchName.toLowerCase());
          }
  
          if (searchDate) {
            const formattedDate = new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(searchDate);
            matchDate = el.ihs_timestamp.toLowerCase().includes(formattedDate.toLowerCase());
          }
  
          return matchID && matchName && matchDate;
        });
  
        setFilteredData(filteredRows);
      } else {
        // If search button is not clicked, update with only global search filter
        setFilteredData(globalFilteredRows);
      }
    }, [globalSearch, searchClicked, searchID, searchName, searchDate, rowsData]);
  

  
    const filterData = () => {
      // Apply the other filters when the search button is clicked
      if (searchClicked) {
        const filteredRows = rowsData.filter((el) => {
          let matchID = true;
          let matchName = true;
          let matchDate = true;
    
          if (searchID) {
            matchID = el.ims_monitor_id.toLowerCase().includes(searchID.toLowerCase());
          }
    
          if (searchName) {
            matchName = el.ims_name.toLowerCase().includes(searchName.toLowerCase());
          }
    
          if (searchDate) {
            const formattedDate = new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(searchDate);
            matchDate = el.ihs_timestamp.toLowerCase().includes(formattedDate.toLowerCase());
          }
    
          return matchID && matchName && matchDate;
        });
    
        setFilteredData(filteredRows);
      }
    };
  
    const clearSearchData = () => {
      setSearchID("");
      setSearchName("");
    //   setSearchDate("");
      setPage(1);
      setshow_entries({ entries: 10 });
      setFilteredData(rowsData);
    };
  
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
          el.ims_monitor_id.toLowerCase().includes(searchID.toLowerCase()) &&
          el.ims_name.toLowerCase().includes(searchName.toLowerCase()) &&
          el.date.includes(formattedDate)
        )
      );
    }
    
  
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
          <label>Product No</label>
          <label className="ml-[13%]">Product Name</label>
          <label className="ml-[15%]">Model Category</label>
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
              onClick={handleSearchClick}
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

            
      
        </div>
      </div>

      <div className="table-frame">
        <div className="selected-entries">
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
            placeholder="Search..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
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
              <th>Product No</th>
              <th>Product Name</th>
              <th>Model Category</th>
              <th>Amount</th>
              <th>Manatement</th>

              {/* <th>Voltage (V)</th>
              <th>Current (A)</th>
              <th>Frequency (Hz)</th>
              <th>Add Date</th> */}
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
                    <td style={{ textAlign: "center" }}>{el.ihs_power}</td>
                    <td style={{ textAlign: "center" }}>{el.ihs_energy}</td>
                    {/* <td style={{ textAlign: "center" }}>{el.ihs_voltage}</td>
                    <td style={{ textAlign: "center" }}>{el.ihs_current}</td>
                    <td style={{ textAlign: "center" }}>{el.ihs_frequency}</td> */}

                    {/* <td style={{ textAlign: "center" }}>{el.ihs_timestamp}</td> */}
                    
                    {/* <td style={{ textAlign: "center" }}>{dataIndex + 1}</td>
                    <td style={{ textAlign: "center" }}>{el.monitor_name}</td>
                    <td style={{ textAlign: "center" }}>{el.monitor_id}</td>
                    <td style={{ textAlign: "center" }}>{el.frequency_api}</td>
                    <td style={{ textAlign: "center" }}>{el.power}</td>
                    <td style={{ textAlign: "center" }}>{el.energy}</td>
                    <td style={{ textAlign: "center" }}>{el.voltage}</td>
                    <td style={{ textAlign: "center" }}>{el.current}</td>
                    <td style={{ textAlign: "center" }}>{el.frequency}</td>
                    <td style={{ textAlign: "center" }}>{el.date}</td> */}
                  </tr>
                );
              })}
          </MDBTableBody>
          <MDBTableHead>
            <tr>
              <th>No</th>
              <th>Product No</th>
              <th>Product Name</th>
              <th>Model Category</th>
              <th>Amount</th>
              <th>Manatement</th>
              {/* <th>Voltage (V)</th>
              <th>Current (A)</th>
              <th>Frequency (Hz)</th>
              <th>Add Date</th> */}
            </tr>
          </MDBTableHead>
        </MDBTable>
      </div>

      <div className="row b">
        <div className="col-5">
          <p>Showing {BN} to {FN} of {filteredData.length} entries</p>
        </div>
        <div className="paginate">
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

        {renderPageButtons()}

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

      
    </div>
  );
}

export default FGInOutTable;