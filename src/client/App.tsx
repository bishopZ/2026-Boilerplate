import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from './redux/store';
import { useEffect, lazy, Suspense } from 'react';
import { initPreferences } from './redux/preferences-actions';
import { ErrorPage } from './ui/components/error-page';
import { LoadingSpinner } from './ui/components/loading-spinner';
import { ScrollToTop } from './ui/components/scroll-to-top';
import { ROUTES } from './utilities/constants';
import { Routes, Route, BrowserRouter } from 'react-router';
import Home from './pages/Home';

const Product = lazy(() => import('./pages/Product'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Policies = lazy(() => import('./pages/Policies'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  const { loading, error } = useSelector((state: RootState) => state.preferences);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initPreferences());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage message={error} />;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.PRODUCT} element={<Product />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.POLICIES} element={<Policies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
