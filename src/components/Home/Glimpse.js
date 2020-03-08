import React, { Component } from 'react';
import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-default.css';
import  {connect} from 'react-redux';
import { Button, Modal } from 'react-bootstrap'
import countershape from '../../img/counter-shape.png'
import Axios from 'axios';

class Glimpse extends Component {
 
    constructor(props) {
        super(props)
    
        this.state = {
            counts: '',
            className: this.props.className,
            open: false
           
        };
    }

    fetchCounts = () => {
        Axios.get(`https://iomapi.naxa.com.np/api/v1/glimpse_of_open_space`)
        .then(res => {
        
            
           
            const counts = res.data;
            this.setState({counts: counts})
            

           
            
        })
    }

    toggle = () =>{
        console.log("open");
        
        this.setState({
            open: true
        })

    }
    componentDidMount() {
        this.setState({  odometerValue:600   })
        this.fetchCounts()
    }
    
    render() {

        return (
            <>
            <section className="glimps-counter" style={{backgroundImage: `url(${countershape})` , zIndex:'190000'}} >
            <div className="overlay" ></div>
            <div className="glimps-wrapper">
                <div className="container">
                    <h3 className="openspace-title">{this.props.language =='0' ? `Open Spaces in Figures` : `नेपालको खुल्ला क्षेत्रहरूको झलक` }</h3>
                    
                    <div className="row">
                        <div className="col-md-4 " >
                            <div className="glimps-count" onClick={() => this.toggle()}>
                                <h4>
                                {this.state.counts&&this.state.counts.data.open_space}
                                    {/* <Odometer
                                    format= "d"
                                    duration= {500}
                                // value = "120"
                                    value = {this.state.counts&&this.state.counts.data.open_space}
                                /> */}
                                </h4>
                                <h6>{this.props.language =="0" ? `Open spaces` : `खुल्ला क्षेत्र` }</h6>
                            </div>
                        </div>
                        <div className="col-md-4 col-space-5">
                            <div className="glimps-count">
                                <h4>
                                {this.state.counts&&this.state.counts.data.district}
                                {/* <Odometer
                                    format= "d"
                                    duration= {500}
                                    // value="10"
                                    value = {this.state.counts&&this.state.counts.data.district}
                                /> */}
                                    </h4>
                                <h6>{this.props.language =="0" ? `Districts` : ` जिल्ला` }</h6>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="glimps-count">
                                <h4>
                                {this.state.counts&&this.state.counts.data.municipality}
                                {/* <Odometer
                                    format= "d"
                                    duration= {500}
                                    // value="10"
                                    value =  {this.state.counts&&this.state.counts.data.municipality}
                                /> */}
                                   </h4>
                                <h6>{this.props.language =="0" ? `Municipalities` : ` नगरपालिका` }</h6>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="glimps-count" >
                                <h4>
                           {     this.state.counts&&this.state.counts.data.total_area}
                                {/* <Odometer
                                    format= "d"
                                    duration= {500}
                                    value = {}
                                /> */}
                                    </h4>
                                <h6>{this.props.language =="0" ? `Total area(sq.m)` : `जम्मा क्षेत्रफल  ` }</h6>
                            </div>
                        </div>
                        <div className="col-md-4 ">
                            <div className="glimps-count">
        <h4>
        {this.state.counts&&this.state.counts.data.total_capacity}
        {/* <Odometer
                                    format= "d"
                                    duration= {500}
                                    value =  {this.state.counts&&this.state.counts.data.total_capacity}
                                /> */}
           </h4>
                                <h6>{this.props.language =="0" ? `Total Capacity` : `जम्मा क्षमता ` }</h6>
                            </div>
                        </div>
                       
                        <p>{this.props.language =="0" ? `The above numbers is the summary of all identified open spaces that has been surveyed by IOM till date. It includes open spaces of Kathmandu, Bhaktapur and Lalitpur.` : `माथिका नम्बरहरू सबै पहिचान गरिएका खुला ठाउँहरूको सारांश हो जुन आईओएमले हालसम्म सर्वेक्षण गरेको छ। यसमा काठमाण्डौं, भक्तपुर र ललितपुरको खुला ठाउँहरू छन्।` } 

</p>


<Modal show={this.state.open} centered="true" size="lg" zIndex="99999">
                <Modal.Header>Modal title
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div class="modal-body">
                        <h1>hdjahgdhjasgd</h1>


                        <ul class="assessment-modal-list">

                        </ul>
                    </div>
                </Modal.Body>

            </Modal>
                    </div>

                


                </div>
             </div>
           
        </section> 

       
    </>


        )
    }
}
const mapStateToProps = (state) => {
    return {
         language: state.language
     }
  }
export default connect(mapStateToProps)(Glimpse);
