import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './components/data/store';
import { useEffect, lazy, Suspense } from 'react';
import { initPlayer } from './components/data/player-actions';
import { ErrorPage } from './components/ui/error-page';
import { LoadingSpinner } from './components/ui/loading-spinner';
import { ScrollToTop } from './components/ui/scroll-to-top';
import { Routes, Route } from 'react-router';
import Home from './pages/Home';

// Lazy load pages for better performance
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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
