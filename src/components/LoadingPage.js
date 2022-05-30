import styled from 'styled-components';
import Menu from "./Menu"
import { Circles } from 'react-loader-spinner';

export default function LoadingPage () {

    return (
        <>
            <Main>
                <Circles color="#52B6FF" height={100} width={100}/>
            </Main>
            <Menu />
        </>
    )
}

const Main = styled.main`
    margin-top: 100px;
`