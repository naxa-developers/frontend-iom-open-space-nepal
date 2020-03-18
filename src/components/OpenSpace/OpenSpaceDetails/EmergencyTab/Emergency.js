import React, {useState, useEffect} from 'react'
import {Card} from 'react-bootstrap'
import '../Gallery/Photo.css'
import Axios from 'axios'
function Emergency() {


    const[erData, seterData] = useState();
useEffect(() => {
    let OID = localStorage.getItem("OpenspaceID")
    
    Axios.get(`http://139.59.67.104:8011/api/v1/message/?id=${OID}`).then(
        res => {
           
            
seterData(res.data)

        }
    )
 
    
}, []) 


        return (
            <div>
                {
                   erData&& erData.map((e) => {
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
                    })
                }
{/* <Card>
                    <Card.Header> <h4>Agency Name:</h4> <span>Other agency</span>
                    <Card.Body><h6>Message:</h6> <span>This is a long message</span></Card.Body>
                    </Card.Header>
  
</Card> */}
            </div>
        )
    }


export default  Emergency;
