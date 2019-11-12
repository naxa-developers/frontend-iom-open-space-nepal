import React, { Component } from 'react'

 class TabNavbar extends Component {
    render() {
        return (
            
                          <ul className="nav nav-tabs map-tab" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="general_tab" data-toggle="tab"
                                                href="#general" role="tab" aria-controls="general"
                                                aria-selected="true">General</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="images_tab" data-toggle="tab" href="#images"
                                                role="tab" aria-controls="images" aria-selected="false">gallery/map</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link " id="report_tab" data-toggle="tab" href="#reports"
                                                role="tab" aria-controls="report" aria-selected="false">reports </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link " id="nearby_tab" data-toggle="tab" href="#nearby"
                                                role="tab" aria-controls="nearby" aria-selected="false">nearby </a>
                                        </li>

                                    </ul>
          
        )
    }
}
export default TabNavbar;
