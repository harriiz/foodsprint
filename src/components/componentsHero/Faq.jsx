import {
  createStyles,
  Title,
  Container,
  Accordion,
  ThemeIcon,
  MantineProvider,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";

import "./faq.css";

function Faq() {
  const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef("control");

    return {
      wrapper: {
        paddingTop: theme.spacing.xl * 4.3,
        minHeight: 650,
        backgroundImage: `radial-gradient(${
          theme.colors[theme.primaryColor][6]
        } 0%, ${theme.colors[theme.primaryColor][4]} 100%)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top left",
        position: "relative",
        color: theme.black,
      },

      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        height: 820,
      },
      title: {
        color: theme.white,
        fontSize: 52,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: theme.spacing.xl * 1.5,
      },

      item: {
        backgroundColor: theme.white,
        borderBottom: 0,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.lg,
        overflow: "hidden",
      },

      control: {
        fontSize: theme.fontSizes.lg,
        padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
        color: theme.black,

        "&:hover": {
          backgroundColor: "transparent",
        },
      },

      content: {
        paddingLeft: theme.spacing.xl,
        lineHeight: 1.6,
        color: theme.black,
      },

      icon: {
        ref: icon,
        marginLeft: theme.spacing.md,
      },

      gradient: {
        backgroundImage: `radial-gradient(${
          theme.colors[theme.primaryColor][6]
        } 0%, ${theme.colors[theme.primaryColor][5]} 100%)`,
      },

      itemOpened: {
        [`& .${icon}`]: {
          transform: "rotate(45deg)",
        },
      },

      button: {
        display: "block",
        marginTop: theme.spacing.md,

        "@media (max-width: 755px)": {
          display: "block",
          width: "100%",
        },
      },
    };
  });

  const placeholder =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged";
  function FaqWithBg() {
    const { classes } = useStyles();
    return (
      <MantineProvider inherit theme={{ colorScheme: "light" }}>
        <div className={classes.wrapper}>
          <Container
            size="sm"
            sx={{
              "@media (max-width: 768px)": {
                minHeight: 920,
                paddingTop: 30,
              },
            }}
          >
            <Title align="center" className={classes.title}>
              Često Postavljena Pitanja
            </Title>

            <Accordion
              chevronPosition="right"
              defaultValue="reset-password"
              chevronSize={50}
              variant="separated"
              disableChevronRotation
              chevron={
                <ThemeIcon radius="xl" className={classes.gradient} size={32}>
                  <IconPlus size={18} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <Accordion.Item className={classes.item} value="reset-password">
                <Accordion.Control>
                  Kolika je cijena FOODSPRINT dostave?
                </Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>
                  Da li je potrebna registracija za narudžbu?
                </Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>
                  Koliko je vremenski potrebno da dostava stigne?
                </Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  Na koji je način moguće platiti dostavu?
                </Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="payment">
                <Accordion.Control>Zanima me nešto drugo.</Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Container>
        </div>
      </MantineProvider>
    );
  }
  return FaqWithBg();
}

export default Faq;
