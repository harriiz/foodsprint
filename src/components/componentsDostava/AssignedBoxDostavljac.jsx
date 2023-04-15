import moment from "moment/moment";
import "moment/locale/bs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllOrders } from "../../features/orders/ordersApiSlice";
import { useUpdateOrderMutation } from "../../features/orders/ordersApiSlice";
import useAuth from "../../hooks/useAuth";
import { Button, Modal } from "@mantine/core";
import { Timeline, Text } from "@mantine/core";
import {
  IconChecks,
  IconHandGrab,
  IconTruckDelivery,
  IconPackage,
} from "@tabler/icons-react";

function AssignedBoxDostavljac({
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
  const [dostavaStatuses, setDostavaStatuses] = useState(status);
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(0);

  const handlePreuzetoClick = (orderId) => {
    setDostavaStatus("Preuzeto");
    setActive(1);
    updateOrder({ id: orderId, status: "Preuzeto", dostavljac: userId });
  };

  const handleTranzitClick = (orderId) => {
    setDostavaStatus("U Tranzitu");
    setActive(2);
    updateOrder({ id: orderId, status: "U Tranzitu", dostavljac: userId });
  };

  const handleDostavljenoClick = (orderId) => {
    setDostavaStatus("Dostavljeno");
    setActive(3);
    updateOrder({ id: orderId, status: "Dostavljeno", dostavljac: userId });
  };

  const handleDostavaClick = (orderId) => {
    setOpened(true);
  };

  return (
    <>
      <Modal
        size="xl"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Status dostave"
        centered
      >
        <Timeline active={active} lineWidth={5} bulletSize={30}>
          <Timeline.Item
            bullet={<IconChecks size={23} />}
            title="Dodijeljeno FoodSprint dostavljaču"
            lineVariant="dashed"
          >
            <Text color="dimmed" size="sm">
              Vaša dostava je dodijeljena dostavljaču!
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Preuzeto iz restorana"
            bullet={<IconHandGrab size={23} />}
          >
            <Text color="dimmed" size="sm">
              Dostava je preuzeta iz restorana, možete je očekivati na vašim
              vratima ubrzo!
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="U tranzitu"
            bullet={<IconTruckDelivery size={23} />}
          >
            <Text color="dimmed" size="sm">
              Vaša dostava je u putu.
            </Text>
          </Timeline.Item>

          <Timeline.Item title="Dostavljeno" bullet={<IconPackage size={23} />}>
            <Text color="dimmed" size="sm">
              Dostavljeno, uživajte u hrani!
            </Text>
          </Timeline.Item>
        </Timeline>
        <div className="buttonsStatus">
          <button onClick={() => handlePreuzetoClick(orderId)}>Preuzeto</button>
          <button onClick={() => handleTranzitClick(orderId)}>
            U tranzitu
          </button>
          <button onClick={() => handleDostavljenoClick(orderId)}>
            Dostavljeno
          </button>
        </div>
      </Modal>

      <div className="orderBox">
        <p className="orderBoxId">Narudžba: {orderId}</p>
        <p className="orderBoxCijena">Cijena: {orderAmount}KM</p>
        <p className="orderBoxAdresa">Adresa: {adresa}</p>
        <p className="orderBoxDatum">Vrijeme: {vrijeme} </p>
        <p className="orderBoxStatus">Status: {status} </p>
        <Button
          onClick={() => handleDostavaClick(orderId)}
          className="pracenjeDostave"
        >
          Dostava
        </Button>

        <h2>
          Trenutni status <span>{dostavaStatus}</span>
        </h2>
      </div>
    </>
  );
}

export default AssignedBoxDostavljac;
