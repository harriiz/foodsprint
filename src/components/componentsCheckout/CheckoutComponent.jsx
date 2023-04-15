import InfoCheckout from "./InfoCheckout";
import ItemsCheckout from "./ItemsCheckout";
import "./checkoutComponent.css";

function CheckoutComponent() {
  return (
    <div className="checkoutComponent">
      <div className="checkoutMain">
        <InfoCheckout />
      </div>
      <div className="checkoutAside"></div>
    </div>
  );
}

export default CheckoutComponent;
