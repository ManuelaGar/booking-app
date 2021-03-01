import axios from 'axios'

export async function register(user) {
    return await axios.post(`${process.env.REACT_APP_API}/register`, user)
};