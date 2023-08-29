import { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TodoListHeader from './components/TodoListHeader';
import RequestStatus from './models/RequestStatus';
import { loadTodos, todosSelector, todosStatusSelector } from './slices/todo/load-todos-slice';
import TodoModel from './models/TodoModel';

const App = () => {
  //const [todoItem, setTodoItem] = useState<TodoModel>({ Title: "Test Todo Element", Description: "My test description.", TodoItemId: "xsdg-fghjfghj-asfd", State: TodoState.Todo, CreatedAt: new Date(), UpdatedAt: new Date() });
  const dispatcher = useDispatch();
  const todos = useSelector<Array<TodoModel>>(todosSelector);
  console.log("todos: ", todos);
  const status = useSelector(todosStatusSelector)
  console.log("status: ", status)

  useEffect(() => {
    if (status == RequestStatus.Idle) {
      dispatcher(loadTodos());
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
                    {/* <TodoItem todoItem={todoItem} />
                    <TodoItem todoItem={todoItem} />
                    <TodoItem todoItem={todoItem} />
                    <TodoItem todoItem={todoItem} />
                    <TodoItem todoItem={todoItem} />
                    <TodoItem todoItem={todoItem} /> */}
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
