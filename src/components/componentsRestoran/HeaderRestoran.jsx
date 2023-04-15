import React from "react";
import "../componentsPanel/headerAdmin.css";
import moment from "moment/moment";
import ProfileAvatar from "../componentsMain/ProfileAvatar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function HeaderRestoran() {
  moment.locale("bs");
  let vrijeme = moment().format("MMMM Do YYYY ");
  return (
    <div className="headerAdmin">
      <div className="headerNslv">
        <h1 className="headerTitle">Restoran Panel</h1>
        <p className="vrijemeAdmin">{vrijeme}</p>
      </div>
      <Link to="/main">
        <FontAwesomeIcon
          icon={faHome}
          color="green"
          className="homeIcn homeIcn2"
        />
      </Link>
    </div>
  );
}

export default HeaderRestoran;
