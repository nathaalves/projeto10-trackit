import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Habits from "./Habits";

export default function App () {

    const [credentials, setCredentials] = useState('');

    return (
        <UserContext.Provider value={{       
            credentials,
            setCredentials
        }}>
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/cadastro" element={<RegisterPage />} />
                    <Route path="/habitos" element={<Habits />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}