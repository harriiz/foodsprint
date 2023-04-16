import { useState, useEffect } from "react";
import { useUpdateMenuMutation, useDeleteMenuMutation } from "./menusApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FileInput } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
const EditMenuForm = ({ menu, users }) => {
  const [updateMenu, { isLoading, isSuccess, isError, error }] =
    useUpdateMenuMutation();

  const [
    deleteMenu,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteMenuMutation();

  const navigate = useNavigate();

  const [naziv, setNaziv] = useState(menu.naziv);
  const [cijena, setCijena] = useState(menu.cijena);
  const [restoranId, setRestoranId] = useState(menu.restoran);
  const [kategorija, setKategorija] = useState(menu.kategorija);
  const [image, setImage] = useState([]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setNaziv("");
      setCijena("");
      setRestoranId("");
      setKategorija("");
      setImage("");
      navigate("/restoranpanel");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onKategorijaChanged = (e) => {
    setKategorija(e.target.value);
  };

  const onNazivChanged = (e) => setNaziv(e.target.value);
  const onCijenaChanged = (e) => setCijena(e.target.value);

  const onRestoranIdChanged = (e) => setRestoranId(e.target.value);

  const canSave =
    [naziv, cijena, restoranId, kategorija].some(Boolean) && !isLoading;

  const onSaveMenuClicked = async (e) => {
    if (canSave) {
      await updateMenu({
        id: menu.id,
        restoran: restoranId,
        naziv: naziv,
        cijena: cijena,
        kategorija: kategorija,
        image: image,
      });
    }
  };

  const onDeleteMenuClicked = async () => {
    await deleteMenu({ id: menu.id });
  };

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
  const validCijenaClass = !cijena ? "form__input--incomplete" : "";
  const validKategorijaClass = !kategorija ? "form__input--incomplete" : "";
  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={`error-message ${errClass}`}>{errContent}</p>
      <form className="menu-form">
        <h2 className="form-title">Uredite Jelo{menu.ticket}</h2>
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
          <label htmlFor="cijena">Cijena</label>
          <input
            type="text"
            id="cijena"
            value={cijena}
            onChange={onCijenaChanged}
            className={`form-input ${validCijenaClass}`}
          />
        </div>
        <div className="formInput formKategorija">
          <label htmlFor="kategorija">Kategorija</label>
          <input
            type="text"
            id="kategorija"
            value={kategorija}
            onChange={onKategorijaChanged}
            className={`form-input `}
          ></input>
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

        <div className="form-row savedeleteButtons">
          <button
            className="form-button form-button--save"
            disabled={!canSave}
            onClick={onSaveMenuClicked}
          >
            <FontAwesomeIcon icon={faSave} />
            Uredi
          </button>
          <button
            className="form-button form-button--delete"
            onClick={onDeleteMenuClicked}
          >
            <FontAwesomeIcon icon={faTrashCan} />
            Izbriši
          </button>
        </div>
      </form>
    </>
  );

  return content;
};

export default EditMenuForm;
