import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HabitsPage from "./HabitsPage";
import TodayHabitsPage from "./TodayHabitsPage";

//import { useContext } from "react";
//import UserContext from "../contexts/UserContext";
//const { pro } = useContext(UserContext);

export default function App () {

    console.log("ok")
    const [progress, setProgress] = useState(0);

    return (
        <UserContext.Provider value={{       
            progress,
            setProgress
        }}>
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/cadastro" element={<RegisterPage />} />
                    <Route path="/habitos" element={<HabitsPage />} />
                    <Route path="/hoje" element={<TodayHabitsPage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}