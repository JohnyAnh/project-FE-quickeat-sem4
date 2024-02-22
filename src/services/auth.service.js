import axios from "axios";
import Swal from "sweetalert2";
import Api from "./axios";
import { toast } from "react-toastify";

const loginApi = async (email, password) => {
    const url = "/authenticate";
    const rs = await Api.post(url, { email: email, password: password });
    return rs;
}

const registerApi = async (email, password) => {
    const url = "/register";
    const rs = await Api.post(url, { email: email, password: password });
    return rs;
}

export { loginApi, registerApi };