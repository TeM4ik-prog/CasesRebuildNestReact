import { instance } from "../api/axios.api"

export const LootService = {

    async openBox(openPrice) {

        let data = await instance.post('/loot/open', { openPrice })
        return data
    },

    async getUserInventory() {

        let data = await instance.get('/userInventory')
        return data
    }

}