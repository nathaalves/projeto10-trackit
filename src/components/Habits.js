import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import Header from "./Header";
import Menu from "./Menu";

export default function Habits () {

    const { credentials } = useContext(UserContext);

    return (
        <>
            <Header image={credentials.profile}/>
            <Menu />
        </>
    )
}