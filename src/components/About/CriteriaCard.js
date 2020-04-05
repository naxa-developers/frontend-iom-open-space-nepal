import React, { Component } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux';
let dArray = [];
export class CriteriaCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             dArray: ''
        }
    }

    componentDidMount(){
        Axios.get(`http://139.59.67.104:8011/api/v1/about_criteria_type_description`).then(
            res => {
        
                this.setState({access: res.data.data},
                    () => {
                 
                       this.state.access.map(t => {
                      
                            if(t.title==="Accessibility"){
                                t.criteria_description.map((p) => {
                                    dArray.push(p.title)
                                })
                                // dArray.push(t.criteria_description)
                               
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
       if(this.props.language=="0") {
    if (prevProps.title !== this.props.title) {
        
         this.props.total.map(t => {
         
             if(t.title===this.props.title){
              t.criteria_description.map((e) => {
                dArray.push(e.title)
              })
               
                
                
             }
         }) 
        
         
         this.setState({dArray:dArray})
     
     }
    } else{
        if (prevProps.title !== this.props.title) {
        
            this.props.total.map(t => {
         
                if(t.title_nep===this.props.title){
                 
                    t.criteria_description.map((e) => {
                        dArray.push(e.title_nep)
                      })
                   
                }
            }) 
           
  
            this.setState({dArray:dArray})
        
        } 
    }    
    if(prevProps.language!==this.props.language) {

        if(this.props.language==='0') {
            this.state.access.map(t => {
                      
                if(t.title==="Accessibility"){
              
                    t.criteria_description.map((e) => {
                        dArray.push(e.title)
                      })
                   
                }
            }) 
         
        } else{
            this.state.access.map(t => {
                      
                if(t.title==="Accessibility"){
              
                    t.criteria_description.map((e) => {
                        dArray.push(e.title_nep)
                      })
                   
                }
            })  
        }

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

const mapStateToProps = (state) => {
    return {
        language: state.language
    }
}


export default connect(mapStateToProps)(CriteriaCard)
