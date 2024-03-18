import { FETCH_USER_LOGIN, FETCH_USER_ERROR, FETCH_USER_SUCCESS, USER_LOGOUT, USER_REFRESH, FETCH_USER_REGISTER } from '../actions/userAction'
import Swal from "sweetalert2";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Alert = () => {
    Swal.fire(
        'Success!',
        'You clicked the button!',
        'success'
    )
}
const AlertFail = () => {
    Swal.fire(
        'Failed!',
        'Something went wrong!',
        'error'
    )
}
const headers = {
    'Content-Type': 'multipart/form-data',
};

const INITIAL_STATE = {

    account:
    {
        email: '',
        auth: null,
        jwt: ''
    },
    isLoading: false,
    isError: false,
    isRegistering: false
};

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_USER_LOGIN:
            return {
                ...state,
                isLoading: true,
                isError: false
            };

        case FETCH_USER_ERROR:
            toast.error("email/ Password is required");
            return {
                ...state,
                account: {
                    auth: false
                },
                isLoading: false,
                isError: true
            };

        case FETCH_USER_SUCCESS:
            console.log("Check action: ", action);
            Alert();
            return {
                ...state,
                account: {
                    email: action.data.email,
                    jwt: action.data.jwt,
                    auth: true
                },
                isLoading: true,
                isError: true
            };

        case USER_LOGOUT:
            localStorage.removeItem('email')
            localStorage.removeItem('jwt')
            Alert();
            return {
                ...state,
                account: {
                    email: '',
                    jwt: '',
                    auth: false
                }

            };

        case USER_REFRESH:
            return {
                ...state,
                account: {
                    email: localStorage.getItem('email'),
                    jwt: localStorage.getItem('jwt'),
                    auth: true
                }
            };
        case FETCH_USER_REGISTER:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isRegistering: true,
            };

        default: return state;



    }

};

export default userReducer;