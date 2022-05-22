import axios from 'axios';


const API_URL = '/api/goals/';

// create new goal
const createGoal = async (goalData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    // send data with the token
    const response = await axios.post(API_URL, goalData, config);
};

// get user goals
const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(API_URL, config);

    return response.data;
}

const goalService = {
    createGoal,
    getGoals
};

export default goalService;