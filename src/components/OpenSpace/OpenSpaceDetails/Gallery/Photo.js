import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ReactPanZoom from 'react-image-pan-zoom-rotate';

import './Photo.css'


const Photo = (props) => {

    const {
    largeImage, photo, className, name
    } = props;

   
   
  
    const [modal, setModal] = useState(false);
    // const [modalOne, setModalOne] = useState(false);

    const toggle = () => setModal(!modal);
 
    


    return (
        
        
        <>
        <div className="col-sm-4" >
          <figure onClick={toggle}>
            <img src={photo} alt="space image" />
          </figure>
        </div>
            
        
           
      
            <Modal isOpen={modal} toggle={toggle} className={className}  centered ="true" size = "lg" zIndex="99999">
        <ModalHeader toggle={toggle}> {name}
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </ModalHeader>
                <ModalBody>
                    <div class="modal-body">
                      {/* <div class="image-icon-options">
                        <i className="material-icons" >zoom_out</i>
                        <i className="material-icons" >zoom_in</i>
                        <i className="material-icons" >cached</i>
                      </div> */}
                      <figure style={{overflow:'hidden'}}>
                          <ReactPanZoom image={largeImage} />
                   
                      </figure>
                     
                    </div>
                </ModalBody>

            </Modal>
          
        </>
    )
}

export default Photo;