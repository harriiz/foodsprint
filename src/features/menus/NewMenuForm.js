import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useAddNewMenuMutation } from "./menusApiSlice";
import useAuth from "../../hooks/useAuth";
import React from "react";
import { useGetUsersQuery, selectAllUsers } from "../users/usersApiSlice";
import { useSelector } from "react-redux";

const NewMenuForm = ({ restorani }) => {
  const [addNewMenu, { isLoading, isSuccess, isError, error }] =
    useAddNewMenuMutation();
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [naziv, setNaziv] = useState("");
  const [cijena, setCijena] = useState("");
  const [restoranId, setRestoranId] = useState(restorani[0]?.id || "");
  const [kategorija, setKategorija] = useState("");
  const [image, setImage] = useState([]);

  const users = useSelector(selectAllUsers);
  console.log(userId);
  console.log(users);

  useEffect(() => {
    if (isSuccess) {
      setNaziv("");
      setCijena("");
      setKategorija("");
      setRestoranId("");
      navigate("/main");
    }
  }, [isSuccess, navigate]);

  const onNazivChanged = (e) => setNaziv(e.target.value);
  const onCijenaChanged = (e) => setCijena(e.target.value);
  const onRestoranIdChanged = (e) => setRestoranId(e.target.value);
  const onKategorijaChanged = (e) => setKategorija(e.target.value);

  const canSave =
    [naziv, cijena, kategorija, restoranId].every(Boolean) && !isLoading;

  const onSaveMenuClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewMenu({ restoran: restoranId, naziv, cijena, kategorija });
    }
  };

  const options = restorani.map((restoran) => {
    return (
      <option key={restoran.id} value={restoran.id}>
        {restoran.naziv}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validNazivClass = !naziv ? "form__input--incomplete" : "";
  const validCijenaClass = !cijena ? "form__input--incomplete" : "";

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const content = (
    <>
      <p className={`error-message ${errClass}`}>{error?.data?.message}</p>
      <form className="restoran-form" onSubmit={onSaveMenuClicked}>
        <h2 className="form-title">NewMenu</h2>
        <div className="form-row">
          <label htmlFor="naziv">Naziv</label>
          <input
            type="text"
            id="naziv"
            value={naziv}
            onChange={onNazivChanged}
            className={`form-input ${validNazivClass}`}
          />
        </div>
        <div className="form-row">
          <label htmlFor="adresa">Cijena</label>
          <textarea
            id="cijena"
            value={cijena}
            onChange={onCijenaChanged}
            className={`form-input form-input--adresa ${validCijenaClass}`}
          />
        </div>
        <div className="form-row">
          <label htmlFor="adresa">Kategorija</label>
          <textarea
            id="kategorija"
            value={kategorija}
            onChange={onKategorijaChanged}
            className={`form-input form-input--adresa ${validCijenaClass}`}
          />
        </div>
        <div className="form-row">
          <label htmlFor="username">Assigned To:</label>
          <select
            id="username"
            value={restoranId}
            onChange={onRestoranIdChanged}
            className="form-select"
          >
            {options}
          </select>
        </div>

        <div className="form-outline mb-4">
          <input
            onChange={handleImage}
            type="file"
            id="formupload"
            name="image"
            className="form-control"
          />
          <label className="form-label" htmlFor="form4Example2">
            Slika jela
          </label>
        </div>

        <img className="img-fluid" src={image} alt="" />
        <div className="form-row form-row--action">
          <button className="form-button form-button--save" disabled={!canSave}>
            Save
          </button>
        </div>
      </form>
    </>
  );

  return content;
};

export default NewMenuForm;
