import React, { useState, useEffect } from 'react';
import LoadSpinner from './../LoadSpinner';
import Sidebar from '../Sidebar';


function ReportHTML() {

    const [isOpen, setIsOpen] = useState(false);
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const s3Url = "https://affordablemr.s3.ap-south-1.amazonaws.com/3-werwe/log_html.html"; // Replace with your actual S3 URL

        fetch(s3Url)
            .then(response => response.text())
            .then(data => setHtmlContent(data))
            .catch(error => console.error('Error fetching HTML:', error));
        setLoading(false);
    }, []);

    return (
        <div>
            <Sidebar isOpen={true} />
            <div className={`content ${true ? 'shifted' : ''}`}>
                <div>
                    < div dangerouslySetInnerHTML={{ __html: htmlContent }
                    } />
                </div>

            </div>
        </div>
    );
}
export default ReportHTML;