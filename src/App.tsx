import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import SignupPage from "./pages/Signup/SignupPage";
import SigninPage from "./pages/Signin/SigninPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import { Box, ThemeProvider } from "@mui/material";
import Navbar from "./component/navbar/Navbar";
import theme from "./theme";

const router = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/signup",
    component: SignupPage,
  },
  {
    path: "/signin",
    component: SigninPage,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar />
          <Box sx={{ flexGrow: 1, overflowX: "hidden" }}>
            <Routes>
              {router.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
