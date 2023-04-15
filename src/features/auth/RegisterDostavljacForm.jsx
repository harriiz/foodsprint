import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@mantine/core";
import { IconLock, IconAt } from "@tabler/icons";
import { Link } from "react-router-dom";
import { Modal, Button } from "@mantine/core";
function RegisterDostavljacForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const roles = "DostavljacZahtjev";

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to the /register route with the form data
    fetch("http://localhost:3500/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, roles }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle server response
        // console.log(data);
        navigate("/prijava");
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
      });
  };

  return (
    <section>
      <div className="loginPage">
        <div className="loginLijevo">
          <img
            src={require("../../components/componentsHero/slike/foodsprint-logov6.png")}
            className="logo"
          />
          <h1 className="loginNaslov">Registracija DOSTAVLJAČA</h1>
          <p>Dobro došli na FoodSprint, molimo registrujte se!</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputs">
              <Input
                icon={<IconAt />}
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
                icon={<IconLock />}
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

export default RegisterDostavljacForm;
