import React from "react";
import "./restoranHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faLocationDot,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

function RestoranHeader({
  restoranImg,
  restoranNaziv,
  restoranAdresa,
  restoranKategorija,
}) {
  return (
    <div className="restoranHeader">
      <div className="restoranHeaderLijevo">
        <img src={restoranImg} alt="" className="restoranHeadImg" />
        <div className="restoranHeaderOpis">
          <h2 className="iconNaziv">
            <FontAwesomeIcon icon={faUtensils} />
            {restoranNaziv}
          </h2>
          <h4 className="iconNaziv">
            <FontAwesomeIcon icon={faLocationDot} />
            {restoranAdresa}
          </h4>
          <h5 className="iconNaziv">
            <FontAwesomeIcon icon={faFilter} />
            {restoranKategorija}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default RestoranHeader;
