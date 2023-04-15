import React from "react";
import { useNavigate } from "react-router";
import { selectMenuById } from "./menusApiSlice";
import { useSelector } from "react-redux";
function Menus({ menuId }) {
  const menu = useSelector((state) => selectMenuById(state, menuId));
  const navigate = useNavigate();

  if (menu) {
    return;
    <div>Menus postoji</div>;
  } else return null;
}

export default Menus;
