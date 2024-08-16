import { instance } from "../api/axios.api"

export const StatisticService = {

    async getGlobalStatistic() {

        let data = await instance.get('/statistic/global')
        return data.data
    },

    async getUserStatistic() {

        let data = await instance.get('/statistic/user')
        return data
    }

}