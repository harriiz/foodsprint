import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewRestoranMutation } from "./restoraniApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import "./newRestoranForm.css";
import { Image } from "cloudinary-react";
import authSlice from "../auth/authSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";
import axios from "axios";
import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
const NewRestoranForm = ({ users }) => {
  const token = useSelector(selectCurrentToken);
  const [addNewRestoran, { isLoading, isSuccess, isError, error }] =
    useAddNewRestoranMutation();
  const [isOrderAdded, setIsOrderAdded] = useState(false);
  const navigate = useNavigate();
  const [naziv, setNaziv] = useState("");
  const [adresa, setAdresa] = useState("");
  const [kategorija, setKategorija] = useState("");
  const [userId, setUserId] = useState(users[0]?.id || "");
  const [image, setImage] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setNaziv("");
      setAdresa("");
      setUserId("");
      setKategorija("");
      navigate("/restorani");
    }
  }, [isSuccess, navigate]);

  const onNazivChanged = (e) => setNaziv(e.target.value);
  const onAdresaChanged = (e) => setAdresa(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);
  const onKategorijaChanged = (e) => {
    setKategorija(e.target.value);
  };

  const canSave =
    [naziv, adresa, kategorija, userId].every(Boolean) && !isLoading;

  const onSaveRestoranClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewRestoran({ user: userId, naziv, kategorija, adresa, image });
    }
  };

  const options = users
    .filter((user) => user.roles.includes("Restoran"))
    .map((user) => (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    ));

  const errClass = isError ? "errmsg" : "offscreen";
  const validNazivClass = !naziv ? "form__input--incomplete" : "";
  const validAdresaClass = !adresa ? "form__input--incomplete" : "";
  const validKategorijaClass = !kategorija ? "form__input--incomplete" : "";

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
      <form className="noviRestoranForma" onSubmit={onSaveRestoranClicked}>
        <h2 className="formNaslov">Novi Restoran</h2>
        <div className="formInput formNaziv">
          <label htmlFor="naziv">Naziv</label>
          <input
            type="text"
            id="naziv"
            value={naziv}
            onChange={onNazivChanged}
            className={`form-input ${validNazivClass}`}
          />
        </div>

        <div className="formInput Adresa">
          <label htmlFor="adresa">Adresa</label>
          <input
            id="adresa"
            type="text"
            value={adresa}
            onChange={onAdresaChanged}
            className={`form-input form-input--adresa ${validAdresaClass}`}
          />
        </div>

        <div className="formInput formKategorija">
          <label htmlFor="kategorija">Kategorija</label>
          <select
            type="text"
            id="kategorija"
            value={kategorija}
            onChange={onKategorijaChanged}
            className={`form-input ${validKategorijaClass}`}
          >
            <option value="">Izaberite kategoriju</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Pekara">Pekara</option>
            <option value="Slasticarna">Slasticarna</option>
            <option value="Pizzeria">Pizzeria</option>
            <option value="Restoran">Restoran</option>
            <option value="Market">Market</option>
            <option value="Kafic">Kafic</option>
          </select>
        </div>
        <div className="formInput formKategorija">
          <label htmlFor="username">Vlasnik:</label>
          <select
            id="username"
            value={userId}
            onChange={onUserIdChanged}
            className="form-input"
          >
            {options}
          </select>
          {/* file upl */}

          <div className="form-outline mb-4">
            <input
              onChange={handleImage}
              type="file"
              id="formupload"
              name="image"
              className="form-control"
            />
            <label className="form-label" htmlFor="form4Example2">
              Image
            </label>
          </div>

          <img className="img-fluid" src={image} alt="" />

          <button
            className="saveorderClicked"
            onClick={() => {
              onSaveRestoranClicked();
            }}
          >
            Sačuvaj Restoran
          </button>
        </div>
      </form>
    </>
  );

  return content;
};

export default NewRestoranForm;
