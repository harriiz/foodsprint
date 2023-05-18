import React from "react";
import { AppShell, Navbar, Header } from "@mantine/core";
import NavbarAdmin from "./NavbarAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Button, Modal } from "@mantine/core";
import { Link } from "react-router-dom";
import MainSearchPanel from "./MainSearchPanel";
import { useState } from "react";
import UsersList from "../../features/users/UsersList";
import DostavljacList from "../../features/users/DostavljacList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {
  IconUsers,
  IconTruckDelivery,
  IconChefHat,
  IconPackage,
  IconTruck,
  IconSettings,
  IconBackspace,
  IconArrowBack,
} from "@tabler/icons-react";
function KorisniciPanel() {
  return (
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
      <DostavljacList />

      <div className="ikonicePanel">
        <Link to="/restorani">
          <IconChefHat color="green" className="ikonaPnl homeIcn homeIcn2" />
        </Link>
        <Link to="/dostavljaci">
          <IconTruckDelivery
            color="green"
            className="ikonaPnl homeIcn homeIcn2"
          />
        </Link>
        <Link to="/narudzbe">
          <IconPackage color="green" className="ikonaPnl homeIcn homeIcn2" />
        </Link>
        <Link to="/users">
          <IconUsers color="green" className="ikonaPnl homeIcn homeIcn2" />
        </Link>
        <Link to="/panel">
          <IconArrowBack color="green" className="ikonaPnl homeIcn homeIcn2" />
        </Link>
      </div>
    </AppShell>
  );
}

export default KorisniciPanel;
