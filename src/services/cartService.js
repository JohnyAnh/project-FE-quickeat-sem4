import axios from "axios";

const API_URL = "http://localhost:8080/api/carts";
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

const cartService = {

    getCarts: async () => {
        try {

            const response = await axios.get(API_URL, {headers:getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findCarts: async (cart) => {
        try {
            const headers = getAuthorizationHeader();
            delete headers['Content-Type'];
            const response = await axios.post(API_URL + "/list", cart, {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createCart(cart) {
        const headers = getAuthorizationHeader();
        delete headers['Content-Type'];
        return axios.post(API_URL + "/create", cart, {headers});
    },

    updateCart(cart, cartId) {
        const headers = getAuthorizationHeader();
        delete headers['Content-Type'];
        return axios.post(API_URL + "/" + cartId, cart, {headers});
    },

    deleteCart(cartId) {
        const headers = getAuthorizationHeader();
        delete headers['Content-Type'];
        return axios.delete(API_URL + "/" + cartId, {headers});
    }
}

export default cartService;