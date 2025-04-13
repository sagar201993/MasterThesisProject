import axios from 'axios';

//pass new generated access token here
const token = localStorage.getItem('token')

export default function authHeader() {
    const obj = JSON.parse(localStorage.getItem("authUser"))
  
    if (obj && obj.token) {
      return "Bearer "+obj.token
    } else {
      return ""
    }
  }

//apply base url for axios
const API_URL = "http://localhost:3001/api"

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = authHeader()

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

// Gets the logged in user data from local session 
const getLoggedInUser = () => {
    const user = localStorage.getItem('authUser');
    if (user)
        return JSON.parse(user);
    return null;
}

//is user is logged in
const isUserAuthenticated = () => {
    return getLoggedInUser() !== null;
}

// Register Method
const postRegister = (url, data) => {
    return axiosApi.post(url, data).then(response => {
        if (response.status >= 200 || response.status <= 299)
            return response.data;
        throw response.data;
    }).catch(err => {
        var message;

        console.log("postRegister error");
        console.log(err);

        if (err.response && err.response.status) {
            switch (err.response.status) {
                case 404: message = "Sorry! the page you are looking for could not be found"; break;
                case 500: message = "Sorry! something went wrong, please contact our support team"; break;
                case 401: message = "Invalid credentials"; break;
                default: message = err.response.data.message; break;
            }
        }
        throw message;
    });

}

// Login Method
const postLogin = (url, data) => {
    return axiosApi.post(url, data).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        throw err.response.data.message;
    });
}

// Login Method
const postLoginCheck = (url, data) => {
    return axiosApi.get(url, data).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        throw err.response.data.message;
    });
}

// postForgetPwd 
const postForgetPwd = (url, data) => {
    return axiosApi.post(url, data).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        throw err.response.data.message;
    });
}

const postResetPwd = (url, data) => {
    return axiosApi.post(url, data).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        throw err.response.data.message;
    });
}

export { getLoggedInUser, isUserAuthenticated, postRegister, postLogin, postForgetPwd,postResetPwd,postLoginCheck }