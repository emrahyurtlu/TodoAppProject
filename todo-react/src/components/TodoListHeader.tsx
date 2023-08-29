import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import CreateTodoItemModal from './CreateTodoItemModal';

const TodoListHeader = () => {
    const [showModal, setShowModal] = useState(false);

    const newTodoOnClickHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        setShowModal(true);
    }

    const hideModal = () => {
        setShowModal(false);
    }

    return (
        <React.Fragment>
            <Row className='bg-white p-2 rounded border'>
                <Col md="3">
                    <Button onClick={newTodoOnClickHandler}>
                        <FontAwesomeIcon icon={faPlusCircle} /> New Todo
                    </Button>
                </Col>
                <Col md="9">
                    <Form.Control name='search' placeholder='Type to search' />
                </Col>
            </Row>
            {showModal && <CreateTodoItemModal showModal={showModal} hideModal={hideModal} />}
        </React.Fragment>
    )
}

export default TodoListHeader
