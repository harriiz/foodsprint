import React from "react";
import RestoranCard from "./RestoranCard";
import "../../components/componentsMain/restorani.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRestoranById } from "./restoraniApiSlice";
import "../../components/componentsMain/restorani.css";

function Restorani({ restoranId }) {
  const restoran = useSelector((state) =>
    selectRestoranById(state, restoranId)
  );
  const navigate = useNavigate();

  if (restoran) {
    const handleClick = () => navigate(`/main/${restoranId}`);
    return (
      <>
        <div onClick={handleClick}>
          <RestoranCard
            slikaRestorana={restoran.image.url}
            logoRestorana="restoranLogo3.png"
            imeRestorana={restoran.naziv}
            adresaRestorana={restoran.adresa}
          />
        </div>
      </>
    );
  } else return null;
}

export default Restorani;
