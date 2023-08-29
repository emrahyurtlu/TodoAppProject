import axios from 'axios';
import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loadTodos } from '../slices/todo/load-todos-slice';
import Endpoints from '../utils/endpoints'



const CreateTodoItemModal: React.FC<{ showModal: boolean; hideModal: () => void }> = (props) => {
    const dispatcher = useDispatch<any>();
    const formRef = useRef<HTMLFormElement>();

    const { register, handleSubmit, formState: { errors } } = useForm();


    const createButtonOnClickHandler = () => formRef.current?.requestSubmit();

    const onSubmit = (data) => {

        axios.post(Endpoints.Todos, data)
            .then(result => {
                toast.success(result.data);
                dispatcher(loadTodos(null))
            }).catch(reason => {
                toast.error(reason)
            })

        props.hideModal()
    }

    return (
        <Modal show={props.showModal} onHide={props.hideModal}>
            <Modal.Header>
                <Modal.Title>
                    Create New Todo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
                    <Form.Group controlId='title' className='mb-2'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control placeholder='Please enter title' {...register("title", { required: "Title field cannot be empty", })} aria-invalid={errors.title ? "true" : "false"} />
                        {errors.title && <span className="text-danger">{errors.title?.message.toString()}</span>}
                    </Form.Group>
                    <Form.Group controlId='description' className='mb-2'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" placeholder='Please enter description' {...register("description", { required: "Description field cannot be empty" })} aria-invalid={errors.description ? "true" : "false"} />
                        {errors.description && <span className="text-danger">{errors.description?.message.toString()}</span>}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type='submit' onClick={createButtonOnClickHandler}>
                    Create
                </Button>
                <Button variant="secondary" onClick={props.hideModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateTodoItemModal
