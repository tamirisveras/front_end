import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {

  const usenavigate = useNavigate()

  const LogUser = ()=>{
      return usenavigate("/user-page")
  }
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dadosErrados, setdadosErrados] = useState('')
  const [buttonState, setButtonState] = useState(false)

  const handleSubmit = async(form) => {
    setdadosErrados("")
    form.preventDefault()

    let body = {
      "email": email,
      "password": password
    }

    try{
      setButtonState(true)
      const response = await fetch("http://localhost:8000/login-user", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
      });
      let data = await response.json()
      if(response.status == 200){
        localStorage.setItem("accessToken", data['accessToken'])
        localStorage.setItem("refreshToken", data['refreshToken'])
        LogUser()
      }else if(response.status == 401){
        setdadosErrados(data['mensagem'])
      }else{
        setdadosErrados(data['Algo deu errado, tente novamnete'])
      }
    }catch(e){
      setdadosErrados(data['Algo deu errado, tente novamnete'])
    }finally{
      setButtonState(false)
    }

  }

  return (
    <Container>
    <Form onSubmit={handleSubmit}>
      
      <h1 className="text-muted">Autenticação de usuário</h1>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      
      {dadosErrados && <p style={{ color: 'red' }}>{dadosErrados}</p>}

      <Button variant="primary" type="submit" disabled={buttonState}>
        {
          buttonState ? 
            <Spinner animation="border" role="status">
            </Spinner>
          : <span>Enviar dados</span>
        }
      </Button>
    </Form>
    <br />
    </Container>
  );
};

export default LoginForm;
