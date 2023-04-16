import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@mantine/core";
//import { IconLock, IconAt } from "@tabler/icons-react";
import { Link } from "react-router-dom";
function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const roles = "Korisnik";

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to the /register route with the form data
    fetch("https://foodsprint-backend.onrender.com/register", {
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
          <h1 className="loginNaslov">Registracija</h1>
          <p>Dobro došli na FoodSprint, molimo registrujte se!</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputs">
              <Input
                //   icon={<IconAt />}
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
                //    icon={<IconLock />}
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
    // <form onSubmit={handleSubmit}>
    //   <label htmlFor="username">Username:</label>
    //   <input
    //     type="text"
    //     id="username"
    //     value={username}
    //     onChange={(e) => setUsername(e.target.value)}
    //   />

    //   <label htmlFor="password">Password:</label>
    //   <input
    //     type="password"
    //     id="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />

    //   <button type="submit">Register</button>
    // </form>
  );
}

export default RegisterForm;
