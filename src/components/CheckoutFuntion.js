import { useEffect, useState } from "react";
import RestaurantService from "@/src/services/restaurantService";
import cartService from "@/src/services/cartService";
import { useCart } from "@/src/components/CartContext";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import cartItemService from "@/src/services/cartItemService";



const CheckoutFuntion = ({ sidebar }) => {
    const router = useRouter();

    // CAC HAM VIET GOI APT VIET HET TRONG CartContext DE QUAN LY
    const { cartData, setCartData } = useCart();
    const [cartIdToDelete, setCartIdToDelete] = useState(null);
    const [cartItemIdToDelete, setCartItemIdToDelete] = useState(null);


    const [expandedIndex, setExpandedIndex] = useState(null);


    // total price
    const [subTotal, setSubTotal] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        setSubTotal(subTotal_());
        setTotalPrice(Number(subTotal_()).toFixed(2));
        localStorage.setItem(
            "munfirm",
            JSON.stringify({ subTotal, totalPrice, cartData })
        );
    });

    const subTotal_ = () => {
        return cartData
            .map((item) => item.price * item.quantity)
            .reduce((prev, next) => prev + next, 0)
            .toFixed(2);
    };


    const updateQuantity = async (item, type, value) => {
        let findCartItem = cartData.find((cart, i) => i === item);
        findCartItem.quantity =
            type == "-"
                ? findCartItem.quantity === 1
                    ? 1
                    : findCartItem.quantity - 1
                : type == "+"
                    ? findCartItem.quantity + 1
                    : value;

        // Update the cart item using the service
        try {
            const updatedCartItem = await cartItemService.updateCartItems(findCartItem);
            if (updatedCartItem) {
                setCartData([...cartData]);
            } else {
                console.error('Failed to update cart item');
            }
        } catch (error) {
            console.error('There was an error updating the cart item:', error);
        }
    };





    const handleDeleteCart = async (cartId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it'
            });

            if (result.isConfirmed) {
                // Không cần gọi setCartData ở đây
                await cartService.deleteCart(cartId);
                setCartIdToDelete(cartId);
            }
        } catch (error) {
            console.error("Failed to delete cart: ", error);
        }
    };

    useEffect(() => {
        // Kiểm tra nếu cartIdToDelete đã được định nghĩa
        if (cartIdToDelete !== null) {
            // Cập nhật cartData sau khi xóa cart
            setCartData(prevCartData => prevCartData.filter(cart => cart.id !== cartIdToDelete));
            // Reset cartIdToDelete về null sau khi đã xử lý
            setCartIdToDelete(null);
        }
    }, [cartData, cartIdToDelete]);

    const handleDeleteCartItem = async (cartItemId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it'
            });

            if (result.isConfirmed) {
                await cartItemService.deleteCartItems(cartItemId);
                setCartItemIdToDelete(cartItemId);
            }
        } catch (error) {
            console.error("Failed to delete cart: ", error);
        }
    };

    useEffect(() => {
        // Kiểm tra nếu cartItemIdToDelete đã được định nghĩa
        if (cartItemIdToDelete !== null) {
            setCartData(prevCartData =>
                prevCartData.map(cart => ({
                    ...cart,
                    cartItems: cart.cartItems.filter(item => item.id !== cartItemIdToDelete)
                }))
            );
            setCartItemIdToDelete(null);
        }
    }, [cartData, cartItemIdToDelete]);




    return (
        <>
            <div className="checkout-order">

                <div className="title-checkout">
                    <h3>Your order:</h3>
                    {!sidebar && <h6></h6>}
                </div>
                {cartData.map((cart, i) => (
                    <div key={cart.id}>
                        <div
                            className="banner-wilmington menu"
                            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                            style={{
                                overflow: 'hidden',
                                transition: 'max-height 0.3s ease',
                                maxHeight: expandedIndex === i ? 'none' : 'none', // Sử dụng 'none' để auto chiều cao
                                cursor: 'pointer', // Thay đổi kiểu con trỏ khi hover
                                position: 'relative', // Thiết lập vị trí tương đối cho div cha
                            }}
                        >
                            {/*<img alt="logo" src="assets/img/logo-s.jpg"/>*/}
                            {cart.restaurant.images &&
                                cart.restaurant.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={`gif-${index}`}
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                ))}
                            <h6>{cart.restaurant.name}</h6>
                            <button
                                type="button" className="btn btn-outline-warning"
                                onClick={() => handleDeleteCart(cart.id)}
                                style={{
                                    position: 'absolute', // Đặt vị trí tuyệt đối cho phần tử
                                    top: 0, // Căn theo trục y ở đỉnh của div cha
                                    right: 0, // Căn theo trục x bên phải của div cha
                                    marginRight: '10px', // Khoảng cách từ phần tử đến biên phải của div cha
                                    marginTop: '5%', // Khoảng cách từ phần tử đến biên trên của div cha (nếu cần)
                                    cursor: 'pointer', // Thay đổi kiểu con trỏ khi hover
                                }}
                            >
                                <i className="closeButton fa-solid fa-xmark"

                                />
                            </button>

                        </div>

                        {expandedIndex === i && (
                            <div className="dropdown-content"
                                style={{ transition: 'opacity 0.3s ease', opacity: '1' }}
                            >
                                <>
                                    <ul>
                                        {cart.cartItems.map((item, j) => (
                                            <li className="price-list" key={item.id}>
                                                <i
                                                    className="closeButton fa-solid fa-xmark"

                                                    onClick={() => handleDeleteCartItem(item.id)}

                                                />
                                                <div className="counter-container">
                                                    <div className="counter-food">
                                                        {/*<img alt="food" src={item.product.image}/>*/}
                                                        {item.product.images && item.product.images.map((image, index) => (
                                                            <img
                                                                key={index}
                                                                src={image.url}
                                                                alt={`gif-${index}`}
                                                                style={{ width: "30%", height: "auto" }}
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
                                                            <button
                                                                className="qty-count qty-count--minus"
                                                                data-action="minus"
                                                                type="button"
                                                                onClick={() => updateQuantity(i, "-")}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                className="product-qty"
                                                                type="number"
                                                                value={item.qty}
                                                                onChange={(e) =>
                                                                    updateQuantity(i, "value", Number(e.target.value))
                                                                }
                                                                name="quantity"
                                                            />
                                                            <button
                                                                className="qty-count qty-count--add"
                                                                data-action="add"
                                                                type="button"
                                                                onClick={() => updateQuantity(i, "+")}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <span>Quantity</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="totel-price">
                                        <span>Total order:</span>
                                        <h5>{cart.cartItems.length}</h5>
                                    </div>
                                    <div className="totel-price">
                                        <span>To pay:</span>
                                        {/*<h2>$ {Number(totalPrice).toFixed(2)}</h2>*/}
                                        <h2>{new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        }).format(cart.subTotal)}</h2>
                                    </div>
                                    <br />
                                    <button className="button button-2 ml-auto" onClick={() => handleOrderClick(cart.id)}>
                                        Order Now
                                    </button>
                                </>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </>

    );
};
export default CheckoutFuntion;
