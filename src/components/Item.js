import { Fragment, useState } from "react";
import cartService from "@/src/services/cartService";
import Swal from "sweetalert2";
import {toast} from "react-toastify";
import {useContext} from "react";
import {CartContext} from "@/src/components/CartContext";
const Alert = () => {
  Swal.fire(
      'Success!',
      'You clicked the button!',
      'success'
  )
}
const AlertFail = () => {
  Swal.fire(
      'Failed!',
      'Something went wrong!',
      'error'
  )
}

const Item = ({ item }) => {
  const [cardInfo, setCardInfo] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  // CAC HAM VIET GOI APT VIET HET TRONG CartContext DE QUAN LY
  const handleAddToCart = async () => {
    try {
      addToCart(item.id,item.restaurant.id,quantity);
      toast.success("This item added to the cart");
    }catch (e) {
      toast.error("Failed to add item to cart")
    }



  };
  // console.log(addToCart);

  return (
    <div
      className="col-xl-4 col-lg-6"
      data-aos="flip-up"
      data-aos-delay={200}
      data-aos-duration={300}
      key={item.id}
    >
      <div className="dish">
        {!item.images && <img alt="food-dish" src={item.images} />}
        {item.images && item.images.map((image, index) => (
            <img
                key={index}
                src={image.url}
                alt={`logo-${index}`}
            />
        ))}

        <div
          className="dish-foods"
          style={{
            display: cardInfo === item.id ? "none" : "block",
          }}
        >
          <h3>{item.name}</h3>
          <div className="dish-icon">

            <div className="cafa-button">
              {item.tags && item.tags.split(',').map((tag, i) => (
                  <div key={i}>
                    <a href="#">{tag.trim()}</a>
                  </div>
              ))}
              {item.type && item.type.split(',').map((type, i) => (
                  <Fragment key={i}>
                    <a href="/restaurants">{type.trim()}</a>{" "}
                  </Fragment>
              ))}
            </div>


            <div className="dish-icon end">
              <i
                  className="info fa-solid fa-circle-info"
                  onClick={() =>
                      setCardInfo(cardInfo === item.id ? false : item.id)
                  }
              />
              <div className="star">
                {" "}
                <a href="#">
                  <i className="fa-solid fa-heart"/>
                </a>
              </div>
              <br/>
              {/*<div className="star">*/}
              {/*  {" "}*/}
              {/*  {typeof item.rate === 'number' && !isNaN(item.rate) && (*/}
              {/*      <>*/}
              {/*        {[...Array(Math.floor(item.rate))].map((_, index) => (*/}
              {/*            <i key={index} className="fa-solid fa-star"/>*/}
              {/*        ))}*/}
              {/*        {item.rate % 1 !== 0 && (*/}
              {/*            <i className="fa-regular fa-star-half-stroke"/>*/}
              {/*        )}*/}
              {/*        {[...Array(5 - Math.ceil(item.rate))].map((_, index) => (*/}
              {/*            <i key={index + Math.ceil(item.rate)} className="fa-regular fa-star"/>*/}
              {/*        ))}*/}
              {/*      </>*/}
              {/*  )}*/}
              {/*</div>*/}
            </div>
          </div>
          <div className="price">
            <h2>${item.price}</h2>
            <div className="qty-input">
              <button
                  className="qty-count qty-count--minus"
                  data-action="minus"
                  type="button"
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>
              <input
                  className="product-qty"
                  type="number"
                  name="product-qty"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button
                  className="qty-count qty-count--add"
                  data-action="add"
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <button className="button-price" onClick={handleAddToCart}>
            Add to Basket
            <i className="fa-solid fa-bag-shopping"  />
          </button>
        </div>
        <div
          className="dish-info"
          style={{
            display: cardInfo === item.id ? "block" : "none",
          }}
        >
          <i
            className="info2 fa-solid fa-xmark"
            onClick={() => setCardInfo(false)}
          />
          <h5>{item.title}</h5>
          <div className="cafa-button">
            {/*{" "}*/}
            {/*{item.tags.map((tag, i) => (*/}
            {/*  <Fragment key={i}>*/}
            {/*    <a href="#">{tag}</a>{" "}*/}
            {/*  </Fragment>*/}
            {/*))}*/}
          </div>
          <p>
            In egestas erat imperdiet sed euismod nisi porta. Ultrices sagittis
            orci a scelerisque. Diam quam nulla porttitor.
          </p>
          <ul className="menu-dish">
            <li>Nulla porttitor massa id;</li>
            <li>Aliquam vestibulum morbi;</li>
            <li>Blandit donec adipiscing;</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Item;
