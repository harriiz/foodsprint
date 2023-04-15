import moment from "moment/moment";
import "moment/locale/bs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllOrders } from "../../features/orders/ordersApiSlice";
import { useUpdateOrderMutation } from "../../features/orders/ordersApiSlice";
import useAuth from "../../hooks/useAuth";
import { Button } from "@mantine/core";

function OrderBoxDostavljac({
  orderId,
  orderItems,
  orderAmount,
  orderDate,
  adresa,
  status,
}) {
  moment.locale("bs");
  let vrijeme = moment(orderDate).fromNow();

  const { userId } = useAuth();
  const orders = useSelector(selectAllOrders);
  const [dostavaStatus, setDostavaStatus] = useState("Otvoreno");
  const [updateOrder, { isLoading, isSuccess, isError, error }] =
    useUpdateOrderMutation(orderId);

  const handleAssignClick = (orderId) => {
    updateOrder({ id: orderId, status: "Dostava uzeta", dostavljac: userId });
  };

  return (
    <>
      <div className="orderBox">
        <p className="orderBoxId">Narudžba: {orderId}</p>
        <p className="orderBoxCijena">Cijena: {orderAmount}KM</p>
        <p className="orderBoxAdresa">Adresa: {adresa}</p>
        <p className="orderBoxDatum">Vrijeme: {vrijeme} </p>
        <p className="orderBoxStatus">Status: {status} </p>
        <Button
          onClick={() => handleAssignClick(orderId)}
          className="uzmiDostavu"
        >
          Uzmi dostavu
        </Button>
      </div>
    </>
  );
}

export default OrderBoxDostavljac;
