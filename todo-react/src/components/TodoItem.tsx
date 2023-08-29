import { faCircleCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import TodoItemModel from '../models/TodoModel'
import Confirm from './Confirm'
import axios from 'axios'
import { toast } from 'react-hot-toast/headless'
import TodoState from '../models/TodoState'
import { useDispatch } from 'react-redux'
import { loadTodos } from '../slices/todo/load-todos-slice'

const TodoItem: React.FC<{ todoItem: TodoItemModel }> = ({ todoItem }) => {
    const dispatcher = useDispatch<any>();

    const [confirmForDelete, setConfirmForDelete] = useState(false);
    const [confirmForDone, setConfirmForDone] = useState(false);

    const deleteTodo = () => {
        setConfirmForDelete(false);
        axios.delete(`http://localhost:5108/api/todoitems/${ todoItem.todoItemId }`)
            .then(result => {
                console.log("result: ", result.data)
                toast.success(result.data)
                dispatcher(loadTodos({ state: TodoState.Todo, query: "" }))
            }).catch(reason => {
                console.log(reason.response.data)
                toast.error(reason.response.data)
            });
    }

    const doneTodo = () => {
        setConfirmForDelete(false);

        const updatedTodo = { ...todoItem, ...{ state: TodoState.Done } }

        axios.put("http://localhost:5108/api/todoitems", updatedTodo)
            .then(result => {
                console.log("result: ", result.data)
                toast.success(result.data)
                dispatcher(loadTodos({ state: TodoState.Todo, query: "" }))
            }).catch(reason => {
                console.log(reason.response.data)
                toast.error(reason.response.data)
            });
    }

    return (
        <React.Fragment>
            <div className='d-flex justify-content-between align-items-center shadow-sm p-2 mb-1 bg-white'>
                <div>
                    <h5 className='mb-0'>{todoItem.title}</h5>
                    <p className='mb-1'>{todoItem.description}</p>
                    <div className='text-secondary'><small>Created at: {todoItem.createdAt}</small> - {todoItem.updatedAt && <small>Updated at: {todoItem.updatedAt}</small>}</div>
                </div>
                <div className='d-flex justify-content-end gap-2'>
                    <Button variant='danger' size='sm' onClick={() => setConfirmForDelete(true)}>
                        <FontAwesomeIcon icon={faTrashCan} /> Delete
                    </Button>
                    <Button variant='success' size='sm' onClick={() => setConfirmForDone(true)}>
                        <FontAwesomeIcon icon={faCircleCheck} /> Done
                    </Button>
                </div>
            </div>
            {confirmForDelete && <Confirm
                message='Are you sure you want to delete this todo?'
                show={confirmForDelete}
                confirmationFunc={deleteTodo}
                onHide={() => setConfirmForDelete(false)} />}

            {confirmForDone && <Confirm
                message='Are you sure you want to delete this todo?'
                show={confirmForDone}
                confirmationFunc={doneTodo}
                onHide={() => setConfirmForDone(false)} />}
        </React.Fragment>
    )
}

export default TodoItem
