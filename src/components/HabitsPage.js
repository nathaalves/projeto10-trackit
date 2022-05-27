import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import Header from "./Header";
import Menu from "./Menu";
import Title from './Title';
import AddHabitWindow from './AddHabitWindow';
import Habits from './Habits';
import Main from './Main';

export default function HabitsPage () {

    const navigate = useNavigate();
    const [credentials] = useState( JSON.parse(localStorage.getItem("credentials")))
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
            .then( response => setHabits([...response.data]) )
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
            <Header image={credentials.image} />
            <Main>
                <Title>
                    <h2>Meus hábitos</h2>
                    <button onClick={ () => setIsVisible(true) }>+</button>
                </Title>
                {isVisible ? 
                    <AddHabitWindow 
                        setIsVisible={setIsVisible} 
                        requestHabitsList={requestHabitsList} 
                    />
                : null}
                <div>
                    {listHabits()}
                </div>
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