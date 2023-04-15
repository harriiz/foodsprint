import React from "react";
import RestoraniEditList from "../../features/restorani/RestoraniEditList";
import { AppShell, Navbar, Header } from "@mantine/core";
import NavbarAdmin from "./NavbarAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Button, Modal } from "@mantine/core";
import { Link } from "react-router-dom";
import MainSearchPanel from "./MainSearchPanel";
import { useState } from "react";
import NewRestoranForm from "../../features/restorani/NewRestoranForm";
import NewRestoran from "../../features/restorani/NewRestoran";
import EditRestoran from "../../features/restorani/EditRestoran";
import User from "../../features/users/User";
import { ROLES } from "../../config/roles";
import { useEffect } from "react";
import "../../features/users/usersList.css";
import useAuth from "../../hooks/useAuth";
import { useGetUsersQuery } from "../../features/users/usersApiSlice";
function RestoraniPanel() {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList");

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  const username = JSON.parse(localStorage.getItem("username"));

  if (isSuccess) {
    const { ids } = users; //destructuring ids

    const filteredIdsZahtjev = ids.filter((id) =>
      users.entities[id].roles.includes("RestoranZahtjev")
    );
    const tableContentZahtjev = filteredIdsZahtjev?.length
      ? filteredIdsZahtjev.map((userId) => (
          <User key={userId} userId={userId} />
        ))
      : null;
    const handleClick = () => {
      setModalOpen(true);
    };

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
          <Modal
            opened={modalOpen}
            onClose={() => setModalOpen(false)}
            size={"xl"}
            centered
          >
            <NewRestoran />
          </Modal>
          <h1>FoodSprint RESTORANI</h1>
          <div className="dodavanjeRestorana">
            <h2>Dodavanje novog restorana</h2>
            <Button
              radius={"md"}
              size={"md"}
              className="btnAddRestoran"
              onClick={handleClick}
            >
              Dodaj
            </Button>
            {/* <Link to="/restoraniedit/new">
            <Button radius={"md"} size={"md"} className="btnAddRestoran">
              Dodaj
            </Button> 
          </Link>{" "}*/}
          </div>
          <div className="tabelaZahtjevi">
            <h2>Zahtjevi za Restoran</h2>

            <table className="table table--users">
              <thead className="table__thead">
                <tr>
                  <th scope="col" className="table__th user__username">
                    Dostavljač
                  </th>
                  <th scope="col" className="table__th user__roles">
                    Role
                  </th>
                  <th scope="col" className="table__th user__edit">
                    Uredi
                  </th>
                  <th scope="col" className="table__th user__edit">
                    Restoran
                  </th>
                </tr>
              </thead>
              <tbody>{tableContentZahtjev}</tbody>
            </table>
          </div>
          <h2>Uređivanje postojećih restorana</h2>
          <MainSearchPanel />
          <RestoraniEditList />{" "}
        </AppShell>
      </div>
    );
  }
}

export default RestoraniPanel;
