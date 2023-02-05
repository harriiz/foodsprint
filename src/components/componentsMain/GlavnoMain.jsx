import React from "react";
import KosturMain from "./KosturMain";
import AsideMain from "./AsideMain";
import "./glavnoMain.css";
import AsideRestoran from "../../features/menus/AsideRestoran";

function GlavnoMain() {
  return (
    <div className="glavnoMain">
      <KosturMain />
      <AsideRestoran />
    </div>
  );
}

export default GlavnoMain;
