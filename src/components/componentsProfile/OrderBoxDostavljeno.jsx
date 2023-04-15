import React from "react";
import { format } from "timeago.js";
import "./orderBox.css";
import { Button, Modal } from "@mantine/core";
import { Timeline, Text } from "@mantine/core";
import {
  IconChecks,
  IconHandGrab,
  IconTruckDelivery,
  IconPackage,
} from "@tabler/icons-react";
import { useState } from "react";
import { useEffect } from "react";
function OrderBoxDostavljeno({
  orderId,
  orderItems,
  orderAmount,
  orderDate,
  orderStatus,
}) {
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(0);
  if (orderStatus === "Dodijeljeno") {
    setActive(0);
  }
  useEffect(() => {
    if (orderStatus === "Dodijeljeno") {
      setActive(0);
    } else if (orderStatus === "Preuzeto") {
      setActive(1);
    } else if (orderStatus === "U Tranzitu") {
      setActive(2);
    } else if (orderStatus === "Dostavljeno") {
      setActive(3);
    }
  }, [orderStatus]);

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
      </Modal>
      <div className="orderBox">
        <p className="orderBoxId">Završena narudžba {orderId}</p>
        <p className="orderBoxItems">Sadržaj: {orderItems}</p>
        <p className="orderBoxCijena">Cijena: {orderAmount}KM</p>
        <p className="orderBoxDatum">Vrijeme: {format(orderDate)}</p>
        <Button>Status: {orderStatus}</Button>
      </div>
    </>
  );
}

export default OrderBoxDostavljeno;
