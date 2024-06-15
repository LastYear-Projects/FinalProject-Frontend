import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import SignupPage from "./pages/Signup/SignupPage";
import SigninPage from "./pages/Signin/SigninPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import { Box, ThemeProvider } from "@mui/material";
import Navbar from "./component/navbar/Navbar";
import theme from "./theme";
import Footer from "./component/footer/Footer";
import ProfilePage from "./pages/Profile/ProfilePage";

// TODO -> Make all the routes except the SignIn/SignUp page private.
const router = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/profile", //TODO -> add /profile/:id and get the id from the url.
    component: ProfilePage,
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
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
