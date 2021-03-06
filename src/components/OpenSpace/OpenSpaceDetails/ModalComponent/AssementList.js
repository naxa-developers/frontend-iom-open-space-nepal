import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Question from './Question';

const AssementList = (props) => {
   
    const {
      
      className, question_data ,
      title,  total_area, usable_area, capacity, municipality, ownership, special_feature,province, ward, 
        access, elevation
    } = props;

   
  
    const [modal, setModal] = useState(false);
    const [modalOne, setModalOne] = useState(false);

    const toggle = () => setModal(!modal);
    const toggle1 = () =>  setModalOne(!modalOne); 
    


    return (
             
        <>
            <div className="assessment-list">
                <ul>
                    <li data-toggle="modal" data-target="#assessment-popup" onClick={toggle}>
                    VIEW ALL ATTRIBUTES DATA
                        <i className="material-icons">chevron_right</i>
                    </li>
                    <li data-toggle="modal" data-target="#assessment-popup" onClick={toggle1}>
                    Environmental Checklist
                        <i className="material-icons">chevron_right</i>
                    </li>
                </ul>

            </div>
      
            <Modal isOpen={modalOne} toggle={toggle1} className={className}  centered ="true" size = "lg" zIndex="99999">
        <ModalHeader toggle={toggle1}>Environmental Checklist
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
            <Modal isOpen={modal} toggle={toggle} className={className}  centered ="true" size = "lg" zIndex="99999">
        <ModalHeader toggle={toggle}>General Information Assessment
        <button type="button" class="close" data-dismiss="modalOne" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </ModalHeader>
                <ModalBody>
                    <div class="modal-body">
                    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">SN</th>
      <th scope="col">Title</th>
      <th scope="col">Value</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Name of Open Space</td>
    <td>{title}</td>
     
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Province</td>
    <td>{province}</td>
     
    </tr>
    {/* <tr>
      <th scope="row">3</th>
      <td>Municipality</td>
    <td>{municipality}</td>
     
    </tr> */}
    {/* <tr>
      <th scope="row">3</th>
      <td>Ward</td>
    <td>{ward}</td>
     
    </tr> */}
    <tr>
      <th scope="row">3</th>
      <td>Municipality</td>
    <td>{municipality}</td>
     
    </tr>
    
    <tr>
      <th scope="row">4</th>
      <td>Capacity</td>
    <td>{capacity}</td>
     
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>Total Area</td>
    <td>{total_area} <span>m<sup>2</sup></span></td>
      
    </tr>

    <tr>
      <th scope="row">6</th>
      <td>Usable Area</td>
    <td>{usable_area} <span>m<sup>2</sup></span></td>
      
    </tr>
   
    <tr>
      <th scope="row">7</th>
      <td>Ownership</td>
<td>{ownership}</td>
      
    </tr>

    <tr>
      <th scope="row">8</th>
      <td>Special Features</td>
    <td>{special_feature ? ( 
     <span>{special_feature}.</span>
      ) : 'N/A'}</td>
      
    </tr>
    <tr>
      <th scope="row">9</th>
      <td>Access to Site</td>
    <td>{access}</td>
      
    </tr>
    <tr>
      <th scope="row">10</th>
      <td>Elevation</td>
    <td>{elevation} m</td>
      
    </tr>


  </tbody>
</table>
                    </div>
                </ModalBody>

            </Modal>
        </>
    )
}

export default AssementList;
