import axios from "axios";

const API_URL = "http://localhost:8080/api/cart_items";
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

const cartItemService = {

    getCartItems: async () => {
        try {
            const response = await axios.get(API_URL, {headers:getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findCartItems: async (cartItem) => {
        try {
            const response = await axios.post(API_URL + "/list", cartItem, {headers:getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createCartItems(cartItem) {
        return axios.post(API_URL + "/create", cartItem, {headers:getAuthorizationHeader()});
    },

    updateCartItems(cartItem, cartItemId) {
        return axios.post(API_URL + "/" + cartItemId, cartItem, {headers:getAuthorizationHeader()});
    },

    deleteCartItems(cartItemId) {
        return axios.delete(API_URL + "/" + cartItemId, {headers:getAuthorizationHeader()});
    }
}

export default cartItemService;