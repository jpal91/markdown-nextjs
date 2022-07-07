import { createTheme } from "@mui/material";

import globals from "./base/globals";
import typography from "./base/typography";
import colors from "./base/colors";
import borders from "./base/borders";
//import breakpoints from "./base/breakpoints";
import grid from "./components/grid";
import container from "./components/container";
//import appbar from "./components/appbar";
//import button from "./components/button";

export default createTheme({
  typography: { ...typography },
  palette: { ...colors },
  borders: { ...borders },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals
      }
    },
    MuiGrid: { ...grid },
    MuiContainer: { ...container }
  }
});
