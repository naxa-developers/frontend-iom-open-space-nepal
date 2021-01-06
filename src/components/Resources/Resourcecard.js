import React, { Component } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// import ShowMore from "react-show-more";
import { HashLink as Link } from 'react-router-hash-link';
import { connect } from "react-redux";

const options = [
  { value: 0, label: "Plans & Policies" },
  { value: 1, label: "Research" },
  { value: 2, label: "Multimedia" },
  { value: 3, label: "Report" },
  { value: 4, label: "Study Report" },
  { value: 5, label: "Atlas Mapbook" },
  { value: 6, label: "Summary Report" }
];
class Resourcecard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      downloadUrl: '',
      shareUrl: `https://openspace.naxa.com.np/#/resources`,
      showAlert: false

    };
  }

  downloadClicked = () => {
    const{document_type} = this.props;
    
    let downloadUrl = '';
    if(document_type === 0){
      downloadUrl= this.props.audio
    }else if( document_type === 1){
      downloadUrl = this.props.publication
    }else if(document_type === 2){
      downloadUrl = this.props.video
    }

    if (downloadUrl) {
      window.open(downloadUrl)
    } else {
      confirmAlert({
        customUI: ({ onClose }) => <div><h4>No download resource available!</h4></div>,
        title: 'No download resource available!',
        buttons: []
      })
    }

  }

  matchOptionsToCategory = (id) => {
  const matched =  options.filter(opt => opt.value===id)
  if(matched.length){
    return matched[0].label
  }else {
    return 'None'
  }
  }


  render() {
    return (
      <>
        <div className="row-section-wrap">
          <div className="row">
            <div className="col-12 col-md-3">
              <figure className="image-section"
                style={{ backgroundImage: `url(${this.props.image})` }}
              >
              </figure>
            </div>

            <div className="col-12 col-md-9">
              <div className="wrapper-content">
                <div className="content-wrap">
                  <h3 className="h3-title">{this.props.title}</h3>

                  <span className="datetime">{this.props.date}</span>
                  <p className="para-collapse collapse" id="collapseExample">{this.props.description}</p>
                  <Link class="btn collapsed" data-toggle="collapse" to="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"

                  >
                  </Link>
                </div>
                <div className="download-section">
                  <div className="icon-wrap-section">
                    <a
                      onClick={() => this.downloadClicked()}
                      // href={this.props.document_type == 0
                      //   ? this.props.publication
                      //   : this.props.document_type == 1
                      //     ? this.props.publication
                      //       ? this.props.document_type == 2
                      //       : this.props.video
                      //     : ''
                      // }
                      // download target="_blank"

                    >

                      <button className="btn btn-download">

                        {/* <FacebookShareCount url={this.state.shareUrl} /> */}
                        <i className="humanitarian-icon-Download"></i>
                      </button>
                    </a>

                  </div>
                  <div className="para-wrap-section">
                    <p className="para-details-block">
                      <span className="title">{this.props.language == '0' ? 'Type' : 'प्रकार'}</span>
                      <span className="subtitle">
                        {this.props.document_type == 0
                          ? "Audio"
                          : this.props.document_type == 1
                            ? "Publication"
                            : this.props.document_type == 3
                              ? "Video"
                              : ""}
                      </span>
                    </p>
                    <p className="para-details-block">
                      <span className="title">{this.props.language == '0' ? 'Category' : 'वर्ग'}</span>
                      <span className="subtitle">
                     { this.matchOptionsToCategory(this.props.categories) }
                      </span>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.language
  };
};


export default connect(mapStateToProps)(Resourcecard);
