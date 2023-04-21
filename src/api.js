import axios from 'axios'

export default axios.create({
    baseURL: `https://managefly-api.onrender.com`
//     baseURL: `http://localhost:5000/`
})
