import { instance } from "../api/axios.api"

export const LootService = {

    async openBox(openPrice) {
        let data = await instance.post('/loot/open', { openPrice })
        return data.data
    },

    async sellLoot(sellData) {
        let data = await instance.post('/loot/sell', { sellData })
        return data.data
    },

   

}