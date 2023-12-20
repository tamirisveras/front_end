import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import Loading from '../loading/Loading';
import Spinner from 'react-bootstrap/Spinner'
import { format } from 'date-fns';
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'


const ListAllDonors = () => {
    
    const [dadosDaAPI, setDadosDaAPI] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buttonState, setButtonState] = useState(false)
    const [idState, SetidState] = useState(null)

    const [showModal, setShowModal] = useState(false);
    const handleClose = () =>{
        setShowModal(false)
    } 

    function handleShow(index){
        SetidState(null)
        setShowModal(true)
        SetidState(index)
    }

    const usenavigate = useNavigate()

    const LogUser = ()=>{
        localStorage.clear()
        return usenavigate("/login-user")
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const token = localStorage.getItem('accessToken')
                if(token){
                    const response = await fetch('http://localhost:8000/get-all-donors',{
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    })
                    if (response.status == 200){
                        const data = await response.json();
                        setDadosDaAPI(data);
                        setLoading(false);
                    }else if(response.status == 401){
                        LogUser()
                    }
                }else{
                    console.log("Token não encontrado")
                    return LogUser()
                }
            }catch (e){
                console.log("Erro da obtenção do usuário")
            }
        }
        fetchData()
    }, [])

    const createColection = async() => {
        let body = {
            "donor": dadosDaAPI[idState]._id,
            "status": false
        }
        try{
            setButtonState(true)
            const token = localStorage.getItem('accessToken')
            const response = await fetch("http://localhost:8000/oilcollection",{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
            if(response.status == 201){
                let data = await response.json()
                console.log(data)
                const listaAux = [...dadosDaAPI]
                listaAux.splice(idState, 1)
                setDadosDaAPI(listaAux)
            }
        }catch(e){
            console.log(e)
        }finally{
            setButtonState(false)
            setShowModal(false)
        }
    }

    return(            
        <div>
            {
                loading ? 
                    <Loading />       
                :dadosDaAPI.length === 0 ? (
                    <div>
                    <Alert variant="info">
                      Não há doações disponíveis.
                    </Alert>
                      <img src="/src/assets/images/vazio.png" alt="Empty List" style={{ maxWidth: '100%', marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}  />
                    </div>
                  ) : (
                    dadosDaAPI.map((item, index) =>(
                        <div key={index}>
                            <Card>
                            <Card.Header as="h5">Doação ativa</Card.Header>
                            <Card.Body>
                                <Card.Title>Quantidade: {item.amount} litros</Card.Title>
                                <Card.Text>Situação: {item.oil_situation}</Card.Text>
                                <Card.Text>Data de retirada: {format(new Date(item.date), 'dd/MM/yyyy')}</Card.Text>
                                <Button variant="primary" onClick={()=>{handleShow(index)}}>Agendar coleta</Button>
                            </Card.Body>
                        </Card>
                        <br />
                        <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Confirmação de Agendamento</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            Tem certeza de que deseja realizar esta coleta?
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} disabled={buttonState}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={createColection} disabled={buttonState}>
                                {
                                    buttonState ? 
                                        <Spinner animation="border" role="status">
                                        </Spinner>
                                    : <span>Confirmar Agendamento</span>
                                }
                            </Button>
                            </Modal.Footer>
                        </Modal>
                        </div>
                        
                    ))
            )}
        </div>
    )
}

export default ListAllDonors;
