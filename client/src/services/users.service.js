import { instance } from "../api/axios.api"

export const UserService = {

    async getUserInventory() {
        let data = await instance.get('/users/inventory')
        return data.data
    }

}