import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from './components/data/store';
import { useEffect } from 'react';
import { initPlayer } from './components/data/player-actions';
import { ErrorPage } from './components/ui/error-page';
import { LoadingSpinner } from './components/ui/loading-spinner';
import { Outlet } from '@tanstack/react-router';

const App = () => {
  const { loading, error } = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initPlayer());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage message={error} />;

  return <Outlet />;
};

export default App;
