import React, { Component } from 'react'
import MaterialIcon from 'material-icons-react';

class ReportSidebar extends Component {
    render() {
        return (
            <div>
                
                      <div class="map-sidebar">
                        <span class="sidebar-toggle">
                        <MaterialIcon icon="keyboard_arrow_right" />
                        </span>
                        
                        <div class="sidebar-wrapper">
                            <div class="card">
                                <div class="card-body">
                                    <div class="map-filter">
                                        <div class="filter-option">
                                            <select class="selectpicker">
                                                <option>Last 7 days</option>
                                            </select>
                                            <select class="selectpicker">
                                                <option>status</option>
                                            </select>
                                            <select class="selectpicker">
                                                <option>Urgency</option>
                                            </select>
                                        </div>
                                        <div class="reset-btns">
                                            <div class="reset">
                                            <MaterialIcon icon="refresh" />
                                                
                                                <span>clear all</span>
                                            </div>
                                            <a href="#" class="openspace-button">Apply</a>
                                        </div>
                                    </div>
                                    <div class="report-count">
                                        <h5>Reports: <span>18</span></h5>
                                    </div>
                                    <div class="report-list">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">  <MaterialIcon icon="search" /></span>
                                            </div>
                                            <input type="text" class="form-control" aria-label="" placeholder="Search reports" />
                                            <div class="input-group-append">
                                                <span class="input-group-text"><i
                                                        class="material-icons">keyboard_backspace</i></span>
                                            </div>
                                        </div>

                                        <ul>
                                            <li>
                                                <div class="report-content">
                                                    <h5>Increasing theft and fraud <i class="material-icons pending"
                                                            data-toggle="tooltip" data-placement="top"
                                                            title="Pending">timer</i></h5>
                                                    <div class="loc-time flex-start">
                                                        <a href="#">ratna park</a><time>1 week ago</time>
                                                    </div>
                                                </div>
                                                <div class="report-status">
                                                    <label class="unsuccess">high</label>
                                                    <span>Urgency</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="report-content">
                                                    <h5>Water polution<i class="material-icons success"
                                                            data-toggle="tooltip" data-placement="top"
                                                            title="success">check_circle</i></h5>
                                                    <div class="loc-time flex-start">
                                                        <a href="#">Jawalakhel Football Ground</a><time>1 week ago</time>
                                                    </div>
                                                </div>
                                                <div class="report-status">
                                                    <label class="success">low</label>
                                                    <span>Urgency</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="report-content">
                                                    <h5>There are no toilet for women here right now! <i class="material-icons pending"
                                                            data-toggle="tooltip" data-placement="top"
                                                            title="Pending">timer</i></h5>
                                                    <div class="loc-time flex-start">
                                                        <a href="#">Lagankhel Football Ground</a><time>2 week ago</time>
                                                    </div>
                                                </div>
                                                <div class="report-status">
                                                    <label class="pending">Medium</label>
                                                    <span>Urgency</span>
                                                </div>
                                            </li>
                                            <li>
                                                    <div class="report-content">
                                                        <h5>Increasing theft and fraud <i class="material-icons pending"
                                                                data-toggle="tooltip" data-placement="top"
                                                                title="Pending">timer</i></h5>
                                                        <div class="loc-time flex-start">
                                                            <a href="#">ratna park</a><time>1 week ago</time>
                                                        </div>
                                                    </div>
                                                    <div class="report-status">
                                                        <label class="unsuccess">high</label>
                                                        <span>Urgency</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="report-content">
                                                        <h5>Water polution<i class="material-icons success"
                                                                data-toggle="tooltip" data-placement="top"
                                                                title="success">check_circle</i></h5>
                                                        <div class="loc-time flex-start">
                                                            <a href="#">Jawalakhel Football Ground</a><time>1 week ago</time>
                                                        </div>
                                                    </div>
                                                    <div class="report-status">
                                                        <label class="success">low</label>
                                                        <span>Urgency</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="report-content">
                                                        <h5>There are no toilet for women here right now! <i class="material-icons pending"
                                                                data-toggle="tooltip" data-placement="top"
                                                                title="Pending">timer</i></h5>
                                                        <div class="loc-time flex-start">
                                                            <a href="#">Lagankhel Football Ground</a><time>2 week ago</time>
                                                        </div>
                                                    </div>
                                                    <div class="report-status">
                                                        <label class="pending">Medium</label>
                                                        <span>Urgency</span>
                                                    </div>
                                                </li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>
        )
    }
}
export default ReportSidebar;
