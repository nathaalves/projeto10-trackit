import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from './Header'
import Main from './Main';
import Title from './Title';
import Menu from './Menu'
import Calendar from 'react-calendar'
import dayjs from 'dayjs';
import LoadingPage from './LoadingPage';

export default function HistoricPage () {

    let customParseFormat = require('dayjs/plugin/customParseFormat')
    dayjs.extend(customParseFormat)
    var updateLocale = require('dayjs/plugin/updateLocale')
    dayjs.extend(updateLocale)

    dayjs.updateLocale('en', {
        months: [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Setenbro', 'Agosto', 'Outubro', 'Novembro', 'Dezembro'
        ]
    })
    
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    const [profilePicture] = useState(credentials.image);
    const [historicList, setHistoricList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {

        setIsLoading(true);

        const API = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily';

        const config = {
            headers: {
                'Authorization': `Bearer ${credentials.token}`
            }
        };

        const promise = axios.get(API, config);

        promise
            .then( response => {
                setHistoricList([...response.data]);
                setIsLoading(false);
            })
            .catch( err => alert(err.response.data.message))
        ;
    }, [])

    function tileClassName({ date, view }) {

        if (view === 'month') {

            for (let i = historicList.length - 1; i > 0; i--) {
                if (dayjs(historicList[i].day, "DD/MM/YYYY").toDate().toString() === date.toString()) {
                    for (let j = 0; j < historicList[i].habits.length; j++) {
                        if (historicList[i].habits[j].done === false) {
                            return 'incomplete'
                        }
                    }
                    return 'complete'
                }
            }
        }
    }

    function formatShortWeekday (date) {
        const weekdaysAbreviation = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
        return weekdaysAbreviation[dayjs(date).day()];
    }

    return (
        <>
            <Header image={profilePicture} />
            <Main>
                <Title>
                    <h2>Histórico</h2>
                </Title>
                { isLoading ?
                    <LoadingPage />
                :    
                    <Calendar 
                        tileClassName={tileClassName}
                        formatDay={(locale, date) => dayjs(date).format('DD')}
                        formatMonth={(locale, date) => dayjs(date).format('MMMM')}
                        formatMonthYear={(locale, date) => dayjs(date).format('MMMM YYYY')}
                        formatShortWeekday={(locale, date) => formatShortWeekday(date)}
                    />
                }
            </Main>
            <Menu />
        </>
    )
}