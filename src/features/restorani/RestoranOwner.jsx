import { useGetRestoraniQuery } from "./restoraniApiSlice";
import { selectAllRestorani } from "./restoraniApiSlice";
import Restorani from "./Restorani";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import RestoranCard from "./RestoranCard";
import RestoraniEdit from "./RestoraniEdit";
import { useState } from "react";
import { useAddNewMenuMutation } from "../menus/menusApiSlice";
import { useEffect } from "react";
import { Modal, Button } from "@mantine/core";
import MenuListPanel from "./MenuListPanel";
const RestoranOwner = () => {
  const { userId } = useAuth();
  const restoraniAll = useSelector(selectAllRestorani);
  const [opened, setOpened] = useState(false);

  const [addNewMenu, { isLoading, isSuccess, isError, error }] =
    useAddNewMenuMutation();
  const [naziv, setNaziv] = useState("");
  const [cijena, setCijena] = useState("");
  const [kategorija, setKategorija] = useState("");
  const [image, setImage] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setNaziv("");
      setCijena("");
      setKategorija("");
    }
  }, [isSuccess]);

  const onNazivChanged = (e) => setNaziv(e.target.value);
  const onCijenaChanged = (e) => setCijena(e.target.value);
  const onKategorijaChanged = (e) => setKategorija(e.target.value);

  const canSave = [naziv, cijena].every(Boolean);

  const errClass = isError ? "errmsg" : "offscreen";
  const validNazivClass = !naziv ? "form__input--incomplete" : "";
  const validCijenaClass = !cijena ? "form__input--incomplete" : "";

  console.log(restoraniAll);
  for (let i = 0; i < restoraniAll.length; i++) {
    if (restoraniAll[i].user && userId === restoraniAll[i].user._id) {
      const mojRestoran = restoraniAll[i];
      console.log(mojRestoran.id);
      const onSaveMenuClicked = async (e) => {
        if (canSave) {
          await addNewMenu({
            restoran: mojRestoran.id,
            naziv,
            cijena,
            kategorija,
            image,
          });
        }
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
      return (
        <div className="restoranOwner">
          <div className="ownerLijevo">
            <h2>Restoran: {mojRestoran.naziv}</h2>
            <h3>Adresa: {mojRestoran.adresa}</h3>
            <h4>Vlasnik: {mojRestoran.user.username}</h4>
            <div className="rstrnCard">
              <RestoranCard
                slikaRestorana={mojRestoran.image.url}
                logoRestorana="restoranLogo3.png"
                imeRestorana={mojRestoran.naziv}
                adresaRestorana={mojRestoran.adresa}
              />
            </div>
            <Button
              size="lg"
              radius="md"
              onClick={() => setOpened(true)}
              className="novoJeloBtn"
            >
              Dodaj novo jelo
            </Button>
          </div>
          <h2 className="urediIzbrisiJelo">Uredite/Izbrišite jela:</h2>
          <MenuListPanel />
          <Modal opened={opened} onClose={() => setOpened(false)} size="lg">
            <p className={`error-message ${errClass}`}>
              {error?.data?.message}
            </p>
            <form className="restoran-form" onSubmit={onSaveMenuClicked}>
              <h2 className="form-title">Novo Jelo</h2>
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

              <img className="imgDisplej" src={image} alt="" />
              <div className="form-row ">
                <button className="form-button f" disabled={!canSave}>
                  Sačuvaj
                </button>
              </div>
            </form>
          </Modal>
        </div>
      );
    }
  }
  return <p>Ne posjedujete restoran</p>;
};

export default RestoranOwner;
