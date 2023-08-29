import { useEffect } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TodoListHeader from './components/TodoListHeader';
import RequestStatus from './models/RequestStatus';
import TodoModel from './models/TodoModel';
import { loadTodos, todosSelector, todosStatusSelector } from './slices/todo/load-todos-slice';
import TodoItem from './components/TodoItem';


const App = () => {
  const dispatcher = useDispatch();
  const todos: Array<TodoModel> = useSelector(todosSelector);
  const status = useSelector(todosStatusSelector)

  useEffect(() => {

    if (status == RequestStatus.Idle) {
      dispatcher(loadTodos(null));
    }

  }, []);

  return (
    <Container>
      <Row>
        <Col md="8" className='offset-md-2'>
          <Card bg='light' className='mt-3'>
            <Card.Header>
              <Card.Title>Todo Items</Card.Title>
            </Card.Header>
            <Card.Body>
              <Container>
                <TodoListHeader />
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
                <Row className='bg-white p-2 rounded border'>
                  <Col md="12">
                    <h4>Todos</h4>
                  </Col>
                  <Col md="12">
                    {status == RequestStatus.Pending && <Spinner variant='primary' />}
                    {status == RequestStatus.Fulfilled && todos.length > 0 && todos.map(todoItem => <TodoItem key={todoItem.todoItemId} todoItem={todoItem} />)}
                    {status == RequestStatus.Fulfilled && todos.length == 0 && <h5 className='text-danger'>No records found.</h5>}
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>

        </Col>
      </Row>
    </Container>
  )
}

export default App
