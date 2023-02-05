function CheckoutItem({ name, price, number, fullPrice, img }) {
  // console.log(name);

  return (
    <div className="cartItem1 cartItem">
      <div className="imgItemContainer">
        <img src={img} alt="" className="cartItemImg" />
      </div>
      <div className="cartItemInfo">
        <h4 className="cartItemName">Proizvod: {name}</h4>

        <p className="cartItemPrice">Cijena: {price} KM</p>
        <div className="cartNumberFullContainer">
          <div className="cartItemCalc">
            <div className="cartItemCalc2">
              <p className="cartItemNumber">Količina: {number}</p>
            </div>
            <p className="cartItemFullPrice">Ukupno: {fullPrice}KM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutItem;
