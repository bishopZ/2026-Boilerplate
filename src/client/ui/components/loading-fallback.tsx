import { Activity } from 'react';
import { LoadingSpinner } from './loading-spinner';

export const LoadingFallback = () => {
  return (
    <Activity mode="visible">
      <LoadingSpinner />
    </Activity>
  );
};
