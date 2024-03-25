import React from "react";
import myorder from "@/pages/myorder";
import Head from "next/head";
import {useEffect, useState} from "react";
import orderService from "@/src/services/orderService";
import Link from "next/link";
import {useRouter} from "next/router";

const MyOrderDetailFuntion = ({sidebar}) => {
    const router = useRouter();
    const [img, setFile] = useState(null);
    const {id} = router.query;
    const [reqOrderDetail] = useState({id: id});
    const [orderDetailData, setOrderDetailData] = useState([{
        name: "",
        email: "",
        createDate: "",
        totalMoney: "",
        status: "",
        note: "",
        address: "",
        phone: "",
        restaurant: "",
        users: "",
        orderDetails: [],
        img: null
    }]);
    useEffect(() => {
        orderService.findOrders(reqOrderDetail)
            .then((res) => {
                console.log(res.data);
                if (res.data.length > 0) {
                    const firstRestaurant = res.data;
                    setOrderDetailData(firstRestaurant);
                } else {
                    console.log("No user found.");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    console.log("orderDetailData:", orderDetailData);


    const getStatusText = (status) => {
        switch (status) {
            case 1:
                return "Waiting for order confirmation";
            case 2:
                return "Order confirmed, payment pending";
            case 3:
                return "Payment confirmed";
            case 4:
                return "Shipping";
            case 5:
                return "Completed";
            case 0:
                return "Cancelled";
            default:
                return "Unknown";
        }
    };
    const getStatusClass = (status) => {
        switch (status) {
            case 1:
                return "btn-warning";
            case 2:
                return "btn-primary";
            case 3:
                return "btn-success";
            case 4:
                return "btn-secondary";
            case 5:
                return "btn-dark";
            case 0:
                return "btn-danger";
            default:
                return "";
        }
    };

    return (
        <div className={myorder.container}>
            <Head>
                <title>Detail</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,700" rel="stylesheet"/>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
                      crossOrigin="anonymous"/>
            </Head>

            <section className="ftco-section">
                <div className="container">

                    <div className=" justify-content-center">
                        <div className="col-md-12 text-left mb-5">
                            <b>From: </b>
                            {orderDetailData.map((order, index) => (
                                <a key={index}>
                                    Restaurant: {order.restaurant.name}
                                    , Phone: {order.restaurant.tel}
                                    , Address: {order.restaurant.address}
                                </a>
                            ))}
                            <br/>
                            <b>To: </b>
                            {orderDetailData.map((order, index) => (
                                <a key={index}>
                                    Name: {order.name}
                                    , Phone: {order.phone}
                                    , Address: {order.address}
                                </a>
                            ))}
                            <br/>
                            <b>Status: </b>
                            {orderDetailData.map((order, index) => (
                                <a key={index}>
                                    <a href="#">
                                        {getStatusText(order.status)}
                                    </a>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-wrap">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th style={{textAlign: 'center', width: '10%'}}>Img</th>
                                        <th>Name Food</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orderDetailData.map((order, index) => (
                                        <React.Fragment key={index}>
                                            {order.orderDetails.map((orderDetail, i) => (
                                                <tr key={i}>
                                                    <td>{i + 1}</td> {/* STT tăng dần */}
                                                    <td>
                                                        {orderDetail.product.images && orderDetail.product.images.map((image, ii) => (
                                                            <img
                                                                key={ii}
                                                                src={image.url}
                                                                width={90}
                                                                style={{
                                                                    objectFit: 'cover',
                                                                    borderRadius: 8,
                                                                    marginRight: 5
                                                                }}
                                                                alt={`image-${ii}`}
                                                            />
                                                        ))}
                                                    </td>
                                                    <td>{orderDetail.product.name}</td>
                                                    <td>{orderDetail.product.description}</td>
                                                    <td>{orderDetail.qty}</td>
                                                    <td>{new Intl.NumberFormat('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD'
                                                    }).format(orderDetail.price)}</td>
                                                    <td>{new Intl.NumberFormat('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD'
                                                    }).format(orderDetail.total)}</td>
                                                </tr>
                                            ))}
                                            {/*Tônổng tien: {orderDetailData.totalMoney}*/}
                                        </React.Fragment>
                                    ))}
                                    <td>{" "}</td>
                                    <td>{" "}</td>
                                    <td>{" "}</td>
                                    <td style={{textAlign: 'center', fontSize:'20px'}}><b>Total order value:</b>
                                        {orderDetailData.map((order, index) => (
                                            <a key={index}>
                                                <b style={{fontSize:'20px'}}>{new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD'
                                                }).format(order.totalMoney)}</b>
                                            </a>
                                        ))}
                                    </td>
                                    <td>{" "}</td>
                                    <td>{" "}</td>
                                    <td>{" "}</td>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                </div>

            </section>
        </div>
    );
};

export default MyOrderDetailFuntion;
