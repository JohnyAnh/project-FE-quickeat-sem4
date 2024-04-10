import React from "react";
import myorder from "@/pages/myorder";
import Head from "next/head";
import {useEffect, useState} from "react";
import orderService from "@/src/services/orderService";
import Link from "next/link";
import {useRouter} from "next/router";
import userService from "@/src/services/userService";
import { Formik, Form, Field } from 'formik';
import Swal from "sweetalert2";

const YourProfileFuntion = ({sidebar}) => {

    const router = useRouter();
    const [file, setFile] = useState({
        img : ''
    });
    const [userData, setUserdata] = useState({
        id: '',
        name: '',
        address: '',
        birthday: '',
        tel: '',
        email: '',
        description: null
    });
    // const token = localStorage.getItem('jwt');
    // const decodedToken = jwt.decode(token);
    // const userId = decodedToken ? decodedToken.id : null;

    const Email = localStorage.getItem('email');
    const [reqEmail] = useState({email:Email})


    useEffect(() => {
        // if (email) {
        userService.findUsers(reqEmail)
            .then((res) => {
                // console.log("User data",res.data);
                if (res.data.length > 0) {
                    const firstUser = res.data[0];
                    setUserdata(res.data[0]);
                } else {
                    console.log("No user found.");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);



    const handleChange = (event) => {
        setUserdata((prevDetails) => ({
            ...prevDetails,
            [event.target.name]: event.target.value,
        }));
    };

    const handleFileChange = (event) => {
        file.img = event.target.files;
        setFile(file);
    };

    const id = userData.id;

    const handleUpdate = async () => {
        try {
            const confirmed = await Swal.fire({
                title: 'Are you sure to update?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update it!'
            });

            if (confirmed.isConfirmed) {
                console.log(userData);
                const response = await userService.updateUser(userData, id);
                if (response != null) {
                    await Swal.fire(
                        'Update Success!',
                        'Your file has been updated.',
                        'success'
                    );
                    await router.push("/yourprofile");
                }
            }
        } catch (error) {
            console.error('Error updating user:', error);
            await Swal.fire(
                'Update Failed!',
                'An error occurred while updating your profile.',
                'error'
            );
        }
    };
    // console.log("Yourprofile  Email:", Email);
    // console.log("Yourprofile  userData:", userData);
    const updateAvatar = async () => {

        Swal.fire({
            title: 'Are you sure update Image ?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Upload it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const t = userService.updateAvatar(file, id);
                if (t != null) {
                    Swal.fire(
                        'Success!',
                        'Your file has been update.',
                        'success'
                    ).then(() => {
                        // Sau khi hiển thị thông báo thành công, làm mới trang
                        window.location.reload();
                    });
                    // return navigate("/brands/detail/ + e.id");
                }
            }
        })
    }

    // console.log("Yourprofile  ID:", id);
    return (
        <div>
            <Head>
                <title>Profile Page</title>
                {/*<link rel="stylesheet" type="text/css" href="style.css"/>*/}
                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                />
            </Head>
            <Formik initialValues={userData} onSubmit={handleUpdate}>
                <Form>
                    <div className="container rounded bg-white mt-5 mb-5">
                        <div className="row">
                            <div className="col-md-5 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    {userData.images && userData.images.length > 0 ? (
                                        userData.images.map((image, index) => (
                                            <img

                                                key={index}
                                                src={image.url}
                                                id="profile-image"
                                                className="rounded-circle mt-5"
                                                style={{ width: '300px', height: '300px' }}
                                            />
                                        ))
                                    ) : (
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9l3x_T90wLTxFRNtGjTcdi-naKnFfjSIsg&usqp=CAU" // Replace default_image_url_here with the URL of your default image
                                            id="profile-image"
                                            className="rounded-circle mt-5"
                                        />
                                    )}
                                    <div>
                                        <span className="font-weight-bold">{userData.name}</span>
                                        <br/>
                                        <span className="text-black-50">{userData.email}</span>
                                    </div>

                                    <br/>
                                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    name="img"
                                                    className="form-control"
                                                    id="inputGroupFile04"
                                                    aria-describedby="inputGroupFileAddon04"
                                                    aria-label="Upload"
                                                    multiple

                                                    />
                                                <button className="btn btn-outline-secondary" type="button"
                                                        onClick={updateAvatar} id="inputGroupFileAddon04">Upload
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 border-right">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Profile Settings</h4>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label className="labels">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Full name"
                                                onChange={handleChange}
                                                value={userData.name || ""}
                                                name="name"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels">Email</label>
                                            <input
                                                onChange={handleChange}
                                                value={userData.email || ""}
                                                type="text"
                                                className="form-control"
                                                placeholder="Email"
                                                name="email"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <label className="labels">PhoneNumber</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="enter phone number"
                                                onChange={handleChange}
                                                value={userData.tel || ""}
                                                name="tel"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <label className="labels">Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="enter address"
                                                onChange={handleChange}
                                                value={userData.address || ""}
                                                name="address"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-5 text-center">
                                        <button className="button button-2" type="submit" variant="contained">
                                            Save Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        </div>
    );
};

export default YourProfileFuntion;
