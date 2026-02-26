import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../data/store';
import { setLocale } from '../data/player';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'عربي' },
];

export const LanguageSwitcher = () => {
  const locale = useSelector((state: RootState) => state.player.locale);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocale(event.target.value));
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
      {LANGUAGES.map(({ code, label }) => (
        <option key={code} value={code}>{label}</option>
      ))}
    </select>
  );
};
