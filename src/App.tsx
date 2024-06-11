import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import SignupPage from "./pages/Signup/SignupPage";
import SigninPage from "./pages/Signin/SigninPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

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
    <Router>
      <Routes>
        {router.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
