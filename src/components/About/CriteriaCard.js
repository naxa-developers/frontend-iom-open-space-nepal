import React, { Component } from 'react'
import Axios from 'axios'
let dArray = [];
export class CriteriaCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             dArray: ''
        }
    }

    componentDidMount(){
        Axios.get(`https://iomapi.naxa.com.np/api/v1/about_open_space_criteria/`).then(
            res => {
            
                this.setState({access: res.data},
                    () => {
                 
                       this.state.access.map(t => {
                        console.log(t.title);
                 
                            if(t.title==="Accessibility"){
                          
                                dArray.push(t.description)
                               
                            }
                        }) 
                        this.setState({dArray:dArray})

                    }
                    )
            }
        )
       
    }

    componentDidUpdate(prevProps, prevState){
        // console.log('update');
        dArray = [];
        if (prevProps.title !== this.props.title) {
           
            this.props.total.map(t => {
            
                if(t.title===this.props.title){
                 
                  
                    dArray.push(t.description)
                   
                }
            }) 
           
            
            this.setState({dArray:dArray})
        
        }
      }

    
    render() {
  
        return (
            <div className="col-md-8">
                        <div className="list-wrapper-info">
                            <ul className="about-body">
                                {
                                    this.state.dArray && this.state.dArray.map((d) => {
                                        return <li><i className="material-icons success">check_circle</i>{d}</li>
                                    })
                                }
                              
                                
                            </ul>
                        </div>
                    </div>
        )
    }
}

export default CriteriaCard
