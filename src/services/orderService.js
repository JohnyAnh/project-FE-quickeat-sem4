import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";
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

const orderService = {

    getOrders: async () => {
        try {
            const response = await axios.get(API_URL, {headers:getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findOrders: async (order) => {
        try {
            const headers = getAuthorizationHeader();
            delete headers['Content-Type'];
            const response = await axios.post(API_URL + "/list", order, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createOrder(order) {
        return axios.post(API_URL + "/create", order, {headers:getAuthorizationHeader()});
    },

    updateOrder(order, cartId) {
        return axios.post(API_URL + "/" + cartId, order, {headers:getAuthorizationHeader()});
    },

    deleteOrder(cartId) {
        return axios.delete(API_URL + "/" + cartId, {headers:getAuthorizationHeader()});
    }
}

export default orderService;