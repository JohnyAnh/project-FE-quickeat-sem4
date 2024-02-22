import { FETCH_USER_LOGIN, FETCH_USER_ERROR, FETCH_USER_SUCCESS, USER_LOGOUT, USER_REFRESH, FETCH_USER_REGISTER } from '../actions/userAction'

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
            return {
                ...state,
                account: {
                    auth: false
                },
                isLoading: false,
                isError: true
            };

        case FETCH_USER_SUCCESS:
            console.log("Check action: ", action)
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
            // localStorage.removeItem('userId')

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