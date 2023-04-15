import React from "react";
import "../../components/componentsMain/restoranCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function RestoranCard({
  slikaRestorana,
  imeRestorana,
  ikonaRestorana,
  adresaRestorana,
}) {
  return (
    <div className="restoranCardBox">
      <div className="restoranCardInBox">
        <img src={slikaRestorana} alt="" className="restoranImg" />
      </div>

      <div className="restoranInformacije">
        <div className="restoranCardInfoBox">
          <h3 className="restoranCardTitle">{imeRestorana}</h3>
        </div>
        <div className="restoranCardAdresaBox">
          <span className="restoranCardMarker">
            <FontAwesomeIcon icon={faLocationDot} />
          </span>
          <p className="restoranCardAdresa">{adresaRestorana}</p>
        </div>
      </div>
    </div>
  );
}

export default RestoranCard;
