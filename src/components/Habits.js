import axios from 'axios';
import styled from 'styled-components';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import lixeira from '../assets/images/lixeira.svg'
import requestTodayHabitsList from './requestTodayHabitsList';

export default function Habits ({ habitDays, habitName, habitId, requestHabitsList }) {
    
    const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const { setTodayHabits, setProgress } = useContext(UserContext);

    function deleteHabit (id) {

        const result = window.confirm('Você realmente deseja deletar esse hábito?');

        if (result) {

            const API = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

            const credentials = JSON.parse(localStorage.getItem('credentials'));

            const config = {
                headers: {
                    'Authorization': `Bearer ${credentials.token}`
                }
            };
            
            const promise = axios.delete(`${API}/${id}`, config);
    
            promise
                .then( () => {
                    requestHabitsList();
                    requestTodayHabitsList (setTodayHabits, setProgress);
                })
                .catch( err => alert(err.response.data.message));
        }
    }

    function renderDays (days) {
        return (
            days.map( (day, index) => {
                return (
                    <Day 
                        background={ habitDays.includes(index) }
                        key={index} 
                    >
                        { day }
                    </Day>
                )}
            )
        )
    }
 
    return (
        <Container>
            <HabitName>{ habitName }</HabitName>
            <WeekDays>
                { renderDays(days) }
            </WeekDays>
            <img src={lixeira} onClick={ () => deleteHabit(habitId) } alt=""/>
        </Container>
    )
}

const Container = styled.div`
    width: calc(100vw - 40px);
    padding: 16px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #FFFFFF;
    position: relative;

    img {
        width: 13px;
        height: 15px;

        position: absolute;
        top: 16px;
        right: 16px;

        cursor: pointer;
    }
`;

const HabitName = styled.h2`
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color: #666666;

    margin-bottom: 8px;
`;

const WeekDays = styled.div`
    display: flex;
`;

const Day = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 30px;
    height: 30px;
    margin-right: 4px;
    border: 1px solid ${props => props.background ? '#CFCFCF' : '#D5D5D5'};
    border-radius: 5px;
    background-color: ${props => props.background ? '#CFCFCF' : '#FFFFFF'};

    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 20px;
    color: ${props => props.background ? '#FFFFFF' : '#DBDBDB'};
`;