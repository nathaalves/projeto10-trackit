import styled from 'styled-components';
import logo from '../assets/images/logo-name.svg';

export default function Header ( { image } ) {
    return (
        <Container>
            <img src={logo} alt="logo"/>
            <img src={image} alt='profile'/>
        </Container>
    )
}

const Container = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100vw;
    height: 70px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    background-color: #126BA5;

    position: fixed;
    top: 0;

    img {
        height: 50px;
        margin: 0 20px;
    }

    img:first-child {
        width: 100px;
    }

    img:last-child {
        width: 50px;
        border-radius: 50%;
    }

`
