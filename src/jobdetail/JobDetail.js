import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import axios from 'axios';
import LoadSpinner from './../LoadSpinner';
import './../App.css';
import { APP_SERVER_URL_PREFIX } from "./../constants.js";

function JobDetail() {

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState(null);

    const [selectedFile, setSelectedFile] = useState([]);
    const { state } = useLocation();
    const { jobId } = state;


    const handleFileChange = (e) => {
        const file = e.target.files;
        console.log(file);
        setSelectedFile(file);
        // setFormData({ ...formData, [selectedFile]: file });
    };

    const handleExcelUpload = () => {
        if (!selectedFile) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();

        Array.from(selectedFile).forEach((file, index) => {
            formData.append('file', file); // Use 'files[]' if server expects an array of files
          });

       
        const url = APP_SERVER_URL_PREFIX + "/jobs/file-uploads/" + jobId;
        axios
            .post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data);
                // Handle success, e.g., show a success message to the user
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
                // Handle error, e.g., show an error message to the user
            });
    };

    console.log(' before useeffect');
    useEffect(() => {
        console.log(' in useeffect');
        setLoading(true);
        fetch(APP_SERVER_URL_PREFIX + "/jobs/" + jobId)
            .then(
                (response) => response.json()
            )
            .then((json) => {
                console.log(json);
                setTableData(json);
                setLoading(false);
            });
        console.log(' after useeffect');
    }, []);

    console.log(' out useeffect');
    return (
        <div>
            <Sidebar isOpen={true} />
            {loading ? <LoadSpinner /> :
                <div className={`content ${true ? 'shifted' : ''}`}>
                    <h1>Job Detail</h1>
                    <hr />
                   
                    <table>
                        <tr>
                            <th>Upload </th>
                            <th>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".xls,.xlsx,.csv,.txt"
                                    multiple
                                />
                                <button class="button" onClick={handleExcelUpload}>Upload</button>
                            </th>
                        </tr>
                    </table>
                </div>}
        </div>
    );
}
export default JobDetail;