import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HabitsPage from "./HabitsPage";
import TodayHabitsPage from "./TodayHabitsPage";
import Menu from "./Menu";

//import { useContext } from "react";
//import UserContext from "../contexts/UserContext";
//const { pro } = useContext(UserContext);

export default function App () {

    const [progress, setProgress] = useState(0);
    const [todayHabits, setTodayHabits] = useState([]);
    const [habitName, setHabitName] = useState("")
    const [habitDays, setHabitDays] = useState([])

    return (
        <UserContext.Provider value={{       
            progress,
            setProgress,
            todayHabits,
            setTodayHabits,
            habitName,
            setHabitName,
            habitDays,
            setHabitDays,

        }}>
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/cadastro" element={<RegisterPage />} />
                    <Route path="/habitos" element={<HabitsPage />} />
                    <Route path="/hoje" element={<TodayHabitsPage />} />
                </Routes>
                {/* {isVisible ? <Menu /> : null} */}
            </BrowserRouter>
        </UserContext.Provider>
    )
}