import React from "react";
import RestoranEditCard from "./RestoranEditCard";
import "../../components/componentsMain/restorani.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRestoranById } from "./restoraniApiSlice";
import "./restoraniEdit.css";

function RestoraniEdit({ restoranId }) {
  const restoran = useSelector((state) =>
    selectRestoranById(state, restoranId)
  );
  console.log(restoran);
  if (restoran) {
    return (
      <>
        <RestoranEditCard
          slikaRestorana={restoran.image.url}
          imeRestorana={restoran.naziv}
          ikonaRestorana="fastfood.png"
          adresaRestorana={restoran.adresa}
          restoranId={restoranId}
        />
      </>
    );
  } else return null;
}

export default RestoraniEdit;
