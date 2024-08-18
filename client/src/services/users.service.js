import { instance } from "../api/axios.api"

export const UserService = {

    async getUserInventory() {
        let data = await instance.get('/users/inventory')
        return data.data
    },


    async addUserMoney(money) {
        let data = await instance.post('/users/money', { money })
        return data.data
    }

}