import { useState } from "react";
import { createStyles, Navbar, Group, Code } from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconHome,
  IconUsers,
  IconTruckDelivery,
  IconChefHat,
  IconPackage,
} from "@tabler/icons-react";

import "./navbarAdmin.css";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";

function NavbarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef("icon");
    return {
      header: {
        paddingBottom: theme.spacing.md,
        marginBottom: theme.spacing.md * 1.5,
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[4]
        }`,
      },

      footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[4]
        }`,
      },

      link: {
        ...theme.fn.focusStyles(),
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[1]
            : theme.colors.gray[7],
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[3],
          color: theme.colorScheme === "dark" ? theme.white : theme.black,

          [`& .${icon}`]: {
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
          },
        },
      },

      linkIcon: {
        ref: icon,
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[2]
            : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
      },

      linkActive: {
        "&, &:hover": {
          backgroundColor: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).background,
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
          [`& .${icon}`]: {
            color: theme.fn.variant({
              variant: "light",
              color: theme.primaryColor,
            }).color,
          },
        },
      },
    };
  });

  const data = [
    { link: "/panel", label: "Panel", icon: IconHome },
    { link: "/restorani", label: "Restorani", icon: IconChefHat },
    { link: "/dostavljaci", label: "Dostavljači", icon: IconTruckDelivery },
    { link: "/narudzbe", label: "Narudžbe", icon: IconPackage },
    { link: "/users", label: "Korisnici", icon: IconUsers },
  ];

  function NavbarSimple() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState("Billing");

    const links = data.map((item) => {
      const isActive = item.link === location.pathname;
      return (
        <Link
          className={cx(classes.link, {
            [classes.linkActive]: isActive,
          })}
          to={isActive ? "" : item.link}
          key={item.label}
          onClick={() => {
            if (location.pathname === item.link) return;
            setActive(item.label);
          }}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </Link>
      );
    });

    return (
      <Navbar height={700} width={{ sm: 400 }} p="md" className="navbarAdmin">
        <Navbar.Section grow>
          <Group className={classes.header} position="apart">
            <img
              src={require("../componentsHero/slike/foodsprint-logov6.png")}
              alt=""
              className="logoAdmin"
            />
            <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
          </Group>
          {links}
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Odjava</span>
          </a>
        </Navbar.Section>
      </Navbar>
    );
  }
  return NavbarSimple();
}

export default NavbarAdmin;
