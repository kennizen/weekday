import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    border: {
      main: string;
      secondary: string;
      hover: string;
    };
    specialText: {
      main: string;
    };
    btn: {
      pri: string;
      sec: string;
    };
    chip: {
      pri: string;
      text: string
    };
  }
  interface PaletteOptions {
    border: {
      main: string;
      secondary: string;
      hover: string;
    };
    specialText: {
      main: string;
    };
    btn: {
      pri: string;
      sec: string;
    };
    chip: {
      pri: string;
      text: string
    };
  }
}

const theme = createTheme({
  typography: {
    fontFamily: "Lexend, sans-serif",
  },
  palette: {
    text: {
      secondary: "rgb(139, 139, 139)",
    },
    border: {
      main: "rgb(204, 204, 204)",
      secondary: "rgb(38, 132, 255)",
      hover: "rgb(179, 179, 179)",
    },
    specialText: {
      main: "rgb(77, 89, 106)",
    },
    btn: {
      pri: "rgb(85, 239, 196)",
      sec: "rgb(73, 67, 218)",
    },
    chip: {
      pri: "rgb(230, 230, 230)",
      text: "rgb(51, 51, 51)"
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
