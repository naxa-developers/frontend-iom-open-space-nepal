import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { func } from 'prop-types';


const Photo = (props) => {

    const {
    largeImage, photo, className
    } = props;

   
   
  
    const [modal, setModal] = useState(false);
    // const [modalOne, setModalOne] = useState(false);

    const toggle = () => setModal(!modal);
    // const toggle1 = () =>  setModalOne(!modalOne); 

    var scale = 1;
   function zoomIn() {
        var myImg = document.getElementById("img");
        var currWidth = myImg.clientWidth;
        if(currWidth == 2500) return false;
         else{
           
            myImg.style.transform  = `scale(${scale+0.5})`;
            scale+= 1;
            
            
            
            
            
        } 

         
    } 
    function zoomOut() {
        var myImg = document.getElementById("img");
        var currWidth = myImg.clientWidth;
        if(currWidth == 2500) return false;
         else{
            myImg.style.transform = `scale(${scale-0.5})`;
            scale-=1;
        } 
        
         
    } 
    var degree = '90deg';
    function rotate() {
        // var myImg = document.getElementById("img");
       
        //     myImg.style.transform = `rotate(${degree})`;
        //     degree+=90;
        let newRotation = this.state.rotation + 45;
        if(newRotation >= 360){
          newRotation =- 360;
        }
      
          degree= newRotation
       
        

    }
    


    return (
        
        
        <>
        <div className="col-sm-4" >
          <figure onClick={toggle}>
            <img src={photo} alt="space image" />
          </figure>
        </div>
            
                    {/* <li data-toggle="modal" data-target="#assessment-popup" onClick={toggle}>
                        General Information Assessment
                        <i className="material-icons">chevron_right</i>
                    </li>
                   */}
           
      
            <Modal isOpen={modal} toggle={toggle} className={className}  centered ="true" size = "lg" zIndex="99999">
        <ModalHeader toggle={toggle}>  Gallery
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </ModalHeader>
                <ModalBody>
                    <div class="modal-body">
                      <div class="image-icon-options">
                        <i className="material-icons" onClick= {zoomOut}>zoom_out</i>
                        <i className="material-icons" onClick ={zoomIn}>zoom_in</i>
                        <i className="material-icons" onClick= {rotate}>cached</i>
                      </div>
                      <figure style={{overflow:'hidden'}}>
                      <img id="img"  src ={largeImage} />
                      </figure>
                     
                    </div>
                </ModalBody>

            </Modal>
          
        </>
    )
}

export default Photo;
