import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function DownloadApp({language, showViewMore}) {
    return (
        <div className="app-section mb-150 pt-150">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <figure className="app-figure flex-end">
                        <img src={require('../../img/app-banner.png')} alt="app" />
                    </figure>
                </div>
                <div className="col-md-6">
                    <figure className="app-content">
                        <span className="sub-title">{ language=='0' ? 'Get started with' : 'सुरु गर्नुहोस्'}</span>
                        <h3 className="openspace-title">{ language=='0' ? 'OPEN SPACES App' : 'खुला ठाउँ अनुप्रयोग'}</h3>
                        
                        <div className="app-icons-content">
                            
                            <h4>{ language=='0' ? 'Download now' : 'डाउनलोड गर्नुहोस्' }</h4>
                            <div className="app-icon flex-start">
                                <figure>
                                   <a href='https://apps.apple.com/sk/app/open-space-nepal/id1534918535' target='_blank'>
                                       <img src={require('../../img/appstore.png')} alt="ios" />
                                       </a> 
                                </figure>
                                <figure>
                                    <a href='https://play.google.com/store/apps/details?id=com.iom.openspaces&hl=en&gl=US' target='_blank'>
                                    <img src={require('../../img/googleplay.png')} alt="android" />
                                    </a>
                                </figure>
                            </div>
                        </div>
                        {
                            showViewMore && <Link to='/aboutapp'> <button className='openspace-button' style={{
                                background: '#fff',
                                color: "blue"
                            }}
                            
                            >{ language=='0' ? 'Learn More' : 'थप हेर्नुहोस् '}</button>
                            </Link>
                        }
                    </figure>
                </div>
            </div>
        </div>
</div>
    )
}

const mapStateToProps = state => {
    return {
     language: state.language
    };
  };


export default connect(mapStateToProps)(DownloadApp);
