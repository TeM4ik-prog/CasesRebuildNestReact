import { useContext } from "react";
import { userDataContext } from "../../../App";
import CoinsValueBlock from "../../coinsValue/coinsValue";

import "./header.scss"
import { useDispatch } from "react-redux";
import { useUserData } from "../../../store/hooks/useAuth";


export default function Header() {
    const { user } = useUserData();
    
    return (
        <>
            {user ? (
                <div className="header-container">
                    <h3>{user?.username}</h3>
                    <CoinsValueBlock value={user?.money} />
                </div>
            ) : <h2>Данных нет</h2>}

        </>

    )
}