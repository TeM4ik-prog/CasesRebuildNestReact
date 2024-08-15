import { instance } from "../api/axios.api"

export const ProductsService = {

    async sellProduct(productData) {
        const { data } = await instance.post('/products', productData)
        return data
    },

    async getProducts() {
        const { data } = await instance.get(`/products`)
        return data
    },

    async getDetailedProduct(id) {
        const { data } = await instance.get(`/products/${id}`)
        return data
    },


    async getUserProducts() {
        const { data } = await instance.get('/auth/products')
        return data
    }

}