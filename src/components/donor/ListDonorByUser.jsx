import React, { useState, useEffect } from 'react'
import Loading from '../loading/Loading'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'


const ListDonorByUser = () => {

    const usenavigate = useNavigate()

    const LogUser = ()=>{
        localStorage.clear()
        return usenavigate("/login-user")
    }

    const [dadosDaAPI, setDadosDaAPI] = useState([])
    const [loading, setLoading] = useState(true)
    const [buttonState, setButtonState] = useState(false)
    const [idState, setidState] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [generalError, setGeneralError] = useState('')
    const handleClose = () =>{
        setShowModal(false)
    } 
    const handleShow = async (index) => {
        setidState(index)
        setShowModal(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const token = localStorage.getItem("accessToken")
                if(token){
                    const response = await fetch('http://localhost:8000/get-donors',{
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    })
                    if (response.status == 200){
                        const data = await response.json()
                        setDadosDaAPI(data)
                    }else if(response.status == 401){
                        LogUser()
                    }
                }else{
                    console.log("Token não encontrado")
                    return LogUser()
                }
            }catch(e){
                console.log("algo deu errrado")
            }finally{
                setLoading(false);
            }
            
        }
        fetchData()
    }, [])

    const deleteMydonor = async () =>{
        try{
            setGeneralError('')
            setButtonState(true)
            const token = localStorage.getItem('accessToken')
            if(token){
                const response = await fetch(`http://localhost:8000/delete-donor/${dadosDaAPI[idState]._id}`,{
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
                }else if(response.status == 400){
                    let data = await response.json()
                    setGeneralError(data.message)
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
                      Você não fez nenhuma doação ainda.
                    </Alert>
                      <img src="/src/assets/images/vazio.png" alt="Empty List" style={{ maxWidth: '100%', marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}  />
                    </div>
                  ) : (
                dadosDaAPI.map((item, index) => (
                    <div key={index}>
                        <Card>
                            <Card.Header as="h5">Coleta agendada</Card.Header>
                            <Card.Body>
                                <Card.Title>Situação do óleo: {item.oil_situation}</Card.Title>
                                <Card.Title>Quantidade: {item.amount} litros</Card.Title>
                                <Card.Title>Data de retirada: {format(new Date(item.date), 'dd/MM/yyyy')}</Card.Title>
                                <Card.Title>Status: { item.status ? <>Disponível</>:<>Agendada</>} </Card.Title>
                                {
                                    item.status 
                                    ?
                                    <Button variant="danger" onClick={()=>{handleShow(index)}}>Excluir</Button>
                                    : 
                                    <span>Esta doação não pode ser excluída</span>
                                }

                            </Card.Body>
                        </Card>
                        <br />
                        <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Confirmação</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p className="text-danger">
                                     Você realmente deseja apagar esta doação?
                                </p>                                
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} disabled={buttonState}>
                                Fechar
                            </Button>
                            <Button variant="danger" onClick={deleteMydonor} disabled={buttonState}>
                                {
                                    buttonState ?
                                        <Spinner animation="border" role="status">
                                        </Spinner> 
                                    :
                                        <span>Sim, desejo excluir</span>
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

export default ListDonorByUser