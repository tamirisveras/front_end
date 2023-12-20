import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import Loading from '../loading/Loading';

const CardUSer = () => {
    const [userData, setUserData] = useState(null);

    const usenavigate = useNavigate()

    const LogUser = () => {
        localStorage.clear()
        return usenavigate("/login-user")
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const token = localStorage.getItem('accessToken')
                if(token){
                    const response = await fetch('http://localhost:8000/get-user',{
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    })
                    if (response.status == 200){
                        const userData = await response.json();
                        setUserData(userData);
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
        fetchUserData()
    }, [])


    return(            
        <div>
            {
                userData ? 
                    <Card>
                    <Card.Header>{userData.name}</Card.Header>
                        <Card.Body>
                            <Card.Title>Obrigada por fazer parte desse projeto</Card.Title>
                            <br/>
                            <Card.Text>
                                {
                                    userData.donor ?
                                        "Aproveite nossa plataforma para fazer suas doações."
                                    :
                                        "Aproveite nossa plataforma para coletar doações de óleo."
                                }
                            </Card.Text>
                            <br/>
                            {
                                userData.donor ?(
                                    <>
                                        <Button href='/list-my-donor' variant="primary">Minhas doações</Button>
                                        {" "}
                                        <Button href='/create-donor' variant="primary">Cadastrar doação</Button>
                                    </>
                                )
                                :(
                                    <>
                                        <Button href='/list-by-user' variant="primary">Minhas coletas</Button>
                                        {" "}
                                        <Button href='/list-all' variant="primary">Ver doações</Button>
                                        </>
                                )
                            }
                            
                        </Card.Body>
                        <br/>
                    </Card>
                    
                :
                    <Loading />       
            }
        </div>
    )
}

export default CardUSer;
