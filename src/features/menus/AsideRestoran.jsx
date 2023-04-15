import "./asideRestoran.css";
import CartItem from "./CartItemRestoran";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faArrowRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { selectCurrentToken } from "../auth/authSlice";
import jwtDecode from "jwt-decode";
import useAuth from "../../hooks/useAuth";
import { useAddNewOrderMutation } from "../orders/ordersApiSlice";
import { useNavigate } from "react-router";
import { resetCart } from "../../app/cartRedux";

function AsideMain() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useAuth();
  const quantity = useSelector((state) => state.cart.quantity);
  const cart = useSelector((state) => state.cart);
  const totalCost = cart.total;

  const onSaveOrderClicked = async (e) => {
    navigate("/main/checkout");
  };

  const ocistiKorpu = () => {
    dispatch(resetCart());
  };

  return (
    <div className="asideMain">
      <div className="asideContainer">
        <div className="korpaContainer">
          <img src={require("./myCart.png")} />
          <h2 className="mojaNarudzba">
            <span className="mojaKorpa">Moja </span>
            Korpa
          </h2>
        </div>
        <div className="cartItems">
          {cart.menus.map(
            (cartItem) => (
              console.log(cartItem),
              (
                <CartItem
                  name={cartItem.naziv}
                  price={cartItem.cijena}
                  number={cartItem.quantity}
                  fullPrice={cartItem.quantity * cartItem.cijena}
                  image={cartItem.image.url}
                />
              )
            )
          )}
        </div>
        <div className="ukupnoCheckout">
          <h3 className="cartTotalTitle">Ukupno:</h3>
          <div className="cartTotalAmount">{cart.total} KM</div>
        </div>

        <div className="checkoutBtnContainer">
          <div className="checkoutBtn">
            <div className="kupiArrowCont" onClick={onSaveOrderClicked}>
              Završi Narudžbu
              <FontAwesomeIcon icon={faArrowRight} className="arrowIco" />
            </div>
          </div>
        </div>
        {cart.menus.length > 0 ? (
          <div className="ocistiKorpu">
            <button className="ocistiKorpuBtn" onClick={ocistiKorpu}>
              Očisti Korpu
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default AsideMain;
