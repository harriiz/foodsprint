import React from "react";
import { addMenus } from "../../app/cartRedux";
import "./menuItem.css";
import { useGetMenusQuery } from "./menusApiSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

function MenuItem({ naziv, cijena, id, kategorija, image }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const {
    data: menus,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenusQuery();

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    console.log(image);
    dispatch(
      addMenus({ ...menus, naziv, quantity, cijena, image: { url: image } })
    );
  };

  return (
    <div>
      <div className="menuItemBox">
        <div className="menuItemBoxImgH">
          <img src={image} alt="" className="menuItemImg" />
        </div>
        <div className="menuItemOstalo">
          <div className="boxOpis">
            <h3 className="menuTitle">{naziv}</h3>
            <p>{kategorija}</p>
          </div>
          <p className="menuCijena">KM {cijena}</p>
          <div className="menuCijenaAdd">
            <button className="menuAdd" onClick={() => handleQuantity("inc")}>
              +
            </button>
            <p>{quantity}</p>
            <button className="menuAdd" onClick={() => handleQuantity("dec")}>
              -
            </button>
          </div>
          <div className="addToCartCont">
            <button onClick={handleClick} className="kupiMenu">
              <FontAwesomeIcon
                icon={faCircleChevronDown}
                size="5x"
                className="faIcon"
              />
              {/* <img
                src={require("./slike/buyIcon2.png")}
                alt=""
                className="buyIcon"
              /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
