import React, { Component } from 'react'
import Line from '../../img/Line.png'
import { connect } from 'react-redux';
export class Identification extends Component {
    render() {
        const { image, title, points, title_nep, sn  } = this.props;

        return (
            <div className="blocks">
            <div className="block-icons"style={{backgroundImage:`url(${image})`}}>
             
                <img src={Line} alt="" />
            </div>
            <div className="block-steps">
        <span className="about-span">{this.props.language=== '1' ? `चरण ${sn+1}` : `Step ${sn+1}`}</span>
        <h4 className="about-h4">{this.props.language=== '0' ? title : title_nep}</h4>
                <ul className="steps-list about-body">
                {
                    points.map(p => {
                    return   <li><i className="material-icons success">check_circle</i><span>{this.props.language=== '0' ? p.title : p.title_nep}</span></li>
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
        ...state,
        language: state.language
    }
}


export default connect(mapStateToProps)(Identification);
