import React from "react";
import { addMenus } from "../../app/cartRedux";
import "./menuItem.css";
import { useGetMenusQuery } from "./menusApiSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "@mantine/core";
import EditMenu from "./EditMenu";

function MenuItem({ naziv, cijena, id, kategorija, image }) {
  const {
    data: menus,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenusQuery();
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    console.log("menuItem: " + id);
  };

  return (
    <div>
      <Modal opened={opened} onClose={() => setOpened(false)} size="lg">
        <EditMenu id={id} />
      </Modal>
      <div className="menuItemBox">
        <div className="menuItemBoxImgH">
          <img src={image} alt="" className="menuItemImg" />
        </div>
        <div className="menuItemOstalo">
          <div className="boxOpis">
            <h3 className="menuTitle">{naziv}</h3>
            <p>
              {kategorija} najbolji u našem restoranu po atraktivnim cijenama
            </p>
          </div>
          <p className="menuCijena">KM {cijena}</p>

          <div className="addToCartCont">
            <Button size="lg" radius="md" onClick={() => setOpened(true)}>
              Uredi jelo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
