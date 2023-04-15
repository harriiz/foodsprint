import React from "react";
import DostavaComponent from "./DostavaComponent";
import { AppShell } from "@mantine/core";
import { Navbar } from "@mantine/core";
import { Header } from "@mantine/core";
import NavbarDostavljac from "./NavbarAdmin";
import HeaderDostavljac from "./HeaderDostavljac";
function PanelDostavljac() {
  return (
    <AppShell
      className="panel"
      layout="alt"
      navbar={
        <Navbar width={{ base: 400 }} height={500} p="xs">
          <NavbarDostavljac />
        </Navbar>
      }
      header={
        <Header height={95} p="xl" className="headerAdmin">
          <HeaderDostavljac />
        </Header>
      }
    >
      <DostavaComponent />
    </AppShell>
  );
}

export default PanelDostavljac;
