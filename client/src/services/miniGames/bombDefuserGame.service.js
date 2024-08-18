import { instance } from "../../api/axios.api"

export const bombDefuserGameService = {


    async getBoosts() {
        const { data } = await instance.get('/games/BombDefuser/getDataBoosts')
        return data || null
    },


    async addBoost(boostName) {
        const { data } = await instance.post('/games/BombDefuser/addBoost', { boostName })
        return data
    }










}