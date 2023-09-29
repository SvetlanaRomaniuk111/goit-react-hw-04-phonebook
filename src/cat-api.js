import axios from "axios";
const BASE_URL = 'https://api.thecatapi.com/v1'
const API_KEY = 'live_yiQL2G1sx5mMV2CIBSTr4WhXYTRNKMD4uQEw3LZzCGFp79Xaf8g2ZwAjaPXrjWxd'

const breedsInstance = axios.create({
    baseURL: `${BASE_URL}/breeds`,
    headers: { 'x-api-key': API_KEY }
})

const imageInstance = axios.create({
    baseURL: `${BASE_URL}/images`,
    headers: { 'x-api-key': API_KEY }
})


const fetchCatByBreed = async (id) => {
    try {
        const { data } = await imageInstance.get(`search?breed_ids=${id}`)
        return data
    } catch (err) {
        throw new Error(err)
    }

}

const fetchBreeds = async () => {
    try {
        const { data } = await breedsInstance.get()
        return data
    } catch (err) {
        throw new Error(err)
    }
}

export { fetchCatByBreed, fetchBreeds }