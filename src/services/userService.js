import axios from "axios";

const API_URL = "http://localhost:8080/api/users";
const headers = {
    // 'Content-Type': 'multipart/form-data',
};

const getAuthorizationHeader = () => {
    const storedState = localStorage.getItem('jwt');
    if (storedState) {
        if (storedState) {
            return {
                ...headers,
                'Authorization': `Bearer ${storedState}`,
            };
        }
    }
    return headers;
};

const userService = {

    getUsers: async () => {
        try {
            const response = await axios.get(API_URL, {headers:getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findUsers: async (user) => {
        try {
            const response = await axios.post(API_URL + "/list", user, {headers:getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createOrderDetail(user) {
        return axios.post(API_URL + "/create", user, {headers:getAuthorizationHeader()});
    },

    updateOrderDetail(user, userId) {
        return axios.post(API_URL + "/" + userId, user, {headers:getAuthorizationHeader()});
    },

    deleteOrderDetail(userId) {
        return axios.delete(API_URL + "/" + userId, {headers:getAuthorizationHeader()});
    }
}

export default userService;