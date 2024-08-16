import React, { useState, useEffect } from 'react';
import LoadSpinner from './../LoadSpinner';
import Sidebar from '../Sidebar';
import ReactJson from 'react-json-view'


function SchemaEditor() {

    const [isOpen, setIsOpen] = useState(false);
    const [jsonContent, setJsonContent] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const s3Url = "https://affordablemr.s3.ap-south-1.amazonaws.com/3-werwe/schema.json"; // Replace with your actual S3 URL

        fetch(s3Url)
            .then(response => response.text())
            .then(data => {setJsonContent(data); console.log("JSONx", jsonContent ); setLoading(false);})
            .catch(error => { setLoading(false); console.error('Error fetching HTML:', error)});
    }, []);

    return (
        <div>
            <Sidebar isOpen={true} />
            {loading ? <LoadSpinner /> : <div className={`content ${true ? 'shifted' : ''}`}>
                <div>
                <ReactJson src={{jsonContent}} />
                </div>
            </div>}
        </div>
    );
}
export default SchemaEditor;