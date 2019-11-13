import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const AssementList = (props) => {
    const {
        className

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
                        General Environment Assessment
                        <i className="material-icons">chevron_right</i>
                    </li>
                </ul>

            </div>

            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>General Information Assessment
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </ModalHeader>
                <ModalBody>
                    <div class="modal-body">
                        <ul class="assessment-modal-list">
                            <li>
                                <span>Is it a protected area?</span>
                                <i class="material-icons check">check_circle</i>
                            </li>
                            <li>
                                <span>Is it a buffer zone of protected
                                                area?</span>
                                <i class="material-icons cross">cancel</i>
                            </li>
                            <li>
                                <span>Is it a cultural heritage Site?
                                            </span>
                                <i class="material-icons cross">cancel</i>
                            </li>
                            <li>
                                <span>Densely populated area? </span>
                                <i class="material-icons check">check_circle</i>
                            </li>
                            <li>
                                <span>Special area for protection of
                                    biodiversity

                                            </span>
                                <i class="material-icons cross">cancel</i>
                            </li>
                        </ul>
                    </div>
                </ModalBody>

            </Modal>
        </>
    )
}

export default AssementList;
