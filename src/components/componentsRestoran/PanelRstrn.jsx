import "./panelRstrn.css";
import { AppShell } from "@mantine/core";
import { Navbar } from "@mantine/core";
import { Header } from "@mantine/core";
import HeaderRestoran from "./HeaderRestoran";
import NavbarRestoran from "./NavbarRestoran";
import RestoranOwner from "../../features/restorani/RestoranOwner";
function PanelRstrn() {
  return (
    <AppShell
      className="panel"
      layout="alt"
      navbar={
        <Navbar width={{ base: 400 }} height={500} p="xs">
          <NavbarRestoran />
        </Navbar>
      }
      header={
        <Header height={95} p="xl" className="headerAdmin">
          <HeaderRestoran />
        </Header>
      }
    >
      <RestoranOwner />
    </AppShell>
  );
}

export default PanelRstrn;
