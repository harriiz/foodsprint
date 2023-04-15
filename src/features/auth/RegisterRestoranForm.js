import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@mantine/core";
//import { IconLock, IconAt } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Modal, Button } from "@mantine/core";
function RegisterRestoranForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const roles = "RestoranZahtjev";
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const [nazivZahtjev, setNazivZahtjev] = useState("");
  const [adresaZahtjev, setAdresaZahtjev] = useState("");
  const [slikaZahtjev, setSlikaZahtjev] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to the /register route with the form data
    fetch("http://localhost:3500/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        roles,
        nazivZahtjev,
        adresaZahtjev,
        slikaZahtjev,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle server response
        // console.log(data);
        setOpened(true);
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
      });
    navigate("/prijava");
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
      setSlikaZahtjev(reader.result);
    };
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();
    setOpened(true);
  };

  const handleClick = () => {
    navigate("/prijava");
  };

  return (
    <section>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <h3 className="restoranUspjesno">
          Uspješno ste registrovali račun pomoću kojeg ćete upravljati vašim
          restoranom. Prije nego što nastavite, molimo popunite polja ispod:
        </h3>
        <div className="restoranInputs">
          <Input
            //  icon={<IconAt />}
            placeholder="Naziv restorana"
            radius="md"
            size="lg"
            type="text"
            id="naziv"
            value={nazivZahtjev}
            onChange={(e) => setNazivZahtjev(e.target.value)}
            autoComplete="off"
            required
            className="input"
          />
          <Input
            //    icon={<IconAt />}
            placeholder="Adresa restorana"
            radius="md"
            size="lg"
            type="text"
            id="adresa"
            value={adresaZahtjev}
            onChange={(e) => setAdresaZahtjev(e.target.value)}
            autoComplete="off"
            required
            className="input"
          />
          <div className="form-outline mb-4">
            <input
              onChange={handleImage}
              type="file"
              id="formupload"
              name="slikaZahtjev"
              className="form-control"
            />
            <label className="form-label" htmlFor="form4Example2">
              Image
            </label>
            <Button onClick={handleSubmit}>Nastavi</Button>
          </div>
        </div>
      </Modal>
      <div className="loginPage">
        <div className="loginLijevo">
          <img
            src={require("../../components/componentsHero/slike/foodsprint-logov6.png")}
            className="logo"
          />
          <h1 className="loginNaslov">Registracija RESTORANA</h1>
          <p>Dobro došli na FoodSprint, molimo registrujte vaš restoran!</p>
          <form className="form" onSubmit={handleClickSubmit}>
            <div className="inputs">
              <Input
                //    icon={<IconAt />}
                placeholder="Korisničko ime"
                radius="md"
                size="xl"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                required
                className="input"
              />
              <Input
                //   icon={<IconLock />}
                placeholder="Šifra"
                radius="md"
                size="xl"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
              />
            </div>
            <div className="submitForm">
              <button className="submitBtn">Registracija</button>
            </div>
            <Link className="povratak" to="/">
              Nazad na Početak
            </Link>
          </form>
        </div>
        <div className="loginDesno">
          {/* <img src={require("./slike/login.svg").default} /> */}
        </div>
      </div>
    </section>
  );
}

export default RegisterRestoranForm;
