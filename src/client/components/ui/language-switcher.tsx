import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../data/store';
import { setLocale } from '../data/player';
import { SUPPORTED_LOCALES, type SupportedLocale } from '@/client/shared/locales';

const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: 'EN',
  ar: 'عربي',
};

export const LanguageSwitcher = () => {
  const locale = useSelector((state: RootState) => state.player.locale);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocale(event.target.value as SupportedLocale));
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      aria-label="Select language"
      style={{
        background: 'transparent',
        border: '1px solid currentColor',
        borderRadius: '4px',
        padding: '4px 8px',
        fontSize: '14px',
        cursor: 'pointer',
        color: 'inherit',
      }}
    >
      {SUPPORTED_LOCALES.map((code) => (
        <option key={code} value={code}>{LOCALE_LABELS[code]}</option>
      ))}
    </select>
  );
};
