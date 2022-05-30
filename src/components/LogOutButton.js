import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function LogOutButton () {

    const navigate = useNavigate();

    function doLogOut () {
        localStorage.removeItem('credentials');
        localStorage.removeItem('formInformation');
        navigate('/');
    }

    return (
        <>
            <Container>
                <Button onClick={doLogOut} >Logout</Button>
            </Container>
        </>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100px;
    height: 65px;
    border-radius: 5px;
    background-color: #FFFFFF;

    position: fixed;
    top: 75px;
    right: 20px;
`;

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
    height: 45px;
    border-radius: 5px;
    background-color: #52B6FF;

    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    color: #FFFFFF;

    cursor: pointer;
`;