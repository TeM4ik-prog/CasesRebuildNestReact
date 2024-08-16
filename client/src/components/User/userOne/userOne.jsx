import { useMemo } from "react";
import CoinsValueBlock from "../../coinsValue/coinsValue"
import "./userOne.scss"


export default function UserOne({ info_user }) {
    const initials = info_user.username.slice(0, 2).toUpperCase();


    const backgroundColor = useMemo(() => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return `#${randomColor}`;
    }, []);

    return (
        <div className="user-container">
            <div className="avatar" style={{ backgroundColor }}>
                <div style={{ color: backgroundColor }}>{initials}</div>
            </div>
            <p>{info_user.username}</p>

            <CoinsValueBlock value={info_user.money} />
        </div>
    )
}