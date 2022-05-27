import styled from 'styled-components';

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100vw;
    height: 100vh;
    padding: 70px;

    background-color: #E5E5E5;

    & > div:last-child {
        overflow-y: scroll;
    }
`;

export default Main;