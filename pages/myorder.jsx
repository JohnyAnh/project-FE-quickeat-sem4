import Layout from "@/src/layouts/Layout";
import Link from "next/link";
import { useState } from "react";
import MyOrderFuntion from "@/src/components/MyOrderFuntion";
const MyOrder = () => {
  const [tab, setTab] = useState("card");

  return (
      <Layout>
        <section
            className="hero-section about checkout gap"
            style={{backgroundImage: "url(assets/img/background-3.png)"}}
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
                    <li className="two">
                      <Link href="/myorder">
                        <i className="fa-solid fa-right-long"/>
                        My Order
                      </Link>
                    </li>
                  </ul>
                  <h2
                      data-aos="fade-up"
                      data-aos-delay={300}
                      data-aos-duration={400}
                  >
                    My Order
                  </h2>
                  {/*<p*/}
                  {/*    data-aos="fade-up"*/}
                  {/*    data-aos-delay={400}*/}
                  {/*    data-aos-duration={500}*/}
                  {/*>*/}
                  {/*  Sit amet nisl purus in mollis nunc sed id semper. Condimentum*/}
                  {/*  id venenatis a condimentum vitae sapien pellentesque.*/}
                  {/*</p>*/}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* checkout-order */}
        <section>
          <div className="container">
            <div className="row align-items-center">
              <div
                  className="offset-lg-12 col-lg-12" // Phần thứ 4 và thứ 9 của section
                  data-aos="flip-up"
                  data-aos-delay={200}
                  data-aos-duration={300}
              >
                <MyOrderFuntion/>
              </div>
              {/*<div className="col-lg-12"> /!* Phần thứ 5 *!/*/}
              {/*  /!* Nội dung của phần thứ 5 *!/*/}
              {/*</div>*/}
              {/*<div className="col-lg-12"> /!* Phần thứ 6 *!/*/}
              {/*  /!* Nội dung của phần thứ 6 *!/*/}
              {/*</div>*/}
              {/*<div className="col-lg-12"> /!* Phần thứ 7 *!/*/}
              {/*  /!* Nội dung của phần thứ 7 *!/*/}
              {/*</div>*/}
              {/*<div className="col-lg-12"> /!* Phần thứ 8 *!/*/}
              {/*  /!* Nội dung của phần thứ 8 *!/*/}
              {/*</div>*/}
            </div>
          </div>
        </section>

      </Layout>
  );
};
export default MyOrder;
