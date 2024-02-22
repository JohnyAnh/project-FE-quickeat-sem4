import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import PreLoader from "@/src/layouts/PreLoader";
import "@/styles/globals.css";
import { useSelector, useDispatch } from "react-redux";
import { handleRefresh } from "@/src/redux/actions/userAction";

import store from "@/src/redux/store";
import { Provider } from "react-redux";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  const [preLoader, setPreLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setPreLoader(false);
    }, 1500);
  }, []);

  const WrappedComponent = () => {
    const dataUserRedux = useSelector(state => state.user.account);
    console.log("<<< check redux:", dataUserRedux);
    const dispatch = useDispatch();

    useEffect(() => {
      if (localStorage.getItem("jwt")) {
        dispatch(handleRefresh());
      }
    }, []);

    return (
      <>
        {/* {dataUserRedux && (
          <p>Thông tin người dùng: {dataUserRedux}</p>
        )} */}
        <Component {...pageProps} />
        <ToastContainer />
      </>
    );
  };

  return (
    <Provider store={store}>
      {/* <React.StrictMode> */}
      <Head>
        {/* seo begin */}
        <title>QuickEat</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* seo end */}
      </Head>
      {preLoader && <PreLoader />}
      {!preLoader && <WrappedComponent />}
      {/* </React.StrictMode> */}
    </Provider>
  );
}
