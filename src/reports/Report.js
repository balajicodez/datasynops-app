import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './../Sidebar';
import { APP_SERVER_URL_PREFIX } from "./../constants.js";
import LoadSpinner from './../LoadSpinner';
import './../App.css';

function Report() {

    const history = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);

    // Function to collect data
    const getApiData = async () => {
        setLoading(true);
        const response = await fetch(APP_SERVER_URL_PREFIX + "/jobs").then(
            (response) => response.json()
        );

        setTableData(response);
        setLoading(false);
    };

    useEffect(() => {
        getApiData();
        console.log(' in useeffect');
      }, []);

    const openJobDetail = (jobId) => {
        history('/jobdetail', {state: {jobId:jobId}});
    }
        
    return (
        <div>
            <Sidebar isOpen={true} />
            {loading ? <LoadSpinner /> :  
            <div className={`content ${true ? 'shifted' : ''}`}>
                <h1>Job History</h1>
                <hr />
                <table >
                    <tr>
                        <th>Job Name</th>
                        <th>Description</th>                       
                        <th>Job Status</th>
                    </tr>                    
                    {tableData.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.jobName}</td>
                                <td>{val.description}</td>
                                <td>{val.status}</td>
                                <td>
                                    <button class="button" onClick={()=>openJobDetail(val.id)} >
                                        View
                                    </button>
                                </td>                               
                            </tr>
                        );
                    })}
                </table>
            </div> }
        </div>
    );
}
export default Report;