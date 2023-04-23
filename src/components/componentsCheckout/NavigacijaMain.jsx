import "./infoCheckout.css";
import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  MantineProvider,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";
import { Avatar } from "@mantine/core";
import FoodSprintLogoMain from "../componentsMain/FoodSprintLogoMain";
import ProfileAvatar from "../componentsMain/ProfileAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlass,
  faBell,
  fas,
  faS,
  faArrowDown,
  faL,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import MainSearch from "../componentsMain/MainSearch";
import { useState } from "react";
import { Link } from "react-router-dom";
import AsideMain from "../../features/menus/AsideRestoran";
import AsideKorpa from "../componentsMain/AsideKorpa";
import useAuth from "../../hooks/useAuth";
import { Menu } from "@mantine/core";
import {
  IconUser,
  IconBuildingStore,
  IconAdjustmentsAlt,
  IconTruckDelivery,
  IconLogout,
} from "@tabler/icons-react";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
function NavigacijaMain() {
  function Avatar() {
    return <Avatar variant="filled" radius="md" color="green" />;
  }

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const { isRestoran, isAdmin, isDostavljac } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const useStyles = createStyles((theme) => ({
    link: {
      display: "flex",
      alignItems: "center",
      height: "100%",
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      textDecoration: "none",
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,

      [theme.fn.smallerThan("sm")]: {
        height: 42,
        display: "flex",
        alignItems: "center",
        width: "100%",
      },

      ...theme.fn.hover({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      }),
    },

    subLink: {
      width: "100%",
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      borderRadius: theme.radius.md,

      ...theme.fn.hover({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[0],
      }),

      "&:active": theme.activeStyles,
    },

    dropdownFooter: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      margin: -theme.spacing.md,
      marginTop: theme.spacing.sm,
      padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
      paddingBottom: theme.spacing.xl,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1]
      }`,
    },

    hiddenMobile: {
      [theme.fn.smallerThan("sm")]: {
        display: "none",
      },
    },

    hiddenDesktop: {
      [theme.fn.largerThan("sm")]: {
        display: "none",
      },
    },
  }));

  const mockdata = [
    {
      icon: IconCode,
      title: "FoodSprint",
      description: "",
    },
  ];

  function HeaderMegaMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
      useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { classes, theme } = useStyles();

    const links = mockdata.map((item) => (
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group noWrap align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon size={22} color={theme.fn.primaryColor()} />
          </ThemeIcon>
          <div>
            <Text size="sm" weight={500}>
              {item.title}
            </Text>
            <Text size="xs" color="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    ));
    const boxShadows = {
      boxShadow:
        " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
      boxShadow:
        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
      position: "fixed",
      bottom: "20px",
      right: "20px",
      backgroundColor: "#40c057",
      zIndex: 1000,
    };

    return (
      <div>
        <Button
          variant="outline"
          color="green"
          radius="xl"
          size="lg"
          onClick={() => setModalOpen(true)}
          className={classes.hiddenDesktop}
          style={boxShadows}
        >
          <FontAwesomeIcon
            icon={faCartShopping}
            className=" markerAdresaMobitel"
            size="2x"
          />
        </Button>
        <Modal
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
          centered
          className="modalKorpa"
          size="sm"
          radius="xl"
        >
          <AsideKorpa />
        </Modal>
      </div>
    );
  }
  return HeaderMegaMenu();
}

export default NavigacijaMain;
