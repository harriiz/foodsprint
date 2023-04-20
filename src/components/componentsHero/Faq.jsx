import {
  createStyles,
  Title,
  Container,
  Accordion,
  ThemeIcon,
  MantineProvider,
  getStylesRef,
  rem,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

function Faq() {
  const useStyles = createStyles((theme) => ({
    wrapper: {
      paddingTop: `calc(${theme.spacing.xl} * 2)`,
      minHeight: rem(720),
      backgroundImage: `radial-gradient(${
        theme.colors[theme.primaryColor][6]
      } 0%, ${theme.colors[theme.primaryColor][4]} 100%)`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top left",
      position: "relative",
      color: theme.black,
    },

    title: {
      color: theme.white,
      fontSize: 52,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
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
      padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
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
      ref: getStylesRef("icon"),
      marginLeft: theme.spacing.md,
    },

    gradient: {
      backgroundImage: `radial-gradient(${
        theme.colors[theme.primaryColor][6]
      } 0%, ${theme.colors[theme.primaryColor][5]} 100%)`,
    },

    itemOpened: {
      [`& .${getStylesRef("icon")}`]: {
        transform: "rotate(45deg)",
      },
    },

    button: {
      display: "block",
      marginTop: theme.spacing.md,

      [theme.fn.smallerThan("sm")]: {
        display: "block",
        width: "100%",
      },
    },
  }));

  const placeholder =
    "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.";

  const { classes } = useStyles();
  return (
    <MantineProvider inherit theme={{ colorScheme: "light" }}>
      <div className={classes.wrapper}>
        <Container size="sm">
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
                <IconPlus size="1.05rem" stroke={1.5} />
              </ThemeIcon>
            }
          >
            <Accordion.Item className={classes.item} value="kreiranje-naloga">
              <Accordion.Control>Kako mogu da kreiram nalog?</Accordion.Control>
              <Accordion.Panel>
                Za kreiranje naloga potrebno je da kliknete na dugme "Registruj
                se" na početnoj stranici aplikacije i popunite obrazac sa
                traženim podacima. Nakon toga će biti potrebno da verifikujete
                svoj nalog putem email-a ili SMS-a.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="napomene">
              <Accordion.Control>
                Da li je moguće ostaviti napomenu uz porudžbinu?
              </Accordion.Control>
              <Accordion.Panel>
                Da, naša aplikacija omogućava korisnicima da ostave napomenu uz
                porudžbinu, kao što su alergije na hranu, posebni zahtevi za
                pripremu hrane ili željene temperature pića.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="pracenje-dostave">
              <Accordion.Control>
                Da li je moguće pratiti dostavu u realnom vremenu?
              </Accordion.Control>
              <Accordion.Panel>
                Da, naša aplikacija omogućava korisnicima da prate dostavu u
                realnom vremenu. Nakon što je porudžbina prihvaćena, korisnicima
                će biti omogućeno praćenje dostave sa informacijama o trenutnoj
                lokaciji dostavljača na njihovom profilu.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="povratak">
              <Accordion.Control>
                Da li mogu da vratim poručenu hranu?
              </Accordion.Control>
              <Accordion.Panel>
                Ukoliko postoji neki problem sa poručenom hranom, potrebno je da
                se obratite našem timu za podršku. U nekim slučajevima je moguće
                vratiti hranu uz povraćaj novca, ali ovo zavisi od specifičnih
                pravila prodavca i politike naše aplikacije
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="vrste-restorana">
              <Accordion.Control>
                Koje vrste restorana su dostupne na vašoj platformi?
              </Accordion.Control>
              <Accordion.Panel>
                Na našoj platformi možete pronaći različite vrste restorana,
                uključujući restorane brze hrane, restorane sa lokalnom
                kuhinjom, veganske i vegetarijanske restorane, restorane sa
                internacionalnom kuhinjom i druge.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="adresa-isporuke">
              <Accordion.Control>
                Da li mogu da naručim hranu za isporuku na drugu adresu?
              </Accordion.Control>
              <Accordion.Panel>
                Da, naša aplikacija omogućava korisnicima da naruče hranu za
                dostavu na drugu adresu. Potrebno je da unesete adresu dostave
                prilikom poručivanja.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="historija-narudzbi">
              <Accordion.Control>
                Kako da pretražim svoju historiju porudžbina?
              </Accordion.Control>
              <Accordion.Panel>
                Da biste pregledali svoju historiju porudžbina, kliknite na
                ikonu "istorija porudžbina" u vašem profilu. Tu ćete moći da
                vidite sve vaše porudžbine, kao i detalje o njima.
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
    </MantineProvider>
  );
  return Faq();
}
export default Faq;
