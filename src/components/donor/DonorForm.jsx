import React, {useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

function DonorForm() {

    const usenavigate = useNavigate()

    const LogUser = ()=>{
        localStorage.clear()
        return usenavigate("/login-user")
    }

    const [formData, setFormData] = useState(
        {
            "oil_situation": "",
            "amount": "",
            "date": "",
            "status": true
        }
    )
    const [generalError, setGeneralError] = useState('')
    const [buttonState, setButtonState] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const saveDataDonor =  async (form)=>{
        setGeneralError('')
        form.preventDefault()
        let body = {
            "oil_situation": formData.oil_situation,
            "amount": formData.amount,
            "date": formData.date,
            "status": true
        }
        const token = localStorage.getItem("accessToken")
        if(!token){
            LogUser()
        }
        try{
            setButtonState(true)
            const response =  await fetch("http://localhost:8000/create-donor",{
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            if(response.status == 201){
                setFormData({
                    "oil_situation": "",
                    "amount": "",
                    "date": "",
                    "status": true
                })
            }else if (response.status == 401){
                LogUser()
            }else{
                setGeneralError("Algo deu errado, tente novamente")
            }
        }catch(e){
            setGeneralError("Algo deu errado, tente novamente")
        }finally{
            setButtonState(false)
        }
    }

    return (
        <div>
            <Container>
                <Form onSubmit={saveDataDonor}>
                    <h1 className="text-muted">Cadastro de doação de óleo</h1>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="5" controlId="validationCustom03">
                            <Form.Label>Situação do óleo</Form.Label>
                            <Form.Control 
                                name="oil_situation" value={formData.oil_situation} onChange={handleChange} 
                                type="text" placeholder="Situação do óleo" required
                            />
                        </Form.Group>
                        
                        <Form.Group as={Col} md="4" controlId="validationCustom03">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control 
                                name="amount" value={formData.amount} onChange={handleChange} 
                                type="number" placeholder="0" required
                            />
                        </Form.Group>
                        
                        <Form.Group as={Col} md="3" controlId="validationCustom03">
                            <Form.Label>Data de retirada</Form.Label>
                            <Form.Control 
                                name="date" value={formData.date} onChange={handleChange} 
                                type="date" placeholder="" required
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

export default DonorForm