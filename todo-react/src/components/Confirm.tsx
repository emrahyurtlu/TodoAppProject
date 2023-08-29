import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const Confirm: React.FC<{ message: string, confirmationFunc: () => void; show: boolean, onHide: () => void; }> = (props) => {

    const yesButtonOnClickHandler = () => {
        props.confirmationFunc();
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={yesButtonOnClickHandler}>Yes</Button>
                <Button variant='danger' onClick={props.onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Confirm
