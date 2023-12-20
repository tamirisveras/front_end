import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import Loading from '../loading/Loading';
import Spinner from 'react-bootstrap/Spinner'
import { format } from 'date-fns';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

const ListByUCollectionsActive = () => {

    const usenavigate = useNavigate()

    const LogUser = ()=>{
        localStorage.clear()
        return usenavigate("/admin-login")
    }

    const [dadosDaAPI, setDadosDaAPI] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buttonState, setButtonState] = useState(false)
    const [idState, setidState] = useState(null)
    const [donorData, SetdonorData] = useState(null)
    const [generalError, setGeneralError] = useState('')
    const [isMounted, setIsMounted] = useState(true);


    const [showModal, setShowModal] = useState(false);
    const handleClose = () =>{
        setShowModal(false)
    } 


    const handleShow = async (index) => {
        setidState(index)
        setShowModal(true);
         // Aguarde getDonorById ser concluído
        
    }
    
    useEffect(() => {
        const fetchData = async () => {
            setIsMounted(false);
            try{
                setGeneralError('')
                const token = localStorage.getItem('accessToken')
                if(token){
                    const response = await fetch('http://localhost:8000/get-colections-active',{
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
                setGeneralError('Algo deu errado, tente novamente.');
            }
        }
        fetchData()
    }, [])

    const updateStatusCollection = async (index) => {
        console.log(idState)
        try{
            setGeneralError('')
            setButtonState(true)
            const token = localStorage.getItem('accessToken')
            if(token){
                const response = await fetch(`http://localhost:8000/oilcollection/${dadosDaAPI[idState]._id}/status`, {
                    method: 'PUT', 
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: true }),
                })
                if(response.status == 200){
                    const listaAux = [...dadosDaAPI]
                    listaAux.splice(idState, 1)
                    setDadosDaAPI(listaAux)
                }else if(response.status == 401){
                    LogUser()
                }
            }else{
                console.log("Token não encontrado")
                return LogUser()
            }
        }catch(e){
            console.log("Erro")
            console.log(e)
        }finally{
            handleClose();
           setButtonState(false);
            
        }
    }

    return( 
        <div>
            {generalError && <p style={{ color: 'red' }}>{generalError}</p>}
            {
                loading ? 
                    <Loading />       
                :dadosDaAPI.length === 0 ? (
                    <div>
                    <Alert variant="info">
                      Não há nenuma coleta agendada no sistema.
                    </Alert>
                      <img src="/src/assets/images/vazio.png" alt="Empty List" style={{ maxWidth: '100%', marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}  />
                    </div>
                  ):(
                    dadosDaAPI.map((item, index) =>(
                        <div key={index}>
                        <Card>
                            <Card.Header as="h5">Coleta agendada</Card.Header>
                            <Card.Body>
                                <Card.Title>Coleta: {index+1}</Card.Title>
                                <Card.Text>Data de criaçao: {format(new Date(item.create_at), 'dd/MM/yyyy')}</Card.Text>
                                <Card.Text>Coletor: {item.user.name}</Card.Text>
                                <Card.Text>Quantidade: {item.donor.amount} litros</Card.Text>
                                <Card.Text>Data de retirada: {format(new Date(item.donor.date), 'dd/MM/yyyy')}</Card.Text>
                                <Button variant="primary" onClick={()=>{handleShow(index)}}>Finalizar</Button>
                            </Card.Body>
                        </Card>
                        <br />
                        <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Finalizar coleta coleta</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <b>Você realmente deseja finalizar esta coleta</b><br/>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} disabled={buttonState}>
                                Fechar
                            </Button>        
                            <Button variant="success" onClick={()=>updateStatusCollection(index)} disabled={buttonState}>
                                {buttonState ? <Spinner animation="border" role="status" /> : <span>Confirmar</span>}
                            </Button>
                            
                            </Modal.Footer>
                        </Modal>
                        </div>
                    ))
            )}
        </div>
    )
}

export default ListByUCollectionsActive;
