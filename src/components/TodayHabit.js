import styled from 'styled-components';
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import checkmark from '../assets/images/checkmark.svg'
import requestTodayHabitsList from './requestHabitsList';

export default function TodayHabit ( { habit } ) {

    const { id, name, done, currentSequence, highestSequence} = habit;
    const { setProgress, todayHabits, setTodayHabits } = useContext(UserContext);
    const [credentials] = useState( JSON.parse(localStorage.getItem("credentials")))
    
    function markHabit (id, done) {

        const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

        const config = {
            headers: {
                "Authorization": `Bearer ${credentials.token}`
            }
        }

        let promise = {};
        
        if (done) {
            promise = axios.post(`${API}/${id}/uncheck`, null, config)

        } else {
            promise = axios.post(`${API}/${id}/check`, null, config)
        }
        promise
            .then( () => requestTodayHabitsList (setTodayHabits, setProgress) )
            .catch( err => alert(err.response.data.message) )
    }

    const progressColor = done ? '#8FC549' : '#666666';
    const recordColor = (currentSequence === highestSequence && highestSequence !== 0) ? '#8FC549' : '#666666';

    return (
        <Container done={done} >
            <div>
                <h2>{name}</h2>
                <h3>
                    {`Sequência atual: `}
                    <ProgressCount color={progressColor} >
                        {`${currentSequence} ${currentSequence > 1 ? "dias" : "dia"}`}
                    </ProgressCount>
                </h3>
                <h3>
                    {`Seu recorde: `}
                    <ProgressCount color={recordColor} >
                        {`${highestSequence} ${highestSequence > 1 ? "dias" : "dia"}`}
                    </ProgressCount>
                </h3>
            </div>
            <div onClick={ () => markHabit(id, done) } >
                <img 
                    src={checkmark} 
                    alt='checkmark' 
                />
            </div>
        </Container>
    )
}

const ProgressCount = styled.span`
    color: ${props => props.color};
`

const Container = styled.div`
    display: flex;
    width: calc(100vw - 40px);
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #FFFFFF;
    position: relative;

    h2 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #666666;

        margin-bottom: 8px;
    }

    h3 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 13px;
        line-height: 16px;
        color: #666666;
    }

    & > div:first-child {
        margin-right: auto;
    }

    & > div:last-child {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 70px;
        height: 70px;
        border: 1px solid #E7E7E7;
        border-radius: 5px;
        background-color: ${props => props.done ? '#8FC549' : '#EBEBEB'};

        cursor: pointer;
    }

    img {
        width: 35px;
        height: 28px;
    }
`;