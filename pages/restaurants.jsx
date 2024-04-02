import Subscribe from "@/src/components/Subscribe";
import Layout from "@/src/layouts/Layout";
import Link from "next/link";
import {Fragment, useEffect, useState} from "react";
import RestaurantService from "@/src/services/restaurantService";
import {useRouter} from "next/router";
const Restaurants = (props) => {
  const [restaurant, setRestaurant] = useState([]);
  const [reqListRestaurant] = useState({status:1})
  const [topRestaurant, setTopRestaurant] = useState();
  const [reqtopRestaurant] = useState({pageSize:1})
  const router = useRouter();

  const handleRestaurantClick = (id) => {
    router.push(`/restaurant-card?id=${id}`);
  };
  const handleRestaurantChange = (selectedId) => {
    router.push(`/restaurant-card?id=${selectedId}`);
  };


  useEffect(() => {
    RestaurantService.findRestaurants(reqListRestaurant)
        .then((res) => {
          console.log(res.data);
          if (res.data.length > 0) {
            setRestaurant(res.data);
            // const randomIndex = Math.floor(Math.random() * res.data.length);
            // setRandomRestaurant(res.data[randomIndex]);

          } else {
            console.log("No restaurants found.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  useEffect(() => {

    RestaurantService.findRestaurants(reqtopRestaurant)
        .then((res) => {
          console.log(res.data);
          if (res.data.length > 0) {
            setTopRestaurant(res.data);m
          } else {
            console.log("No rep topRestaurant found.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  console.log("check restaurant:", restaurant);
  console.log("check topRestaurant:", topRestaurant);



  return (
    <Layout>
      {/* hero-section */}
      <section className="hero-section about gap">
        <div className="container">
          <div className="row align-items-center">
            <div
                className="col-lg-6"
                data-aos="fade-up"
                data-aos-delay={200}
                data-aos-duration={300}
            >
              <div className="about-text">
                <ul className="crumbs d-flex">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li className="two">
                    <Link href="/">
                      <i className="fa-solid fa-right-long"/>
                      Restaurants
                    </Link>
                  </li>
                </ul>
                <h2>Restaurants</h2>
                <p>
                  Egestas sed tempus urna et pharetra pharetra massa. Fermentum
                  posuere urna nec tincidunt praesent semper.
                </p>
                <div className="restaurant">
                  <div className="nice-select-one">
                    {restaurant.length > 0 && (
                        <select className="nice-select Advice" onChange={(e) => handleRestaurantChange(e.target.value)}>
                          <option >Choose a Restaurant</option>
                          {restaurant.map((e, k) => (
                              <option key={e.id} value={e.id}>{e.name}</option>
                          ))}
                        </select>
                    )}
                  </div>
                </div>


              </div>
            </div>
            <div
                className="col-lg-6"
                data-aos="fade-up"
                data-aos-delay={300}
                data-aos-duration={400}
            >
              <div className="restaurants-girl-img food-photo-section">
                <img alt="man" src="assets/img/imageTheme/photo-11.png"/>{" "}
                <a href="#" className="one">
                  <i className="fa-solid fa-burger"/>
                  Burgers
                </a>{" "}
                <a href="#" className="two">
                  <i className="fa-solid fa-drumstick-bite"/>
                  Chicken
                </a>{" "}
                <a href="#" className="three">
                  <i className="fa-solid fa-cheese"/>
                  Steaks
                </a>{" "}
                <a href="#" className="for">
                  <i className="fa-solid fa-pizza-slice" />
                  Fish
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* banner */}
      <section
        className="banner"
        data-aos="fade-up"
        data-aos-delay={200}
        data-aos-duration={300}
      >
        <div className="container">
          <div
            className="banner-img"
            style={{ backgroundImage: "url(assets/img/imageTheme/food-4.jpg)" }}
          >
            <div className="banner-logo">
              <h4>
                Restaurant
                <br/>
                of the Month
                <span className="chevron chevron--left"/>
              </h4>
              <div className="banner-wilmington">
                {topRestaurant && topRestaurant.map((te, i) => (
                    <div className="banner-wilmington" key={i}>
                      {te.images && te.images.map((image, index) => (
                          <img
                              key={index}
                              src={image.url}
                              alt={`gif-${index}`}
                              style={{ width: "50px", height: "50px" }}
                          />
                      ))}
                      <h6>{te.name}</h6>
                    </div>
                ))}
              </div>
            </div>


            <div className="row">
              <div className="col-xl-6 col-lg-12">
                <div className="choose-lunches">
                  <h2>Choose 2 lunches</h2>
                  <h3>pay for one</h3>{" "}
                  <a href="#" className="button button-2 non">
                    Order Now
                    <i className="fa-solid fa-arrow-right"/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* best-restaurants */}
      <section className="best-restaurants gap">
        <div className="container">
          <div className="row" >
            {restaurant.map((e, k) => {
              return (
                  <div
                      key={k}
                      className="col-lg-6"
                      data-aos="flip-up"
                      data-aos-delay={200}
                      data-aos-duration={300}
                      style={{ marginBottom: '20px' }}
                  >
                    <div className="logos-card restaurant-page" onClick={() => handleRestaurantClick(e.id)}>
                      {e.images && e.images.map((image, index) => (
                          <img
                              key={index}
                              src={image.url}
                              alt={`gif-${index}`}
                          />
                      ))}
                      <div className="cafa">
                        <h4>
                          {" "}
                          <a href="#" onClick={() => handleRestaurantClick(e.id)}>{e.name}</a>
                        </h4>
                        {/*Star*/}
                        <div>
                          {[...Array(Math.floor(e.rate))].map((_, index) => (
                              <i key={index} className="fa-solid fa-star"/>
                          ))}
                          {e.rate % 1 !== 0 && (
                              <i className="fa-regular fa-star-half-stroke"/>
                          )}
                          {[...Array(5 - Math.ceil(e.rate))].map((_, index) => (
                              <i key={index + Math.ceil(e.rate)} className="fa-regular fa-star"/>
                          ))}
                        </div>


                        <div className="cafa-button">
                          {e.tags && e.tags.split(',').map((tag, i) => (
                              <div key={i} style={{display: 'inline-block'}}>
                                <a href="#">{tag.trim()}</a>
                              </div>
                          ))}
                          {e.cuisines && e.cuisines.length > 0 ? (
                              <>
                                {e.cuisines.map((type, i) => (
                                    <Fragment key={i}>
                                      <div className="cafa-button" style={{display: 'inline-block'}}>
                                        {" "}
                                        <a href="#">{type.trim()}</a>
                                      </div>
                                      {" "}
                                    </Fragment>
                                ))}
                              </>
                          ) : (
                              <span>Cuisines not available</span>
                          )}
                        </div>


                        {/*Fake data*/}

                        {/*<div>*/}
                        {/*  {[...Array(e.rating)].map((_, i) => (*/}
                        {/*      <i key={i} className="fa-solid fa-star" />*/}
                        {/*  ))}*/}
                        {/*  {[...Array(5 - e.rating)].map((_, i) => (*/}
                        {/*      <i key={i} className="fa-regular fa-star" />*/}
                        {/*  ))}*/}
                        {/*</div>*/}
                        {/*<div className="cafa-button">*/}
                        {/*  {e.categories.map((category, index) => (*/}
                        {/*      <a key={index} href="#">{category}</a>*/}
                        {/*  ))}*/}
                        {/*</div>*/}
                        <p>{e.description}</p>
                      </div>
                    </div>
                  </div>
              );
            })}

          </div>
        </div>
      </section>
      {/* subscribe-section */}
      <Subscribe/>
    </Layout>
  );
};
export default Restaurants;
