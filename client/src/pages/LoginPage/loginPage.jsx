import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { localSitePath } from "../../../../LocalSitePath";
import "./loginPage.scss";
// import { triggerUserDataContext, userDataContext } from "../../App";
import Loader from "../../components/particals/loader/loader";
import { AuthService } from "../../services/auth.service";
import { setTokenToLocalStorage } from "../../helper/localstorage.helper";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../store/user/user.slice";

export default function LoginPage() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('')

    const [searchParams] = useSearchParams()
    const telegramId = searchParams.get("telegramId")
    const username = searchParams.get("username")

    let location = useLocation()
    let dispatch = useDispatch()

    const loginHandler = async () => {
        console.log("Login")
        try {
            const data = await AuthService.login({ password, telegramId })
            console.log(data)
            if (data) {
                setTokenToLocalStorage(data.token)
                dispatch(login(data))

                toast.success('You are logged in')
                navigate('/')
            }

        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }


    }

    const registerHandler = async (e) => {
        console.log("register")
        try {
            const data = await AuthService.registration({ password, telegramId, username })
            console.log(data)
            if (data) {
                dispatch(login(data.user))
                toast.success('Account has been registered')
                navigate('/')
            }

        } catch (err) {
            toast.error(err.response.data.message)
        }
    }



    let UserEntry = () => {
        if (location.pathname === '/entry/login') loginHandler()
        else if (location.pathname === '/entry/register') registerHandler()
    }




    return (
        <div className="container-page">
            <p className="top-header-text-page">LogInPage</p>

            <div className="entry-container">
                <input placeholder="password" onChange={(e) => (setPassword(e.target.value))} />
                <button onClick={UserEntry}>Login or SingIn</button>
            </div>

        </div >
    );
}
