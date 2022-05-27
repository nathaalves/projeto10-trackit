import { Link, useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';
import axios from 'axios';
import React, { useState } from 'react';
import Button from './Button';
import SubText from './SubText';
import logo from '../assets/images/Logo.svg';
import { ThreeDots } from 'react-loader-spinner';

export default function RegisterPage () {

    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(true);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");

    function register (e) {

        e.preventDefault();
        setIsActive(false);

        const body = {
            email: email,
            name: name,
            image: image,
            password: password
        }

        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', body);
        
        promise
            .then( () => navigate("/") )
            .catch( err => {
                alert(err.response.data.message)
                setIsActive(true);
        })
    }

    return (
        <Container isActive={isActive}>
            <img src={logo} alt='logo'></img>
            <form onSubmit={register}>
                <input 
                    type='email' 
                    placeholder='email' 
                    onChange={ (e) => setEmail(e.target.value) } 
                    value={email}
                    disabled={!isActive}
                    required
                />
                <input 
                    type='password' 
                    placeholder='senha' 
                    onChange={ (e) => setPassword(e.target.value) } 
                    value={password}
                    disabled={!isActive}
                    required
                />
                <input 
                    type='text' 
                    placeholder='nome' 
                    onChange={ (e) => setName(e.target.value) } 
                    value={name}
                    disabled={!isActive}
                    required
                />
                <input 
                    type='url' 
                    placeholder='foto' 
                    onChange={ (e) => setImage(e.target.value) } 
                    value={image}
                    disabled={!isActive}
                    required
                />
                <Button type='submit' isActive={isActive}>
                    {isActive ? 'Cadastrar' : <ThreeDots color="#FFFFFF" height={15} width={60}  />}
                </Button>
            </form>
            <Link to='/'>
                <SubText>Já tem uma conta? Faça login!</SubText>
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