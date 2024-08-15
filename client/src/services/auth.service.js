import { instance } from "../api/axios.api"

export const AuthService = {
    async registration(userData) {
        const { data } = await instance.post('/users', userData)
        return data
    },

    async login(userData) {
        const { data } = await instance.post('/auth/login', userData)
        return data
    },

    async getProfile() {
        const { data } = await instance.get('/auth/profile')
        console.log(data)
        return data ? data : undefined
    },



}