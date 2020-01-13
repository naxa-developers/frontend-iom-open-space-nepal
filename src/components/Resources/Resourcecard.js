import React, { Component } from "react";
import  {FacebookShareButton, FacebookIcon, TwitterShareButton,TwitterIcon} from 'react-share'
import ShowMoreText from 'react-show-more-text';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
// import ShowMore from "react-show-more";
class Resourcecard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      downloadUrl: '',
      shareUrl :`https://openspace.naxa.com.np/#/resources`,
      showAlert: false

    };
  }

  downloadClicked = () => {
    console.log("check download");
    
    !this.props.audio&&!this.props.publication&&!this.props.video&& confirmAlert({
      title: 'No download resource available!',
      buttons: []
    })
  }



  render() {

  
 var desc = this.props.description;
console.log(desc.length)
// var d= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consectetur tellus mi, ac euismod nisi suscipit vitae. Duis vehicula nibh quis felis tempor vulputate. Nunc non fringilla nisl, et malesuada elit. Etiam vel purus justo. Suspendisse imperdiet ultricies odio, porttitor iaculis ante iaculis ut. Aenean in sapien metus. Integer et arcu sodales, rhoncus neque eget, imperdiet mauris. Duis rhoncus ex ex, vitae fringilla sem tempor ut. In sed ante varius mauris auctor congue id at orci. Sed nibh diam, bibendum non pretium a, ornare ut velit. Phasellus egestas ac elit sed dictum. Proin pulvinar, dui ut tincidunt ultricies, erat lectus feugiat tellus, at sagittis ex tortor id felis. Donec in neque vitae arcu hendrerit dignissim vel et turpis.Nunc rhoncus, ex in maximus commodo, dui quam aliquet elit, non egestas quam tortor sit amet quam. Duis scelerisque tellus vitae sollicitudin scelerisque. Morbi enim magna, fringilla vitae pellentesque quis, semper sit amet risus. Aliquam erat volutpat. Quisque aliquam tincidunt ipsum, eu vestibulum urna porta at. Quisque et ipsum elementum, gravida metus a, elementum tellus. Cras porttitor nec tellus vitae aliquet. Aliquam at mi ut tortor ultricies maximus. Pellentesque ut enim vitae neque molestie lacinia ac eget mauris. Aliquam lacinia, dui id efficitur consequat, dolor ante fringilla massa, vitae aliquam nisi neque non ante. Mauris arcu dui, bibendum id egestas nec, vulputate nec diam. Cras nec laoreet lacus."

 
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
                   
                    <ShowMoreText
                      lines={3}
                      more='Show more'
                      less ='Show less'
                      anchorClass= ''
                      expanded ={false}
                      keepNewLines ={false}
                      >
                  { this.props.description}
                      </ShowMoreText> 

                    
                  
            
  {/* <p>{this.props.description}</p> */}
                </div>
                <div className="download-section">
                <div className="icon-wrap-section">
               
                   {/* <button className="btn btn-share"><MaterialIcon icon="share" color="#418fde"></MaterialIcon></button>  */}
                 
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
