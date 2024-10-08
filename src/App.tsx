import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import SignupPage from './pages/Signup/SignupPage';
import SigninPage from './pages/Signin/SigninPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import { Box, ThemeProvider, styled } from '@mui/material';
import Navbar from './component/navbar/Navbar';
import theme from './theme';
import Footer from './component/footer/Footer';
import ProfilePage from './pages/Profile/ProfilePage';
import PrivateRoute from './pages/PrivateRoutes/PrivateRoutes';
import TransactionPage from './pages/Transaction/TransactionPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthCheck from './pages/AuthCheck/AuthCheck';
import ResetPassword from './pages/ResetPassword/ResetPasswordPage';
import { fetchStores } from './hooks/useStores';

const router = [
  {
    path: '/',
    component: HomePage,
    isPrivate: true,
  },
  {
    path: '/profile',
    component: ProfilePage,
    isPrivate: true,
  },
  {
    path: '/transaction/:storeId',
    component: TransactionPage,
    isPrivate: true,
  },
  {
    path: '/signup',
    component: SignupPage,
    isPrivate: false,
  },
  {
    path: '/signin',
    component: SigninPage,
    isPrivate: false,
  },
  {
    path: '/reset-password',
    component: ResetPassword,
    isPrivate: false,
  },
  {
    path: '*',
    component: NotFoundPage,
    isPrivate: false,
  },
];

const BoxContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const BoxContent = styled(Box)({
  flexGrow: 1,
  overflowX: 'hidden',
});

const queryClient = new QueryClient();

const App = () => {
  setInterval(async () => {
    await fetchStores();
  }, 1 * 60 * 1000);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <AuthCheck>
            <BoxContainer>
              <Navbar />
              <BoxContent>
                <Routes>
                  {router.map(({ path, component: Component, isPrivate }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        isPrivate ? (
                          <PrivateRoute>
                            <Component />
                          </PrivateRoute>
                        ) : (
                          <Component />
                        )
                      }
                    />
                  ))}
                </Routes>
              </BoxContent>
              <Footer />
            </BoxContainer>
          </AuthCheck>
        </Router>
        <ToastContainer />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
