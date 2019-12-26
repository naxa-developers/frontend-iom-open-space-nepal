import React, { Component } from "react";
import  {FacebookShareButton, FacebookIcon, TwitterShareButton,TwitterIcon} from 'react-share'
import ShowMore from 'react-show-more';
class Resourcecard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      downloadUrl: '',
      shareUrl :`https://openspace.naxa.com.np/#/resources`
    };
  }

  downloadClicked = () => {
    console.log("check download");
    
    !this.props.audio&&!this.props.publication&&!this.props.video&& alert("No download resource available")
  }



  render() {

  
 
    return (
      <>
        <div className="row-section-wrap">
          <div className="row">
            <div className="col-12 col-md-3">
                <figure className="image-section" 
                style={{ backgroundImage: `url(${this.props.image})`}}
                >
                  {/* { <img src={this.props.image}  alt="" /> } */}
                </figure>
              </div>

            <div className="col-12 col-md-9">
              <div className="wrapper-content">
                <div className="content-wrap">
                <h3 className="h3-title">{this.props.title}</h3>
                    <span className="datetime">{this.props.date}</span>
                    <p>
                      {/* <ShowMore
                      lines={3}
                      more='Show more'
                      less ='Show less'
                      anchorClass= ''
                      >
 {this.props.description}
                      </ShowMore> */}
                      {this.props.description}

                     </p>
                </div>
                <div className="download-section">
                <div className="icon-wrap-section">
               
                   {/* <button className="btn btn-share"><MaterialIcon icon="share" color="#418fde"></MaterialIcon></button>  */}
                   <FacebookShareButton children={<FacebookIcon size='30px' round="true" />} url={this.state.shareUrl} />
                  <TwitterShareButton children={<TwitterIcon size='30px' round="true"/>} url={this.state.shareUrl} />
                  <a onClick={()=> this.downloadClicked()} 
                  href={this.props.document_type==0
                     ? this.props.publication 
                     : this.props.document_type==1
                      ? this.props.audio
                      ? this.props.document_type==2
                      : this.props.video
                      :''
                    }  download target="_blank" >
                      
                    <button className="btn btn-download">
                     
                    {/* <FacebookShareCount url={this.state.shareUrl} /> */}
                      <i className="humanitarian-icon-Download"></i>
                    </button>
                  </a>
                 
                </div>
                <div className="para-wrap-section">
                  <p className="para-details-block">
                    <span className="title">Type</span>
                    <span className="subtitle">
                      {this.props.document_type == 0
                        ? "Publication"
                        : this.props.document_type == 1
                        ? "Audio"
                        : this.props.document_type == 2
                        ? "Video"
                        : ""}
                    </span>
                  </p>
                  <p className="para-details-block">
                    <span className="title">Category</span>
                    <span className="subtitle">
                      {this.props.categories == 0
                        ? "Plans & Policies"
                        : this.props.categories == 1
                        ? "Research"
                        : this.props.categories == 2
                        ? "Multimedia"
                        : "None "}
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

export default Resourcecard;
