import React, { Component } from 'react'
import Navbar from '../Home/Navbar';
import ReportImage from '../../img/report.png'

class Report extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div>
                    <img src={ReportImage} style={{margin:'3% 15%'}}></img>
                </div>
            </div>
        )
    }
}
export default Report;
