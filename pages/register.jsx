import React, {useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {handleRegisternRedux} from "@/src/redux/actions/userAction";


export default function Register() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const [isShowpassword, setIsShowPassword] = useState(false);
    const [isShowrepassword, setIsShowRePassword] = useState(false);



    const handleRegister = () => {
        if (password !== repassword) {
            setIsPasswordMatch(false);
            toast.error("Password and repassword must match");
        } else if (!email || !password) {
            toast.error("Email and password are required");
        } else {
            dispatch(handleRegisternRedux(email, password));
            toast.success("Register success");

        }
    };

    return (
        <div className="d-flex flex-column vh-100" style={{ backgroundColor: "#ccc" }}>
            <div className="d-flex flex-column">
                <script src="./dist/js/demo-theme.min.js?1684106062"></script>
                <div className="page page-center">
                    <div className="container container-tight py-4">
                        <div className="text-center mb-4">
                            <Link href="/">
                                <img src="./assets/img/imageTheme/logobrandSVG.png" height="100" alt=""/>
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
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(event) => setEmail(event.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <div className="input-group input-group-flat">
                                                <input
                                                    type={isShowpassword === true ? "text" : "password"}
                                                    className="form-control"
                                                    placeholder="password"
                                                    autoComplete="off"
                                                    value={password}
                                                    onChange={(event) => setPassword(event.target.value)}

                                                />
                                                <span className="input-group-text">
                                        <i
                                            className={isShowpassword === true ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
                                            onClick={() => setIsShowPassword(!isShowpassword)}
                                        ></i>
                                    </span>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Confirm password</label>
                                            <div className="input-group input-group-flat">
                                                <input
                                                    type={isShowrepassword === true ? "text" : "password"}
                                                    className="form-control"
                                                    placeholder="confirm password"
                                                    autoComplete="off"
                                                    value={repassword}
                                                    onChange={(event) => setRePassword(event.target.value)}
                                                />
                                                <span className="input-group-text">
                                        <i
                                            className={isShowrepassword === true ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
                                            onClick={() => setIsShowRePassword(!isShowrepassword)}
                                        ></i>
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
                                            <button
                                                // disabled={email && password ? false : true}
                                                onClick={() => handleRegister()}

                                                className="btn btn-warning w-100">
                                                Create new account
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