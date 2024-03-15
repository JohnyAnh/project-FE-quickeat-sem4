import Subscribe from "@/src/components/Subscribe";
import Layout from "@/src/layouts/Layout";
import { sliderProps } from "@/src/sliderProps";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import {useEffect, useState} from "react";
import RestaurantService from "@/src/services/restaurantService";
import {useRouter} from "next/router";


const Index = () => {
  const router = useRouter();
const [restaurantData, setRestaurantData]= useState([]);
  const handleOrderNow = () => {
    // Get the selected restaurant id
    const selectedRestaurantId = document.querySelector('.nice-select.Advice').value;

    // If no restaurant is selected, do nothing
    if (!selectedRestaurantId) return;

    // Navigate to the restaurant card page with the selected restaurant id
    router.push(`/restaurant-card?id=${selectedRestaurantId}`);
  };
  useEffect(() => {
    RestaurantService.getRestaurants()
        .then((res) => {
          console.log(res.data);
          if (res.data.length > 0) {
            setRestaurantData(res.data);
          } else {
            console.log("No restaurants found.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  const [topMonthRestaurantData, setTopMonthRestaurantData] = useState([]);
  const [reqTopMonthRestaurant] = useState({pageSize:1})
  useEffect(() => {
    RestaurantService.findRestaurants(reqTopMonthRestaurant)
        .then((res) => {
          console.log(res.data);
          if (res.data.length > 0) {
            setTopMonthRestaurantData(res.data);
          } else {
            console.log("No restaurants found.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  const [topBestRestaurantData, setTopBestRestaurantData] = useState([]);
  const [reqTopBestRestaurant] = useState({pageSize:3})
  useEffect(() => {
    RestaurantService.findRestaurants(reqTopBestRestaurant)
        .then((res) => {
          console.log(res.data);
          if (res.data.length > 0) {
            setTopBestRestaurantData(res.data);
          } else {
            console.log("No restaurants found.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);
  const handleBestRestaurantChange = (selectedId) => {
    router.push(`/restaurant-card?id=${selectedId}`);
  };

  console.log("check topMonthRestaurant:", topMonthRestaurantData);
  return (
    <Layout>
      <section
        className="hero-section gap"
        style={{ backgroundImage: "url(assets/img/background-1.png)" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay={200}
              data-aos-duration={300}
            >
              <div className="restaurant">
                <h1>The Best restaurants in your home</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
                {restaurantData.length > 0 && (
                    <div className="nice-select-one">
                      <select className="nice-select Advice" defaultValue="">
                        <option disabled value="">Choose a Restaurant</option>
                        {restaurantData.map((restaurant, index) => (
                            <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
                        ))}
                      </select>
                      {" "}
                      <button className="button button-2" onClick={handleOrderNow}>
                        Order Now
                      </button>
                    </div>
                )}
              </div>
            </div>
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay={300}
              data-aos-duration={400}
            >
              <div className="img-restaurant">
                <img alt="man" src="assets/img/imageTheme/photo-1.png" />
                {topMonthRestaurantData && topMonthRestaurantData.map((topmonth, i) => (
                <div className="wilmington">
                  {topmonth.images && topmonth.images.map((image, index) => (
                      <img
                          key={index}
                          src={image.url}
                          alt={`gif-${index}`}
                          // style={{ width: "90px", height: "90px" }}
                      />
                  ))}
                  <div>
                    <p>Restaurant of the Month</p>
                    <h6>The Wilmington</h6>
                    <div>
                      {[...Array(Math.floor(topmonth.rate))].map((_, index) => (
                          <i key={index} className="fa-solid fa-star"/>
                      ))}
                      {topmonth.rate % 1 !== 0 && (
                          <i className="fa-regular fa-star-half-stroke"/>
                      )}
                      {[...Array(5 - Math.ceil(topmonth.rate))].map((_, index) => (
                          <i key={index + Math.ceil(topmonth.rate)} className="fa-regular fa-star"/>
                      ))}
                    </div>
                  </div>
                </div>
                ))}
                <div className="wilmington location-restaurant">
                  <i className="fa-solid fa-location-dot"/>
                  <div>
                    <h6>06 Restaurant</h6>
                    <p>In Your city</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* works-section */}
      <section className="works-section gap no-top">
        <div className="container">
          <div
              className="hading"
              data-aos="fade-up"
            data-aos-delay={200}
            data-aos-duration={300}
          >
            <h2>How it works</h2>
            <p>
              Magna sit amet purus gravida quis blandit turpis cursus. Venenatis
              tellus in
              <br /> metus vulputate eu scelerisque felis.
            </p>
          </div>
          <div className="row ">
            <div
              className="col-lg-4 col-md-6 col-sm-12"
              data-aos="flip-up"
              data-aos-delay={200}
              data-aos-duration={300}
            >
              <div className="work-card">
                <img alt="img" src="assets/img/imageTheme/Illustration-1.png" />
                <h4>
                  <span>01</span> Select Restaurant
                </h4>
                <p>
                  Non enim praesent elementum facilisis leo vel fringilla.
                  Lectus proin nibh nisl condimentum id. Quis varius quam
                  quisque id diam vel.
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 col-sm-12"
              data-aos="flip-up"
              data-aos-delay={300}
              data-aos-duration={400}
            >
              <div className="work-card">
                <img alt="img" src="assets/img/imageTheme/Illustration-2.png"/>
                <h4>
                  <span>02</span> Select menu
                </h4>
                <p>
                  Eu mi bibendum neque egestas congue quisque. Nulla facilisi
                  morbi tempus iaculis urna id volutpat lacus. Odio ut sem nulla
                  pharetra diam sit amet.
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 col-sm-12"
              data-aos="flip-up"
              data-aos-delay={400}
              data-aos-duration={500}
            >
              <div className="work-card">
                <img alt="img" src="assets/img/imageTheme/Illustration-3.png"/>

                <h4>
                  <span>03</span> Wait for delivery
                </h4>
                <p>
                  Nunc lobortis mattis aliquam faucibus. Nibh ipsum consequat
                  nisl vel pretium lectus quam id leo. A scelerisque purus
                  semper eget. Tincidunt arcu non.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* best-restaurants */}
      <section
        className="best-restaurants gap"
        style={{ background: "#fcfcfc" }}
      >




        <div className="container">

          <div className="row align-items-center">
            <div
              className="col-lg-6"
              data-aos="flip-up"
              data-aos-delay={200}
              data-aos-duration={300}
            >
              <div className="city-restaurants">
                <h2>06 Best Restaurants in Your City</h2>
                <p>
                  Magna sit amet purus gravida quis blandit turpis cursus.
                  Venenatis tellus in metus vulputate.
                </p>
              </div>
            </div>
            {topBestRestaurantData && topBestRestaurantData.map((topBestRestaurant, i) => (

            <div
              className="col-lg-6"
              data-aos="flip-up"
              data-aos-delay={300}
              data-aos-duration={400}
            >
              <div className="logos-card">
                {topBestRestaurant.images && topBestRestaurant.images.map((image, index) => (
                    <img
                        key={index}
                        src={image.url}
                        alt={`gif-${index}`}
                        // style={{ width: "50px", height: "50px" }}
                    />
                ))}
                <div className="cafa">
                  <h4 key={i}>
                    <Link href={`/restaurant-card?id=${topBestRestaurant.id}`}>
                      {topBestRestaurant.name}
                    </Link>
                  </h4>
                  {/*Star*/}
                  <div>
                    {[...Array(Math.floor(topBestRestaurant.rate))].map((_, index) => (
                        <i key={index} className="fa-solid fa-star"/>
                    ))}
                    {topBestRestaurant.rate % 1 !== 0 && (
                        <i className="fa-regular fa-star-half-stroke"/>
                    )}
                    {[...Array(5 - Math.ceil(topBestRestaurant.rate))].map((_, index) => (
                        <i key={index + Math.ceil(topBestRestaurant.rate)} className="fa-regular fa-star"/>
                    ))}
                  </div>
                  <div className="cafa-button">
                    {" "}
                    <a href="#">american</a> <a href="#">steakhouse</a>{" "}
                    <a className="end" href="#">
                      seafood
                    </a>
                  </div>
                  <p>
                    Non enim praesent elementum facilisis leo vel fringilla.
                    Lectus proin nibh nisl condimentum id. Quis varius quam
                    quisque id diam vel.
                  </p>
                </div>
              </div>
            </div>
            ))}
          </div>

          <div className="button-gap">
            <Link href="restaurants" className="button button-2 non">
              See All
              <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>







      </section>
      {/* your-favorite-food */}
      <section
        className="your-favorite-food gap"
        style={{ backgroundImage: "url(assets/img/background-1.png)" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-5"
              data-aos="fade-up"
              data-aos-delay={200}
              data-aos-duration={300}
            >
              <div className="food-photo-section">
                <img alt="img" src="assets/img/imageTheme/photo-3.png" />{" "}
                <a href="#" className="one">
                  <i className="fa-solid fa-burger" />
                  Burgers
                </a>{" "}
                <a href="#" className="two">
                  <i className="fa-solid fa-cheese" />
                  Steaks
                </a>{" "}
                <a href="#" className="three">
                  <i className="fa-solid fa-pizza-slice" />
                  Pizza
                </a>
              </div>
            </div>
            <div
              className="col-lg-6 offset-lg-1"
              data-aos="fade-up"
              data-aos-delay={300}
              data-aos-duration={400}
            >
              <div className="food-content-section">
                <h2>Food from your favorite restaurants to your table</h2>
                <p>
                  Pretium lectus quam id leo in vitae turpis massa sed. Lorem
                  donec massa sapien faucibus et molestie. Vitae elementum
                  curabitur vitae nunc.
                </p>{" "}
                <Link href="checkout" className="button button-2">
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* counters-section */}
      <section className="counters-section">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-3 col-md-6 col-sm-12"
              data-aos="flip-up"
              data-aos-delay={200}
              data-aos-duration={300}
            >
              <div>
                <h2>Service shows good taste.</h2>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 col-sm-12"
              data-aos="flip-up"
              data-aos-delay={300}
              data-aos-duration={400}
            >
              <div className="count-time">
                <h2
                  className="timer count-title count-number"
                  data-to={976}
                  data-speed={2000}
                >
                  976
                </h2>
                <p>
                  Satisfied
                  <br />
                  Customer
                </p>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 col-sm-12"
              data-aos="flip-up"
              data-aos-delay={400}
              data-aos-duration={500}
            >
              <div className="count-time">
                <h2
                  className="timer count-title count-number"
                  data-to={12}
                  data-speed={2000}
                >
                  12
                </h2>
                <p>
                  Best
                  <br />
                  Restaurants
                </p>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 col-sm-12"
              data-aos="flip-up"
              data-aos-delay={500}
              data-aos-duration={600}
            >
              <div className="count-time sp">
                <h2
                  className="timer count-title count-number"
                  data-to={1}
                  data-speed={2000}
                >
                  1
                </h2>
                <span>k+</span>
                <p>
                  Food
                  <br />
                  Delivered
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* reviews-sections */}
      <section className="reviews-sections gap">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-xl-6 col-lg-12"
              data-aos="fade-up"
              data-aos-delay={200}
              data-aos-duration={300}
            >
              <div className="reviews-content">
                <h2>What customers say about us</h2>
                <div className="custome owl-carousel">
                  <Swiper {...sliderProps.index1Testmoninal}>
                    <SwiperSlide className="item">
                      <h4>
                        "Dapibus ultrices in iaculis nunc sed augue lacus
                        viverra vitae. Mauris a diam maecenas sed enim. Egestas
                        diam in arcu cursus euismod quis. Quam quisque id diam
                        vel".
                      </h4>
                      <div className="thomas">
                        <img alt="girl" src="assets/img/imageTheme/photo-5.jpg"/>
                        <div>
                          <h6>Thomas Adamson</h6>
                          <i className="fa-solid fa-star" />
                          <i className="fa-solid fa-star" />
                          <i className="fa-solid fa-star" />
                          <i className="fa-solid fa-star" />
                          <i className="fa-solid fa-star" />
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="item">
                      <h4>
                        "Dapibus ultrices in iaculis nunc sed augue lacus
                        viverra vitae. Mauris a diam maecenas sed enim. Egestas
                        diam in arcu cursus euismod quis. Quam quisque id diam
                        vel".
                      </h4>
                      <div className="thomas">
                        <img alt="girl" src="assets/img/imageTheme/photo-5.jpg" />
                        <div>
                          <h6>Thomas Adamson</h6>
                          <i className="fa-solid fa-star" />
                          <i className="fa-solid fa-star" />
                          <i className="fa-solid fa-star" />
                          <i className="fa-solid fa-star" />
                          <i className="fa-solid fa-star" />
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="item">
                      <h4>
                        "Dapibus ultrices in iaculis nunc sed augue lacus
                        viverra vitae. Mauris a diam maecenas sed enim. Egestas
                        diam in arcu cursus euismod quis. Quam quisque id diam
                        vel".
                      </h4>
                      <div className="thomas">
                        <img alt="girl" src="assets/img/imageTheme/photo-5.jpg"/>
                        <div>
                          <h6>Thomas Adamson</h6>
                          <i className="fa-solid fa-star" />
                          <i className="fa-solid fa-star" />
                          <i className="fa-solid fa-star" />
                          <i className="fa-solid fa-star" />
                          <i className="fa-solid fa-star" />
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                  <div className="owl-nav mt-4">
                    <button className="owl-prev">
                      <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <button className="owl-next ms-3">
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-xl-6 col-lg-12"
              data-aos="fade-up"
              data-aos-delay={300}
              data-aos-duration={400}
            >
              <div className="reviews-img">
                <img alt="photo" src="assets/img/imageTheme/photo-4.png" />
                <i className="fa-regular fa-thumbs-up" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* join-partnership */}
      <section
        className="join-partnership gap"
        style={{ backgroundColor: "#363636" }}
      >
        <div className="container">
          <h2>Want to Join Partnership?</h2>
          <div className="row">
            <div
              className="col-lg-6"
              data-aos="flip-up"
              data-aos-delay={200}
              data-aos-duration={300}
            >
              <div className="join-img">
                <img alt="img" src="assets/img/imageTheme/photo-6.jpg" />
                <div className="Join-courier">
                  <h3>Join Courier</h3>
                  <Link href="become-partner" className="button button-2">
                    Learn More <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6"
              data-aos="flip-up"
              data-aos-delay={300}
              data-aos-duration={400}
            >
              <div className="join-img">
                <img alt="img" src="assets/img/imageTheme/photo-7.jpg" />
                <div className="Join-courier">
                  <h3>Join Merchant</h3>
                  <Link href="become-partner" className="button button-2">
                    Learn More <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* news-section */}
      <section className="news-section gap">
        <div className="container">
          <h2>Latest news and events</h2>
          <div className="row">
            <div
              className="col-xl-6 col-lg-12"
              data-aos="flip-up"
              data-aos-delay={200}
              data-aos-duration={300}
            >
              <div className="news-posts-one">
                <img alt="man" src="assets/img/imageTheme/photo-8.jpg" />
                <div className="quickeat">
                  {" "}
                  <a href="#">news</a> <a href="#">quickeat</a>
                </div>
                <h3>We Have Received An Award For The Quality Of Our Work</h3>
                <p>
                  Donec adipiscing tristique risus nec feugiat in fermentum.
                  Sapien eget mi proin sed libero. Et magnis dis parturient
                  montes nascetur. Praesent semper feugiat nibh sed pulvinar
                  proin gravida.
                </p>{" "}
                <Link href="/single-blog">
                  Read More
                  <i className="fa-solid fa-arrow-right" />
                </Link>
                <ul className="data">
                  <li>
                    <h6>
                      <i className="fa-solid fa-user" />
                      by Quickeat
                    </h6>
                  </li>
                  <li>
                    <h6>
                      <i className="fa-regular fa-calendar-days" />
                      01.Jan. 2022
                    </h6>
                  </li>
                  <li>
                    <h6>
                      <i className="fa-solid fa-eye" />
                      132
                    </h6>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="col-xl-6 col-lg-12"
              data-aos="flip-up"
              data-aos-delay={300}
              data-aos-duration={400}
            >
              <div className="news-post-two">
                <img alt="food-img" src="assets/img/imageTheme/food-1.jpg" />
                <div className="news-post-two-data">
                  <div className="quickeat">
                    {" "}
                    <a href="#">restaurants</a> <a href="#">cooking</a>
                  </div>
                  <h6>
                    <Link href="single-blog">
                      With Quickeat you can order food for the whole day
                    </Link>
                  </h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor...
                  </p>
                  <ul className="data">
                    <li>
                      <h6>
                        <i className="fa-solid fa-user" />
                        by Quickeat
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <i className="fa-regular fa-calendar-days" />
                        01.Jan. 2022
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <i className="fa-solid fa-eye" />
                        132
                      </h6>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="news-post-two">
                <img alt="food-img" src="assets/img/imageTheme/food-2.jpg" />
                <div className="news-post-two-data">
                  <div className="quickeat">
                    {" "}
                    <a href="#">restaurants</a> <a href="#">cooking</a>
                  </div>
                  <h6>
                    <Link href="single-blog">127+ Couriers On Our Team!</Link>
                  </h6>
                  <p>
                    Urna condimentum mattis pellentesque id nibh tortor id
                    aliquet. Tellus at urna condimentum mattis...
                  </p>
                  <ul className="data">
                    <li>
                      <h6>
                        <i className="fa-solid fa-user" />
                        by Quickeat
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <i className="fa-regular fa-calendar-days" />
                        01.Jan. 2022
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <i className="fa-solid fa-eye" />
                        132
                      </h6>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="news-post-two end">
                <img alt="food-img" src="assets/img/imageTheme/food-3.jpg" />
                <div className="news-post-two-data">
                  <div className="quickeat">
                    {" "}
                    <a href="#">restaurants</a> <a href="#">cooking</a>
                  </div>
                  <h6>
                    <Link href="single-blog">
                      Why You Should Optimize Your Menu for Delivery
                    </Link>
                  </h6>
                  <p>
                    Enim lobortis scelerisque fermentum dui. Sit amet cursus sit
                    amet dictum sit amet. Rutrum tellus...
                  </p>
                  <ul className="data">
                    <li>
                      <h6>
                        <i className="fa-solid fa-user" />
                        by Quickeat
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <i className="fa-regular fa-calendar-days" />
                        01.Jan. 2022
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <i className="fa-solid fa-eye" />
                        132
                      </h6>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* subscribe-section */}
      <Subscribe />
    </Layout>
  );
};
export default Index;
