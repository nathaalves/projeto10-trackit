import axios from "axios";

export default function requestTodayHabitsList (setTodayHabits, setProgress) {

    const API = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';

    const credentials = JSON.parse(localStorage.getItem("credentials"));

    const config = {
        headers: {
            "Authorization": `Bearer ${credentials.token}`
        }
    }

    const promise = axios.get(API, config);

    promise
        .then( response => {
            setTodayHabits([...response.data]);
            setProgress( () => {
                if ( isNaN(response.data.filter(habit => habit.done === true).length / response.data.length) ) {
                    return 0
                } else {
                    return response.data.filter(habit => habit.done === true).length / response.data.length
                }
            });
        })
        .catch( err => alert(err.response.data.message) );
}