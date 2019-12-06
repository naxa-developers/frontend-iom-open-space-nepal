import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Question from './Question';

const AssementList = (props) => {
    const {
        className

    } = props;
    const {
        question_data 
    } = props;

   
  
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);



    return (
        
        
        <>
            <div className="assessment-list">
                <ul>
                    <li data-toggle="modal" data-target="#assessment-popup" onClick={toggle}>
                        General Information Assessment
                        <i className="material-icons">chevron_right</i>
                    </li>
                    <li data-toggle="modal" data-target="#assessment-popup" onClick={toggle}>
                        Environment Assessment
                        <i className="material-icons">chevron_right</i>
                    </li>
                </ul>

            </div>
      
            <Modal isOpen={modal} toggle={toggle} className={className}  centered ="true" size = "lg" zIndex="99999">
        <ModalHeader toggle={toggle}>General Information Assessment
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </ModalHeader>
                <ModalBody>
                    <div class="modal-body">
                        <ul class="assessment-modal-list">
                            
                               <Question question_data= {question_data}/>
                            
                            
                           
                        </ul>
                    </div>
                </ModalBody>

            </Modal>
        </>
    )
}

export default AssementList;
