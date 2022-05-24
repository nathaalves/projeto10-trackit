import styled from 'styled-components';

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 300px;
    height: 45px;
    border-radius: 5px;
    margin-bottom: 25px;
    opacity: ${props => props.isActive ? 1 : 0.7};
    background-color: #52B6FF;

    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    color: #FFFFFF;

    cursor: pointer;
`;

export default Button;