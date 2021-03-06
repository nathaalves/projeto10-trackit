import { useState, useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import Header from './Header';
import Menu from './Menu';
import Title from './Title';
import Main from './Main';
import TodayHabit from './TodayHabit';

export default function TodayHabitsPage () {

    const { progress, todayHabits } = useContext(UserContext);
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    const [profilePicture] = useState(credentials.image);
    const [date, setDate] = useState('');

    useEffect( () => {

        const dayjs = require('dayjs');
        const weekday = require('dayjs/plugin/weekday');
        dayjs.extend(weekday);

        const dayStr = ['Domimngo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

        const dayIndex = dayjs().weekday();
        const dayOfMonth = dayjs().date();
        const month = (dayjs().month() < 9) ? '0' + (dayjs().month() + 1) : (dayjs().month() + 1);
    
        setDate(`${dayStr[dayIndex]}, ${dayOfMonth}/${month}`);

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

    return (
        <>
            <Header image={profilePicture} />
            <Main>
                <Title progress={progress}>
                    <div>
                        <h2>{date}</h2>
                        <h3>
                            {progress ?
                                `${Math.round(progress*100).toFixed(0)}% dos hábitos concluídos`
                                 : 'Nenhum hábito concluido ainda'
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