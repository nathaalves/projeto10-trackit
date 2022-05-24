import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./LoginPage"

export default function App () {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}