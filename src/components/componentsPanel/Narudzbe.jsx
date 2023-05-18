import { useSelector } from "react-redux";
import {
  useGetOrdersQuery,
  selectAllOrders,
  selectOrderById,
} from "../../features/orders/ordersApiSlice";
import { selectUserById } from "../../features/users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import OrderBoxAdmin from "./OrderBoxAdmin";
import moment from "moment/moment";
import "./narudzbe.css";
import {
  IconUsers,
  IconTruckDelivery,
  IconChefHat,
  IconPackage,
  IconTruck,
  IconSettings,
  IconBackspace,
  IconArrowBack,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

function Narudzbe() {
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
  // console.log(orders);

  if (!isLoading && !isError && orders) {
    const { entities, ids } = orders;
    const reversedIds = ids.slice().reverse();
    return (
      <>
        <table className="table table--orders tableNarudzbe">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th order__id">
                Narudžba
              </th>

              <th scope="col" className="table__th order__amount">
                Cijena
              </th>
              <th scope="col" className="table__th order__adresa">
                Adresa
              </th>
              <th scope="col" className="table__th order__time">
                Vrijeme
              </th>
              <th scope="col" className="table__th order__status">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {reversedIds.map((id, index) => {
              const order = entities[id];
              return (
                <tr key={index} className="table__row order">
                  <td className="table__cell order__id">{order._id}</td>

                  <td className="table__cell order__amount">
                    {order.amount} KM
                  </td>
                  <td className="table__cell order__adresa">{order.adresa}</td>
                  <td className="table__cell order__time">
                    {moment(order.createdAt).fromNow()}
                  </td>
                  <td className="table__cell order__status">
                    <button className="btn btn-primary">{order.status}</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="ikonicePanel">
          <Link to="/restorani">
            <IconChefHat color="green" className="ikonaPnl homeIcn homeIcn2" />
          </Link>
          <Link to="/dostavljaci">
            <IconTruckDelivery
              color="green"
              className="ikonaPnl homeIcn homeIcn2"
            />
          </Link>
          <Link to="/narudzbe">
            <IconPackage color="green" className="ikonaPnl homeIcn homeIcn2" />
          </Link>
          <Link to="/users">
            <IconUsers color="green" className="ikonaPnl homeIcn homeIcn2" />
          </Link>
          <Link to="/panel">
            <IconArrowBack
              color="green"
              className="ikonaPnl homeIcn homeIcn2"
            />
          </Link>
        </div>
      </>
    );
  }
}

export default Narudzbe;
