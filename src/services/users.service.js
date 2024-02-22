import axios from "./axios";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const AlertFail = () => {
    Swal.fire(
        'Failed!',
        'Something went wrong!',
        'error'
    )
}


const token = localStorage.token;
const userId = localStorage.userId;


const fetchAllUser = () => {
    return axios.get("/User/getAll", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
// const postCreateStudent = async (pack) => {
//     const url = "/Student/create";
//     console.log(">>>Check userId ModalAdd1: ", userId);


//     try {
//         const token = localStorage.getItem("token");
//         const decodedToken = jwtDecode(token);
//         const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

//         const rs = await axios.post(url, {
//             fullName: pack.fullName,
//             dateOfBirth: pack.dateOfBirth,
//             address: pack.address,
//             email: pack.email,
//             imageUrl: pack.imageUrl,
//             userId: userId,  // Đảm bảo gửi userId vào đây
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         }).catch(error => console.error("Error:", error));



//         return rs;
//     } catch (error) {
//         AlertFail();
//         return {};
//     }
// };

// const putUpdateStudents = (studentId, fullName, dateOfBirth, address, email, imageUrl) => {
//     return axios.put(`/Student/update?id=${studentId}`, { fullName, dateOfBirth, address, email, imageUrl }, {
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
// }


const deleteUser = (id) => {
    return axios.delete(`/User/delete?id=${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};


const postUploadIMG = (formData) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data", // Đảm bảo đã thiết lập đúng kiểu phương tiện
        },
    };

    return axios.post("/Uploads/image", formData, config);
}

export { fetchAllUser, postUploadIMG, deleteUser };