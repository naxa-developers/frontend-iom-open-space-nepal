import React, { Component } from 'react'

 class ReportTab extends Component {
    render() {
        return (
            <div className="report-list">
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i
                            className="material-icons">search</i></span>
                </div>
                <input type="text" className="form-control" aria-label=""
                    placeholder="Search reports" />
                <div className="input-group-append">
                    <span className="input-group-text"><i
                            className="material-icons">keyboard_backspace</i></span>
                </div>
            </div>

            <ul>
                <li>
                    <div className="report-content">
                        <h5>Increasing theft and fraud <i
                                className="material-icons pending"
                                data-toggle="tooltip" data-placement="top"
                                title="Pending">timer</i></h5>
                        <div className="loc-time flex-start">
                            <a href="#">ratna park</a><time>1 week ago</time>
                        </div>
                    </div>
                    <div className="report-status">
                        <label className="unsuccess">high</label>
                        <span>Urgency</span>
                    </div>
                </li>
                <li>
                    <div className="report-content">
                        <h5>Water polution<i className="material-icons success"
                                data-toggle="tooltip" data-placement="top"
                                title="success">check_circle</i></h5>
                        <div className="loc-time flex-start">
                            <a href="#">Jawalakhel Football Ground</a><time>1
                                week ago</time>
                        </div>
                    </div>
                    <div className="report-status">
                        <label className="success">low</label>
                        <span>Urgency</span>
                    </div>
                </li>
                <li>
                    <div className="report-content">
                        <h5>There are no toilet for women here right now! <i
                                className="material-icons pending"
                                data-toggle="tooltip" data-placement="top"
                                title="Pending">timer</i></h5>
                        <div className="loc-time flex-start">
                            <a href="#">Lagankhel Football Ground</a><time>2
                                week ago</time>
                        </div>
                    </div>
                    <div className="report-status">
                        <label className="pending">Medium</label>
                        <span>Urgency</span>
                    </div>
                </li>
                <li>
                    <div className="report-content">
                        <h5>Increasing theft and fraud <i
                                className="material-icons pending"
                                data-toggle="tooltip" data-placement="top"
                                title="Pending">timer</i></h5>
                        <div className="loc-time flex-start">
                            <a href="#">ratna park</a><time>1 week ago</time>
                        </div>
                    </div>
                    <div className="report-status">
                        <label className="unsuccess">high</label>
                        <span>Urgency</span>
                    </div>
                </li>
                <li>
                    <div className="report-content">
                        <h5>Water polution<i className="material-icons success"
                                data-toggle="tooltip" data-placement="top"
                                title="success">check_circle</i></h5>
                        <div className="loc-time flex-start">
                            <a href="#">Jawalakhel Football Ground</a><time>1
                                week ago</time>
                        </div>
                    </div>
                    <div className="report-status">
                        <label className="success">low</label>
                        <span>Urgency</span>
                    </div>
                </li>
                <li>
                    <div className="report-content">
                        <h5>There are no toilet for women here right now! <i
                                className="material-icons pending"
                                data-toggle="tooltip" data-placement="top"
                                title="Pending">timer</i></h5>
                        <div className="loc-time flex-start">
                            <a href="#">Lagankhel Football Ground</a><time>2
                                week ago</time>
                        </div>
                    </div>
                    <div className="report-status">
                        <label className="pending">Medium</label>
                        <span>Urgency</span>
                    </div>
                </li>
            </ul>

        </div>
        )
    }
}
export default ReportTab;
