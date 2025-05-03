import axios from 'axios'

const instance = axios.create({
    baseURL: "https://api-v3.mbta.com"
})

export default instance