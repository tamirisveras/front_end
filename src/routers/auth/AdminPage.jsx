import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardUSerAdmin from '../../components/cards/CardUSerAdmin';

const AdminPage = ()=>{
  return (
    <Container>
      <br />
      <Row className="mb-3">
        <CardUSerAdmin />
      </Row>
    </Container>
  )
}


export default AdminPage
