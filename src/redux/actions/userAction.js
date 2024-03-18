import { loginApi, registerApi } from "@/src/services/auth.service";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
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

export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const USER_REFRESH = 'USER_REFRESH';
export const FETCH_USER_REGISTER = 'FETCH_USER_REGISTER';



export const USER_LOGOUT = 'USER_LOGOUT';

export const handleLoginRedux = (email, password) => {
    return async (dispatch, getState) => {
        const res = await loginApi(email.trim(), password);
        console.log(res.data);
        localStorage.setItem('jwt', res.data.jwt);
        localStorage.setItem('email', email.trim());
        dispatch({ type: FETCH_USER_LOGIN });
        console.log("Check api login:", res);
        if (res && res.data.jwt) {
            dispatch({
                type: FETCH_USER_SUCCESS,
                data: { email: email.trim(), jwt: res.data.jwt }
            });



        } else {
            //error
            if (res && res.status === 401) {
                toast.error(res.data);
            }
            dispatch({
                type: FETCH_USER_ERROR,
            });
        }
    }
}

export const handleLogoutRedux = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_LOGOUT
        });
        // toast.success("Đăng xuất thành công");

    }
}

export const handleRefresh = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_REFRESH
        });
    }
}

export const handleRegisternRedux = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_USER_REGISTER });

        try {
            const res = await registerApi(email.trim(), password);

            // localStorage.setItem('jwt', res.data.jwt);
            // localStorage.setItem('email', email.trim());

            dispatch({
                type: FETCH_USER_SUCCESS,
                data: { email: email.trim(), jwt: res.data.jwt }
            });
            toast.success("Đăng ký thành công");


        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error(error.response.data);
            }

            dispatch({
                type: FETCH_USER_ERROR,
            });
        }
    };
};