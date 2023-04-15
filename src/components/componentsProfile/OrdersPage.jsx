import { useSelector } from "react-redux";
import {
  useGetOrdersQuery,
  selectAllOrders,
  selectOrderById,
} from "../../features/orders/ordersApiSlice";
import { selectUserById } from "../../features/users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import OrderBox from "./OrderBox";
import OrderBoxDostavljeno from "./OrderBoxDostavljeno";
import { Button, Modal } from "@mantine/core";
import { useState } from "react";
import EditUserProfil from "../../features/users/EditUserProfil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { navigate, useNavigate } from "react-router";
import { Avatar } from "@mantine/core";

function OrdersPage() {
  const { userId, username } = useAuth();
  const id = userId;
  const idProvjera = userId;
  const user = useSelector((state) => selectUserById(state, id));
  const orderCheck = useSelector((state) => selectOrderById(state, id));
  const [opened, setOpened] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery();

  var idskey;
  const navigate = useNavigate();

  if (!isLoading && !isError && orders) {
    const { ids, entities } = orders;
    let matches = [];
    for (let key1 in entities) {
      if (entities[key1].userId === id) {
        matches.push({ ...entities[key1], orderId: key1 });
      }
    }

    return (
      <>
        {" "}
        <Avatar
          radius="lg"
          color="green"
          className="avatar"
          sx={{ width: 70, height: 70 }}
        />
        <h2>Moj Profil</h2>
        <h3>{username}</h3>
        <Button onClick={() => setOpenedEdit(true)} className="dostavljeneN">
          Promijenite vaše sigurnosne informacije
        </Button>
        <Modal
          size="m"
          opened={openedEdit}
          onClose={() => setOpenedEdit(false)}
          title="Dostavljene narudžbe"
          centered
        >
          <EditUserProfil user={user} />
        </Modal>
        <div className="divParent">
          {matches
            .filter((match) => match.status !== "Dostavljeno")
            .map((match, index) => (
              <OrderBox
                key={index}
                orderId={match.orderId}
                orderItems={match.menus}
                orderAmount={match.amount}
                orderDate={match.createdAt}
                orderStatus={match.status}
              />
            ))}
        </div>
        <Button onClick={() => setOpened(true)} className="dostavljeneN">
          Dostavljene narudžbe
        </Button>
        <Button
          variant="outline"
          className="btnNazadd"
          onClick={() => navigate("/main")}
        >
          <FontAwesomeIcon icon={faHome} />
          Početak
        </Button>
        <div className="divParentDostavljeno">
          <Modal
            size="m"
            opened={opened}
            onClose={() => setOpened(false)}
            title="Dostavljene narudžbe"
            centered
          >
            {matches
              .filter((match) => match.status === "Dostavljeno")
              .map((match, index) => (
                <OrderBoxDostavljeno
                  key={index}
                  orderId={match.orderId}
                  orderItems={match.menus}
                  orderAmount={match.amount}
                  orderDate={match.createdAt}
                  orderStatus={match.status}
                />
              ))}
          </Modal>
        </div>
      </>
    );
  }
}

export default OrdersPage;
