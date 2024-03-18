import { useEffect, useState } from "react";
import cartService from "@/src/services/cartService";
import {useRouter} from "next/router";
import Swal from "sweetalert2";

const CheckoutOrder = () => {
    const router = useRouter();
    const { id } = router.query;

    const [reqCartItem] = useState({reqCartItem: id});
    let [cartData, setCartData] = useState([]);

    useEffect(() => {
        cartService.findCarts(reqCartItem)
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    const firstCart = res.data[0];
                    setCartData([firstCart]);

                };

            })
            .catch((err) => {
                console.log(err);
            });

    }, []);
    console.log("Check out Order:",cartData)

    return (
        <>
            <div className="checkout-order">

                <div className="title-checkout">
                    <h3>Your order now:</h3>
                    {/*{!sidebar && <h6></h6>}*/}
                </div>
                {cartData.map((cart, i) => (
                    <div key={cart.id}>
                        <div
                            className="banner-wilmington menu"

                        >
                            {/*<img alt="logo" src="assets/img/logo-s.jpg"/>*/}
                            {cart.restaurant.images &&
                                cart.restaurant.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={`gif-${index}`}
                                        style={{width: '50px', height: '50px'}}
                                    />
                                ))}
                            <h6>{cart.restaurant.name}</h6>


                        </div>

                            <div className="dropdown-content"
                                 style={{transition: 'opacity 0.3s ease', opacity: '1'}}
                            >
                                <>
                                    <ul>
                                        {cart.cartItems.map((item, j) => (
                                            <li className="price-list" key={item.id}>

                                                <div className="counter-container">
                                                    <div className="counter-food">
                                                        {/*<img alt="food" src={item.product.image}/>*/}
                                                        {item.product.images && item.product.images.map((image, index) => (
                                                            <img
                                                                key={index}
                                                                src={image.url}
                                                                alt={`gif-${index}`}
                                                                style={{width: "20%", height: "auto"}}
                                                            />
                                                        ))}
                                                        <h4>{item.product.name}</h4>
                                                    </div>
                                                    {/*<h3>${item.product.price}</h3>*/}
                                                    <h3>{new Intl.NumberFormat('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD'
                                                    }).format(item.product.price)}</h3>
                                                </div>
                                                <div className="price">
                                                    <div>
                                                        {/*<h2>${item.total}</h2>*/}
                                                        <h2>{new Intl.NumberFormat('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD'
                                                        }).format(item.total)}</h2>
                                                        <span>Sum</span>
                                                    </div>
                                                    <div>
                                                        <div className="qty-input">
                                                            {/*<input*/}
                                                            {/*    className="product-qty"*/}
                                                            {/*    type="number"*/}
                                                            {/*    value={item.qty}*/}
                                                            {/*    name="quantity"*/}
                                                            {/*/>*/}
                                                            <h3>{item.qty}</h3>

                                                        </div>
                                                        <span>Quantity</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="totel-price">
                                        <span>Total order:</span>
                                        <h3>{cart.cartItems.length}</h3>
                                    </div>
                                    <div className="totel-price">
                                        <span>To pay:</span>
                                        <h2>{new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        }).format(cart.subTotal)}</h2>
                                    </div>
                                    <br/>

                                </>
                            </div>
                    </div>
                ))}
            </div>

        </>

    );
};
export default CheckoutOrder;
