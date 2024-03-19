import CheckoutOrder from "@/src/components/CheckoutOrder";
import Layout from "@/src/layouts/Layout";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import cartService from "@/src/services/cartService";
import orderService from "@/src/services/orderService";
import Swal from "sweetalert2";
import {PayPalButtons} from "@paypal/react-paypal-js";
const Checkout = () => {
  const router = useRouter();
  const { id } = router.query;
  const [tab, setTab] = useState("card");


  const [reqCart] = useState({reqCart: id});
  const [cartData, setCartData] = useState(null);
  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    phone: "",
    notes: "",
    address: ""
  });

  useEffect(() => {
    if (id) {
      cartService
          .findCarts({ reqCart: id })
          .then((res) => {
            if (Array.isArray(res.data) && res.data.length > 0) {
              const firstCart = res.data[0];
              setCartData(firstCart);
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }, [id]);
  const handleSummitOrder = async () => {
    if (!cartData) return;

    if ( !buyerInfo.phone || !buyerInfo.address) {
      // Kiểm tra xem người dùng đã nhập đủ thông tin chưa
      await Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all required information.",
      });
      return;
    }

    // Tạo đơn hàng
    const orderData = {
      note: buyerInfo.notes,
      address: buyerInfo.address,
      name: buyerInfo.name,
      phone: buyerInfo.phone,
      totalMoney: cartData.subTotal,
      cartId: cartData.id,
      email:cartData.user.email

    };

    if (tab === "Cash") {
      // Thực hiện tạo đơn hàng khi thanh toán bằng tiền mặt
      try {
        await orderService.createOrder(orderData);
        await Swal.fire({
          icon: "success",
          title: "Order Created Successfully",
          text: "Your order has been placed successfully!",
        });
        router.push('/thank-you');
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Order Creation Failed",
          text: "Failed to create order. Please try again later.",
        });
        console.error("Failed to create order:", error);
      }
    } else {
      // Thực hiện chuyển hướng đến trang thanh toán (ví dụ: PayPal)
      // Bạn cần thay đổi URL bằng URL của trang thanh toán thực tế
      window.location.href = "https://www.paypal.com";
    }
  };

  console.log("Check out Order Now:",cartData)

  return (
    <Layout>
      <section
        className="hero-section about checkout gap"
        style={{ backgroundImage: "url(assets/img/background-3.png)" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="about-text pricing-table">
                <ul
                  className="crumbs d-flex"
                  data-aos="fade-up"
                  data-aos-delay={200}
                  data-aos-duration={300}
                >
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/restaurants">
                      <i className="fa-solid fa-right-long" />
                      Restaurants{" "}
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="fa-solid fa-right-long" />
                      Restaurant Сard
                    </Link>
                  </li>
                  <li className="two">
                    <Link href="/checkout">
                      <i className="fa-solid fa-right-long" />
                      Checkout
                    </Link>
                  </li>
                </ul>
                <h2
                  data-aos="fade-up"
                  data-aos-delay={300}
                  data-aos-duration={400}
                >
                  Checkout
                </h2>
                <p
                  data-aos="fade-up"
                  data-aos-delay={400}
                  data-aos-duration={500}
                >
                  Sit amet nisl purus in mollis nunc sed id semper. Condimentum
                  id venenatis a condimentum vitae sapien pellentesque.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* checkout-order */}
      <section className="gap">
        <div className="container">
          <div className="row">
            <div
                className="col-xl-5 col-lg-12"
                data-aos="flip-up"
                data-aos-delay={200}
                data-aos-duration={300}
            >
              <CheckoutOrder/>
            </div>
            <div
                className="offset-xl-1 col-xl-6 col-lg-12"
                data-aos="flip-up"
                data-aos-delay={300}
                data-aos-duration={400}
            >
              <form
                  onSubmit={(e) => e.preventDefault()} className="checkout-form"
              >
                <h4>Buyer information</h4>
                <input type="text" name="Name" placeholder="Full Name"
                       value={buyerInfo.name}
                       onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })}
                />
                {/*<input type="text" name="Email" placeholder="Email"*/}
                {/*       value={buyerInfo.email}*/}
                {/*       onChange={(e) => setBuyerInfo({ ...buyerInfo, emmail: e.target.value })}*/}
                {/*/>*/}
                <input type="text" name="Phone" placeholder="Phone"
                       value={buyerInfo.phone}
                       onChange={(e) => setBuyerInfo({...buyerInfo, phone: e.target.value})}
                />
                <input type="text" name="Notes" placeholder="Notes"
                       value={buyerInfo.notes}
                       onChange={(e) => setBuyerInfo({...buyerInfo, notes: e.target.value})}
                />

                {/*<div className="row">*/}
                {/*  <div className="col-lg-6">*/}
                {/*    <input type="text" name="E-mail" placeholder="E-mail" />*/}
                {/*  </div>*/}
                {/*  <div className="col-lg-6">*/}
                {/*    <input type="text" name="E-mail" placeholder="Phone" />*/}
                {/*  </div>*/}
                {/*</div>*/}
                <h4 className="two">Delivery addresses</h4>
                {/*<select className="nice-select Advice">*/}
                {/*  <option>California</option>*/}
                {/*  <option>California 1</option>*/}
                {/*  <option>California 2</option>*/}
                {/*  <option>California 3</option>*/}
                {/*  <option>California 4</option>*/}
                {/*</select>*/}
                <input type="text" name="Name" placeholder="Addres"
                       value={buyerInfo.address}
                       onChange={(e) => setBuyerInfo({...buyerInfo, address: e.target.value})}
                />
                {/*<div className="row">*/}
                {/*  <div className="col-lg-6">*/}
                {/*    <input*/}
                {/*      type="text"*/}
                {/*      name="E-mail"*/}
                {/*      placeholder="House number"*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*  <div className="col-lg-6">*/}
                {/*    <input*/}
                {/*      type="number"*/}
                {/*      name="E-mail"*/}
                {/*      placeholder="Apartment number"*/}
                {/*    />*/}
                {/*    <span>*dispensable</span>*/}
                {/*  </div>*/}
                {/*</div>*/}
                <h4 className="two">Payment method</h4>
                <div
                    className="nav nav-pills me-3"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                >
                  <button
                      className={`nav-link ${tab === "card" ? "active" : ""}`}
                      onClick={() => setTab("card")}
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                  >
                    Card
                  </button>
                  <button
                      className={`nav-link ${tab === "Cash" ? "active" : ""}`}
                      onClick={() => setTab("Cash")}
                      id="v-pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                  >
                    Cash
                  </button>
                </div>
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                      className={`tab-pane fade ${
                          tab === "card" ? "show active" : ""
                      }`}
                      id="v-pills-home"
                      role="tabpanel"
                      aria-labelledby="v-pills-home-tab"
                  >
                    <label>
                      <input
                          type="radio"
                          name="test"
                          defaultValue="small"
                          defaultChecked
                      />
                      <img alt="checkbox-img" src="assets/img/checkbox-1.png"/>
                    </label>
                    <label>
                      <input type="radio" name="test" defaultValue="big"/>
                      <img alt="checkbox-img" src="assets/img/checkbox-2.png"/>
                    </label>
                    <label>
                      <input type="radio" name="test" defaultValue="big"/>
                      <img alt="checkbox-img" src="assets/img/checkbox-3.png"/>
                    </label>
                    <input
                        type="number"
                        name="Name"
                        placeholder="Card number"
                    />
                    <div className="row">
                      <div className="col-lg-6">
                        <input
                            type="text"
                            name="E-mail"
                            placeholder="Expiration Date"
                        />
                      </div>
                      <div className="col-lg-6">
                        <input type="password" placeholder="CVV"/>
                      </div>
                    </div>
                    <label className="checkbox-one">
                      Save my payments details for future purchases
                      <input type="checkbox" defaultChecked="checked"/>
                      <span className="checkmark"/>
                    </label>
                    <div
                        className="tab-pane fade"
                        id="v-pills-profile"
                        role="tabpanel"
                        aria-labelledby="v-pills-profile-tab"
                    ></div>
                  </div>
                </div>
                <button className="button-price" onClick={handleSummitOrder}>Send</button>

              </form>
            </div>
            {/*<div>*/}


            {/*  <PayPalButtons*/}
            {/*      options={{*/}
            {/*        "vault": true,*/}
            {/*        "client-id": "AR86XShHEggIM0YzMF6FdymWDWPkpjh7mx-PDVlwis1Ve0HRniLtcaaIjPLMDDw-MZPi89PNeLAmuKrd"*/}
            {/*      }}*/}

            {/*      // amount={contract.giatrihopdong}*/}
            {/*      // shippingPreference="NO_SHIPPING" // default is np"GET_FROM_FILE"*/}
            {/*      // onSuccess={successPaymentHandler}*/}

            {/*  />*/}

            {/*</div>*/}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Checkout;
