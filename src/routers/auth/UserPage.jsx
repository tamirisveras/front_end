import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardUSer from '../../components/cards/UserCards';

const UserPage = ()=>{
  return (
    <Container>
      <br />
      <Row className="mb-3">
        <CardUSer />
      </Row>
    </Container>
  )
}


export default UserPage
