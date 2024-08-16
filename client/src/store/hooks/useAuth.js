import { useSelector } from "react-redux"

export const useAuth = () => {
    const isAuth = useSelector((state) => state.user.isAuth)
    return isAuth
}

export const useUserData = () => {
    const user = useSelector((state) => state.user)
    return user
}


export const useUpdateDataTrigger = () => {
    const userTrigger = useSelector((state) => state.user.updateTrigger)
    return userTrigger
}


export const useUpdateInventoryTrigger = () => {
    const inventoryTrigger = useSelector((state) => state.loot.updateTrigger)
    return inventoryTrigger
}