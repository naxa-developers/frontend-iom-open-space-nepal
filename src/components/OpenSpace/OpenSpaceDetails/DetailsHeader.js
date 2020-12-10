import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import Tent from '../../../img/tento.png'
import LoaderSmall from '../../Report/LoadingSpinner';
import { Modal, Card } from 'react-bootstrap'
import Axios from 'axios';
import '../OpenSpaceCSS.css'
class DetailsHeader extends Component {


  constructor(props) {
    super(props)

    this.state = {
      isActive: false,
      notifications: false,
      showNotifications: false,
      erData: null,
      nullNoti: null
    }
  }

  componentDidMount() {
    let OID = localStorage.getItem("OpenspaceID")

    Axios.get(`${process.env.BASE_URL_API}/message/?id=${OID}`).then(
      res => {
        res.data.length !== 0 && this.setState({ nullNoti: true })
        this.setState({
          erData: res.data
        })


      }
    )
  }


  render() {


    return (
      <React.Fragment>
        <Modal show={this.state.showNotifications} centered="false" size="md">
          <Modal.Header><h4 style={{ color: '#174BDD', fontWeight: '600', textTransform: 'capitalize' }}>humanitarian assessment</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ showNotifications: !this.state.showNotifications })}>
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <div class="modal-body">

              {
                this.state.erData && Object.keys(this.state.erData).length !== 0 ? this.state.erData.map((e) => {
                  return (
                    <Card>
                      <Card.Header>
                        <div style={{ display: 'flex' }}>
                          <div>
                            <h4 className="emerge-header">Agency Name:</h4>
                          </div>
                          <div> <span className="agency-name">{e.agency_name}</span>
                          </div>
                        </div>
                        <div className="message">
                          <h6 style={{ color: '#174BDD' }}>Message:</h6> <span>{e.message} </span>
                        </div>
                      </Card.Header>

                    </Card>
                  )
                }) : <h6 style={{ color: '#6D6E71', marginTop: '10px', fontSize: '0.9rem' }}>No messages available for this openspace.</h6>
              }
            </div>
          </Modal.Body>

        </Modal>
        <div className="space-details">
          <div className="space">
            <div className="space-content">
              <h5>{this.props.title ? this.props.title : <LoaderSmall />} </h5>

              {/* //  className= {this.state.notifications == true ? 'bell-active' : 'bell'} */}


              <p className="bell-message">
                {
                  // this.state.nullNoti === true &&
                  <span onClick={() => this.setState({ showNotifications: true })}>
                    <i id="bellActive" className="material-icons">notifications_active</i>
                 Humanitarian Assessment
               </span>
                }


              </p>
              <p>
                <span>
                  <i className="material-icons">room</i>

                  {this.props.address}
                </span>
                <span>
                  <MaterialIcon icon="near_me"></MaterialIcon>{this.props.shortest && this.props.shortest + " km"}
                </span>

              </p>

            </div>
            <div className={this.props.isActive ? "space-direction active" : "space-direction"} onClick={() => {
              if (this.props.isActive)
              {
                this.props.removeRoute()

              }
              else
              {
                this.props.Routing()
              }
              this.props.toogleactivetoute()

            }
            }>
              <i className="material-icons">directions</i>
            </div>

          </div>

          {this.props.image ?
            <figure style={{ backgroundImage: `url('${this.props.image}')` }}
            >
              {/* <img src={this.props.image?this.props.image:Tent} alt="open space " /> */}
            </figure>
            :
            <figure style={{ backgroundImage: `url('${Tent}')` }}
            >
              {/* <img src={this.props.image?this.props.image:Tent} alt="open space " /> */}
            </figure>

          }

        </div>
      </React.Fragment>
    );
  }
}
export default DetailsHeader;
