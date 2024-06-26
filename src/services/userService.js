import axios from "axios";

const API_URL = "http://localhost:8080/api/users";
const headers = {
    'Content-Type': 'multipart/form-data',
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
    getUserProfile: async () => {
        try {
            const response = await axios.get(API_URL+ "/profile", {headers:getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findUsers: async (user) => {
        try {
            const headers = getAuthorizationHeader();
            delete headers['Content-Type'];
            const response = await axios.post(API_URL + "/list", user, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createUser(user) {
        return axios.post(API_URL + "/create", user, {headers:getAuthorizationHeader()});
    },

    updateUser(user, userId) {
        const headers = getAuthorizationHeader();
        delete headers['Content-Type'];
        return axios.put(API_URL + "/" + userId, user, {headers});
    },

    deleteUser(userId) {
        return axios.delete(API_URL + "/" + userId, {headers:getAuthorizationHeader()});
    },
    updateAvatar(file, userId) {
        return axios.put(API_URL + "/avatar" , file, { headers: getAuthorizationHeader() });
    }
}

export default userService;