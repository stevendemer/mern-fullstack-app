import axios from 'axios';

// perform http request, retrieve the user data 

const API_URL = "/api/users/";


// logout user
const logout = () => {
    localStorage.removeItem("user");
};

// register user 
const register = async (userData) => {

    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};


const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}


const authService = {
    register,
    logout,
    login,
};

export default authService;