import moment from "moment/moment";
import "moment/locale/bs";

function OrderBox({
  orderId,
  userId,
  orderItems,
  orderAmount,
  orderDate,
  adresa,
}) {
  moment.locale("bs");
  let vrijeme = moment(orderDate).fromNow();
  return (
    <>
      <div className="orderBox">
        <p className="orderBoxId">Narudžba: {orderId}</p>
        <p className="orderBoxId2">Korisnik: {userId}</p>
        <p className="orderBoxCijena">Cijena: {orderAmount}KM</p>
        <p className="orderBoxDatum">Adresa: {adresa}</p>
        <p className="orderBoxDatum">Vrijeme: {vrijeme} </p>
        <button>STATUS</button>
      </div>
    </>
  );
}

export default OrderBox;
