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
    const [img, setFile] = useState(null);
    const [userData, setUserdata] = useState({
        userId:"",
        email: "",
        name: "",
        tel: "",
        address: "",
        img: null
    });
    const Email = localStorage.getItem('email');
    const [reqEmail] = useState({email:Email})


    useEffect(() => {
        // if (email) {
            userService.findUsers(reqEmail)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.length > 0) {
                        const firstUser = res.data[0];
                        setUserdata({
                            userId: firstUser.id || "",
                            email: firstUser.email || "",
                            name: firstUser.name || "",
                            tel: firstUser.tel || "",
                            address: firstUser.address || ""
                        });
                    } else {
                        console.log("No user found.");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        // }
    }, []);



    const handleChange = (event) => {
        setUserdata((prevDetails) => ({
            ...prevDetails,
            [event.target.name]: event.target.value,
        }));
    };

    const handleFileChange = (event) => {
        setUserdata((prevDetails) => ({
            ...prevDetails,
            img: event.target.files
        }));
    };
    const id = userData.userId;

    const handleUpdate = async (e) => {
        // e.preventDefault();
        Swal.fire({
            title: 'Are you sure update?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log(userData)
                const t = await userService.updateUser(userData,id);
                if (t != null) {
                    await Swal.fire(
                        'Update Success!',
                        'Your file has been update.',
                        'success'
                    )
                    return router.push("/yourprofile");

                }
            }
        })
    }
    console.log("Yourprofile  Email:", Email);
    console.log("Yourprofile  userData:", userData);
    console.log("Yourprofile  ID:", id);
    return (
        <div>
            <Head>
                <title>Profile Page</title>
                <link rel="stylesheet" type="text/css" href="style.css"/>
                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                />
            </Head>
            <Formik initialValues={userData} onSubmit={handleUpdate}>
                <form>
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
                                            />
                                        ))
                                    ) : (
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9l3x_T90wLTxFRNtGjTcdi-naKnFfjSIsg&usqp=CAU" // Replace default_image_url_here with the URL of your default image
                                            id="profile-image"
                                            className="rounded-circle mt-5"
                                        />
                                    )}

                                    {/*<img*/}
                                    {/*    id="profile-image"*/}
                                    {/*    className="rounded-circle mt-5"*/}
                                    {/*    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQF2psCzfbB611rnUhxgMi-lc2oB78ykqDGYb4v83xQ1pAbhPiB&usqp=CAU"*/}
                                    {/*/>*/}
                                    {/*<img*/}
                                    {/*    id="profile-image"*/}
                                    {/*    className="rounded-circle mt-5"*/}
                                    {/*    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQF2psCzfbB611rnUhxgMi-lc2oB78ykqDGYb4v83xQ1pAbhPiB&usqp=CAU"*/}
                                    {/*/>*/}
                                        <div >
                                            <span className="font-weight-bold">{userData.name}</span>
                                            <br/>
                                            <span className="text-black-50">{userData.email}</span>
                                        </div>

                                    <br/>
                                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                name="img"
                                                className="form-control"
                                                id="avatar" // Đổi id thành "image-upload"
                                                multiple
                                            />
                                            <label
                                                className="custom-file-label"
                                                htmlFor="avatar" // Sử dụng cùng một id cho htmlFor
                                            >
                                                Choose file
                                            </label>
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

                                            />
                                        </div>
                                    </div>
                                    <div className="mt-5 text-center">
                                        <button className="button button-2" type="submit">
                                            Save Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Formik>


            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        </div>
        // <div className={myorder.container}>
        //     <Head>
        //         <title>Detail</title>
        //         <meta charSet="utf-8"/>
        //         <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        //         <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,700" rel="stylesheet"/>
        //         <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet"
        //               integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
        //               crossOrigin="anonymous"/>
        //     </Head>
        //
        //     <section className="ftco-section">
        //         <div className="container">
        //
        //             <div className=" justify-content-center">
        //                 <div className="col-md-12 text-left mb-5">
        //                     <b>From: </b>
        //                     {orderDetailData.map((order, index) => (
        //                         <a key={index}>
        //                             Restaurant: {order.restaurant.name}
        //                             , Phone: {order.restaurant.tel}
        //                             , Address: {order.restaurant.address}
        //                         </a>
        //                     ))}
        //                     <br/>
        //                     <b>To: </b>
        //                     {orderDetailData.map((order, index) => (
        //                         <a key={index}>
        //                             Name: {order.name}
        //                             , Phone: {order.phone}
        //                             , Address: {order.address}
        //                         </a>
        //                     ))}
        //                     <br/>
        //                     <b>Status: </b>
        //                     {orderDetailData.map((order, index) => (
        //                         <a key={index}>
        //                             <a href="#">
        //                                 {getStatusText(order.status)}
        //                             </a>
        //                         </a>
        //                     ))}
        //                 </div>
        //             </div>
        //             <div className="row">
        //                 <div className="col-md-12">
        //                     <div className="table-wrap">
        //                         <table className="table table-striped">
        //                             <thead>
        //                             <tr>
        //                                 <th>STT</th>
        //                                 <th style={{textAlign: 'center', width: '10%'}}>Img</th>
        //                                 <th>Name Food</th>
        //                                 <th>Description</th>
        //                                 <th>Quantity</th>
        //                                 <th>Price</th>
        //                                 <th>Total</th>
        //                             </tr>
        //                             </thead>
        //                             <tbody>
        //                             {orderDetailData.map((order, index) => (
        //                                 <React.Fragment key={index}>
        //                                     {order.orderDetails.map((orderDetail, i) => (
        //                                         <tr key={i}>
        //                                             <td>{i + 1}</td> {/* STT tăng dần */}
        //                                             <td>
        //                                                 {orderDetail.product.images && orderDetail.product.images.map((image, ii) => (
        //                                                     <img
        //                                                         key={ii}
        //                                                         src={image.url}
        //                                                         width={90}
        //                                                         style={{
        //                                                             objectFit: 'cover',
        //                                                             borderRadius: 8,
        //                                                             marginRight: 5
        //                                                         }}
        //                                                         alt={`image-${ii}`}
        //                                                     />
        //                                                 ))}
        //                                             </td>
        //                                             <td>{orderDetail.product.name}</td>
        //                                             <td>{orderDetail.product.description}</td>
        //                                             <td>{orderDetail.qty}</td>
        //                                             <td>{new Intl.NumberFormat('en-US', {
        //                                                 style: 'currency',
        //                                                 currency: 'USD'
        //                                             }).format(orderDetail.price)}</td>
        //                                             <td>{new Intl.NumberFormat('en-US', {
        //                                                 style: 'currency',
        //                                                 currency: 'USD'
        //                                             }).format(orderDetail.total)}</td>
        //                                         </tr>
        //                                     ))}
        //                                     {/*Tônổng tien: {orderDetailData.totalMoney}*/}
        //                                 </React.Fragment>
        //                             ))}
        //                             <td>{" "}</td>
        //                             <td>{" "}</td>
        //                             <td>{" "}</td>
        //                             <td style={{textAlign: 'center', fontSize:'20px'}}><b>Total order value:</b>
        //                                 {orderDetailData.map((order, index) => (
        //                                     <a key={index}>
        //                                         <b style={{fontSize:'20px'}}>{new Intl.NumberFormat('en-US', {
        //                                             style: 'currency',
        //                                             currency: 'USD'
        //                                         }).format(order.totalMoney)}</b>
        //                                     </a>
        //                                 ))}
        //                             </td>
        //                             <td>{" "}</td>
        //                             <td>{" "}</td>
        //                             <td>{" "}</td>
        //                             </tbody>
        //                         </table>
        //                     </div>
        //                 </div>
        //             </div>
        //
        //
        //         </div>
        //
        //     </section>
        // </div>
    );
};

export default YourProfileFuntion;
