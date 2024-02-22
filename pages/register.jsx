import React, {useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {useDispatch} from "react-redux";


export default function Register() {
    const dispath = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowpassword, setIsShowPassword] = useState(false);


    const handleRegister = () =>{

    }

    return (
        <div className="d-flex flex-column vh-100" style={{ backgroundColor: "#ccc" }}>
            <div className="d-flex flex-column">
                <script src="./dist/js/demo-theme.min.js?1684106062"></script>
                <div className="page page-center">
                    <div className="container container-tight py-4">
                        <div className="text-center mb-4">
                            <Link href="/">
                                <img src="./static/logo.svg" height="36" alt="" />
                            </Link>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-4">
                                <form className="card card-md" style={{ border: "unset", padding: "2em", backgroundColor: "#ffffffc7", boxShadow: "-2px 1px 5px 0px rgb(36 36 36 / 33%);" }} action="./" method="post" autoComplete="off" noValidate>
                                    <div className="card-body">
                                        <h2 className="card-title text-center mb-4 fs-4">Create new account</h2>
                                        {/*<div className="mb-3">*/}
                                        {/*    <label className="form-label">Full name</label>*/}
                                        {/*    <input type="text" className="form-control" placeholder="Your fullname"/>*/}
                                        {/*</div>*/}
                                        {/*<div className="mb-3">*/}
                                        {/*    <label className="form-label">Phone number</label>*/}
                                        {/*    <input type="tel" className="form-control"*/}
                                        {/*           placeholder="Enter phone number"/>*/}
                                        {/*</div>*/}
                                        {/*<div className="mb-3">*/}
                                        {/*    <label className="form-label">Address</label>*/}
                                        {/*    <input type="text" className="form-control" placeholder="Enter Address"/>*/}
                                        {/*</div>*/}
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-control" placeholder="Enter email"/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <div className="input-group input-group-flat">
                                                <input type="password" className="form-control" placeholder="Password"
                                                       autoComplete="off"/>
                                                <span className="input-group-text">
                                                    <a href="#" className="link-secondary" title="Show password"
                                                       data-bs-toggle="tooltip">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon"
                                                             width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                                                             stroke="currentColor" fill="none" strokeLinecap="round"
                                                             strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/>
                                                            <path
                                                                d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"/>
                                                        </svg>
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Repassword</label>
                                            <div className="input-group input-group-flat">
                                                <input type="password" className="form-control"
                                                       placeholder="Confirm password"
                                                       autoComplete="off"/>
                                                <span className="input-group-text">
                                                    <a href="#" className="link-secondary" title="Show password"
                                                       data-bs-toggle="tooltip">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon"
                                                             width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                                                             stroke="currentColor" fill="none" strokeLinecap="round"
                                                             strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/>
                                                            <path
                                                                d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"/>
                                                        </svg>
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                        {/* <div className="mb-3">
                          <label className="form-check">
                            <input type="checkbox" className="form-check-input" />
                            <span className="form-check-label">
                              Agree the <Link href="/termsofservice" tabIndex={-1}>terms and policy</Link>.
                            </span>
                          </label>
                        </div> */}
                                        {/* Rest of the form */}

                                        <div className="form-footer">
                                            <button type="submit" className="btn btn-primary w-100">Create new account
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="text-center text-muted mt-3">
                            Already have an account?
                            <Link href="/authenticate" tabIndex={-1}>Sign in</Link>
                        </div>
                    </div>
                </div>
                <script src="./dist/js/tabler.min.js?1684106062" defer></script>
                <script src="./dist/js/demo.min.js?1684106062" defer></script>
            </div>
        </div>
    );
}