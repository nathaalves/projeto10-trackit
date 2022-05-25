import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HabitsPage from "./HabitsPage";

export default function App () {

    const [credentials, setCredentials] = useState('');
    const [habitName, setHabitName] = useState("");
    const [habitDays, setHabitDays] = useState([]);

    return (
        <UserContext.Provider value={{       
            credentials,
            setCredentials,
            habitName,
            setHabitName,
            habitDays,
            setHabitDays
        }}>
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/cadastro" element={<RegisterPage />} />
                    <Route path="/habitos" element={<HabitsPage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}