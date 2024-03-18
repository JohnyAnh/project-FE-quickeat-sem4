import axios from "axios";

const API_URL = "http://localhost:8080/api/products";
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

const productService = {

    getProducts: async () => {
        try {
            const response = await axios.get(API_URL, {headers:getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findProducts: async (product) => {
        try {
            const response = await axios.post(API_URL + "/list", product, {headers:getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createProduct(product) {
        return axios.post(API_URL + "/create", product, {headers:getAuthorizationHeader()});
    },

    updateProduct(product, productId) {
        return axios.post(API_URL + "/" + productId, product, {headers:getAuthorizationHeader()});
    },

    deleteProduct(productId) {
        return axios.delete(API_URL + "/" + productId, {headers:getAuthorizationHeader()});
    }
}

export default productService;