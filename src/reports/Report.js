import React, { useState, useEffect } from 'react';
import Sidebar from './../Sidebar';
import { APP_SERVER_URL_PREFIX } from "./../constants.js";
import LoadSpinner from './../LoadSpinner';

function Report() {

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
      }, []);

    return (
        <div>
            <Sidebar isOpen={true} />
            {loading ? <LoadSpinner /> :  
            <div className={`content ${true ? 'shifted' : ''}`}>
                <h1>Reports</h1>
                <hr />
                <table align="left">
                    <tr>
                        <th>Job Name</th>
                        <th>Created By</th>
                        <th>Job Status</th>
                    </tr>
                    {tableData.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.jobName}</td>
                                <td>{val.createdBy}</td>
                                <td>{val.totalCount}</td>
                                <td>{val.campaignGeneratedCount}</td>
                                <td>{val.canvasCompletedCount}</td>
                                <td>{val.status}</td>
                                <td>
                                    <button class="button" >
                                        Run Job
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