import { useSelector } from "react-redux"

export const useAuth = () => {
    const isAuth = useSelector((state) => state.user.isAuth)
    return isAuth
}

export const useUserData = () => {
    const user = useSelector((state) => state.user)
    return user
}