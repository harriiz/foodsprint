import React from "react";
import { useSelector } from "react-redux";
import CheckoutItem from "./CheckoutItem";
import useAuth from "../../hooks/useAuth";
import { useAddNewOrderMutation } from "../../features/orders/ordersApiSlice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import "./itemsCheckout.css";
import { useState } from "react";

function ItemsCheckout() {
  // logika
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useAuth();
  const [status, setStatus] = useState("Otvoreno");
  const [dostavljac, setDostavljac] = useState("0");

  const quantity = useSelector((state) => state.cart.quantity);
  const cart = useSelector((state) => state.cart);
  const totalCost = cart.total;

  let suma = ":";
  if (cart.menus.length > 0) {
    for (let i = 0; i < cart.menus.length; i++) {
      suma = cart.menus[i].naziv + ", " + suma;
    }
  }

  const [addNewOrder, { isLoading, isSuccess, isError, error }] =
    useAddNewOrderMutation();

  const onSaveOrderClicked = async (e) => {
    await addNewOrder({
      userId: userId,
      amount: cart.total,
      menus: suma,
      status: status,
      dostavljac: dostavljac,
    });
    // console.log("clicked");
    console.log(
      "userId:" + userId + " /Amount:" + cart.total + " /Menus " + suma
    );
  };
  let total = 0;
  // console.log(cart.menus);
  // console.log("checkout" + cart);
  return (
    <div className="asideMain">
      <div className="cartContainer">
        <div className="korpaContainer">
          <img src={require("./myCart.png")} />
          <h2 className="mojaNarudzba">
            <span className="mojaKorpa">Moja </span>
            Korpa {quantity}
          </h2>
        </div>
        <div className="cartItems">
          {cart.menus.map((cartItem) => (
            <CheckoutItem
              name={cartItem.naziv}
              price={cartItem.cijena}
              number={cartItem.quantity}
              fullPrice={cartItem.quantity * cartItem.cijena}
              img={cartItem.image.url}
              className="checkoutItem"
            />
          ))}
        </div>
      </div>
      <div className="checkoutBtnContainer">
        <div className="checkoutBtn">
          <div className="kupiArrowCont" onClick={onSaveOrderClicked}>
            Place Order{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemsCheckout;
