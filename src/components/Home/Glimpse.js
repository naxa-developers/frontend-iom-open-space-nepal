import React, { Component } from 'react';
import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-default.css';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap'
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
            openTwo: false,
            munArray: null,
            districtArray: null,
            munCount: null,
            oArray: null

        };
    }

    fetchCounts = () => {
        Axios.get(`${process.env.BASE_URL_API}/glimpse_of_open_space`)
            .then(res => {

                const counts = res.data.data;
                let mun = Object.values(counts.municipality_list);
                let munArray = [];
                mun.map((m) => {


                    munArray.push(Object.keys(m)[0]);

                })

                this.setState({
                    counts: counts,
                    munArray: munArray,
                    munCount: munArray.length,
                    districtArray: counts.district_list


                })




            })
        Axios.get(`${process.env.BASE_URL_API}/open_space_landing`).then(
            res => {
                const data = res.data;
                let oArray = [];
                data.data.map(m => {
                    oArray.push(m.title)

                })
                this.setState({
                    oArray: oArray
                })
            }
        )
    }

    toggle = () => {


        this.setState({
            open: true
        })

    }
    toggleOne = () => {


        this.setState({
            openOne: true
        })

    }
    componentDidMount() {
        this.setState({ odometerValue: 600 })
        this.fetchCounts()
    }

    render() {

        return (
            <>
                <Modal show={this.state.openTwo} centered="false" size="md">
                    <Modal.Header>
                        <h4 style={{ color: '#174BDD', fontWeight: '600', textTransform: 'capitalize' }}>Openspaces</h4>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ openTwo: !this.state.openTwo })}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="modal-body">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">S.N</th>
                                        <th scope="col">Name of Openspace</th>
                                        {/* <th scope="col">Value</th> */}

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.oArray && this.state.oArray.map((d, i) => {
                                            return (
                                                <tr key={i}>
                                                    <th scope="row">{i + 1}</th>
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
                <Modal show={this.state.open} centered="false" size="md">
                    <Modal.Header>
                        <h4 style={{ color: '#174BDD', fontWeight: '600', textTransform: 'capitalize' }}>Districts</h4>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ open: !this.state.open })}>
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
                                        this.state.districtArray && this.state.districtArray.map((d, i) => {
                                            return (
                                                <tr key={i}>
                                                    <th scope="row">{i + 1}</th>
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
                    <Modal.Header>  <h4 style={{ color: '#174BDD', fontWeight: '600', textTransform: 'capitalize' }}>Municipalities</h4>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ openOne: !this.state.openOne })}>
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
                                        this.state.munArray && this.state.munArray.map((i, m) => {
                                            return (
                                                <tr key={m}>
                                                    <td scope="row">{m + 1}</td>
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
                <section className="glimps-counter" style={{ backgroundImage: `url(${countershape})` }} >
                    {/* <div className="overlay" ></div> */}
                    <div className="glimps-wrapper">
                        <div className="container">
                            {/* <h3 className="openspace-title">{this.props.language =='0' ? `Glimpse of Open Spaces in Nepal` : `नेपालको खुल्ला क्षेत्रहरूको झलक` }</h3> */}

                            <div className="row">
                                <div className="col-md-3 " >

                                    <div className="glimps-count glimpse-hover" onClick={() => this.setState({ openTwo: !this.state.openTwo })}>
                                        <h4>

                                            <Odometer
                                                format="d"
                                                duration={500}
                                                glimps-count
                                                value={this.state.counts && this.state.counts.open_space}
                                            />
                                        </h4>
                                        <h6>{this.props.language == "0" ? `Open Spaces` : `खुल्ला क्षेत्र`}</h6>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="glimps-count glimpse-hover" onClick={() => this.toggle()}>
                                        <h4>


                                            <Odometer
                                                format="d"
                                                duration={500}

                                                value={this.state.counts && this.state.counts.district}
                                            />
                                        </h4>
                                        <h6>{this.props.language == "0" ? `Districts` : ` जिल्ला`}</h6>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="glimps-count glimpse-hover" onClick={() => this.toggleOne()}>
                                        <h4>

                                            <Odometer
                                                format="d"
                                                duration={500}

                                                value={this.state.counts && this.state.munCount}
                                            />
                                        </h4>
                                        <h6>{this.props.language == "0" ? `Municipalities` : ` नगरपालिका`}</h6>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="glimps-count" >
                                        <h4>

                                            <Odometer
                                                format="d"
                                                duration={500}
                                                value={this.state.counts && this.state.counts.total_area}
                                            />
                                        </h4>
                                        <h6>{this.props.language == "0" ? `Total area(sq.m)` : `जम्मा क्षेत्रफल  `}</h6>
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

                                <p>{this.props.language == "0" ? `The above figures represent the summary of all identified humanitarian open spaces that have been surveyed by IOM.`
                                    : `माथिका नम्बरहरू सबै पहिचान गरिएका खुला ठाउँहरूको सारांश हो जुन आईओएमले हालसम्म सर्वेक्षण गरेको छ। यसमा काठमाण्डौं, भक्तपुर र ललितपुरको खुला ठाउँहरू छन्।`}
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
