import { Box } from "@mui/material";
import Header from "./components/header/Header";

function App() {
  return (
    <Box sx={{ height: "100dvh", overflowX: "hidden", overflowY: "auto", padding: "1.3rem 1rem" }}>
      <Header />
    </Box>
  );
}

export default App;
