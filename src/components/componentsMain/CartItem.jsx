function CartItem({ name, price, number, fullprice, img }) {
  return (
    <div className="cartItem1 cartItem">
      <div className="imgItemContainer">
        <img src={img} alt="" className="cartItemImg" />

        <div className="cartItemInfo">
          <h4 className="cartItemName">{name}</h4>

          <p className="cartItemPrice">{price}KM</p>
          <div className="cartNumberFullContainer">
            <div className="cartItemCalc">
              <div className="cartItemCalc2">
                <button className="cartItemAdd">-</button>
                <p className="cartItemNumber">{number}</p>
                <button className="cartItemAdd">+</button>
              </div>
              <p className="cartItemFullPrice">{fullprice}KM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
