import myorder from "@/pages/myorder";
import Head from "next/head";
import {useEffect, useState} from "react";
import orderService from "@/src/services/orderService";
import Link from "next/link";

const MyOrderFuntion = ({sidebar}) => {
    const [orderData, setOrderData] = useState([]);
    useEffect(() => {
        orderService.getOrders()
            .then((res) => {
                console.log(res.data);
                if (res.data.length > 0) {
                    setOrderData(res.data);
                } else {
                    console.log("No user found.");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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

    // const getStatusText = (status) => {
    //     switch (status) {
    //         case 1:
    //             return "Chờ xác nhận đơn hàng";
    //         case 2:
    //             return "Đã xác nhận đơn hàng chưa thanh toán";
    //         case 3:
    //             return "Xác nhận đã thanh toán";
    //         case 4:
    //             return "Đang vận chuyển";
    //         case 5:
    //             return "Đã hoàn thành";
    //         case 0:
    //             return "Đã huỷ";
    //         default:
    //             return "Unknown";
    //     }
    // };

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
                <title>My Orders</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,700" rel="stylesheet"/>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
                      crossOrigin="anonymous"/>
            </Head>

            <section className="ftco-section">
                <div className="container">

                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            {/* Your content here */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-wrap">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Invoce</th>
                                        <th>Customer</th>
                                        <th>Email</th>
                                        <th>Restaurant</th>
                                        <th>Delivery address</th>
                                        <th>Price</th>
                                        <th>Notes</th>
                                        <th>OrderDetail</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orderData.map((order, index) => (
                                        <tr key={index}>
                                            <th scope="row">{order.id}</th>
                                            <td>{order.name}</td>
                                            <td>{order.email}</td>
                                            <td>{order.restaurant.name}</td>
                                            <td>{order.address}</td>
                                            <td>{new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            }).format(order.totalMoney)}</td>
                                            <td>{order.note}</td>

                                            <td>

                                                <Link href={`/orderdetail?id=${order.id}`}>
                                                    <button className={"btn btn-outline-dark"}>
                                                        Details
                                                    </button>
                                                </Link>
                                            </td>
                                            {/*{order.orderDetails.map((orderDetail, index) => (*/}
                                            {/*    <td key={index}>*/}
                                            {/*        <Link href={`/orderdetail?id=${orderDetail.id}` }>*/}
                                            {/*            <button className={"btn btn-outline-dark"}>*/}
                                            {/*                Details*/}
                                            {/*            </button>*/}
                                            {/*        </Link>*/}
                                            {/*    </td>*/}
                                            {/*))}*/}

                                            <td><a href="#" className={`btn ${getStatusClass(order.status)}`}>
                                                {getStatusText(order.status)}
                                            </a></td>
                                        </tr>
                                    ))}
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

export default MyOrderFuntion;
