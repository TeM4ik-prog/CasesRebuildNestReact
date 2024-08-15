import { useEffect, useState } from "react"
import UserList from "../../User/usersList/usersList"
import axios from "axios";
import { StatisticService } from "../../../services/statistic.service";
import { toast } from "react-toastify";



export default function GlobalStatistic() {
    const [userList, setUserList] = useState([])



    const getGlobalStatistic = async () => {
        try {
            const data = await StatisticService.getGlobalStatistic()
            console.log(data)
            if (data) {
                setUserList(data)
            }
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }
    useEffect(() => {
        getGlobalStatistic()
    }, [])


    return (
        <UserList users_list={userList} />

    )
}