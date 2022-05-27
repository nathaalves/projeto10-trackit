import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import Header from "./Header";
import Menu from "./Menu";
import Title from './Title';
import Main from "./Main";
import TodayHabit from "./TodayHabit";
import requestTodayHabitsList from "./requestHabitsList";


export default function TodayHabitsPage () {
    
    const { progress, setProgress, todayHabits, setTodayHabits } = useContext(UserContext);
    //const [progress, setProgress] = useState(0);
    const [credentials] = useState( JSON.parse(localStorage.getItem("credentials")) )
    //const [todayHabits, setTodayHabits] = useState([]);
    const [date, setDate] = useState("")

    /* function requestTodayHabitsList () {

        const config = {
            headers: {
                "Authorization": `Bearer ${credentials.token}`
            }
        }

        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config);

        promise
            .then( response => {
                setTodayHabits([...response.data])
                setProgress(todayHabits.filter(habit => habit.done === true).length / todayHabits.length)
            })
            .catch( err => alert(err.response.data.message) )
    } */

    useEffect( () => {

        const dayjs = require('dayjs')
        const weekday = require('dayjs/plugin/weekday')
        dayjs.extend(weekday)

        const dayStr = ['Domimngo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

        const dayIndex = dayjs().weekday()
        const dayOfMonth = dayjs().date()
        const month = (dayjs().month() < 9) ? "0" + (dayjs().month() + 1) : (dayjs().month() + 1)
    
        setDate(`${dayStr[dayIndex]}, ${dayOfMonth}/${month}`)

        requestTodayHabitsList (setTodayHabits, setProgress)
    }, [])

    function renderTodayHabits () {
        return (
            todayHabits.map( (habit, index) => {
                return (
                    <TodayHabit 
                        key={index}
                        habit={habit}
                    />
                )
            })
        )
    }

    //console.log(progress)

    return (
        <>
            <Header image={credentials.image} />
            <Main>
                <Title progress={progress}>
                    <div>
                        <h2>{date}</h2>
                        <h3>
                            {progress === 0 ?
                                'Nenhum hábito concluido ainda' :
                                `${Math.round(progress*100).toFixed(0)}% dos hábitos concluídos`
                            }
                        </h3>
                    </div>
                </Title>
                <div>
                    { todayHabits.length !== 0 ? renderTodayHabits() : null }
                </div>
            </Main>
            <Menu />
        </>
    )
}