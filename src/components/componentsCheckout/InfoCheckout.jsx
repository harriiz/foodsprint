import React from "react";
import { Input, inputwra, Modal } from "@mantine/core";
import { IconAt } from "@tabler/icons";
import { useId } from "@mantine/hooks";
import { TextInput, Tooltip } from "@mantine/core";
import { useState } from "react";
import "./infoCheckout.css";
import "@fontsource/montserrat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import CheckoutItem from "./CheckoutItem";
import useAuth from "../../hooks/useAuth";
import { useAddNewOrderMutation } from "../../features/orders/ordersApiSlice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import "./itemsCheckout.css";
import { faCreditCard, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@mantine/core";
import resetCart from "../../app/cartRedux";

function InfoCheckout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { userId } = useAuth();
  const quantity = useSelector((state) => state.cart.quantity);
  const cart = useSelector((state) => state.cart);
  const totalCost = cart.total;
  let suma = ":";

  const [opened, setOpened] = useState(false);

  const [status, setStatus] = useState("Otvoreno");
  const [dostavljac, setDostavljac] = useState("0");

  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [mobitel, setMobitel] = useState("");
  const [email, setEmail] = useState("");
  const [adresa, setAdresa] = useState("");
  const [ulica, setUlica] = useState("");
  const [stan, setStan] = useState("");
  const [napomena, setNapomena] = useState("");

  const onImeChanged = (e) => setIme(e.target.value);
  const onPrezimeChanged = (e) => setPrezime(e.target.value);
  const onMobitelChanged = (e) => setMobitel(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onAdresaChanged = (e) => setAdresa(e.target.value);
  const onUlicaChanged = (e) => setUlica(e.target.value);
  const onStanChanged = (e) => setStan(e.target.value);
  const onNapomenaChanged = (e) => setNapomena(e.target.value);

  //provjera da li je forma popunjena
  useEffect(() => {
    setIsFormValid(
      cart.menus.length > 0 &&
        ime !== "" &&
        prezime !== "" &&
        mobitel !== "" &&
        email !== "" &&
        adresa !== "" &&
        ulica !== "" &&
        stan !== ""
    );
  }, [ime, prezime, mobitel, email, adresa, ulica, stan, napomena]);
  // dodavanje itema radi slanja u bazu
  if (cart.menus.length > 0) {
    for (let i = 0; i < cart.menus.length; i++) {
      suma = cart.menus[i].naziv + ", " + suma;
    }
  }

  // dodavanja info narudzbe radi slanja u bazu
  const adresaFull =
    ime +
    " " +
    prezime +
    " " +
    mobitel +
    "" +
    email +
    ", " +
    adresa +
    " " +
    ulica +
    ", Stan: " +
    stan +
    ", Napomena: " +
    napomena;

  const [addNewOrder, { isLoading, isSuccess, isError, error }] =
    useAddNewOrderMutation();

  const onSaveOrderClicked = async (e) => {
    await addNewOrder({
      userId: userId,
      amount: cart.total,
      adresa: adresaFull,
      menus: suma,
      status: status,
      dostavljac: dostavljac,
    });

    // console.log("clicked");
    console.log(
      "userId:" +
        userId +
        " /Amount:" +
        cart.total +
        " /Menus " +
        suma +
        "/Status" +
        status +
        "/Dostavljac" +
        dostavljac
    );
  };
  return (
    <>
      <Modal
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        centered
        opened={opened}
        overlayBlur={1}
        onClose={() => setOpened(false)}
        className="modalcic"
      >
        <div class="success-animation">
          <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              class="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              class="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <span>
          Narudžba <span className="uspjesna">uspješna</span>!
        </span>
      </Modal>
      ;
      <div className="infoCheckout">
        <div className="header">
          <Link to="/main">
            {" "}
            <img
              src={require("./slike/foodsprint-logov6.png")}
              alt=""
              className="headerImg"
            />{" "}
          </Link>

          <div className=" checkoutPovratak">
            <Link to="/main">
              <FontAwesomeIcon
                icon={faHome}
                color="green"
                className="homeIcn"
              />
            </Link>
          </div>
        </div>

        <div className="bodyCheckout">
          <h1 className="titleCheckout">CHECKOUT - DOSTAVA</h1>
          <div className="licniPodaci lp1">
            <div className="licniNaslov">
              <p className="label">01</p>
              <h1>LIČNI PODACI</h1>
            </div>
            <div className="licniInput">
              <div className="imePrezime">
                <TextInput
                  label="Ime"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="imeInput"
                  value={ime}
                  onChange={onImeChanged}
                />
                <TextInput
                  label="Prezime"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="prezimeInput"
                  value={prezime}
                  onChange={onPrezimeChanged}
                />
              </div>
              <div className="telmail">
                <div className="brTelefon">
                  <TextInput
                    label="Broj mobitela"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="telefonInput"
                    value={mobitel}
                    onChange={onMobitelChanged}
                  />
                </div>
                <div className="emailCheckout">
                  <TextInput
                    label="E-Mail"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="emailInput"
                    value={email}
                    onChange={onEmailChanged}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="licniPodaci">
            <div className="licniNaslov">
              <p className="label">02</p>
              <h1>DOSTAVA</h1>
            </div>
            <div className="licniInput">
              <div className="adresaReal">
                <TextInput
                  label="Adresa"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="adrInput"
                  value={adresa}
                  onChange={onAdresaChanged}
                />
              </div>
              <div className="telmail">
                <div className="brTelefon">
                  <TextInput
                    label="Ulica"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="telefonInput"
                    value={ulica}
                    onChange={onUlicaChanged}
                  />
                </div>
                <div className="emailCheckout">
                  <TextInput
                    label="Stan"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="Broj stana"
                    value={stan}
                    onChange={onStanChanged}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="licniPodaci">
            <div className="licniNaslov">
              <p className="label">03</p>
              <h1>NARUDŽBA</h1>
            </div>
            <div className="licniInput">
              <div className="adresaReal">
                <TextInput
                  label="Napomena"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="adrInput"
                  placeholder="Imate neki poseban zahtjev?"
                  value={napomena}
                  onChange={onNapomenaChanged}
                />
              </div>
              <div className="telmail1">
                <div className="naruciButtonContainer">
                  <h2>UKUPNO: {cart.total}KM</h2>

                  <div className="succesModal" onClick={() => setOpened(true)}>
                    {" "}
                    <Button
                      color="green"
                      radius="xl"
                      size="xl"
                      onClick={onSaveOrderClicked}
                      disabled={!isFormValid}
                      className="naruciBtn"
                    >
                      Naruči
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="asideMainCheckout">
        <div className="cartContainerCheckout">
          <div className="korpaContainerCheckout">
            <img src={require("./myCart.png")} />
            <h2 className="mojaNarudzbaCheckout">
              <span className="mojaKorpaCheckout">Moja </span>
              Korpa
            </h2>
          </div>
          <div className="cartItemsCheckout">
            {cart.menus.map((cartItem) => (
              <CheckoutItem
                name={cartItem.naziv}
                price={cartItem.cijena}
                number={cartItem.quantity}
                img={cartItem.image.url}
                className="checkoutItem"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoCheckout;
