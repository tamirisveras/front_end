import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import Loading from '../loading/Loading';

const CardUserAdmin = () => {
    const [userData, setUserData] = useState(null);

    const usenavigate = useNavigate()

    const LogUser = () => {
        localStorage.clear()
        return usenavigate("/admin-login")
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
                        if(userData && !userData.admin){
                            LogUser()
                        }
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
                    {
                        userData.admin ?
                        <>
                            <Card.Header>{userData.name}</Card.Header>
                            <Card.Body>
                                <Card.Title>Obrigada por colaborar nesse projeto</Card.Title>
                                <Card.Text>Aqui você pode validar as agendas pendentes no sistema.</Card.Text>
                                <Button href='/collections-active' variant="primary">Coletas Pendentes</Button>
                            </Card.Body>
                        </>
                        :
                        <h1>Não autorizado!</h1>
                    }
                    
                    </Card>
                :
                <Loading /> 
            }
            
        </div>
    )
}

export default CardUserAdmin;
