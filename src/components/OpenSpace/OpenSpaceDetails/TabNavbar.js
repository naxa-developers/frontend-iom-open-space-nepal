import React, { Component } from 'react'

 class TabNavbar extends Component {
    render() {
        return (
            
                          <ul className="nav nav-tabs map-tab" id="myTab" role="tablist">
                                        <li className="nav-item" onClick={()=>this.props.changetabid(1)}>
                                            <a className={this.props.tabid==1?"nav-link active":"nav-link"} id="general_tab" data-toggle="tab"
                                                 role="tab" aria-controls="general"
                                                aria-selected="true">General</a>
                                        </li>
                                        <li className="nav-item" onClick={()=>this.props.changetabid(2)}>
                                            <a className={this.props.tabid==2?"nav-link active":"nav-link"} id="images_tab" data-toggle="tab" 
                                                role="tab" aria-controls="images" aria-selected="false">Media</a>
                                        </li>
                                        <li className="nav-item" onClick={()=>this.props.changetabid(3)}>
                                            <a className={this.props.tabid==3?"nav-link active":"nav-link"} id="report_tab" data-toggle="tab" 
                                                role="tab" aria-controls="report" aria-selected="false">reports </a>
                                        </li>
                                        <li className="nav-item" onClick={()=>this.props.changetabid(4)}>
                                            <a className={this.props.tabid==4?"nav-link active":"nav-link"} id="nearby_tab" data-toggle="tab" 
                                                role="tab" aria-controls="nearby" aria-selected="false">nearby Amenities</a>
                                        </li>
                                      

                                    </ul>
          
        )
    }
}
export default TabNavbar;
