import "./asideMain.css";
import CartItem from "./CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function AsideMain() {
  return (
    <div className="asideMain">
      <div className="asideContainer">
        <div className="korpaContainer">
          <img src={require("./slike/myCart.png")} alt="" />
          <h2 className="mojaNarudzba">
            <span className="mojaKorpa">Moja </span>
            Korpa
          </h2>
        </div>
        <div className="cartItems">
          <CartItem
            name="Pizza Margarita"
            price="6.90"
            number="2"
            fullprice="13.80"
            img="https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/olfvkkvan3vahmt4ciw3"
          />
          <CartItem
            name="Student Sendvič"
            price="2.00"
            number="1"
            fullprice="2.00"
            img="https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/qbxliaw2ich6dzpte97j"
          />
          <CartItem
            name="Palačinka Nutella"
            price="5.00"
            number="2"
            fullprice="10.00"
            img="https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/pa88zmtssqeh34kevpts"
          />
        </div>
        <div className="ukupnoCheckout">
          <h3 className="cartTotalTitle">Ukupno:</h3>
          <div className="cartTotalAmount">25.80KM</div>
        </div>
        <div className="checkoutBtnContainer">
          <div className="checkoutBtn">
            <div className="kupiArrowCont">
              Kupi <FontAwesomeIcon icon={faArrowRight} className="arrowIco" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AsideMain;
