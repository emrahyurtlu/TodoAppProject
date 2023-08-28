import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';

const App = () => {
  return (
    <div className="App">
      <Container>
        <Row className="justify-content-md-center">
          <Col>Col 1 of 4</Col>
          <Col>Col 2 of 4</Col>
          <Col>Col 3 of 4</Col>
          <Col>Col 4 of 4</Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
