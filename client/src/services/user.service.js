import axios from 'axios';

const API_URL = "http://localhost:5000/auth/"

const postRegisterData = (myData) => {
    return axios.post(API_URL+"register", myData);
}

export  {
    postRegisterData
}