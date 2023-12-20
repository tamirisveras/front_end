import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import Loading from '../loading/Loading';
import Spinner from 'react-bootstrap/Spinner'
import { format } from 'date-fns';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

const ListByUserCollections = () => {

    const usenavigate = useNavigate()

    const LogUser = ()=>{
        localStorage.clear()
        return usenavigate("/login-user")
    }

    const [dadosDaAPI, setDadosDaAPI] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buttonState, setButtonState] = useState(false)
    const [idState, SetidState] = useState(null)
    const [donorData, SetdonorData] = useState(null)
    const [generalError, setGeneralError] = useState('')
    const [statusItem, setstatusItem] = useState(false)

    const [showModal, setShowModal] = useState(false);
    const handleClose = () =>{
        setShowModal(false)
    } 


    const handleShow = async (index) => {
        if(await getDonorById(index) === true){
            setShowModal(true);
        } // Aguarde getDonorById ser concluído
        
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                setGeneralError('')
                const token = localStorage.getItem('accessToken')
                if(token){
                    const response = await fetch('http://localhost:8000/get-colections',{
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

    const getDonorById = async(index) => {
        try{
            setGeneralError('')
            SetidState(index);
            setButtonState(true)
            const token = localStorage.getItem('accessToken')
            if(dadosDaAPI[index].status){
                setstatusItem(true)
            }else{
                setstatusItem(false)
            }
            if(token){
                const response = await fetch(`http://localhost:8000/get-donor-id/${dadosDaAPI[index].donor}`,{
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                if (response.status == 200){
                    const data = await response.json()
                    SetdonorData(data)
                    return true
                }else if(response.status == 401){
                    LogUser()
                }
            }else{
                console.log("Token não encontrado")
                return LogUser()
            }

        }catch (e){
            setGeneralError('Algo deu errado, tente novamente.');
        }finally{
            setButtonState(false)
        }
    }

    const deleteColection = async () =>{
        try{
            setGeneralError('')
            setButtonState(true)
            const token = localStorage.getItem('accessToken')
            if(token){
                const response = await fetch(`http://localhost:8000/delete/oilcollection/${dadosDaAPI[idState]._id}`,{
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                if (response.status == 200){
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
        } catch(e) {
            console.log(e)
        } finally{
            handleClose()
            setButtonState(false)
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
                      Você não possui nenhuma coleta.
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
                                <Card.Text>Status: { item.status ?  <span className='text-success'>Finalizada</span>: <span className='text-danger'>Pendente</span>}</Card.Text>
                                <Button variant="primary" onClick={()=>{handleShow(index)}}>Detalhes</Button>
                            </Card.Body>
                        </Card>
                        <br />
                        <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Detalhes da coleta</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    donorData ?
                                    <p>
                                        <b>Situação do óleo:</b> {donorData.oil_situation}<br/>
                                        <b>Quantidade:</b> {donorData.amount} litros<br/>
                                        <b>Data de retirada:</b> {format(new Date(donorData.date), 'dd/MM/yyyy')}<br/>
                                    </p>
                                    :
                                        <Spinner animation="border" role="status">
                                        </Spinner>
                                }
                                
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} disabled={buttonState}>
                                Fechar
                            </Button>
                            
                            {
                                !statusItem && (
                                    
                                    <Button variant="danger" onClick={deleteColection} disabled={buttonState}>
                                        {buttonState ? <Spinner animation="border" role="status" /> : <span>Cancelar coleta</span>}
                                    </Button>
                                )
                            }
                            
                            </Modal.Footer>
                        </Modal>
                        </div>
                    ))
            )}
        </div>
    )
}

export default ListByUserCollections;
