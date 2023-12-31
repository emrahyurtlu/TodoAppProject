import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loadTodos } from '../slices/todo/load-todos-slice';
import CreateTodoItemModal from './CreateTodoItemModal';

const TodoListHeader = () => {
    const dispatcher = useDispatch<any>();
    const [showModal, setShowModal] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (query != null) {
            dispatcher(loadTodos(query))
        }
    }, [query]);

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
                    <div className="d-grid">
                        <Button onClick={newTodoOnClickHandler} data-cy="new-todo">
                            <FontAwesomeIcon icon={faPlusCircle} /> New Todo
                        </Button>
                    </div>

                </Col>
                <Col md="9">
                    <Form.Control name='search' placeholder='Type to search' value={query} onChange={e => setQuery(e.target.value)} />
                </Col>
            </Row>
            {showModal && <CreateTodoItemModal showModal={showModal} hideModal={hideModal} />}
        </React.Fragment>
    )
}

export default TodoListHeader
