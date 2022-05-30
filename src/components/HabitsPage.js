import axios from "axios";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Header from "./Header";
import Main from './Main';import Title from './Title';
import AddHabitWindow from './AddHabitWindow';
import Habits from './Habits';
import Menu from "./Menu";
import LoadingPage from './LoadingPage';

export default function HabitsPage () {

    const navigate = useNavigate();
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    const [profilePicture] = useState(credentials.image);
    const [habits, setHabits] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function requestHabitsList () {

        setIsLoading(true);

        const API = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

        const config = {
            headers: {
                'Authorization': `Bearer ${credentials.token}`
            }
        };

        const promise = axios.get(API, config);

        promise
            .then( response => {
                setHabits([...response.data]) 
                setIsLoading(false)
            })
            .catch( err => {
                alert(err.response.data.message);
                navigate("/");
            })
    }

    useEffect( () => {
        requestHabitsList();
    }, [])
    
    function renderHabits () {

        if (habits.length > 0) {
            return habits.map( (habit, index) => 
                <Habits 
                    habitDays={ habit.days } 
                    habitName={ habit.name } 
                    habitId={ habit.id } 
                    requestHabitsList={requestHabitsList}
                    key={index}
                />
            )
        }

        return (
            <Message>
                {'Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear'}
            </Message>
        )
    }

    function HabitsList () {
        return (
            <>
                {isVisible ? 
                    <AddHabitWindow 
                        setIsVisible={setIsVisible} 
                        requestHabitsList={requestHabitsList} 
                    />
                : null}
                <div>
                    {renderHabits()}
                </div>
            </>
        )
    }

    return (
        <>
            <Header image={profilePicture} />
            
            <Main>
                <Title>
                    <h2>{'Meus hábitos'}</h2>
                    <button onClick={ () => setIsVisible(true) }>+</button>
                </Title>
                { isLoading ?
                    <LoadingPage />
                :    
                    <HabitsList />
                }
            </Main>
            <Menu />
        </>
    )
}

const Message = styled.p`
    width: 100vw;
    padding: 0 20px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #666666;
`;