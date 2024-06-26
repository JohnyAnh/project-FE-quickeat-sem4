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
        const headers = getAuthorizationHeader();
        delete headers['Content-Type'];
        return axios.post(API_URL + "/create", order, {headers});
    },

    updateOrder(order, orderId) {
        const headers = getAuthorizationHeader();
        delete headers['Content-Type'];
        return axios.put(API_URL + "/" + orderId, order, {headers});
    },

    deleteOrder(cartId) {
        return axios.delete(API_URL + "/" + cartId, {headers:getAuthorizationHeader()});
    }
}

export default orderService;