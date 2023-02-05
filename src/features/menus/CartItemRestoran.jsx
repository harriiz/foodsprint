function CartItem({ name, price, number, fullPrice, image }) {
  // console.log(name);
  return (
    <div className="cartItem1 cartItem">
      <div className="imgItemContainer">
        <img src={image} alt="" className="cartItemImg" />

        <div className="cartItemInfo">
          <h4 className="cartItemName">{name}</h4>

          <p className="cartItemPrice">{price} KM</p>
          <div className="cartNumberFullContainer">
            <div className="cartItemCalc">
              <div className="cartItemCalc2">
                <p className="cartItemNumber">{number}x</p>
              </div>
              <p className="cartItemFullPrice">{fullPrice}KM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
