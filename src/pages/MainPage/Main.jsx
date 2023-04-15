import { MantineProvider } from "@mantine/core";
import React from "react";
import GlavnoMain from "../../components/componentsMain/GlavnoMain";
import NavigacijaMain from "../../components/componentsMain/NavigacijaMain";

function Main() {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          breakpoints: {
            xs: 500,
            sm: 1090,
            md: 1200,
            lg: 1200,
            xl: 1400,
          },
        }}
      >
        <NavigacijaMain />
        <GlavnoMain />
      </MantineProvider>
    </>
  );
}

export default Main;
