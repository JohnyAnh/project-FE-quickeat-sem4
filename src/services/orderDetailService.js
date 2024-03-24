import axios from "axios";

const API_URL = "http://localhost:8080/api/order_details";
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

const orderDetailService = {

    getCarts: async () => {
        try {
            const response = await axios.get(API_URL, {headers:getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findOrdersDetail: async (orderDetail) => {
        try {
            const response = await axios.post(API_URL + "/list", orderDetail, {headers:getAuthorizationHeader()});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createOrderDetail(orderDetail) {
        return axios.post(API_URL + "/create", orderDetail, {headers:getAuthorizationHeader()});
    },

    updateOrderDetail(orderDetail, orderDetailId) {
        return axios.post(API_URL + "/" + orderDetailId, orderDetail, {headers:getAuthorizationHeader()});
    },

    deleteOrderDetail(orderDetailId) {
        return axios.delete(API_URL + "/" + orderDetailId, {headers:getAuthorizationHeader()});
    }
}

export default orderDetailService;