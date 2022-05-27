import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import UserContext from "../contexts/UserContext";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import requestTodayHabitsList from './requestTodayHabitsList';


export default function Menu () {

    const { progress, setProgress, setTodayHabits } = useContext(UserContext);
    const [wasNotExecuted, setWasNotExecuted] = useState(true);


    if(wasNotExecuted) {
        requestTodayHabitsList (setTodayHabits, setProgress);
        setWasNotExecuted(false)
    }

    return (
        <Container>
            <Link to="/habitos">
                <h3>{'Hábitos'}</h3>
            </Link>
            <Link to="/hoje">
                <div>
                    <CircularProgressbar value={progress} maxValue={1} text="Hoje" styles={ buildStyles({
                        textColor: '#FFFFFF',
                        trailColor: '#52B6FF',
                        pathColor: '#FFFFFF'
                    })}/>
                </div>
            </Link>
            <Link to="/historico">
                <h3>{'Histórico'}</h3>
            </Link>
        </Container>
    )
}

const Container = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100vw;
    height: 70px;
    background-color: #FFFFFF;

    position: fixed;
    bottom: 0;
    z-index: 1;

    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;

    h3 {
        color: #52B6FF;
        margin: 0 30px;
    }

    div {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 90px;
        height: 90px;
        border-radius: 50%;
        padding: 5px;
        margin-bottom:40px;
        background-color: #52B6FF;

        color: #FFFFFF;
    }
`;