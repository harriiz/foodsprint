import React from "react";
import "../../components/componentsMain/restoranCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Modal } from "@mantine/core";
import EditRestoran from "./EditRestoran";

function RestoranEditCard({
  slikaRestorana,
  logoRestorana,
  imeRestorana,
  ikonaRestorana,
  adresaRestorana,
  restoranId,
}) {
  const [modal2Open, setModal2Open] = useState(false);

  const handleClick2 = () => {
    setModal2Open(true);
  };
  const navigate = useNavigate();
  const handleEdit = () => navigate(`/restoraniedit/${restoranId}`);
  return (
    <div className="restoranCardBox restoranEditCardBox">
      <Modal
        opened={modal2Open}
        onClose={() => setModal2Open(false)}
        size={"xl"}
        centered
      >
        <EditRestoran id={restoranId} />
      </Modal>
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
        <button className="editButton" onClick={handleClick2}>
          <FontAwesomeIcon icon={faPenToSquare} />
          Uredi Restoran
        </button>
      </div>
    </div>
  );
}

export default RestoranEditCard;
