import React from "react";
import { Link } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import { AppShell, Header, Navbar } from "@mantine/core";
import HeaderAdmin from "./HeaderAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import "./panel.css";
import StatsCard from "./StatsCard";
import { useSelector } from "react-redux";
import { selectAllRestorani } from "../../features/restorani/restoraniApiSlice";
import { selectAllOrders } from "../../features/orders/ordersApiSlice";
import { selectAllUsers } from "../../features/users/usersApiSlice";
import { useGetOrdersQuery } from "../../features/orders/ordersApiSlice";
import { selectAllMenus } from "../../features/menus/menusApiSlice";
function Panel() {
  const restorani = useSelector(selectAllRestorani);
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery();

  const users = useSelector(selectAllUsers);
  const menus = useSelector(selectAllMenus);

  const brojJela = menus.length;
  let brojNarudzbi;
  if (!isLoading && !isError && orders) {
    brojNarudzbi = orders.ids.length;
  }

  const brojRestorana = restorani.length;

  function countDostavljacUsers(users) {
    return users.filter(
      (user) => user.roles && user.roles.includes("Dostavljac")
    ).length;
  }

  function countKorisnikUsers(users) {
    return users.filter((user) => user.roles && user.roles.includes("Korisnik"))
      .length;
  }
  const brojDostavljaca = countDostavljacUsers(users);
  const brojKorisnika = countKorisnikUsers(users);

  return (
    <div>
      <AppShell
        className="panel"
        layout="alt"
        navbar={
          <Navbar width={{ base: 400 }} height={500} p="xs">
            <NavbarAdmin />
          </Navbar>
        }
        header={
          <Header height={95} p="xl" className="headerAdmin">
            <HeaderAdmin />
          </Header>
        }
      >
        <div className="statsCards">
          <StatsCard
            img="shoppingCart.png"
            item="Broj narudžbi:"
            cijena={brojNarudzbi}
            className="statscardImg"
          />
          <StatsCard
            img="restorani.png"
            item="Restorani"
            cijena={brojRestorana}
            className="statscardImg"
          />
          <StatsCard
            img="dostava.png"
            item="Dostavljači"
            cijena={brojDostavljaca}
            className="statscardImg"
          />
          <StatsCard
            img="korisnici.png"
            item="Korisnici"
            cijena={brojKorisnika}
            className="statscardImg"
          />
          <StatsCard img="foodMenu.png" item="Broj jela:" cijena={brojJela} />
        </div>
        <div className="panelMain">
          <div className="restoraniPnl restoranskiPnl">
            <img src={require("./slike/restaurant3d.png")} alt="" />
            <div className="restoraniNaslovi">
              <h2>01</h2>
              <h2>Upravljanje Restoranima</h2>
              <p>Upravljajte svim FoodSprint restoranima</p>
            </div>
            <div className="resotraniLinkovi">
              <p>Uređivanje i dodavanje novih restorana:</p>
              <Link to="/restoraniedit/new" className="link">
                <button className="novi rstrn">Novi Restoran</button>
              </Link>
              <Link to="/restoraniedit" className="link">
                <button className="uredi rstrn">Uredi Restoran</button>
              </Link>
            </div>
          </div>
          <div className="korisniciPnl">
            {" "}
            <div className="restoraniPnl korisnickiPnl">
              <img src={require("./slike/ppl3d.png")} alt="" />
              <div className="restoraniNaslovi">
                <h2>02</h2>
                <h2>Upravljanje Korisnicima</h2>
                <p>Upravljajte svim FoodSprint korisnicima</p>
              </div>
              <div className="resotraniLinkovi">
                <p>Uređivanje i dodavanje novih restorana:</p>
                <Link to="/users/new" className="link">
                  <button className="novi Krsnk">Novi Korisnik</button>
                </Link>
                <Link to="/users" className="link">
                  <button className="uredi Krsnk">Uredi Korisnika</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="narudzbePnl">
            {" "}
            <div className="restoraniPnl narudzbeniPnl">
              <img src={require("./slike/delivery3d.png")} alt="" />
              <div className="restoraniNaslovi">
                <h2>03</h2>
                <h2>Upravljanje Narudžbama</h2>
                <p>Upravljajte svim FoodSprint narudžbama</p>
              </div>
              <div className="resotraniLinkovi">
                <p>Uređivanje i dodavanje dostavljača </p>
                <Link to="/narudzbe" className="link">
                  <button className="novi Nrdzb">Narudzbe</button>
                </Link>
                <Link to="/restoraniedit" className="link">
                  <button className="uredi Nrdzb">Dostavljači</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* <Link to="/restoraniedit/neww" className="link">
            <button className="dodajMenu">Dodaj Menu</button>
          </Link> */}
      </AppShell>
    </div>
  );
}

export default Panel;
