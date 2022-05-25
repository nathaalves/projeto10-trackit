import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import styled from 'styled-components';
import Header from "./Header";
import Menu from "./Menu";
import Title from './Title';
import AddHabitWindow from './AddHabitWindow';
import Habits from './Habits';

export default function HabitsPage () {

    const navigate = useNavigate();
    const { credentials } = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    function requestHabitsList () {

        const config = {
            headers: {
                "Authorization": `Bearer ${credentials.token}`
            }
        }

        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', config);

        promise
            .then( response => {
                setHabits([...response.data]);
        })
            .catch( err => {
                alert(err.response.data.message);
                navigate("/")
        })
    }

    useEffect( () => {
        requestHabitsList ()
    }, [])
    
    function listHabits () {

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
                Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear
            </Message>
        )
    }

    return (
        <>
            <Header image={credentials.profile} />
            <Container>
                <Title>
                    <h2>Meus hábitos</h2>
                    <div onClick={ () => setIsVisible(true) }>+</div>
                </Title>
                {isVisible ? 
                    <AddHabitWindow setIsVisible={setIsVisible} requestHabitsList={requestHabitsList} />
                : null}
                <HabitsList>
                    {listHabits()}
                </HabitsList>
            </Container>
            <Menu />
        </>
    )
}

const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100vw;
    height: 100vh;
    padding: 70px;

    background-color: #E5E5E5;
`;

const HabitsList = styled.div`
    overflow-y: scroll;
`

const Message = styled.p`
    width: 100vw;
    padding: 0 20px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #666666;
`;