import Link from "next/link";
import { useState } from "react";
import CheckoutFuntion from "../components/CheckoutFuntion";
import MobileMenu from "./MobileMenu";
import { handleLogoutRedux } from "../redux/actions/userAction";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
import Checkout from "@/pages/checkout";
import userService from "@/src/services/userService";
import jwt from "jsonwebtoken";


const Header = ({ extraClass }) => {
  // const [userData, setUserdata] = useState({
  //   userId:"",
  //   email: "",
  //   name: "",
  //   tel: "",
  //   address: "",
  //   img: null
  // });
  const [userData, setUserdata] = useState({
    userId:"",
    email: "",
    name: "",
    tel: "",
    address: "",
    images : ""
  });
  // const Email = localStorage.getItem('email');
  // const [reqEmail] = useState({email:Email});


  // const token = localStorage.getItem('jwt');
  // const decodedToken = jwt.decode(token);
  // const userId = decodedToken ? decodedToken.id : null;

  // useEffect(() => {
  //   // if (email) {
  //   userService.findUsers(userId)
  //       .then((res) => {
  //         console.log(res.data);
  //         if (res.data.length > 0) {
  //           const firstUser = res.data[0];
  //           setUserdata({
  //             // userId: firstUser.id || "",
  //             email: firstUser.email ||  "",
  //             name: firstUser.name ||  "",
  //             tel: firstUser.tel ||  "",
  //             address: firstUser.address ||  "",
  //             img: firstUser.images ||  ""
  //           });
  //         } else {
  //           console.log("No user found.");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   // }
  // }, []);

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
              address: firstUser.address || "",
              images: firstUser.images || ""
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
  const onClick = (e) => {
    const body = document.querySelector("body");
    body.classList.toggle("active");
    e.preventDefault();
  };

  // mobile menu
  const [mobileToggle, setMobileToggle] = useState(false);


  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.account);
  const userRole = user ? user.Role : null;

  const handleLogOut = async () => {
    await dispatch(handleLogoutRedux());
    // Không chuyển hướng ngay lập tức, để useEffect xử lý
  }

  const handleLogIn = () => {
    if (user !== null) {
      router.push("/authenticate");
    }
  }
  const handleRegister = () => {
    if (user !== null) {
      router.push("/register");
    }
  }

  useEffect(() => {
    if (user && user.auth === false) {
      // Xử lý chỉ chuyển hướng nếu không phải là chuyển từ handleLogOut
      if (router.pathname !== "/") {
        router.push("/");
        toast.success("Log out success!");
      }
    }
  }, [user, router.pathname]);

  console.log(">>>Check user: ", user);
  console.log(">>>Check userData: ", userData);




  return (
    <header className={`${extraClass} fixed-top bg-light`}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-2">
            <div className="header-style">
              <Link href="/">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={163}
                    height={38}
                    viewBox="0 0 163 38"
                >
                  <g id="Logo" transform="translate(-260 -51)">
                    <g
                        id="Logo-2"
                        data-name="Logo"
                        transform="translate(260 51)"
                    >
                      <g id="Elements">
                        <path
                            id="Path_1429"
                            data-name="Path 1429"
                            d="M315.086,140.507H275.222v-.894c0-11.325,8.941-20.538,19.933-20.538s19.931,9.213,19.931,20.538Z"
                            transform="translate(-270.155 -115.396)"
                            fill="#f29f05"
                        />
                        <path
                            id="Path_1430"
                            data-name="Path 1430"
                            d="M301.13,133.517a1.488,1.488,0,0,1-1.394-.994,11.361,11.361,0,0,0-10.583-7.54,1.528,1.528,0,0,1,0-3.055,14.353,14.353,0,0,1,13.37,9.527,1.541,1.541,0,0,1-.875,1.966A1.444,1.444,0,0,1,301.13,133.517Z"
                            transform="translate(-264.176 -113.935)"
                            fill="#fff"
                        />
                        <path
                            id="Path_1431"
                            data-name="Path 1431"
                            d="M297.343,146.544a14.043,14.043,0,0,1-13.837-14.211h2.975a10.865,10.865,0,1,0,21.723,0h2.975A14.043,14.043,0,0,1,297.343,146.544Z"
                            transform="translate(-266.247 -108.544)"
                            fill="#363636"
                        />
                        <path
                            id="Path_1432"
                            data-name="Path 1432"
                            d="M302.183,132.519a7.064,7.064,0,1,1-14.122,0Z"
                            transform="translate(-264.027 -108.446)"
                            fill="#363636"
                        />
                        <path
                            id="Path_1433"
                            data-name="Path 1433"
                            d="M320.332,134.575H273.3a1.528,1.528,0,0,1,0-3.055h47.033a1.528,1.528,0,0,1,0,3.055Z"
                            transform="translate(-271.815 -108.923)"
                            fill="#f29f05"
                        />
                        <path
                            id="Path_1434"
                            data-name="Path 1434"
                            d="M289.154,123.4a1.507,1.507,0,0,1-1.487-1.528v-3.678a1.488,1.488,0,1,1,2.975,0v3.678A1.508,1.508,0,0,1,289.154,123.4Z"
                            transform="translate(-264.154 -116.667)"
                            fill="#f29f05"
                        />
                        <path
                            id="Path_1435"
                            data-name="Path 1435"
                            d="M284.777,138.133H275.3a1.528,1.528,0,0,1,0-3.055h9.474a1.528,1.528,0,0,1,0,3.055Z"
                            transform="translate(-270.84 -107.068)"
                            fill="#363636"
                        />
                        <path
                            id="Path_1436"
                            data-name="Path 1436"
                            d="M284.8,141.691h-6.5a1.528,1.528,0,0,1,0-3.055h6.5a1.528,1.528,0,0,1,0,3.055Z"
                            transform="translate(-269.379 -105.218)"
                            fill="#363636"
                        />
                      </g>
                    </g>
                    <text
                        id="Quickeat"
                        transform="translate(320 77)"
                        fill="#363636"
                        fontSize={20}
                        fontFamily="Poppins"
                        fontWeight={700}
                    >
                      <tspan x={0} y={0}>
                        QUICK
                      </tspan>
                      <tspan y={0} fill="#f29f05">
                        EAT
                      </tspan>
                    </text>
                  </g>
                </svg>
              </Link>
              <div className="extras bag">
                <a href="#" className="menu-btn" onClick={(e) => onClick(e)}>
                  <i className="fa-solid fa-bag-shopping"/>
                </a>
                <div className="bar-menu" onClick={() => setMobileToggle(true)}>
                  <i className="fa-solid fa-bars"/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <nav className="navbar">
              <ul className="navbar-links">
                <li className="navbar-dropdown">
                  <Link href="/">Home</Link>
                </li>
                <li className="navbar-dropdown">
                  <Link href="restaurants">Restaurants</Link>
                  {/*<div className="dropdown">*/}
                  {/*  <Link href="restaurants">Restaurants</Link>*/}
                    {/*<Link href="restaurant-card">Restaurant Card</Link>*/}
                    {/*<Link href="Carts">Carts</Link>*/}
                  {/*</div>*/}
                </li>
                <li className="navbar-dropdown">
                  <Link href="#">Pages</Link>
                  <div className="dropdown">
                    <Link href="blog">Blog</Link>
                    <Link href="single-blog">Single Blog</Link>
                    <Link href="services">Services</Link>
                    <Link href="faq">FAQ</Link>
                    <Link href="pricing-table">Pricing Table</Link>
                    <Link href="become-partner">Become A Partner</Link>
                    <Link href="404">404</Link>
                  </div>
                </li>
                <li className="navbar-dropdown">
                  <Link href="contacts">Contacts</Link>
                </li>
                <li className="navbar-dropdown">
                  <Link href="about">About Us</Link>
                </li>

              </ul>
              {/*<ul className="navbar-links">*/}
              {/*  <li className="navbar-dropdown">*/}
              {/*    <div*/}
              {/*        className={"navbar-item"}*/}
              {/*        style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}*/}
              {/*    >*/}
              {/*      <img src="/assets/img/imageTheme/author-img-2.jpg" alt="Avatar"/>*/}
              {/*      <Link href="/">*/}
              {/*        <label>*/}
              {/*          Welcome*/}
              {/*        </label>*/}
              {/*        <br/>*/}
              {/*        Admin*/}

              {/*      </Link>*/}
              {/*      <div className="dropdown">*/}

              {/*        <Link href="/" legacyBehavior>*/}
              {/*          <>*/}
              {/*            <div>*/}
              {/*              {user && user.auth === true ? (*/}
              {/*                  <>*/}
              {/*                    <a href="Yourprofile">Your Profile</a>*/}
              {/*                    <a href="myorder">My Order</a>*/}
              {/*                    <a onClick={handleLogOut}>Logout</a>*/}
              {/*                  </>*/}
              {/*              ) : (*/}
              {/*                  <>*/}
              {/*                    <a onClick={handleLogIn}>Login</a>*/}
              {/*                    <a onClick={handleRegister}>Register</a>*/}
              {/*                  </>*/}
              {/*              )}*/}
              {/*              <style jsx>{`*/}
              {/*                div:hover {*/}
              {/*                  cursor: pointer;*/}
              {/*                }*/}
              {/*              `}</style>*/}
              {/*            </div>*/}
              {/*          </>*/}
              {/*        </Link>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </li>*/}
              {/*</ul>*/}
            </nav>
          </div>

          <div className="col-lg-2">
            <div className="extras bag">
              <a
                  href="#"
                  id="desktop-menu"
                  className="menu-btn"
                  onClick={(e) => onClick(e)}
              >
                <i className="fa-solid fa-bag-shopping"/>
              </a>
              <Link href="/Carts" className="button button-2">
                Order Now
              </Link>
            </div>
          </div>
          <div className="col-lg-2">
            <nav className="navbar">
              <ul className="navbar-links">
                <li className="navbar-dropdown">
                  <div
                      className={"navbar-item"}
                      style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}
                  >
                    {userData.images && userData.images.length > 0 ? (
                        userData.images.map((image, index) => (
                            <img
                                height="50px"
                                key={index}
                                src={image.url}
                                id="profile-image"
                                className="rounded-circle"
                                alt="Avatar"
                            />
                        ))
                    ) : (
                        <img
                            height="50px"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9l3x_T90wLTxFRNtGjTcdi-naKnFfjSIsg&usqp=CAU" // Replace default_image_url_here with the URL of your default image
                            id="profile-image"
                            className="rounded-circle"
                        />
                    )}
                    {/*<img src="/assets/img/imageTheme/author-img-2.jpg" alt="Avatar"/>*/}
                    <Link href="/">
                      <label>
                        <b>Welcome</b>
                      </label>
                      <br/>
                      {user.email}
                    </Link>
                    <div className="dropdown">

                      <Link href="/" legacyBehavior>
                        <>
                          <div>
                            {user && user.auth === true ? (
                                <>
                                  <a href="yourprofile">Your Profile</a>
                                  <a href="myorder">My Order</a>
                                  <a onClick={handleLogOut}>Logout</a>
                                </>
                            ) : (
                                <>
                                  <a onClick={handleLogIn}>Login</a>
                                  <a onClick={handleRegister}>Register</a>
                                </>
                            )}
                            <style jsx>{`
                              div:hover {
                                cursor: pointer;
                              }
                            `}</style>
                          </div>
                        </>
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>


          <div className="menu-wrap">
            <div className="menu-inner ps ps--active-x ps--active-y">
              <span className="menu-cls-btn" onClick={(e) => onClick(e)}>
                <i className="cls-leftright"/>
                <i className="cls-rightleft"/>
              </span>
              <CheckoutFuntion sidebar/>
            </div>
          </div>
          <div
              className={`mobile-nav hmburger-menu ${mobileToggle ? "open" : ""}`}
              id="mobile-nav"
              style={{display: "block"}}
          >
            <div className="res-log">
              <Link href="/">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={163}
                    height={38}
                    viewBox="0 0 163 38"
                >
                  <g id="Logo-m" transform="translate(-260 -51)">
                    <g
                        id="Logo-2-m"
                        data-name="Logo"
                        transform="translate(260 51)"
                    >
                      <g id="Elements-m">
                        <path
                            id="Path_3429"
                            data-name="Path 3429"
                            d="M315.086,140.507H275.222v-.894c0-11.325,8.941-20.538,19.933-20.538s19.931,9.213,19.931,20.538Z"
                            transform="translate(-270.155 -115.396)"
                            fill="#f29f05"
                        />
                        <path
                            id="Path_3430"
                            data-name="Path 3430"
                            d="M301.13,133.517a1.488,1.488,0,0,1-1.394-.994,11.361,11.361,0,0,0-10.583-7.54,1.528,1.528,0,0,1,0-3.055,14.353,14.353,0,0,1,13.37,9.527,1.541,1.541,0,0,1-.875,1.966A1.444,1.444,0,0,1,301.13,133.517Z"
                            transform="translate(-264.176 -113.935)"
                            fill="#fff"
                        />
                        <path
                            id="Path_3431"
                            data-name="Path 3431"
                            d="M297.343,146.544a14.043,14.043,0,0,1-13.837-14.211h2.975a10.865,10.865,0,1,0,21.723,0h2.975A14.043,14.043,0,0,1,297.343,146.544Z"
                            transform="translate(-266.247 -108.544)"
                            fill="#363636"
                        />
                        <path
                            id="Path_3432"
                            data-name="Path 3432"
                            d="M302.183,132.519a7.064,7.064,0,1,1-14.122,0Z"
                            transform="translate(-264.027 -108.446)"
                            fill="#363636"
                        />
                        <path
                            id="Path_3433"
                            data-name="Path 3433"
                            d="M320.332,134.575H273.3a1.528,1.528,0,0,1,0-3.055h47.033a1.528,1.528,0,0,1,0,3.055Z"
                            transform="translate(-271.815 -108.923)"
                            fill="#f29f05"
                        />
                        <path
                            id="Path_3434"
                            data-name="Path 3434"
                            d="M289.154,123.4a1.507,1.507,0,0,1-1.487-1.528v-3.678a1.488,1.488,0,1,1,2.975,0v3.678A1.508,1.508,0,0,1,289.154,123.4Z"
                            transform="translate(-264.154 -116.667)"
                            fill="#f29f05"
                        />
                        <path
                            id="Path_3435"
                            data-name="Path 3435"
                            d="M284.777,138.133H275.3a1.528,1.528,0,0,1,0-3.055h9.474a1.528,1.528,0,0,1,0,3.055Z"
                            transform="translate(-270.84 -107.068)"
                            fill="#363636"
                        />
                        <path
                            id="Path_3436"
                            data-name="Path 3436"
                            d="M284.8,141.691h-6.5a1.528,1.528,0,0,1,0-3.055h6.5a1.528,1.528,0,0,1,0,3.055Z"
                            transform="translate(-269.379 -105.218)"
                            fill="#363636"
                        />
                      </g>
                    </g>
                    <text
                        id="Quickeat-m"
                        transform="translate(320 77)"
                        fill="#363636"
                        fontSize={20}
                        fontFamily="Poppins"
                        fontWeight={700}
                    >
                      <tspan x={0} y={0}>
                        QUICK
                      </tspan>
                      <tspan y={0} fill="#f29f05">
                        EAT
                      </tspan>
                    </text>
                  </g>
                </svg>
              </Link>
            </div>
            <MobileMenu/>
            <a href="#" id="res-cross" onClick={() => setMobileToggle(false)}/>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
