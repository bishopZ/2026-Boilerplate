import { useDispatch, useSelector } from 'react-redux';
import { clearFeatureFlagOverride, setFeatureFlagOverride } from '../redux/app';
import { type RootState, type AppDispatch } from '../redux/store';
import { isFeatureEnabled } from '../utilities/feature-flags';

export const useFeatureFlag = (flagName: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const runtimeOverrides = useSelector((state: RootState) => state.app.featureFlagOverrides);
  const enabled = isFeatureEnabled(flagName, runtimeOverrides);

  const setOverride = (overrideEnabled: boolean) => {
    dispatch(setFeatureFlagOverride({ flagName, enabled: overrideEnabled }));
  };

  const clearOverride = () => {
    dispatch(clearFeatureFlagOverride(flagName));
  };

  return {
    enabled,
    setOverride,
    clearOverride,
  };
};
