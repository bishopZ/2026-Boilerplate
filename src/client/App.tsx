import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from './components/data/store';
import { useEffect, lazy, Suspense } from 'react';
import { initPlayer } from './components/data/player-actions';
import { ErrorPage } from './components/ui/error-page';
import { LoadingSpinner } from './components/ui/loading-spinner';
import { ScrollToTop } from './components/ui/scroll-to-top';
import { ROUTES } from './shared/constants';
import { Routes, Route, BrowserRouter } from 'react-router';
import Home from './pages/Home';

const Product = lazy(() => import('./pages/Product'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  const { loading, error } = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initPlayer());
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
          <Route path={ROUTES.PRIVACY} element={<Privacy />} />
          <Route path={ROUTES.TERMS} element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
