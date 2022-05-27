import styled from 'styled-components';

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100vw;
    padding: 0 20px;
    margin: 30px 0;

    h2 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
    }

    h3 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #8FC549;
    }
    
    button {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 40px;
        height: 35px;

        border-radius: 4.63636px;
        background-color: #52B6FF;

        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 28px;
        color: #FFFFFF;

        cursor: pointer;
    }
`;

export default Title;