import React, { Component } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import CriteriaCard from './CriteriaCard'
import Identification from './Identification'

let dArray = [];
export class Criteria extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             description: null,
             header: null,
             criteria: null,
             cHeader: null,
             currentPoint: '',
             dArray: null,
             steps: null
        }
    }

    fetchData = () => {
        Axios.get(`https://iomapi.naxa.com.np/api/v1/about_criteria_description/`).then(
            res => {
            
                this.setState({description: res.data[0]})
            }
        )
        Axios.get(`https://iomapi.naxa.com.np/api/v1/about_criteria_type/`).then(
            res => {
            
                this.setState({header: res.data[0]})
            }
        )
        Axios.get(`https://iomapi.naxa.com.np/api/v1/about_open_space_criteria/`).then(
            res => {
         
            let titleArr = [];
            let titleArrNep = [];

            res.data.map((r) => {
                titleArr.push(r.title)
                titleArrNep.push(r.title_nep)

            })
            this.setState({titleArr: [... new Set(titleArr)], titleArrNep:[... new Set(titleArrNep)] })
                this.setState({criteria: res.data})
            }
        )
        Axios.get(`https://iomapi.naxa.com.np/api/v1/identify_open_space_new`).then(
            res => {
            
                this.setState({steps: res.data.data})
            }
        )
      
    }
    componentDidMount() {
        this.fetchData()
    }
    
    render() {
        return (
           <>             
        <section className="about-content pdt-130 pdb-130">
        <div className="container">
            <div className="content-top">
                <div className="row">
                    <div className="col-md-4">
                        <h3 className="openspace-title">{this.state.header&& this.props.language == '0' ? this.state.header.title : this.state.header&&this.state.header.title_nep}</h3>
                    </div>
                    <div className="col-md-8">
                        <div className="para about-body">
        <p>{this.state.description&& this.props.language == '0' ? this.state.description.description : this.state.description&&this.state.description.description_nep}</p>
                            {/* <p>Open spaces for humanitarian purposes are selected in consultation with a multitude of stakeholders including local communities, humanitarian agencies, local disaster risk management committees, ward presidents and security forces, among others.</p>
                            <p> Open spaces failing to meet the below criteria may cause further distress to the disaster affected and displaced populations. Identification of flat and large open spaces in the hilly terrain of Nepal is in itself a challenge. However, the following criteria are considered for identifying open spaces for humanitarian purposes and providing refuge to displaced populations.</p> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-bottom">
                <div className="row">
                    <div className="col-md-4">
                       <div className="list-wrapper">
                           <ul className="about-h4">
                               {
                                   this.props.language=== '0' ? this.state.titleArr&& this.state.titleArr.map((c, i) => {

                                   return <li onClick={()=> {
                   
                   
                                    this.setState({currentPoint: c})
            //                             ,() => {
                                          
            // this.state.criteria.map(t => {
            //     if(t.title===this.state.currentPoint){
            //      console.log(t.description);
                 
            //     dArray.push(t.description)
                   
            //     }
            // }) 
            // console.log("ll", dArray);
            
            // this.setState({dArray: dArray})
           
            //                             })
                                    } }><span className="about-span">{i+1}</span>{c}</li>
                                   })
                                   :
                                   this.state.titleArrNep&& this.state.titleArrNep.map((c, i) => {
                                 
                                    return <li onClick={()=> this.setState({currentPoint: c}) }><span className="about-span">{i+1}</span>{c}</li>
                                    })
                               }
                             
                               
                           </ul>
                       </div>
                    </div>
                   <CriteriaCard title = {this.state.currentPoint} total = {this.state.criteria}/>
                </div>
            </div>
        </div>
    </section>

<section className="about-procedure pdt-130 pdb-130">
<div className="container">
    <div className="row">
        <div className="col-md-6">
            <div className="about-left">
                <h3 className="openspace-title">Open Space Identification Process</h3>
                <p className="about-body">The open spaces were identified and selected through a 5-step methodology that is built upon the inputs from local governments, humanitarian agencies as well as community members. This methodology ensures the actual usability of the open spaces.</p>
            </div>
        </div>
        <div className="col-md-6">
            <div className="about-right">
                {
                    this.state.steps&&this.state.steps.map((step, i) => {
                        return(
                           <Identification
                           sn = {i} 
                           key = {step.id}
                           image = {step.image}
                           title = {step.title}
                           title_nep ={step.title_nep}
                           points = {step.points}

                           />
                        )
                    })
                }
               
                {/* <div className="blocks">
                    <div className="block-icons"style={{backgroundImage:`url(${Icon5})`}}>
                        <img src={Line} alt="" />
                    </div>
                    <div className="block-steps">
                        <span className="about-span">Step 2</span>
                        <h4 className="about-h4">Identification of Open Spaces</h4>
                        <ul className="steps-list about-body">
                            <li><i className="material-icons success">check_circle</i><span>Preliminary listing by local representatives</span></li>
                            <li><i className="material-icons success">check_circle</i><span>Sensitization workshop on open spaces mapping </span></li>
                            <li><i className="material-icons success">check_circle</i><span>Open spaces finalization as per standards</span></li>
                        </ul>
                    </div>
                </div>
                <div className="blocks">
                    <div className="block-icons" style={{backgroundImage:`url(${Icon1})`}}>
                        <img src={Line} alt="" />
                    </div>
                    <div className="block-steps">
                        <span className="about-span">Step 3</span>
                        <h4 className="about-h4">Field Survey and Data Collection</h4>
                        <ul className="steps-list about-body">
                            <li><i className="material-icons success">check_circle</i><span>Secure drone flight permissions</span></li>
                            <li><i className="material-icons success">check_circle</i> <span>Field observations and aerial survey</span></li>
                            <li><i className="material-icons success">check_circle</i><span>Critical facilities mapping</span></li>
                        </ul>
                    </div>
                </div>
                <div className="blocks">
                    <div className="block-icons" style={{backgroundImage:`url(${Icon3})`}}>
                        <img src={Line} alt="" />
                    </div>
                    <div className="block-steps">
                        <span className="about-span">Step 4</span>
                        <h4 className="about-h4">Data processing and GIS Mapping</h4>
                        <ul className="steps-list about-body">
                            <li><i className="material-icons success">check_circle</i><span>Data processing and Geodatabase preparation</span></li>
                            <li><i className="material-icons success">check_circle</i><span>Detailed topographical mapping </span></li>
                            <li><i className="material-icons success">check_circle</i><span>GIS maps and open space map atlas</span></li>
                        </ul>
                    </div>
                </div>
                <div className="blocks">
                    <div className="block-icons" style={{ backgroundImage: `url(${Icon2})` }}>
                    </div>
                    <div className="block-steps">
                        <span className="about-span">Step 5</span>
                        <h4 className="about-h4">Output Validation, Finalization and Dissemination</h4>
                        <ul className="steps-list about-body">
                            <li><i className="material-icons success">check_circle</i><span>Incorporate feedback from local government and stakeholders</span></li>
                            <li><i className="material-icons success">check_circle</i><span>Finalize maps and outputs </span></li>
                            <li><i className="material-icons success">check_circle</i><span>Organize dissemination workshop </span></li>
                            <li><i className="material-icons success">check_circle</i><span>Integrate data into digital portals</span></li>
                            <li><i className="material-icons success">check_circle</i><span>Submit final deliverables</span></li>
                        </ul>
                    </div>
                </div> */}
            </div>
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
        ...state,
        language: state.language
    }
}


export default connect(mapStateToProps)(Criteria);
