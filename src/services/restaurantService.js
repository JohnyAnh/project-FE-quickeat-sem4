import axios from "axios";

const API_URL = "http://localhost:8080/api/restaurants";
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

const restaurantService = {

    getRestaurants: async () => {
        try {
            const response = await axios.get(API_URL, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findRestaurants: async (restaurant) => {
        try {
            const response = await axios.post(API_URL + "/list", restaurant, );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createRestaurant(restaurant) {
        return axios.post(API_URL + "/create", restaurant, {headers:getAuthorizationHeader()});
    },

    updateRestaurant(restaurant, restaurantId) {
        return axios.post(API_URL + "/" + restaurantId, restaurant, {headers:getAuthorizationHeader()});
    },

    deleteRestaurant(restaurantId) {
        return axios.delete(API_URL + "/" + restaurantId, {headers:getAuthorizationHeader()});
    }
}

export default restaurantService;