import React, { Component} from 'react'
import {Card} from 'react-bootstrap'
import '../Gallery/Photo.css'
import Axios from 'axios'
class Emergency extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             erData: null
        }
    }
    


componentDidMount() {
    let OID = localStorage.getItem("OpenspaceID")
    
    Axios.get(`https://iomapi.naxa.com.np/api/v1/message/?id=${OID}`).then(
        res => {
           console.log("emergency", res.data);
           
        this.setState({
            erData: res.data
        })


        }
    ) 
}
 
render() {
    this.state.erData&& console.log("l", Object.keys(this.state.erData).length);

    return (
        <div>
            {
                this.state.erData&& Object.keys(this.state.erData).length!==0 ?  this.state.erData.map((e) => {
                    return(
                        <Card>
                                 <Card.Header>
                                     <div style={{display:'flex'}}>
                                      <div>
                                       <h4 className="emerge-header">Agency Name:</h4>
                                        </div>
                                      <div> <span className="agency-name">{e.agency_name}</span>
                                        </div> 
                                      </div>
                                     <div className="message">
                               <h6 style={{color:'#174BDD'}}>Message:</h6> <span>{e.message} </span>
                                </div>
                                    </Card.Header>
                        
                        </Card>
                    )
                }) : <h6 style={{color: '#6D6E71', marginTop:'10px', fontSize:'1rem'}}>No messages available for this openspace</h6>
            }
        </div>
    )
}
}
   

export default Emergency;
