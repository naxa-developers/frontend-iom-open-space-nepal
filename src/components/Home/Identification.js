import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import IdentificationCard from './IdentificationCard';

class Identification extends Component {
    constructor(props) {
        super(props)

        this.state = {
            steps: null,
            data: null
        }
    }

    // state = {
    //     steps: []
    // }
    componentDidMount() {
        axios.get(`${process.env.BASE_URL_API}/about_why_map_open_icon/`)
            .then(res => {
                const steps = res.data;
                this.setState({ steps: steps });

            })
        axios.get(`${process.env.BASE_URL_API}/about_why_map_open_space/`)
            .then(res => {
                const data = res.data;
                this.setState({ data: data });

            })
    }
    render() {
        return (
            <section className="process ptb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6" >
                            {/* <div className="process-left sticky"> */}
                            <div className="process-left">
                                <h3 className="openspace-title">{this.props.language == '0' ? this.state.data && this.state.data[0].title : this.state.data[0].title_nep}</h3>
                                <p>{this.props.language == '0' ? this.state.data && this.state.data[0].description : this.state.data && this.state.data[0].description_nep}</p>
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="process-content">
                                {this.state.steps && this.state.steps.map((step, i) =>
                                    <IdentificationCard key={step.id} no={i} image={step.icon_class} title={step.description} title_nep={step.description_nep} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        language: state.language
    }
}

export default connect(mapStateToProps)(Identification);
