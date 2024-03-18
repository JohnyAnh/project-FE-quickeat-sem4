import axios from "axios";
import Swal from "sweetalert2";
import Api from "./axios";
import { toast } from "react-toastify";
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

const loginApi = async (email, password) => {
    const url = "/authenticate";
    const rs = await Api.post(url, { email: email, password: password });
    return rs;
    // Alert();
}

const registerApi = async (email, password) => {
    const url = "/register";
    const rs = await Api.post(url, { email: email, password: password });
    return rs;
}

export { loginApi, registerApi };