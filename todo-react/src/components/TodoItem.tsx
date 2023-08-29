import { faCircleCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'
import TodoItemModel from '../models/TodoModel'

const TodoItem: React.FC<{ todoItem: TodoItemModel }> = ({ todoItem }) => {
    const deleteButtonOnClickHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        alert("Clicked delete button")
    }

    const doneButtonOnClickHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        alert("Clicked done button")
    }

    return (
        <div className='d-flex justify-content-between align-items-center shadow-sm p-2 mb-1 bg-white'>
            <div>
                <h5 className='mb-0'>{todoItem.Title}</h5>
                <p className='mb-1'>{todoItem.Description}</p>
                <div className='text-secondary'><small>Created at: {todoItem.CreatedAt.toUTCString()}</small> - {todoItem.UpdatedAt && <small>Updated at: {todoItem.UpdatedAt.toUTCString()}</small>}</div>
            </div>
            <div className='d-flex justify-content-end gap-2'>
                <Button variant='danger' size='sm' onClick={deleteButtonOnClickHandler}>
                    <FontAwesomeIcon icon={faTrashCan} /> Delete
                </Button>
                <Button variant='success' size='sm' onClick={doneButtonOnClickHandler}>
                    <FontAwesomeIcon icon={faCircleCheck} /> Done
                </Button>
            </div>
        </div>
    )
}

export default TodoItem
