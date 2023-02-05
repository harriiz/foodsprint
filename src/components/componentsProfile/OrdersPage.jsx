import { useSelector } from "react-redux";
import {
  useGetOrdersQuery,
  selectAllOrders,
  selectOrderById,
} from "../../features/orders/ordersApiSlice";
import { selectUserById } from "../../features/users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import OrderBox from "./OrderBox";
function OrdersPage() {
  const { userId } = useAuth();
  const id = userId;
  const idProvjera = userId;
  const user = useSelector((state) => selectUserById(state, id));
  const orderCheck = useSelector((state) => selectOrderById(state, id));

  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery();

  var idskey;

  if (!isLoading && !isError && orders) {
    const { ids, entities } = orders;
    let matches = [];
    for (let key1 in entities) {
      if (entities[key1].userId === id) {
        matches.push({ ...entities[key1], orderId: key1 });
      }
    }
    return matches.map((match, index) => (
      <div key={index} className="divParent">
        <OrderBox
          orderId={match.orderId}
          orderItems={match.menus}
          orderAmount={match.amount}
          orderDate={match.createdAt}
          orderStatus={match.status}
        />
        {/* Add other properties you want to display */}
      </div>
    ));
  }
}

export default OrdersPage;
