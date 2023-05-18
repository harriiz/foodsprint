import { useState, useEffect } from "react";
import {
  useUpdateRestoranMutation,
  useDeleteRestoranMutation,
} from "./restoraniApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./editRestoranForm.css";
import { FileInput } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
const EditRestoranForm = ({ restoran, users }) => {
  const [updateRestoran, { isLoading, isSuccess, isError, error }] =
    useUpdateRestoranMutation();

  const [
    deleteRestoran,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteRestoranMutation();

  const navigate = useNavigate();

  const [naziv, setNaziv] = useState(restoran.naziv);
  const [adresa, setAdresa] = useState(restoran.adresa);
  const [completed, setCompleted] = useState(restoran.completed);
  const [userId, setUserId] = useState(restoran.user);
  const [kategorija, setKategorija] = useState();
  const [image, setImage] = useState([]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setNaziv("");
      setAdresa("");
      setUserId("");
      setKategorija("");
      setImage("");
      navigate("/restorani");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onKategorijaChanged = (e) => {
    setKategorija(e.target.value);
  };

  const onNazivChanged = (e) => setNaziv(e.target.value);
  const onAdresaChanged = (e) => setAdresa(e.target.value);
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave =
    [naziv, adresa, userId, kategorija].some(Boolean) && !isLoading;

  const onSaveRestoranClicked = async (e) => {
    if (canSave) {
      await updateRestoran({
        id: restoran.id,
        user: userId,
        naziv: naziv,
        adresa: adresa,
        kategorija: kategorija,
        image: image,
      });
    }
  };

  const onDeleteRestoranClicked = async () => {
    await deleteRestoran({ id: restoran.id });
  };

  const created = new Date(restoran.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(restoran.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = users
    .filter((user) => user.roles.includes("Restoran"))
    .map((user) => (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    ));

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

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validNazivClass = !naziv ? "form__input--incomplete" : "";
  const validAdresaClass = !adresa ? "form__input--incomplete" : "";
  const validKategorijaClass = !kategorija ? "form__input--incomplete" : "";
  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={`error-message ${errClass}`}>{errContent}</p>
      <form className="restoran-form">
        <h2 className="form-title">Uredite Restoran #{restoran.ticket}</h2>
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
          <label htmlFor="adresa">Adresa</label>
          <input
            type="text"
            id="adresa"
            value={adresa}
            onChange={onAdresaChanged}
            className={`form-input ${validAdresaClass}`}
          />
        </div>
        <div className="formInput formKategorija">
          <label htmlFor="kategorija">Kategorija</label>
          <select
            type="text"
            id="kategorija"
            value={kategorija}
            onChange={onKategorijaChanged}
            className={`form-input `}
          >
            <option>Izaberite kategoriju</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Pekara">Pekara</option>
            <option value="Slasticarna">Slasticarna</option>
            <option value="Pizzeria">Pizzeria</option>
            <option value="Restoran">Restoran</option>
            <option value="Market">Market</option>
            <option value="Kafic">Kafic</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="userId">User</label>
          <select
            id="userId"
            value={userId}
            onChange={onUserIdChanged}
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
            Slika restorana
          </label>
        </div>

        <img className="img-fluid" src={image} alt="" />

        <div className="form-row savedeleteButtons">
          <button
            className="form-button form-button--save"
            disabled={!canSave}
            onClick={onSaveRestoranClicked}
          >
            <FontAwesomeIcon icon={faSave} />
            Save
          </button>
          <button
            className="form-button form-button--delete"
            onClick={onDeleteRestoranClicked}
          >
            <FontAwesomeIcon icon={faTrashCan} />
            Delete
          </button>
        </div>

        <div className="form-row ">
          <p>Napravljen: {created}</p>
          <p>Zadnji put uređen: {updated}</p>
        </div>
      </form>
    </>
  );

  return content;
};

export default EditRestoranForm;
