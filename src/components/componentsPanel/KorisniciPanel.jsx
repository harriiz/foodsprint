import React from "react";
import { AppShell, Navbar, Header } from "@mantine/core";
import NavbarAdmin from "./NavbarAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Button, Modal } from "@mantine/core";
import { Link } from "react-router-dom";
import MainSearchPanel from "./MainSearchPanel";
import { useState } from "react";
import UsersList from "../../features/users/UsersList";
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
      <UsersList />
    </AppShell>
  );
}

export default KorisniciPanel;
