import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import React, {useState } from "react";
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'


function UserForm() {
    
    const usenavigate = useNavigate()

    const saveUser = ()=>{
        return usenavigate("/")
    }
    
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '', 
        telefone: '',
        opcao: '', 
        cidade: '',
        rua: '', 
        numero: '',
        bairro: '',
    });
    const [emailError, setEmailError] = useState('')
    const [generalError, setGeneralError] = useState('')
    const [buttonState, setButtonState] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const saveDataUser = async (form) => {
        setEmailError('');
        setGeneralError('');
        form.preventDefault()
    
        let donor = formData.opcao === "1" ? true : false

        const body = {
            "name": formData.nome,
            "email": formData.email,
            "password": formData.senha,
            "phone": formData.telefone,
            "adress": [
              {
                "city": formData.cidade,
                "street": formData.rua,
                "district": formData.bairro,
                "number": formData.numero
              }
            ],
            "donor": donor,
            "admin": false,
            "active": true
        }

        try{
            setButtonState(true)
            const response = await fetch("http://localhost:8000/create-user", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if(response.status == 201){
                setFormData({
                    nome: '',
                    email: '',
                    senha: '', 
                    telefone: '',
                    opcao: '', 
                    cidade: '',
                    rua: '', 
                    numero: '',
                    bairro: '',
                })
                saveUser()
            }else{
                const responseData = await response.json();
                if (response.status === 400) {
                    setEmailError(responseData.mensagem);
                } else {
                    setGeneralError('Algo deu errado, tente novamente.');
                }
            }
        }
        catch(e){
            setGeneralError('Algo deu errado, tente novamente.');
        }finally{
            setButtonState(false)
        }
    }
    
    return(
        <div >
            <Container>
            <Form onSubmit={saveDataUser}>
                <h1 className="text-muted">Cadastro de usuário usuário</h1>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control 
                        name="nome" value={FormData.nome} onChange={handleChange} 
                        type="text" placeholder="Insira seu nome" required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        name="email" value={FormData.email} onChange={handleChange} 
                        type="email" placeholder="Insira seu email" 
                        isInvalid={!!emailError} required
                    />
                    <Form.Control.Feedback type="invalid">
                        {emailError}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        Nunca compartilharemos seu e-mail com mais ninguém.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control 
                        name="senha" value={FormData.senha} onChange={handleChange} 
                        type="password" placeholder="Insira sua senha" required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control 
                        name="telefone" value={FormData.telefone} onChange={handleChange} 
                        type="text" placeholder="Insira seu telefone" required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Deseja se cadastrar como</Form.Label>
                    <Form.Select name="opcao" value={FormData.opcao} onChange={handleChange} required aria-label="Default select example">
                        <option value="1">Doador de óleo</option>
                        <option value="2">Coletaor de óleo</option>
                    </Form.Select>
                </Form.Group>

                {/* Dados relacionados ao endereço */}
                <br />
                <Row className="mb-3">
                    <Form.Group as={Col} md="5" controlId="validationCustom03">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control 
                            name="cidade" value={FormData.cidade} onChange={handleChange} 
                            type="text" placeholder="Cidade" required
                        />
                    </Form.Group>
                    
                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label>Rua</Form.Label>
                        <Form.Control 
                            name="rua" value={FormData.rua} onChange={handleChange} 
                            type="text" placeholder="Rua" required
                        />
                    </Form.Group>
                    
                    <Form.Group as={Col} md="1" controlId="validationCustom03">
                        <Form.Label>Número</Form.Label>
                        <Form.Control 
                            name="numero" value={FormData.numero} onChange={handleChange} 
                            type="text" placeholder="" required
                        />
                    </Form.Group>
                    
                    <Form.Group as={Col} md="2" controlId="validationCustom03">
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control 
                            name="bairro" value={FormData.bairro} onChange={handleChange} 
                            type="text" placeholder="Bairro" required
                        />
                    </Form.Group>
                </Row>
                {generalError && <p style={{ color: 'red' }}>{generalError}</p>}

                <Button type="submit" disabled={buttonState}>
                    {
                        buttonState ? 
                            <Spinner animation="border" role="status"></Spinner>
                        : <span>Enviar dados</span>
                    }
                </Button>
            </Form>
            </Container>
        </div>
    )
}

export default UserForm