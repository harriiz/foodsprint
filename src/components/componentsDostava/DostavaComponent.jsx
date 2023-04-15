import { useSelector } from "react-redux";
import {
  useGetOrdersQuery,
  selectAllOrders,
  selectOrderById,
} from "../../features/orders/ordersApiSlice";
import { selectUserById } from "../../features/users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import OrderBoxDostavljac from "./OrderBoxDostavljac";
import AssignedBoxDostavljac from "./AssignedBoxDostavljac";
import "./dostava.css";
function DostavaComponent() {
  const { userId } = useAuth();
  const id = userId;
  const idProvjera = userId;
  const user = useSelector((state) => selectUserById(state, id));
  const orderCheck = useSelector((state) => selectOrderById(state, id));

  console.log("user" + userId);
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery();

  if (!isLoading && !isError && orders) {
    const { entities, ids } = orders;
    return (
      <>
        <div className="dostupneDostave">
          <h1>Otvorene dostave</h1>
          {ids.map((id, index) => {
            const order = entities[id];
            if (order.status === "Otvoreno") {
              return (
                <div key={index} className="divParent">
                  <OrderBoxDostavljac
                    orderId={order._id}
                    orderAmount={order.amount}
                    orderDate={order.createdAt}
                    adresa={order.adresa}
                    status={order.status}
                  />
                </div>
              );
            }
          })}
        </div>

        <div className="mojeDostave">
          <h1>Moje dostave</h1>
          {ids.map((id, index) => {
            const order = entities[id];
            if (order.dostavljac === userId) {
              if (order.status === "Dostavljeno") {
                return null;
              }
              return (
                <div key={index} className="divParent">
                  <AssignedBoxDostavljac
                    orderId={order._id}
                    orderAmount={order.amount}
                    orderDate={order.createdAt}
                    adresa={order.adresa}
                    status={order.status}
                  />
                </div>
              );
            }
          })}
        </div>
      </>
    );
  }
}

export default DostavaComponent;
