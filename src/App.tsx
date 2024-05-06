import { Stack } from "@mui/material";
import Header from "./components/header/Header";
import JobCards from "./components/jobCards/JobCards";

function App() {
  return (
    <Stack sx={{ height: "100dvh", overflowX: "hidden", overflowY: "auto", padding: "1.3rem 2rem", gap: "3rem" }}>
      <Header />
      <JobCards />
    </Stack>
  );
}

export default App;
