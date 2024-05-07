import { Stack } from "@mui/material";
import Header from "./components/header/Header";
import JobCards from "./components/jobCards/JobCards";

function App() {
  return (
    <Stack id="job-container" sx={{ height: "100dvh", overflowX: "hidden", overflowY: "auto", padding: "1.3rem 2rem" }}>
      <Header />
      <JobCards />
    </Stack>
  );
}

export default App;
