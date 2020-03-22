import React, { Component } from 'react';
import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-default.css';
import  {connect} from 'react-redux';
import {  Modal } from 'react-bootstrap'
import countershape from '../../img/counter-shape.png'
import Axios from 'axios';
import '../OpenSpace/OpenSpaceDetails/Details.css'

class Glimpse extends Component {
 
    constructor(props) {
        super(props)
    
        this.state = {
            counts: '',
            className: this.props.className,
            open: false,
            openOne: false,
            munArray: [
              'Kathamandu Metropolitan City',
              '  Gokarneshwor Municipality',
            '    Kirtipur Municipality',
               ' Bhaktapur Metropolitan City',
               'Lalitpur Metropolitan City',
              '  Gorkha Municipality Office',
              '  Bhimeshwor Municipality',
              '  Chautara Sangachowkgadhi Municipality',
              '  Gosainkunda Rural Municipality',
              '  Neelakantha Municipality',
             '   Pokhara Metropolitan City',
              '  Baglung Bazar Municipality',
               ' Tansen Municipality',
              '  Putali Bazar Municipality',
               ' Resunga Municipality'
            ],
            districtArray : [
             ' Kathmandu ',
            '  Bhaktapur ',
'              Lalitpur',
            '  Gorkha',
          '    Dolakha',
            '  Sindupalchowk',
              'Rasuwa',
            '  Dhading',
           '   Kaski',
           '   Baglung',
            '  Palpa',
           '   Syangja',
             ' Gulmi'
            ]
           
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
     
        
        this.setState({
            open: true
        })

    }
    toggleOne = () =>{
     
        
        this.setState({
            openOne: true
        })

    }
    componentDidMount() {
        this.setState({  odometerValue:600   })
        this.fetchCounts()
    }
    
    render() {

        return (
            <>
             <Modal show={this.state.open} centered="false" size="md">
                <Modal.Header><strong>Districts</strong>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={()=> this.setState({open: !this.state.open})}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div class="modal-body">
                    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">S.N</th>
      <th scope="col">Name of District</th>
      {/* <th scope="col">Value</th> */}
      
    </tr>
  </thead>
  <tbody>
    {
      this.state.districtArray.map((d, i) => {
        return (
          <tr>
          <th scope="row">{i+1}</th>
        <td>{d}</td>
     
         
        </tr>
     
      )
      })
    }
    
  
     
   
   



  </tbody>
</table>
                    </div>
                </Modal.Body>

            </Modal>
            <Modal show={this.state.openOne} centered="false" size="md">
                <Modal.Header><strong>Municipalities</strong>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={()=> this.setState({openOne: !this.state.openOne})}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div class="modal-body">
                    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">S.N</th>
      <th scope="col">Name of Municipality</th>
      {/* <th scope="col">Value</th> */}
      
    </tr>
  </thead>
  <tbody>
  {
    this.state.munArray.map((i,m) => {
              return(
            <tr>
              <td scope="row">{m+1}</td>
              <td>{i}</td>
            
             
              </tr>
          )
          })
      }

  </tbody>
</table>
                    </div>
                </Modal.Body>

            </Modal>
            <section className="glimps-counter" style={{backgroundImage: `url(${countershape})`}} >
            {/* <div className="overlay" ></div> */}
            <div className="glimps-wrapper">
                <div className="container">
                    {/* <h3 className="openspace-title">{this.props.language =='0' ? `Glimpse of Open Spaces in Nepal` : `नेपालको खुल्ला क्षेत्रहरूको झलक` }</h3> */}
                    
                    <div className="row">
                        <div className="col-md-3 " >
            
                            <div className="glimps-count" >
                                <h4>
                            
                                    <Odometer
                                    format= "d"
                                    duration= {500}
                                    glimps-count            
                                    value = {this.state.counts&&this.state.counts.data.open_space}
                                />
                                </h4>
                                <h6>{this.props.language =="0" ? `Open spaces` : `खुल्ला क्षेत्र` }</h6>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="glimps-count glimpse-hover" onClick={() => this.toggle()}>
                                <h4>
                                
                             
                                <Odometer
                                    format= "d"
                                    duration= {500}
                                 
                                    value = {this.state.counts&&this.state.counts.data.district}
                                />
                                    </h4>
                                <h6>{this.props.language =="0" ? `Districts` : ` जिल्ला` }</h6>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="glimps-count glimpse-hover" onClick={() => this.toggleOne()}>
                                <h4>
                            
                                <Odometer
                                    format= "d"
                                    duration= {500}
                                   
                                    value =  {this.state.counts&&this.state.counts.data.municipality}
                                />
                                   </h4>
                                <h6>{this.props.language =="0" ? `Municipalities` : ` नगरपालिका` }</h6>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="glimps-count" >
                                <h4>
                    
                                <Odometer
                                    format= "d"
                                    duration= {500}
                                    value = { this.state.counts&&this.state.counts.data.total_area}
                                />
                                    </h4>
                                <h6>{this.props.language =="0" ? `Total area(sq.m)` : `जम्मा क्षेत्रफल  ` }</h6>
                            </div>
                        </div>
                        {/* <div className="col-md-4 ">
                            <div className="glimps-count">
        <h4>
       
        <Odometer
                                    format= "d"
                                    duration= {500}
                                    value =  {this.state.counts&&this.state.counts.data.total_capacity}
                                />
           </h4>
                                <h6>{this.props.language =="0" ? `Total Capacity` : `जम्मा क्षमता ` }</h6>
                            </div>
                        </div> */}
                       
                        <p>{this.props.language =="0" ? `The above numbers is the summary of all identified open spaces that has been surveyed by IOM till date. It includes open spaces of Kathmandu, Bhaktapur and Lalitpur.` : `माथिका नम्बरहरू सबै पहिचान गरिएका खुला ठाउँहरूको सारांश हो जुन आईओएमले हालसम्म सर्वेक्षण गरेको छ। यसमा काठमाण्डौं, भक्तपुर र ललितपुरको खुला ठाउँहरू छन्।` } 
</p>



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
