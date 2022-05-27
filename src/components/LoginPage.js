import { Link, useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import UserContext from "../contexts/UserContext";
import Button from './Button';
import SubText from './SubText';
import logo from '../assets/images/Logo.svg';
import { ThreeDots } from 'react-loader-spinner';

//import { useContext } from "react";
//import UserContext from "../contexts/UserContext";
//const { pro } = useContext(UserContext);

export default function LoginPage () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();

    function login (e) {

        e.preventDefault();
        setIsActive(false);

        const body = {
            email,
            password
        };

        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', body);

        promise
            .then( response => {
                const { data } = response;
                localStorage.setItem("credentials", JSON.stringify(data));
                navigate('/habitos')
            })
            .catch ( err => {
                alert(err.response.data.message)
                setIsActive(true);
            })
    }

    return (
        <Container isActive={isActive}>
            <img src={logo} alt='logo'></img>
            <form onSubmit={login}>
                <input 
                    type='email' 
                    placeholder='Email' 
                    onChange={ (e) => setEmail(e.target.value) } 
                    value={email}
                    disabled={!isActive}
                    required
                />
                <input 
                    type='password' 
                    placeholder='Senha' 
                    onChange={ (e) => setPassword(e.target.value) } 
                    value={password}
                    disabled={!isActive}
                    required
                />
                <Button type='submit' isActive={isActive}>
                    {isActive ? 'Entrar' : <ThreeDots color="#FFFFFF" height={15} width={60}  />}
                </Button>
            </form>
            <Link to='/cadastro'>
                <SubText>Não tem uma conta? Cadastre-se!</SubText>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    width: 100vw;
    height: 100vh;
    
    img {
        width: 180px;
        height: 180px;
        margin-top: 70px;
        margin-bottom: 30px;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    input {
        width: 300px;
        height: 45px;
        padding-left: 10px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        background-color: ${ props => props.isActive ? '#FFFFFF' : '#F2F2F2'};

        margin-bottom: 5px;

        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 20px;
        color: ${ props => props.isActive ? '#666666' : '#AFAFAF'};
    }

    input::placeholder {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 20px;
        color: ${ props => props.isActive ? '#DBDBDB' : '#AFAFAF'};
    }
`;