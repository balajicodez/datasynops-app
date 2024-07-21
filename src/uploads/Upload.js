import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Sidebar from './../Sidebar';
import './../App.css';
import { APP_SERVER_URL_PREFIX } from "./../constants.js";

var jobId;

const Upload = () => {
  const [textInput, setTextInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Define your form fields
    jobName: "",
    createdBy: "",
    optionalTextString: "",
    id: -1
    // ... other fields
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(APP_SERVER_URL_PREFIX + "/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("POST request successful:", responseData.id);
      jobId = responseData.id;
      setLoading(false);
      // Add any further actions after successful submission
    } catch (error) {
      setLoading(false);
      console.error("Error making POST request:", error.message);
    }
  };

  return (
    <div >
      <div>
        <Sidebar isOpen={true} />
      </div>
      <div className={`content ${true ? 'shifted' : ''}`} >
        <h1> Upload Survey Data </h1>
        <hr />       
          <form onSubmit={handleFormSubmit}>
            <table align="left">
              <tr>
                <th>Title</th>
                <th>
                  <input
                    type="text"
                    name="jobName"
                    value={formData.jobName}
                    onChange={handleInputChange}
                    size="53"
                  />
                </th>
              </tr>
              <tr>
                <th>Description</th>
                <th>
                  <textarea rows="5" cols="50"
                    name="optionalTextString"
                    value={formData.optionalTextString}
                    onChange={handleInputChange}
                  />
                </th>
              </tr>
              <tr>
                <th>Excel Upload</th>
                <th>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".xls,.xlsx"
                    //required
                  />
                </th>
              </tr>
              <tr><button  class="button" type="submit">Submit</button></tr>
            </table>
          </form>       
      </div>
    </div>
  );
};

export default Upload;
