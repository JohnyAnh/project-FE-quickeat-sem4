import Item from "@/src/components/Item";
import RestaurantCardTab from "@/src/components/RestaurantCardTab";
import Layout from "@/src/layouts/Layout";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import RestaurantService from "@/src/services/restaurantService";
import productService from "@/src/services/productService";

const RestaurantCard = () => {

  const [items, setItems] = useState([]);
  // const items = [
  //   {
  //     id: 1,
  //     image: "/assets/img/dish-13.png",
  //     title: "Egg, kiwi and sauce chilli",
  //     tags: ["breakfast", "brunch"],
  //     price: 39,
  //     quantity: 1,
  //     category: ["breakfast", "lunch", "dinner"],
  //   },
  //   {
  //     id: 2,
  //     image: "/assets/img/dish-6.png",
  //     title: "Potatoes with pork and dried fruits",
  //     tags: ["breakfast", "brunch"],
  //     price: 39,
  //     quantity: 1,
  //     category: ["breakfast", "dinner"],
  //   },
  //   {
  //     id: 3,
  //     image: "/assets/img/dish-5.png",
  //     title: "Rice with shrimps and kiwi",
  //     tags: ["breakfast", "brunch"],
  //     price: 39,
  //     quantity: 1,
  //     category: ["breakfast", "lunch"],
  //   },
  //   {
  //     id: 7,
  //     image: "/assets/img/dish-7.png",
  //     title: "Fruits with rice chips",
  //     tags: ["breakfast", "brunch"],
  //     price: 39,
  //     quantity: 1,
  //     category: ["breakfast", "lunch"],
  //   },
  //   {
  //     id: 8,
  //     image: "/assets/img/dish-10.png",
  //     title: "Vegetables with rice chips",
  //     tags: ["breakfast", "brunch"],
  //     price: 39,
  //     quantity: 1,
  //     category: ["breakfast", "lunch", "dinner"],
  //   },
  //   {
  //     id: 9,
  //     image: "/assets/img/dish-11.png",
  //     title: "Pork with vegetables and...",
  //     tags: ["breakfast", "brunch"],
  //     price: 39,
  //     quantity: 1,
  //     category: ["breakfast", "lunch"],
  //   },
  //   {
  //     id: 4,
  //     image: "/assets/img/dish-1.png",
  //     title: "Spaghetti with mushrooms and...",
  //     tags: ["breakfast", "brunch", "dinner"],
  //     price: 39,
  //     quantity: 1,
  //     category: ["others"],
  //   },
  //   {
  //     id: 5,
  //     image: "/assets/img/dish-2.png",
  //     title: "Veal meat, tomatoes and...",
  //     tags: ["breakfast", "brunch"],
  //     price: 39,
  //     quantity: 1,
  //     category: ["others"],
  //   },
  //   {
  //     id: 6,
  //     image: "/assets/img/dish-4.png",
  //     title: "Sliced pork, avocado and...",
  //     tags: ["breakfast", "brunch"],
  //     price: 39,
  //     quantity: 1,
  //     category: ["others"],
  //   },
  // ];


// Dùng api lấy dữ liệu

  // const { id } = router.query;
  const router = useRouter();
  const { id } = router.query;

  const [reqRestaurent] = useState({restaurantId: id});
  const [req] = useState({id: id});
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    description: "",
    tel: "",
    address: "",
    status: "",
    brand: "",
    images: "",
  });

  useEffect(() => {
     RestaurantService.findRestaurants(req)
         .then((res) => {
           if (Array.isArray(res.data) && res.data.length > 0) {
             const firstRestaurant = res.data[0];
             setRestaurantData(firstRestaurant);
           };

         })
         .catch((err) => {
           console.log(err);
         });

  }, []);
  useEffect(() => {
    productService.findProducts(reqRestaurent)
        .then((res) => {
          if (Array.isArray(res.data) && res.data.length > 0) {

            setItems(res.data);
          };

        })
        .catch((err) => {
          console.log(err);
        });

  }, []);

  console.log(restaurantData);
  console.table("Check itiem", items);

  return (
      <Layout>

        <section
            className="hero-section about gap"
            style={{backgroundImage: "url(assets/img/background-1.png)"}}
        >
          <div className="container">
            <div className="row align-items-center">

              {/*phan dau detal*/}
              <div
                  className="col-lg-6"
                  data-aos="fade-up"
                  data-aos-delay={300}
                  data-aos-duration={400}
              >
                <div className="about-text">
                  <ul className="crumbs d-flex">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/">
                        <i className="fa-solid fa-right-long"/>
                        Restaurants
                      </Link>
                    </li>
                    <li className="two">
                      <Link href="/">
                        <i className="fa-solid fa-right-long"/>
                          {restaurantData && restaurantData.name}
                      </Link>
                    </li>
                  </ul>
                  <div className="logo-detail">
                    {restaurantData.images && restaurantData.images.map((image, index) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={`logo-${index}`}
                        />
                    ))}
                    <h2>{restaurantData && restaurantData.name}</h2>
                  </div>
                  <div className="rate">
                    <span>Rate:</span>
                    <div className="star">
                      <i className="fa-solid fa-star"/>
                      <i className="fa-solid fa-star"/>
                      <i className="fa-solid fa-star"/>
                      <i className="fa-solid fa-star"/>
                      <i className="fa-regular fa-star-half-stroke"/>
                    </div>
                    <span>CUISINES:</span>
                    <div className="cafa-button">
                      {" "}
                      <a href="#">american</a> <a href="#">steakhouse</a>{" "}
                      <a href="#">seafood</a>
                    </div>
                    <span>FEATURES:</span>
                    <p>
                      {restaurantData && restaurantData.description}
                    </p>
                  </div>
                </div>
              </div>
              <div
                  className="col-lg-6"
                  data-aos="fade-up"
                  data-aos-delay={400}
                  data-aos-duration={500}
              >
                <div className="about-img">
                  <img alt="man" src="assets/img/imageTheme/restaurant-1.jpg"/>
                  <div className="hours">
                    <i className="fa-regular fa-clock"/>
                    <h4>
                      9am – 12pm
                      <br/>
                      <span>Hours</span>
                    </h4>
                  </div>
                  <div className="hours two">
                    <i className="fa-solid fa-utensils"/>
                    <h4>
                      Breakfast, Lunch, Dinner
                      <br/>
                      <span>Meals</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            {/* ket thuc phan dau detal*/}


          </div>
        </section>
        {/* tabs */}
        <RestaurantCardTab items={items}/>
        {/* Lunch Section */}
        <section className="lunch-section gap" style={{background: "#fcfcfc"}}>
          <div className="container">
            <h2 data-aos="fade-up" data-aos-delay={300} data-aos-duration={400}>
              See also category Lunch
            </h2>
            <div className="row">
              {items.map(
                  (item, i) =>
                      item && (
                          <Item item={item} key={item.id}/>
                      )
              )}
            </div>
          </div>
        </section>
      </Layout>
  );
};
export default RestaurantCard;
