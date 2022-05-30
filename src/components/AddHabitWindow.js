import axios from 'axios';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import { useState, useContext, useEffect } from "react";
import UserContext from '../contexts/UserContext';
import requestTodayHabitsList from './requestTodayHabitsList';


export default function AddHabitWindow ( { setIsVisible, requestHabitsList } ) {

    const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const { setTodayHabits, setProgress } = useContext(UserContext);
    const [isActive, setIsActive] = useState(true);
    const [habitName, setHabitName] = useState('')
    const [habitDays, setHabitDays] = useState([])

    useEffect ( () => {
        if (localStorage.getItem('formInformation') !== null) {
            const formInformation = JSON.parse(localStorage.getItem('formInformation'))
            setHabitName(formInformation.habit);
            setHabitDays([...formInformation.days]);
        }
    }, [])

    function addHabit () {

        setIsActive(false);
        
        const credentials = JSON.parse(localStorage.getItem('credentials'));
        const API = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

        const body = {
            name: habitName,
            days: habitDays
        };

        const config = {
            headers: {
                'Authorization': `Bearer ${credentials.token}`
            }
        };

        const promise = axios.post(API, body, config);

        promise
            .then( () => { 
                requestHabitsList();
                requestTodayHabitsList (setTodayHabits, setProgress)
                setIsVisible(false);
                setIsActive(true);
                setHabitName("");
                setHabitDays([]);
                localStorage.removeItem('formInformation')
            })
            .catch( err => {
                alert(err.response.data.message)
                setIsActive(true)
            });
    }

    function selectDay (index) {
        
        if ( habitDays.includes(index) ) {
            habitDays.splice(habitDays.indexOf(index), 1);
        } else {
            habitDays.push(index);
        }
        
        setHabitDays([...habitDays]);
    }

    function renderDays (days) {
        return (
            days.map( (day, index) => {
                return (
                    <Day 
                        background={ habitDays.includes(index) }
                        key={index} 
                        onClick={ isActive ? () => selectDay(index) : null }
                    >
                        { day }
                    </Day>
                )}
            )
        )
    }

    return (
        <Container isActive={isActive}>
            <input 
                placeholder='nome do hábito' 
                onChange={ (e) => setHabitName(e.target.value) }
                value={habitName}
                disabled={!isActive}
                required 
            />
            <WeekDays>
                { renderDays(days) }
            </WeekDays>
            <Buttons isActive={isActive}>
                <div onClick={ 
                    isActive ? 
                        () => {
                            setIsVisible(false);
                            const formInformation = {
                                habit: habitName,
                                days: habitDays
                            };
                            localStorage.setItem('formInformation', JSON.stringify(formInformation));
                        } 
                    : null }>
                    {'Cancelar'}
                </div>
                <div onClick={ isActive ? addHabit : null}>
                    {isActive ? 'Salvar' : <ThreeDots color="#FFFFFF" height={15} width={60}  />}
                </div>
            </Buttons>
        </Container>
    )
}

const Container = styled.div`
    width: calc(100vw - 40px);
    padding: 16px;
    margin-bottom: 30px;
    border-radius: 5px;
    background-color: #FFFFFF;
    input {
        width: 100%;
        height: 45px;
        padding-left: 10px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 8px;
        background-color: ${ props => props.isActive ? '#FFFFFF' : '#F2F2F2'};
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

const WeekDays = styled.div`
    display: flex;
    margin-bottom: 30px;
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
    cursor: pointer;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:180px;
    margin-left: auto;
    & div:first-child {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 16px;
        color: #52B6FF;
        opacity: ${props => props.isActive ? 1 : 0.7};
        cursor: pointer;
    }
    & div:last-child {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 84px;
        height: 35px;
        border-radius: 5px;
        background: #52B6FF;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 16px;
        color: #FFFFFF;
        opacity: ${props => props.isActive ? 1 : 0.7};
        cursor: pointer;
    }
`;